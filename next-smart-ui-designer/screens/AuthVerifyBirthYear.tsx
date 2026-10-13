'use client';
import { C } from '@/screens/_shared/tokens';

import { useState, useEffect } from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';

export function AuthVerifyBirthYearScreen() {
  const [year, setYear] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key >= '0' && e.key <= '9' && year.length < 4) setYear(p => p + e.key);
      else if (e.key === 'Backspace' && year.length > 0) setYear(p => p.slice(0, -1));
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [year.length]);

  function pressKey(val: string) { if (year.length < 4) setYear(p => p + val); }
  function pressBackspace() { if (year.length > 0) setYear(p => p.slice(0, -1)); }

  const DEMO_YEAR = '1995';

  function verify() {
    if (year === DEMO_YEAR) {
      setError(false);
    } else {
      setError(true);
      setTimeout(() => { setYear(''); setError(false); }, 1500);
    }
  }

  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        {/* Header */}
        <div style={{ position: 'relative', width: '100%', height: 160, flexShrink: 0, background: C.headerGradient, borderRadius: '0 0 30px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.20, zIndex: 0, backgroundImage: 'url(/assets/M-PESA-pattern.svg)', backgroundSize: 490, backgroundPosition: 'right -270px top -270px', backgroundRepeat: 'no-repeat', borderRadius: '0 0 30px 30px', mixBlendMode: 'overlay' }} />
          <div style={{ position: 'relative', zIndex: 5, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px 8px' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.surface }}>10:00</span>
            <div style={{ display: 'flex', gap: 6 }}>{/* status icons */}</div>
          </div>
          <div style={{ position: 'relative', zIndex: 5, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 20px 0' }}>
            <button style={{ position: 'absolute', left: 20, background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <span style={{ color: C.surface, fontSize: 18, fontWeight: 300 }}>Verify Identity</span>
          </div>
          <span style={{ position: 'relative', zIndex: 5, color: C.surface, fontSize: 22, fontWeight: 600, marginTop: 28, padding: '0 24px', textAlign: 'left', width: '100%' }}>Enter Birth Year</span>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 20px 16px', width: '100%' }}>
          <p style={{ color: C.onSurface, fontSize: 18, fontWeight: 600, textAlign: 'center', marginTop: 28, lineHeight: 1.4 }}>
            Enter your registered birth year
            <span style={{ display: 'block', marginTop: 6, color: C.onSurfaceLow, fontSize: 13, fontWeight: 400 }}>This is used to verify your identity<br />before unlocking your PIN</span>
          </p>

          <div style={{ display: 'flex', gap: 20, marginTop: 28 }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{
                width: 64, height: 64, borderRadius: 16, background: C.surface,
                border: `2px solid ${error ? C.primary : i < year.length ? C.onSurface : i === year.length ? C.primary : '#ECECEC'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', boxShadow: i === year.length ? '0 0 0 3px rgba(254,53,61,0.12)' : 'none'
              }}>
                {i < year.length ? <div style={{ width: 16, height: 16, borderRadius: '50%', background: C.onSurface }} /> : null}
                {i === year.length && !error && <div style={{ position: 'absolute', width: 2, height: 24, background: C.primary, borderRadius: 1, animation: 'cursor-blink 1s infinite' }} />}
              </div>
            ))}
          </div>

          <div style={{ color: C.primary, fontFamily: "'Switzer', sans-serif", fontSize: 12, fontWeight: 500, textAlign: 'center', minHeight: 18, marginTop: 10, visibility: error ? 'visible' : 'hidden' }}>Birth year doesn't match our records.</div>

          <div style={{ background: C.surface, borderRadius: 20, padding: '20px 16px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', width: '100%', marginTop: 16 }}>
            {['1','2','3','4','5','6','7','8','9','','0',''].map((val, i) => {
              if (val === '') { if (i === 9) return <div key={i} />;
                if (i === 11) return (
                  <button key={i} onClick={pressBackspace} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 16, border: 'none', background: 'transparent', cursor: 'pointer' }}
                    onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.95)'; e.currentTarget.style.background = 'rgba(0,0,0,0.06)'; }}
                    onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'transparent'; }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke={C.onSurfaceLow} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/></svg>
                  </button>
                ); return <div key={i} />;
              }
              return (
                <button key={i} onClick={() => pressKey(val)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 16, border: 'none', background: 'transparent', color: C.onSurface, fontSize: 26, fontWeight: 500, fontFamily: "'Inter', sans-serif", cursor: 'pointer' }}
                  onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.95)'; e.currentTarget.style.background = 'rgba(0,0,0,0.06)'; }}
                  onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'transparent'; }}>
                  {val}
                </button>
              );
            })}
          </div>

          <button disabled={year.length < 4} onClick={verify}
            style={{ width: 328, maxWidth: '100%', height: 48, borderRadius: 12, background: year.length < 4 ? C.disabled : C.primary, color: year.length < 4 ? C.onSurfaceLow : C.onPrimary, fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', marginTop: 8, boxShadow: year.length < 4 ? 'none' : '0 4px 16px rgba(254,53,61,0.25)' }}>
            Continue
          </button>

          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6, background: '#F0F8F0', borderRadius: 10, padding: '10px 14px', width: 328, maxWidth: '100%' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={C.success} strokeWidth="2" style={{ width: 16, height: 16, flexShrink: 0 }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <span style={{ color: '#1C5C24', fontFamily: "'Switzer', sans-serif", fontSize: 11, fontWeight: 500, lineHeight: 1.4 }}>Your Fayda ID is linked to this account for verification.</span>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}