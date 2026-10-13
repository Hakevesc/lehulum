'use client';
import { C } from '@/screens/_shared/tokens';

import { useState } from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';
import { formatAmount, NumericKeypad, PinBoxes, POPPINS, StatusBar, SWITZER } from '@/screens/_shared';

const AVAILABLE_BALANCE = 800;

export function TransferEnterPinScreen() {
  const [mode, setMode] = useState<'amount' | 'pin'>('amount');
  const [amount, setAmount] = useState(0);
  const [pin, setPin] = useState('');
  const [success, setSuccess] = useState(false);

  const insufficient = amount > AVAILABLE_BALANCE;
  const valid = amount > 0 && amount <= AVAILABLE_BALANCE && pin.length === 4;

  function pressKey(key: string) {
    if (mode === 'amount') {
      setAmount((cur) => {
        const s = cur.toString();
        const di = s.indexOf('.');
        if (di !== -1 && s.length - di >= 3) return cur;
        if (cur === 0 && key === '0') return cur;
        return cur === 0 ? parseFloat(key) : parseFloat(s + key);
      });
    } else {
      setPin((p) => (p.length < 4 ? p + key : p));
    }
  }

  function deleteKey() {
    if (mode === 'pin' && pin.length > 0) {
      setPin((p) => p.slice(0, -1));
      return;
    }
    if (mode === 'pin' && pin.length === 0) {
      setMode('amount');
      return;
    }
    setAmount((cur) => {
      const s = cur.toString();
      return s.length === 1 ? 0 : parseFloat(s.slice(0, -1));
    });
  }

  function goToPin() {
    if (amount > 0) setMode('pin');
  }

  return (
    <PhoneFrame>
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        {/* Red gradient header */}
        <div style={{ position: 'relative', background: `linear-gradient(155deg, #9E0E14 0%, #D81E26 45%, ${C.primary} 100%)`, borderRadius: '0 0 28px 28px', paddingBottom: 46, flexShrink: 0 }}>
          <StatusBar color={C.surface} background="transparent" />
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px 4px' }}>
            <button aria-label="Back" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke={C.surface} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </button>
            <span style={{ color: C.surface, fontFamily: SWITZER, fontSize: 17, fontWeight: 600, letterSpacing: '0.3px', flex: 1, textAlign: 'center' }}>Transfer to Bank</span>
            <div style={{ width: 36 }} />
          </div>

          {/* Amount entry */}
          <div onClick={() => setMode('amount')} style={{ textAlign: 'center', padding: '30px 0 16px', cursor: 'pointer', opacity: mode === 'amount' ? 1 : 0.6, transition: 'opacity 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8 }}>
              <span style={{ fontFamily: SWITZER, fontSize: 54, fontWeight: 700, letterSpacing: '-2px', lineHeight: 1, color: C.surface }}>{formatAmount(amount)}</span>
              {mode === 'amount' && <span style={{ width: 3, height: 42, background: C.surface, borderRadius: 2, alignSelf: 'center', animation: 'caret-blink 1s step-end infinite' }} />}
              <span style={{ fontFamily: SWITZER, fontSize: 20, fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>ETB</span>
            </div>
          </div>

          {/* Balance pill straddling the boundary */}
          <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translate(-50%, 50%)', display: 'flex', alignItems: 'center', gap: 14, background: C.surface, borderRadius: 20, padding: '9px 18px', boxShadow: '0 6px 18px rgba(0,0,0,0.10)', whiteSpace: 'nowrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: C.onSurface, fontFamily: SWITZER, fontSize: 12.5 }}>
              <span style={{ color: C.onSurfaceLow }}>Main:</span>
              <span style={{ fontWeight: 600 }}>12,580.00 Birr</span>
            </div>
            <div style={{ width: 1, height: 14, background: C.stroke }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: C.onSurface, fontFamily: SWITZER, fontSize: 12.5 }}>
              <span style={{ color: C.onSurfaceLow }}>Available:</span>
              <span style={{ fontWeight: 600 }}>800.00 Birr</span>
            </div>
          </div>
        </div>

        {/* Lower content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '36px 20px 18px' }}>
          {/* PIN section */}
          <div onClick={goToPin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, cursor: 'pointer', opacity: mode === 'pin' ? 1 : 0.55, transition: 'opacity 0.2s', marginTop: 12 }}>
            <span style={{ color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 14, fontWeight: 500, letterSpacing: '0.3px', textAlign: 'center' }}>Enter Your M-PESA PIN</span>
            <PinBoxes filled={pin.length} active={mode === 'pin'} />
          </div>

          {/* Validation area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            {insufficient && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15, flexShrink: 0 }}><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                <span style={{ color: C.primary, fontFamily: SWITZER, fontSize: 12, fontWeight: 500 }}>Insufficient Balance: 800.00 Birr</span>
              </div>
            )}
          </div>

          {/* Keypad */}
          <NumericKeypad onKey={pressKey} onDelete={deleteKey} keyHeight={48} padding="16px" marginTop={0} />

          {/* Transfer button */}
          <button
            disabled={!valid}
            onClick={valid ? () => setSuccess(true) : undefined}
            style={{
              height: 50, borderRadius: 14, border: 'none',
              background: valid ? C.primary : C.disabled, color: valid ? C.surface : C.onSurfaceLow,
              fontFamily: POPPINS, fontSize: 15, fontWeight: 500, cursor: valid ? 'pointer' : 'not-allowed',
              boxShadow: valid ? '0 4px 16px rgba(254,53,61,0.25)' : 'none', marginTop: 14, transition: 'all 0.2s'
            }}
          >
            Transfer
          </button>
        </div>

        {/* Success overlay */}
        {success && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
            <div style={{ width: 280, background: C.surface, borderRadius: 20, padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', animation: 'pop-in 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: C.onPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 36, height: 36 }}><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <h3 style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Transfer Successful!</h3>
              <p style={{ color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 13, fontWeight: 400, lineHeight: 1.5, marginBottom: 20 }}>-{formatAmount(amount)} ETB sent to recipient</p>
              <button onClick={() => setSuccess(false)} style={{ width: '100%', height: 44, borderRadius: 12, background: C.primary, color: C.surface, border: 'none', fontFamily: POPPINS, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>Done</button>
            </div>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}
