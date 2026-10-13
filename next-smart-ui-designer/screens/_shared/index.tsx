'use client';

/**
 * Shared building blocks for migrated phone screens.
 * Faithful React ports of the legacy patterns in styles/component-keypad.css
 * and the inline status bars used across the HTML screens. Colors reference the
 * token constants in ./tokens (no raw hex) so the palette is centralized.
 */

import type { CSSProperties, ReactNode } from 'react';
import { C } from './tokens';

export const SWITZER = "'Switzer', sans-serif";
export const POPPINS = "'Poppins', sans-serif";
export const INTER = "'Inter', sans-serif";
export { C } from './tokens';

/** "1234.5" -> "1,234.50" — mirrors formatNumber() in the legacy screens. */
export function formatAmount(num: number): string {
  return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/* ───────── Status Bar ───────── */
export function StatusBar({
  color = C.onSurface,
  background = C.background
}: {
  /** Glyph color — C.onSurface on light screens, '#FFF' over a red header. */
  color?: string;
  background?: string;
}) {
  return (
    <div style={{
      flexShrink: 0,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      width: '100%', padding: '14px 24px 8px', background
    }}>
      <span style={{ fontSize: 14, fontWeight: 600, color, fontFamily: SWITZER }}>10:00</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9z" fill={color} /><path d="M5 13l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" fill={color} /><path d="M9 17l2 2c1.1-1.1 2.9-1.1 4 0l2-2c-2.21-2.21-5.79-2.21-8 0z" fill={color} /></svg>
        <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><rect x="2" y="6" width="4" height="12" rx="1" fill={color} /><rect x="8" y="4" width="4" height="14" rx="1" fill={color} /><rect x="14" y="2" width="4" height="16" rx="1" fill={color} /><rect x="20" y="0" width="4" height="18" rx="1" fill={color} opacity="0.3" /></svg>
        <svg viewBox="0 0 28 14" fill="none" width="18" height="14"><rect x="0" y="1" width="22" height="12" rx="2.5" stroke={color} strokeWidth="1.5" /><rect x="2" y="3" width="16" height="8" rx="1" fill={color} /><rect x="24" y="4" width="2" height="6" rx="1" fill={color} /></svg>
      </div>
    </div>
  );
}

/* ───────── Header Nav (back button + centered title) ───────── */
export function HeaderNav({
  title,
  color = C.onSurface,
  right,
  onBack,
  padding = '8px 16px 12px',
  background = C.background
}: {
  title: string;
  color?: string;
  right?: ReactNode;
  onBack?: () => void;
  padding?: string;
  background?: string;
}) {
  return (
    <div style={{
      flexShrink: 0, width: '100%', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding, background
    }}>
      <button onClick={onBack} aria-label="Back" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 36, height: 36, borderRadius: '50%', background: 'transparent',
        border: 'none', cursor: 'pointer'
      }}>
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>
      <span style={{ color, fontFamily: SWITZER, fontSize: 17, fontWeight: 500, letterSpacing: '0.3px', flex: 1, textAlign: 'center' }}>{title}</span>
      {right ?? <div style={{ width: 36 }} />}
    </div>
  );
}

/* ───────── Numeric Keypad (port of component-keypad.css) ───────── */
export function NumericKeypad({
  onKey,
  onDelete,
  keyHeight = 50,
  padding = '20px 16px',
  marginTop = 'auto'
}: {
  onKey: (digit: string) => void;
  onDelete: () => void;
  keyHeight?: number;
  padding?: string;
  marginTop?: CSSProperties['marginTop'];
}) {
  const keyStyle: CSSProperties = {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    height: keyHeight, borderRadius: 16, border: 'none', background: 'transparent',
    color: C.onSurface, fontSize: 26, fontWeight: 500, fontFamily: INTER, cursor: 'pointer'
  };
  function press(e: React.PointerEvent<HTMLButtonElement>, down: boolean) {
    e.currentTarget.style.background = down ? 'rgba(0,0,0,0.06)' : 'transparent';
    e.currentTarget.style.transform = down ? 'scale(0.95)' : 'scale(1)';
  }
  return (
    <div style={{
      background: C.surface, borderRadius: 20, padding,
      display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)', width: '100%', marginTop
    }}>
      {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
        <button key={d} style={keyStyle} onClick={() => onKey(d)}
          onPointerDown={(e) => press(e, true)} onPointerUp={(e) => press(e, false)} onPointerLeave={(e) => press(e, false)}>
          {d}
        </button>
      ))}
      <div />
      <button style={keyStyle} onClick={() => onKey('0')}
        onPointerDown={(e) => press(e, true)} onPointerUp={(e) => press(e, false)} onPointerLeave={(e) => press(e, false)}>
        0
      </button>
      <button aria-label="Delete" style={{ ...keyStyle }} onClick={onDelete}
        onPointerDown={(e) => press(e, true)} onPointerUp={(e) => press(e, false)} onPointerLeave={(e) => press(e, false)}>
        <svg viewBox="0 0 24 24" fill="none" stroke={C.onSurfaceLow} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}>
          <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
          <line x1="18" y1="9" x2="12" y2="15" />
          <line x1="12" y1="9" x2="18" y2="15" />
        </svg>
      </button>
    </div>
  );
}

/* ───────── PIN boxes (4 cells with filled/active states) ───────── */
export function PinBoxes({
  length,
  filled,
  active = true,
  boxSize = 64,
  gap = 18
}: {
  /** total boxes (default 4) */
  length?: number;
  /** how many are filled */
  filled: number;
  /** whether the next empty box shows the blinking caret */
  active?: boolean;
  boxSize?: number;
  gap?: number;
}) {
  const total = length ?? 4;
  return (
    <div style={{ display: 'flex', gap, justifyContent: 'center' }}>
      {Array.from({ length: total }).map((_, i) => {
        const isFilled = i < filled;
        const isActive = active && i === filled;
        return (
          <div key={i} style={{
            width: boxSize, height: boxSize, borderRadius: 16, background: C.surface,
            border: `2px solid ${isFilled ? 'transparent' : isActive ? C.primary : C.stroke}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            {isFilled && <div style={{ width: 16, height: 16, borderRadius: '50%', background: C.onSurface }} />}
            {isActive && <div style={{ width: 2, height: 24, background: C.primary, animation: 'cursor-blink 1s step-end infinite' }} />}
          </div>
        );
      })}
    </div>
  );
}

/* ───────── Primary action button (continue / transfer) ───────── */
export function ActionButton({
  label,
  active,
  onClick,
  height = 52
}: {
  label: string;
  active: boolean;
  onClick?: () => void;
  height?: number;
}) {
  return (
    <button
      disabled={!active}
      onClick={active ? onClick : undefined}
      style={{
        height, borderRadius: 14, border: 'none',
        background: active ? C.primary : C.disabled,
        color: active ? C.surface : C.onSurfaceLow,
        fontFamily: POPPINS, fontSize: 15, fontWeight: 500,
        cursor: active ? 'pointer' : 'not-allowed',
        boxShadow: active ? '0 4px 16px rgba(254,53,61,0.25)' : 'none',
        marginTop: 14, transition: 'all 0.2s', width: '100%'
      }}
    >
      {label}
    </button>
  );
}

/* ───────── Receipt detail row (label / value) ───────── */
export function ReceiptRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
      <span style={{ color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 12, fontWeight: 400, flexShrink: 0, maxWidth: 140 }}>{label}</span>
      <span style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 13, fontWeight: 500, textAlign: 'right', wordBreak: 'break-all', flex: 1 }}>{value}</span>
    </div>
  );
}
