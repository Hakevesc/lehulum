'use client';

import type { ComponentType } from 'react';

// Token-only: every color/radius below resolves to a CSS variable from the red
// M-PESA token set (styles/globals.css). No hardcoded hex — "never hardcode styles".
const T = {
  primary: 'var(--color-primary)',
  primaryContainer: 'var(--color-primary-container)',
  onPrimary: 'var(--color-on-primary)',
  surface: 'var(--color-surface)',
  surfaceContainer: 'var(--color-surface-container)',
  background: 'var(--color-background)',
  onSurface: 'var(--color-on-surface)',
  onSurfaceLow: 'var(--color-on-surface-low)',
  success: 'var(--color-success)',
  successContainer: 'var(--color-success-container)',
  stroke: 'var(--color-stroke)',
  radiusMd: 'var(--radius-md)',
  radiusLg: 'var(--radius-lg)',
  shadowSoft: 'var(--shadow-soft)'
};

export function BuilderStatusBar() {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '8px 16px 4px', background: T.background, flexShrink: 0
    }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: T.onSurface }}>9:41</span>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <div style={{ width: 14, height: 10, borderRadius: 2, background: T.onSurface }} />
        <div style={{ width: 14, height: 10, borderRadius: 2, border: `1px solid ${T.onSurface}` }} />
      </div>
    </div>
  );
}

export function BuilderHeader({ title = 'Header', subtitle }: { title?: string; subtitle?: string }) {
  return (
    <div style={{
      padding: '6px 16px 10px', background: T.background,
      borderBottom: `1px solid ${T.stroke}`, flexShrink: 0
    }}>
      <div style={{ fontSize: 15, fontWeight: 600, color: T.onSurface, fontFamily: "'Switzer', sans-serif" }}>{title}</div>
      {subtitle && <div style={{ fontSize: 11, color: T.onSurfaceLow, marginTop: 2 }}>{subtitle}</div>}
    </div>
  );
}

export function BuilderInput({ label = 'Label', value, placeholder, type = 'text' }: {
  label?: string; value?: string; placeholder?: string; type?: string;
}) {
  // Uncontrolled so it renders as a static template preview without a handler.
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: 12, fontWeight: 500, color: T.onSurfaceLow }}>{label}</span>
      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        style={{
          height: 40, borderRadius: T.radiusMd, border: `1.5px solid ${T.stroke}`,
          background: T.surfaceContainer, padding: '0 10px', fontSize: 13,
          color: T.onSurface, outline: 'none', fontFamily: "'Switzer', sans-serif"
        }}
      />
    </div>
  );
}

export function BuilderButton({ label = 'Action', variant = 'primary' }: { label?: string; variant?: 'primary' | 'secondary' }) {
  return (
    <button style={{
      width: '100%', height: 42, borderRadius: T.radiusMd,
      background: variant === 'primary' ? T.primary : T.surface,
      color: variant === 'primary' ? T.onPrimary : T.onSurface,
      border: variant === 'primary' ? 'none' : `1px solid ${T.stroke}`,
      fontSize: 13, fontWeight: 500,
      fontFamily: "'Poppins', sans-serif",
      cursor: 'pointer'
    }}>{label}</button>
  );
}

export function BuilderCard({ title = 'Card Title', subtitle }: { title?: string; subtitle?: string }) {
  return (
    <div style={{
      padding: 12, borderRadius: T.radiusMd, background: T.surface,
      border: `1px solid ${T.stroke}`, marginBottom: 8
    }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: T.onSurface }}>{title}</div>
      {subtitle && <div style={{ fontSize: 11, color: T.onSurfaceLow, marginTop: 2 }}>{subtitle}</div>}
    </div>
  );
}

export function BuilderAmountDisplay({ amount = '0.00', currency = 'ETB' }: { amount?: string; currency?: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '10px 0' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 6 }}>
        <span style={{ fontFamily: "'Switzer', sans-serif", fontSize: 40, fontWeight: 700, letterSpacing: '-1.5px', color: T.onSurface }}>{amount}</span>
        <span style={{ fontFamily: "'Switzer', sans-serif", fontSize: 16, fontWeight: 500, color: T.onSurfaceLow, borderLeft: `2px solid ${T.stroke}`, paddingLeft: 6 }}>{currency}</span>
      </div>
    </div>
  );
}

export function BuilderPinInput({ length = 4, filled = 0 }: { length?: number; filled?: number }) {
  return (
    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', padding: '8px 0' }}>
      {Array.from({ length }).map((_, i) => (
        <div key={i} style={{
          width: 44, height: 50, borderRadius: T.radiusMd, background: T.surface,
          border: `2px solid ${i < filled ? 'transparent' : i === filled ? T.primary : T.stroke}`,
          display: 'grid', placeItems: 'center', boxShadow: T.shadowSoft
        }}>
          {i < filled && <div style={{ width: 13, height: 13, borderRadius: '50%', background: T.onSurface }} />}
        </div>
      ))}
    </div>
  );
}

export function BuilderTransactionRow({ title = 'Transaction', subtitle, amount, positive = false }: { title?: string; subtitle?: string; amount?: string; positive?: boolean }) {
  const accent = positive ? T.success : T.primary;
  const tint = positive ? T.successContainer : T.primaryContainer;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: T.surface, borderRadius: T.radiusLg, border: `1px solid ${T.stroke}`, marginBottom: 8 }}>
      <div style={{ width: 40, height: 40, borderRadius: T.radiusMd, background: tint, display: 'grid', placeItems: 'center', flexShrink: 0, fontFamily: "'Switzer', sans-serif", fontWeight: 700, fontSize: 13, color: accent }}>{title.slice(0, 1).toUpperCase()}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.onSurface }}>{title}</div>
        {subtitle && <div style={{ fontSize: 11, color: T.onSurfaceLow, marginTop: 2 }}>{subtitle}</div>}
      </div>
      {amount && <span style={{ fontFamily: "'Switzer', sans-serif", fontSize: 13, fontWeight: 700, color: accent, flexShrink: 0 }}>{amount}</span>}
    </div>
  );
}

export function BuilderContactRow({ name = 'Contact', detail, initials }: { name?: string; detail?: string; initials?: string }) {
  const ini = initials || name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: T.surface, borderRadius: T.radiusLg, border: `1px solid ${T.stroke}`, marginBottom: 8 }}>
      <div style={{ width: 42, height: 42, borderRadius: '50%', background: T.primaryContainer, border: `2px solid ${T.primary}`, display: 'grid', placeItems: 'center', flexShrink: 0, fontFamily: "'Switzer', sans-serif", fontWeight: 700, fontSize: 14, color: T.primary }}>{ini}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.onSurface }}>{name}</div>
        {detail && <div style={{ fontSize: 11, color: T.onSurfaceLow, marginTop: 2 }}>{detail}</div>}
      </div>
    </div>
  );
}

export function BuilderToggle({ label = 'Setting', on = false }: { label?: string; on?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 14px', background: T.surface, borderRadius: T.radiusMd, border: `1px solid ${T.stroke}`, marginBottom: 8 }}>
      <span style={{ fontSize: 13, fontWeight: 500, color: T.onSurface }}>{label}</span>
      <div style={{ width: 40, height: 22, borderRadius: 11, background: on ? T.primary : T.stroke, padding: 2, flexShrink: 0 }}>
        <div style={{ width: 18, height: 18, borderRadius: '50%', background: T.surface, transform: on ? 'translateX(18px)' : 'translateX(0)', transition: 'transform 0.2s', boxShadow: T.shadowSoft }} />
      </div>
    </div>
  );
}

/**
 * id -> component function (not element), so the TemplateRenderer can apply each
 * template instance's props. Both buttons reuse BuilderButton with a locked variant.
 * The canonical id list + metadata lives in lib/builder-registry.ts.
 */
export const builderComponents: Record<string, ComponentType<any>> = {
  'status-bar': BuilderStatusBar,
  'header-nav': BuilderHeader,
  'input-field': BuilderInput,
  'amount-display': BuilderAmountDisplay,
  'pin-input': BuilderPinInput,
  'contact-row': BuilderContactRow,
  'transaction-row': BuilderTransactionRow,
  'toggle': BuilderToggle,
  'primary-button': (props: any) => <BuilderButton variant="primary" {...props} />,
  'secondary-button': (props: any) => <BuilderButton variant="secondary" {...props} />,
  'card': BuilderCard,
};
