'use client';
import { C } from '@/screens/_shared/tokens';

import { PhoneFrame } from '@/components/PhoneFrame';

export function AuthSignupConfirmationScreen() {
  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        {/* Header */}
        <div style={{ position: 'relative', width: '100%', height: 210, flexShrink: 0, background: C.headerGradient, borderRadius: '0 0 30px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.20, zIndex: 0, backgroundImage: 'url(/assets/M-PESA-pattern.svg)', backgroundSize: 490, backgroundPosition: 'right -270px top -270px', backgroundRepeat: 'no-repeat', borderRadius: '0 0 30px 30px', mixBlendMode: 'overlay' }} />
          <div style={{ position: 'relative', zIndex: 5, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px 8px' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.surface }}>10:00</span>
            <div style={{ display: 'flex', gap: 6 }}>{/* icons */}</div>
          </div>
          <div style={{ position: 'relative', zIndex: 5, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 20px 0' }}>
            <button style={{ position: 'absolute', left: 20, background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <span style={{ color: C.surface, fontSize: 18, fontWeight: 300 }}>Profile Found</span>
          </div>
          <div style={{ position: 'absolute', top: '68%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
            <img src="/assets/M-PESA-white-logo.svg" alt="M-PESA" style={{ height: 40, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))' }} />
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 20px 16px', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, marginBottom: 'auto', marginTop: 10 }}>
            <div style={{ width: 65, height: 65, borderRadius: '50%', border: `2px solid ${C.primary}`, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              <img src="/assets/avatars/avatar-1.png" alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <span style={{ color: C.onSurface, fontSize: 20, fontWeight: 700 }}>Zemedkun Kidane</span>
            <span style={{ color: C.onSurfaceLow, fontSize: 14, fontWeight: 400 }}>+251 77 00 24 23</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 'auto' }}>
            <div style={{ width: 125, height: 125, borderRadius: '50%', background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 30px rgba(254,53,61,0.3)' }}>
              <svg width="58" height="58" viewBox="0 0 24 24" fill="none" stroke={C.surface} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="3"/><circle cx="9" cy="11" r="2.5"/><path d="M5 18c0-2.2 1.8-4 4-4h2c2.2 0 4 1.8 4 4"/><line x1="15" y1="9" x2="20" y2="9"/><line x1="15" y1="12" x2="18" y2="12"/>
              </svg>
            </div>
          </div>

          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, paddingBottom: 20, marginTop: 'auto' }}>
            <p style={{ fontSize: 11, color: C.onSurfaceLow, textAlign: 'center', lineHeight: 1.6, padding: '0 8px' }}>
              By tapping "Continue" you acknowledge that you have read the <a style={{ fontWeight: 700, color: C.primary, textDecoration: 'none' }}>Privacy Policy</a> and agree to the <a style={{ fontWeight: 700, color: C.primary, textDecoration: 'none' }}>Terms and Conditions</a>
            </p>
            <button style={{ display: 'flex', width: 328, maxWidth: '100%', height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 12, background: C.primary, color: C.onPrimary, fontSize: 14, fontWeight: 400, border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(254,53,61,0.25)' }}>
              Continue
            </button>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%' }}>
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
      </div>
    </PhoneFrame>
  );
}