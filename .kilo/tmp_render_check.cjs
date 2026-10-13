/* Temporary render harness: executes the inline JS of a prototype screen against a
   fake DOM so we can see what the page would actually render with a given payload. */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = 'c:/Users/LEGION/Documents/GitHub/M-PESA Lehulum';
const file = process.env.TARGET_HTML;
const payloadFile = process.env.PAYLOAD_FILE;
if (!file || !payloadFile) { console.error('set TARGET_HTML and PAYLOAD_FILE'); process.exit(2); }

const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
const payload = JSON.parse(fs.readFileSync(path.join(ROOT, payloadFile), 'utf8'));

// ---- tiny element stub ------------------------------------------------
function makeEl(id) {
  const el = {
    id,
    _text: '',
    _html: null,
    style: {},
    hidden: false,
    textContent: '',
    innerHTML: '',
    classList: { _s: new Set(), add(c) { this._s.add(c); }, remove(c) { this._s.delete(c); }, toggle(c, force) { if (force !== undefined ? force : !this._s.has(c)) this._s.add(c); else this._s.delete(c); }, contains(c) { return this._s.has(c); } },
    setAttribute() {},
    classList2() {},
    querySelector() { return makeEl(id + ':q'); },
    appendChild() {},
    removeChild() {},
    set textContent(v) { this._text = String(v); this._html = null; },
    get textContent() { return this._text; },
    set innerHTML(v) { this._html = String(v); this._text = ''; },
    get innerHTML() { return this._html === null ? this._text : this._html; },
  };
  return el;
}

// collect every id referenced in the markup
const ids = [...new Set([...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]))];
const els = new Map();
ids.forEach(id => els.set(id, makeEl(id)));

function setDisplay(id, v) { const e = els.get(id); if (e) e.style.display = v; }

// ---- globals the inline scripts rely on --------------------------------
const sessionStorage = {
  _m: { billPaymentData: JSON.stringify(payload) },
  getItem(k) { return this._m[k]; },
  setItem(k, v) { this._m[k] = String(v); },
  removeItem(k) { delete this._m[k]; },
};
const navigator = { clipboard: { writeText() { return Promise.resolve(); } } };
const lucide = { createIcons() {} };
function renderQR() {}
const document = {
  documentElement: { style: { setProperty(k, v) { document.documentElement.__props = document.documentElement.__props || {}; document.documentElement.__props[k] = v; } } },
  readyState: 'complete',
  head: { appendChild() {} },
  body: { appendChild() {}, removeChild() {} },
  querySelector() { return null; },
  getElementById(id) { if (!els.has(id)) els.set(id, makeEl(id)); return els.get(id); },
  createElement() { return makeEl('dyn'); },
  documentElement2: null,
};
document.documentElement.__props = {};
function getDocument() { return document; }

// -------- run the inline script blocks (those that aren't the Figma/test exporters) ----
function extractInlineScripts(htmlText) {
  const out = [];
  const re = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(htmlText)) !== null) {
    if (/\b(lucide\.createIcons|sessionStorage|getElementById)\b/.test(m[1])) out.push(m[1]);
  }
  return out;
}

const scripts = extractInlineScripts(html);
const vm = new Function('document', 'sessionStorage', 'navigator', 'lucide', 'renderQR', 'window',
  scripts.map(s => s + '\n').join('\n'));

try {
  vm(document, sessionStorage, navigator, lucide, renderQR, { location: { href: 'about:blank' } });
} catch (e) {
  console.error('SCRIPTS FAILED:', e.message);
  process.exit(2);
}

// -------- print the receipt rows + amount ---------------------------------
function parseRows(htmlStr) {
  const rows = [];
  const re = /<div class="detail-row">\s*<span class="label"[^>]*>([\s\S]*?)<\/span>\s*<span class="value[^>]*>([\s\S]*?)<\/span>/gi;
  let m;
  while ((m = re.exec(htmlStr)) !== null) {
    const strip = s => s.replace(/<[^>]*>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&').trim();
    rows.push([strip(m[1]), strip(m[2])]);
  }
  return rows;
}

// Rebuild the receipt leading block from the static HTML + JS overlays
const body = html.slice(html.indexOf('<body>'), html.indexOf('</body>'));
const tDetails = body.slice(body.indexOf('class="transaction-details"'));

// container where rows live
const lead = els.get('detailLeadRows');
const extra = els.get('detailExtraRows');

function containerRows(el, staticHtml) {
  if (el && el._html !== null) return parseRows(el._html);
  // static: capture rows between container divs
  if (!staticHtml) return [];
  const inner = staticHtml.match(/<div id="detailLeadRows">([\s\S]*?)<\/div>\s*<div id="detailExtraRows">([\s\S]*?)<\/div>/);
  if (!inner) return [];
  let rows = parseRows('<div class="x">' + inner[1] + '</div>');
  const extraRows = parseRows('<div class="x">' + inner[2] + '</div>');
  // overlay textContent-driven id changes done by JS
  const byId = [
    ['detailPayer', 'Payer\'s Name'],
    ['detailPhone', 'Payer\'s Phone Number'],
    ['detailBiller', 'Receivers Business Name'],
    ['detailRefLabel', null], ['detailSerial', null], ['detailMonth', null],
    ['detailFee', 'Fee'], ['detailVat', 'VAT (15%)'],
    ['detailType', 'Transaction Type'], ['transactionId', 'Transaction ID'],
    ['detailDateLabel', null], ['detailDate', null],
  ];
  for (const [id, label] of byId) {
    const e = els.get(id);
    if (label && e) rows.push([label, e.innerText || e._text]);
  }
  return rows;
}

const leadRows = containerRows(lead, tDetails);
const extraRows = containerRows(extra, tDetails);

console.log('=== ' + file + ' (' + path.basename(payloadFile) + ') ===');

// generic: any element with real content
function show(id) {
  const e = els.get(id);
  if (!e) return null;
  return e._html !== null ? e._html : e._text;
}
const detailRowsEl = els.get('detailRows');
if (detailRowsEl) {
  console.log('--- review summary rows ---');
  if (detailRowsEl._html !== null) {
    const re = /<div class="sum-row[^"]*">\s*<span class="sum-key">([\s\S]*?)<\/span>\s*<span class="sum-val">([\s\S]*?)<\/span>/gi;
    let m;
    while ((m = re.exec(detailRowsEl._html)) !== null) {
      console.log('  ' + m[1] + '  =>  ' + m[2]);
    }
  }
  ['payeeName', 'payeeRef', 'fee', 'total', 'mainBal', 'rewardBal'].forEach(id => {
    if (show(id) !== null && show(id) !== '') console.log('  ' + id + '  =>  ' + show(id));
  });
  const cb = els.get('confirmBtn');
  if (cb) console.log('  confirmBtn.disabled = ' + cb.disabled + ', cls=' + JSON.stringify([...cb.classList._s]));
  const short = els.get('shortStrip');
  if (short) console.log('  shortStrip = ' + JSON.stringify(short._text) + ' cls=' + JSON.stringify([...short.classList._s]));
} else {
  console.log('--- leading rows ---');
  leadRows.forEach(r => console.log('  ' + r[0] + '  =>  ' + r[1]));
  console.log('--- extra rows ---');
  extraRows.forEach(r => console.log('  ' + r[0] + '  =>  ' + r[1]));
  console.log('--- amount section ---');
  const amt = els.get('detailAmount');
  const nm = els.get('detailName');
  if (nm) console.log('  beneficiary  =>  ' + nm._text);
  if (amt) console.log('  amount       =>  ' + amt._text);
  const tokenBox = els.get('tokenBox');
  if (tokenBox) console.log('  tokenBox.display = ' + (tokenBox.style.display === 'none' ? 'hidden' : 'visible'));
}