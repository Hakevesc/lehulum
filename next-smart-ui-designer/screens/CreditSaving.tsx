'use client';
import { C } from '@/screens/_shared/tokens';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowDownLeft, ArrowLeft, ArrowRight, ArrowRightLeft, ArrowUpRight, Bell, Eye, EyeOff } from 'lucide-react';
import { BannerSlider } from '@/components/BannerSlider';
import { PhoneFrame } from '@/components/PhoneFrame';

const POCKETS = [
  { slug: 'eepco', initials: 'EP', name: 'EEPCO Electric', category: 'Utility Bill Saving', percent: 40, saved: '1,200', total: '3,000', due: 'Due Jul 2026', track: C.successContainer, stroke: '#2FC56D', strokeWidth: 2.5, radius: 23, dasharray: '144.51', dashoffset: '86.71', linecap: 'round', fill: 'linear-gradient(90deg,#2FC56D,#239150)', logoBg: '#FFF3E0', logoColor: '#E65100' },
  { slug: 'ethio', initials: 'ET', name: 'Ethio Telecom', category: 'Package Saving', percent: 68, saved: '680', total: '1,000', due: 'Due Aug 2026', track: '#D0F5DA', stroke: '#239150', strokeWidth: 4, radius: 22, dasharray: '138.23', dashoffset: '44.23', linecap: 'butt', fill: 'linear-gradient(90deg,#27a85d,#1a7040)', logoBg: '#E3F2FD', logoColor: '#1565C0' },
  { slug: 'boa', initials: 'BA', name: 'BOA Education', category: 'Education Fund', percent: 25, saved: '5,000', total: '20,000', due: 'Due Dec 2026', track: '#F0FFF4', stroke: 'url(#grad-boa)', strokeWidth: 5, radius: 21, dasharray: '131.95', dashoffset: '98.96', linecap: 'round', fill: 'linear-gradient(90deg,#a8e6c0,#239150)', logoBg: '#F3E5F5', logoColor: '#6A1B9A' },
  { slug: 'cbe', initials: 'CB', name: 'CBE Home Fund', category: 'Home Purchase Goal', percent: 85, saved: '85,000', total: '100k', due: 'Due Sep 2026', track: '#D0F5DA', stroke: C.success, strokeWidth: 3, radius: 23, dasharray: '144.51', dashoffset: '21.68', linecap: 'round', fill: `linear-gradient(90deg,${C.success},#239150)`, logoBg: '#E8F5E9', logoColor: '#1B5E20' }
];

function StatusIcons() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
        <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9z" fill={C.onSurface} />
        <path d="M5 13l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" fill={C.onSurface} />
        <path d="M9 17l2 2c1.1-1.1 2.9-1.1 4 0l2-2c-2.21-2.21-5.79-2.21-8 0z" fill={C.onSurface} />
      </svg>
      <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
        <rect x="2" y="6" width="4" height="12" rx="1" fill={C.onSurface} />
        <rect x="8" y="4" width="4" height="14" rx="1" fill={C.onSurface} />
        <rect x="14" y="2" width="4" height="16" rx="1" fill={C.onSurface} />
        <rect x="20" y="0" width="4" height="18" rx="1" fill={C.onSurface} opacity="0.3" />
      </svg>
      <svg viewBox="0 0 28 14" fill="none" width="18" height="18">
        <rect x="0" y="1" width="22" height="12" rx="2.5" stroke={C.onSurface} strokeWidth="1.5" />
        <rect x="2" y="3" width="16" height="8" rx="1" fill={C.onSurface} />
        <rect x="24" y="4" width="2" height="6" rx="1" fill={C.onSurface} />
      </svg>
    </div>
  );
}

function StatusBar() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px 8px', background: C.background, flexShrink: 0 }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: C.onSurface, fontFamily: "'Switzer', sans-serif" }}>10:00</span>
      <StatusIcons />
    </div>
  );
}

function HeaderNav({ onNotify }: { onNotify: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 16px 12px', background: C.background, flexShrink: 0 }}>
      <Link href="/presentation?screen=lehulum-home" style={{ width: 36, height: 36, borderRadius: '50%', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ArrowLeft size={22} strokeWidth={1.8} />
      </Link>
      <span style={{ color: C.onSurface, fontFamily: "'Switzer', sans-serif", fontSize: 17, fontWeight: 500, letterSpacing: '0.3px', flex: 1, textAlign: 'center' }}>Credit &amp; Saving</span>
      <button onClick={onNotify} aria-label="Notifications" style={{ width: 36, height: 36, borderRadius: '50%', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Bell size={22} strokeWidth={1.8} />
      </button>
    </div>
  );
}

function PocketRing({ pocket }: { pocket: (typeof POCKETS)[number] }) {
  return (
    <div style={{ position: 'relative', width: 54, height: 54, flexShrink: 0 }}>
      <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
        {pocket.slug === 'boa' && (
          <defs>
            <linearGradient id="grad-boa" x1="54" y1="0" x2="0" y2="54" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2FC56D" />
              <stop offset="100%" stopColor="#1a7040" />
            </linearGradient>
          </defs>
        )}
        <circle cx="27" cy="27" r={pocket.radius} stroke={pocket.track} strokeWidth={pocket.strokeWidth} />
        <circle cx="27" cy="27" r={pocket.radius} stroke={pocket.stroke} strokeWidth={pocket.strokeWidth} strokeLinecap={pocket.linecap as 'round' | 'butt'} strokeDasharray={pocket.dasharray} strokeDashoffset={pocket.dashoffset} transform="rotate(-90 27 27)" />
      </svg>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Switzer', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.3px', background: pocket.logoBg, color: pocket.logoColor }}>
        {pocket.initials}
      </div>
    </div>
  );
}

export function CreditSavingScreen() {
  const [balanceHidden, setBalanceHidden] = useState(false);
  const [toast, setToast] = useState('');
  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

  function showToast(message: string) {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(''), 2500);
  }

  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        <StatusBar />
        <HeaderNav onNotify={() => showToast('No new notifications')} />
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ width: '100%', borderRadius: 24, background: 'linear-gradient(180deg, #A41016 0%, #ED1C24 100%)', padding: 16, position: 'relative', overflow: 'hidden', boxShadow: '0 4px 20px rgba(164,16,22,0.25)', flexShrink: 0 }}>
            <div style={{ position: 'absolute', top: -50, right: -50, width: 250, height: 250, background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', bottom: -80, right: -30, width: 200, height: 200, background: 'rgba(0,0,0,0.10)', borderRadius: '50%' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', zIndex: 1, position: 'relative' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                  <span style={{ color: C.surface, fontFamily: "'Switzer', sans-serif", fontSize: 12, fontWeight: 300, lineHeight: '150%' }}>Total Savings (Birr)</span>
                </div>
                <div style={{ color: C.surface, fontFamily: "'Switzer', sans-serif", fontSize: 30, fontWeight: 400, lineHeight: '150%' }}>
                  {balanceHidden ? '* * * * * * * *' : '24,800.00'}
                </div>
              </div>
              <button onClick={() => setBalanceHidden((v) => !v)} aria-label="Toggle balance" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, opacity: 0.85, zIndex: 1, position: 'relative' }}>
                {balanceHidden ? <EyeOff size={20} strokeWidth={1.5} color={C.surface} /> : <Eye size={20} strokeWidth={1.5} color={C.surface} />}
              </button>
            </div>
            <div style={{ display: 'flex', zIndex: 1, position: 'relative', marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.18)' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: 'rgba(255,255,255,0.75)', fontFamily: "'Switzer', sans-serif", fontSize: 11, fontWeight: 300, marginBottom: 2 }}>Individual Saving</span>
                <span style={{ color: C.surface, fontFamily: "'Switzer', sans-serif", fontSize: 16, fontWeight: 400, letterSpacing: '0.5px' }}>{balanceHidden ? '* * * *' : '18,200.00'}</span>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderLeft: '1px solid rgba(255,255,255,0.18)', paddingLeft: 12 }}>
                <span style={{ color: 'rgba(255,255,255,0.75)', fontFamily: "'Switzer', sans-serif", fontSize: 11, fontWeight: 300, marginBottom: 2 }}>Group Saving</span>
                <span style={{ color: C.surface, fontFamily: "'Switzer', sans-serif", fontSize: 16, fontWeight: 400, letterSpacing: '0.5px' }}>{balanceHidden ? '* * * *' : '6,600.00'}</span>
              </div>
            </div>
          </div>

          <BannerSlider />

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => showToast('Deposit feature coming soon')} style={{ flex: 1, height: 50, borderRadius: 66, background: C.primary, border: 'none', color: C.surface, fontFamily: "'Switzer', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, boxShadow: '0 4px 16px rgba(254,53,61,0.28)' }}>
              <ArrowDownLeft size={16} strokeWidth={2} /> Deposit
            </button>
            <button onClick={() => showToast('Reallocate feature coming soon')} style={{ flex: 1, height: 50, borderRadius: 66, background: C.onSurface, border: 'none', color: C.surface, fontFamily: "'Switzer', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: '0.3px', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
              <ArrowRightLeft size={16} strokeWidth={2} /> Reallocate
            </button>
            <button onClick={() => showToast('Withdraw feature coming soon')} aria-label="Withdraw" style={{ width: 50, height: 50, borderRadius: '50%', background: C.surface, border: `1.5px solid ${C.stroke}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <ArrowUpRight size={20} strokeWidth={2} color={C.onSurface} />
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Switzer', sans-serif", fontSize: 15, fontWeight: 600, color: C.onSurface }}>Active Pockets</span>
            <span onClick={() => showToast('See All coming soon')} style={{ fontFamily: "'Switzer', sans-serif", fontSize: 13, color: C.primary, cursor: 'pointer', fontWeight: 500 }}>See All</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {POCKETS.map((pocket) => (
              <div key={pocket.slug} style={{ background: C.surface, borderRadius: 16, padding: 14, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
                <PocketRing pocket={pocket} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Switzer', sans-serif", fontSize: 13, fontWeight: 600, color: C.onSurface, marginBottom: 2 }}>{pocket.name}</div>
                  <div style={{ fontFamily: "'Switzer', sans-serif", fontSize: 11, color: C.onSurfaceLow }}>{pocket.category}</div>
                  <div style={{ width: '100%', height: 3, background: '#F0F0F2', borderRadius: 2, marginTop: 8 }}>
                    <div style={{ height: '100%', borderRadius: 2, width: `${pocket.percent}%`, background: pocket.fill }} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1, flexShrink: 0 }}>
                  <span style={{ fontFamily: "'Switzer', sans-serif", fontSize: 15, fontWeight: 700, color: '#239150' }}>{pocket.percent}%</span>
                  <span style={{ fontFamily: "'Switzer', sans-serif", fontSize: 10, color: C.onSurfaceLow, whiteSpace: 'nowrap' }}>{pocket.saved} / {pocket.total}</span>
                  <span style={{ fontFamily: "'Switzer', sans-serif", fontSize: 10, color: C.onSurfaceLow, whiteSpace: 'nowrap' }}>{pocket.due}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '12px 16px 20px', background: C.background, borderTop: `1px solid ${C.stroke}`, flexShrink: 0 }}>
          <button onClick={() => showToast('New Saving Pocket coming soon')} style={{ width: '100%', height: 55, borderRadius: 62, background: C.primary, border: 'none', color: C.surface, fontFamily: "'Switzer', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 6px 24px rgba(254,53,61,0.30)' }}>
            New Saving Pocket <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
      {toast && (
        <div style={{ position: 'fixed', bottom: 100, left: '50%', transform: 'translateX(-50%)', background: C.onSurface, color: C.surface, padding: '12px 24px', borderRadius: 12, fontFamily: "'Switzer', sans-serif", fontSize: 13, fontWeight: 500, zIndex: 1000, boxShadow: '0 4px 16px rgba(0,0,0,0.2)', whiteSpace: 'nowrap' }}>
          {toast}
        </div>
      )}
    </PhoneFrame>
  );
}
