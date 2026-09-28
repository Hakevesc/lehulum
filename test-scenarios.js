/* ============================================================
   🧪 Test Scenarios — shared floating panel for every screen
   ------------------------------------------------------------
   Injects the same FAB + popup that Airtime_Buy ships inline,
   filled with the states that actually exist for the flow the
   current screen belongs to (happy-path steps + error states).

   The FAB keeps the class name `test-fab` and exposes
   window.toggleTestPopup() so the hub (index.html) can hide it
   and proxy it from its own FAB stack.

   Scenario data lives in TEST_SCENARIOS below, keyed by file
   name — regenerate with scripts/build-test-scenarios.py.
   ============================================================ */
(function () {
  'use strict';

  var DATA = window.TEST_SCENARIOS_DATA || { flows: {}, pages: {} };

  // The registry stores each flow once; a screen shows its flow minus itself.
  function scenariosFor(file) {
    var flow = DATA.pages[file];
    if (!flow || !DATA.flows[flow]) return null;
    var f = DATA.flows[flow];
    var drop = function (list) {
      return (list || []).filter(function (item) { return item[0] !== file; });
    };
    return { flow: flow, steps: drop(f.steps), errors: drop(f.errors) };
  }

  var ICON_STEP  = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M10 8l4 4-4 4"/></svg>';
  var ICON_ERROR = '<svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';

  function currentFile() {
    var p = decodeURIComponent(location.pathname.split('/').pop() || '');
    return p || 'index.html';
  }

  function css() {
    return [
      '.test-fab{position:fixed;bottom:86px;right:24px;z-index:999999;width:50px;height:50px;border-radius:50%;background:#2563EB;border:3.5px solid #FFF;color:#FFF;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 24px rgba(37,99,235,.45),0 2px 8px rgba(0,0,0,.2);transition:all .22s cubic-bezier(.34,1.56,.64,1);user-select:none;padding:0;font-size:22px;line-height:1}',
      '.test-fab:hover{background:#1D4ED8;transform:translateY(-3px) scale(1.06);box-shadow:0 12px 28px rgba(37,99,235,.6),0 4px 12px rgba(0,0,0,.25)}',
      '.test-fab:active{transform:scale(.95)}',
      '.test-fab .tp-info{width:26px;height:26px}',
      '.test-popup{position:fixed;bottom:148px;right:24px;width:320px;background:#1C1C21;border:1px solid rgba(255,255,255,.14);border-radius:18px;box-shadow:0 16px 40px rgba(0,0,0,.5);z-index:999999;display:none;flex-direction:column;overflow:hidden;font-family:"Switzer","Inter",sans-serif;animation:tsPopupSlide .25s cubic-bezier(.34,1.2,.64,1)}',
      '.test-popup.show{display:flex}',
      '@keyframes tsPopupSlide{from{opacity:0;transform:translateY(12px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}',
      '.test-popup-header{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,.08)}',
      '.test-popup-title{font-size:13.5px;font-weight:700;color:#FFF;display:flex;align-items:center;gap:8px}',
      '.test-popup-flow{font-size:10px;font-weight:600;color:rgba(255,255,255,.45);letter-spacing:.4px;margin-top:2px}',
      '.test-popup-close{width:24px;height:24px;border-radius:50%;background:rgba(255,255,255,.08);border:none;color:rgba(255,255,255,.7);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .15s;flex-shrink:0}',
      '.test-popup-close:hover{background:rgba(255,255,255,.18);color:#FFF}',
      '.test-popup-close svg{width:14px;height:14px;stroke:currentColor;stroke-width:2.2;fill:none}',
      '.test-popup-body{padding:12px 14px 14px;display:flex;flex-direction:column;gap:6px;max-height:380px;overflow-y:auto}',
      '.test-section-title{font-size:10px;font-weight:700;color:rgba(255,255,255,.4);letter-spacing:.8px;text-transform:uppercase;margin-bottom:2px}',
      '.test-section-title+.test-section-title,.test-row+.test-section-title{margin-top:10px}',
      '.test-row{display:flex;align-items:center;gap:10px;padding:8px 4px;border-bottom:1px solid rgba(255,255,255,.06);cursor:pointer;transition:background .15s;border-radius:8px}',
      '.test-row:hover{background:rgba(255,255,255,.05)}',
      '.test-row:last-child{border-bottom:none}',
      '.test-row-icon{width:32px;height:32px;border-radius:10px;background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;flex-shrink:0}',
      '.test-row-icon svg{width:16px;height:16px;stroke:#FFF;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}',
      '.test-row-icon.error{background:rgba(255,152,0,.15)}',
      '.test-row-icon.error svg{stroke:#FF9800}',
      '.test-row-info{display:flex;flex-direction:column;gap:2px;flex:1;min-width:0}',
      '.test-row-label{font-size:12.5px;font-weight:600;color:#FFF}',
      '.test-row-desc{font-size:10.5px;color:rgba(255,255,255,.45);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.test-empty{font-size:11.5px;color:rgba(255,255,255,.45);padding:6px 4px;line-height:1.5}'
    ].join('\n');
  }

  function rowsFor(list, kind) {
    return list.map(function (item) {
      var file = item[0], label = item[1];
      return '<div class="test-row" data-file="' + file.replace(/"/g, '&quot;') + '">' +
               '<div class="test-row-icon' + (kind === 'error' ? ' error' : '') + '">' +
                 (kind === 'error' ? ICON_ERROR : ICON_STEP) +
               '</div>' +
               '<div class="test-row-info">' +
                 '<span class="test-row-label">' + label + '</span>' +
                 '<span class="test-row-desc">' + (kind === 'error' ? 'Jump to this error state' : 'Jump to this step') + '</span>' +
               '</div>' +
             '</div>';
    }).join('');
  }

  function build() {
    var file = currentFile();
    var data = scenariosFor(file);
    if (!data) return;                       // screen not in the registry
    if (document.querySelector('.test-fab')) return;  // screen ships its own panel

    var style = document.createElement('style');
    style.textContent = css();
    document.head.appendChild(style);

    var fab = document.createElement('div');
    fab.className = 'test-fab';
    fab.id = 'testFab';
    fab.title = 'Test info — ' + data.flow;
    fab.innerHTML = '<svg class="tp-info" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5"/><line x1="12" y1="11" x2="12" y2="16.5"/><circle cx="12" cy="7.6" r="0.6" fill="currentColor"/></svg>';
    fab.onclick = window.toggleTestPopup;

    var body = '';
    if (data.steps && data.steps.length) {
      body += '<div class="test-section-title">Flow steps</div>' + rowsFor(data.steps, 'step');
    }
    if (data.errors && data.errors.length) {
      body += '<div class="test-section-title">Error &amp; edge states</div>' + rowsFor(data.errors, 'error');
    }
    if (!body) body = '<div class="test-empty">No other screens exist for this flow yet.</div>';

    var popup = document.createElement('div');
    popup.className = 'test-popup';
    popup.id = 'testPopup';
    popup.innerHTML =
      '<div class="test-popup-header">' +
        '<div>' +
          '<div class="test-popup-title">Test Info</div>' +
          '<div class="test-popup-flow">' + data.flow + '</div>' +
        '</div>' +
        '<button class="test-popup-close" type="button">' +
          '<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        '</button>' +
      '</div>' +
      '<div class="test-popup-body">' + body + '</div>';

    popup.querySelector('.test-popup-close').onclick = window.toggleTestPopup;
    popup.addEventListener('click', function (e) {
      var row = e.target.closest('.test-row');
      if (row) window.location.href = row.getAttribute('data-file');
    });

    document.body.appendChild(fab);
    document.body.appendChild(popup);
  }

  window.toggleTestPopup = function () {
    var popup = document.getElementById('testPopup');
    if (popup) popup.classList.toggle('show');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
