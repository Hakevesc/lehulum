'use client';
import { C } from '@/screens/_shared/tokens';

import { useState } from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';
import { HeaderNav, NumericKeypad, PinBoxes, POPPINS, StatusBar, SWITZER } from '@/screens/_shared';

const MERCHANT = { name: 'Shoa Supermarket', sub: 'Retail • Code 247810', abbr: 'SH' };
const AMOUNT = '250.00';

export function MerchantEnterPinScreen() {
  const [pin, setPin] = useState('');
  const [success, setSuccess] = useState(false);
  const valid = pin.length === 4;

  return (
    <PhoneFrame>
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        <StatusBar />
        <HeaderNav title="Confirm Payment" />

        <div style={{ padding: '8px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1, gap: 18 }}>
          {/* Summary card */}
          <div style={{ background: C.surface, borderRadius: 16, padding: '18px 16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 14, borderBottom: '1px solid #F0F0F0', marginBottom: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 13, background: 'rgba(254,53,61,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: SWITZER, fontSize: 15, fontWeight: 700, color: C.primary }}>{MERCHANT.abbr}</div>
              <div>
                <div style={{ fontFamily: SWITZER, fontSize: 15, fontWeight: 600, color: C.onSurface }}>{MERCHANT.name}</div>
                <div style={{ fontFamily: SWITZER, fontSize: 12, color: C.onSurfaceLow, marginTop: 2 }}>{MERCHANT.sub}</div>
              </div>
            </div>
            <div style={{ textAlign: 'center', padding: '4px 0 12px', borderBottom: '1px solid #F0F0F0', marginBottom: 12 }}>
              <div style={{ fontFamily: SWITZER, fontSize: 12, color: C.onSurfaceLow, marginBottom: 4 }}>Amount to Pay</div>
              <div><span style={{ fontFamily: SWITZER, fontSize: 30, fontWeight: 700, color: C.primary }}>{AMOUNT}</span><span style={{ fontFamily: SWITZER, fontSize: 14, color: C.onSurfaceLow, marginLeft: 4 }}>ETB</span></div>
            </div>
            {[
              { label: 'Payment Type', value: 'Merchant Payment', free: false },
              { label: 'Service Fee', value: 'Free', free: true },
              { label: 'Total Deducted', value: `${AMOUNT} ETB`, free: false }
            ].map((r) => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
                <span style={{ fontFamily: SWITZER, fontSize: 13, color: C.onSurfaceLow }}>{r.label}</span>
                <span style={{ fontFamily: SWITZER, fontSize: 13, fontWeight: 600, color: r.free ? C.success : C.onSurface }}>{r.value}</span>
              </div>
            ))}
          </div>

          {/* PIN */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
            <span style={{ fontFamily: SWITZER, fontSize: 15, fontWeight: 500, color: C.onSurface, textAlign: 'center' }}>Enter Your M-PESA PIN</span>
            <PinBoxes filled={pin.length} active boxSize={62} gap={20} />
          </div>

          {/* Keypad */}
          <NumericKeypad
            onKey={(d) => setPin((p) => (p.length < 4 ? p + d : p))}
            onDelete={() => setPin((p) => p.slice(0, -1))}
            marginTop={0}
          />

          {/* Pay button */}
          <button
            disabled={!valid}
            onClick={valid ? () => setSuccess(true) : undefined}
            style={{ height: 52, borderRadius: 14, border: 'none', background: valid ? C.primary : C.disabled, color: valid ? C.surface : C.onSurfaceLow, fontFamily: POPPINS, fontSize: 15, fontWeight: 500, cursor: valid ? 'pointer' : 'not-allowed', boxShadow: valid ? '0 4px 16px rgba(254,53,61,0.25)' : 'none', transition: 'all 0.2s' }}
          >
            Pay Now
          </button>
        </div>

        {/* Success overlay */}
        {success && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
            <div style={{ width: 280, background: C.surface, borderRadius: 20, padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', animation: 'pop-in 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: C.onPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 36, height: 36 }}><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <h3 style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Payment Successful!</h3>
              <p style={{ color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 13, fontWeight: 400, lineHeight: 1.5, marginBottom: 20 }}>{AMOUNT} ETB paid to {MERCHANT.name}.</p>
              <button onClick={() => setSuccess(false)} style={{ width: '100%', height: 44, borderRadius: 12, background: C.primary, color: C.surface, border: 'none', fontFamily: POPPINS, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>View Receipt</button>
            </div>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}
