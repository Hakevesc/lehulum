'use client';
import { C } from '@/screens/_shared/tokens';

import { useEffect, useRef, useState } from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';

const BARLOW = "'Barlow', sans-serif";
const GLASS: React.CSSProperties = { background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 16, boxSizing: 'border-box' };

const ESSENTIAL_CLAIMS = ['Birthdate', 'Address', 'Gender', 'Nationality', 'Full Name', 'Phone Number', 'Picture'];

function mmss(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function FaydaStepsScreen() {
  const [step, setStep] = useState<'fan' | 'otp' | 'consent'>('fan');
  const [fan, setFan] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSecs, setOtpSecs] = useState(291);
  const [otpExpired, setOtpExpired] = useState(false);
  const [otpRound, setOtpRound] = useState(0);
  const [consentSecs, setConsentSecs] = useState(591);
  const [emailOn, setEmailOn] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const digits = fan.replace(/\D/g, '');
  const fanReady = digits.length >= 1;
  const validHint = digits.length === 12 ? '✓ Valid 12-digit FAN' : digits.length === 16 ? '✓ Valid 16-digit FCN' : '';
  const otpComplete = otp.every((d) => d.length === 1);
  const maskedPhone = 'XXXXXX' + (digits.slice(-4) || '9403');

  // OTP resend countdown (restarts on step entry and on resend)
  useEffect(() => {
    if (step !== 'otp') return;
    setOtpSecs(291);
    setOtpExpired(false);
    const id = setInterval(() => {
      setOtpSecs((s) => {
        if (s <= 1) { clearInterval(id); setOtpExpired(true); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [step, otpRound]);

  // Consent session countdown
  useEffect(() => {
    if (step !== 'consent') return;
    setConsentSecs(591);
    const id = setInterval(() => {
      setConsentSecs((s) => {
        if (s <= 1) { clearInterval(id); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [step]);

  function onFan(v: string) {
    let d = v.replace(/\D/g, '');
    if (d.length > 16) d = d.slice(0, 16);
    const m = d.match(/\d{1,4}/g);
    setFan(m ? m.join(' ') : '');
  }

  function setOtpDigit(i: number, v: string) {
    const d = v.replace(/\D/g, '').slice(0, 1);
    setOtp((prev) => {
      const next = [...prev];
      next[i] = d;
      return next;
    });
    if (d && i < 5) inputs.current[i + 1]?.focus();
  }

  function onOtpKey(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      inputs.current[i - 1]?.focus();
      setOtp((prev) => { const n = [...prev]; n[i - 1] = ''; return n; });
    }
  }

  function resend() {
    setOtp(['', '', '', '', '', '']);
    setOtpRound((r) => r + 1);
    inputs.current[0]?.focus();
  }

  function reset() {
    setSuccess(false);
    setStep('fan');
    setFan('');
    setOtp(['', '', '', '', '', '']);
    setEmailOn(false);
  }

  const fullBtn = (label: string, enabled: boolean, onClick: () => void) => (
    <button onClick={enabled ? onClick : undefined} disabled={!enabled} style={{ width: '100%', padding: 16, borderRadius: 10, border: 'none', background: enabled ? '#1a5f72' : '#1e4f60', color: enabled ? C.surface : 'rgba(255,255,255,0.45)', fontFamily: BARLOW, fontSize: 15, fontWeight: 700, letterSpacing: '0.5px', cursor: enabled ? 'pointer' : 'not-allowed', boxShadow: enabled ? '0 6px 20px rgba(0,0,0,0.20)' : 'none', boxSizing: 'border-box' }}>{label}</button>
  );

  const logoStrip = (
    <div style={{ ...GLASS, padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, width: '100%', marginBottom: 14 }}>
      <img src="/assets/M-PESA-red-logo.svg" alt="M-PESA" style={{ height: 28, objectFit: 'contain', background: C.surface, borderRadius: 8, padding: '6px 12px' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
      <svg viewBox="0 0 28 20" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 16, stroke: 'rgba(255,255,255,0.70)' }}><polyline points="16,2 24,10 16,18" /><line x1="4" y1="10" x2="24" y2="10" /><polyline points="12,2 4,10 12,18" /></svg>
      <img src="/assets/fayda-logo-hq.png" alt="FAYDA" style={{ height: 36, objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
    </div>
  );

  return (
    <PhoneFrame>
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', background: '#1e5f6e', fontFamily: BARLOW }}>
        {/* Status bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px 8px', fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.90)', background: '#1a5568', flexShrink: 0 }}>
          <span>10:00</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <svg viewBox="0 0 24 24" style={{ width: 17, height: 17, fill: 'currentColor' }}><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" /></svg>
            <svg viewBox="0 0 24 24" style={{ width: 17, height: 17, fill: 'currentColor' }}><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" /></svg>
          </div>
        </div>

        {/* Nav */}
        <div style={{ background: C.surface, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button aria-label="Back" onClick={() => (step === 'otp' ? setStep('fan') : step === 'consent' ? setStep('otp') : undefined)} style={{ width: 34, height: 34, border: 'none', background: 'transparent', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#1e5f6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </button>
            <img src="/assets/fayda-logo-hq.png" alt="FAYDA" style={{ width: 36, height: 36, objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#1e6070', border: 'none', borderRadius: 22, padding: '7px 16px', cursor: 'pointer', fontFamily: BARLOW, fontSize: 13, fontWeight: 600, color: C.surface }}>
            English <svg viewBox="0 0 10 6" style={{ width: 11, height: 11, fill: C.surface }}><path d="M0 0l5 6 5-6z" /></svg>
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, position: 'relative', overflowY: 'auto', background: 'radial-gradient(ellipse at 90% 20%, rgba(255,255,255,0.05) 0%, transparent 50%), linear-gradient(145deg, #1a5568 0%, #2a7a8a 40%, #1e6070 70%, #163f50 100%)' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 5, padding: '20px 16px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>

            {/* STEP 1: FAN/FCN */}
            {step === 'fan' && (
              <div style={{ width: '100%' }}>
                {logoStrip}
                <div style={{ ...GLASS, padding: '24px 22px 28px', width: '100%' }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: C.surface, lineHeight: 1.35, margin: '0 0 22px 0', fontFamily: BARLOW }}>Enter your Fayda Number<br />(FAN or FCN)</h2>
                  <input value={fan} onChange={(e) => onFan(e.target.value)} placeholder="Enter Your FAN or FCN" style={{ width: '100%', padding: '14px 16px', border: `1.5px solid ${validHint ? '#2FC56D' : 'rgba(255,255,255,0.25)'}`, borderRadius: 10, background: 'rgba(255,255,255,0.92)', fontFamily: BARLOW, fontSize: 14, fontWeight: 500, color: '#1a1a1a', outline: 'none', marginBottom: 12, boxSizing: 'border-box' }} />
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: '#2FC56D', marginBottom: 8, minHeight: 18 }}>{validHint}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 22, cursor: 'pointer', width: 'fit-content' }}>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16, stroke: 'rgba(255,255,255,0.75)' }}><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.75)', textDecoration: 'underline' }}>What is FAN/FCN?</span>
                  </div>
                  {fullBtn('Send Code', fanReady, () => setStep('otp'))}
                </div>
              </div>
            )}

            {/* STEP 2: OTP */}
            {step === 'otp' && (
              <div style={{ width: '100%' }}>
                {logoStrip}
                <div style={{ ...GLASS, padding: '24px 22px 28px', width: '100%' }}>
                  <div style={{ width: '100%', padding: '12px 14px', border: '1.5px solid rgba(255,255,255,0.25)', borderRadius: 10, background: 'rgba(255,255,255,0.08)', fontFamily: BARLOW, fontSize: 15, fontWeight: 600, color: C.surface, marginBottom: 20, letterSpacing: 1, boxSizing: 'border-box' }}>{fan || 'FAN / FCN'}</div>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
                    {otp.map((d, i) => (
                      <input
                        key={i}
                        ref={(el) => { inputs.current[i] = el; }}
                        value={d}
                        inputMode="numeric"
                        maxLength={1}
                        onChange={(e) => setOtpDigit(i, e.target.value)}
                        onKeyDown={(e) => onOtpKey(i, e)}
                        style={{ width: 36, height: 44, border: 'none', borderBottom: `2px solid ${d ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.45)'}`, background: 'transparent', fontFamily: BARLOW, fontSize: 22, fontWeight: 700, color: C.surface, textAlign: 'center', outline: 'none', boxSizing: 'border-box' }}
                      />
                    ))}
                  </div>
                  {otpExpired && <div style={{ fontSize: 12, fontWeight: 600, color: '#e74c3c', textAlign: 'center', marginBottom: 6 }}>FAYDA OTP has expired. Tap Resend to get a new code.</div>}
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.60)', textAlign: 'center', margin: '0 0 20px 0', lineHeight: 1.5, fontFamily: BARLOW }}>Code sent to: <strong style={{ color: 'rgba(255,255,255,0.85)' }}>{maskedPhone}</strong></p>
                  {fullBtn('Verify', otpComplete && !otpExpired, () => setStep('consent'))}
                  <div style={{ textAlign: 'center', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.55)', marginTop: 12 }}>
                    {otpExpired ? (
                      <button onClick={resend} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.85)', fontFamily: BARLOW, fontSize: 12, fontWeight: 700, textDecoration: 'underline', cursor: 'pointer', padding: 0 }}>Resend code</button>
                    ) : (
                      <>Resend code in <span style={{ fontWeight: 700 }}>{mmss(otpSecs)}</span></>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: CONSENT */}
            {step === 'consent' && (
              <div style={{ width: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: 14 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.90)', margin: '0 0 4px 0', fontFamily: BARLOW }}>Please take appropriate action in</p>
                  <div style={{ fontSize: 34, fontWeight: 800, color: consentSecs === 0 ? '#e74c3c' : '#e87722', letterSpacing: 2, fontVariantNumeric: 'tabular-nums' }}>{mmss(consentSecs)}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 16 }}>
                  <div style={{ background: C.surface, borderRadius: 50, padding: '8px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }}>
                    <img src="/assets/M-PESA-red-logo.svg" alt="M-PESA" style={{ height: 26, objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  </div>
                  <svg viewBox="0 0 28 22" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 18, stroke: 'rgba(255,255,255,0.65)' }}><polyline points="16,2 24,11 16,20" /><line x1="2" y1="11" x2="24" y2="11" /><polyline points="8,2 2,11 8,20" /></svg>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="/assets/fayda-logo-hq.png" alt="FAYDA" style={{ width: 44, height: 44, objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  </div>
                </div>
                <p style={{ fontSize: 15, fontWeight: 600, color: C.surface, textAlign: 'center', lineHeight: 1.55, margin: '0 0 18px 0', fontFamily: BARLOW }}><strong style={{ fontWeight: 800 }}>Fayda-partner-M-PESA</strong> is requesting<br />access to the following:</p>

                <div style={{ ...GLASS, background: 'rgba(255,255,255,0.08)', overflow: 'hidden', marginBottom: 12, width: '100%' }}>
                  <div style={{ padding: '12px 16px 10px', borderBottom: '1px solid rgba(255,255,255,0.10)' }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: C.surface, margin: 0, fontFamily: BARLOW }}>Essential Claims</h3>
                  </div>
                  <div style={{ padding: '0 16px' }}>
                    {ESSENTIAL_CLAIMS.map((c, i) => (
                      <div key={c} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 0', borderBottom: i === ESSENTIAL_CLAIMS.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.07)' }}>
                        <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.90)', fontFamily: BARLOW }}>{c}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.3px', fontFamily: BARLOW }}>Required</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ ...GLASS, background: 'rgba(255,255,255,0.08)', overflow: 'hidden', marginBottom: 12, width: '100%' }}>
                  <div style={{ padding: '12px 16px 10px', borderBottom: '1px solid rgba(255,255,255,0.10)' }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: C.surface, margin: 0, fontFamily: BARLOW }}>Voluntary Claims</h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px' }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.90)', fontFamily: BARLOW }}>Email Address</span>
                    <div onClick={() => setEmailOn((v) => !v)} style={{ position: 'relative', width: 40, height: 22, flexShrink: 0, cursor: 'pointer' }}>
                      <span style={{ position: 'absolute', inset: 0, background: emailOn ? '#2FC56D' : 'rgba(255,255,255,0.20)', borderRadius: 22, transition: 'background 0.2s' }} />
                      <span style={{ position: 'absolute', width: 16, height: 16, left: 3, top: 3, background: C.surface, borderRadius: '50%', transform: emailOn ? 'translateX(18px)' : 'translateX(0)', transition: 'transform 0.2s' }} />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12, width: '100%' }}>
                  <button onClick={reset} style={{ flex: 1, padding: 14, borderRadius: 50, border: '2px solid rgba(255,255,255,0.30)', background: 'rgba(255,255,255,0.08)', color: C.surface, fontFamily: BARLOW, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Decline</button>
                  <button onClick={() => setSuccess(true)} style={{ flex: 1, padding: 14, borderRadius: 50, border: 'none', background: '#163f50', color: C.surface, fontFamily: BARLOW, fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 6px 20px rgba(0,0,0,0.25)' }}>Accept</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ background: '#163f50', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>Powered by</span>
          <img src="/assets/fayda-logo-hq.png" alt="" style={{ height: 20, objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.75)' }}>Veri</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#e87722' }}>Fayda</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.55)' }}>2.0</span>
        </div>

        {/* Success overlay */}
        {success && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(35,145,80,0.95)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20, padding: 40, textAlign: 'center' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={C.surface} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            <h2 style={{ color: C.surface, fontSize: 24, fontWeight: 800, margin: 0, fontFamily: BARLOW }}>Verification Complete</h2>
            <p style={{ color: 'rgba(255,255,255,0.80)', fontSize: 15, lineHeight: 1.6, margin: 0, fontFamily: BARLOW }}>Your M-PESA account has been successfully linked with your FAYDA ID.</p>
            <button onClick={reset} style={{ marginTop: 10, padding: '14px 32px', borderRadius: 50, border: 'none', background: C.surface, color: '#239150', fontFamily: BARLOW, fontSize: 15, fontWeight: 800, cursor: 'pointer' }}>Continue</button>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}
