/* ============================================================
   PIN feedback — shared by every Enter PIN screen.
   pinFeedback(ok, done): draws a stroke around each .pin-box, one
   after another — green when the PIN is accepted, red (with a
   shake) when it is wrong — then calls done() so the screen can
   move on or show its error. Ignores new calls while one plays.
   ============================================================ */
(function () {
  'use strict';

  var GREEN = '#16A34A', RED = '#FE353D';
  var STAGGER = 70, DRAW = 380;

  var style = document.createElement('style');
  style.textContent = [
    '.pin-box{position:relative}',
    '.pin-stroke{position:absolute;inset:-2px;width:calc(100% + 4px);height:calc(100% + 4px);pointer-events:none;overflow:visible}',
    '.pin-stroke rect{fill:none;stroke-width:2.5;stroke-dasharray:100;stroke-dashoffset:100;stroke-linecap:round}',
    '.pin-box.pin-ok .pin-stroke rect{stroke:' + GREEN + ';animation:pinDraw ' + DRAW + 'ms ease-out forwards}',
    '.pin-box.pin-bad .pin-stroke rect{stroke:' + RED + ';animation:pinDraw ' + DRAW + 'ms ease-out forwards}',
    '.pin-box.pin-ok{background:#F0FBF3;border-color:transparent}',
    '.pin-box.pin-bad{background:#FFF4F4;border-color:transparent}',
    '.pin-box.pin-ok .dot{background:' + GREEN + '}',
    '.pin-box.pin-bad .dot{background:' + RED + '}',
    '.pin-shake{animation:pinShake .38s ease-in-out}',
    '@keyframes pinDraw{to{stroke-dashoffset:0}}',
    '@keyframes pinShake{20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}'
  ].join('\n');
  document.head.appendChild(style);

  function strokeFor(box) {
    var svg = box.querySelector('.pin-stroke');
    if (!svg) {
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'pin-stroke');
      svg.setAttribute('aria-hidden', 'true');
      svg.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'rect'));
      box.appendChild(svg);
    }
    // Match the box's own size and corner radius, inset by half the stroke
    var r = box.getBoundingClientRect();
    var w = r.width + 4, h = r.height + 4;
    var rad = (parseFloat(getComputedStyle(box).borderTopLeftRadius) || 14) + 2;
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    var rect = svg.firstChild;
    rect.setAttribute('x', 1.25); rect.setAttribute('y', 1.25);
    rect.setAttribute('width', w - 2.5); rect.setAttribute('height', h - 2.5);
    rect.setAttribute('rx', rad); rect.setAttribute('pathLength', 100);
    return svg;
  }

  function pinFeedback(ok, done) {
    if (pinFeedback.busy) return;
    pinFeedback.busy = true;
    var boxes = document.querySelectorAll('.pin-box');
    var cls = ok ? 'pin-ok' : 'pin-bad';
    boxes.forEach(function (box, i) {
      box.classList.remove('pin-ok', 'pin-bad', 'error', 'active');
      var svg = strokeFor(box);
      svg.firstChild.style.animationDelay = (i * STAGGER) + 'ms';
      void box.offsetWidth;          // restart the animation on repeat attempts
      box.classList.add(cls);
    });
    var total = (boxes.length - 1) * STAGGER + DRAW;
    var row = boxes.length ? boxes[0].parentNode : null;
    if (!ok && row) setTimeout(function () { row.classList.add('pin-shake'); }, total - 80);
    setTimeout(function () {
      pinFeedback.busy = false;
      if (!ok) {
        if (row) row.classList.remove('pin-shake');
        boxes.forEach(function (b) { b.classList.remove('pin-bad'); });
      }
      if (typeof done === 'function') done();
    }, total + (ok ? 180 : 320));
  }
  pinFeedback.busy = false;
  window.pinFeedback = pinFeedback;
})();
