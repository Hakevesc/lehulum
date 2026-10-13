'use client';
import { C } from '@/screens/_shared/tokens';

import { useState } from 'react';
import { FileText } from 'lucide-react';
import { PhoneFrame } from '@/components/PhoneFrame';
import { HeaderNav, StatusBar, SWITZER } from '@/screens/_shared';

const TABS = ['Generate PDF', 'Send Email', 'Schedule'];

export function ManageStatementEmptyScreen() {
  const [tab, setTab] = useState('Schedule');
  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        <StatusBar />
        <HeaderNav title="Manage Statement" padding="12px 16px" right={
          <button aria-label="History" style={{ width: 36, height: 36, borderRadius: 10, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText size={22} color={C.onSurface} strokeWidth={1.8} />
          </button>
        } />

        <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', flex: 1, width: '100%' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, width: '100%' }}>
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{ flex: 1, height: 38, borderRadius: 20, border: 'none', fontFamily: SWITZER, fontSize: 12, fontWeight: 500, cursor: 'pointer', letterSpacing: '0.2px', background: tab === t ? C.primary : C.disabled, color: tab === t ? C.surface : C.onSurfaceLow, boxShadow: tab === t ? '0 4px 12px rgba(254,53,61,0.25)' : 'none' }}>{t}</button>
            ))}
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', textAlign: 'center' }}>
            <div style={{ width: 80, height: 80, marginBottom: 24 }}>
              <svg viewBox="0 0 80 80" fill="none" style={{ width: '100%', height: '100%' }}>
                <rect x="18" y="14" width="44" height="54" rx="6" stroke="#D0D0D0" strokeWidth="2" />
                <line x1="26" y1="14" x2="26" y2="8" stroke="#D0D0D0" strokeWidth="2" strokeLinecap="round" />
                <line x1="54" y1="14" x2="54" y2="8" stroke="#D0D0D0" strokeWidth="2" strokeLinecap="round" />
                <line x1="18" y1="28" x2="62" y2="28" stroke="#D0D0D0" strokeWidth="2" />
                <line x1="28" y1="38" x2="52" y2="38" stroke="#D0D0D0" strokeWidth="2" strokeLinecap="round" />
                <line x1="28" y1="46" x2="48" y2="46" stroke="#D0D0D0" strokeWidth="2" strokeLinecap="round" />
                <line x1="28" y1="54" x2="42" y2="54" stroke="#D0D0D0" strokeWidth="2" strokeLinecap="round" />
                <circle cx="60" cy="20" r="10" fill={C.primary} />
                <path d="M60 16V20H64" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 18, fontWeight: 600, marginBottom: 12, letterSpacing: '0.3px' }}>No Scheduled Statements</h2>
            <p style={{ color: C.onSurfaceLow, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: 1.6, maxWidth: 280 }}>We&apos;ll let you know when there will be something to update you.</p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
