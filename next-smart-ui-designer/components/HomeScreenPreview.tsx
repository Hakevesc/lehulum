'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { PhoneFrame } from './PhoneFrame';
import { BannerSlider } from './BannerSlider';

const ACTIONS = [
  { label: 'Merchant\nPayment', src: '/assets/Merchant Payemnt.svg' },
  { label: 'Bill\nPayment', src: '/assets/Bill Payment.svg' },
  { label: 'Credit &\nSaving', src: '/assets/Credit Saving.svg' },
  { label: 'Transfer\nMoney', src: '/assets/Transfer Money.svg' },
  { label: 'Airtime/\nPackage', src: '/assets/Airtime Package.svg' },
  { label: 'More\nServices', src: '/assets/More Services.svg' }
];

const ACTION_IDS = ['action-merchant', 'action-bill', 'action-credit', 'action-transfer', 'action-airtime', 'action-more'];

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

export function HomeScreenPreview() {
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setQrOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <PhoneFrame
      header={
        <>
          {/* Status Bar */}
          <div style={{
            height: 34,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 24px 4px',
            background: '#F5F5F5',
            color: '#1C1C21',
            fontSize: 12,
            fontWeight: 700
          }}>
            <span>10:00</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9z" fill="#1C1C21"/><path d="M5 13l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" fill="#1C1C21"/><path d="M9 17l2 2c1.1-1.1 2.9-1.1 4 0l2-2c-2.21-2.21-5.79-2.21-8 0z" fill="#1C1C21"/></svg>
              <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><rect x="2" y="6" width="4" height="12" rx="1" fill="#1C1C21"/><rect x="8" y="4" width="4" height="14" rx="1" fill="#1C1C21"/><rect x="14" y="2" width="4" height="16" rx="1" fill="#1C1C21"/><rect x="20" y="0" width="4" height="18" rx="1" fill="#1C1C21" opacity="0.3"/></svg>
              <svg viewBox="0 0 28 14" fill="none" width="16" height="14"><rect x="0" y="1" width="22" height="12" rx="2.5" stroke="#1C1C21" strokeWidth="1.5"/><rect x="2" y="3" width="16" height="8" rx="1" fill="#1C1C21"/><rect x="24" y="4" width="2" height="6" rx="1" fill="#1C1C21"/></svg>
            </div>
          </div>

          {/* Welcome App Bar */}
          <div style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            gap: 8,
            marginBottom: 10,
            background: '#F5F5F5',
            padding: '8px 16px',
            position: 'sticky',
            top: 0,
            zIndex: 10
          }}>
            <div style={{ display: 'flex', width: 40, height: 40, alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <div style={{
                display: 'flex',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                flex: '1 0 0',
                alignSelf: 'stretch',
                borderRadius: 100,
                background: '#FCFCFC'
              }}>
                <span style={{ color: '#1C1C21', fontSize: 12, fontWeight: 400 }}>AM</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, flex: '1 0 0' }}>
              <span style={{ flex: '1 0 0', color: '#1C1C21', fontSize: 14, fontWeight: 400, lineHeight: '150%' }}>Good Morning, Aster 👋</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ display: 'flex', width: 40, height: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, borderRadius: 100, background: '#FCFCFC' }}>
                  <div style={{ display: 'flex', padding: 8, justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                    <svg viewBox="0 0 24 24" fill="none" width="24" height="24" stroke="#1C1C21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22Z"/>
                      <path d="M18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    >
      {/* Scrollable app content */}
      <div style={{
        padding: '15px',
        background: '#F5F5F5',
        fontFamily: "'Switzer', sans-serif"
      }}>
        {/* ===== Balance Card ===== */}
        <div data-walkthrough-id="balanceCard" style={{
          marginBottom: 10
        }}>
          <div style={{
            display: 'flex',
            width: '100%',
            height: 178,
            padding: 16,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderRadius: 24,
            background: 'linear-gradient(180deg, #A41016 0%, #ED1C24 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative circles */}
            <div style={{ position: 'absolute', top: -50, right: -50, width: 250, height: 250, background: 'rgba(255,255,255,0.05)', borderRadius: '50%', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -80, right: -30, width: 200, height: 200, background: 'rgba(0,0,0,0.1)', borderRadius: '50%', pointerEvents: 'none' }} />

            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', zIndex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: '1 0 0' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                  <span style={{ color: '#FFF', textAlign: 'center', fontSize: 12, lineHeight: '150%', fontWeight: 300 }}>Main Balance (Birr)</span>
                </div>
                <div style={{ color: '#FFF', fontSize: 30, lineHeight: '150%' }}>
                  {balanceVisible ? '12,580.00' : '* * * * * * * *'}
                </div>
              </div>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '10px 14px',
                background: '#1C1C21',
                borderRadius: 10,
                border: 'none',
                cursor: 'pointer',
                zIndex: 1,
                color: 'white'
              }}>
                <div style={{ width: 18, height: 18, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5, background: 'rgba(255,255,255,0.15)' }}>
                  <svg viewBox="0 0 12 12" fill="none" width="12" height="12"><path d="M6 1V11M1 6H11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
                <span style={{ color: '#FFF', fontSize: 12, lineHeight: '150%', fontWeight: 300 }}>Add Money</span>
              </button>
            </div>

            {/* Bottom row */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, width: '100%', zIndex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-start', flex: '1 0 0' }}>
                <span style={{ color: '#FFF', textAlign: 'center', fontSize: 12, lineHeight: '150%', marginBottom: 2, fontWeight: 300 }}>Reward Balance</span>
                <span style={{ color: '#FFF', textAlign: 'center', fontSize: 20, lineHeight: '150%', letterSpacing: 2 }}>
                  {balanceVisible ? '1,250.00' : '****'}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-start', flex: '1 0 0' }}>
                <span style={{ color: '#FFF', textAlign: 'center', fontSize: 12, lineHeight: '150%', marginBottom: 2, fontWeight: 300 }}>Errif Balance</span>
                <span style={{ color: '#FFF', textAlign: 'center', fontSize: 20, lineHeight: '150%', letterSpacing: 2 }}>
                  {balanceVisible ? '3,450.00' : '****'}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
                <button
                  data-walkthrough-id="eyeBtn"
                  onClick={() => setBalanceVisible((v) => !v)}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 36,
                    height: 36,
                    borderRadius: 100,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    color: 'white'
                  }}
                >
                  {balanceVisible ? (
                    <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 19.5C7 19.5 2.73 16.39 1 12C2.73 7.61 7 4.5 12 4.5C14.12 4.5 16.07 5.2 17.62 6.38" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 12C15 13.66 13.66 15 12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="1" y1="1" x2="23" y2="23" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Quick Actions ===== */}
        <div style={{
          display: 'flex',
          padding: '10px 0',
          alignItems: 'flex-start',
          alignContent: 'flex-start',
          gap: 8,
          flexWrap: 'wrap',
          borderRadius: 20,
          background: '#FCFCFC',
          justifyContent: 'center',
          marginBottom: 8
        }}>
          {ACTIONS.map((a, i) => (
            <div key={i} data-walkthrough-id={ACTION_IDS[i]} style={{
              display: 'flex',
              width: 104,
              height: 110,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 4,
              borderRadius: 20,
              background: '#FCFCFC',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}>
              <div style={{ display: 'flex', width: 52, height: 52, justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                <Image src={a.src} alt={a.label.replace('\n', ' ')} width={52} height={52} style={{ objectFit: 'contain' }} />
              </div>
              <span style={{
                alignSelf: 'stretch',
                color: '#1C1C21',
                textAlign: 'center',
                fontSize: 14,
                lineHeight: '125%',
                whiteSpace: 'pre-line'
              }}>
                {a.label}
              </span>
            </div>
          ))}
        </div>

        {/* ===== Banner Slider ===== */}
        <BannerSlider slides={BANNER_SLIDES} />

        {/* ===== Recent Transactions ===== */}
        <div style={{
          display: 'flex',
          padding: '16px',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '16px',
          width: '100%',
          borderRadius: 24,
          background: '#FCFCFC',
          margin: '16px 0 80px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
            <span style={{ color: '#1C1C21', fontSize: 16, lineHeight: '150%' }}>Transactions</span>
            <span style={{ color: '#1C1C21', textAlign: 'right', fontSize: 12, lineHeight: '150%', textDecoration: 'underline', cursor: 'pointer' }}>See all</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16, width: '100%' }}>
            {TRANSACTIONS.map((item, i) => (
              <div key={i} style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    display: 'flex',
                    width: 36,
                    height: 36,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                    background: '#F5F5F5',
                    overflow: 'hidden'
                  }}>
                    <Image src={item.logo} alt={item.name} width={24} height={24} style={{ objectFit: 'contain' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <span style={{ color: '#1C1C21', fontSize: 14, lineHeight: '150%' }}>{item.name}</span>
                    <span style={{ color: '#7C7C87', fontSize: 12, lineHeight: '150%' }}>{item.type}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <span style={{
                    textAlign: 'right',
                    fontSize: 14,
                    lineHeight: '150%',
                    color: item.positive ? '#1FC83B' : '#1C1C21'
                  }}>{item.amount}</span>
                  <span style={{ color: '#7C7C87', textAlign: 'right', fontSize: 12, lineHeight: '150%' }}>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== QR FAB Speed-Dial ===== */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 10
      }}>
        {qrOpen && (
          <>
            <div onClick={() => setQrOpen(false)} style={{
              position: 'absolute',
              inset: -9999,
              zIndex: -1,
              background: qrOpen ? 'rgba(0,0,0,0.45)' : 'transparent',
              pointerEvents: qrOpen ? 'all' : 'none',
              opacity: qrOpen ? 1 : 0,
              transition: 'opacity 0.25s ease'
            }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, pointerEvents: 'all' }}>
              {[
                { label: 'My QR Code', icon: 'qr' },
                { label: 'Scan QR Code', icon: 'scan' },
                { label: 'Verify Receipt', icon: 'receipt' }
              ].map((item, i) => (
                <div key={i} onClick={() => setQrOpen(false)} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  cursor: 'pointer',
                  opacity: 1,
                  transform: 'translateY(0) scale(1)',
                  transition: 'opacity 0.22s ease, transform 0.22s ease',
                  pointerEvents: 'all'
                }}>
                  <span style={{
                    background: '#FFFFFF',
                    color: '#1C1C21',
                    fontSize: 13,
                    fontWeight: 600,
                    padding: '7px 14px',
                    borderRadius: 20,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)',
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.1px'
                  }}>{item.label}</span>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.13), 0 1px 4px rgba(0,0,0,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {item.icon === 'qr' ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="#FE353D" strokeWidth="2" width="20" height="20" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="3" height="3"/>
                        <rect x="18" y="14" width="3" height="3"/><rect x="14" y="18" width="3" height="3"/><rect x="18" y="18" width="3" height="3"/>
                      </svg>
                    ) : item.icon === 'scan' ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="#FE353D" strokeWidth="2" width="20" height="20" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/>
                        <path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" y1="12" x2="17" y2="12"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="#FE353D" strokeWidth="2" width="20" height="20" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="9 15 11 17 15 13"/>
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <button
          data-walkthrough-id="qrFabBtn"
          onClick={(e) => { e.stopPropagation(); setQrOpen((v) => !v); }}
          style={{
            display: 'inline-flex',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            background: '#FFDFE0',
            boxShadow: qrOpen ? '0 6px 20px rgba(254,53,61,0.40), 0 2px 8px rgba(0,0,0,0.15)' : '0 4px 12px rgba(254,53,61,0.28), 0 1px 4px rgba(0,0,0,0.1)',
            border: 'none',
            cursor: 'pointer',
            zIndex: 1,
            flexShrink: 0,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
        >
          <div style={{
            display: 'flex',
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            background: 'linear-gradient(180deg, #C41520 0%, #FE353D 100%)',
            transition: 'transform 0.3s ease',
            transform: qrOpen ? 'rotate(45deg)' : 'rotate(0deg)'
          }}>
            <Image src="/assets/qr-scan.svg" alt="QR Scan" width={30} height={30} style={{ objectFit: 'contain' }} />
          </div>
        </button>
      </div>
    </PhoneFrame>
  );
}