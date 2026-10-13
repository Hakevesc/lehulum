// Conservative codemod: replace raw brand-palette hex with C.* token constants.
// Handles three safe forms only:
//   1. SVG attribute:        fill="#1C1C21"        -> fill={C.onSurface}
//   2. quoted value:         color: '#1C1C21'      -> color: C.onSurface
//   3. simple border string: '1.5px solid #E8E8EC' -> `1.5px solid ${C.stroke}`
// Gradients / multi-stop strings / non-token one-offs are left untouched.
// Auto-inserts `import { C } from '@/screens/_shared/tokens';` when needed.
//
//   node scripts/tokenize-screens.mjs <file> [<file> ...]

import { readFileSync, writeFileSync } from 'node:fs';

const MAP = {
  'FE353D': 'primary', 'C41520': 'primaryDark', 'A41016': 'primaryDarker',
  'FFDFE0': 'primaryContainer', 'FFF1F2': 'onPrimary', 'FFFFFF': 'surface',
  'FCFCFC': 'surfaceContainer', 'F5F5F5': 'background', '1C1C21': 'onSurface',
  '7C7C87': 'onSurfaceLow', '1FC83B': 'success', 'E8F9EC': 'successContainer',
  'E8E8EC': 'stroke', 'E0E0E0': 'disabled'
};

function canon(hex) {
  let h = hex.replace('#', '').toUpperCase();
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  return h;
}
function keyFor(hex) {
  return MAP[canon(hex)];
}

const HEX = '#[0-9A-Fa-f]{3}(?:[0-9A-Fa-f]{3})?';

for (const file of process.argv.slice(2)) {
  let src = readFileSync(file, 'utf8');
  const before = src;
  let count = 0;

  // 1. attribute form: ="#hex"  ->  ={C.key}
  src = src.replace(new RegExp(`="(${HEX})"`, 'g'), (m, hex) => {
    const k = keyFor(hex);
    if (!k) return m;
    count++;
    return `={C.${k}}`;
  });

  // 3. simple border/divider string (do before generic quoted value)
  src = src.replace(new RegExp(`'(\\d+(?:\\.\\d+)?px (?:solid|dashed) )(${HEX})'`, 'g'), (m, pre, hex) => {
    const k = keyFor(hex);
    if (!k) return m;
    count++;
    return `\`${pre}\${C.${k}}\``;
  });

  // 2. standalone quoted value: '#hex'  ->  C.key
  src = src.replace(new RegExp(`'(${HEX})'`, 'g'), (m, hex) => {
    const k = keyFor(hex);
    if (!k) return m;
    count++;
    return `C.${k}`;
  });

  if (src === before) {
    console.log(`  --  ${file} (no palette hex)`);
    continue;
  }

  // ensure the C import exists
  const hasImport = /import\s*\{[^}]*\bC\b[^}]*\}\s*from\s*['"]@\/screens\/_shared/.test(src);
  if (!hasImport) {
    const importLine = "import { C } from '@/screens/_shared/tokens';\n";
    if (/^'use client';/.test(src)) {
      src = src.replace(/^('use client';\n)/, `$1${importLine}`);
    } else {
      src = importLine + src;
    }
  }

  writeFileSync(file, src);
  console.log(`  ${String(count).padStart(3)}  ${file}`);
}
