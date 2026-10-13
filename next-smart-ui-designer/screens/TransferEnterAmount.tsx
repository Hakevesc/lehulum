'use client';
import { C } from '@/screens/_shared/tokens';

import { useEffect, useRef, useState } from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';
import { ActionButton, HeaderNav, NumericKeypad, StatusBar, SWITZER } from '@/screens/_shared';

const BANK = { name: 'Awash Bank', logo: '/assets/banks logo/awass-bank.png' };
const SAMPLE_NAMES = ['Kidist Birhanu', 'Abel Tesfaye', 'Marta Solomon', 'Yonas Girma', 'Hanna Bekele', 'Samuel Desta'];

export function TransferEnterAmountScreen() {
  const [account, setAccount] = useState('');
  const [resolved, setResolved] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [name, setName] = useState('Recipient name');
  const [masked, setMasked] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
          setName(SAMPLE_NAMES[Math.floor(Math.random() * SAMPLE_NAMES.length)]);
          setMasked('****' + account.slice(-4));
        }, 1200);
      }, 600);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [account]);

  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        <StatusBar />
        <HeaderNav title="Transfer to Bank" />

        <div style={{ padding: '16px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1, width: '100%', gap: 14 }}>
          {/* Recipient card */}
          <div style={{
            background: C.surface, borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: `1.5px solid ${resolved ? C.success : C.stroke}`, transition: 'border-color 0.25s'
          }}>
            <div style={{
              width: 46, height: 46, borderRadius: '50%', background: resolved ? C.successContainer : C.stroke,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.25s'
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke={resolved ? C.success : C.onSurfaceLow} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
              <span style={{ color: resolved ? C.onSurface : C.onSurfaceLow, fontFamily: SWITZER, fontSize: 15, fontWeight: 600, letterSpacing: '0.2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', transition: 'color 0.25s' }}>{name}</span>
              <span style={{ color: resolved ? C.success : C.onSurfaceLow, fontFamily: SWITZER, fontSize: 12, fontWeight: resolved ? 600 : 400, display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {resolved && (
                  <svg viewBox="0 0 24 24" fill="none" stroke={C.success} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14, flexShrink: 0 }}><polyline points="20 6 9 17 4 12" /></svg>
                )}
                <span>{resolved ? `${BANK.name} • ${masked}` : BANK.name}</span>
              </span>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: 10, overflow: 'hidden', background: C.background, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <img src={BANK.logo} alt={BANK.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }} />
            </div>
          </div>

          {/* Account number input */}
          <div style={{ height: 52, background: C.surface, borderRadius: 14, padding: '0 16px', display: 'flex', alignItems: 'center', border: `1.5px solid ${C.stroke}`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
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

          {/* Bottom: keypad + continue */}
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column' }}>
            <NumericKeypad
              onKey={(d) => setAccount((a) => (a.length < 15 ? a + d : a))}
              onDelete={() => setAccount((a) => a.slice(0, -1))}
              marginTop={0}
            />
            <ActionButton label="Continue" active={resolved} />
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
