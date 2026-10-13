'use client';
import { C } from '@/screens/_shared/tokens';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { ArrowLeftRight, Check, Copy, Download, Heart, RotateCcw, Share2, X } from 'lucide-react';
import { PhoneFrame } from '@/components/PhoneFrame';
import { ReceiptRow, StatusBar, SWITZER } from '@/screens/_shared';

/** A bottom-bar action (besides the always-present "Add to Favorite"). */
export type ReceiptAction = { icon: ReactNode; label: string; message: string };

export type ConfirmationReceiptProps = {
  /** Detail rows shown before the Transaction ID row (e.g. Type, Beneficiary, Sender). */
  details: { label: string; value: string }[];
  transactionId: string;
  dateTime: string;
  beneficiaryName: string;
  /** Pre-formatted amount string, e.g. "-950.00". */
  amount: string;
  currency: string;
  /** Data object encoded into the QR image. */
  qrData: Record<string, unknown>;
  /** Heading inside the receipt card. Default "Transaction Successful". */
  successHeading?: string;
  /** Bottom-bar actions after "Add to Favorite". Default: Send Again + Reverse. */
  extraActions?: ReceiptAction[];
};

const DEFAULT_EXTRA_ACTIONS: ReceiptAction[] = [
  { icon: <ArrowLeftRight size={24} color={C.primary} strokeWidth={2} />, label: 'Send Again', message: 'Preparing to send again…' },
  { icon: <RotateCcw size={24} color={C.primary} strokeWidth={2} />, label: 'Reverse', message: 'Reversal request submitted' }
];

/**
 * Shared transaction receipt used by every "* Confirmation" screen (bank, wallet,
 * and future merchant/bill). Ports Transaction Confirmation.html / Transfer to
 * Wallet_Confirmation.html — identical layout, differing only in the data rows.
 */
export function ConfirmationReceipt({ details, transactionId, dateTime, beneficiaryName, amount, currency, qrData, successHeading = 'Transaction Successful', extraActions = DEFAULT_EXTRA_ACTIONS }: ConfirmationReceiptProps) {
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(JSON.stringify(qrData))}&margin=10`;

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 2500);
  }

  function copyId() {
    navigator.clipboard?.writeText(transactionId).catch(() => {});
    setCopied(true);
    showToast('Transaction ID copied to clipboard');
    window.setTimeout(() => setCopied(false), 2000);
  }

  const headerIconBtn: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36,
    borderRadius: '50%', background: 'transparent', border: 'none', cursor: 'pointer'
  };

  return (
    <PhoneFrame>
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', background: C.background }}>
        <StatusBar />

        {/* Header */}
        <div style={{ flexShrink: 0, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: C.background }}>
          <button aria-label="Close" style={headerIconBtn}><X size={22} color={C.onSurface} strokeWidth={1.8} /></button>
          <span style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 17, fontWeight: 500, letterSpacing: '0.3px', flex: 1, textAlign: 'center' }}>Confirmation Receipt</span>
          <div style={{ display: 'flex', gap: 4 }}>
            <button aria-label="Share" onClick={() => showToast('Share link copied!')} style={headerIconBtn}><Share2 size={20} color={C.onSurface} strokeWidth={1.8} /></button>
            <button aria-label="Download" onClick={() => showToast('Downloading receipt as PDF…')} style={headerIconBtn}><Download size={20} color={C.onSurface} strokeWidth={1.8} /></button>
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: '100%', background: C.surface, borderRadius: 20, padding: '48px 20px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginTop: 32 }}>
            {/* Success icon overlapping top */}
            <div style={{ position: 'absolute', top: -32, left: '50%', transform: 'translateX(-50%)', width: 64, height: 64, borderRadius: '50%', background: C.success, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `4px solid ${C.background}`, zIndex: 10, boxShadow: '0 4px 12px rgba(31,200,59,0.3)' }}>
              <Check size={24} color={C.surface} strokeWidth={3} />
            </div>

            {/* Stamp watermark */}
            <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -40%)', width: 240, height: 240, opacity: 0.65, mixBlendMode: 'multiply', pointerEvents: 'none', zIndex: 5 }}>
              <img src="/assets/M-PESA-official_stamp.png" alt="M-PESA Stamp" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>

            {/* Receipt header */}
            <div style={{ textAlign: 'center', marginBottom: 20, position: 'relative', zIndex: 6 }}>
              <h2 style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 20, fontWeight: 700, marginBottom: 6, letterSpacing: '0.2px' }}>{successHeading}</h2>
              <p style={{ color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 12, fontWeight: 400, letterSpacing: '0.2px' }}>Thank you for Choosing M-PESA For All</p>
            </div>

            {/* Dashed divider with notches */}
            <div style={{ position: 'relative', width: 'calc(100% + 40px)', margin: '0 -20px 20px', borderTop: `2px dashed ${C.disabled}` }}>
              <span style={{ position: 'absolute', top: '50%', left: -10, transform: 'translateY(-50%)', width: 20, height: 20, background: C.background, borderRadius: '50%' }} />
              <span style={{ position: 'absolute', top: '50%', right: -10, transform: 'translateY(-50%)', width: 20, height: 20, background: C.background, borderRadius: '50%' }} />
            </div>

            {/* Details */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20, position: 'relative', zIndex: 6 }}>
              {details.map((d) => <ReceiptRow key={d.label} label={d.label} value={d.value} />)}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <span style={{ color: C.onSurfaceLow, fontFamily: SWITZER, fontSize: 12, fontWeight: 400, flexShrink: 0, maxWidth: 140 }}>Transaction ID</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end', flex: 1 }}>
                  <button onClick={copyId} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 6 }}>
                    <span style={{ color: copied ? C.success : C.primary, fontFamily: SWITZER, fontSize: 11, fontWeight: 500 }}>{copied ? 'Copied!' : 'Copy ID'}</span>
                    {copied ? <Check size={14} color={C.success} strokeWidth={2} /> : <Copy size={14} color={C.primary} strokeWidth={2} />}
                  </button>
                  <span style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 13, fontWeight: 500 }}>{transactionId}</span>
                </span>
              </div>
              <ReceiptRow label="Date and time" value={dateTime} />
            </div>

            {/* Amount + QR */}
            <div style={{ width: '100%', textAlign: 'center', paddingTop: 16, borderTop: '1px solid #F0F0F0', marginTop: 4, position: 'relative', zIndex: 6 }}>
              <div style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 15, fontWeight: 600, marginBottom: 8, letterSpacing: '0.2px' }}>{beneficiaryName}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
                <span style={{ color: C.primary, fontFamily: SWITZER, fontSize: 36, fontWeight: 700, letterSpacing: '-0.5px', lineHeight: 1 }}>{amount}</span>
                <span style={{ color: C.primary, fontFamily: SWITZER, fontSize: 16, fontWeight: 500, paddingLeft: 8, borderLeft: `2px solid ${C.primary}`, lineHeight: 1 }}>{currency}</span>
              </div>
              <div style={{ padding: 8, border: `3px solid ${C.primary}`, borderRadius: 16, background: C.surface, display: 'inline-block' }}>
                <img src={qrUrl} alt="Transaction QR Code" style={{ width: 80, height: 80, display: 'block' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom actions */}
        <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'space-around', padding: '8px 16px 10px', width: '100%', background: C.background, borderTop: '1px solid #E8E8E8' }}>
          {[
            { icon: <Heart size={24} color={C.primary} strokeWidth={2} fill={favorited ? C.primary : 'none'} />, label: 'Add to Favorite', onClick: () => { setFavorited(true); showToast('Added to favourites'); } },
            ...extraActions.map((a) => ({ icon: a.icon, label: a.label, onClick: () => showToast(a.message) }))
          ].map((a) => (
            <button key={a.label} onClick={a.onClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'transparent', border: 'none', cursor: 'pointer', flex: 1, padding: '6px 0' }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: C.onPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{a.icon}</div>
              <span style={{ color: C.onSurface, fontFamily: SWITZER, fontSize: 11, fontWeight: 500, letterSpacing: '0.1px' }}>{a.label}</span>
            </button>
          ))}
        </div>

        {/* Toast */}
        {toast && (
          <div style={{ position: 'absolute', bottom: 80, left: '50%', transform: 'translateX(-50%)', background: C.onSurface, color: C.surface, padding: '12px 24px', borderRadius: 12, fontFamily: SWITZER, fontSize: 13, fontWeight: 500, zIndex: 1000, boxShadow: '0 4px 16px rgba(0,0,0,0.2)', whiteSpace: 'nowrap' }}>
            {toast}
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}
