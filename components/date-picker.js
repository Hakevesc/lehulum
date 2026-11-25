/* M-PESA date picker — replaces the browser's calendar on every <input type="date"> on the page.
   The input keeps its ISO value (YYYY-MM-DD), min/max and change events, so page code is unchanged;
   it is shown as a field ("19 Dec 2026" + calendar icon) that opens a bottom-sheet calendar:
   month header with ‹ ›, weekday row, day grid (today ringed, selected filled red, out-of-range greyed),
   tap the month title to pick a month/year, Cancel / Confirm. */
(function () {
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const SHORT = MONTHS.map(m => m.slice(0, 3));
  const pad = n => String(n).padStart(2, '0');
  const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parse = s => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ''); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; };
  const nice = d => `${d.getDate()} ${SHORT[d.getMonth()]} ${d.getFullYear()}`;
  const CAL = '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>';
  const L = '<svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg>', R = '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>';

  const css = `
  .dp-field { position: relative; width: 100%; height: 52px; display: flex; align-items: center; gap: 10px; padding: 0 14px; border: 1px solid #E6E6EA; border-radius: 14px; background: #FFF; font-family: Switzer, sans-serif; font-size: 15px; font-weight: 500; color: #1C1C21; text-align: left; cursor: pointer; }
  .dp-field:focus-visible, .dp-field.open { outline: none; border-color: var(--Primary, #FE353D); }
  .dp-field .t { flex: 1; min-width: 0; }
  .dp-field .t.ph { color: #A0A0AA; font-weight: 400; }
  .dp-field svg { width: 20px; height: 20px; stroke: var(--Primary, #FE353D); stroke-width: 1.9; fill: none; stroke-linecap: round; stroke-linejoin: round; flex-shrink: 0; }
  input.dp-src { position: absolute !important; width: 1px !important; height: 1px !important; opacity: 0 !important; pointer-events: none !important; }
  .dp-scrim { position: absolute; inset: 0; z-index: 300; background: rgba(0,0,0,0.42); opacity: 0; visibility: hidden; transition: opacity 0.22s, visibility 0.22s; }
  .dp-scrim.show { opacity: 1; visibility: visible; }
  .dp-sheet { position: absolute; left: 0; right: 0; bottom: 0; z-index: 301; padding: 10px 16px 20px; border-radius: 28px 28px 0 0; background: #FFF; font-family: Switzer, sans-serif; transform: translateY(100%); transition: transform 0.28s cubic-bezier(.2,.8,.2,1); }
  .dp-sheet.show { transform: translateY(0); }
  .dp-grip { width: 40px; height: 4px; margin: 0 auto 14px; border-radius: 2px; background: #D8D8DE; }
  .dp-title { margin: 0 4px 2px; font-size: 13px; color: #7C7C87; }
  .dp-sel { margin: 0 4px 14px; font-size: 20px; font-weight: 600; color: #1C1C21; }
  .dp-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
  .dp-month { display: inline-flex; align-items: center; gap: 6px; height: 36px; padding: 0 12px; border: none; border-radius: 10px; background: #FFF1F2; color: #1C1C21; font-family: Switzer, sans-serif; font-size: 14.5px; font-weight: 600; cursor: pointer; }
  .dp-month i { width: 0; height: 0; border-left: 4.5px solid transparent; border-right: 4.5px solid transparent; border-top: 5.5px solid var(--Primary, #FE353D); transition: transform 0.2s; }
  .dp-sheet.years .dp-month i { transform: rotate(180deg); }
  .dp-nav { display: flex; gap: 8px; }
  .dp-nav button { width: 36px; height: 36px; border: 1px solid #ECECEF; border-radius: 50%; background: #FFF; display: grid; place-items: center; cursor: pointer; }
  .dp-nav button:disabled { opacity: 0.35; cursor: default; }
  .dp-nav svg { width: 18px; height: 18px; stroke: #1C1C21; stroke-width: 2.2; fill: none; stroke-linecap: round; stroke-linejoin: round; }
  .dp-week, .dp-days { display: grid; grid-template-columns: repeat(7, 1fr); }
  .dp-week span { padding: 8px 0; text-align: center; font-size: 11.5px; font-weight: 600; color: #A0A0AA; }
  .dp-days button { height: 42px; margin: 1px 0; border: none; background: none; display: grid; place-items: center; cursor: pointer; font-family: Switzer, sans-serif; }
  .dp-days button b { width: 38px; height: 38px; display: grid; place-items: center; border-radius: 50%; font-size: 14px; font-weight: 500; color: #1C1C21; transition: background 0.15s; }
  .dp-days button:hover b { background: #FFF6F6; }
  .dp-days button.today b { box-shadow: inset 0 0 0 1.5px var(--Primary, #FE353D); color: var(--Primary, #FE353D); }
  .dp-days button.on b { background: var(--Primary, #FE353D); color: #FFF; box-shadow: 0 4px 10px rgba(254,53,61,0.3); }
  .dp-days button:disabled { cursor: default; }
  .dp-days button:disabled b { color: #D0D0D6; background: none; box-shadow: none; text-decoration: line-through; text-decoration-color: #E6E6EA; }
  .dp-days .blank { height: 42px; }
  .dp-years { display: none; grid-template-columns: repeat(3, 1fr); gap: 8px; max-height: 270px; overflow-y: auto; padding: 4px 0; scrollbar-width: none; }
  .dp-sheet.years .dp-years { display: grid; }
  .dp-sheet.years .dp-week, .dp-sheet.years .dp-days, .dp-sheet.years .dp-nav { display: none; }
  .dp-years button { height: 40px; border: 1px solid #ECECEF; border-radius: 12px; background: #FFF; font-family: Switzer, sans-serif; font-size: 13px; font-weight: 600; color: #1C1C21; cursor: pointer; }
  .dp-years button.on { border-color: var(--Primary, #FE353D); background: #FFF1F2; color: var(--Primary, #FE353D); }
  .dp-years button:disabled { opacity: 0.35; cursor: default; }
  .dp-years p { grid-column: 1 / -1; margin: 6px 2px 0; font-size: 12px; font-weight: 600; color: #7C7C87; }
  .dp-acts { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 14px; }
  .dp-acts button { height: 50px; border-radius: 14px; font-family: Switzer, sans-serif; font-size: 15px; font-weight: 500; cursor: pointer; }
  .dp-acts .no { border: 1.5px solid #E0E0E4; background: #FFF; color: #55555E; }
  .dp-acts .ok { border: none; background: var(--Primary, #FE353D); color: #FFF; box-shadow: 0 4px 16px rgba(254,53,61,0.25); }
  .dp-acts .ok:disabled { background: #E0E0E0; color: #7C7C87; box-shadow: none; }`;

  let sheet, scrim, cur = null, view = null, pick = null;
  const host = () => document.querySelector('.phone-frame') || document.body;

  function build() {
    if (sheet) return;
    addCss();
    scrim = document.createElement('div'); scrim.className = 'dp-scrim'; scrim.onclick = close;
    sheet = document.createElement('div'); sheet.className = 'dp-sheet'; sheet.setAttribute('role', 'dialog'); sheet.setAttribute('aria-label', 'Choose a date');
    sheet.innerHTML = `<div class="dp-grip"></div><p class="dp-title" id="dpTitle">Select date</p><p class="dp-sel" id="dpSel"></p>
      <div class="dp-head"><button type="button" class="dp-month" id="dpMonth"></button><span class="dp-nav"><button type="button" id="dpPrev" aria-label="Previous month">${L}</button><button type="button" id="dpNext" aria-label="Next month">${R}</button></span></div>
      <div class="dp-week">${['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => `<span>${d}</span>`).join('')}</div>
      <div class="dp-days" id="dpDays"></div><div class="dp-years" id="dpYears"></div>
      <div class="dp-acts"><button type="button" class="no" id="dpNo">Cancel</button><button type="button" class="ok" id="dpOk">Confirm</button></div>`;
    host().append(scrim, sheet);
    const $ = id => sheet.querySelector('#' + id);
    $('dpPrev').onclick = () => { view = new Date(view.getFullYear(), view.getMonth() - 1, 1); draw(); };
    $('dpNext').onclick = () => { view = new Date(view.getFullYear(), view.getMonth() + 1, 1); draw(); };
    $('dpMonth').onclick = () => { sheet.classList.toggle('years'); draw(); };
    $('dpNo').onclick = close;
    $('dpOk').onclick = () => { if (!pick) return; set(cur, iso(pick)); close(); };
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && sheet.classList.contains('show')) close(); });
  }
  const lim = (inp, k) => parse(inp.getAttribute(k));
  const inRange = (inp, d) => { const mn = lim(inp, 'min'), mx = lim(inp, 'max'); return !(mn && d < mn) && !(mx && d > mx); };

  function draw() {
    const $ = id => sheet.querySelector('#' + id), today = new Date(); today.setHours(0, 0, 0, 0);
    const y = view.getFullYear(), m = view.getMonth(), mn = lim(cur, 'min'), mx = lim(cur, 'max');
    $('dpMonth').innerHTML = `${MONTHS[m]} ${y}<i></i>`;
    $('dpSel').textContent = pick ? nice(pick) : 'No date';
    $('dpPrev').disabled = !!(mn && new Date(y, m, 0) < mn);
    $('dpNext').disabled = !!(mx && new Date(y, m + 1, 1) > mx);
    const first = new Date(y, m, 1).getDay(), n = new Date(y, m + 1, 0).getDate();
    let h = ''; for (let i = 0; i < first; i++) h += '<span class="blank"></span>';
    for (let d = 1; d <= n; d++) {
      const dt = new Date(y, m, d), ok = inRange(cur, dt);
      const cls = [+dt === +today ? 'today' : '', pick && +dt === +pick ? 'on' : ''].join(' ').trim();
      h += `<button type="button" data-d="${d}"${cls ? ` class="${cls}"` : ''}${ok ? '' : ' disabled'} aria-label="${nice(dt)}"><b>${d}</b></button>`;
    }
    $('dpDays').innerHTML = h;
    $('dpDays').querySelectorAll('button').forEach(b => b.onclick = () => { pick = new Date(y, m, +b.dataset.d); draw(); });
    // Month / year chooser
    const y0 = (mn ? mn.getFullYear() : today.getFullYear() - 5), y1 = (mx ? mx.getFullYear() : today.getFullYear() + 10);
    let yh = '';
    for (let yy = y0; yy <= y1; yy++) {
      yh += `<p>${yy}</p>` + SHORT.map((s, k) => { const a = new Date(yy, k, 1), b = new Date(yy, k + 1, 0);
        const off = (mn && b < mn) || (mx && a > mx);
        return `<button type="button" data-y="${yy}" data-m="${k}"${yy === y && k === m ? ' class="on"' : ''}${off ? ' disabled' : ''}>${s}</button>`; }).join('');
    }
    $('dpYears').innerHTML = yh;
    $('dpYears').querySelectorAll('button').forEach(b => b.onclick = () => { view = new Date(+b.dataset.y, +b.dataset.m, 1); sheet.classList.remove('years'); draw(); });
    if (sheet.classList.contains('years')) { const on = $('dpYears').querySelector('.on'); if (on) on.scrollIntoView({ block: 'center' }); }
    $('dpOk').disabled = !pick || !inRange(cur, pick);
  }
  function open(inp) {
    build(); cur = inp;
    pick = parse(inp.value); view = pick ? new Date(pick.getFullYear(), pick.getMonth(), 1) : (() => { const t = lim(inp, 'min') || new Date(); return new Date(t.getFullYear(), t.getMonth(), 1); })();
    const lab = inp.closest('label, .field, .blk'), t = lab && lab.querySelector('span');
    sheet.querySelector('#dpTitle').textContent = t && t.textContent.trim() ? t.textContent.trim() : 'Select date';
    sheet.classList.remove('years'); draw();
    scrim.classList.add('show'); sheet.classList.add('show'); inp._dpBtn.classList.add('open');
  }
  function close() { if (!sheet) return; scrim.classList.remove('show'); sheet.classList.remove('show'); if (cur && cur._dpBtn) cur._dpBtn.classList.remove('open'); }
  function set(inp, v) {
    inp.value = v;
    inp.dispatchEvent(new Event('input', { bubbles: true }));
    inp.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // Turn each date input into the M-PESA field (keeps the real input for its value / events)
  function enhance(inp) {
    if (inp._dpBtn) return;
    const btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'dp-field';
    btn.innerHTML = `<span class="t"></span>${CAL}`;
    btn.onclick = e => { e.preventDefault(); open(inp); };
    inp.classList.add('dp-src'); inp.tabIndex = -1; inp.setAttribute('aria-hidden', 'true');
    inp.insertAdjacentElement('afterend', btn); inp._dpBtn = btn;
    const show = () => { const d = parse(inp.value), t = btn.querySelector('.t'); t.textContent = d ? nice(d) : 'Select a date'; t.classList.toggle('ph', !d); };
    // Page code sets .value directly: keep the field in step
    const desc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
    Object.defineProperty(inp, 'value', { configurable: true, get() { return desc.get.call(this); }, set(v) { desc.set.call(this, v); show(); } });
    show();
  }
  // Styles go in up front so the field looks right before the calendar is ever opened
  let cssIn = false;
  function addCss() { if (cssIn) return; cssIn = true; const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st); }
  function init() { addCss(); document.querySelectorAll('input[type="date"]').forEach(enhance); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.MPDatePicker = { enhance, open };
})();
