'use client';
import { C } from '@/screens/_shared/tokens';

import { useState } from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';
import { NumericKeypad, PinBoxes, POPPINS, StatusBar, SWITZER, HeaderNav } from '@/screens/_shared';

const AMOUNT = '950.00';

export function TransferWalletPinScreen() {
  const [pin, setPin] = useState('');
  const [success, setSuccess] = useState(false);
  const valid = pin.length === 4;

  return (
    <PhoneFrame>
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        <StatusBar />
        <HeaderNav title="Transfer to Wallet" />

        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', flex: 1, width: '100%', gap: 20 }}>
          {/* Receiver confirmation card */}
          <div style={{ background: C.surface, borderRadius: 16, padding: '18px 16px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: C.stroke, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: SWITZER, fontSize: 16, fontWeight: 600, color: C.onSurface }}>HC</div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
              <span style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 16, fontWeight: 600, letterSpacing: '0.2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Henok Chala</span>
              <span style={{ color: C.primary, fontFamily: SWITZER, fontSize: 20, fontWeight: 700, letterSpacing: '0.2px' }}>-{AMOUNT} ETB</span>
              <span style={{ color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 12, fontWeight: 400 }}>M-PESA • +251 9** *** 326</span>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: 10, overflow: 'hidden', background: C.background, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <img src="/assets/banks logo/M-PESA-logo-icon.png" alt="M-PESA" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
          </div>

          {/* PIN section */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, marginTop: 8 }}>
            <span style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 15, fontWeight: 500, letterSpacing: '0.3px', textAlign: 'center' }}>Enter Your M-PESA PIN</span>
            <PinBoxes filled={pin.length} active gap={20} />
          </div>

          {/* Keypad */}
          <NumericKeypad
            onKey={(d) => setPin((p) => (p.length < 4 ? p + d : p))}
            onDelete={() => setPin((p) => p.slice(0, -1))}
            marginTop={0}
          />

          {/* Transfer button */}
          <button
            disabled={!valid}
            onClick={valid ? () => setSuccess(true) : undefined}
            style={{
              height: 52, borderRadius: 14, border: 'none', background: valid ? C.primary : C.disabled,
              color: valid ? C.surface : C.onSurfaceLow, fontFamily: POPPINS, fontSize: 15, fontWeight: 500,
              cursor: valid ? 'pointer' : 'not-allowed', boxShadow: valid ? '0 4px 16px rgba(254,53,61,0.25)' : 'none', transition: 'all 0.2s'
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
              <p style={{ color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 13, fontWeight: 400, lineHeight: 1.5, marginBottom: 20 }}>-{AMOUNT} ETB sent to Henok Chala</p>
              <button onClick={() => setSuccess(false)} style={{ width: '100%', height: 44, borderRadius: 12, background: C.primary, color: C.surface, border: 'none', fontFamily: POPPINS, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>Done</button>
            </div>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}
