// Ensure every screen that references C.* imports it. CRLF-safe; idempotent.
//   node scripts/ensure-c-import.mjs <file> [<file> ...]
import { readFileSync, writeFileSync } from 'node:fs';

for (const file of process.argv.slice(2)) {
  let src = readFileSync(file, 'utf8');
  const usesC = /\bC\.[a-zA-Z]/.test(src);
  const hasImport = /import\s*\{[^}]*\bC\b[^}]*\}\s*from\s*['"]@\/screens\/_shared/.test(src);
  if (!usesC || hasImport) {
    console.log(`  --  ${file}`);
    continue;
  }
  const importLine = "import { C } from '@/screens/_shared/tokens';\n";
  const m = src.match(/^('use client';\r?\n)/);
  if (m) src = src.replace(/^('use client';\r?\n)/, `$1${importLine}`);
  else src = importLine + src;
  writeFileSync(file, src);
  console.log(`  fixed  ${file}`);
}
