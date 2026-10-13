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

        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 20, background: C.surface, borderRadius: '24px 24px 30px 30px', padding: '14px 20px 26px', transform: manualOpen ? 'translateY(0)' : 'translateY(110%)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)', boxShadow: '0 -8px 32px rgba(0,0,0,0.25)' }}>
          <div style={{ width: 40, height: 4, background: '#D8D8DD', borderRadius: 2, margin: '0 auto 16px' }} />
          <div style={{ color: C.onSurface, fontFamily: "'Switzer', sans-serif", fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Enter Receipt Code</div>
          <div style={{ color: C.onSurfaceLow, fontSize: 12, marginBottom: 16 }}>Type the transaction ID printed on the receipt (e.g. PP-2104XYZ).</div>
          <input value={receiptCode} onChange={(e) => setReceiptCode(e.target.value)} placeholder="e.g. PP-2104XYZ" style={{ width: '100%', height: 52, border: `1.5px solid ${C.stroke}`, borderRadius: 14, padding: '0 16px', fontFamily: "'Switzer', sans-serif", fontSize: 16, fontWeight: 600, color: C.onSurface, letterSpacing: 1, outline: 'none', textTransform: 'uppercase' }} />
          <button onClick={verifyCode} style={{ width: '100%', height: 52, marginTop: 16, borderRadius: 14, border: 'none', background: C.primary, color: C.surface, fontFamily: "'Poppins', sans-serif", fontSize: 15, fontWeight: 500, cursor: 'pointer', boxShadow: '0 4px 12px rgba(254,53,61,0.3)' }}>Verify Receipt</button>
        </div>

        <div style={{ position: 'absolute', inset: 0, zIndex: 30, background: C.background, display: resultOpen ? 'flex' : 'none', flexDirection: 'column', overflowY: 'auto' }}>
          <div style={{ background: `linear-gradient(180deg, ${C.success} 0%, #19a832 100%)`, padding: '24px 20px 38px', textAlign: 'center', position: 'relative' }}>
            <button onClick={closeResult} aria-label="Close" style={{ position: 'absolute', top: 14, left: 16, width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg viewBox="0 0 24 24" width="20" height="20" stroke={C.surface} strokeWidth="2" fill="none"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '8px auto 12px' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="28" height="28" stroke={C.success} strokeWidth="3" fill="none"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
            </div>
            <h2 style={{ color: C.surface, fontFamily: "'Switzer', sans-serif", fontSize: 19, fontWeight: 700, margin: 0 }}>Receipt Verified</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 12.5, marginTop: 4 }}>This is a genuine M-PESA transaction</p>
          </div>

          <div style={{ margin: '-18px 20px 0', background: C.surface, borderRadius: 18, padding: 18, boxShadow: '0 8px 28px rgba(0,0,0,0.1)', position: 'relative' }}>
            <div style={{ textAlign: 'center', padding: '0 0 14px', borderBottom: `1px dashed ${C.stroke}`, marginBottom: 14 }}>
              <div style={{ color: C.onSurfaceLow, fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Amount</div>
              <div style={{ color: C.onSurface, fontFamily: "'Switzer', sans-serif", fontSize: 28, fontWeight: 700, marginTop: 4 }}>500.00 Birr</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0' }}><span style={{ color: C.onSurfaceLow, fontSize: 13 }}>Transaction ID</span><span style={{ color: C.onSurface, fontFamily: "'Switzer', sans-serif", fontSize: 13, fontWeight: 600 }}>{resultCode}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0' }}><span style={{ color: C.onSurfaceLow, fontSize: 13 }}>From</span><span style={{ color: C.onSurface, fontFamily: "'Switzer', sans-serif", fontSize: 13, fontWeight: 600 }}>Aster Mequanent</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0' }}><span style={{ color: C.onSurfaceLow, fontSize: 13 }}>To</span><span style={{ color: C.onSurface, fontFamily: "'Switzer', sans-serif", fontSize: 13, fontWeight: 600 }}>Mom · 2517****78</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0' }}><span style={{ color: C.onSurfaceLow, fontSize: 13 }}>Type</span><span style={{ color: C.onSurface, fontFamily: "'Switzer', sans-serif", fontSize: 13, fontWeight: 600 }}>P2P Send Money</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0' }}><span style={{ color: C.onSurfaceLow, fontSize: 13 }}>Date</span><span style={{ color: C.onSurface, fontFamily: "'Switzer', sans-serif", fontSize: 13, fontWeight: 600 }}>08 May 2026, 10:15 AM</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0' }}><span style={{ color: C.onSurfaceLow, fontSize: 13 }}>Status</span><span style={{ color: C.success, fontFamily: "'Switzer', sans-serif", fontSize: 13, fontWeight: 600 }}>Successful</span></div>
            <div style={{ position: 'absolute', right: 14, bottom: 64, width: 100, opacity: 0.9, transform: 'rotate(-12deg)' }}>
              <Image src="/assets/M-PESA-official_stamp.png" alt="Official" width={100} height={100} style={{ width: '100%' }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '16px 20px 0', background: C.successContainer, borderRadius: 12, padding: '12px 14px' }}>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke={C.success} strokeWidth="2.5" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>
            <span style={{ color: '#168a2c', fontFamily: "'Switzer', sans-serif", fontSize: 12, fontWeight: 500, lineHeight: 1.4 }}>We checked this code against M-PESA's records. The amount, parties and timestamp all match.</span>
          </div>

          <div style={{ padding: '18px 20px 26px', marginTop: 'auto' }}>
            <button onClick={closeResult} style={{ width: '100%', height: 52, borderRadius: 14, border: 'none', background: C.primary, color: C.surface, fontFamily: "'Poppins', sans-serif", fontSize: 15, fontWeight: 500, cursor: 'pointer', boxShadow: '0 4px 12px rgba(254,53,61,0.3)' }}>Done</button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
