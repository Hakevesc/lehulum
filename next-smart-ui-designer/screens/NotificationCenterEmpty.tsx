'use client';
import { C } from '@/screens/_shared/tokens';

import { useState } from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';
import { HeaderNav, StatusBar, SWITZER } from '@/screens/_shared';

const TABS = ['Transactions', 'Alert', 'Rewards'];

export function NotificationCenterEmptyScreen() {
  const [tab, setTab] = useState('Transactions');
  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        <StatusBar />
        <HeaderNav title="Notifications Center" padding="16px 20px 0" />

        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', flex: 1, width: '100%' }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 32, width: '100%' }}>
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{ flex: 1, height: 40, borderRadius: 20, border: 'none', fontFamily: SWITZER, fontSize: 13, fontWeight: 500, cursor: 'pointer', background: tab === t ? C.primary : C.disabled, color: tab === t ? C.surface : C.onSurfaceLow, boxShadow: tab === t ? '0 4px 12px rgba(254,53,61,0.25)' : 'none' }}>{t}</button>
            ))}
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', textAlign: 'center' }}>
            <div style={{ width: 80, height: 80, marginBottom: 24 }}>
              <svg viewBox="0 0 80 80" fill="none" style={{ width: '100%', height: '100%' }}>
                <rect x="15" y="25" width="50" height="35" rx="8" stroke="#D0D0D0" strokeWidth="2" />
                <path d="M40 60V68" stroke="#D0D0D0" strokeWidth="2" strokeLinecap="round" />
                <path d="M32 68H48" stroke="#D0D0D0" strokeWidth="2" strokeLinecap="round" />
                <line x1="25" y1="38" x2="55" y2="38" stroke="#D0D0D0" strokeWidth="2" strokeLinecap="round" />
                <line x1="25" y1="46" x2="48" y2="46" stroke="#D0D0D0" strokeWidth="2" strokeLinecap="round" />
                <circle cx="58" cy="30" r="10" fill={C.primary} />
                <path d="M58 26V30H62" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 18, fontWeight: 600, marginBottom: 12, letterSpacing: '0.3px' }}>No Notifications</h2>
            <p style={{ color: C.onSurfaceLow, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: 1.6, maxWidth: 280 }}>We&apos;ll let you know when there will be something to update you.</p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
