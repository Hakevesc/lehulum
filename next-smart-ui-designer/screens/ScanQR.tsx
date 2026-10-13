'use client';
import { C } from '@/screens/_shared/tokens';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';

export function ScanQRScreen() {
  const [live, setLive] = useState(false);
  const [flash, setFlash] = useState(false);
  const [detected, setDetected] = useState(false);
  const [hint, setHint] = useState('Point your camera at a merchant or M-PESA QR code to pay or receive.');
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
    const timer = window.setTimeout(() => {
      setHint('QR code detected');
      setDetected(true);
    }, 3000);
    return () => {
      mounted = false;
      window.clearTimeout(timer);
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  function simulateScan() {
    setHint('QR code detected');
    setDetected(true);
  }

  function rescan() {
    setDetected(false);
    setHint('Point your camera at a merchant or M-PESA QR code to pay or receive.');
  }

  return (
    <PhoneFrame>
      <div style={{ position: 'relative', height: '100%', background: 'radial-gradient(120% 90% at 50% 30%, #2a2a31 0%, #161619 55%, #0a0a0c 100%)', overflow: 'hidden', fontFamily: "'Inter', sans-serif" }}>
        <video ref={videoRef} autoPlay playsInline muted style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: live ? 'block' : 'none' }} />
        {!live && <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(40% 30% at 25% 25%, rgba(255,255,255,0.06), transparent), radial-gradient(35% 25% at 75% 70%, rgba(254,53,61,0.08), transparent)', filter: 'blur(2px)' }} />}

        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px' }}>
          <Link href="/presentation?screen=lehulum-home" style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.16)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg viewBox="0 0 24 24" width="20" height="20" stroke={C.surface} strokeWidth="2" fill="none"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </Link>
          <span style={{ color: C.surface, fontSize: 14, fontWeight: 600, fontFamily: "'Switzer', sans-serif" }}>10:00</span>
          <button onClick={() => setFlash((v) => !v)} aria-label="Flash" className={flash ? 'cam-icon-btn active' : 'cam-icon-btn'} style={{ width: 40, height: 40, borderRadius: '50%', background: flash ? C.primary : 'rgba(255,255,255,0.16)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg viewBox="0 0 24 24" width="20" height="20" stroke={C.surface} strokeWidth="2" fill="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
          </button>
        </div>

        <div style={{ position: 'absolute', top: 64, left: 0, right: 0, textAlign: 'center', zIndex: 5, color: C.surface, fontFamily: "'Switzer', sans-serif", fontSize: 16, fontWeight: 600 }}>Scan QR Code</div>

        <div style={{ position: 'absolute', top: '50%', left: '50%', width: 226, height: 226, transform: 'translate(-50%, -54%)', borderRadius: 26, boxShadow: '0 0 0 9999px rgba(0,0,0,0.55)' }}>
          {['tl', 'tr', 'bl', 'br'].map((corner) => (
            <span key={corner} style={{ position: 'absolute', width: 34, height: 34, border: `4px solid ${C.surface}`, ...(corner === 'tl' ? { top: -2, left: -2, borderRight: 'none', borderBottom: 'none', borderRadius: '26px 0 0 0' } : corner === 'tr' ? { top: -2, right: -2, borderLeft: 'none', borderBottom: 'none', borderRadius: '0 26px 0 0' } : corner === 'bl' ? { bottom: -2, left: -2, borderRight: 'none', borderTop: 'none', borderRadius: '0 0 0 26px' } : { bottom: -2, right: -2, borderLeft: 'none', borderTop: 'none', borderRadius: '0 0 26px 0' }) }} />
          ))}
          <div style={{ position: 'absolute', left: 10, right: 10, top: 12, height: 3, borderRadius: 3, background: `linear-gradient(90deg, transparent, ${C.primary}, transparent)`, boxShadow: '0 0 14px 2px rgba(254,53,61,0.7)', animation: 'scanMove 2.2s ease-in-out infinite' }} />
        </div>

        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 168, zIndex: 5, textAlign: 'center', color: 'rgba(255,255,255,0.85)', fontFamily: "'Switzer', sans-serif", fontSize: 13, fontWeight: 400, padding: '0 40px', lineHeight: 1.5 }}>{hint}</div>

        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 5, padding: '22px 28px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div onClick={simulateScan} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: 'rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" width="22" height="22" stroke={C.surface} strokeWidth="2" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.9)', fontFamily: "'Switzer', sans-serif", fontSize: 11, fontWeight: 500 }}>Gallery</span>
          </div>
          <Link href="/presentation?screen=my-qr-code" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: 'rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" width="22" height="22" stroke={C.surface} strokeWidth="2" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><line x1="14" y1="14" x2="14" y2="14.01" /><line x1="20" y1="14" x2="20" y2="14.01" /><line x1="14" y1="20" x2="14" y2="20.01" /><line x1="20" y1="20" x2="20" y2="20.01" /></svg>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.9)', fontFamily: "'Switzer', sans-serif", fontSize: 11, fontWeight: 500 }}>My Code</span>
          </Link>
        </div>

        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 20, background: C.surface, borderRadius: '24px 24px 30px 30px', padding: '14px 20px 26px', transform: detected ? 'translateY(0)' : 'translateY(110%)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)', boxShadow: '0 -8px 32px rgba(0,0,0,0.25)' }}>
          <div style={{ width: 40, height: 4, background: '#D8D8DD', borderRadius: 2, margin: '0 auto 16px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: `linear-gradient(135deg, ${C.success}, #4ADE80)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg viewBox="0 0 24 24" width="26" height="26" stroke={C.surface} strokeWidth="2" fill="none"><path d="M3 9l1-5h16l1 5" /><path d="M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9" /><path d="M9 13h6" /></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: C.onSurface, fontFamily: "'Switzer', sans-serif", fontSize: 16, fontWeight: 700 }}>London Cafe</div>
              <div style={{ color: C.onSurfaceLow, fontSize: 12, fontWeight: 400, marginTop: 2 }}>Merchant • Till 047281</div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: C.successContainer, color: C.success, borderRadius: 8, padding: '3px 9px', fontFamily: "'Switzer', sans-serif", fontSize: 11, fontWeight: 600, marginTop: 6 }}>
                <svg viewBox="0 0 24 24" width="12" height="12" stroke={C.success} strokeWidth="3" fill="none"><polyline points="20 6 9 17 4 12" /></svg>
                Verified merchant
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={rescan} style={{ flex: 1, height: 50, borderRadius: 14, border: 'none', cursor: 'pointer', fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 500, background: '#F2F2F4', color: C.onSurface }}>Rescan</button>
            <Link href="/presentation?screen=merchant-enter-amount" style={{ flex: 1, height: 50, borderRadius: 14, border: 'none', cursor: 'pointer', fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 500, background: C.primary, color: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(254,53,61,0.3)' }}>Pay Merchant</Link>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
