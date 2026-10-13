'use client';
import { C } from '@/screens/_shared/tokens';

import { useState, useEffect } from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';

export function AuthReenterPinScreen() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key >= '0' && e.key <= '9' && pin.length < 4) setPin(p => p + e.key);
      else if (e.key === 'Backspace' && pin.length > 0) setPin(p => p.slice(0, -1));
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [pin.length]);

  function pressKey(val: string) { if (pin.length < 4) { setPin(p => p + val); setError(''); } }
  function pressBackspace() { if (pin.length > 0) { setPin(p => p.slice(0, -1)); setError(''); } }

  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        {/* Header */}
        <div style={{ position: 'relative', width: '100%', height: 160, flexShrink: 0, background: C.headerGradient, borderRadius: '0 0 30px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.20, zIndex: 0, backgroundImage: 'url(/assets/M-PESA-pattern.svg)', backgroundSize: 490, backgroundPosition: 'right -270px top -270px', backgroundRepeat: 'no-repeat', borderRadius: '0 0 30px 30px', mixBlendMode: 'overlay' }} />
          <div style={{ position: 'relative', zIndex: 5, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px 8px' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.surface, fontFamily: "'Switzer', sans-serif" }}>10:00</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9z" fill={C.surface}/><path d="M5 13l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" fill={C.surface}/><path d="M9 17l2 2c1.1-1.1 2.9-1.1 4 0l2-2c-2.21-2.21-5.79-2.21-8 0z" fill={C.surface}/></svg>
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><rect x="2" y="6" width="4" height="12" rx="1" fill={C.surface}/><rect x="8" y="4" width="4" height="14" rx="1" fill={C.surface}/><rect x="14" y="2" width="4" height="16" rx="1" fill={C.surface}/><rect x="20" y="0" width="4" height="18" rx="1" fill={C.surface} opacity="0.3"/></svg>
              <svg viewBox="0 0 28 14" fill="none" width="18" height="14"><rect x="0" y="1" width="22" height="12" rx="2.5" stroke={C.surface} strokeWidth="1.5"/><rect x="2" y="3" width="16" height="8" rx="1" fill={C.surface}/><rect x="24" y="4" width="2" height="6" rx="1" fill={C.surface}/></svg>
            </div>
          </div>
          <div style={{ position: 'relative', zIndex: 5, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 20px 0' }}>
            <button style={{ position: 'absolute', left: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <span style={{ color: C.surface, fontFamily: "'Switzer', sans-serif", fontSize: 18, fontWeight: 300, letterSpacing: '0.3px' }}>Sign Up</span>
          </div>
          <span style={{ position: 'relative', zIndex: 5, color: C.surface, fontFamily: "'Switzer', sans-serif", fontSize: 24, fontWeight: 600, marginTop: 30, padding: '0 24px', textAlign: 'left', width: '100%' }}>Re-enter your PIN</span>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 20px 16px', width: '100%' }}>
          <p style={{ color: C.onSurface, fontFamily: "'Switzer', sans-serif", fontSize: 14, fontWeight: 400, textAlign: 'center', marginTop: 36, marginBottom: 24, lineHeight: 1.5 }}>Re-enter your PIN to confirm</p>

          {/* Error text */}
          <div style={{ color: C.primary, fontFamily: "'Switzer', sans-serif", fontSize: 13, fontWeight: 500, textAlign: 'center', minHeight: 20, marginBottom: 4 }}>{error}</div>

          {/* PIN Boxes */}
          <div style={{ display: 'flex', gap: 20, marginBottom: 24, justifyContent: 'center' }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{
                width: 64, height: 64, borderRadius: 16, background: C.surface,
                border: `2px solid ${error ? C.primary : i < pin.length ? 'transparent' : i === pin.length ? C.primary : '#ECECEC'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                position: 'relative',
                animation: error ? 'shake 0.4s ease-in-out' : 'none'
              }}>
                {i < pin.length ? <div style={{ width: 16, height: 16, borderRadius: '50%', background: error ? C.primary : C.onSurface }} /> : null}
                {i === pin.length && !error && (
                  <div style={{ position: 'absolute', width: 2, height: 24, background: C.primary, animation: 'cursor-blink 1s step-end infinite' }} />
                )}
              </div>
            ))}
          </div>

          {/* Keypad */}
          <div style={{
            background: C.surface, borderRadius: 20, padding: '20px 16px',
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)', width: '100%'
          }}>
            {['1','2','3','4','5','6','7','8','9','','0',''].map((val, i) => {
              if (val === '') {
                if (i === 9) return <div key={i} />;
                if (i === 11) return (
                  <button key={i} onClick={pressBackspace}
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 16, border: 'none', background: 'transparent', cursor: 'pointer' }}
                    onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.95)'; e.currentTarget.style.background = 'rgba(0,0,0,0.06)'; }}
                    onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'transparent'; }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke={C.onSurfaceLow} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}>
                      <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/>
                    </svg>
                  </button>
                );
                return <div key={i} />;
              }
              return (
                <button key={i} onClick={() => pressKey(val)}
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 16, border: 'none', background: 'transparent', color: C.onSurface, fontSize: 26, fontWeight: 500, fontFamily: "'Inter', sans-serif", cursor: 'pointer' }}
                  onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.95)'; e.currentTarget.style.background = 'rgba(0,0,0,0.06)'; }}
                  onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'transparent'; }}>
                  {val}
                </button>
              );
            })}
          </div>

          <button disabled={pin.length < 4}
            onClick={() => {
              const storedPin = typeof window !== 'undefined' ? sessionStorage.getItem('pendingPin') : null;
              if (pin.length === 4) {
                if (pin === storedPin) {
                  setError('');
                } else {
                  setError('PINs do not match. Please try again');
                  setTimeout(() => { setPin(''); setError(''); }, 1500);
                }
              }
            }}
            style={{ display: 'flex', width: 328, maxWidth: '100%', height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 12, background: pin.length < 4 ? C.disabled : C.primary, color: pin.length < 4 ? C.onSurfaceLow : C.onPrimary, fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 400, border: 'none', cursor: pin.length < 4 ? 'default' : 'pointer', marginTop: 12, boxShadow: pin.length < 4 ? 'none' : '0 4px 16px rgba(254,53,61,0.25)' }}>
            Confirm
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 16, paddingBottom: 16, width: '100%' }}>
            <a style={{ display: 'flex', alignItems: 'center', gap: 3, color: C.onSurfaceLow, fontSize: 11, fontWeight: 400, textDecoration: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Contact Us
            </a>
            <div style={{ width: 1, height: 12, background: '#D0D0D0' }} />
            <a style={{ display: 'flex', alignItems: 'center', gap: 3, color: C.onSurfaceLow, fontSize: 11, fontWeight: 400, textDecoration: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              Terms and Conditions
            </a>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}