'use client';

import { useMemo, useState } from 'react';
import {
  AlertTriangle, ArrowDownLeft, ArrowLeftRight, ArrowUpRight, Banknote, Bell, BellRing,
  Building2, Calendar, Check, ChevronDown, ChevronRight, CircleCheck, Clock, Coins, Copy,
  CreditCard, Download, Eye, EyeOff, FileText, Fingerprint, Heart, HelpCircle, Home, Info,
  Landmark, LayoutGrid, Lock, Phone, Plus, QrCode, Receipt, RotateCcw, Scan, ScanLine, Search,
  Send, Settings, Share2, ShieldCheck, Smartphone, Sparkles, Star, User, UserCircle, Users,
  Wallet, X
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconSet: { name: string; Icon: LucideIcon }[] = [
  { name: 'home', Icon: Home }, { name: 'send', Icon: Send }, { name: 'coins', Icon: Coins },
  { name: 'banknote', Icon: Banknote }, { name: 'wallet', Icon: Wallet }, { name: 'credit-card', Icon: CreditCard },
  { name: 'receipt', Icon: Receipt }, { name: 'scan', Icon: Scan }, { name: 'scan-line', Icon: ScanLine },
  { name: 'qr-code', Icon: QrCode }, { name: 'building-2', Icon: Building2 }, { name: 'landmark', Icon: Landmark },
  { name: 'arrow-left-right', Icon: ArrowLeftRight }, { name: 'arrow-up-right', Icon: ArrowUpRight },
  { name: 'arrow-down-left', Icon: ArrowDownLeft }, { name: 'bell', Icon: Bell }, { name: 'bell-ring', Icon: BellRing },
  { name: 'user', Icon: User }, { name: 'user-circle', Icon: UserCircle }, { name: 'users', Icon: Users },
  { name: 'settings', Icon: Settings }, { name: 'lock', Icon: Lock }, { name: 'shield-check', Icon: ShieldCheck },
  { name: 'fingerprint', Icon: Fingerprint }, { name: 'eye', Icon: Eye }, { name: 'eye-off', Icon: EyeOff },
  { name: 'search', Icon: Search }, { name: 'plus', Icon: Plus }, { name: 'check', Icon: Check },
  { name: 'circle-check', Icon: CircleCheck }, { name: 'x', Icon: X }, { name: 'chevron-right', Icon: ChevronRight },
  { name: 'chevron-down', Icon: ChevronDown }, { name: 'copy', Icon: Copy }, { name: 'download', Icon: Download },
  { name: 'share-2', Icon: Share2 }, { name: 'star', Icon: Star }, { name: 'heart', Icon: Heart },
  { name: 'clock', Icon: Clock }, { name: 'calendar', Icon: Calendar }, { name: 'help-circle', Icon: HelpCircle },
  { name: 'info', Icon: Info }, { name: 'alert-triangle', Icon: AlertTriangle }, { name: 'phone', Icon: Phone },
  { name: 'smartphone', Icon: Smartphone }, { name: 'sparkles', Icon: Sparkles }, { name: 'rotate-ccw', Icon: RotateCcw },
  { name: 'layout-grid', Icon: LayoutGrid }, { name: 'file-text', Icon: FileText }
];

const avatars = ['avatar-1', 'avatar-2', 'avatar-3', 'avatar-4', 'avatar-5', 'avatar-6'];
const initials = [
  { text: 'AM', tone: 'var(--color-primary)' },
  { text: 'KB', tone: '#2E90FA' },
  { text: 'HC', tone: '#1FC83B' },
  { text: 'YG', tone: '#FFB020' }
];
const logos = [
  { label: 'M-PESA Red', src: '/assets/M-PESA-red-logo.svg', bg: '#FFFFFF' },
  { label: 'M-PESA White', src: '/assets/M-PESA-white-logo.svg', bg: 'var(--color-primary)' },
  { label: 'Fayda', src: '/assets/fayda-logo-hq.png', bg: '#FFFFFF' }
];
const bankLogos = [
  'cbe-logo', 'abyssinya-bank', 'awass-bank', 'dashen-bank', 'amhara-bank', 'coop-bank',
  'nib-bank', 'oromia-i-bank', 'wegagen-bank', 'zemen-bank', 'Hibret-bank', 'telebirr',
  'cbe-birr', 'kacha'
];
const banners = ['banner-ads-1', 'banner-ads-2', 'banner-ads-3'];

const enc = (p: string) => encodeURI(p);

export function MediaRegistry() {
  const [query, setQuery] = useState('');
  const [size, setSize] = useState(24);
  const [stroke, setStroke] = useState(2);
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = useMemo(
    () => iconSet.filter((i) => i.name.includes(query.trim().toLowerCase())),
    [query]
  );

  function copy(name: string) {
    navigator.clipboard?.writeText(name).catch(() => {});
    setCopied(name);
    setTimeout(() => setCopied((c) => (c === name ? null : c)), 1200);
  }

  return (
    <>
      {/* ===== Icons ===== */}
      <section className="card section-card">
        <div className="section-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <h2>Icon System</h2>
            <p>Lucide icon registry — {iconSet.length} icons. Click any icon to copy its name.</p>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 4 }}>
              {[16, 20, 24, 32].map((s) => (
                <button key={s} className={s === size ? 'primary-button' : 'secondary-button'} style={{ padding: '6px 10px' }} onClick={() => setSize(s)}>{s}</button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {[1.5, 2, 2.5].map((w) => (
                <button key={w} className={w === stroke ? 'primary-button' : 'secondary-button'} style={{ padding: '6px 10px' }} onClick={() => setStroke(w)}>{w}px</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ position: 'relative', marginBottom: 16, maxWidth: 320 }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-on-surface-low)' }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search icons…"
            style={{ width: '100%', padding: '9px 12px 9px 34px', borderRadius: 10, border: '1px solid var(--color-stroke)', background: 'var(--color-surface)', color: 'var(--color-on-surface)' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))', gap: 10 }}>
          {filtered.map(({ name, Icon }) => (
            <button
              key={name}
              onClick={() => copy(name)}
              className="token-swatch"
              style={{ alignItems: 'center', textAlign: 'center', cursor: 'pointer', gap: 8, padding: 12 }}
              title={`Copy "${name}"`}
            >
              <Icon size={size} strokeWidth={stroke} color="var(--color-on-surface)" />
              <span className="token-value" style={{ fontSize: 10 }}>{copied === name ? 'copied!' : name}</span>
            </button>
          ))}
          {filtered.length === 0 && <p style={{ color: 'var(--color-on-surface-low)' }}>No icons match “{query}”.</p>}
        </div>
      </section>

      {/* ===== Avatars ===== */}
      <section className="card section-card">
        <div className="section-heading">
          <h2>Avatars</h2>
          <p>Image avatars, initials avatars and size variants.</p>
        </div>

        <strong style={{ fontSize: 12 }}>Image avatars</strong>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', margin: '10px 0 22px' }}>
          {avatars.map((a) => (
            <img key={a} src={`/assets/avatars/${a}.png`} alt={a} width={52} height={52} style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-surface)', boxShadow: 'var(--shadow-soft)' }} />
          ))}
        </div>

        <strong style={{ fontSize: 12 }}>Initials avatars</strong>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', margin: '10px 0 22px' }}>
          {initials.map((a) => (
            <div key={a.text} style={{ width: 52, height: 52, borderRadius: '50%', display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 800, background: `linear-gradient(135deg, ${a.tone}, color-mix(in srgb, ${a.tone} 70%, #000))` }}>{a.text}</div>
          ))}
        </div>

        <strong style={{ fontSize: 12 }}>Size variants</strong>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 10 }}>
          {[28, 36, 44, 56, 72].map((s) => (
            <img key={s} src="/assets/avatars/avatar-2.png" alt="size" width={s} height={s} style={{ width: s, height: s, borderRadius: '50%', objectFit: 'cover' }} />
          ))}
        </div>
      </section>

      {/* ===== Images & Logos ===== */}
      <section className="card section-card">
        <div className="section-heading">
          <h2>Images & Logos</h2>
          <p>Brand logos, partner logos, bank logos and marketing banners.</p>
        </div>

        <strong style={{ fontSize: 12 }}>Brand & partner logos</strong>
        <div className="grid cols-3" style={{ margin: '10px 0 22px' }}>
          {logos.map((logo) => (
            <div key={logo.label} className="token-swatch">
              <div style={{ height: 64, borderRadius: 12, display: 'grid', placeItems: 'center', background: logo.bg, border: '1px solid var(--color-stroke)' }}>
                <img src={enc(logo.src)} alt={logo.label} style={{ maxWidth: '70%', maxHeight: 40, objectFit: 'contain' }} />
              </div>
              <div className="token-name">{logo.label}</div>
            </div>
          ))}
        </div>

        <strong style={{ fontSize: 12 }}>Bank & wallet logos</strong>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))', gap: 10, margin: '10px 0 22px' }}>
          {bankLogos.map((b) => (
            <div key={b} className="token-swatch" style={{ padding: 10, alignItems: 'center' }} title={b}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: '#fff', border: '1px solid var(--color-stroke)', display: 'grid', placeItems: 'center', padding: 6 }}>
                <img src={enc(`/assets/banks logo/${b}.png`)} alt={b} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
            </div>
          ))}
        </div>

        <strong style={{ fontSize: 12 }}>Banners</strong>
        <div className="grid cols-3" style={{ marginTop: 10 }}>
          {banners.map((b) => (
            <img key={b} src={`/assets/${b}.png`} alt={b} style={{ width: '100%', borderRadius: 14, border: '1px solid var(--color-stroke)' }} />
          ))}
        </div>
      </section>
    </>
  );
}
