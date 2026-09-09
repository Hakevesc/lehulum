/**
 * generate-figma-json.js
 * 
 * Reads the Send Money Menu HTML's existing assets and embeds them as base64
 * imageData into the Figma JSON so the Jason-figma-plugin can import images.
 * 
 * Usage: node scripts/generate-figma-json.js
 * Output: Send Money Menu.figma.json  (ready to paste into the plugin)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function toBase64(relPath) {
  const fullPath = path.join(ROOT, relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn('  [WARN] Missing asset:', relPath);
    return null;
  }
  const ext = path.extname(relPath).toLowerCase();
  const mimeMap = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
  };
  const mime = mimeMap[ext] || 'image/png';
  const data = fs.readFileSync(fullPath).toString('base64');
  return `data:${mime};base64,${data}`;
}

// ── Asset mapping ────────────────────────────────────────────────────────────
// Favorites: 5 avatars/logos (Mom, Rent, Sister, Landlord, Aster)
const favoriteAssets = [
  'assets/avatars/avatar-3.png',          // Mom
  'assets/banks logo/cbe-logo.png',        // Rent
  'assets/avatars/avatar-5.png',           // Sister
  'assets/banks logo/abyssinya-bank.png',  // Landlord
  'assets/avatars/avatar-2.png',           // Aster
];

// Quick Transfer: 5 bank logos
const quickTransferAssets = [
  'assets/banks logo/cbe-logo.png',        // CBE (green border)
  'assets/banks logo/abyssinya-bank.png',  // BOA (navy border)
  'assets/banks logo/awass-bank.png',      // Awash (cyan border)
  'assets/banks logo/M-PESA-logo-icon.png',// M-PESA (red border)
  'assets/wallets/telebirr.png',           // Telebirr (green border)
];

// Frequent transactions: 3 bank logos
const frequentAssets = [
  'assets/banks logo/cbe-logo.png',        // Aster Mequanent – CBE
  'assets/banks logo/abyssinya-bank.png',  // Kidist Birhanu – BOA
  'assets/banks logo/dashen-bank.png',     // Aster Mequanent – Dashen
];

console.log('Reading source JSON...');
const sourceJson = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'Send Money Menu.figma.json'), 'utf8')
);

// ── Patch helpers ────────────────────────────────────────────────────────────

let favIdx = 0;
let quickIdx = 0;
let freqIdx = 0;

function patchNode(node) {
  if (!node) return;

  // Favorite avatars: frames named "image" inside "favorite-avatar"
  if (node.name === 'image' && node.type === 'FRAME') {
    // Will be handled by parent context — skip here, handled via parent walk
  }

  // Walk children recursively
  if (node.children) {
    node.children.forEach(child => patchNode(child));
  }
}

// More targeted approach: walk the tree and inject imageData by position
function patchTree(node, parentName) {
  if (!node) return;

  const name = node.name || '';

  if (name === 'image' && node.type === 'FRAME') {
    // Determine context from parent name
    if (parentName === 'favorite-avatar') {
      if (favIdx < favoriteAssets.length) {
        const b64 = toBase64(favoriteAssets[favIdx++]);
        if (b64) {
          node.imageData = b64;
          node.fills = []; // will be replaced by plugin with IMAGE fill
          console.log(`  ✓ Favorite[${favIdx}] -> ${favoriteAssets[favIdx-1]}`);
        }
      }
    } else if (parentName === 'quick-icon') {
      if (quickIdx < quickTransferAssets.length) {
        const b64 = toBase64(quickTransferAssets[quickIdx++]);
        if (b64) {
          node.imageData = b64;
          node.fills = [];
          console.log(`  ✓ QuickTransfer[${quickIdx}] -> ${quickTransferAssets[quickIdx-1]}`);
        }
      }
    } else if (parentName === 'frequent-avatar') {
      if (freqIdx < frequentAssets.length) {
        const b64 = toBase64(frequentAssets[freqIdx++]);
        if (b64) {
          node.imageData = b64;
          node.fills = [];
          console.log(`  ✓ Frequent[${freqIdx}] -> ${frequentAssets[freqIdx-1]}`);
        }
      }
    }
  }

  if (node.children) {
    node.children.forEach(child => patchTree(child, name));
  }
}

console.log('Embedding images...');
patchTree(sourceJson.tree, '');

const outputPath = path.join(ROOT, 'Send Money Menu.figma-with-images.json');
fs.writeFileSync(outputPath, JSON.stringify(sourceJson, null, 2), 'utf8');

const sizeKB = Math.round(fs.statSync(outputPath).size / 1024);
console.log(`\n✅ Done! Output: Send Money Menu.figma-with-images.json (${sizeKB} KB)`);
console.log('   Favorites injected:', favIdx);
console.log('   Quick Transfer injected:', quickIdx);
console.log('   Frequent Transactions injected:', freqIdx);
console.log('\nImport this JSON file into the Jason-Figma plugin in Figma.');
