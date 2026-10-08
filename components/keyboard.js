/* ============================================================
   On-screen keyboard — a mock of the phone's own keyboard (dark,
   English (UK) with Korean hints), for prototype screens.

   Use: add one line before </body>:
     <script src="components/keyboard.js"></script>

   - Tapping any text field inside .phone-frame slides the keyboard up
     from the bottom. The screen's content is lifted above it (like the
     phone resizing the app), so docked cards and the focused field
     stay visible.
   - Keys type into the field at the caret and fire a normal `input`
     event, so each page's own oninput handlers (digit filters, lookups,
     validation) run as if the user typed.
   - Go presses Enter on the field (pages can listen for it), then closes.
   - Closes on tapping outside the fields, on Go, or with Escape.
   - Skip a field with  data-no-keyboard. Physical keyboards still work.
   - The switch at the top-right turns this keyboard off: it slides away and
     the PC / phone keyboard is used instead. It stays off for the next
     page loads and comes back on by itself on the 5th load.
   ============================================================ */
(function () {
  if (window.__mockKeyboard) return;
  window.__mockKeyboard = true;

  const HINTS = {
    q: 'ㅂ', w: 'ㅈ', e: 'ㄷ', r: 'ㄱ', t: 'ㅅ', y: 'ㅛ', u: 'ㅕ', i: 'ㅑ', o: 'ㅐ', p: 'ㅔ',
    a: 'ㅁ', s: 'ㄴ', d: 'ㅇ', f: 'ㄹ', g: 'ㅎ', h: 'ㅗ', j: 'ㅓ', k: 'ㅏ', l: 'ㅣ',
    z: 'ㅋ', x: 'ㅌ', c: 'ㅊ', v: 'ㅍ', b: 'ㅠ', n: 'ㅜ', m: 'ㅡ'
  };
  const LETTERS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
  const SYMBOLS = ['+×÷=/_<>[]', '!@#$%^&*()', "-'\":;,?"];

  const ICON = {
    emoji: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5"/><path d="M8 14.5c1 1.4 2.3 2 4 2s3-.6 4-2"/><circle cx="9" cy="10" r=".6" fill="currentColor"/><circle cx="15" cy="10" r=".6" fill="currentColor"/></svg>',
    sticker: '<svg viewBox="0 0 24 24"><path d="M20 12V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6"/><path d="M20 12c-4.5 0-8 3.5-8 8"/><path d="M8.5 13.5c.8 1 1.9 1.5 3.5 1.5"/><circle cx="9" cy="9.5" r=".6" fill="currentColor"/><circle cx="15" cy="9.5" r=".6" fill="currentColor"/></svg>',
    gif: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="3"/><text x="12" y="15.2" text-anchor="middle" font-size="6.5" font-weight="700" font-family="Arial, sans-serif" fill="currentColor" stroke="none">GIF</text></svg>',
    mic: '<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/></svg>',
    gear: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    shift: '<svg viewBox="0 0 24 24"><path d="M12 4 4 12.5h4.5V20h7v-7.5H20z"/></svg>',
    back: '<svg viewBox="0 0 24 24"><path d="M21 6H9l-6 6 6 6h12a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1z"/><path d="m11.5 9.5 5 5m0-5-5 5"/></svg>'
  };

  const CSS = `
  .mkb { position: absolute; left: 0; right: 0; bottom: 0; z-index: 200; background: #0B0B0C; color: #EDEDED;
    font-family: Roboto, 'Inter', system-ui, sans-serif; user-select: none; -webkit-user-select: none; touch-action: manipulation;
    transform: translateY(100%); transition: transform .26s cubic-bezier(.2,.8,.2,1); padding-bottom: 6px; }
  .mkb.open { transform: translateY(0); }
  .mkb-bar { height: 40px; display: flex; align-items: center; justify-content: space-around; background: #141415; padding: 0 6px; }
  .mkb-tool { position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; color: #6E6E73; border-radius: 50%; }
  .mkb-tool.on { color: #F2F2F2; }
  .mkb-tool svg { width: 22px; height: 22px; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
  /* On/off switch (top-right): off hands typing back to the PC / phone keyboard */
  .mkb-switch { width: 40px; height: 24px; border-radius: 12px; background: #4A9EFF; position: relative; cursor: pointer; flex-shrink: 0; transition: background .2s; margin: 0 6px; }
  .mkb-switch::after { content: ''; position: absolute; top: 3px; left: 19px; width: 18px; height: 18px; border-radius: 50%; background: #FFF; box-shadow: 0 1px 3px rgba(0,0,0,.4); transition: left .2s; }
  .mkb-switch.off { background: #48484C; }
  .mkb-switch.off::after { left: 3px; }
  .mkb-toast { position: absolute; left: 50%; bottom: 24px; transform: translate(-50%, 8px); z-index: 210; max-width: 86%; padding: 10px 14px; border-radius: 12px;
    background: rgba(28,28,33,.94); color: #FFF; font: 500 12.5px/1.35 'Switzer', 'Inter', sans-serif; text-align: center; opacity: 0; pointer-events: none; transition: opacity .2s, transform .2s; }
  .mkb-toast.show { opacity: 1; transform: translate(-50%, 0); }
  .mkb-keys { padding: 6px 4px 0; display: flex; flex-direction: column; gap: 7px; }
  .mkb-row { display: flex; gap: 5px; justify-content: center; }
  .mkb-row.inset { padding: 0 5%; }
  .mkb-key { position: relative; flex: 1 1 0; min-width: 0; height: 38px; border-radius: 6px; background: #2B2B2D; color: #F0F0F0;
    display: flex; align-items: center; justify-content: center; font-size: 19px; line-height: 1; cursor: pointer; transition: background .08s; }
  .mkb-row.num .mkb-key { height: 30px; font-size: 17px; }
  .mkb-key:active, .mkb-key.down { background: #4A4A4E; }
  .mkb-key .hint { position: absolute; top: 3px; right: 5px; font-size: 8.5px; color: #8AB4F8; }
  .mkb-key.fn { background: #1C1C1E; font-size: 15px; }
  .mkb-key.fn:active, .mkb-key.fn.down { background: #3A3A3D; }
  .mkb-key svg { width: 22px; height: 22px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linejoin: round; stroke-linecap: round; }
  .mkb-key.shift.on svg { fill: currentColor; }
  .mkb-key.shift.lock svg { fill: currentColor; }
  .mkb-key.shift.lock::after { content: ''; position: absolute; bottom: 5px; width: 14px; height: 2px; border-radius: 1px; background: currentColor; }
  .mkb-key.wide { flex: 1.5 1 0; }
  .mkb-key.sym { flex: 1.5 1 0; font-size: 15px; font-weight: 500; }
  .mkb-key.space { flex: 5 1 0; font-size: 13px; color: #E6E6E6; gap: 0; justify-content: space-between; padding: 0 12px; }
  .mkb-key.space i { font-style: normal; font-size: 9px; color: #E6E6E6; }
  .mkb-key.go { flex: 1.5 1 0; color: #4A9EFF; font-size: 15px; }
  .mkb-lift { transition: padding-bottom .26s cubic-bezier(.2,.8,.2,1); }
  `;

  let kb, field = null, shift = 0, symbols = false, lastShift = 0, liftEl = null, frame = null, userTap = false, repeatT = null;

  // Off for a few page loads: storage holds how many loads are left. Each load counts one down;
  // it switches itself back on when the count runs out (on the 5th load after turning it off).
  const OFF_KEY = 'mockKeyboardOffLoads', OFF_LOADS = 5;
  let enabled = true;
  try {
    const left = parseInt(localStorage.getItem(OFF_KEY) || '0', 10) - 1;
    if (left > 0) { enabled = false; localStorage.setItem(OFF_KEY, String(left)); }
    else localStorage.removeItem(OFF_KEY);
  } catch (_) { /* no storage: always on */ }

  function el(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }

  function letterKey(ch) {
    const hint = HINTS[ch] ? `<span class="hint">${HINTS[ch]}</span>` : '';
    return `<div class="mkb-key" data-k="${ch}"><span class="ch">${ch}</span>${hint}</div>`;
  }

  function render() {
    const rows = [];
    rows.push(`<div class="mkb-row num">${'1234567890'.split('').map(c => `<div class="mkb-key" data-k="${c}">${c}</div>`).join('')}</div>`);
    if (!symbols) {
      rows.push(`<div class="mkb-row">${LETTERS[0].split('').map(letterKey).join('')}</div>`);
      rows.push(`<div class="mkb-row inset">${LETTERS[1].split('').map(letterKey).join('')}</div>`);
      rows.push(`<div class="mkb-row"><div class="mkb-key fn wide shift" data-a="shift">${ICON.shift}</div>${LETTERS[2].split('').map(letterKey).join('')}<div class="mkb-key fn wide" data-a="back">${ICON.back}</div></div>`);
    } else {
      rows.push(`<div class="mkb-row">${SYMBOLS[0].split('').map(c => `<div class="mkb-key" data-k="${c}">${c}</div>`).join('')}</div>`);
      rows.push(`<div class="mkb-row">${SYMBOLS[1].split('').map(c => `<div class="mkb-key" data-k="${c}">${c}</div>`).join('')}</div>`);
      rows.push(`<div class="mkb-row"><div class="mkb-key fn wide" data-a="noop">1/2</div>${SYMBOLS[2].split('').map(c => `<div class="mkb-key" data-k="${c.replace('"', '&quot;')}">${c}</div>`).join('')}<div class="mkb-key fn wide" data-a="back">${ICON.back}</div></div>`);
    }
    rows.push(`<div class="mkb-row"><div class="mkb-key fn sym" data-a="sym">${symbols ? 'ABC' : '!#1'}</div><div class="mkb-key fn" data-k=",">,</div><div class="mkb-key space" data-k=" "><i>◀</i>English (UK)<i>▶</i></div><div class="mkb-key fn" data-k=".">.</div><div class="mkb-key fn go" data-a="go">Go</div></div>`);
    kb.querySelector('.mkb-keys').innerHTML = rows.join('');
    paintShift();
  }

  function paintShift() {
    const up = shift > 0;
    kb.querySelectorAll('.mkb-key .ch').forEach(s => { s.textContent = up ? s.textContent.toUpperCase() : s.textContent.toLowerCase(); });
    const sk = kb.querySelector('.shift');
    if (sk) { sk.classList.toggle('on', shift === 1); sk.classList.toggle('lock', shift === 2); }
  }

  function build() {
    frame = document.querySelector('.phone-frame') || document.body;
    if (getComputedStyle(frame).position === 'static') frame.style.position = 'relative';
    const style = document.createElement('style'); style.textContent = CSS; document.head.appendChild(style);
    kb = el(`<div class="mkb" aria-hidden="true">
      <div class="mkb-bar">
        <span class="mkb-tool">${ICON.emoji}</span><span class="mkb-tool">${ICON.sticker}</span><span class="mkb-tool">${ICON.gif}</span>
        <span class="mkb-tool">${ICON.mic}</span><span class="mkb-tool on">${ICON.gear}</span><span class="mkb-switch" role="switch" aria-checked="true" aria-label="Use this keyboard" title="Turn off to use your PC or phone keyboard"></span>
      </div>
      <div class="mkb-keys"></div>
    </div>`);
    frame.appendChild(kb);
    render();

    // The phone frame clips its content and is never meant to scroll; when the browser scrolls it to
    // show a focused field (hidden overlays can make it taller), put it back so the keyboard stays at the bottom.
    if (frame !== document.body) frame.addEventListener('scroll', () => { if (frame.scrollTop) frame.scrollTop = 0; });

    // Keys act on press (like a phone) and never take focus away from the field
    kb.addEventListener('pointerdown', e => {
      e.preventDefault();
      if (e.target.closest('.mkb-switch')) { turnOff(); return; }
      const key = e.target.closest('.mkb-key');
      if (!key || !field) return;
      key.classList.add('down');
      press(key);
      if (key.dataset.a === 'back') {   // hold to keep deleting
        clearInterval(repeatT);
        repeatT = setTimeout(() => { repeatT = setInterval(() => press(key), 60); }, 420);
      }
    });
    const up = () => { clearTimeout(repeatT); clearInterval(repeatT); kb.querySelectorAll('.down').forEach(k => k.classList.remove('down')); };
    kb.addEventListener('pointerup', up); kb.addEventListener('pointerleave', up); kb.addEventListener('pointercancel', up);
  }

  function press(key) {
    const a = key.dataset.a;
    if (a === 'shift') {
      const now = Date.now();
      shift = shift === 0 ? (now - lastShift < 300 ? 2 : 1) : (shift === 1 && now - lastShift < 300 ? 2 : 0);
      lastShift = now; paintShift(); return;
    }
    if (a === 'sym') { symbols = !symbols; render(); return; }
    if (a === 'noop') return;
    if (a === 'back') { erase(); return; }
    if (a === 'go') { go(); return; }
    let ch = key.dataset.k;
    if (ch == null) return;
    if (shift > 0 && /[a-z]/.test(ch)) ch = ch.toUpperCase();
    insert(ch);
    if (shift === 1) { shift = 0; paintShift(); }
  }

  function canEdit() { return field && !field.readOnly && !field.disabled; }

  function insert(text) {
    if (!canEdit()) return;
    const max = field.maxLength > 0 ? field.maxLength : Infinity;
    const s = field.selectionStart ?? field.value.length, e = field.selectionEnd ?? field.value.length;
    if (field.value.length - (e - s) + text.length > max) return;
    try { field.setRangeText(text, s, e, 'end'); } catch (_) { field.value += text; }
    fire();
  }

  function erase() {
    if (!canEdit()) return;
    let s = field.selectionStart ?? field.value.length, e = field.selectionEnd ?? field.value.length;
    if (s === e) { if (s === 0) return; s -= 1; }
    try { field.setRangeText('', s, e, 'end'); } catch (_) { field.value = field.value.slice(0, -1); }
    fire();
  }

  function fire() { field.dispatchEvent(new Event('input', { bubbles: true })); }

  function go() {
    const f = field;
    f.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true }));
    f.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true }));
    hide(true);
  }

  // Lift the screen's content above the keyboard: the first full-height column inside the frame gets bottom padding
  function lift(on) {
    if (!liftEl) liftEl = frame.querySelector(':scope > .app-content') || frame.querySelector('.app-content') || null;
    if (!liftEl) return;
    liftEl.classList.add('mkb-lift');
    liftEl.style.boxSizing = 'border-box';
    liftEl.style.paddingBottom = on ? kb.offsetHeight + 'px' : '';
  }

  function show(input) {
    field = input;
    shift = /^(text|search)$/.test(input.type) && !input.value && input.getAttribute('autocapitalize') !== 'off' && !/numeric|decimal|tel/.test(input.dataset.kbMode || '') ? 1 : 0;
    if (symbols) { symbols = false; render(); } else paintShift();
    kb.classList.add('open');
    lift(true);
    setTimeout(() => reveal(input), 280);
  }

  // Scroll the field into view inside the screen's own scroll areas only (never the browser page)
  function reveal(input) {
    for (let p = input.parentElement; p && p !== frame; p = p.parentElement) {
      const oy = getComputedStyle(p).overflowY;
      if (!/(auto|scroll)/.test(oy) || p.scrollHeight <= p.clientHeight) continue;
      const r = input.getBoundingClientRect(), b = p.getBoundingClientRect();
      if (r.bottom > b.bottom) p.scrollBy({ top: r.bottom - b.bottom + 12, behavior: 'smooth' });
      else if (r.top < b.top) p.scrollBy({ top: r.top - b.top - 12, behavior: 'smooth' });
      return;
    }
  }

  function hide(blur) {
    if (!kb.classList.contains('open')) return;
    kb.classList.remove('open');
    lift(false);
    if (blur && field) field.blur();
    field = null;
  }

  // Switch off: slide away, give fields back their own inputmode so the PC / phone keyboard is used
  function turnOff() {
    const f = field;
    kb.querySelector('.mkb-switch').classList.add('off');
    try { localStorage.setItem(OFF_KEY, String(OFF_LOADS)); } catch (_) {}
    setTimeout(() => {
      enabled = false;
      hide(false);
      frame.querySelectorAll('[data-kb-mode]').forEach(t => {
        if (t.dataset.kbMode) t.setAttribute('inputmode', t.dataset.kbMode); else t.removeAttribute('inputmode');
        delete t.dataset.kbMode;
      });
      if (f) { f.blur(); f.focus(); }   // re-focus so a phone opens its own keyboard
      toast('Using your PC / phone keyboard. This keyboard comes back on the 5th page load.');
    }, 220);
  }

  function toast(msg) {
    const t = el(`<div class="mkb-toast">${msg}</div>`);
    frame.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 250); }, 2800);
  }

  function isField(t) {
    return t && t.matches && t.matches('input:not([type]), input[type=text], input[type=tel], input[type=number], input[type=search], input[type=email], input[type=password], input[type=url], textarea')
      && enabled && !t.hasAttribute('data-no-keyboard') && frame.contains(t);
  }

  // Keep the phone's own keyboard away: fields report inputmode "none" (the original is kept in data-kb-mode)
  function quietNative(t) {
    if (t.dataset.kbMode === undefined) { t.dataset.kbMode = t.getAttribute('inputmode') || ''; t.setAttribute('inputmode', 'none'); }
  }

  function init() {
    if (!enabled) return;   // switched off: leave every field to the PC / phone keyboard
    build();
    frame.querySelectorAll('input, textarea').forEach(t => { if (isField(t)) quietNative(t); });

    // Only a real tap opens it — pages that focus a field on load don't pop the keyboard
    document.addEventListener('pointerdown', e => {
      const t = e.target;
      if (isField(t)) { quietNative(t); userTap = true; if (document.activeElement === t) show(t); return; }
      if (kb.contains(t)) return;
      if (kb.classList.contains('open')) hide(true);
    }, true);

    document.addEventListener('focusin', e => {
      const t = e.target;
      if (!isField(t)) return;
      quietNative(t);
      if (userTap || kb.classList.contains('open')) show(t);
      userTap = false;
    });

    document.addEventListener('keydown', e => { if (e.key === 'Escape') hide(true); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
