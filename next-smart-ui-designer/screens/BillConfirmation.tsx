'use client';
import { C } from '@/screens/_shared/tokens';
import { PhoneFrame } from '@/components/PhoneFrame';

export function BillConfirmationScreen() {
  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        <StatusBar />
        <Header title="Confirmation" />
        <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: C.successContainer, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={C.success} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h3 style={{ margin: '0 0 6px', fontSize: 18 }}>Payment Successful</h3>
          <p style={{ margin: '0 0 24px', color: C.onSurfaceLow, fontSize: 14, textAlign: 'center' }}>Your bill payment was completed successfully.</p>
          <div style={{ width: '100%', background: C.surface, borderRadius: 16, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <ReceiptRow label="Biller" value="Ethiopian Electric" />
            <ReceiptRow label="Account" value="123456789" />
            <ReceiptRow label="Amount" value="ETB 250.00" />
            <ReceiptRow label="Fee" value="ETB 2.00" />
            <ReceiptRow label="Date" value="19 Jun 2026" bold />
          </div>
        </div>
        <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button style={{ width: '100%', height: 48, borderRadius: 12, background: C.primary, color: C.onPrimary, fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(254,53,61,0.25)' }}>Done</button>
          <button style={{ width: '100%', height: 48, borderRadius: 12, background: C.surface, border: `1.5px solid ${C.stroke}`, color: C.onSurface, fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>Share Receipt</button>
        </div>
      </div>
    </PhoneFrame>
  );
}
function ReceiptRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 13, color: C.onSurfaceLow }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: bold ? 700 : 600, color: C.onSurface }}>{value}</span>
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
function Header({ title }: { title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0 12px' }}>
      <div style={{ width: 36 }} />
      <span style={{ color: C.onSurface, fontFamily: "'Switzer', sans-serif", fontSize: 17, fontWeight: 500 }}>{title}</span>
      <div style={{ width: 36 }} />
    </div>
  );
}
