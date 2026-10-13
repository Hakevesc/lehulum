'use client';
import { C } from '@/screens/_shared/tokens';

import { useState, useRef, useEffect } from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';

export function AuthLoginScreen() {
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('Language');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [pinAttempts, setPinAttempts] = useState(0);
  const langRef = useRef<HTMLDivElement>(null);
  const LANGUAGES = ['English', 'አማርኛ', 'Afaan Oromoo', 'ትግርኛ', 'Soomaali'];
  const CORRECT_PIN = '1234';

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key >= '0' && e.key <= '9' && pin.length < 4) {
        setPin(p => p + e.key);
      } else if (e.key === 'Backspace' && pin.length > 0) {
        setPin(p => p.slice(0, -1));
      } else if (e.key === 'Enter' && pin.length === 4) {
        handleSubmit();
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [pin.length]);

  function pressKey(value: string) {
    if (pin.length < 4) { setPin(p => p + value); setError(''); }
  }

  function pressBackspace() {
    if (pin.length > 0) { setPin(p => p.slice(0, -1)); setError(''); }
  }

  function handleSubmit() {
    if (pin === CORRECT_PIN) {
      setPinAttempts(0);
      setError('');
    } else {
      const attempts = pinAttempts + 1;
      setPinAttempts(attempts);
      setPin('');
      if (attempts >= 3) {
        setError('PIN Locked');
      } else {
        const remaining = 3 - attempts;
        setError(remaining === 1 ? 'Incorrect PIN. Last attempt before lock.' : `Incorrect PIN. ${remaining} attempts remaining.`);
      }
    }
  }

  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        {/* Header */}
        <div style={{ position: 'relative', width: '100%', height: 262, flexShrink: 0, background: C.headerGradient, borderRadius: '0 0 30px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.20, zIndex: 0, backgroundImage: 'url(/assets/M-PESA-pattern.svg)', backgroundSize: 490, backgroundPosition: 'right -270px top -270px', backgroundRepeat: 'no-repeat', borderRadius: '0 0 30px 30px', mixBlendMode: 'overlay' }} />
          <div style={{ position: 'relative', zIndex: 5, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px 8px' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.surface, fontFamily: "'Switzer', sans-serif" }}>10:00</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9z" fill={C.surface}/><path d="M5 13l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" fill={C.surface}/><path d="M9 17l2 2c1.1-1.1 2.9-1.1 4 0l2-2c-2.21-2.21-5.79-2.21-8 0z" fill={C.surface}/></svg>
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><rect x="2" y="6" width="4" height="12" rx="1" fill={C.surface}/><rect x="8" y="4" width="4" height="14" rx="1" fill={C.surface}/><rect x="14" y="2" width="4" height="16" rx="1" fill={C.surface}/><rect x="20" y="0" width="4" height="18" rx="1" fill={C.surface} opacity="0.3"/></svg>
              <svg viewBox="0 0 28 14" fill="none" width="18" height="14"><rect x="0" y="1" width="22" height="12" rx="2.5" stroke={C.surface} strokeWidth="1.5"/><rect x="2" y="3" width="16" height="8" rx="1" fill={C.surface}/><rect x="24" y="4" width="2" height="6" rx="1" fill={C.surface}/></svg>
            </div>
          </div>
          <div ref={langRef} style={{ position: 'relative', zIndex: 20, alignSelf: 'flex-start', marginLeft: 20, marginTop: 4 }}>
            <div onClick={() => setLangOpen(!langOpen)} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', padding: '6px 10px', borderRadius: 8 }}>
              <div style={{ width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/assets/change_language_icon.svg" alt="Language" style={{ width: 20, height: 20, objectFit: 'contain' }} />
              </div>
              <span style={{ color: C.surface, fontFamily: "'switzer', sans-serif", fontSize: 12, fontWeight: 400, letterSpacing: '0.24px', textTransform: 'uppercase' }}>{currentLang}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14, color: C.surface, transform: langOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            {langOpen && (
              <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, width: 160, background: C.surface, borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.15)', overflow: 'hidden', zIndex: 100 }}>
                {LANGUAGES.map((lang) => (
                  <div key={lang} onClick={() => { setCurrentLang(lang); setLangOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', fontSize: 13, fontWeight: lang === currentLang ? 600 : 500, color: lang === currentLang ? C.primary : C.onSurface, cursor: 'pointer', background: lang === currentLang ? C.onPrimary : 'transparent' }}>
                    {lang}
                    {lang === currentLang && (
                      <svg viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16, marginLeft: 'auto' }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ position: 'absolute', top: '47%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
            <img src="/assets/M-PESA-white-logo.svg" alt="M-PESA" style={{ height: 40, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))' }} />
          </div>
          {/* User Info */}
          <div style={{ position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', border: '2.5px solid rgba(255,255,255,0.9)', overflow: 'hidden', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
              <img src="/assets/avatars/avatar-1.png" alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <span style={{ color: C.surface, fontFamily: "'Switzer', sans-serif", fontSize: 14, fontWeight: 400, letterSpacing: '0.5px', textTransform: 'capitalize' }}>Welcome Back,</span>
              <span style={{ color: C.surface, fontFamily: "'Switzer', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: '0.5px', whiteSpace: 'nowrap', textTransform: 'capitalize' }}>Zemedkun Kidane</span>
              <span style={{ color: C.surface, fontFamily: "'Switzer', sans-serif", fontSize: 14, fontWeight: 400, letterSpacing: '0.28px', textTransform: 'uppercase' }}>+251 77 00 24 23</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 20px 0', width: '100%' }}>
          {/* PIN Input */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, justifyContent: 'center', maxHeight: 110, marginTop: 10 }}>
            <span style={{ color: C.onSurface, fontFamily: "'Switzer', sans-serif", fontSize: 14, fontWeight: 500, marginBottom: 8 }}>Enter your PIN</span>
            <div style={{ display: 'flex', gap: 14 }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{
                  width: 56, height: 56, borderRadius: 16,
                  border: `2px solid ${error ? C.primary : i < pin.length ? C.primary : i === pin.length ? C.primary : C.stroke}`,
                  background: C.surface,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: i === pin.length ? '0 0 0 3px rgba(254,53,61,0.10)' : 'none',
                  animation: error ? 'none' : 'none'
                }}>
                  {i < pin.length ? <div style={{ width: 14, height: 14, borderRadius: '50%', background: C.onSurface }} /> : null}
                </div>
              ))}
            </div>
            <div style={{ color: error ? (error === 'PIN Locked' ? C.primary : '#F59E0B') : C.primary, fontFamily: "'Switzer', sans-serif", fontSize: 12, fontWeight: 500, textAlign: 'center', minHeight: 18, marginTop: 8, visibility: error ? 'visible' : 'hidden' }}>
              {error}
            </div>
          </div>

          {/* Keypad — matching shared component-keypad.css */}
          <div style={{
            background: C.surface,
            borderRadius: 20,
            padding: '20px 16px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            width: '100%',
            marginBottom: 8
          }}>
            {['1','2','3','4','5','6','7','8','9','','0',''].map((val, i) => {
              if (val === '') {
                if (i === 9) return <div key={i} />;
                if (i === 11) return (
                  <button key={i} onClick={pressBackspace}
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 16, border: 'none', background: 'transparent', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                    onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.95)'; e.currentTarget.style.background = 'rgba(0,0,0,0.06)'; }}
                    onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'transparent'; }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke={C.onSurfaceLow} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}>
                      <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/>
                    </svg>
                  </button>
                );
                return <div key={i} />;
              }
              return (
                <button key={i} onClick={() => pressKey(val)}
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 16, border: 'none', background: 'transparent', color: C.onSurface, fontSize: 26, fontWeight: 500, fontFamily: "'Inter', sans-serif", cursor: 'pointer', position: 'relative', overflow: 'hidden', userSelect: 'none', WebkitTapHighlightColor: 'transparent' }}
                  onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.95)'; e.currentTarget.style.background = 'rgba(0,0,0,0.06)'; }}
                  onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'transparent'; }}>
                  {val}
                </button>
              );
            })}
          </div>

          {/* Continue Button */}
          <button disabled={pin.length < 4}
            onClick={handleSubmit}
            style={{ display: 'flex', width: 328, maxWidth: '100%', height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 12, background: pin.length < 4 ? C.disabled : C.primary, color: pin.length < 4 ? C.onSurfaceLow : C.onPrimary, fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 400, border: 'none', cursor: pin.length < 4 ? 'default' : 'pointer', marginTop: 12, marginBottom: 8, boxShadow: pin.length < 4 ? 'none' : '0 4px 16px rgba(254,53,61,0.25)', transition: 'all 0.2s' }}>
            Continue
          </button>

          {/* Footer Links */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, paddingBottom: 10, width: '100%' }}>
            <a style={{ color: C.primary, fontSize: 11, fontWeight: 600, textDecoration: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>Forgot PIN?</a>
            <div style={{ width: 1, height: 12, background: '#D0D0D0' }} />
            <a style={{ display: 'flex', alignItems: 'center', gap: 3, color: C.onSurfaceLow, fontSize: 11, fontWeight: 400, textDecoration: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Contact Us
            </a>
            <div style={{ width: 1, height: 12, background: '#D0D0D0' }} />
            <a style={{ display: 'flex', alignItems: 'center', gap: 3, color: C.onSurfaceLow, fontSize: 11, fontWeight: 400, textDecoration: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              Terms and Conditions
            </a>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}