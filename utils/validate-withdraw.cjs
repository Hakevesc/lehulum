// Quick validation for the Withdraw Cash feature screens.
// 1) leftover build markers  2) inline <script> syntax  3) internal links resolve
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const files = [
  'More Services.html',
  'Withdraw Cash.html',
  'Withdraw Cash - Enter Amount.html',
  'Withdraw Cash - Agent Nearby.html',
  'Withdraw Cash - Review.html',
  'Withdraw Cash - Enter PIN.html',
  'Withdraw Cash - Voucher.html',
  'Withdraw Cash - ATM Instructions.html',
  'Withdraw Cash - Insufficient Balance.html',
  'Withdraw Cash - Success.html'
];

let errors = 0;

for (const f of files) {
  const fp = path.join(root, f);
  if (!fs.existsSync(fp)) { console.log('MISSING FILE: ' + f); errors++; continue; }
  const html = fs.readFileSync(fp, 'utf-8');

  // 1) markers
  const markers = html.match(/:::[A-Z0-9]+:::|::PART\d::/g);
  if (markers) { console.log('MARKERS LEFT in ' + f + ': ' + markers.join(',')); errors++; }

  // 2) script syntax (parse only, no execution)
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  scripts.forEach((m, i) => {
    try { new Function(m[1]); }
    catch (e) { console.log('SYNTAX ERROR in ' + f + ' script#' + i + ': ' + e.message); errors++; }
  });

  // 3) internal links
  const links = [...html.matchAll(/window\.location\.href\s*=\s*'([^']+\.html)'/g)].map(m => m[1]);
  links.forEach(l => {
    if (!fs.existsSync(path.join(root, l))) { console.log('BROKEN LINK in ' + f + ' -> ' + l); errors++; }
  });
}

console.log(errors === 0 ? 'ALL CHECKS PASSED ✔' : 'FOUND ' + errors + ' ISSUE(S)');