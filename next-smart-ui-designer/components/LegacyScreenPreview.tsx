'use client';

import { useCallback, type SyntheticEvent } from 'react';

// Pins the phone to the top and removes the legacy page's desktop backdrop
// (which otherwise shows as a cropped gradient strip around the phone).
const FIT_CSS = `
  html, body { background: transparent !important; }
  body {
    align-items: flex-start !important;
    justify-content: center !important;
    /* room around the phone so its drop shadow fades out instead of being clipped */
    padding: 14px 48px 70px !important;
    margin: 0 !important;
    min-height: 0 !important;
  }
`;

// Renders the actual legacy HTML file (copied into /public) inside an iframe,
// so the preview is a 100% pixel-identical copy of the original screen.
export function LegacyScreenPreview({ src, title }: { src: string; title: string }) {
  const onLoad = useCallback((e: SyntheticEvent<HTMLIFrameElement>) => {
    try {
      const doc = e.currentTarget.contentDocument;
      if (!doc) return;
      let style = doc.getElementById('designer-fit') as HTMLStyleElement | null;
      if (!style) {
        style = doc.createElement('style');
        style.id = 'designer-fit';
        doc.head.appendChild(style);
      }
      style.textContent = FIT_CSS;
    } catch {
      /* cross-origin (shouldn't happen for same-origin public files) */
    }
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <iframe
        key={src}
        title={title}
        src={'/' + src}
        scrolling="no"
        onLoad={onLoad}
        style={{
          width: 456,
          height: 864,
          border: 'none',
          background: 'transparent',
          overflow: 'hidden'
        }}
      />
    </div>
  );
}
