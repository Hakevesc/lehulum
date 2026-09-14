/*
 * Draws a receipt QR into an <img> without leaving the page.
 *
 * Receipts used to point the image straight at api.qrserver.com, which leaves a
 * broken image wherever the network is unavailable or external images are
 * blocked. This renders the code locally with the bundled qrcode library and
 * only falls back to the remote service if that library failed to load.
 */
(function (global) {
  'use strict';

  function remoteUrl(text, size) {
    return 'https://api.qrserver.com/v1/create-qr-code/?size=' + size + 'x' + size +
      '&data=' + encodeURIComponent(text) + '&margin=10';
  }

  function renderQR(img, text, size) {
    if (!img || !text) return;
    size = size || 240;

    if (typeof global.QRCode !== 'function') {
      img.src = remoteUrl(text, size);
      return;
    }

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

  global.renderQR = renderQR;
})(window);
