'use client';
import { C } from '@/screens/_shared/tokens';

import { PhoneFrame } from '@/components/PhoneFrame';

export function AuthLinkFaydaScreen() {
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <span style={{ color: C.surface, fontSize: 18, fontWeight: 300 }}>Sign Up</span>
          </div>
          <span style={{ color: C.surface, fontSize: 24, fontWeight: 600, marginTop: 30, padding: '0 24px', textAlign: 'left', width: '100%' }}>Link Your Fayda ID</span>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 20px 8px', width: '100%' }}>
          <div style={{ width: '100%', maxWidth: 328, background: C.surface, borderRadius: 24, padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginTop: 20 }}>
            <div style={{ width: 80, height: 80, marginBottom: 24 }}>
              <img src="/assets/fayda-logo-hq.png" alt="Fayda" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <h2 style={{ color: C.onSurface, fontSize: 22, fontWeight: 600, marginBottom: 16, lineHeight: 1.4 }}>Take a Few Steps!</h2>
            <p style={{ color: C.onSurfaceLow, fontSize: 14, lineHeight: 1.6 }}>Link your account with Fayda to enjoy a more secure and seamless experience on the app.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 328, marginTop: 'auto', marginBottom: 8 }}>
            <button style={{ width: '100%', height: 48, borderRadius: 12, background: C.primary, color: C.onPrimary, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 16px rgba(254,53,61,0.25)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Link Now
            </button>
            <button style={{ width: '100%', height: 48, borderRadius: 12, background: C.background, color: C.onSurfaceLow, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer' }}>Remind me later</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 8, paddingBottom: 8, width: '100%' }}>
            <a style={{ display: 'flex', gap: 3, color: C.onSurfaceLow, fontSize: 11, cursor: 'pointer' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Contact Us
            </a>
            <div style={{ width: 1, height: 12, background: '#D0D0D0' }} />
            <a style={{ display: 'flex', gap: 3, color: C.onSurfaceLow, fontSize: 11, cursor: 'pointer' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              Terms and Conditions
            </a>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}