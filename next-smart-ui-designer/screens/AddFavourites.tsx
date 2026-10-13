'use client';
import { C } from '@/screens/_shared/tokens';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { PhoneFrame } from '@/components/PhoneFrame';
import { POPPINS, StatusBar, SWITZER } from '@/screens/_shared';

const RED_HEADER = C.headerGradient;

function Field({ label, value, editable, onChange }: { label: string; value: string; editable?: boolean; onChange?: (v: string) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{ color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 13, fontWeight: 500, letterSpacing: '0.2px', paddingLeft: 4 }}>{label}</label>
      <input
        value={value}
        readOnly={!editable}
        onChange={(e) => onChange?.(e.target.value)}
        style={{
          width: '100%', height: 52, padding: '0 16px', borderRadius: 14,
          background: editable ? C.surface : '#F0F0F2',
          border: editable ? `1.5px solid ${C.stroke}` : '1.5px solid transparent',
          fontFamily: SWITZER, fontSize: 15, fontWeight: 500, color: editable ? C.onSurface : C.onSurfaceLow, outline: 'none'
        }}
      />
    </div>
  );
}

export function AddFavouritesScreen() {
  const [nick, setNick] = useState('Mom M-PESA');
  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        {/* Red header with heart badge */}
        <div style={{ position: 'relative', width: '100%', height: 210, flexShrink: 0, background: RED_HEADER, borderRadius: '0 0 30px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.2, backgroundImage: 'url(/assets/M-PESA-pattern.svg)', backgroundSize: 490, backgroundPosition: 'right -270px top -270px', backgroundRepeat: 'no-repeat', borderRadius: '0 0 30px 30px', mixBlendMode: 'overlay' }} />
          <StatusBar color={C.surface} background="transparent" />
          <div style={{ position: 'relative', zIndex: 5, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 20px 0' }}>
            <button aria-label="Back" style={{ position: 'absolute', left: 20, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.surface} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </button>
            <span style={{ color: C.surface, fontFamily: SWITZER, fontSize: 18, fontWeight: 300, letterSpacing: '0.3px' }}>Add to Favourites</span>
          </div>
          <div style={{ position: 'absolute', bottom: -52, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
            <div style={{ width: 104, height: 104, borderRadius: '50%', background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 32px rgba(254,53,61,0.38), 0 0 0 6px ${C.background}` }}>
              <Heart size={54} color={C.surface} strokeWidth={2.2} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '72px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1, width: '100%', gap: 24 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: SWITZER, fontSize: 17, fontWeight: 600, color: C.onSurface, letterSpacing: '0.2px' }}>Save to Favourites</div>
            <div style={{ fontFamily: SWITZER, fontSize: 13, fontWeight: 400, color: C.onSurfaceLow, marginTop: 4 }}>Confirm details and add a nickname</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Field label="Account Name" value="Abebe Zewdu" />
            <Field label="Phone Number" value="0739 322 829" />
            <Field label="Enter Nick Name" value={nick} editable onChange={setNick} />
          </div>

          <button style={{ width: '100%', height: 52, borderRadius: 14, background: C.primary, color: C.surface, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', fontFamily: POPPINS, fontSize: 15, fontWeight: 500, letterSpacing: '0.3px', marginTop: 'auto', boxShadow: '0 4px 16px rgba(254,53,61,0.25)' }}>
            <Heart size={20} color={C.surface} strokeWidth={2} fill="rgba(255,255,255,0.15)" />
            Save to Favourites
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
