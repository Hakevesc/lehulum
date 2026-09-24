/*
 * Draws a receipt QR into an <img> without leaving the page.
 *
 * Receipts used to point the image straight at api.qrserver.com, which leaves a
 * broken image wherever the network is unavailable or external images are
 * blocked. This renders the code locally with the bundled qrcode library and
 * only falls back to the remote service if that library failed to load.
 *
 * Any QR drawn into an element inside `.qr-wrapper` also becomes tappable:
 * tapping it opens a centered "bigger view" modal (openQrZoom) so the customer
 * can show the enlarged code to an agent. Pages with their own QR sheet (for
 * example the voucher "Share QR" modal) are left untouched because their image
 * does not sit inside a `.qr-wrapper`.
 */
(function (global) {
  'use strict';

  function remoteUrl(text, size) {
    return 'https://api.qrserver.com/v1/create-qr-code/?size=' + size + 'x' + size +
      '&data=' + encodeURIComponent(text) + '&margin=10';
  }

  // ── Bigger-view modal (lazily built once, reused across every receipt) ──
  var zoomOverlay = null;
  var zoomStylesAdded = false;

  function buildZoomOverlay() {
    if (zoomOverlay) return zoomOverlay;
    var overlay = document.createElement('div');
    overlay.className = 'qrz-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeQrZoom();
    });

    var card = document.createElement('div');
    card.className = 'qrz-card';

    var closeBtn = document.createElement('button');
    closeBtn.className = 'qrz-close';
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.innerHTML =
      '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">' +
      '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    closeBtn.addEventListener('click', closeQrZoom);

    var title = document.createElement('div');
    title.className = 'qrz-title';
    title.textContent = 'Share QR';

    var wrap = document.createElement('div');
    wrap.className = 'qrz-wrap';

    var img = document.createElement('img');
    img.className = 'qrz-img';
    img.alt = 'Transaction QR Code';

    var chip = document.createElement('div');
    chip.className = 'qrz-chip';

    var chipM = document.createElement('div');
    chipM.className = 'qrz-chip-m';
    chipM.textContent = 'M';

    chip.appendChild(chipM);

    var hint = document.createElement('div');
    hint.className = 'qrz-hint';
    hint.textContent = 'Show this code to confirm your transaction.';

    wrap.appendChild(img);
    wrap.appendChild(chip);
    card.appendChild(closeBtn);
    card.appendChild(title);
    card.appendChild(wrap);
    card.appendChild(hint);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
    zoomOverlay = overlay;
    return overlay;
  }

  function ensureZoomStyles() {
    if (zoomStylesAdded) return;
    zoomStylesAdded = true;
    var style = document.createElement('style');
    style.textContent = [
      '.qrz-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);display:none;' +
        'align-items:center;justify-content:center;z-index:1000;}',
      '.qrz-card{position:relative;width:300px;max-width:88%;background:#FFF;' +
        'border-radius:22px;padding:14px 20px 22px;display:flex;flex-direction:column;' +
        'align-items:center;gap:14px;box-shadow:0 10px 30px rgba(0,0,0,0.25);}',
      '.qrz-close{position:absolute;top:10px;right:12px;width:28px;height:28px;' +
        'border-radius:50%;background:#F5F5F5;border:none;display:flex;align-items:center;' +
        'justify-content:center;cursor:pointer;}',
      '.qrz-close svg{width:15px;height:15px;stroke:#7C7C87;stroke-width:2;fill:none;}',
      '.qrz-title{font-family:\'Switzer\',sans-serif;font-size:17px;font-weight:700;' +
        'color:#1C1C21;text-align:center;}',
      '.qrz-wrap{width:236px;height:236px;background:#FFF;border:1.5px solid #E8E8EC;' +
        'border-radius:18px;position:relative;display:flex;align-items:center;' +
        'justify-content:center;padding:12px;}',
      '.qrz-img{width:200px;height:200px;display:block;}',
      '.qrz-chip{position:absolute;top:50%;left:50%;width:38px;height:38px;' +
        'transform:translate(-50%,-50%);background:#FFF;border-radius:10px;display:flex;' +
        'align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.12);}',
      '.qrz-chip-m{width:28px;height:28px;border-radius:8px;display:flex;' +
        'align-items:center;justify-content:center;' +
        'background:var(--Primary,#FE353D);color:#FFF;' +
        'font-family:\'Switzer\',sans-serif;font-size:15px;font-weight:700;}',
      '.qrz-hint{font-family:\'Switzer\',sans-serif;font-size:12px;color:#7C7C87;' +
        'text-align:center;line-height:1.5;}'
    ].join('\n');
    if (document.head) document.head.appendChild(style);
  }

  function openQrZoom(srcImg) {
    ensureZoomStyles();
    var ov = buildZoomOverlay();
    var big = ov.querySelector('.qrz-img');
    if (big) big.src = (srcImg && srcImg.src) ? srcImg.src : '';
    ov.style.display = 'flex';
  }

  function closeQrZoom() {
    if (zoomOverlay) zoomOverlay.style.display = 'none';
  }

  // Make a rendered receipt QR open the big view on tap.
  function wireZoom(img) {
    if (!img || !img.dataset) return;
    if (img.dataset.qrzWired) return;
    var wrapper = img.closest ? img.closest('.qr-wrapper') : null;
    if (!wrapper) return; // e.g. the voucher's own share sheet – already has one
    img.dataset.qrzWired = '1';
    img.style.cursor = 'pointer';
    img.addEventListener('click', function () { openQrZoom(img); });
  }

  function renderQR(img, text, size) {
    if (!img || !text) return;
    size = size || 240;

    if (typeof global.QRCode !== 'function') {
      img.src = remoteUrl(text, size);
    } else {
      // qrcode.js draws into an element of its own, so give it one off-screen and
      // copy the result onto the image the receipt already lays out.
      var holder = document.createElement('div');
      holder.style.cssText = 'position:absolute;left:-9999px;top:-9999px;';
      document.body.appendChild(holder);

      try {
        new global.QRCode(holder, {
          text: text,
          width: size,
          height: size,
          correctLevel: global.QRCode.CorrectLevel.M
        });

        var canvas = holder.querySelector('canvas');
        var drawn = holder.querySelector('img');
        if (canvas && canvas.toDataURL) img.src = canvas.toDataURL('image/png');
        else if (drawn && drawn.src) img.src = drawn.src;
        else img.src = remoteUrl(text, size);
      } catch (e) {
        img.src = remoteUrl(text, size);
      } finally {
        holder.parentNode.removeChild(holder);
      }
    }

    wireZoom(img);
  }

  global.renderQR = renderQR;
  global.openQrZoom = openQrZoom;
  global.closeQrZoom = closeQrZoom;
})(window);
