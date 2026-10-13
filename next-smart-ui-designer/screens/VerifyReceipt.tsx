'use client';
import { C } from '@/screens/_shared/tokens';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';

export function VerifyReceiptScreen() {
  const [live, setLive] = useState(false);
  const [flash, setFlash] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);
  const [receiptCode, setReceiptCode] = useState('PP-2104XYZ');
  const [resultCode, setResultCode] = useState('PP-2104XYZ');
  const [resultOpen, setResultOpen] = useState(false);
  const [hint, setHint] = useState("Scan the QR or transaction code on an M-PESA receipt to confirm it's genuine.");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let mounted = true;
    async function startCamera() {
      if (!navigator.mediaDevices?.getUserMedia) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (!mounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        setLive(true);
      } catch {
        setLive(false);
      }
    }
    startCamera();
    return () => {
      mounted = false;
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  function showResult(code: string) {
    setResultCode(code || 'PP-2104XYZ');
    setResultOpen(true);
  }

  function closeResult() {
    setResultOpen(false);
    setHint("Scan the QR or transaction code on an M-PESA receipt to confirm it's genuine.");
  }

  function simulateScan() {
    setHint('Code detected — verifying…');
    window.setTimeout(() => showResult('MP-9988ABC'), 700);
  }

  function verifyCode() {
    const code = (receiptCode || 'PP-2104XYZ').trim().toUpperCase();
    setManualOpen(false);
    showResult(code);
  }

  return (
    <PhoneFrame>
      <div style={{ position: 'relative', height: '100%', background: 'radial-gradient(120% 90% at 50% 30%, #2a2a31 0%, #161619 55%, #0a0a0c 100%)', overflow: 'hidden', fontFamily: "'Inter', sans-serif" }}>
        <video ref={videoRef} autoPlay playsInline muted style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: live ? 'block' : 'none' }} />
        {!live && <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(40% 30% at 25% 25%, rgba(255,255,255,0.06), transparent), radial-gradient(35% 25% at 75% 70%, rgba(254,53,61,0.08), transparent)', filter: 'blur(2px)' }} />}

        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px' }}>
          <button onClick={() => { streamRef.current?.getTracks().forEach((track) => track.stop()); }} style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.16)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg viewBox="0 0 24 24" width="20" height="20" stroke={C.surface} strokeWidth="2" fill="none"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
          <span style={{ color: C.surface, fontSize: 14, fontWeight: 600, fontFamily: "'Switzer', sans-serif" }}>10:00</span>
          <button onClick={() => setFlash((v) => !v)} aria-label="Flash" style={{ width: 40, height: 40, borderRadius: '50%', background: flash ? C.primary : 'rgba(255,255,255,0.16)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg viewBox="0 0 24 24" width="20" height="20" stroke={C.surface} strokeWidth="2" fill="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
          </button>
        </div>

        <div style={{ position: 'absolute', top: 64, left: 0, right: 0, textAlign: 'center', zIndex: 5, color: C.surface, fontFamily: "'Switzer', sans-serif", fontSize: 16, fontWeight: 600 }}>Verify Receipt</div>

        <div style={{ position: 'absolute', top: '50%', left: '50%', width: 196, height: 252, transform: 'translate(-50%, -56%)', borderRadius: 18, boxShadow: '0 0 0 9999px rgba(0,0,0,0.55)' }}>
          {['tl', 'tr', 'bl', 'br'].map((corner) => (
            <span key={corner} style={{ position: 'absolute', width: 32, height: 32, border: `4px solid ${C.surface}`, ...(corner === 'tl' ? { top: -2, left: -2, borderRight: 'none', borderBottom: 'none', borderRadius: '18px 0 0 0' } : corner === 'tr' ? { top: -2, right: -2, borderLeft: 'none', borderBottom: 'none', borderRadius: '0 18px 0 0' } : corner === 'bl' ? { bottom: -2, left: -2, borderRight: 'none', borderTop: 'none', borderRadius: '0 0 0 18px' } : { bottom: -2, right: -2, borderLeft: 'none', borderTop: 'none', borderRadius: '0 0 18px 0' }) }} />
          ))}
          <div style={{ position: 'absolute', left: 10, right: 10, top: 12, height: 3, borderRadius: 3, background: `linear-gradient(90deg, transparent, ${C.primary}, transparent)`, boxShadow: '0 0 14px 2px rgba(254,53,61,0.7)', animation: 'scanMove 2.2s ease-in-out infinite' }} />
        </div>

        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 150, zIndex: 5, textAlign: 'center', color: 'rgba(255,255,255,0.85)', fontFamily: "'Switzer', sans-serif", fontSize: 13, fontWeight: 400, padding: '0 38px', lineHeight: 1.5 }}>{hint}</div>

        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 5, padding: '22px 28px 30px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 36 }}>
          <div onClick={simulateScan} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: 'rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" width="22" height="22" stroke={C.surface} strokeWidth="2" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.9)', fontFamily: "'Switzer', sans-serif", fontSize: 11, fontWeight: 500 }}>Gallery</span>
          </div>
          <div onClick={() => setManualOpen(true)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: 'rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" width="22" height="22" stroke={C.surface} strokeWidth="2" fill="none"><rect x="2" y="4" width="20" height="16" rx="2" /><line x1="6" y1="9" x2="6" y2="9.01" /><line x1="10" y1="9" x2="10" y2="9.01" /><line x1="14" y1="9" x2="14" y2="9.01" /><line x1="18" y1="9" x2="18" y2="9.01" /><line x1="6" y1="14" x2="18" y2="14" /></svg>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.9)', fontFamily: "'Switzer', sans-serif", fontSize: 11, fontWeight: 500 }}>Enter Code</span>
          </div>
        </div>

        {/* Manual entry backdrop */}
        {manualOpen && (
          <div
            onClick={() => setManualOpen(false)}
            style={{ position: 'absolute', inset: 0, zIndex: 18, background: 'rgba(0,0,0,0.45)', cursor: 'pointer' }}
          />
        )}

        {/* Manual entry sheet */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 20, background: C.surface, borderRadius: '24px 24px 30px 30px', padding: '14px 20px 26px', transform: manualOpen ? 'translateY(0)' : 'translateY(120%)', visibility: manualOpen ? 'visible' : 'hidden', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), visibility 0.35s', boxShadow: '0 -8px 32px rgba(0,0,0,0.25)' }}>
          {/* Back button above card - only visible when card is open */}
          {manualOpen && (
            <button
              onClick={() => setManualOpen(false)}
              aria-label="Back"
              style={{
                position: 'absolute', top: -54, left: 16, width: 42, height: 42,
                border: 'none', borderRadius: '50%', background: '#FFF',
                boxShadow: '0 4px 14px rgba(15,23,42,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" stroke={C.onSurface} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div style={{ width: 40, height: 4, background: '#D8D8DD', borderRadius: 2, margin: '0 auto 16px' }} />
          <div style={{ color: C.onSurface, fontFamily: "'Switzer', sans-serif", fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Enter Transaction ID</div>
          <input value={receiptCode} onChange={(e) => setReceiptCode(e.target.value)} placeholder="e.g. UH82LQNP5T" style={{ width: '100%', height: 52, border: `1.5px solid ${C.stroke}`, borderRadius: 14, padding: '0 16px', fontFamily: "'Switzer', sans-serif", fontSize: 16, fontWeight: 600, color: C.onSurface, letterSpacing: 1, outline: 'none', textTransform: 'uppercase' }} />
          <button onClick={verifyCode} style={{ width: '100%', height: 52, marginTop: 16, borderRadius: 14, border: 'none', background: C.primary, color: C.surface, fontFamily: "'Poppins', sans-serif", fontSize: 15, fontWeight: 500, cursor: 'pointer', boxShadow: '0 4px 12px rgba(254,53,61,0.3)' }}>Verify Receipt</button>
        </div>

        {/* Verification result dialog */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 30, background: 'radial-gradient(130% 90% at 20% 10%, #E82933 0%, #C41822 55%, #9E0F17 100%)', display: resultOpen ? 'flex' : 'none', flexDirection: 'column', overflowY: 'auto', padding: '14px 12px 20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: 28, overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,0.28)', display: 'flex', flexDirection: 'column', margin: 'auto 0' }}>
            <div style={{ background: 'linear-gradient(160deg, #10B952 0%, #059643 55%, #037A34 100%)', padding: '22px 18px 28px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <button onClick={closeResult} aria-label="Close" style={{ position: 'absolute', top: 16, left: 16, width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.22)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="#fff" strokeWidth="2.4" fill="none"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
              <div style={{ width: 68, height: 68, borderRadius: '50%', background: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '4px auto 14px' }}>
                <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                  <svg viewBox="0 0 24 24" width="26" height="26" stroke="#059643" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" fill="none"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
              </div>
              <h2 style={{ color: '#FFFFFF', fontFamily: "'Switzer', sans-serif", fontSize: 20, fontWeight: 700, margin: '0 0 4px', letterSpacing: '-0.2px' }}>Receipt Verified</h2>
              <p style={{ color: 'rgba(255,255,255,0.92)', fontFamily: "'Switzer', sans-serif", fontSize: 13, margin: 0 }}>Transaction details confirmed</p>
            </div>

            <div style={{ margin: '-14px 14px 0', background: '#FFFFFF', borderRadius: 20, padding: '18px 16px 14px', boxShadow: '0 8px 24px rgba(0,0,0,0.07)', position: 'relative', zIndex: 2 }}>
              <div style={{ textAlign: 'center', paddingBottom: 12, borderBottom: '1px solid #F1F1F5', marginBottom: 10 }}>
                <div style={{ color: '#8C8C99', fontSize: 11, fontWeight: 700, letterSpacing: '0.9px', textTransform: 'uppercase', marginBottom: 4 }}>AMOUNT</div>
                <div style={{ color: '#0F172A', fontFamily: "'Switzer', sans-serif", fontSize: 27, fontWeight: 800, letterSpacing: '-0.5px' }}>500.00 ETB</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7.5px 0', fontFamily: "'Switzer', sans-serif", fontSize: 13 }}>
                <span style={{ color: '#64748B' }}>Transaction ID</span>
                <span style={{ color: '#0F172A', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <span>{resultCode}</span>
                  <button onClick={() => navigator.clipboard?.writeText(resultCode)} title="Copy" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px', display: 'inline-flex' }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="#64748B" strokeWidth="2" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                  </button>
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7.5px 0', fontFamily: "'Switzer', sans-serif", fontSize: 13 }}><span style={{ color: '#64748B' }}>From</span><span style={{ color: '#0F172A', fontWeight: 600 }}>Aster Mequanent</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7.5px 0', fontFamily: "'Switzer', sans-serif", fontSize: 13 }}><span style={{ color: '#64748B' }}>To</span><span style={{ color: '#0F172A', fontWeight: 600 }}>Mom · 2517****78</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7.5px 0', fontFamily: "'Switzer', sans-serif", fontSize: 13 }}><span style={{ color: '#64748B' }}>Type</span><span style={{ color: '#0F172A', fontWeight: 600 }}>P2P Send Money</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7.5px 0', fontFamily: "'Switzer', sans-serif", fontSize: 13 }}><span style={{ color: '#64748B' }}>Date</span><span style={{ color: '#0F172A', fontWeight: 600 }}>08 May 2026, 10:15 AM</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7.5px 0', fontFamily: "'Switzer', sans-serif", fontSize: 13 }}>
                <span style={{ color: '#64748B' }}>Status</span>
                <span style={{ background: '#E8F9EE', color: '#16A34A', borderRadius: 999, padding: '3px 10px 3px 7px', fontSize: 11.5, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="#16A34A"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                  Successful
                </span>
              </div>
            </div>

            <div style={{ background: '#EAF8EE', border: '1px solid rgba(22,163,74,0.14)', borderRadius: 16, margin: '12px 14px 0', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: '#C8F0D3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="#16A34A"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" /></svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <b style={{ fontFamily: "'Switzer', sans-serif", fontSize: 13.5, fontWeight: 700, color: '#15803D' }}>Verification successful</b>
                <span style={{ fontFamily: "'Switzer', sans-serif", fontSize: 12, color: '#166534', lineHeight: 1.35 }}>The transaction details match the verified records.</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, margin: '14px 14px 0' }}>
              <button style={{ flex: 1, height: 46, borderRadius: 12, border: '1.5px solid #FE353D', background: '#FFFFFF', color: '#FE353D', fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, cursor: 'pointer' }}>
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="#FE353D" strokeWidth="2" fill="none"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
                <span>Share Receipt</span>
              </button>
              <button style={{ flex: 1, height: 46, borderRadius: 12, border: '1.5px solid #FE353D', background: '#FFFFFF', color: '#FE353D', fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, cursor: 'pointer' }}>
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="#FE353D" strokeWidth="2" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                <span>Download Receipt</span>
              </button>
            </div>

            <button onClick={closeResult} style={{ margin: '12px 14px 16px', height: 50, borderRadius: 14, border: 'none', background: C.primary, color: '#FFFFFF', fontFamily: "'Poppins', sans-serif", fontSize: 15, fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 14px rgba(254,53,61,0.35)' }}>Done</button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
