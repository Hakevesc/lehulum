'use client';
import { C } from '@/screens/_shared/tokens';

import { PhoneFrame } from '@/components/PhoneFrame';

export function AuthPinLockedScreen() {
  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        {/* Header - 262px same as Login */}
        <div style={{ position: 'relative', width: '100%', height: 262, flexShrink: 0, background: C.headerGradient, borderRadius: '0 0 30px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.20, zIndex: 0, backgroundImage: 'url(/assets/M-PESA-pattern.svg)', backgroundSize: 490, backgroundPosition: 'right -270px top -270px', backgroundRepeat: 'no-repeat', borderRadius: '0 0 30px 30px', mixBlendMode: 'overlay' }} />
          <div style={{ position: 'relative', zIndex: 5, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px 8px' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.surface, fontFamily: "'Switzer', sans-serif" }}>10:00</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9z" fill={C.surface}/><path d="M5 13l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" fill={C.surface}/><path d="M9 17l2 2c1.1-1.1 2.9-1.1 4 0l2-2c-2.21-2.21-5.79-2.21-8 0z" fill={C.surface}/></svg>
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><rect x="2" y="6" width="4" height="12" rx="1" fill={C.surface}/><rect x="8" y="4" width="4" height="14" rx="1" fill={C.surface}/><rect x="14" y="2" width="4" height="16" rx="1" fill={C.surface}/><rect x="20" y="0" width="4" height="18" rx="1" fill={C.surface} opacity="0.3"/></svg>
              <svg viewBox="0 0 28 14" fill="none" width="18" height="14"><rect x="0" y="1" width="22" height="12" rx="2.5" stroke={C.surface} strokeWidth="1.5"/><rect x="2" y="3" width="16" height="8" rx="1" fill={C.surface}/><rect x="24" y="4" width="2" height="6" rx="1" fill={C.surface}/></svg>
            </div>
          </div>
          <div style={{ position: 'absolute', top: '47%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 2 }}>
            <img src="/assets/M-PESA-white-logo.svg" alt="M-PESA" style={{ height: 40, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))' }} />
          </div>
          <div style={{ position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', border: '2.5px solid rgba(255,255,255,0.9)', overflow: 'hidden', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
              <img src="/assets/avatars/avatar-1.png" alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <span style={{ color: C.surface, fontFamily: "'Switzer', sans-serif", fontSize: 14, fontWeight: 400 }}>Welcome Back,</span>
              <span style={{ color: C.surface, fontFamily: "'Switzer', sans-serif", fontSize: 20, fontWeight: 700, whiteSpace: 'nowrap' }}>Zemedkun Kidane</span>
              <span style={{ color: C.surface, fontFamily: "'Switzer', sans-serif", fontSize: 14, fontWeight: 400 }}>+251 77 00 24 23</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '44px 20px 0', textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: 24, background: C.onPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, boxShadow: '0 4px 20px rgba(254,53,61,0.15)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 40, height: 40 }}>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h2 style={{ color: C.onSurface, fontFamily: "'Switzer', sans-serif", fontSize: 24, fontWeight: 700, marginBottom: 12 }}>PIN Locked</h2>
          <p style={{ color: C.onSurfaceLow, fontFamily: "'Switzer', sans-serif", fontSize: 14, fontWeight: 400, lineHeight: 1.65, maxWidth: 272 }}>Your PIN has been locked after 3 failed attempts. Please verify your identity to unlock it.</p>
          <div style={{ marginTop: 24, background: C.onPrimary, border: '1px solid rgba(254,53,61,0.18)', borderRadius: 12, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16, flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span style={{ color: C.primary, fontFamily: "'Switzer', sans-serif", fontSize: 13, fontWeight: 500 }}>3 failed attempts recorded</span>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px 28px', marginTop: 'auto', gap: 12 }}>
          <button style={{ width: '100%', height: 48, borderRadius: 12, background: C.primary, color: C.onPrimary, fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(254,53,61,0.25)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#E5303A'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = C.primary; e.currentTarget.style.transform = 'none'; }}>
            Unlock My PIN
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}