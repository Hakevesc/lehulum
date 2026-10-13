'use client';
import { C } from '@/screens/_shared/tokens';

import { useState } from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';

export function AuthFingerprintSetupScreen() {
  const [done, setDone] = useState(false);
  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        <div style={{ position: 'relative', width: '100%', height: 160, flexShrink: 0, background: C.headerGradient, borderRadius: '0 0 30px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.20, zIndex: 0, backgroundImage: 'url(/assets/M-PESA-pattern.svg)', backgroundSize: 490, backgroundPosition: 'right -270px top -270px', backgroundRepeat: 'no-repeat', borderRadius: '0 0 30px 30px', mixBlendMode: 'overlay' }} />
          <div style={{ position: 'relative', zIndex: 5, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px 8px' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.surface }}>10:00</span>
            <div style={{ display: 'flex', gap: 6 }}>{/* icons */}</div>
          </div>
          <div style={{ position: 'relative', zIndex: 5, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 20px 0' }}>
            <button style={{ position: 'absolute', left: 20, background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <span style={{ color: C.surface, fontSize: 18, fontWeight: 300 }}>Settings</span>
          </div>
          <span style={{ color: C.surface, fontSize: 24, fontWeight: 600, marginTop: 30, padding: '0 24px', textAlign: 'left', width: '100%' }}>{done ? 'Fingerprint Set Up' : 'Enable Fingerprint Sign-In'}</span>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '44px 20px 0' }}>
          <div style={{ width: 100, height: 100, borderRadius: 30, background: done ? C.successContainer : C.onPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28, boxShadow: '0 4px 20px rgba(254,53,61,0.15)' }}>
            {done ? (
              <svg viewBox="0 0 24 24" fill="none" stroke={C.success} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 48, height: 48 }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 48, height: 48 }}>
                <path d="M12 2a10 10 0 0 0-7.07 2.93"/><path d="M17.07 4.93A10 10 0 0 1 22 12"/><path d="M12 7a5 5 0 0 0-3.54 1.46"/><path d="M15.54 8.46A5 5 0 0 1 17 12"/><path d="M12 12a2 2 0 0 0-1.41.59"/><path d="M13.41 13.41A2 2 0 0 1 14 15"/><path d="M5 12a7 7 0 0 1 7-7"/><path d="M19 12a7 7 0 0 0-7-7"/><path d="M5 12c0 1.93.78 3.68 2.05 4.95"/><path d="M16.95 16.95A7 7 0 0 1 12 19"/><path d="M12 19v-4"/>
              </svg>
            )}
          </div>
          {done ? (
            <>
              <h2 style={{ color: C.onSurface, fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Fingerprint Enabled!</h2>
              <p style={{ color: C.onSurfaceLow, fontSize: 14, textAlign: 'center', lineHeight: 1.65, maxWidth: 280 }}>You can now use your fingerprint to sign in quickly and securely.</p>
              <div style={{ marginTop: 28, background: C.onPrimary, borderRadius: 12, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span style={{ color: C.primary, fontSize: 13 }}>You can change this anytime in Settings</span>
              </div>
            </>
          ) : (
            <>
              <h2 style={{ color: C.onSurface, fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Enable Fingerprint</h2>
              <p style={{ color: C.onSurfaceLow, fontSize: 14, textAlign: 'center', lineHeight: 1.65, maxWidth: 280 }}>Use your fingerprint to sign in faster. No need to enter your PIN every time.</p>
            </>
          )}
        </div>

        <div style={{ width: '100%', padding: '0 20px 28px', marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {done ? (
            <button style={{ width: '100%', height: 48, borderRadius: 12, background: C.primary, color: C.onPrimary, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(254,53,61,0.25)' }}>Done</button>
          ) : (
            <>
              <button onClick={() => setDone(true)} style={{ width: '100%', height: 48, borderRadius: 12, background: C.onSurface, color: C.onPrimary, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 12px rgba(28,28,33,0.2)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
                  <path d="M12 2a10 10 0 0 0-7.07 2.93"/><path d="M17.07 4.93A10 10 0 0 1 22 12"/><path d="M12 7a5 5 0 0 0-3.54 1.46"/><path d="M15.54 8.46A5 5 0 0 1 17 12"/><path d="M12 12a2 2 0 0 0-1.41.59"/><path d="M13.41 13.41A2 2 0 0 1 14 15"/><path d="M5 12a7 7 0 0 1 7-7"/><path d="M19 12a7 7 0 0 0-7-7"/><path d="M5 12c0 1.93.78 3.68 2.05 4.95"/><path d="M16.95 16.95A7 7 0 0 1 12 19"/><path d="M12 19v-4"/>
                </svg>
                Enable Fingerprint Sign-In
              </button>
              <button style={{ width: '100%', height: 48, borderRadius: 12, background: '#F0F0F0', color: C.onSurfaceLow, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer' }}>Remind me later</button>
            </>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}