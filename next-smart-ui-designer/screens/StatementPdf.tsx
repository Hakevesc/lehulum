'use client';
import { C } from '@/screens/_shared/tokens';

import { Download, Share2, X } from 'lucide-react';
import { PhoneFrame } from '@/components/PhoneFrame';
import { StatusBar, SWITZER } from '@/screens/_shared';

const POPPINS = "'Poppins', sans-serif";

const ROWS = [
  ['TXR9K2LMP4', '12/01 08:15', '+15,000.00', 'Salary', 'ABC Trading PLC - Monthly Salary', '45,200.00', true],
  ['TXR7D3NMB1', '12/03 11:42', '-3,500.00', 'Send Money', 'To: Hana Mekonnen - Rent Payment', '41,700.00', false],
  ['TXR5F8HQW2', '12/05 14:30', '-2,450.00', 'Merchant', 'London Cafe - Invoice INV-2024-8912', '39,250.00', false],
  ['TXR3M2LKN8', '12/08 09:05', '-1,200.00', 'Bill Pay', 'Ethiopian Electric Utility - ACC 2023-4567', '38,050.00', false],
  ['TXR1P6JHY9', '12/12 16:50', '-500.00', 'Airtime', 'Bundle 10GB + 300 Min - 251-911-223344', '37,550.00', false],
  ['TXR4W7KGD3', '12/15 07:22', '+8,000.00', 'Bank Txfr', 'Dashen Bank A/C 100023456789 - Freelance', '45,550.00', true],
  ['TXR8T2FVB5', '12/18 20:14', '-850.00', 'Merchant', 'Fresh Basket Supermarket - Groceries', '44,700.00', false],
  ['TXR6H9LQN7', '12/22 10:38', '-6,000.00', 'Bank Txfr', 'Hibret Bank A/C 3000987654 - Tuition Fee', '38,700.00', false],
  ['TXR2F5MVK1', '12/26 12:00', '-320.00', 'Send Money', 'To: Abebe Kebede - Reimbursement', '38,380.00', false],
  ['TXR0J3KPD7', '12/28 15:45', '+7,500.00', 'Salary', 'ABC Trading PLC - Dec Bonus & Salary', '45,880.00', true]
] as const;

const REDBOX = [['OPENING BALANCE', '30,200.00 BR'], ['TOTAL CREDIT', '30,500.00 BR'], ['TOTAL DEBIT', '14,820.00 BR']];
const WHITEBOX = [['TRANSACTIONS', '10'], ['CREDIT COUNT', '3'], ['DEBIT COUNT', '7'], ['CLOSING BALANCE', '45,880.00 BR']];
const CUSTOMER: [string, string][] = [
  ['CUSTOMER NAME', 'Abel Agegnehu'], ['PHONE NUMBER', '251911223344'],
  ['DATE OF STATEMENT', '12/28/2025'], ['PERIOD NAME', 'December 01 - December 28, 2025']
];

export function StatementPdfScreen() {
  const iconBtn: React.CSSProperties = { width: 36, height: 36, borderRadius: '50%', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' };
  const grayHeader = (text: string) => (
    <div style={{ background: '#9E9E9E', padding: '3px 6px', textAlign: 'center' }}>
      <h2 style={{ fontFamily: POPPINS, fontSize: 9, fontWeight: 700, color: C.surface, letterSpacing: '1.5px', margin: 0 }}>{text}</h2>
    </div>
  );

  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        <StatusBar />
        <div style={{ flexShrink: 0, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: C.background }}>
          <button aria-label="Close" style={iconBtn}><X size={22} color={C.onSurface} strokeWidth={1.8} /></button>
          <span style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 16, fontWeight: 500, letterSpacing: '0.3px', flex: 1, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '0 8px' }}>Transaction_2025_12_Statement.pdf</span>
          <div style={{ display: 'flex', gap: 4 }}>
            <button aria-label="Share" style={iconBtn}><Share2 size={20} color={C.onSurface} strokeWidth={1.8} /></button>
            <button aria-label="Download" style={iconBtn}><Download size={20} color={C.onSurface} strokeWidth={1.8} /></button>
          </div>
        </div>

        {/* Viewport */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 8, display: 'flex', justifyContent: 'center', background: '#3a3a3a' }}>
          <div style={{ width: '100%', maxWidth: 328, background: C.surface, borderRadius: 16, position: 'relative', padding: '20px 14px', overflow: 'hidden' }}>
            {/* Watermark */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%) rotate(-25deg)', fontFamily: POPPINS, fontSize: 90, fontWeight: 900, color: 'rgba(180,180,180,0.12)', letterSpacing: 8, whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 0, userSelect: 'none' }}>M-PESA</div>
            <div style={{ position: 'absolute', top: '55%', left: '55%', transform: 'translate(-50%,-50%) rotate(-12deg)', width: 180, height: 180, opacity: 0.55, mixBlendMode: 'multiply', pointerEvents: 'none', zIndex: 1 }}>
              <img src="/assets/M-PESA-official_stamp.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>

            <div style={{ position: 'relative', zIndex: 2 }}>
              {/* Header */}
              <img src="/assets/M-PESA-red-logo.svg" alt="M-PESA" style={{ height: 36, display: 'block', marginBottom: 6 }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <div style={{ fontFamily: POPPINS, fontSize: 11, fontWeight: 700, color: C.onSurface, marginBottom: 3 }}>Safaricom M-PESA Mobile Financial Services PLC</div>
              <div style={{ fontSize: 8.5, color: C.onSurface, lineHeight: 1.7 }}>
                <span style={{ fontWeight: 600, color: '#666' }}>TIN NO :</span> <b>0084242753</b> &nbsp;<span style={{ fontWeight: 600, color: '#666' }}>VAT REG NO :</span> <b>22371880003</b><br />
                <span style={{ fontWeight: 600, color: '#666' }}>Address :</span> <b>Addis Ababa, Kirkos Woreda 1</b><br />
                <span style={{ fontWeight: 600, color: '#666' }}>Tel:</span> <b>+251 756 765434</b>
              </div>

              {/* Title */}
              <div style={{ border: `2px solid ${C.primary}`, padding: '6px 0', textAlign: 'center', margin: '8px 0 10px', borderRadius: 2 }}>
                <h1 style={{ fontFamily: POPPINS, fontSize: 11, fontWeight: 700, color: C.primary, letterSpacing: '1.5px', textTransform: 'uppercase', margin: 0 }}>Full Account Statement</h1>
              </div>

              {/* Customer */}
              <div style={{ paddingBottom: 10 }}>
                {CUSTOMER.map(([l, v]) => (
                  <div key={l} style={{ display: 'flex', alignItems: 'baseline', padding: '2px 0', gap: 6 }}>
                    <span style={{ fontSize: 7.5, fontWeight: 500, minWidth: 130, textTransform: 'uppercase', letterSpacing: '0.3px', color: C.onSurface }}>{l}</span>
                    <span style={{ fontSize: 9, fontWeight: 700, flex: 1, color: C.onSurface }}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Summary */}
              {grayHeader('ACCOUNT SUMMARY')}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
                {REDBOX.map(([l, v]) => (
                  <div key={l} style={{ background: C.primary, padding: '7px 3px', textAlign: 'center' }}>
                    <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.9)', fontWeight: 600, letterSpacing: '0.3px' }}>{l}</div>
                    <div style={{ fontFamily: POPPINS, fontSize: 10, fontWeight: 800, color: C.surface }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', background: C.surface, border: `1px solid ${C.disabled}`, borderTop: 'none' }}>
                {WHITEBOX.map(([l, v], i) => (
                  <div key={l} style={{ padding: '6px 3px', textAlign: 'center', borderRight: i === WHITEBOX.length - 1 ? 'none' : `1px solid ${C.disabled}` }}>
                    <div style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.2px', color: C.onSurface }}>{l}</div>
                    <div style={{ fontFamily: POPPINS, fontSize: 9, fontWeight: 800, color: C.onSurface }}>{v}</div>
                  </div>
                ))}
              </div>

              {/* Transactions */}
              <div style={{ marginTop: 8 }}>
                {grayHeader('TRANSACTION DETAIL')}
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 7 }}>
                  <thead>
                    <tr>
                      {['TRANSACTION ID', 'DATE', 'SETTLED', 'REASON', 'DETAILS', 'BALANCE'].map((h, i) => (
                        <th key={h} style={{ background: '#9E9E9E', color: C.surface, padding: '3px', textAlign: i === 5 ? 'right' : 'left', fontWeight: 700, fontSize: 6.5, border: '1px solid #888' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ROWS.map((r, idx) => (
                      <tr key={idx} style={{ background: idx % 2 === 1 ? '#FAFAFA' : C.surface }}>
                        <td style={{ padding: 3, border: '1px solid #E8E8E8', fontWeight: 800, fontSize: 6.5 }}>{r[0]}</td>
                        <td style={{ padding: 3, border: '1px solid #E8E8E8', fontWeight: 600, fontSize: 6.5 }}>{r[1]}</td>
                        <td style={{ padding: 3, border: '1px solid #E8E8E8', fontFamily: POPPINS, fontWeight: 800, fontSize: 7, color: r[6] ? '#2E7D32' : C.primary }}>{r[2]}</td>
                        <td style={{ padding: 3, border: '1px solid #E8E8E8', fontWeight: 600, fontSize: 6.5 }}>{r[3]}</td>
                        <td style={{ padding: 3, border: '1px solid #E8E8E8', fontSize: 6.4, lineHeight: 1.4, color: '#333' }}>{r[4]}</td>
                        <td style={{ padding: 3, border: '1px solid #E8E8E8', textAlign: 'right', fontWeight: 700, fontSize: 6.5 }}>{r[5]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div style={{ padding: '8px 0 4px', borderTop: `1px solid ${C.disabled}`, marginTop: 8 }}>
                <p style={{ fontSize: 7, color: '#555', lineHeight: 1.6, textAlign: 'center' }}>This Record is Produced For Your Personal Use And It Is Not Transferable. Contact M-PESA <span style={{ color: C.primary, fontWeight: 600 }}>Customercare@Safaricom.Net</span></p>
              </div>
              <div style={{ background: C.primary, padding: '10px 14px', display: 'flex', justifyContent: 'flex-end', margin: '0 -14px -20px' }}>
                <img src="/assets/M-PESA-white-logo.svg" alt="M-PESA" style={{ height: 22 }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
