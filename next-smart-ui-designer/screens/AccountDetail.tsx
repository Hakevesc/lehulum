'use client';
import { C } from '@/screens/_shared/tokens';
import { PhoneFrame } from '@/components/PhoneFrame';

export function AccountDetailScreen() {
  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        <StatusBar />
        <Header title="My Profile" back />
        <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <ProfileHeader />
          <div style={{ background: C.surface, borderRadius: 16, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Field label="Full Name" value="Zemedkun Kidane" />
            <Field label="Phone Number" value="+251 77 00 24 23" />
            <Field label="M-PESA No." value="25177002423" />
            <Field label="Email" value="zemedkun@example.com" />
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
function ProfileHeader() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', background: C.onPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: C.primary, marginBottom: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>ZK</div>
      <div style={{ fontSize: 18, fontWeight: 700, color: C.onSurface }}>Zemedkun Kidane</div>
      <div style={{ fontSize: 13, color: C.onSurfaceLow, marginTop: 4 }}>+251 77 00 24 23</div>
      <div style={{ marginTop: 8, padding: '4px 10px', borderRadius: 8, background: C.onPrimary, color: C.primary, fontSize: 11, fontWeight: 700 }}>TIER 2</div>
    </div>
  );
}
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 13, color: C.onSurfaceLow }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: C.onSurface }}>{value}</span>
    </div>
  );
}
function StatusBar() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px 8px', flexShrink: 0 }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: C.onSurface }}>9:41</span>
      <div style={{ display: 'flex', gap: 6 }}>
        <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9z" fill={C.onSurface}/><path d="M5 13l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" fill={C.onSurface}/></svg>
        <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><rect x="2" y="6" width="4" height="12" rx="1" fill={C.onSurface}/><rect x="8" y="4" width="4" height="14" rx="1" fill={C.onSurface}/></svg>
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
