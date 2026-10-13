'use client';
import { C } from '@/screens/_shared/tokens';
import { PhoneFrame } from '@/components/PhoneFrame';

export function BillPaymentScreen() {
  return <PhoneFrame><BillShell title="Pay Bill" back><BillGrid /></BillShell></PhoneFrame>;
}

function BillShell({ title, back, children }: { title: string; back?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
      <StatusBar />
      <Header title={title} back={back} />
      <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>{children}</div>
    </div>
  );
}

function StatusBar() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px 8px', flexShrink: 0 }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: C.onSurface }}>9:41</span>
      <div style={{ display: 'flex', gap: 6 }}>
        <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9z" fill={C.onSurface}/></svg>
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

function BillGrid() {
  const items = [
    { name: 'Electricity', sub: 'Utility', color: '#FFB020' },
    { name: 'Water', sub: 'Municipal', color: '#2E90FA' },
    { name: 'Internet', sub: 'Telecom', color: C.success },
    { name: 'Television', sub: 'Cable', color: C.primary }
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: C.surface, borderRadius: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: `${item.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: item.color, flexShrink: 0 }}>{item.name[0]}</div>
          <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600, color: C.onSurface }}>{item.name}</div><div style={{ fontSize: 12, color: C.onSurfaceLow, marginTop: 2 }}>{item.sub}</div></div>
          <svg viewBox="0 0 24 24" fill="none" stroke={C.onSurfaceLow} strokeWidth="2" style={{ width: 18, height: 18 }}><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      ))}
      <button style={{ width: '100%', height: 48, borderRadius: 12, background: C.primary, color: C.onPrimary, fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(254,53,61,0.25)', marginTop: 'auto' }}>Pay New Bill</button>
    </div>
  );
}
