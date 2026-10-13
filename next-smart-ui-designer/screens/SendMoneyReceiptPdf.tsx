'use client';
import { C } from '@/screens/_shared/tokens';

import { PhoneFrame } from '@/components/PhoneFrame';
import { StatusBar, HeaderNav, POPPINS } from '@/screens/_shared';

export function SendMoneyReceiptPdfScreen() {
  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        <StatusBar />
        <HeaderNav title="Send Money Receipt" right={
          <button aria-label="Share" style={{ width: 36, height: 36, borderRadius: 10, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={C.onSurface} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
          </button>
        } />
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: C.surface, borderRadius: 16, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <ReceiptRow label="Transaction ID" value="TXR9K2LMP4" />
            <ReceiptRow label="Date" value="12/01/2026 08:15" />
            <ReceiptRow label="From" value="Zemedkun Kidane · 25177002423" />
            <ReceiptRow label="To" value="Mikias Dereje · 251911223344" />
            <ReceiptRow label="Amount" value="ETB 1,000.00" bold />
            <ReceiptRow label="Fee" value="ETB 5.00" />
            <ReceiptRow label="Status" value="Completed" success />
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 'auto' }}>
            <button style={{ flex: 1, height: 48, borderRadius: 12, background: C.surface, border: `1.5px solid ${C.stroke}`, color: C.onSurface, fontFamily: POPPINS, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>Save Image</button>
            <button style={{ flex: 1, height: 48, borderRadius: 12, background: C.primary, color: C.onPrimary, fontFamily: POPPINS, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(254,53,61,0.25)' }}>Share</button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
function ReceiptRow({ label, value, bold, success }: { label: string; value: string; bold?: boolean; success?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 13, color: C.onSurfaceLow }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: bold ? 700 : 600, color: success ? C.success : C.onSurface }}>{value}</span>
    </div>
  );
}
