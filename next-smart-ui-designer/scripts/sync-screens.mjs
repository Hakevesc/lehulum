// Sync the legacy HTML app into this Next project's /public so the designer
// renders 100% pixel-identical previews of the latest screens.
//
//   node scripts/sync-screens.mjs
//
// Copies every *.html screen plus the shared styles/, components/, assets/
// folders and figma-export.js from the project root into ./public.

import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, '..');          // next-smart-ui-designer/
const sourceRoot = resolve(projectRoot, '..');    // M-PESA Lehulum/ (legacy app)
const publicDir = join(projectRoot, 'public');

if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });

// 1) Copy all top-level *.html screens
let htmlCount = 0;
for (const entry of readdirSync(sourceRoot)) {
  if (!entry.toLowerCase().endsWith('.html')) continue;
  const src = join(sourceRoot, entry);
  if (!statSync(src).isFile()) continue;
  cpSync(src, join(publicDir, entry));
  htmlCount += 1;
}

// 2) Copy shared folders (styles / components / assets only).
//    figma-export.js is intentionally NOT copied — it injects a floating
//    "Export to Figma" button that we don't want inside the designer previews.
const folders = ['styles', 'components', 'assets'];
for (const folder of folders) {
  const src = join(sourceRoot, folder);
  if (existsSync(src)) cpSync(src, join(publicDir, folder), { recursive: true });
}

// Remove a previously-synced exporter so old copies don't keep showing the button.
const staleExporter = join(publicDir, 'figma-export.js');
if (existsSync(staleExporter)) rmSync(staleExporter);

console.log(`[sync-screens] ${htmlCount} HTML screens + ${folders.join(', ')} synced into /public`);
