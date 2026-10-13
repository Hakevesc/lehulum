'use client';
import { C } from '@/screens/_shared/tokens';

import { useState, useEffect } from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';
import { BannerSlider } from '@/components/BannerSlider';

const ACTIONS = [
  { label: 'Merchant\nPayment', src: '/assets/Merchant Payemnt.svg' },
  { label: 'Bill\nPayment', src: '/assets/Bill Payment.svg' },
  { label: 'Credit &\nSaving', src: '/assets/Credit Saving.svg' },
  { label: 'Transfer\nMoney', src: '/assets/Transfer Money.svg' },
  { label: 'Airtime/\nPackage', src: '/assets/Airtime Package.svg' },
  { label: 'More\nServices', src: '/assets/More Services.svg' }
];

const BANNER_SLIDES = [
  { img: '/assets/banner-ads-1.png', title: 'Do it all with M-PESA', subtitle: 'Make payments quickly and conveniently.' },
  { img: '/assets/banner-ads-2.png', title: 'Send Money Anywhere', subtitle: 'Transfer to any M-PESA user instantly.' },
  { img: '/assets/banner-ads-3.png', title: 'Pay Bills Easily', subtitle: 'Settle your utilities and services in seconds.' }
];

const TRANSACTIONS = [
  { name: 'Aster Mequanent', type: 'Bank', amount: '+220.00', positive: true, logo: '/assets/banks logo/cbe-logo.png', date: 'Today' },
  { name: 'Henok Chala', type: 'Airtime', amount: '-1,020.00', positive: false, logo: '/assets/banks logo/M-PESA-logo-icon.png', date: 'Today' },
  { name: 'Henok Chala', type: 'Airtime', amount: '-50.00', positive: false, logo: '/assets/banks logo/M-PESA-logo-icon.png', date: 'Today' }
];

export function AuthSignupHomeScreen() {
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [showPopup, setShowPopup] = useState<'pin-setup' | 'fingerprint' | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setQrOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  // Show PIN setup popup on mount
  useEffect(() => {
    const timer = setTimeout(() => setShowPopup('pin-setup'), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PhoneFrame
      header={
        <>
          {/* Status Bar */}
          <div style={{ height: 34, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 24px 4px', background: C.background, color: C.onSurface, fontSize: 12, fontWeight: 700 }}>
            <span>10:00</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9z" fill={C.onSurface}/><path d="M5 13l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" fill={C.onSurface}/><path d="M9 17l2 2c1.1-1.1 2.9-1.1 4 0l2-2c-2.21-2.21-5.79-2.21-8 0z" fill={C.onSurface}/></svg>
              <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><rect x="2" y="6" width="4" height="12" rx="1" fill={C.onSurface}/><rect x="8" y="4" width="4" height="14" rx="1" fill={C.onSurface}/><rect x="14" y="2" width="4" height="16" rx="1" fill={C.onSurface}/><rect x="20" y="0" width="4" height="18" rx="1" fill={C.onSurface} opacity="0.3"/></svg>
              <svg viewBox="0 0 28 14" fill="none" width="16" height="14"><rect x="0" y="1" width="22" height="12" rx="2.5" stroke={C.onSurface} strokeWidth="1.5"/><rect x="2" y="3" width="16" height="8" rx="1" fill={C.onSurface}/><rect x="24" y="4" width="2" height="6" rx="1" fill={C.onSurface}/></svg>
            </div>
          </div>

          {/* Welcome App Bar */}
          <div style={{ display: 'flex', width: '100%', alignItems: 'center', gap: 8, marginBottom: 10, background: C.background, padding: '8px 16px', position: 'sticky', top: 0, zIndex: 10 }}>
            <div style={{ display: 'flex', width: 40, height: 40, alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <div style={{ display: 'flex', padding: 10, justifyContent: 'center', alignItems: 'center', flex: '1 0 0', alignSelf: 'stretch', borderRadius: 100, background: C.surfaceContainer }}>
                <span style={{ color: C.onSurface, fontSize: 12, fontWeight: 400 }}>AM</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, flex: '1 0 0' }}>
              <span style={{ flex: '1 0 0', color: C.onSurface, fontSize: 14, fontWeight: 400, lineHeight: '150%' }}>Good Morning, Aster 👋</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 100, background: C.surfaceContainer }}>
                <svg viewBox="0 0 24 24" fill="none" width="24" height="24" stroke={C.onSurface} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22Z"/><path d="M18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z"/>
                </svg>
              </div>
            </div>
          </div>
        </>
      }
    >
      {/* Scrollable content */}
      <div style={{ padding: '15px', background: C.background, fontFamily: "'Switzer', sans-serif" }}>
        {/* Balance Card */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', width: '100%', height: 178, padding: 16, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', borderRadius: 24, background: 'linear-gradient(180deg, #A41016 0%, #ED1C24 100%)', color: 'white', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -50, right: -50, width: 250, height: 250, background: 'rgba(255,255,255,0.05)', borderRadius: '50%', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -80, right: -30, width: 200, height: 200, background: 'rgba(0,0,0,0.1)', borderRadius: '50%', pointerEvents: 'none' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', zIndex: 1 }}>
              <div style={{ flex: '1 0 0' }}>
                <span style={{ color: C.surface, fontSize: 12, lineHeight: '150%', fontWeight: 300 }}>Main Balance (Birr)</span>
                <div style={{ color: C.surface, fontSize: 30, lineHeight: '150%' }}>{balanceVisible ? '12,580.00' : '* * * * * * * *'}</div>
              </div>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', background: C.onSurface, borderRadius: 10, border: 'none', cursor: 'pointer', zIndex: 1, color: 'white' }}>
                <svg viewBox="0 0 12 12" fill="none" width="12" height="12"><path d="M6 1V11M1 6H11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                <span style={{ color: C.surface, fontSize: 12, fontWeight: 300 }}>Add Money</span>
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, width: '100%', zIndex: 1 }}>
              <div style={{ flex: '1 0 0' }}>
                <span style={{ color: C.surface, fontSize: 12, fontWeight: 300 }}>Reward Balance</span>
                <span style={{ color: C.surface, fontSize: 20, letterSpacing: 2 }}>{balanceVisible ? '1,250.00' : '****'}</span>
              </div>
              <div style={{ flex: '1 0 0' }}>
                <span style={{ color: C.surface, fontSize: 12, fontWeight: 300 }}>Errif Balance</span>
                <span style={{ color: C.surface, fontSize: 20, letterSpacing: 2 }}>{balanceVisible ? '3,450.00' : '****'}</span>
              </div>
              <button onClick={() => setBalanceVisible(v => !v)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 36, height: 36, borderRadius: 100, border: 'none', background: 'transparent', cursor: 'pointer', color: 'white' }}>
                {balanceVisible ? (
                  <svg viewBox="0 0 24 24" fill="none" width="24" height="24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 19.5C7 19.5 2.73 16.39 1 12C2.73 7.61 7 4.5 12 4.5C14.12 4.5 16.07 5.2 17.62 6.38" stroke="white" strokeWidth="1.5"/><path d="M15 12C15 13.66 13.66 15 12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9" stroke="white" strokeWidth="1.5"/><line x1="1" y1="1" x2="23" y2="23" stroke="white" strokeWidth="1.5"/></svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" width="24" height="24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5Z" stroke="white" strokeWidth="1.5"/><circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.5"/></svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'flex', padding: '10px 0', alignItems: 'flex-start', alignContent: 'flex-start', gap: 8, flexWrap: 'wrap', borderRadius: 20, background: C.surfaceContainer, justifyContent: 'center', marginBottom: 8 }}>
          {ACTIONS.map((a, i) => (
            <div key={i} style={{ display: 'flex', width: 104, height: 110, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 4, borderRadius: 20, background: C.surfaceContainer, cursor: 'pointer' }}>
              <img src={a.src} alt={a.label.replace('\n', ' ')} width="52" height="52" style={{ objectFit: 'contain' }} />
              <span style={{ color: C.onSurface, textAlign: 'center', fontSize: 14, lineHeight: '125%', whiteSpace: 'pre-line' }}>{a.label}</span>
            </div>
          ))}
        </div>

        <BannerSlider slides={BANNER_SLIDES} />

        {/* Recent Transactions */}
        <div style={{ padding: 16, borderRadius: 24, background: C.surfaceContainer, margin: '16px 0 80px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', marginBottom: 16 }}>
            <span style={{ color: C.onSurface, fontSize: 16 }}>Transactions</span>
            <span style={{ color: C.onSurface, fontSize: 12, textDecoration: 'underline', cursor: 'pointer' }}>See all</span>
          </div>
          {TRANSACTIONS.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: 100, background: C.background, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={item.logo} alt={item.name} width="24" height="24" style={{ objectFit: 'contain' }} />
                </div>
                <div>
                  <div style={{ color: C.onSurface, fontSize: 14 }}>{item.name}</div>
                  <div style={{ color: C.onSurfaceLow, fontSize: 12 }}>{item.type}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 14, color: item.positive ? C.success : C.onSurface }}>{item.amount}</div>
                <div style={{ color: C.onSurfaceLow, fontSize: 12 }}>{item.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QR FAB */}
      <div style={{ position: 'absolute', bottom: 20, right: 20, zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
        <button onClick={() => setQrOpen(v => !v)} style={{ display: 'inline-flex', padding: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 100, background: C.primaryContainer, boxShadow: '0 4px 12px rgba(254,53,61,0.28), 0 1px 4px rgba(0,0,0,0.1)', border: 'none', cursor: 'pointer', zIndex: 1, flexShrink: 0 }}>
          <div style={{ width: 50, height: 50, borderRadius: '50%', background: `linear-gradient(180deg, ${C.primaryDark} 0%, ${C.primary} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: qrOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
            <img src="/assets/qr-scan.svg" alt="QR" width="30" height="30" style={{ objectFit: 'contain' }} />
          </div>
        </button>
      </div>

      {/* PIN Setup Popup Overlay */}
      {showPopup === 'pin-setup' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, animation: 'overlayFadeIn 0.25s ease' }}>
          <div style={{ background: C.surface, borderRadius: 24, padding: '32px 24px 28px', width: 320, maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 24px 64px rgba(0,0,0,0.30)', position: 'relative', animation: 'modalPopIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
            <div style={{ width: 80, height: 6, background: C.stroke, borderRadius: 3, marginBottom: 24, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: 0, background: C.success, borderRadius: 3, animation: 'progressFill 0.9s ease-out 0.2s forwards' }} />
            </div>
            <h2 style={{ color: C.onSurface, fontFamily: "'Switzer', sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 10, lineHeight: 1.3 }}>Almost There!</h2>
            <p style={{ color: C.onSurfaceLow, fontFamily: "'Switzer', sans-serif", fontSize: 14, fontWeight: 400, lineHeight: 1.6, marginBottom: 22 }}>Registration is confirmed and linked with<br />your Fayda ID.</p>
            <div style={{ width: '100%', background: '#F8F8FA', borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22, textAlign: 'left' }}>
              <div style={{ width: 46, height: 46, borderRadius: '50%', border: `2px solid ${C.surface}`, overflow: 'hidden', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <img src="/assets/avatars/avatar-1.png" alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Switzer', sans-serif", fontSize: 14, fontWeight: 600, color: C.onSurface }}>Zemedkun Kidane</div>
                <div style={{ fontFamily: "'Switzer', sans-serif", fontSize: 12, color: C.onSurfaceLow, marginTop: 2 }}>Status: <span style={{ color: C.success, fontWeight: 600 }}>Confirmed</span></div>
              </div>
              <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: C.surface, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <img src="/assets/fayda-logo-hq.png" alt="Fayda" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }} />
              </div>
            </div>
            <button onClick={() => {}} style={{ width: '100%', height: 48, borderRadius: 14, border: 'none', background: C.primary, color: C.onPrimary, cursor: 'pointer', fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 500, boxShadow: '0 4px 16px rgba(254,53,61,0.25)' }}>
              Set Your PIN
            </button>
          </div>
        </div>
      )}
    </PhoneFrame>
  );
}