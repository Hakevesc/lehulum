'use client';
import { C } from '@/screens/_shared/tokens';

import { PhoneFrame } from '@/components/PhoneFrame';

export function PopupFaydaActivationScreen({ forced = false }: { forced?: boolean }) {
  return (
    <PhoneFrame>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 50,
        background: 'rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20
      }}>
        <div style={{
          background: C.surface, borderRadius: 24, padding: '40px 24px',
          width: 320, maxWidth: '100%',
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
          boxShadow: '0 24px 80px rgba(0,0,0,0.35)'
        }}>
          <div style={{ width: 80, height: 80, marginBottom: 24 }}>
            <img src="/assets/fayda-logo-hq.png" alt="Fayda" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <h2 style={{ color: C.onSurface, fontSize: 22, fontWeight: 700, marginBottom: 12, lineHeight: 1.3 }}>Link Your Fayda ID</h2>
          <p style={{ color: C.onSurfaceLow, fontSize: 14, lineHeight: 1.6, marginBottom: 28 }}>
            {forced
              ? 'A mandatory activation is required to complete your registration.'
              : 'Link your account with Fayda to enjoy a more secure and seamless experience on the app.'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
            <button style={{
              width: '100%', height: 48, borderRadius: 14, border: 'none',
              background: C.primary, color: C.onPrimary, cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 500,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0 4px 16px rgba(254,53,61,0.25)'
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              Link Now
            </button>
            {!forced && (
              <button style={{
                width: '100%', height: 48, borderRadius: 14, border: 'none',
                background: '#F0F0F2', color: C.onSurfaceLow, cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 500
              }}>Remind me later</button>
            )}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}