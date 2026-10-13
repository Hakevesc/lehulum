'use strict';
const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('Pay Merchant.html', 'utf8');

// tiny element stub
function makeEl(id) {
  const el = {
    id,
    style: {},
    _text: '',
    _html: null,
    textContent: '',
    innerHTML: '',
    disabled: false,
    classList: { _s: new Set(), add(c){ this._s.add(c); }, remove(c){ this._s.delete(c); },
      toggle(c, f){ if (f !== undefined ? f : !this._s.has(c)) this._s.add(c); else this._s.delete(c); },
      contains(c){ return this._s.has(c); } },
    setAttribute(){}, querySelector(){ return makeEl(id + ':q'); },
    appendChild(){}, removeChild(){},
    focus(){},
    set textContent(v){ this._text = String(v); this._html = null; },
    get textContent(){ return this._text; },
    set innerHTML(v){ this._html = String(v); this._text = ''; },
    get innerHTML(){ return this._html === null ? this._text : this._html; },
  };
  return el;
}

const ids = [...new Set([...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]))];
const els = new Map();
ids.forEach(id => els.set(id, makeEl(id)));

const document = {
  readyState: 'complete',
  documentElement: { style: { setProperty() {} } },
  head: { appendChild() {} },
  body: { appendChild() {}, removeChild() {} },
  getElementById(id){ if (!els.has(id)) els.set(id, makeEl(id)); return els.get(id); },
  querySelector(){ return null; },
  querySelectorAll(){ return []; },
  createElement(){ return makeEl('dyn'); },
};

// extract the main inline script (contains getElementById/switchTab, no src)
const scripts = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)]
  .map(m => m[1])
  .filter(s => /\b(getElementById|switchTab|armScanner)\b/.test(s));

const sessionStorage = { _m: {}, getItem(k){ return this._m[k]; }, setItem(k,v){ this._m[k] = String(v); }, removeItem(k){ delete this._m[k]; } };
const navigator = {};  // no mediaDevices => startQrCamera falls back silently
const lucide = { createIcons(){} };
const windowObj = { _qrCamStream: null, location: { href: 'about:blank' } };
// armScanner schedules a 10s scan; replace setTimeout in vm so it never fires
const setTimeoutSafe = () => 0;

try {
  const vmSrc = scripts.join('\n') + '\n';
  const fn = new Function('document', 'sessionStorage', 'navigator', 'lucide', 'window',
    'setTimeout', 'clearTimeout',
    vmSrc);
  fn(document, sessionStorage, navigator, lucide, windowObj, setTimeoutSafe, () => {});
} catch (e) {
  console.log('RUNTIME ERROR: ' + e.message);
  process.exit(1);
}

const out = (name) => {
  const el = els.get(name);
  return el ? el.innerHTML : '(missing)';
};
console.log('=== #frequentList (QR tab) ===');
console.log(out('frequentList') || '(EMPTY)');
console.log();
console.log('=== #codeFrequentList (Code tab) ===');
console.log(out('codeFrequentList') || '(EMPTY)');
console.log();
console.log('#frequentList items:', (out('frequentList').match(/class="frequent-item"/g) || []).length);
console.log('#codeFrequentList items:', (out('codeFrequentList').match(/class="frequent-item"/g) || []).length);