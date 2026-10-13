'use client';
import { C } from '@/screens/_shared/tokens';

import { useState } from 'react';
import { AlertTriangle, Check, ChevronDown, ChevronLeft, ChevronRight, Download, Info, Rocket, X } from 'lucide-react';
import { POPPINS, SWITZER } from '@/screens/_shared';

/** Centered stage for popup/toast/overlay fragments (these have no phone chrome). */
function Stage({ dim = false, children }: { dim?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ width: 360, minHeight: 700, borderRadius: 30, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, background: dim ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
      {children}
    </div>
  );
}

/* ───────── Toast Message (success + error) ───────── */
export function ToastMessageScreen() {
  const toast = (variant: 'success' | 'error', title: string, sub: string) => {
    const c = variant === 'success' ? C.success : C.primary;
    const bg = variant === 'success' ? C.successContainer : C.onPrimary;
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 14, boxShadow: '0 6px 24px rgba(0,0,0,0.10)', width: 300, background: bg }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `2px solid ${c}` }}>
          {variant === 'success' ? <Check size={18} color={c} strokeWidth={2.5} /> : <AlertTriangle size={18} color={c} strokeWidth={2.5} />}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ fontFamily: SWITZER, fontSize: 13, fontWeight: 600, color: C.onSurface, lineHeight: 1.3 }}>{title}</div>
          <div style={{ fontFamily: SWITZER, fontSize: 11.5, color: C.onSurfaceLow, lineHeight: 1.4 }}>{sub}</div>
        </div>
      </div>
    );
  };
  return (
    <Stage>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {toast('success', 'Added to Favorites', 'Mom M-PESA has been saved to favorites')}
        {toast('error', 'Removed from Favorites', 'Mom M-PESA has been removed')}
      </div>
    </Stage>
  );
}

/* ───────── Update Notice Tooltip (dark, arrow up) ───────── */
export function UpdateNoticeTooltipScreen() {
  return (
    <Stage>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 0, height: 0, borderLeft: '9px solid transparent', borderRight: '9px solid transparent', borderBottom: '9px solid #1A1A1F', marginBottom: -1 }} />
        <div style={{ background: '#1A1A1F', borderRadius: 16, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 10px 36px rgba(0,0,0,0.30)', minWidth: 290, maxWidth: 340 }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ color: C.surface, fontFamily: SWITZER, fontSize: 14, fontWeight: 600, letterSpacing: '0.2px', lineHeight: 1.3 }}>Update Available! <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.6)' }}>(v4.2.1)</span></span>
            <span style={{ color: '#A0A0A8', fontFamily: SWITZER, fontSize: 12, fontWeight: 400, lineHeight: 1.5 }}>Tap to install new features &amp; fixes.</span>
          </div>
          <div style={{ width: 30, height: 30, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Info size={15} color="rgba(255,255,255,0.75)" strokeWidth={2} />
          </div>
        </div>
      </div>
    </Stage>
  );
}

/* ───────── Modal scaffolding for update notices ───────── */
function FeatureRow({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 0', width: '100%', textAlign: 'left' }}>
      <div style={{ width: 28, height: 28, borderRadius: 8, border: `2px solid ${C.success}`, background: C.successContainer, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Check size={15} color={C.success} strokeWidth={2} />
      </div>
      <span style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 13, fontWeight: 500, letterSpacing: '0.2px' }}>{text}</span>
    </div>
  );
}

const UPDATE_FEATURES = ['Custom Favorites Categories', 'Faster Account Lookup', 'PDF Receipt Stamping'];

function UpdateModalShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <Stage dim>
      <div style={{ width: 340, background: C.surface, borderRadius: 24, padding: '40px 30px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -20, left: -20, width: 120, height: 120, opacity: 0.15, pointerEvents: 'none', zIndex: 0 }}>
          <img src="/assets/M-PESA-pattern.svg" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <button aria-label="Close" style={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
          <X size={20} color={C.onSurface} strokeWidth={2} />
        </button>
        <div style={{ width: 72, height: 72, borderRadius: 18, background: C.successContainer, border: `2px solid ${C.success}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, position: 'relative', zIndex: 1 }}>
          <Rocket size={30} color={C.success} strokeWidth={2} />
        </div>
        <h2 style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 22, fontWeight: 700, marginBottom: 10, letterSpacing: '0.3px', lineHeight: 1.3, position: 'relative', zIndex: 1 }}>{title}</h2>
        <p style={{ color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 14, fontWeight: 400, lineHeight: 1.6, marginBottom: 24, letterSpacing: '0.2px', position: 'relative', zIndex: 1 }}>{subtitle}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', marginBottom: 24, position: 'relative', zIndex: 1 }}>
          {UPDATE_FEATURES.map((f) => <FeatureRow key={f} text={f} />)}
        </div>
        {children}
      </div>
    </Stage>
  );
}

export function UpdateNoticePopupScreen() {
  return (
    <UpdateModalShell title="Automatic Update Notice!" subtitle="We just pushed automatic improvements to make your app experience better.">
      <button style={{ width: '100%', height: 48, borderRadius: 14, background: C.primary, color: C.surface, border: 'none', cursor: 'pointer', fontFamily: POPPINS, fontSize: 15, fontWeight: 500, letterSpacing: '0.3px', boxShadow: '0 4px 16px rgba(254,53,61,0.25)', position: 'relative', zIndex: 1 }}>Dismiss</button>
    </UpdateModalShell>
  );
}

export function UpdateRequestOptionalScreen() {
  return (
    <UpdateModalShell title="Stay Up to Date!" subtitle="We've added new features to improve your M-PESA experience.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', position: 'relative', zIndex: 1 }}>
        <button style={{ width: '100%', height: 48, borderRadius: 14, background: C.primary, color: C.surface, border: 'none', cursor: 'pointer', fontFamily: POPPINS, fontSize: 14, fontWeight: 500, letterSpacing: '0.3px', boxShadow: '0 4px 16px rgba(254,53,61,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <Download size={18} color={C.surface} strokeWidth={2} /> Update Now <span style={{ fontSize: 12, fontWeight: 400, opacity: 0.9 }}>(2.4 MB)</span>
        </button>
        <button style={{ width: '100%', height: 48, borderRadius: 14, background: '#F5F5F7', color: C.onSurfaceLow, border: 'none', cursor: 'pointer', fontFamily: POPPINS, fontSize: 14, fontWeight: 500, letterSpacing: '0.3px' }}>Remind me later</button>
      </div>
    </UpdateModalShell>
  );
}

/* ───────── SignUp Set PIN popup (Fayda registration confirmed) ───────── */
export function SignupPinPopupScreen() {
  return (
    <Stage dim>
      <div style={{ width: 340, background: C.surface, borderRadius: 24, padding: '32px 24px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ width: 80, height: 6, background: C.stroke, borderRadius: 3, marginBottom: 24, overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '65%', background: C.success, borderRadius: 3 }} />
        </div>
        <h2 style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 24, fontWeight: 700, marginBottom: 12, letterSpacing: '0.3px' }}>Almost There, Hana!</h2>
        <p style={{ color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 14, fontWeight: 400, lineHeight: 1.6, marginBottom: 24, letterSpacing: '0.2px' }}>Registration is confirmed and linked with your Fayda ID.</p>
        <div style={{ width: '100%', background: '#F8F8FA', borderRadius: 16, padding: 16, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: `2px solid ${C.surface}`, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <img src="/assets/avatars/avatar-1.png" alt="Hana Kagnew Tilaye" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'left' }}>
            <span style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 14, fontWeight: 600, letterSpacing: '0.2px' }}>Hana Kagnew Tilaye</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: SWITZER, fontSize: 12, fontWeight: 400, color: C.onSurfaceLow }}>Status: <span style={{ color: C.success, fontWeight: 600 }}>Confirmed</span></div>
          </div>
          <div style={{ width: 48, height: 48, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: C.surface, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <img src="/assets/fayda-logo-hq.png" alt="Fayda" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          </div>
        </div>
        <button style={{ width: '100%', height: 48, borderRadius: 14, background: C.primary, color: C.onPrimary, border: 'none', cursor: 'pointer', fontFamily: POPPINS, fontSize: 14, fontWeight: 500, letterSpacing: '0.3px', boxShadow: '0 4px 16px rgba(254,53,61,0.25)' }}>Set Your PIN</button>
      </div>
    </Stage>
  );
}

/* ───────── Date Picker (day / month / year views) ───────── */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function DatePickerScreen() {
  const [view, setView] = useState<'day' | 'month' | 'year'>('month');
  const [viewDate, setViewDate] = useState(() => new Date(2024, 8, 1));
  const [selected, setSelected] = useState(() => new Date(2024, 8, 1));
  const [yearStart, setYearStart] = useState(() => Math.floor(2024 / 9) * 9);

  const navBtn = (onClick: () => void, dir: 'l' | 'r') => (
    <button onClick={onClick} style={{ width: 36, height: 36, borderRadius: '50%', border: `1.5px solid ${C.stroke}`, background: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
      {dir === 'l' ? <ChevronLeft size={18} color={C.onSurface} strokeWidth={2} /> : <ChevronRight size={18} color={C.onSurface} strokeWidth={2} />}
    </button>
  );

  const headerSelector = (label: string, onClick: () => void) => (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', padding: '6px 12px', borderRadius: 10 }}>
      <span style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 16, fontWeight: 700, letterSpacing: '0.3px' }}>{label}</span>
      <ChevronDown size={16} color={C.onSurface} strokeWidth={2.5} />
    </div>
  );

  const cellBase: React.CSSProperties = { borderRadius: 24, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: SWITZER, fontSize: 14, fontWeight: 500, color: C.onSurface, display: 'flex', alignItems: 'center', justifyContent: 'center' };
  const selStyle: React.CSSProperties = { background: C.primary, color: C.surface, fontWeight: 600, boxShadow: '0 4px 12px rgba(254,53,61,0.3)' };

  function renderDay() {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev = new Date(year, month, 0).getDate();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;
    const cells: React.ReactNode[] = [];
    for (let i = startOffset - 1; i >= 0; i--) {
      cells.push(<button key={`p${i}`} style={{ ...cellBase, height: 36, width: 36, margin: '0 auto', color: '#C0C0C8' }}>{daysInPrev - i}</button>);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const isSel = selected.getDate() === d && selected.getMonth() === month && selected.getFullYear() === year;
      cells.push(
        <button key={d} onClick={() => { const nd = new Date(year, month, d); setSelected(nd); setViewDate(nd); }} style={{ ...cellBase, height: 36, width: 36, margin: '0 auto', ...(isSel ? selStyle : {}) }}>{d}</button>
      );
    }
    const remaining = 42 - (startOffset + daysInMonth);
    for (let i = 1; i <= remaining; i++) {
      cells.push(<button key={`n${i}`} style={{ ...cellBase, height: 36, width: 36, margin: '0 auto', color: '#C0C0C8' }}>{i}</button>);
    }
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 14, borderBottom: `1px solid ${C.stroke}`, marginBottom: 16 }}>
          {navBtn(() => setViewDate(new Date(year, month - 1, 1)), 'l')}
          {headerSelector(`${MONTHS_FULL[month]} ${year}`, () => setView('month'))}
          {navBtn(() => setViewDate(new Date(year, month + 1, 1)), 'r')}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: 8, color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 13, fontWeight: 600 }}>
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => <span key={d}>{d}</span>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', rowGap: 8, columnGap: 4, padding: '4px 0' }}>{cells}</div>
      </div>
    );
  }

  function renderMonth() {
    const year = viewDate.getFullYear();
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 14, borderBottom: `1px solid ${C.stroke}`, marginBottom: 16 }}>
          {navBtn(() => setViewDate(new Date(year - 1, viewDate.getMonth(), 1)), 'l')}
          {headerSelector(String(year), () => setView('year'))}
          {navBtn(() => setViewDate(new Date(year + 1, viewDate.getMonth(), 1)), 'r')}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, padding: '4px 0' }}>
          {MONTHS.map((m, i) => {
            const isSel = selected.getMonth() === i && selected.getFullYear() === year;
            return <button key={m} onClick={() => { setViewDate(new Date(year, i, 1)); setView('day'); }} style={{ ...cellBase, height: 48, ...(isSel ? selStyle : {}) }}>{m}</button>;
          })}
        </div>
      </div>
    );
  }

  function renderYear() {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 14, borderBottom: `1px solid ${C.stroke}`, marginBottom: 16 }}>
          {navBtn(() => setYearStart((y) => y - 9), 'l')}
          {headerSelector(`${yearStart} - ${yearStart + 8}`, () => setView('month'))}
          {navBtn(() => setYearStart((y) => y + 9), 'r')}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, padding: '4px 0' }}>
          {Array.from({ length: 9 }).map((_, i) => {
            const y = yearStart + i;
            const isSel = selected.getFullYear() === y;
            return <button key={y} onClick={() => { setViewDate(new Date(y, viewDate.getMonth(), 1)); setView('month'); }} style={{ ...cellBase, height: 48, ...(isSel ? selStyle : {}) }}>{y}</button>;
          })}
        </div>
      </div>
    );
  }

  return (
    <Stage>
      <div style={{ width: 328, background: C.surface, borderRadius: 24, padding: 20, boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
        {view === 'day' ? renderDay() : view === 'month' ? renderMonth() : renderYear()}
      </div>
    </Stage>
  );
}
