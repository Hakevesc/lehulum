'use client';
import { C } from '@/screens/_shared/tokens';

import { useState, useEffect } from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';

export function TransactionSendMoneyScreen() {
  const [tab, setTab] = useState<'m-pesa' | 'bank'>('m-pesa');

  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background, padding: '0 15px' }}>
        {/* Status Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 10px 8px', flexShrink: 0 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.onSurface }}>9:41</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <svg viewBox="0 0 24 24" fill="none" width="17" height="17"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9z" fill={C.onSurface}/><path d="M5 13l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" fill={C.onSurface}/><path d="M9 17l2 2c1.1-1.1 2.9-1.1 4 0l2-2c-2.21-2.21-5.79-2.21-8 0z" fill={C.onSurface}/></svg>
            <svg viewBox="0 0 24 24" fill="none" width="17" height="17"><rect x="2" y="6" width="4" height="12" rx="1" fill={C.onSurface}/><rect x="8" y="4" width="4" height="14" rx="1" fill={C.onSurface}/><rect x="14" y="2" width="4" height="16" rx="1" fill={C.onSurface}/><rect x="20" y="0" width="4" height="18" rx="1" fill={C.onSurface} opacity="0.3"/></svg>
          </div>
        </div>

        {/* Header Nav */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 0 0', flexShrink: 0, position: 'relative' }}>
          <button style={{ position: 'absolute', left: 0, background: 'transparent', border: 'none', cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={C.onSurface} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <span style={{ color: C.onSurface, fontFamily: "'Switzer', sans-serif", fontSize: 17, fontWeight: 500 }}>Send Money</span>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '16px 0 20px', display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          {/* Transfer Type Selector */}
          <div style={{ display: 'flex', gap: 12 }}>
            <div onClick={() => setTab('m-pesa')} style={{
              flex: 1, height: 80, borderRadius: 16, background: C.surface,
              display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12,
              padding: 16, cursor: 'pointer', position: 'relative',
              border: tab === 'm-pesa' ? `2px solid ${C.primary}` : `2px solid ${C.stroke}`
            }}>
              <div style={{ width: 40, height: 40, minWidth: 40, borderRadius: 10, border: `2px solid ${C.primary}`, background: C.primaryContainer, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 15h0M11 15h0M15 15h0M19 15h0"/>
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.onSurface }}>M-PESA Wallet</span>
                <span style={{ fontSize: 11, color: C.onSurfaceLow, marginTop: 2 }}>Send to M-PESA user</span>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke={C.onSurfaceLow} strokeWidth="2" style={{ width: 18, height: 18, position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' }}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>

            <div onClick={() => setTab('bank')} style={{
              flex: 1, height: 80, borderRadius: 16, background: C.surface,
              display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12,
              padding: 16, cursor: 'pointer', position: 'relative',
              border: tab === 'bank' ? `2px solid ${C.onSurface}` : `2px solid ${C.stroke}`
            }}>
              <div style={{ width: 40, height: 40, minWidth: 40, borderRadius: 10, border: `2px solid ${C.primary}`, background: C.primaryContainer, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
                  <rect x="2" y="4" width="20" height="16" rx="3"/><circle cx="9" cy="11" r="2.5"/><path d="M4 17c0-2 1.8-4 4-4h2c2.2 0 4 1.8 4 4"/>
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.onSurface }}>Bank Account</span>
                <span style={{ fontSize: 11, color: C.onSurfaceLow, marginTop: 2 }}>Transfer to bank</span>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke={C.onSurfaceLow} strokeWidth="2" style={{ width: 18, height: 18, position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' }}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>

          {/* Recent Contacts - Title */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: C.onSurface, fontFamily: "'Switzer', sans-serif" }}>Recent Contacts</span>
            <span style={{ fontSize: 12, color: C.onSurfaceLow, fontWeight: 500 }}>See all</span>
          </div>

          {/* Recent Contacts */}
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { initials: 'ZK', name: 'Zemedkun\nKidane' },
              { initials: 'HC', name: 'Henok\nChalla' },
              { initials: 'MD', name: 'Mikias\nDereje' },
              { initials: 'AM', name: 'Aster\nMekonen' }
            ].map((contact, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer', width: 72 }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: C.onPrimary, border: `2px solid ${C.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <span style={{ color: C.primary, fontSize: 16, fontWeight: 700, fontFamily: "'Switzer', sans-serif" }}>{contact.initials}</span>
                </div>
                <span style={{ fontSize: 11, color: C.onSurface, textAlign: 'center', lineHeight: 1.3, whiteSpace: 'pre-line', fontFamily: "'Switzer', sans-serif" }}>{contact.name}</span>
              </div>
            ))}
          </div>

          {/* To Bank Account - Quick Select */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: C.onSurface, fontFamily: "'Switzer', sans-serif" }}>To Bank Account</span>
            <span style={{ fontSize: 12, color: C.onSurfaceLow, fontWeight: 500 }}>See all</span>
          </div>

          {/* Saved Accounts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { bank: 'CBE', name: 'Zemedkun Kidane', account: '1000179482903' },
              { bank: 'Dashen', name: 'Henok Challa', account: '6285790396751' }
            ].map((account, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: C.surface, borderRadius: 14, cursor: 'pointer', border: i === 0 ? `1.5px solid ${C.primary}` : '1.5px solid transparent' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: C.background, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: C.onSurface }}>{account.bank[0]}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.onSurface }}>{account.name}</div>
                  <div style={{ fontSize: 12, color: C.onSurfaceLow, marginTop: 1 }}>{account.account}</div>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke={C.onSurfaceLow} strokeWidth="2" style={{ width: 18, height: 18 }}>
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            ))}
          </div>

          {/* Send to New */}
          <button style={{ width: '100%', height: 48, borderRadius: 12, background: C.primary, color: C.onPrimary, fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(254,53,61,0.25)', marginTop: 'auto' }}>
            Send to New Contact
          </button>

          {/* Footer Links */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%' }}>
            <a style={{ display: 'flex', gap: 3, color: C.onSurfaceLow, fontSize: 11, cursor: 'pointer' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Contact Us
            </a>
            <div style={{ width: 1, height: 12, background: '#D0D0D0' }} />
            <a style={{ display: 'flex', gap: 3, color: C.onSurfaceLow, fontSize: 11, cursor: 'pointer' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11"><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              Terms
            </a>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}