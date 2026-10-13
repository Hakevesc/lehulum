'use client';
import { C } from '@/screens/_shared/tokens';
import { PhoneFrame } from '@/components/PhoneFrame';

export function AccountScreen() {
  const items = [
    { icon: '👤', label: 'Personal Information', sub: 'Name, phone, email' },
    { icon: '🔒', label: 'Security', sub: 'PIN, biometrics' },
    { icon: '🔔', label: 'Notifications', sub: 'Alerts & preferences' },
    { icon: '🌍', label: 'Language', sub: 'English, አማርኛ, Afaan Oromoo' },
    { icon: '⭐', label: 'Manage Favourites', sub: 'Quick pay contacts' },
    { icon: '🔗', label: 'Link Fayda', sub: 'National ID' },
    { icon: '📄', label: 'Statements', sub: 'History & PDF' },
    { icon: '❓', label: 'Help & Support', sub: 'FAQ, contact us' }
  ];
  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        <StatusBar />
        <Header title="Account" back />
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map((it, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: C.surface, borderRadius: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: C.onPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{it.icon}</div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600, color: C.onSurface }}>{it.label}</div><div style={{ fontSize: 12, color: C.onSurfaceLow, marginTop: 2 }}>{it.sub}</div></div>
              <svg viewBox="0 0 24 24" fill="none" stroke={C.onSurfaceLow} strokeWidth="2" style={{ width: 18, height: 18 }}><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
function StatusBar() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px 8px', flexShrink: 0 }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: C.onSurface }}>9:41</span>
      <div style={{ display: 'flex', gap: 6 }}>
        <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9z" fill={C.onSurface}/><path d="M5 13l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" fill={C.onSurface}/><path d="M9 17l2 2c1.1-1.1 2.9-1.1 4 0l2-2c-2.21-2.21-5.79-2.21-8 0z" fill={C.onSurface}/></svg>
        <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><rect x="2" y="6" width="4" height="12" rx="1" fill={C.onSurface}/><rect x="8" y="4" width="4" height="14" rx="1" fill={C.onSurface}/><rect x="14" y="2" width="4" height="16" rx="1" fill={C.onSurface}/><rect x="20" y="0" width="4" height="18" rx="1" fill={C.onSurface} opacity="0.3"/></svg>
      </div>
    </div>
  );
}
function Header({ title, back }: { title: string; back?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0 12px', position: 'relative' }}>
      {back && (
        <button style={{ position: 'absolute', left: 0, background: 'transparent', border: 'none', cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke={C.onSurface} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
      )}
      <span style={{ color: C.onSurface, fontFamily: "'Switzer', sans-serif", fontSize: 17, fontWeight: 500, flex: 1, textAlign: 'center' }}>{title}</span>
      <div style={{ width: 36 }} />
    </div>
  );
}
