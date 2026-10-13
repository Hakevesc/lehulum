'use client';
import { C } from '@/screens/_shared/tokens';

import { useEffect, useRef, useState } from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';
import { ActionButton, formatAmount, HeaderNav, NumericKeypad, StatusBar, SWITZER } from '@/screens/_shared';

const BANKS = [
  { name: 'Awash Bank', label: 'Awash Bank', logo: '/assets/banks logo/awass-bank.png' },
  { name: 'Dashen Bank', label: 'Dashen Bank', logo: '/assets/banks logo/dashen-bank.png' },
  { name: 'CBE', label: 'Commercial Bank of Ethiopia', logo: '/assets/banks logo/cbe-logo.png' },
  { name: 'Abyssinia Bank', label: 'Abyssinia Bank', logo: '/assets/banks logo/abyssinya-bank.png' }
];

type Bank = (typeof BANKS)[number];

export function TransferSelectBankScreen() {
  const [bank, setBank] = useState<Bank | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [account, setAccount] = useState('');
  const [resolved, setResolved] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [mode, setMode] = useState<'account' | 'amount'>('account');
  const [amount, setAmount] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Resolve the account name ~1.8s after 8+ digits are entered (matches legacy).
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    setResolved(false);
    setFetching(false);
    if (account.length >= 8) {
      timer.current = setTimeout(() => {
        setFetching(true);
        timer.current = setTimeout(() => {
          setFetching(false);
          setResolved(true);
          setMode('amount');
        }, 1200);
      }, 600);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [account]);

  function pressKey(key: string) {
    if (mode === 'account') {
      setAccount((a) => (a.length < 15 ? a + key : a));
    } else {
      setAmount((cur) => {
        const s = cur.toString();
        const di = s.indexOf('.');
        if (di !== -1 && s.length - di >= 3) return cur;
        if (cur === 0 && key === '0') return cur;
        return cur === 0 ? parseFloat(key) : parseFloat(s + key);
      });
    }
  }

  function deleteKey() {
    if (mode === 'amount' && amount > 0) {
      const s = amount.toString();
      setAmount(s.length === 1 ? 0 : parseFloat(s.slice(0, -1)));
    } else {
      setMode('account');
      setAccount((a) => a.slice(0, -1));
    }
  }

  const canContinue = !!bank && resolved && amount > 0;

  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        <StatusBar />
        <HeaderNav title="Transfer to Bank" />

        <div style={{ padding: '16px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1, width: '100%', gap: 14 }}>
          {/* Bank selector */}
          <div style={{ position: 'relative' }}>
            <div
              onClick={(e) => { e.stopPropagation(); setDropdownOpen((o) => !o); }}
              style={{
                height: 56, background: C.surface, borderRadius: 14, padding: '0 16px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer',
                border: `1.5px solid ${dropdownOpen ? C.primary : C.stroke}`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, overflow: 'hidden', flexShrink: 0, background: C.background, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {bank ? (
                    <img src={bank.logo} alt={bank.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }} />
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 21 21 21 21 10" /><polyline points="3 10 3 21" /><line x1="9" y1="10" x2="9" y2="16" /><line x1="13" y1="10" x2="13" y2="16" /><line x1="17" y1="10" x2="17" y2="16" /><polygon points="3 6 21 6 12 1 3 6" />
                    </svg>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: 0 }}>
                  {bank ? (
                    <span style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 14, fontWeight: 600, letterSpacing: '0.2px' }}>{bank.name}</span>
                  ) : (
                    <span style={{ color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 14, fontWeight: 400 }}>Select Bank</span>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {bank && <span style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 13, fontWeight: 600 }}>Change</span>}
                <svg viewBox="0 0 24 24" fill="none" stroke={C.onSurface} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18, transition: 'transform 0.25s', transform: dropdownOpen ? 'rotate(180deg)' : 'none' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            {dropdownOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, background: C.surface,
                borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.15)', zIndex: 100, maxHeight: 260, overflowY: 'auto'
              }}>
                {BANKS.map((b, i) => {
                  const selected = bank?.name === b.name;
                  return (
                    <div key={b.name}
                      onClick={(e) => { e.stopPropagation(); setBank(b); setDropdownOpen(false); }}
                      style={{
                        padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
                        borderBottom: i === BANKS.length - 1 ? 'none' : `1px solid ${C.background}`,
                        background: selected ? C.onPrimary : 'transparent'
                      }}
                    >
                      <div style={{ width: 32, height: 32, borderRadius: 8, overflow: 'hidden', background: C.background }}>
                        <img src={b.logo} alt={b.label} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }} />
                      </div>
                      <span style={{ flex: 1, color: selected ? C.primary : C.onSurface, fontFamily: SWITZER, fontSize: 14, fontWeight: selected ? 600 : 500 }}>{b.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Account number input */}
          <div style={{
            height: 52, background: C.surface, borderRadius: 14, padding: '0 16px', display: 'flex', alignItems: 'center',
            border: `1.5px solid ${C.stroke}`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <input
              type="tel" value={account} placeholder="Account Number" maxLength={15}
              onChange={(e) => setAccount(e.target.value.replace(/\D/g, ''))}
              style={{ flex: 1, border: 'none', background: 'transparent', fontFamily: SWITZER, fontSize: 18, fontWeight: 500, color: C.onSurface, outline: 'none', letterSpacing: 1 }}
            />
          </div>

          {/* Fetching state */}
          {fetching && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 2, color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 13 }}>
              <div style={{ width: 16, height: 16, border: `2px solid ${C.stroke}`, borderTopColor: C.primary, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <span>Fetching account name…</span>
            </div>
          )}

          {/* Amount section (revealed once resolved) */}
          {resolved && (
            <div style={{ textAlign: 'center', padding: '6px 0 2px', animation: 'slide-down 0.3s ease-out' }}>
              <div style={{ color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 12, fontWeight: 500, marginBottom: 6, letterSpacing: '0.2px' }}>Enter amount to send</div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8 }}>
                <span style={{ fontFamily: SWITZER, fontSize: 46, fontWeight: 700, letterSpacing: '-1.5px', lineHeight: 1, color: C.onSurface }}>{formatAmount(amount)}</span>
                <span style={{ fontFamily: SWITZER, fontSize: 18, fontWeight: 500, color: C.onSurfaceLow, paddingLeft: 4, borderLeft: `2px solid ${C.stroke}` }}>ETB</span>
              </div>
            </div>
          )}

          {/* Bottom: keypad + continue */}
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column' }}>
            <NumericKeypad onKey={pressKey} onDelete={deleteKey} marginTop={0} />
            <ActionButton label="Continue" active={canContinue} />
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
