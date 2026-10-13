'use client';
import { C } from '@/screens/_shared/tokens';

import { Lightbulb, Plus } from 'lucide-react';
import { PhoneFrame } from '@/components/PhoneFrame';
import { HeaderNav, POPPINS, StatusBar, SWITZER } from '@/screens/_shared';

export function ManageFavouriteEmptyScreen() {
  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        <StatusBar />
        <HeaderNav title="Manage Favorites" padding="16px 20px 0" />

        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, width: '100%' }}>
          {/* Empty state */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px 20px', textAlign: 'center' }}>
            <div style={{ position: 'relative', width: 160, height: 160, marginBottom: 28 }}>
              <div style={{ width: 160, height: 160, borderRadius: '50%', background: `linear-gradient(135deg, ${C.onPrimary} 0%, #FFE5E6 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 72 72" fill="none" style={{ width: 100, height: 100 }}>
                  <path d="M36 57C36 57 12 43.2 12 26.4C12 19.56 17.16 14 23.52 14C27.36 14 30.72 16.08 33.12 19.32L36 22.8L38.88 19.32C41.28 16.08 44.64 14 48.48 14C54.84 14 60 19.56 60 26.4C60 43.2 36 57 36 57Z" stroke={C.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#FFE0E1" />
                </svg>
              </div>
              <div style={{ position: 'absolute', top: 22, left: '50%', transform: 'translateX(-50%)', width: 28, height: 28, borderRadius: '50%', background: C.primary, border: `2.5px solid ${C.onPrimary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(254,53,61,0.35)' }}>
                <Plus size={14} color={C.surface} strokeWidth={2.8} />
              </div>
            </div>
            <h2 style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 20, fontWeight: 700, marginBottom: 10, letterSpacing: '0.2px' }}>No Favorites Yet</h2>
            <p style={{ color: C.onSurfaceLow, fontFamily: 'Inter, sans-serif', fontSize: 13.5, fontWeight: 400, lineHeight: 1.65, maxWidth: 260 }}>Save your frequent contacts and payees here for quick, one-tap transfers.</p>
          </div>

          {/* Tip card */}
          <div style={{ background: C.surface, borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: 20 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: C.onPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Lightbulb size={18} color={C.primary} strokeWidth={2} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 13, fontWeight: 600, marginBottom: 3 }}>How to add a favorite</p>
              <p style={{ color: C.onSurfaceLow, fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, lineHeight: 1.55 }}>After sending money, tap the heart icon on any contact to save them as a favorite.</p>
            </div>
          </div>

          {/* CTA */}
          <button style={{ width: '100%', height: 54, borderRadius: 16, border: 'none', background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', fontFamily: POPPINS, fontSize: 15, fontWeight: 600, color: C.surface, letterSpacing: '0.2px', boxShadow: '0 6px 20px rgba(254,53,61,0.28)' }}>
            <Plus size={20} color={C.surface} strokeWidth={2.2} /> Add New Favourite
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
