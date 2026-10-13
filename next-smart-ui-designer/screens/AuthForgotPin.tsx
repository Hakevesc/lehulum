'use client';
import { C } from '@/screens/_shared/tokens';

import { PhoneFrame } from '@/components/PhoneFrame';

export function AuthForgotPinScreen() {
  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
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
            <button style={{ position: 'absolute', left: 20, background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <span style={{ color: C.surface, fontFamily: "'Switzer', sans-serif", fontSize: 18, fontWeight: 300, letterSpacing: '0.3px' }}>Forgot PIN</span>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '52px 20px 0', textAlign: 'center' }}>
          <div style={{ width: 88, height: 88, borderRadius: 28, background: C.onPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28, boxShadow: '0 4px 24px rgba(254,53,61,0.15)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ width: 48, height: 48 }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <h2 style={{ color: C.onSurface, fontFamily: "'Switzer', sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 14 }}>Unable to Reset PIN</h2>
          <p style={{ color: C.onSurfaceLow, fontFamily: "'Switzer', sans-serif", fontSize: 14, fontWeight: 400, lineHeight: 1.65, maxWidth: 280 }}>Please contact customer support for assistance.</p>
          
          <div style={{ marginTop: 28, width: '100%', maxWidth: 320, background: C.surface, borderRadius: 16, padding: '16px 20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: C.background, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke={C.onSurface} strokeWidth="2" style={{ width: 18, height: 18 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <span style={{ fontFamily: "'Switzer', sans-serif", fontSize: 11, color: C.onSurfaceLow }}>Call Center</span>
                <span style={{ fontFamily: "'Switzer', sans-serif", fontSize: 13, fontWeight: 600, color: C.onSurface }}>700 (Free)</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: C.background, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke={C.onSurface} strokeWidth="2" style={{ width: 18, height: 18 }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <span style={{ fontFamily: "'Switzer', sans-serif", fontSize: 11, color: C.onSurfaceLow }}>Live Chat</span>
                <span style={{ fontFamily: "'Switzer', sans-serif", fontSize: 13, fontWeight: 600, color: C.onSurface }}>Available 24/7</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px 28px', marginTop: 'auto', gap: 10 }}>
          <a style={{ width: '100%', height: 48, borderRadius: 12, background: C.primary, color: C.onPrimary, fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none', boxShadow: '0 4px 16px rgba(254,53,61,0.25)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Call Support (700)
          </a>
          <button style={{ width: '100%', height: 48, borderRadius: 12, background: '#F0F0F0', color: C.onSurface, fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer' }}>Back to Login</button>
        </div>
      </div>
    </PhoneFrame>
  );
}