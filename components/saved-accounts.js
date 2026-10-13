/* ============================================================
   Saved accounts — shared by the bill payment entry screens.
   Every account / reference number a user pays to is remembered
   (newest first, per biller) so next time it is one tap instead of
   typing all the digits again. Same look as the EEU screen.

   SavedAccounts.mount({
     key:    'waterSavedAccounts',      // localStorage key, one per biller
     host:   element,                   // the list is appended inside it
     before: element?,                  // …or inserted before this child of host
     logo:   'assets/…png',             // default logo for a row
     onPick: acct => { … }              // fill the screen from a saved row
   });
   SavedAccounts.remember(key, { number, customer, tag?, logo?, extra? });
   ============================================================ */
(function () {
  'use strict';

  var MAX = 5;

  var css = [
    // cards keep their height and the screen scrolls, instead of squashing an open card
    '.scroll>*{flex-shrink:0}',
    '.sa-wrap{display:none;flex-direction:column;gap:10px;margin-top:4px;flex-shrink:0}',
    '.sa-wrap.show{display:flex}',
    '.sa-title{padding:0 4px;font-family:"Switzer",sans-serif;font-size:15px;font-weight:600;color:#1C1C21}',
    '.sa-list{display:flex;flex-direction:column;gap:10px}',
    '.sa-item{display:flex;align-items:center;gap:14px;padding:14px 12px 14px 16px;cursor:pointer;background:#FFF;border-radius:16px;box-shadow:0 2px 8px rgba(0,0,0,0.04);transition:background .15s}',
    '.sa-item:hover{background:#FAFAFB}',
    '.sa-logo{width:44px;height:44px;border-radius:50%;overflow:hidden;flex-shrink:0;background:#F1F1F4;display:flex;align-items:center;justify-content:center;font-family:"Switzer",sans-serif;font-size:13px;font-weight:700;color:#7C7C87}',
    '.sa-logo img{width:100%;height:100%;object-fit:contain}',
    '.sa-info{flex:1;min-width:0;display:flex;flex-direction:column;gap:6px}',
    '.sa-nm{font-family:"Switzer",sans-serif;font-size:16px;font-weight:700;color:#1C1C21;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.sa-meta{display:flex;align-items:center;gap:12px;font-family:"Switzer",sans-serif;font-size:14px;color:#7C7C87;letter-spacing:.3px;min-width:0}',
    // the number always shows in full; a long tag is what gets shortened
    '.sa-meta .num{white-space:nowrap;flex-shrink:0}',
    '.sa-tag{font-size:13px;font-weight:500;padding:4px 12px;border-radius:14px;background:#EDEDF0;color:#1C1C21;letter-spacing:0;white-space:nowrap;min-width:0;overflow:hidden;text-overflow:ellipsis}',
    '.sa-chev{width:20px;height:20px;margin-right:4px;stroke:#FE353D;stroke-width:2.4;fill:none;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0}'
  ].join('\n');
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  function load(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; } catch (e) { return []; }
  }
  function store(key, list) {
    try { localStorage.setItem(key, JSON.stringify(list)); } catch (e) {}
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  // Newest first; paying the same number again moves it to the top.
  function remember(key, acct) {
    if (!acct || !acct.number) return;
    var list = load(key).filter(function (a) {
      return !(a.number === acct.number && (a.tag || '') === (acct.tag || ''));
    });
    list.unshift(acct);
    store(key, list.slice(0, MAX));
  }

  function mount(opts) {
    var wrap = document.createElement('div');
    wrap.className = 'sa-wrap';
    wrap.innerHTML = '<span class="sa-title">Saved Accounts</span><div class="sa-list"></div>';
    if (opts.before) opts.host.insertBefore(wrap, opts.before);
    else opts.host.appendChild(wrap);
    var listEl = wrap.querySelector('.sa-list');

    function render() {
      var list = load(opts.key);
      wrap.classList.toggle('show', list.length > 0);
      listEl.innerHTML = list.map(function (a, i) {
        var logo = a.logo || opts.logo;
        return '<div class="sa-item" data-i="' + i + '">' +
          '<span class="sa-logo">' + (logo ? '<img src="' + esc(logo) + '" alt="">' : esc((a.customer || '?').slice(0, 2).toUpperCase())) + '</span>' +
          '<div class="sa-info">' +
            '<span class="sa-nm">' + esc(a.customer || a.number) + '</span>' +
            '<span class="sa-meta">' + (a.tag ? '<span class="sa-tag">' + esc(a.tag) + '</span>' : '') +
              '<span class="num">' + esc(a.number) + '</span></span>' +
          '</div>' +
          '<svg class="sa-chev" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>' +
        '</div>';
      }).join('');
    }

    listEl.addEventListener('click', function (e) {
      var list = load(opts.key);
      var row = e.target.closest('.sa-item');
      if (row && list[+row.getAttribute('data-i')]) opts.onPick(list[+row.getAttribute('data-i')]);
    });

    render();
    return { render: render };
  }

  window.SavedAccounts = { mount: mount, remember: remember };
})();
