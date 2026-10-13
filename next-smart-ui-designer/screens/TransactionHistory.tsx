'use client';
import { C } from '@/screens/_shared/tokens';

import { PhoneFrame } from '@/components/PhoneFrame';
import { HeaderNav, StatusBar, SWITZER } from '@/screens/_shared';

type Row = { title: string; time: string; amount: string; positive: boolean; type: string; icon: string; iconBg: string };
type Section = { date: string; rows: Row[] };

const SECTIONS: Section[] = [
  { date: 'Today', rows: [
    { title: 'Airtime Top-up', time: 'Today', amount: '-50.00 Br', positive: false, type: 'Airtime Purchase', icon: '/assets/Airtime Package.svg', iconBg: '#FFF8E1' }
  ] },
  { date: 'July 14, 2027', rows: [
    { title: 'From Mikias Dereje', time: 'July 14, 2027', amount: '+1,000.00 Br', positive: true, type: 'Transfer Money', icon: '/assets/Transfer Money.svg', iconBg: C.successContainer },
    { title: 'To Hana Kagnew', time: 'July 14, 2027', amount: '-1,000.00 Br', positive: false, type: 'Transfer Money', icon: '/assets/Transfer Money.svg', iconBg: C.onPrimary },
    { title: 'London Cafe', time: 'July 14, 2027', amount: '-350.00 Br', positive: false, type: 'Merchant Payment', icon: '/assets/Merchant Payemnt.svg', iconBg: C.successContainer }
  ] },
  { date: 'July 14, 2026', rows: [
    { title: 'Ethiopia Electric Utility', time: 'July 14, 2026', amount: '-5,000.00 Br', positive: false, type: 'Bill Payment', icon: '/assets/Bill Payment.svg', iconBg: '#EEF2FF' }
  ] }
];

export function TransactionHistoryScreen() {
  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        <StatusBar />
        <HeaderNav title="Transaction History" />

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 24px', display: 'flex', flexDirection: 'column', width: '100%', gap: 16 }}>
          {/* Search + filter */}
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1, height: 48, padding: '0 16px', background: C.surface, border: `1.5px solid ${C.stroke}`, borderRadius: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke={C.onSurfaceLow} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20, flexShrink: 0 }}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
              <input placeholder="Search by date, card, vendor" style={{ flex: 1, border: 'none', background: 'transparent', fontFamily: SWITZER, fontSize: 14, color: C.onSurface, outline: 'none' }} />
            </div>
            <button style={{ width: 48, height: 48, borderRadius: 14, border: `1.5px solid ${C.stroke}`, background: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke={C.onSurface} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
            </button>
          </div>

          {/* Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {SECTIONS.map((s) => (
              <div key={s.date} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 13, fontWeight: 500, letterSpacing: '0.2px', paddingLeft: 4 }}>{s.date}</div>
                {s.rows.map((r, i) => (
                  <div key={i} style={{ background: C.surface, borderRadius: 16, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'flex-start', gap: 14, cursor: 'pointer' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: r.iconBg }}>
                      <img src={r.icon} alt="" style={{ width: 26, height: 26, objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                        <span style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 15, fontWeight: 600, letterSpacing: '0.2px' }}>{r.title}</span>
                        <span style={{ color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 12, fontWeight: 400, whiteSpace: 'nowrap' }}>{r.time}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                        <div>
                          <span style={{ fontFamily: SWITZER, fontSize: 14, fontWeight: 700, color: r.positive ? C.success : C.primary }}>{r.amount}</span>
                          <div style={{ color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 11, fontWeight: 400, marginTop: 1 }}>{r.type}</div>
                        </div>
                        <button style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 6 }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                          <span style={{ color: C.primary, fontFamily: SWITZER, fontSize: 11, fontWeight: 500 }}>Copy ID</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
