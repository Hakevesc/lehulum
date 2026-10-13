'use client';
import { C } from '@/screens/_shared/tokens';

import { PhoneFrame } from '@/components/PhoneFrame';

export function AuthConfirmProfileScreen() {
  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        {/* Status Bar */}
        <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '14px 24px 8px', background: C.background }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.onSurface }}>10:00</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><rect x="2" y="6" width="4" height="12" rx="1" fill={C.onSurface}/><rect x="8" y="4" width="4" height="14" rx="1" fill={C.onSurface}/><rect x="14" y="2" width="4" height="16" rx="1" fill={C.onSurface}/><rect x="20" y="0" width="4" height="18" rx="1" fill={C.onSurface} opacity="0.3"/></svg>
            <svg viewBox="0 0 28 14" fill="none" width="18" height="14"><rect x="0" y="1" width="22" height="12" rx="2.5" stroke={C.onSurface} strokeWidth="1.5"/><rect x="2" y="3" width="16" height="8" rx="1" fill={C.onSurface}/><rect x="24" y="4" width="2" height="6" rx="1" fill={C.onSurface}/></svg>
          </div>
        </div>

        {/* Header Nav */}
        <div style={{ flexShrink: 0, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 20px 0', background: C.background }}>
          <button style={{ position: 'absolute', left: 20, background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.onSurface} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <span style={{ color: C.onSurface, fontFamily: "'Switzer', sans-serif", fontSize: 18, fontWeight: 500 }}>Confirm Your Profile</span>
        </div>

        {/* Scrollable Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Profile Section */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
            <div style={{ width: 96, height: 96, borderRadius: '50%', border: `3px solid ${C.primary}`, overflow: 'hidden', marginBottom: 12, background: C.surface }}>
              <img src="/assets/avatars/avatar-1.png" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h2 style={{ color: C.onSurface, fontFamily: "'Switzer', sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 4, textAlign: 'center' }}>Zemedkun Kidane</h2>
            <p style={{ color: C.onSurfaceLow, fontFamily: "'Switzer', sans-serif", fontSize: 14, fontWeight: 400 }}>Phone Number 079 123 1222</p>
          </div>

          {/* Form Card */}
          <div style={{ width: '100%', maxWidth: 328, background: C.surface, borderRadius: 24, padding: '24px 20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 24 }}>
            {[
              { label: 'Full Name', value: 'Mikias Dereje' },
              { label: 'Phone Number', value: '0911032052' },
              { label: 'Address', value: 'Avenue 2001, n23 Ethiopia' },
              { label: 'Birthdate', value: '12/27/2027' },
              { label: 'Nationality', value: 'Ethiopian' },
              { label: 'Gender', value: 'Male' }
            ].map((field, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ color: C.onSurfaceLow, fontFamily: "'Switzer', sans-serif", fontSize: 12, fontWeight: 400 }}>{field.label}</label>
                <div style={{ color: C.onSurface, fontFamily: "'Switzer', sans-serif", fontSize: 16, fontWeight: 600, borderBottom: `1px solid ${C.disabled}`, padding: '8px 0' }}>{field.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Button */}
        <div style={{ flexShrink: 0, padding: '16px 20px', display: 'flex', justifyContent: 'center', background: C.background }}>
          <button style={{ width: 328, maxWidth: '100%', height: 48, borderRadius: 12, background: C.primary, color: C.onPrimary, fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(254,53,61,0.25)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#E5303A'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = C.primary; }}>
            Confirm
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}