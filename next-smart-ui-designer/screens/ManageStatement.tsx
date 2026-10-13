'use client';
import { C } from '@/screens/_shared/tokens';

import { useState } from 'react';
import { ArrowLeftRight, Calendar, Check, ChevronDown, FileText } from 'lucide-react';
import { PhoneFrame } from '@/components/PhoneFrame';
import { HeaderNav, POPPINS, StatusBar, SWITZER } from '@/screens/_shared';

const TABS = [
  { id: 'pdf', label: 'Generate PDF', cta: 'Generate PDF' },
  { id: 'email', label: 'Send Email', cta: 'Send Email' },
  { id: 'schedule', label: 'Schedule', cta: 'Schedule Now' }
] as const;
type TabId = (typeof TABS)[number]['id'];

const TX_TYPES = ['All Transaction', 'Merchant Payment', 'Send Money', 'Bank Transfer', 'Bill Payment', 'Airtime TopUp'];
const DATE_OPTS = [
  { id: 'this-month', label: 'This Month (May 26)' },
  { id: '6-months', label: '6 Months' },
  { id: 'date-range', label: 'Choose a Date Range' }
];

export function ManageStatementScreen() {
  const [tab, setTab] = useState<TabId>('pdf');
  const [ddOpen, setDdOpen] = useState(false);
  const [txType, setTxType] = useState(TX_TYPES[0]);
  const [dateOpt, setDateOpt] = useState('this-month');

  const cta = TABS.find((t) => t.id === tab)!.cta;

  return (
    <PhoneFrame>
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        <StatusBar />
        <HeaderNav title="Manage Statement" padding="12px 16px" right={
          <button aria-label="History" className="icon-button" style={{ width: 36, height: 36, borderRadius: 10, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText size={22} color={C.onSurface} strokeWidth={1.8} />
          </button>
        } />

        <div style={{ padding: '0 16px 80px', display: 'flex', flexDirection: 'column', flex: 1, width: '100%' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, width: '100%' }}>
            {TABS.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, height: 38, borderRadius: 20, border: 'none', fontFamily: SWITZER, fontSize: 12, fontWeight: 500, cursor: 'pointer', letterSpacing: '0.2px', background: tab === t.id ? C.primary : C.disabled, color: tab === t.id ? C.surface : C.onSurfaceLow, boxShadow: tab === t.id ? '0 4px 12px rgba(254,53,61,0.25)' : 'none' }}>{t.label}</button>
            ))}
          </div>

          {/* Filter card */}
          <div style={{ width: '100%', background: C.surface, borderRadius: 20, padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Transaction type */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <ArrowLeftRight size={20} color={C.onSurface} strokeWidth={2} />
                <span style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 16, fontWeight: 600, letterSpacing: '0.2px' }}>Filter by Transaction Type</span>
              </div>
              <div style={{ position: 'relative', marginTop: 12 }}>
                <div onClick={() => setDdOpen((o) => !o)} style={{ width: '100%', height: 48, padding: '0 16px', background: ddOpen ? C.surface : '#F8F8FA', border: `1.5px solid ${C.stroke}`, borderRadius: ddOpen ? '12px 12px 0 0' : 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontFamily: SWITZER, fontSize: 16, fontWeight: 500, color: C.onSurface }}>
                  <span>{txType}</span>
                  <ChevronDown size={18} color={C.onSurfaceLow} style={{ transition: 'transform 0.25s', transform: ddOpen ? 'rotate(180deg)' : 'none' }} />
                </div>
                {ddOpen && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: C.surface, border: '1.5px solid #D0D0D5', borderTop: 'none', borderRadius: '0 0 12px 12px', overflow: 'hidden', zIndex: 100 }}>
                    {TX_TYPES.map((t, i) => (
                      <div key={t} onClick={() => { setTxType(t); setDdOpen(false); }} style={{ padding: '10px 16px', fontFamily: SWITZER, fontSize: 16, fontWeight: txType === t ? 600 : 500, color: C.onSurface, cursor: 'pointer', background: txType === t ? '#EAEAEF' : 'transparent', borderBottom: i === TX_TYPES.length - 1 ? 'none' : `1px solid ${C.background}` }}>{t}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Date filter */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Calendar size={20} color={C.onSurface} strokeWidth={2} />
                <span style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 16, fontWeight: 600, letterSpacing: '0.2px' }}>Filter by Date</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
                {DATE_OPTS.map((o) => {
                  const sel = dateOpt === o.id;
                  return (
                    <div key={o.id} onClick={() => setDateOpt(o.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 8px 12px 0', cursor: 'pointer', borderRadius: 10 }}>
                      <div style={{ width: 30, height: 30, borderRadius: 8, border: `2px solid ${sel ? C.success : '#D0D0D5'}`, background: sel ? C.successContainer : C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {sel && <Check size={16} color={C.success} strokeWidth={3} />}
                      </div>
                      <span style={{ color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 16, fontWeight: 400, letterSpacing: '0.2px' }}>{o.label}</span>
                    </div>
                  );
                })}
              </div>

              {dateOpt === 'date-range' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                  {['20 Sep', '20 Dec'].map((d, i) => (
                    <div key={i} style={{ flex: 1, maxWidth: 125, height: 60, padding: '0 10px', background: '#F8F8FA', border: `1.5px solid ${C.stroke}`, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                      <Calendar size={24} color={C.onSurface} strokeWidth={1.8} style={{ flexShrink: 0 }} />
                      <span style={{ color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 16, fontWeight: 500 }}>{d}</span>
                      {i === 0 && <span style={{ color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 13 }}>to</span>}
                    </div>
                  ))}
                </div>
              )}

              {tab !== 'pdf' && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <span style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 16, fontWeight: 600 }}>Send to</span>
                  </div>
                  <div style={{ width: '100%', height: 50, padding: '0 12px', background: '#F8F8FA', border: `1.5px solid ${C.stroke}`, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ flex: 1, fontFamily: SWITZER, fontSize: 15, fontWeight: 500, color: C.onSurface }}>zemedkun.k@gmail.com</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <button style={{ position: 'absolute', bottom: 20, left: 16, width: 'calc(100% - 32px)', height: 48, borderRadius: 14, background: C.primary, color: C.surface, border: 'none', fontFamily: POPPINS, fontSize: 14, fontWeight: 500, cursor: 'pointer', boxShadow: '0 4px 16px rgba(254,53,61,0.25)', letterSpacing: '0.3px' }}>{cta}</button>
      </div>
    </PhoneFrame>
  );
}
