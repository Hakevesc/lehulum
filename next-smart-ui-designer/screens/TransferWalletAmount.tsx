'use client';
import { C } from '@/screens/_shared/tokens';

import { useState } from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';
import { formatAmount, HeaderNav, NumericKeypad, POPPINS, StatusBar, SWITZER } from '@/screens/_shared';

const AVAILABLE_BALANCE = 800;
const FEE = 5;

export function TransferWalletAmountScreen() {
  const [amount, setAmount] = useState(0);

  const insufficient = amount > AVAILABLE_BALANCE;
  const valid = amount > 0 && amount <= AVAILABLE_BALANCE;

  function pressKey(key: string) {
    setAmount((cur) => {
      const s = cur.toString();
      const di = s.indexOf('.');
      if (di !== -1 && s.length - di >= 3) return cur;
      if (cur === 0 && key === '0') return cur;
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
        <HeaderNav title="Transfer to Wallet" />

        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', flex: 1, width: '100%', gap: 20 }}>
          {/* Receiver card */}
          <div style={{ background: C.surface, borderRadius: 16, padding: 16, display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: C.stroke, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: SWITZER, fontSize: 16, fontWeight: 600, color: C.onSurface }}>HC</div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 15, fontWeight: 600, letterSpacing: '0.2px' }}>Henok Chala</span>
              <div style={{ color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 13, fontWeight: 400, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>M-PESA</span><span>•</span><span>+251 9** *** 326</span>
              </div>
            </div>
            <div style={{ width: 32, height: 32, borderRadius: 8, overflow: 'hidden', background: C.background, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/assets/banks logo/M-PESA-logo-icon.png" alt="M-PESA" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
          </div>

          {/* Amount */}
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontFamily: SWITZER, fontSize: 56, fontWeight: 700, letterSpacing: '-2px', lineHeight: 1, color: insufficient ? C.primary : C.onSurface, transition: 'color 0.2s' }}>{formatAmount(amount)}</span>
              <span style={{ fontFamily: SWITZER, fontSize: 20, fontWeight: 500, color: C.onSurfaceLow, paddingLeft: 4, borderLeft: `2px solid ${C.stroke}` }}>ETB</span>
            </div>

            {/* Balance info */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: C.onSurface, fontFamily: SWITZER, fontSize: 13 }}>
                <span style={{ color: C.onSurfaceLow }}>Main:</span><span style={{ fontWeight: 600 }}>12,580.00 Birr</span>
              </div>
              <div style={{ width: 1, height: 14, background: C.stroke }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: C.onSurface, fontFamily: SWITZER, fontSize: 13 }}>
                <span style={{ color: C.onSurfaceLow }}>Available:</span><span style={{ fontWeight: 600 }}>800.00 Birr</span>
              </div>
            </div>

            {/* Insufficient warning */}
            {insufficient && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16, flexShrink: 0 }}><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                <span style={{ color: C.primary, fontFamily: SWITZER, fontSize: 13, fontWeight: 500 }}>Insufficient Balance: 800.00 Birr</span>
              </div>
            )}

            {/* Fee display */}
            {valid && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 8 }}>
                <span style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 13, fontWeight: 400 }}>Fee {FEE.toFixed(2)} ETB</span>
                <svg viewBox="0 0 24 24" fill="none" stroke={C.onSurfaceLow} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
              </div>
            )}
          </div>

          {/* Keypad */}
          <NumericKeypad onKey={pressKey} onDelete={deleteKey} marginTop={0} />

          {/* Transfer button */}
          <button
            disabled={!valid}
            style={{
              height: 52, borderRadius: 14, border: 'none', background: valid ? C.primary : C.disabled,
              color: valid ? C.surface : C.onSurfaceLow, fontFamily: POPPINS, fontSize: 15, fontWeight: 500,
              cursor: valid ? 'pointer' : 'not-allowed', boxShadow: valid ? '0 4px 16px rgba(254,53,61,0.25)' : 'none', transition: 'all 0.2s'
            }}
          >
            Transfer
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
