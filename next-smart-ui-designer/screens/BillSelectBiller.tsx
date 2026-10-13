'use client';
import { C } from '@/screens/_shared/tokens';
import { useState } from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';

export function BillSelectBillerScreen() {
  const [q, setQ] = useState('');
  const [chip, setChip] = useState('All');
  const chips = ['All', 'Electricity', 'Water', 'Internet', 'TV', 'Insurance'];
  const billers = [
    { name: 'Ethiopian Electric', category: 'Electricity' },
    { name: 'Addis Ababa Water', category: 'Water' },
    { name: 'Ethio Telecom', category: 'Internet' },
    { name: 'DStv Ethiopia', category: 'TV' },
    { name: 'Nyala Insurance', category: 'Insurance' }
  ];
  const filtered = billers.filter((b) => {
    const matchQ = b.name.toLowerCase().includes(q.toLowerCase());
    const matchC = chip === 'All' || b.category === chip;
    return matchQ && matchC;
  });

  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        <StatusBar />
        <Header title="Select Biller" back />
        <div style={{ padding: '0 16px 12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: C.surface, borderRadius: 14, padding: '0 14px', height: 46, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={C.onSurfaceLow} strokeWidth="1.8" style={{ width: 18, height: 18 }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search billers..." style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: "'Switzer', sans-serif", fontSize: 14, color: C.onSurface }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, padding: '0 16px 14px', overflowX: 'auto' }}>
          {chips.map((label) => (
            <button key={label} onClick={() => setChip(label)} style={{ flexShrink: 0, padding: '6px 14px', borderRadius: 20, border: `1.5px solid ${label === chip ? C.primary : C.stroke}`, background: label === chip ? C.primary : C.surface, color: label === chip ? C.surface : C.onSurfaceLow, fontFamily: "'Switzer', sans-serif", fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>{label}</button>
          ))}
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: C.surface, borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: C.onPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: C.primary, flexShrink: 0 }}>{b.name[0]}</div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600, color: C.onSurface }}>{b.name}</div><div style={{ fontSize: 12, color: C.onSurfaceLow, marginTop: 2 }}>{b.category}</div></div>
              <svg viewBox="0 0 24 24" fill="none" stroke={C.onSurfaceLow} strokeWidth="2" style={{ width: 18, height: 18 }}><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          ))}
          {filtered.length === 0 && <p style={{ textAlign: 'center', color: C.onSurfaceLow, fontSize: 13, marginTop: 24 }}>No billers match your search.</p>}
        </div>
      </div>
    </PhoneFrame>
  );
}

function StatusBar() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px 8px', flexShrink: 0 }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: C.onSurface }}>9:41</span>
      <div style={{ display: 'flex', gap: 6 }}>
        <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9z" fill={C.onSurface}/><path d="M5 13l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" fill={C.onSurface}/><path d="M9 17l2 2c1.1-1.1 2.9-1.1 4 0l2-2c-2.21-2.21-5.79-2.21-8 0z" fill={C.onSurface}/></svg>
        <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><rect x="2" y="6" width="4" height="12" rx="1" fill={C.onSurface}/><rect x="8" y="4" width="4" height="14" rx="1" fill={C.onSurface}/></svg>
      </div>
    </div>
  );
}

function Header({ title, back }: { title: string; back?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0 12px', position: 'relative' }}>
      {back && (
        <button style={{ position: 'absolute', left: 0, background: 'transparent', border: 'none', cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke={C.onSurface} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
      )}
      <span style={{ color: C.onSurface, fontFamily: "'Switzer', sans-serif", fontSize: 17, fontWeight: 500, flex: 1, textAlign: 'center' }}>{title}</span>
      <div style={{ width: 36 }} />
    </div>
  );
}
