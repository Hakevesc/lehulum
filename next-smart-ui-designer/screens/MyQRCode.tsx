'use client';
import { C } from '@/screens/_shared/tokens';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';

function StatusIcons() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
        <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9z" fill={C.surface} />
        <path d="M5 13l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" fill={C.surface} />
        <path d="M9 17l2 2c1.1-1.1 2.9-1.1 4 0l2-2c-2.21-2.21-5.79-2.21-8 0z" fill={C.surface} />
      </svg>
      <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
        <rect x="2" y="6" width="4" height="12" rx="1" fill={C.surface} />
        <rect x="8" y="4" width="4" height="14" rx="1" fill={C.surface} />
        <rect x="14" y="2" width="4" height="16" rx="1" fill={C.surface} />
        <rect x="20" y="0" width="4" height="18" rx="1" fill={C.surface} opacity="0.3" />
      </svg>
      <svg viewBox="0 0 28 14" fill="none" width="18" height="18">
        <rect x="0" y="1" width="22" height="12" rx="2.5" stroke={C.surface} strokeWidth="1.5" />
        <rect x="2" y="3" width="16" height="8" rx="1" fill={C.surface} />
        <rect x="24" y="4" width="2" height="6" rx="1" fill={C.surface} />
      </svg>
    </div>
  );
}

function showToastTimer(toast: string, setToast: (value: string) => void) {
  setToast(toast);
  window.setTimeout(() => setToast(''), 2200);
}

function drawDecorativeQR(canvas: HTMLCanvasElement, seedText: string) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const drawingCtx = ctx;
  const size = canvas.width;
  const modules = 29;
  const cell = size / modules;
  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = C.onSurface;

  let seed = 0;
  for (const ch of ('aster' + seedText)) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  function rand() {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  }

  const isFinder = (r: number, c: number) => (r < 7 && c < 7) || (r < 7 && c >= modules - 7) || (r >= modules - 7 && c < 7);
  const inCenter = (r: number, c: number) => r >= 12 && r <= 16 && c >= 12 && c <= 16;

  for (let r = 0; r < modules; r++) {
    for (let c = 0; c < modules; c++) {
      if (isFinder(r, c) || inCenter(r, c)) continue;
      if (rand() > 0.52) ctx.fillRect(c * cell, r * cell, cell + 0.5, cell + 0.5);
    }
  }

  function finder(or: number, oc: number) {
    drawingCtx.fillStyle = C.onSurface;
    drawingCtx.fillRect(oc * cell, or * cell, 7 * cell, 7 * cell);
    drawingCtx.fillStyle = C.surface;
    drawingCtx.fillRect((oc + 1) * cell, (or + 1) * cell, 5 * cell, 5 * cell);
    drawingCtx.fillStyle = C.onSurface;
    drawingCtx.fillRect((oc + 2) * cell, (or + 2) * cell, 3 * cell, 3 * cell);
  }

  finder(0, 0);
  finder(0, modules - 7);
  finder(modules - 7, 0);
}

export function MyQRCodeScreen() {
  const [mode, setMode] = useState<'my' | 'receive'>('my');
  const [amount, setAmount] = useState('');
  const [toast, setToast] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    drawDecorativeQR(canvasRef.current, amount);
  }, [amount, mode]);

  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background, fontFamily: "'Inter', sans-serif" }}>
        <div style={{ background: C.headerGradient, padding: '0 0 80px', borderRadius: '0 0 30px 30px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.2, zIndex: 0, backgroundImage: 'url(/assets/M-PESA-pattern.svg)', backgroundSize: '490px', backgroundPosition: 'right -270px top -270px', backgroundRepeat: 'no-repeat', mixBlendMode: 'overlay' }} />
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px 8px' }}>
            <span style={{ color: C.surface, fontSize: 14, fontWeight: 600, fontFamily: "'Switzer', sans-serif" }}>10:00</span>
            <StatusIcons />
          </div>
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 16px 8px' }}>
            <Link href="/presentation?screen=lehulum-home" style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </Link>
            <span style={{ color: C.surface, fontFamily: "'Switzer', sans-serif", fontSize: 17, fontWeight: 600 }}>My QR Code</span>
            <button onClick={() => showToastTimer('QR refreshed', setToast)} aria-label="Refresh" style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>
            </button>
          </div>
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '8px 16px 0' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', border: '3px solid rgba(255,255,255,0.5)', overflow: 'hidden', background: C.surface, boxShadow: '0 6px 18px rgba(0,0,0,0.18)' }}>
              <Image src="/assets/avatars/avatar-2.png" alt="Aster" width={64} height={64} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ color: C.surface, fontFamily: "'Switzer', sans-serif", fontSize: 18, fontWeight: 600 }}>Aster Mequanent</div>
            <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 500, letterSpacing: '0.4px' }}>+251 712 *** *78</div>
          </div>
        </div>

        <div style={{ margin: '-64px 20px 0', background: C.surface, borderRadius: 24, padding: '22px 22px 18px', boxShadow: '0 12px 40px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', width: '100%', background: '#F2F2F4', borderRadius: 12, padding: 4, marginBottom: 18 }}>
            <button onClick={() => setMode('my')} style={{ flex: 1, border: 'none', background: mode === 'my' ? C.surface : 'transparent', padding: '9px 0', borderRadius: 9, fontFamily: "'Switzer', sans-serif", fontSize: 13, fontWeight: 600, color: mode === 'my' ? C.primary : C.onSurfaceLow, cursor: 'pointer' }}>My Code</button>
            <button onClick={() => setMode('receive')} style={{ flex: 1, border: 'none', background: mode === 'receive' ? C.surface : 'transparent', padding: '9px 0', borderRadius: 9, fontFamily: "'Switzer', sans-serif", fontSize: 13, fontWeight: 600, color: mode === 'receive' ? C.primary : C.onSurfaceLow, cursor: 'pointer' }}>Request Amount</button>
          </div>
          <div style={{ width: 208, height: 208, padding: 14, borderRadius: 18, background: C.surface, border: '1.5px solid #EFEFF2', position: 'relative' }}>
            <canvas ref={canvasRef} width={180} height={180} style={{ width: '100%', height: '100%', display: 'block' }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: 46, height: 46, transform: 'translate(-50%, -50%)', background: C.surface, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: C.primary, color: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Switzer', sans-serif", fontWeight: 700, fontSize: 19 }}>M</div>
            </div>
          </div>
          {mode === 'receive' && (
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8, background: C.onPrimary, border: `1px dashed ${C.primary}`, borderRadius: 12, padding: '8px 14px' }}>
              <span style={{ color: C.primary, fontFamily: "'Switzer', sans-serif", fontWeight: 600, fontSize: 15 }}>ETB</span>
              <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="0.00" style={{ border: 'none', background: 'transparent', outline: 'none', width: 110, fontFamily: "'Switzer', sans-serif", fontWeight: 700, fontSize: 16, color: C.onSurface }} />
            </div>
          )}
          <div style={{ marginTop: 16, color: C.onSurfaceLow, fontSize: 12, fontWeight: 400, textAlign: 'center', lineHeight: 1.5, fontFamily: "'Switzer', sans-serif" }}>
            {mode === 'my' ? 'Show this code to receive money or payments instantly into your M-PESA wallet.' : 'Enter an amount, then let the sender scan this code to pay you exactly.'}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, padding: '20px 20px 28px', marginTop: 'auto' }}>
          <button onClick={() => showToastTimer('Saved to gallery', setToast)} style={{ flex: 1, height: 50, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 500, cursor: 'pointer', border: `1.5px solid ${C.stroke}`, background: C.surface, color: C.onSurface }}>
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            Save
          </button>
          <button onClick={() => showToastTimer('Sharing QR code…', setToast)} style={{ flex: 1, height: 50, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 500, cursor: 'pointer', border: 'none', background: C.primary, color: C.surface, boxShadow: '0 4px 12px rgba(254,53,61,0.25)' }}>
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18" strokeWidth="2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
            Share
          </button>
        </div>

        {toast && (
          <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', background: C.onSurface, color: C.surface, padding: '12px 20px', borderRadius: 12, fontFamily: "'Switzer', sans-serif", fontSize: 13, fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.3)', zIndex: 50, display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16" stroke={C.success} strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            <span>{toast}</span>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}
