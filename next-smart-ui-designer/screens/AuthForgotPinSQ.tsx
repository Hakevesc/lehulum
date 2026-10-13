'use client';
import { C } from '@/screens/_shared/tokens';

import { useState } from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';

export function AuthForgotPinSQScreen() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);
  const DEMO_ANSWER = 'almaz';

  function verify() {
    if (answer.trim().toLowerCase() === DEMO_ANSWER) {
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  }

  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        <div style={{ position: 'relative', width: '100%', height: 160, flexShrink: 0, background: C.headerGradient, borderRadius: '0 0 30px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.20, zIndex: 0, backgroundImage: 'url(/assets/M-PESA-pattern.svg)', backgroundSize: 490, backgroundPosition: 'right -270px top -270px', backgroundRepeat: 'no-repeat', borderRadius: '0 0 30px 30px', mixBlendMode: 'overlay' }} />
          <div style={{ position: 'relative', zIndex: 5, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px 8px' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.surface }}>10:00</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{/* icons */}</div>
          </div>
          <div style={{ position: 'relative', zIndex: 5, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 20px 0' }}>
            <button style={{ position: 'absolute', left: 20, background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <span style={{ color: C.surface, fontSize: 18, fontWeight: 300 }}>Forgot PIN</span>
          </div>
          <span style={{ color: C.surface, fontSize: 22, fontWeight: 600, marginTop: 28, padding: '0 24px', textAlign: 'left', width: '100%' }}>Security Question</span>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 20px 0', overflowY: 'auto', width: '100%' }}>
          <div style={{ width: '100%', maxWidth: 328, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.primary, flexShrink: 0 }} />
            <span style={{ color: C.onSurfaceLow, fontSize: 12, fontWeight: 500 }}>Step <span style={{ color: C.primary, fontWeight: 600 }}>1 of 2</span> — Answer your security question</span>
          </div>

          <div style={{ width: '100%', maxWidth: 328, background: C.surface, borderRadius: 16, padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke={C.onSurfaceLow} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
                <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <span style={{ color: C.onSurfaceLow, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Security Question</span>
            </div>
            <p style={{ color: C.onSurface, fontSize: 16, fontWeight: 600, lineHeight: 1.45 }}>What is your mother's maiden name?</p>
          </div>

          <div style={{ width: '100%', maxWidth: 328, marginTop: 28 }}>
            <label style={{ color: C.onSurfaceLow, fontSize: 12, fontWeight: 500, display: 'block', marginBottom: 8 }}>Your Answer</label>
            <div style={{ width: '100%', borderBottom: `2px solid ${error ? C.primary : C.disabled}`, display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 8 }}>
              <input value={answer} onChange={(e) => { setAnswer(e.target.value); setError(false); }}
                placeholder="Type your answer"
                style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 18, fontWeight: 500, color: C.onSurface, fontFamily: "'Switzer', sans-serif" }} />
              {answer && (
                <button onClick={() => setAnswer('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke={C.onSurfaceLow} strokeWidth="2" style={{ width: 16, height: 16 }}>
                    <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                </button>
              )}
            </div>
            <div style={{ color: C.primary, fontSize: 12, fontWeight: 500, marginTop: 6, visibility: error ? 'visible' : 'hidden', minHeight: 18 }}>Incorrect answer. Please try again.</div>
          </div>

          <p style={{ width: '100%', maxWidth: 328, marginTop: 16, color: C.onSurfaceLow, fontSize: 12, fontWeight: 400, lineHeight: 1.5, textAlign: 'left' }}>Your answer is case-insensitive. Make sure it matches what you set during registration.</p>
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px 28px', marginTop: 'auto' }}>
          <button onClick={verify} disabled={!answer.trim()}
            style={{ width: '100%', height: 48, borderRadius: 12, background: answer.trim() ? C.primary : C.disabled, color: answer.trim() ? C.onPrimary : C.onSurfaceLow, fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 500, border: 'none', cursor: answer.trim() ? 'pointer' : 'default', boxShadow: answer.trim() ? '0 4px 16px rgba(254,53,61,0.25)' : 'none' }}>
            Continue
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}