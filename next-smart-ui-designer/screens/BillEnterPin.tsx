'use client';
import { C } from '@/screens/_shared/tokens';
import { PhoneFrame } from '@/components/PhoneFrame';

export function BillEnterPinScreen() {
  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        <StatusBar />
        <Header title="Enter PIN" back />
        <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ borderRadius: 16, background: C.surface, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, color: C.onSurfaceLow }}>Biller</span>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Ethiopian Electric</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, color: C.onSurfaceLow }}>Account</span>
              <span style={{ fontSize: 13, fontWeight: 600 }}>123456789</span>
            </div>
            <div style={{ borderTop: '1px solid #F0F0F0' }} />
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: 12, color: C.onSurfaceLow }}>Amount</span>
              <div style={{ fontSize: 28, fontWeight: 700, color: C.primary, marginTop: 4 }}>ETB 250.00</div>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: C.onSurface }}>Enter your PIN</span>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 12 }}>
              {[0, 1, 2, 3].map((i) => (<div key={i} style={{ width: 14, height: 14, borderRadius: '50%', background: C.stroke }} />))}
            </div>
          </div>
        </div>
        <div style={{ padding: '0 20px 20px' }}>
          <button style={{ width: '100%', height: 48, borderRadius: 12, background: C.primary, color: C.onPrimary, fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(254,53,61,0.25)' }}>Pay Now</button>
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
