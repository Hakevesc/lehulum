'use client';
import { C } from '@/screens/_shared/tokens';

import { PhoneFrame } from '@/components/PhoneFrame';

export function PopupEnableFingerprintScreen() {
  return (
    <PhoneFrame>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 50,
        background: 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20
      }}>
        <div style={{
          width: '100%', maxWidth: 320,
          background: C.surface, borderRadius: 24,
          padding: '32px 24px 24px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
          animation: 'popIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}>
          <button style={{
            position: 'absolute', top: 16, right: 16,
            width: 32, height: 32, borderRadius: '50%', border: 'none',
            background: 'transparent', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={C.onSurface} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: C.successContainer, border: `2px solid ${C.success}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 20
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={C.success} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}>
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>

          <h2 style={{
            color: C.onSurface, fontFamily: "'Switzer', sans-serif",
            fontSize: 22, fontWeight: 700, marginBottom: 12, lineHeight: 1.3
          }}>You're All Set, Hana!</h2>

          <p style={{
            color: C.onSurfaceLow, fontFamily: "'Switzer', sans-serif",
            fontSize: 14, fontWeight: 400, lineHeight: 1.6, marginBottom: 28
          }}>
            Your M-PESA account has been successfully activated. Welcome to convenient payments.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
            <button style={{
              width: '100%', height: 48, borderRadius: 14, border: 'none',
              background: C.onSurface, color: C.surface, cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 500,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              boxShadow: '0 4px 12px rgba(28,28,33,0.2)'
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
                <path d="M12 2a10 10 0 0 0-7.07 2.93"/><path d="M17.07 4.93A10 10 0 0 1 22 12"/><path d="M12 7a5 5 0 0 0-3.54 1.46"/><path d="M15.54 8.46A5 5 0 0 1 17 12"/><path d="M12 12a2 2 0 0 0-1.41.59"/><path d="M13.41 13.41A2 2 0 0 1 14 15"/><path d="M5 12a7 7 0 0 1 7-7"/><path d="M19 12a7 7 0 0 0-7-7"/><path d="M5 12c0 1.93.78 3.68 2.05 4.95"/><path d="M16.95 16.95A7 7 0 0 1 12 19"/><path d="M12 19v-4"/>
              </svg>
              Enable Fingerprint Sign-In
            </button>
            <button style={{
              width: '100%', height: 48, borderRadius: 14, border: 'none',
              background: '#F0F0F2', color: C.onSurfaceLow, cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 500
            }}>Remind me later</button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}