'use client';
import { C } from '@/screens/_shared/tokens';

import { useState } from 'react';
import { AlertCircle, AlertTriangle, Award, Ban, Cake, Calendar, Gift, ShieldAlert, Star, Users } from 'lucide-react';
import { PhoneFrame } from '@/components/PhoneFrame';
import { HeaderNav, StatusBar, SWITZER } from '@/screens/_shared';

const TABS = ['Transactions', 'Alert', 'Rewards'] as const;
type Tab = (typeof TABS)[number];

type Tx = { title: string; date: string; amount: string; positive: boolean; meta: string; icon: string; tone?: 'success' };
const TRANSACTIONS: Tx[] = [
  { title: 'From Mikias Dereje', date: 'July 14, 2027', amount: '+1,000.00 Br', positive: true, meta: 'Transfer Money', icon: '/assets/Transfer Money.svg', tone: 'success' },
  { title: 'To Hana Kagnew', date: 'July 14, 2027', amount: '-1,000.00 Br', positive: false, meta: 'Transfer Money', icon: '/assets/Transfer Money.svg' },
  { title: 'Ethiopia Electric Utility', date: 'July 14, 2026', amount: '-5,000.00 Br', positive: false, meta: 'Bill Payment', icon: '/assets/Bill Payment.svg' },
  { title: 'London Cafe', date: 'July 14, 2027', amount: '-350.00 Br', positive: false, meta: 'Merchant Payment', icon: '/assets/Merchant Payemnt.svg' },
  { title: 'Airtime Top-up', date: 'Today', amount: '-50.00 Br', positive: false, meta: 'Safaricom Airtime', icon: '/assets/Airtime Package.svg' },
  { title: 'Airtime Top-up', date: 'Today', amount: '-50.00 Br', positive: false, meta: 'Ethiotelecom Airtime', icon: '/assets/Airtime Package.svg' }
];

type Msg = { title: string; date: string; desc: string; icon: React.ReactNode; tone: 'primary' | 'success' | 'warning' };
const ALERTS: Msg[] = [
  { title: 'Network Timeout Alert', date: '2 days ago', desc: 'Your transaction to Mom failed due to a temporary network issue. Please check your balance before trying again. Reference: ERR-999.', icon: <AlertTriangle size={20} />, tone: 'primary' },
  { title: 'Security Alert', date: 'Sep 18, 2026', desc: "New device login detected from Addis Ababa. If this wasn't you, please contact support immediately.", icon: <ShieldAlert size={20} />, tone: 'primary' },
  { title: 'Low Balance Alert', date: 'Sep 15, 2026', desc: 'Your M-PESA balance is below 500 Birr. Top up to continue enjoying uninterrupted service.', icon: <AlertCircle size={20} />, tone: 'warning' },
  { title: 'Payment Due Alert', date: 'Sep 12, 2026', desc: 'Your monthly bill payment of 1,200 Birr is due in 3 days. Please ensure sufficient balance.', icon: <Calendar size={20} />, tone: 'primary' },
  { title: 'Transaction Limit Alert', date: 'Sep 10, 2026', desc: 'You have reached your daily transaction limit of 50,000 Birr. Limit will reset at midnight.', icon: <Ban size={20} />, tone: 'warning' }
];
const REWARDS: Msg[] = [
  { title: 'Cashback Reward', date: '3 days ago', desc: 'Congratulations! You earned 150 Birr cashback on your merchant payment at London Cafe.', icon: <Gift size={20} />, tone: 'success' },
  { title: 'Loyalty Bonus', date: 'Sep 19, 2026', desc: "You've unlocked Silver Tier! Enjoy 5% cashback on all transactions this month.", icon: <Award size={20} />, tone: 'success' },
  { title: 'Referral Bonus', date: 'Sep 17, 2026', desc: 'Aster Mequanent joined using your referral code. You earned 200 Birr bonus!', icon: <Users size={20} />, tone: 'success' },
  { title: 'Birthday Reward', date: 'Sep 14, 2026', desc: 'Happy Birthday! Enjoy 500 Birr special reward as our gift to you.', icon: <Cake size={20} />, tone: 'success' },
  { title: 'Weekly Bonus', date: 'Sep 11, 2026', desc: 'Complete 10 transactions this week to earn an extra 100 Birr bonus.', icon: <Star size={20} />, tone: 'warning' }
];

const TONE: Record<string, { bg: string; fg: string }> = {
  primary: { bg: C.onPrimary, fg: C.primary },
  success: { bg: C.successContainer, fg: C.success },
  warning: { bg: '#FFF8E1', fg: '#FF9800' }
};

function MessageItem({ m }: { m: Msg }) {
  const tone = TONE[m.tone];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 12px', borderRadius: 16, background: C.surface, cursor: 'pointer' }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: tone.bg, color: tone.fg }}>{m.icon}</div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <span style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 14, fontWeight: 600, letterSpacing: '0.2px', flex: 1 }}>{m.title}</span>
          <span style={{ color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 11, fontWeight: 400, flexShrink: 0, whiteSpace: 'nowrap' }}>{m.date}</span>
        </div>
        <p style={{ color: C.onSurfaceLow, fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, lineHeight: 1.5, width: '100%' }}>{m.desc}</p>
      </div>
    </div>
  );
}

export function NotificationCenterScreen() {
  const [tab, setTab] = useState<Tab>('Transactions');
  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        <StatusBar />
        <HeaderNav title="Notifications Center" padding="16px 20px 0" />

        <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', width: '100%' }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 20, width: '100%' }}>
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{ flex: 1, height: 40, borderRadius: 20, border: 'none', fontFamily: SWITZER, fontSize: 13, fontWeight: 500, cursor: 'pointer', background: tab === t ? C.primary : C.disabled, color: tab === t ? C.surface : C.onSurfaceLow, boxShadow: tab === t ? '0 4px 12px rgba(254,53,61,0.25)' : 'none' }}>{t}</button>
            ))}
          </div>

          {tab === 'Transactions' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4, padding: '0 4px' }}>
                <span style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 14, fontWeight: 600, letterSpacing: '0.3px' }}>All Transactions</span>
                <span style={{ color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 13, fontWeight: 400, cursor: 'pointer' }}>See all</span>
              </div>
              {TRANSACTIONS.map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 12px', borderRadius: 16, background: C.surface, cursor: 'pointer' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: t.tone === 'success' ? C.successContainer : C.onPrimary }}>
                    <img src={t.icon} alt="" style={{ width: 22, height: 22, objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                      <span style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 14, fontWeight: 600, letterSpacing: '0.2px' }}>{t.title}</span>
                      <span style={{ color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 11, fontWeight: 400, flexShrink: 0, whiteSpace: 'nowrap' }}>{t.date}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <span style={{ fontFamily: SWITZER, fontSize: 14, fontWeight: 700, color: t.positive ? C.success : C.primary }}>{t.amount}</span>
                      <span style={{ color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 11, fontWeight: 400 }}>{t.meta}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'Alert' && <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{ALERTS.map((m, i) => <MessageItem key={i} m={m} />)}</div>}
          {tab === 'Rewards' && <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{REWARDS.map((m, i) => <MessageItem key={i} m={m} />)}</div>}
        </div>
      </div>
    </PhoneFrame>
  );
}
