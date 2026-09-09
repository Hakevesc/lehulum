#!/usr/bin/env node
/**
 * figma-embed-images.cjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Universal post-processor for any JSON exported by the Jason-Figma plugin.
 *
 * PROBLEM:
 *   When an HTML page is exported to Figma JSON, any <img src="assets/...">
 *   tag becomes an empty "image" frame in the tree — the plugin can't read
 *   local file:// URLs at export time, so it leaves those frames blank.
 *
 * SOLUTION:
 *   1. Read the exported JSON and find its `sourceUrl` (path to the HTML file).
 *   2. Parse that HTML file and extract every <img src="..."> in DOM order.
 *   3. Walk the JSON tree and collect every empty "image" FRAME in tree order.
 *   4. Match them positionally (1st img → 1st image frame, etc.).
 *   5. Embed each asset as a base64 `imageData` field the plugin understands.
 *
 * USAGE:
 *   node scripts/figma-embed-images.cjs <input.json> [output.json]
 *
 *   • If output is omitted, writes to <name>.figma-with-images.json
 *   • Works with single-screen AND multi-screen (multi-page) JSON exports
 *
 * EXAMPLES:
 *   node scripts/figma-embed-images.cjs "Send Money Menu.figma.json"
 *   node scripts/figma-embed-images.cjs "Manage Favourites.figma.json" out.json
 *   node scripts/figma-embed-images.cjs "multi-export.figma.json"
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ── CLI args ────────────────────────────────────────────────────────────────
const [,, inputArg, outputArg] = process.argv;
if (!inputArg) {
  console.error('Usage: node scripts/figma-embed-images.cjs <input.json> [output.json]');
  process.exit(1);
}

const inputPath = path.resolve(inputArg);
if (!fs.existsSync(inputPath)) {
  console.error('File not found:', inputPath);
  process.exit(1);
}

const outputPath = outputArg
  ? path.resolve(outputArg)
  : inputPath.replace(/\.json$/, '.figma-with-images.json').replace('.figma-with-images.figma-with-images', '.figma-with-images');

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Convert an asset relative path to a base64 data URI */
function assetToBase64(assetPath, root) {
  const fullPath = path.resolve(root, assetPath);
  if (!fs.existsSync(fullPath)) {
    console.warn('  [WARN] Asset not found:', assetPath, '→', fullPath);
    return null;
  }
  const ext = path.extname(fullPath).toLowerCase();
  const mimeMap = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
  };
  const mime = mimeMap[ext] || 'image/png';
  const data = fs.readFileSync(fullPath).toString('base64');
  return `data:${mime};base64,${data}`;
}

/**
 * Extract all <img src="..."> attributes from an HTML string, in DOM order.
 * Returns an array of src strings (may include data: URIs, http://, or relative paths).
 */
function extractImgSrcs(html) {
  const srcs = [];
  // Match src on <img> tags (handles single/double quotes, with or without spaces)
  const imgRe = /<img\b[^>]*\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]*))[^>]*>/gi;
  let m;
  while ((m = imgRe.exec(html)) !== null) {
    const src = (m[1] || m[2] || m[3] || '').trim();
    if (src) srcs.push(src);
  }
  return srcs;
}

/**
 * Collect all "image" FRAME nodes from a JSON tree, in depth-first order.
 * These are the placeholder frames the plugin creates for <img> elements.
 */
function collectImageFrames(node, result) {
  if (!node) return;
  if (node.name === 'image' && node.type === 'FRAME') {
    result.push(node);
  }
  // Recurse into children
  (node.children || []).forEach(c => collectImageFrames(c, result));
}

/** Resolve a src path relative to the HTML file's directory */
function resolveSrc(src, htmlDir, projectRoot) {
  if (!src) return null;

  // Already a data URI — don't re-encode
  if (src.startsWith('data:')) return src;

  // Absolute URL (http/https) — skip
  if (/^https?:\/\//.test(src)) {
    console.warn('  [SKIP] Remote URL (cannot embed):', src.substring(0, 60));
    return null;
  }

  // file:// URL — convert to local path
  if (src.startsWith('file:///')) {
    const localPath = decodeURIComponent(src.replace(/^file:\/\/\//, ''));
    return assetToBase64(localPath, '/'); // absolute
  }

  // Relative path — resolve from the HTML directory first, then project root
  const fromHtml = path.resolve(htmlDir, src);
  if (fs.existsSync(fromHtml)) return assetToBase64(fromHtml, '/');

  const fromRoot = path.resolve(projectRoot, src);
  if (fs.existsSync(fromRoot)) return assetToBase64(fromRoot, '/');

  console.warn('  [WARN] Asset not found:', src);
  return null;
}

/**
 * Process a single screen object: extract img srcs from its HTML source file
 * and inject imageData into its "image" FRAME nodes.
 * Returns { injected, skipped }.
 */
function processScreen(screenData, projectRoot, screenLabel) {
  const sourceUrl = screenData.sourceUrl;
  let htmlDir = projectRoot; // fallback
  let imgSrcs = [];

  if (sourceUrl) {
    // Convert file:// URL → local path
    let htmlPath = sourceUrl;
    if (htmlPath.startsWith('file:///')) {
      htmlPath = decodeURIComponent(htmlPath.replace(/^file:\/\/\//, '').replace(/\//g, path.sep));
      // On Windows: "C:\Users\..." — the leading slash from file:// → 'C:'
    }
    if (fs.existsSync(htmlPath)) {
      htmlDir = path.dirname(htmlPath);
      const html = fs.readFileSync(htmlPath, 'utf8');
      imgSrcs = extractImgSrcs(html);
      console.log(`  HTML: ${path.basename(htmlPath)} → ${imgSrcs.length} <img> tag(s) found`);
    } else {
      console.warn(`  [WARN] HTML source not found: ${htmlPath}`);
    }
  } else {
    console.warn('  [WARN] No sourceUrl in JSON — cannot auto-detect assets');
  }

  // Collect all "image" FRAME placeholders in tree order
  const imageFrames = [];
  if (screenData.tree) collectImageFrames(screenData.tree, imageFrames);
  console.log(`  JSON tree: ${imageFrames.length} "image" frame(s) found`);

  let injected = 0;
  let skipped  = 0;

  const count = Math.min(imgSrcs.length, imageFrames.length);
  for (let i = 0; i < count; i++) {
    const b64 = resolveSrc(imgSrcs[i], htmlDir, projectRoot);
    if (b64) {
      imageFrames[i].imageData = b64;
      injected++;
      const label = imgSrcs[i].length > 50 ? '...' + imgSrcs[i].slice(-40) : imgSrcs[i];
      console.log(`    ✓ [${i + 1}] ${label}`);
    } else {
      skipped++;
    }
  }

  if (imgSrcs.length > imageFrames.length) {
    console.warn(`  [WARN] More <img> tags (${imgSrcs.length}) than image frames (${imageFrames.length}) — extras ignored`);
  }
  if (imageFrames.length > imgSrcs.length) {
    console.warn(`  [WARN] More image frames (${imageFrames.length}) than <img> tags (${imgSrcs.length}) — extras left blank`);
  }

  return { injected, skipped };
}

// ── Main ─────────────────────────────────────────────────────────────────────

console.log('\n🔧 Figma JSON Image Embedder');
console.log('   Input :', inputPath);
console.log('   Output:', outputPath);
console.log('');

const raw  = fs.readFileSync(inputPath, 'utf8');
const data = JSON.parse(raw);

// Detect project root as the directory of this script's parent (project root)
const projectRoot = path.resolve(__dirname, '..');

let totalInjected = 0;
let totalSkipped  = 0;

// Handle multi-screen JSON (type: 'multi-screen' with screens[])
if (data.type === 'multi-screen' && Array.isArray(data.screens)) {
  console.log(`📦 Multi-screen export: ${data.screens.length} screen(s)`);
  data.screens.forEach((screen, idx) => {
    const label = screen.name || `Screen ${idx + 1}`;
    console.log(`\n  [${idx + 1}/${data.screens.length}] ${label}`);
    const { injected, skipped } = processScreen(screen, projectRoot, label);
    totalInjected += injected;
    totalSkipped  += skipped;
  });
} else {
  // Single-screen JSON
  console.log(`📄 Single-screen export: ${data.name || 'Unnamed'}`);
  const { injected, skipped } = processScreen(data, projectRoot, data.name || 'Screen');
  totalInjected += injected;
  totalSkipped  += skipped;
}

// Write output
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf8');
const sizeKB = Math.round(fs.statSync(outputPath).size / 1024);

console.log('\n─────────────────────────────────────────────────────');
console.log(`✅ Done!`);
console.log(`   Images injected : ${totalInjected}`);
console.log(`   Skipped/missing : ${totalSkipped}`);
console.log(`   Output file     : ${path.basename(outputPath)} (${sizeKB} KB)`);
console.log('');
console.log('👉 Import the output JSON into the Jason-Figma plugin in Figma.');
console.log('─────────────────────────────────────────────────────\n');
