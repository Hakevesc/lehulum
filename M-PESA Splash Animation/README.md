# M-PESA Splash Animation

The splash screen from the Remi (M-PESA Remit) prototype as a reusable package. The M-PESA money animation plays (twice by default) above the white M-PESA Remit logo on the red wave background, then the splash fades out and calls your code.

Open `index.html` to see the demo. It works straight from disk.

## Files

| File | What it is |
|---|---|
| `mpesa-splash.js` | `MpesaSplash.mount()` (full splash) and `MpesaSplash.anim()` (small looping loader) |
| `mpesa-splash.css` | Splash layout and styles |
| `assets/mpesa-lottie-data.js` | The animation data as a script (`window.MPESA_LOTTIE`), so it works without a server |
| `assets/mpesa_logo.json` | The same animation as a plain Lottie JSON file, for Lottie players in other tools or apps |
| `assets/M-PESA-Logo-Remit.svg` | Logo (shown white on the splash) |
| `assets/splash-bg.jpg` | White and red wave background |

The Lottie player (lottie-web 5.12.2) loads from cdnjs automatically. If it can't load (for example offline), the splash still finishes after a short pause.

## Use it in another page

```html
<link rel="stylesheet" href="mpesa-splash.css">

<div id="splash" style="position:fixed;inset:0;z-index:100"></div>

<script src="assets/mpesa-lottie-data.js"></script>
<script src="mpesa-splash.js"></script>
<script>
  MpesaSplash.mount(document.getElementById('splash'), {
    loops: 2,                              // how many times the money animation plays
    tagline: 'Send money home, fast',      // '' to hide
    logo: 'assets/M-PESA-Logo-Remit.svg',
    onDone: () => document.getElementById('splash').remove()
  });
</script>
```

Other options: `fadeOut` (default `true`), `timeout` (default `7000` ms, a safety limit), `logoAlt`.
`mount()` also returns a promise that resolves when the splash is done.

Small loader version anywhere:

```html
<div id="loader" style="width:110px;height:110px"></div>
<script>MpesaSplash.anim(document.getElementById('loader'));</script>
```

## Notes

- If you put the files in a different folder, update the `url('assets/splash-bg.jpg')` path in `mpesa-splash.css`.
- When the user has "reduce motion" turned on, the animation is skipped and the splash closes after 0.8 s.
- In native apps (Android / iOS / Flutter / React Native), use `assets/mpesa_logo.json` with that platform's Lottie library.
