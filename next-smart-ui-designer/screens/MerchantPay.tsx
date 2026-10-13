'use client';
import { C } from '@/screens/_shared/tokens';

import { useEffect, useRef, useState } from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';
import { HeaderNav, NumericKeypad, POPPINS, StatusBar, SWITZER } from '@/screens/_shared';

type Merchant = { name: string; sub: string; abbr: string };

const MOCK: Record<string, Merchant> = {
  '247810': { name: 'Shoa Supermarket', sub: 'Retail • Merchant No. 247810', abbr: 'SH' },
  '183920': { name: "Kaldi's Coffee", sub: 'F&B • Merchant No. 183920', abbr: 'KC' },
  '391047': { name: 'Yordanos Pharmacy', sub: 'Health • Merchant No. 391047', abbr: 'YP' }
};

const RANDOM: { name: string; abbr: string; cat: string }[] = [
  { name: 'Adey Supermarket', abbr: 'AS', cat: 'Retail' },
  { name: 'Tomoca Coffee', abbr: 'TC', cat: 'F&B' },
  { name: 'Desta Pharmacy', abbr: 'DP', cat: 'Health' },
  { name: 'Merkato Electronics', abbr: 'ME', cat: 'Electronics' }
];

const RECENT = [
  { name: 'Shoa Supermarket', sub: 'Retail • Merchant No. 247810', code: '247810', abbr: 'SH' },
  { name: "Kaldi's Coffee", sub: 'F&B • Merchant No. 183920', code: '183920', abbr: 'KC' },
  { name: 'Yordanos Pharmacy', sub: 'Health • Merchant No. 391047', code: '391047', abbr: 'YP' }
];

export function MerchantPayScreen() {
  const [tab, setTab] = useState<'code' | 'qr'>('code');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    setMerchant(null);
    setLoading(false);
    if (code.length >= 5) {
      setLoading(true);
      timer.current = setTimeout(() => {
        setLoading(false);
        const rand = RANDOM[Math.floor(Math.random() * RANDOM.length)];
        setMerchant(MOCK[code] ?? { name: rand.name, sub: `${rand.cat} • Merchant No. ${code}`, abbr: rand.abbr });
      }, 1200);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [code]);

  function selectRecent(r: (typeof RECENT)[number]) {
    setTab('code');
    setCode(r.code);
    setMerchant({ name: r.name, sub: r.sub, abbr: r.abbr });
    setLoading(false);
  }

  const tabStyle = (active: boolean): React.CSSProperties => ({
    flex: 1, height: 38, borderRadius: 10, border: 'none',
    background: active ? C.primary : 'transparent', color: active ? C.surface : C.onSurfaceLow,
    fontFamily: SWITZER, fontSize: 13, fontWeight: 500, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    boxShadow: active ? '0 2px 8px rgba(254,53,61,0.25)' : 'none', transition: 'all 0.2s'
  });

  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        <StatusBar />
        <HeaderNav title="Pay Merchant" />

        <div style={{ flex: 1, overflowY: 'auto', padding: '4px 16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Method toggle */}
          <div style={{ background: C.surface, borderRadius: 14, padding: 5, display: 'flex', gap: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <button onClick={() => setTab('code')} style={tabStyle(tab === 'code')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 15, height: 15 }}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
              Enter Code
            </button>
            <button onClick={() => setTab('qr')} style={tabStyle(tab === 'qr')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 15, height: 15 }}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><line x1="14" y1="14" x2="14" y2="14.01" /><line x1="20" y1="14" x2="20" y2="14.01" /><line x1="14" y1="20" x2="14" y2="20.01" /><line x1="20" y1="20" x2="20" y2="20.01" /></svg>
              Scan QR
            </button>
          </div>

          {tab === 'code' ? (
            <div style={{ background: C.surface, borderRadius: 16, padding: '18px 16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontFamily: SWITZER, fontSize: 13, fontWeight: 500, color: C.onSurfaceLow }}>Merchant Code / Till Number</label>
              <div style={{ width: '100%', height: 50, borderRadius: 12, border: `1.5px solid ${merchant ? C.primary : C.stroke}`, background: merchant ? C.surface : '#FAFAFA', padding: '0 14px', display: 'flex', alignItems: 'center', fontFamily: SWITZER, fontSize: 15, color: code ? C.onSurface : C.onSurfaceLow, letterSpacing: code ? 1 : 0 }}>
                {code || 'e.g. 247810'}
              </div>

              {loading && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: C.background, borderRadius: 10 }}>
                  <div style={{ width: 16, height: 16, border: `2px solid ${C.stroke}`, borderTopColor: C.primary, borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  <span style={{ fontFamily: SWITZER, fontSize: 13, color: C.onSurfaceLow }}>Looking up merchant...</span>
                </div>
              )}

              {merchant && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(31,200,59,0.06)', border: '1px solid rgba(31,200,59,0.2)', borderRadius: 12, padding: '10px 12px' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(254,53,61,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: SWITZER, fontSize: 13, fontWeight: 700, color: C.primary }}>{merchant.abbr}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: SWITZER, fontSize: 14, fontWeight: 600, color: C.onSurface }}>{merchant.name}</div>
                    <div style={{ fontFamily: SWITZER, fontSize: 12, color: C.onSurfaceLow, marginTop: 2 }}>{merchant.sub}</div>
                  </div>
                  <svg viewBox="0 0 24 24" fill="none" stroke={C.success} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                </div>
              )}
            </div>
          ) : (
            <>
              <div style={{ background: C.surface, borderRadius: 16, padding: '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', textAlign: 'center' }}>
                <div style={{ width: 180, height: 180, borderRadius: 16, background: C.background, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', left: 0, right: 0, height: 2, background: C.primary, animation: 'scan-line 2s ease-in-out infinite' }} />
                  {(['tl', 'tr', 'bl', 'br'] as const).map((c) => (
                    <span key={c} style={{
                      position: 'absolute', width: 24, height: 24, borderColor: C.primary, borderStyle: 'solid', borderWidth: 0,
                      top: c[0] === 't' ? 12 : undefined, bottom: c[0] === 'b' ? 12 : undefined,
                      left: c[1] === 'l' ? 12 : undefined, right: c[1] === 'r' ? 12 : undefined,
                      borderTopWidth: c[0] === 't' ? 3 : 0, borderBottomWidth: c[0] === 'b' ? 3 : 0,
                      borderLeftWidth: c[1] === 'l' ? 3 : 0, borderRightWidth: c[1] === 'r' ? 3 : 0
                    }} />
                  ))}
                  <svg viewBox="0 0 24 24" fill="none" stroke={C.onSurface} strokeWidth="1.5" style={{ width: 80, height: 80, opacity: 0.15 }}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>
                </div>
                <div style={{ fontFamily: SWITZER, fontSize: 15, fontWeight: 600, color: C.onSurface }}>Point camera at merchant QR</div>
                <div style={{ fontFamily: SWITZER, fontSize: 13, color: C.onSurfaceLow, lineHeight: 1.5 }}>Align the merchant&apos;s QR code within the frame to pay instantly</div>
                <button onClick={() => selectRecent(RECENT[0])} style={{ width: '100%', height: 48, borderRadius: 13, background: C.primary, color: C.surface, border: 'none', fontFamily: POPPINS, fontSize: 14, fontWeight: 500, cursor: 'pointer', boxShadow: '0 4px 16px rgba(254,53,61,0.2)' }}>Scan</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ fontFamily: SWITZER, fontSize: 14, fontWeight: 600, color: C.onSurface }}>Recent Merchants</div>
                <div style={{ background: C.surface, borderRadius: 16, padding: '4px 0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  {RECENT.map((r, i) => (
                    <div key={r.code} onClick={() => selectRecent(r)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', cursor: 'pointer', borderTop: i === 0 ? 'none' : `1px solid ${C.background}` }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(254,53,61,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: SWITZER, fontSize: 14, fontWeight: 700, color: C.primary }}>{r.abbr}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: SWITZER, fontSize: 14, fontWeight: 600, color: C.onSurface }}>{r.name}</div>
                        <div style={{ fontFamily: SWITZER, fontSize: 12, color: C.onSurfaceLow, marginTop: 2 }}>{r.sub}</div>
                      </div>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#C5C5CB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><polyline points="9 18 15 12 9 6" /></svg>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Enter Code: keypad + continue pinned to bottom */}
        {tab === 'code' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '8px 16px 20px', background: C.background, flexShrink: 0 }}>
            <NumericKeypad
              onKey={(d) => setCode((c) => (c.length < 10 ? c + d : c))}
              onDelete={() => setCode((c) => c.slice(0, -1))}
              marginTop={0}
            />
            <button
              disabled={!merchant}
              style={{ width: '100%', height: 52, borderRadius: 14, border: 'none', background: merchant ? C.primary : C.disabled, color: merchant ? C.surface : C.onSurfaceLow, fontFamily: POPPINS, fontSize: 15, fontWeight: 500, cursor: merchant ? 'pointer' : 'not-allowed', boxShadow: merchant ? '0 4px 16px rgba(254,53,61,0.25)' : 'none', transition: 'all 0.2s' }}
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}
