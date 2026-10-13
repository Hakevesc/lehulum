'use client';
import { C } from '@/screens/_shared/tokens';

import { useState } from 'react';
import { MoreVertical, Trash2, X } from 'lucide-react';
import { PhoneFrame } from '@/components/PhoneFrame';
import { HeaderNav, POPPINS, StatusBar, SWITZER } from '@/screens/_shared';

type Fav = { id: number; name: string; details: string; logo: string };

const INITIAL: Fav[] = [
  { id: 1, name: 'London Cafe', details: 'M-PESA · 0712 338 293', logo: '/assets/banks logo/M-PESA-logo-icon.png' },
  { id: 2, name: 'Kidi Sister', details: 'Abyssinia Bank · ••••56436', logo: '/assets/banks logo/abyssinya-bank.png' },
  { id: 3, name: 'Rent Payment', details: 'Dashen Bank · ••••56436', logo: '/assets/banks logo/dashen-bank.png' },
  { id: 4, name: 'Mom M-PESA', details: 'M-PESA · 0912 338 293', logo: '/assets/banks logo/M-PESA-logo-icon.png' }
];

export function ManageFavouritesScreen() {
  const [favs, setFavs] = useState(INITIAL);
  const [deleteMode, setDeleteMode] = useState<number | null>(null);
  const [pending, setPending] = useState<Fav | null>(null);

  function onMenu(f: Fav) {
    if (deleteMode === f.id) setPending(f);
    else setDeleteMode(f.id);
  }

  function confirmRemove() {
    if (pending) setFavs((list) => list.filter((x) => x.id !== pending.id));
    setPending(null);
    setDeleteMode(null);
  }

  return (
    <PhoneFrame>
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        <StatusBar />
        <HeaderNav title="Manage Favorites" padding="12px 16px" />

        <div style={{ padding: '16px 16px 24px', display: 'flex', flexDirection: 'column', flex: 1, width: '100%' }}>
          <p style={{ color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 13, fontWeight: 400, textAlign: 'center', marginBottom: 16 }}>Drag to reorder · tap ••• to remove</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {favs.map((f) => {
              const isDelete = deleteMode === f.id;
              return (
                <div key={f.id} style={{ background: C.surface, borderRadius: 16, padding: '14px 12px 14px 10px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2.5, cursor: 'grab', flexShrink: 0 }}>
                    {Array.from({ length: 6 }).map((_, i) => <span key={i} style={{ width: 3, height: 3, background: '#C8C8CE', borderRadius: '50%' }} />)}
                  </div>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: C.surface, border: `1px solid ${C.stroke}`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
                    <img src={f.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
                    <span style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 14, fontWeight: 600, letterSpacing: '0.2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.name}</span>
                    <span style={{ color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 12, fontWeight: 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.details}</span>
                  </div>
                  <button onClick={() => onMenu(f)} style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: isDelete ? C.onPrimary : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: 'auto' }}>
                    {isDelete ? <span style={{ width: 16, height: 2.5, background: C.primary, borderRadius: 2 }} /> : <MoreVertical size={18} color={C.onSurfaceLow} strokeWidth={2} />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom sheet remove confirmation */}
        {pending && (
          <div onClick={() => { setPending(null); setDeleteMode(null); }} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 1500 }}>
            <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', background: C.surface, borderRadius: '24px 24px 0 0', padding: '12px 20px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 -4px 24px rgba(0,0,0,0.10)' }}>
              <div style={{ width: 40, height: 4, background: '#D0D0D5', borderRadius: 2, marginBottom: 20 }} />
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: C.onPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <Trash2 size={28} color={C.primary} strokeWidth={2} />
              </div>
              <h2 style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 19, fontWeight: 700, marginBottom: 8, letterSpacing: '0.2px', textAlign: 'center' }}>Remove from Favorites?</h2>
              <p style={{ color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 13.5, lineHeight: 1.6, textAlign: 'center', marginBottom: 24, maxWidth: 280 }}>&quot;<strong style={{ color: C.onSurface, fontWeight: 600 }}>{pending.name}</strong>&quot; will be removed from your shortcuts.</p>
              <div style={{ display: 'flex', gap: 12, width: '100%' }}>
                <button onClick={() => { setPending(null); setDeleteMode(null); }} style={{ flex: 1, height: 50, borderRadius: 14, border: `1.5px solid ${C.stroke}`, background: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', fontFamily: POPPINS, fontSize: 14, fontWeight: 500, color: C.onSurface }}>
                  <X size={17} color={C.onSurface} strokeWidth={2} /> Cancel
                </button>
                <button onClick={confirmRemove} style={{ flex: 1, height: 50, borderRadius: 14, border: 'none', background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', fontFamily: POPPINS, fontSize: 14, fontWeight: 500, color: C.surface, boxShadow: '0 4px 14px rgba(254,53,61,0.28)' }}>
                  <Trash2 size={17} color={C.surface} strokeWidth={2} /> Remove
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}
