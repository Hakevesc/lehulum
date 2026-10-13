// Replace the exact red header-gradient literal with C.headerGradient.
//   node scripts/replace-header-gradient.mjs <file> [<file> ...]
import { readFileSync, writeFileSync } from 'node:fs';

const LIT = "'linear-gradient(160deg, #A41016 0%, #C41520 30%, #D32F2F 60%, #B71C1C 100%)'";

for (const file of process.argv.slice(2)) {
  let src = readFileSync(file, 'utf8');
  if (!src.includes(LIT)) continue;
  src = src.split(LIT).join('C.headerGradient');
  writeFileSync(file, src);
  console.log(`  gradient -> C.headerGradient  ${file}`);
}
