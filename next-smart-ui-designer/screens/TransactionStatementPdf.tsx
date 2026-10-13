'use client';
import { C } from '@/screens/_shared/tokens';

import { PhoneFrame } from '@/components/PhoneFrame';
import { StatusBar, HeaderNav, formatAmount, POPPINS } from '@/screens/_shared';

const ROWS = [
  ['TXR9K2LMP4', '12/01 08:15', '+15,000.00', 'Salary', 'ABC Trading PLC', '45,200.00', true],
  ['TXR7D3NMB1', '12/03 11:42', '-3,500.00', 'Send Money', 'To: Hana Mekonnen', '41,700.00', false],
  ['TXR5F8HQW2', '12/05 14:30', '-2,450.00', 'Merchant', 'London Cafe', '39,250.00', false],
  ['TXR3M2LKN8', '12/08 09:05', '-1,200.00', 'Bill Pay', 'Ethiopian Electric', '38,050.00', false]
];

export function TransactionStatementPdfScreen() {
  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        <StatusBar />
        <HeaderNav title="Transaction Statement" right={
          <button aria-label="Share" style={{ width: 36, height: 36, borderRadius: 10, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={C.onSurface} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
          </button>
        } />
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: C.surface, borderRadius: 16, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {ROWS.map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < ROWS.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.onSurface, fontFamily: POPPINS }}>{r[4]}</div>
                  <div style={{ fontSize: 11, color: C.onSurfaceLow, marginTop: 2 }}>{r[1]} · {r[0]}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: r[6] ? C.success : C.onSurface, fontFamily: POPPINS }}>{r[2]}</div>
                  <div style={{ fontSize: 11, color: C.onSurfaceLow, marginTop: 2 }}>Bal: {r[5]}</div>
                </div>
              </div>
            ))}
          </div>
          <button style={{ width: '100%', height: 48, borderRadius: 12, background: C.primary, color: C.onPrimary, fontFamily: POPPINS, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(254,53,61,0.25)', marginTop: 'auto' }}>Download PDF</button>
        </div>
      </div>
    </PhoneFrame>
  );
}
