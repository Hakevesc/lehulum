'use client';
import { C } from '@/screens/_shared/tokens';

import { useState } from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';
import { formatAmount, HeaderNav, NumericKeypad, POPPINS, StatusBar, SWITZER } from '@/screens/_shared';

const AVAILABLE_BALANCE = 800;

export function MerchantEnterAmountScreen() {
  const [amount, setAmount] = useState(0);
  const insufficient = amount > AVAILABLE_BALANCE;
  const valid = amount > 0 && amount <= AVAILABLE_BALANCE;

  function pressKey(key: string) {
    setAmount((cur) => {
      const s = cur.toString();
      const di = s.indexOf('.');
      if (di !== -1 && s.length - di >= 3) return cur;
      return cur === 0 ? parseFloat(key) : parseFloat(s + key);
    });
  }

  function deleteKey() {
    setAmount((cur) => {
      const s = cur.toString();
      return s.length === 1 ? 0 : parseFloat(s.slice(0, -1));
    });
  }

  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        <StatusBar />
        <HeaderNav title="Merchant Payment" />

        <div style={{ padding: '8px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1, gap: 16 }}>
          {/* Merchant card */}
          <div style={{ background: C.surface, borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(254,53,61,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: SWITZER, fontSize: 16, fontWeight: 700, color: C.primary }}>SH</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: SWITZER, fontSize: 15, fontWeight: 600, color: C.onSurface }}>Shoa Supermarket</div>
              <div style={{ fontFamily: SWITZER, fontSize: 12, color: C.onSurfaceLow, marginTop: 3 }}>Retail • Code 247810</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 6, padding: '3px 8px', borderRadius: 6, background: 'rgba(31,200,59,0.08)', color: C.success, fontFamily: SWITZER, fontSize: 11, fontWeight: 600 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke={C.success} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 11, height: 11 }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                Verified Merchant
              </div>
            </div>
          </div>

          {/* Amount */}
          <div style={{ textAlign: 'center', padding: '4px 0' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontFamily: SWITZER, fontSize: 54, fontWeight: 700, letterSpacing: '-2px', lineHeight: 1, color: insufficient ? C.primary : C.onSurface, transition: 'color 0.2s' }}>{formatAmount(amount)}</span>
              <span style={{ fontFamily: SWITZER, fontSize: 20, fontWeight: 500, color: C.onSurfaceLow, paddingLeft: 4, borderLeft: `2px solid ${C.stroke}` }}>ETB</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: SWITZER, fontSize: 13 }}><span style={{ color: C.onSurfaceLow }}>Main:</span><span style={{ fontWeight: 600, color: C.onSurface }}>12,580.00</span></div>
              <div style={{ width: 1, height: 14, background: C.stroke }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: SWITZER, fontSize: 13 }}><span style={{ color: C.onSurfaceLow }}>Available:</span><span style={{ fontWeight: 600, color: C.onSurface }}>800.00</span></div>
            </div>
            {insufficient && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12.01" y2="8" /><line x1="12" y1="12" x2="12" y2="16" /></svg>
                <span style={{ color: C.primary, fontFamily: SWITZER, fontSize: 13, fontWeight: 500 }}>Insufficient Balance: 800.00 Birr</span>
              </div>
            )}
            {valid && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 8 }}>
                <span style={{ color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 13 }}>Merchant payment fee: Free</span>
              </div>
            )}
          </div>

          {/* Keypad */}
          <NumericKeypad onKey={pressKey} onDelete={deleteKey} marginTop={0} />

          {/* Pay button */}
          <button
            disabled={!valid}
            style={{ height: 52, borderRadius: 14, border: 'none', background: valid ? C.primary : C.disabled, color: valid ? C.surface : C.onSurfaceLow, fontFamily: POPPINS, fontSize: 15, fontWeight: 500, cursor: valid ? 'pointer' : 'not-allowed', boxShadow: valid ? '0 4px 16px rgba(254,53,61,0.25)' : 'none', transition: 'all 0.2s' }}
          >
            Pay Merchant
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
