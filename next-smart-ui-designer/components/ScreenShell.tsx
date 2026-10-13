import type { ReactNode } from 'react';

interface ScreenShellProps {
  /** If true, renders the M-PESA gradient header with logo. Default: false */
  showAuthHeader?: boolean;
  authHeaderConfig?: {
    langOptions?: { label: string; value: string }[];
    onLangChange?: (lang: string) => void;
  };
  children: ReactNode;
  /** Padding override for the content area */
  contentPadding?: string;
  /** Background color for the phone screen */
  background?: string;
  /** If true, footer is stuck to bottom with auto margin-top */
  stickyFooter?: boolean;
  footer?: ReactNode;
}

const LANG_OPTIONS = [
  { label: 'English', value: 'English' },
  { label: 'አማርኛ', value: 'አማርኛ' },
  { label: 'Afaan Oromoo', value: 'Afaan Oromoo' },
  { label: 'ትግርኛ', value: 'ትግርኛ' },
  { label: 'Soomaali', value: 'Soomaali' }
];

export function ScreenShell({
  children,
  showAuthHeader = false,
  authHeaderConfig,
  contentPadding = '16px 20px 0',
  background = '#F5F5F5',
  stickyFooter = false,
  footer
}: ScreenShellProps) {
  return (
    <div className="phone-screen" style={{ background, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {showAuthHeader ? (
        <AuthHeader langOptions={authHeaderConfig?.langOptions ?? LANG_OPTIONS} />
      ) : (
        <StatusBar />
      )}
      <div className="phone-screen-content" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: contentPadding
      }}>
        {children}
        {stickyFooter && footer && (
          <div style={{ marginTop: 'auto', width: '100%' }}>{footer}</div>
        )}
        {!stickyFooter && footer}
      </div>
    </div>
  );
}

/* ───── Status Bar ───── */
export function StatusBar({ color = '#1C1C21', bg = '#F5F5F5' }: { color?: string; bg?: string }) {
  return (
    <div style={{
      height: 34, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '8px 24px 4px', background: bg,
      color, fontSize: 12, fontWeight: 700
    }}>
      <span>10:00</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9z" fill={color}/><path d="M5 13l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" fill={color}/><path d="M9 17l2 2c1.1-1.1 2.9-1.1 4 0l2-2c-2.21-2.21-5.79-2.21-8 0z" fill={color}/></svg>
        <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><rect x="2" y="6" width="4" height="12" rx="1" fill={color}/><rect x="8" y="4" width="4" height="14" rx="1" fill={color}/><rect x="14" y="2" width="4" height="16" rx="1" fill={color}/><rect x="20" y="0" width="4" height="18" rx="1" fill={color} opacity="0.3"/></svg>
        <svg viewBox="0 0 28 14" fill="none" width="16" height="14"><rect x="0" y="1" width="22" height="12" rx="2.5" stroke={color} strokeWidth="1.5"/><rect x="2" y="3" width="16" height="8" rx="1" fill={color}/><rect x="24" y="4" width="2" height="6" rx="1" fill={color}/></svg>
      </div>
    </div>
  );
}

/* ───── Auth Header (gradient + lang + logo) ───── */
function AuthHeader({ langOptions }: { langOptions: { label: string; value: string }[] }) {
  return (
    <div style={{
      position: 'relative', width: '100%', height: 200, flexShrink: 0,
      background: 'linear-gradient(160deg, #A41016 0%, #C41520 30%, #D32F2F 60%, #B71C1C 100%)',
      borderRadius: '0 0 30px 30px',
      display: 'flex', flexDirection: 'column', alignItems: 'center'
    }}>
      {/* Pattern overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.20, zIndex: 0,
        backgroundImage: 'url(/assets/M-PESA-pattern.svg)',
        backgroundSize: 490,
        backgroundPosition: 'right -270px top -270px',
        backgroundRepeat: 'no-repeat',
        borderRadius: '0 0 30px 30px',
        mixBlendMode: 'overlay'
      }} />
      {/* Status Bar */}
      <div style={{
        position: 'relative', zIndex: 5, width: '100%',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 24px 8px'
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#FFF', fontFamily: '\'Switzer\', sans-serif' }}>10:00</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9z" fill="#FFF"/><path d="M5 13l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" fill="#FFF"/><path d="M9 17l2 2c1.1-1.1 2.9-1.1 4 0l2-2c-2.21-2.21-5.79-2.21-8 0z" fill="#FFF"/></svg>
          <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><rect x="2" y="6" width="4" height="12" rx="1" fill="#FFF"/><rect x="8" y="4" width="4" height="14" rx="1" fill="#FFF"/><rect x="14" y="2" width="4" height="16" rx="1" fill="#FFF"/><rect x="20" y="0" width="4" height="18" rx="1" fill="#FFF" opacity="0.3"/></svg>
          <svg viewBox="0 0 28 14" fill="none" width="18" height="14"><rect x="0" y="1" width="22" height="12" rx="2.5" stroke="#FFF" strokeWidth="1.5"/><rect x="2" y="3" width="16" height="8" rx="1" fill="#FFF"/><rect x="24" y="4" width="2" height="6" rx="1" fill="#FFF"/></svg>
        </div>
      </div>
      {/* Language Selector */}
      <LanguageDropdown options={langOptions} />
      {/* M-PESA Logo */}
      <div style={{ position: 'absolute', top: '70%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
        <img src="/assets/M-PESA-white-logo.svg" alt="M-PESA" style={{ height: 40, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))' }} />
      </div>
    </div>
  );
}

/* ───── Language Dropdown ───── */
export function LanguageDropdown({ options }: { options: { label: string; value: string }[] }) {
  return null; // Simplified — rendered inline in each screen for now
}