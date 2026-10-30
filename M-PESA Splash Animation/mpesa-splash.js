/* M-PESA splash screen + money animation (Lottie).
   Needs: lottie-web (loaded automatically from cdnjs if missing) and the animation data
   (assets/mpesa-lottie-data.js, which sets window.MPESA_LOTTIE).

   Usage:
     MpesaSplash.mount(document.getElementById('splash'), {
       loops: 2,                                  // times the money animation plays
       tagline: 'Send money home, fast',
       logo: 'assets/M-PESA-Logo-Remit.svg',
       onDone: () => showYourFirstScreen()        // called when the splash finishes
     });

     MpesaSplash.anim(el, { loop: true });        // the same animation as a small loader
*/
(function () {
  const LOTTIE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';
  const reduceMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let lottieReady = null;
  function loadLottie() {
    if (window.lottie) return Promise.resolve(window.lottie);
    if (!lottieReady) {
      lottieReady = new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = LOTTIE_CDN;
        s.onload = () => resolve(window.lottie);
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }
    return lottieReady;
  }

  /* the player changes the data it is given, so every animation gets its own copy */
  const animData = () => {
    if (!window.MPESA_LOTTIE) throw new Error('MPESA_LOTTIE missing — include assets/mpesa-lottie-data.js');
    return JSON.parse(JSON.stringify(window.MPESA_LOTTIE));
  };

  /* Small looping animation in any element (loaders, "processing" cards). Returns the Lottie instance. */
  async function anim(el, { loop = true, autoplay = true } = {}) {
    const lottie = await loadLottie();
    return lottie.loadAnimation({ container: el, renderer: 'svg', loop, autoplay: autoplay && !reduceMotion(), animationData: animData() });
  }

  /* Full splash screen inside `root`. Resolves when it is done (also calls onDone). */
  function mount(root, opts = {}) {
    const o = Object.assign({
      loops: 2,
      tagline: 'Send money home, fast',
      logo: 'assets/M-PESA-Logo-Remit.svg',
      logoAlt: 'M-PESA Remit',
      fadeOut: true,      // fade the splash away at the end
      timeout: 7000,      // safety: finish anyway if the animation cannot play
      onDone: null
    }, opts);

    root.classList.add('mpesa-splash');
    root.innerHTML = `
      <div class="sp-top"><div class="sp-lottie" aria-hidden="true"></div></div>
      <img class="sp-logo" src="${o.logo}" alt="${o.logoAlt}">
      ${o.tagline ? `<p class="sp-tag">${o.tagline}</p>` : ''}`;
    const holder = root.querySelector('.sp-lottie');

    return new Promise(resolve => {
      let finished = false, safety = null;
      const finish = () => {
        if (finished) return;
        finished = true;
        clearTimeout(safety);
        const done = () => { if (typeof o.onDone === 'function') o.onDone(); resolve(); };
        if (o.fadeOut && !reduceMotion()) { root.classList.add('is-done'); setTimeout(done, 350); } else done();
      };

      if (reduceMotion()) { setTimeout(finish, 800); return; }
      safety = setTimeout(finish, o.timeout);

      loadLottie().then(lottie => {
        const a = lottie.loadAnimation({ container: holder, renderer: 'svg', loop: true, autoplay: true, animationData: animData() });
        let n = 0;
        a.addEventListener('loopComplete', () => {
          if (++n >= o.loops) { a.pause(); setTimeout(finish, 150); }
        });
      }).catch(() => setTimeout(finish, 800));   // offline / player failed → short pause, then continue
    });
  }

  window.MpesaSplash = { mount, anim, loadLottie };
})();
