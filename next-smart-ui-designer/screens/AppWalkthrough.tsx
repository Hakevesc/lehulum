'use client';
import { C } from '@/screens/_shared/tokens';

import type { CSSProperties } from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { HomeScreenPreview } from '@/components/HomeScreenPreview';

type ElementMetrics = {
  top: number;
  left: number;
  width: number;
  height: number;
  centerX: number;
};

type WalkthroughStep = {
  id: string;
  text: string;
  position: 'top' | 'bottom';
};

const WALKTHROUGH_STEPS: WalkthroughStep[] = [
  { id: 'action-merchant', text: 'Scan and pay at any M-PESA merchant with ease.', position: 'top' },
  { id: 'action-bill', text: 'Pay electricity, water, TV and more bills in seconds.', position: 'top' },
  { id: 'action-credit', text: 'Access quick loans or manage your savings.', position: 'top' },
  { id: 'action-airtime', text: 'Top up your airtime or buy data bundles here.', position: 'top' },
  { id: 'action-transfer', text: 'Send money instantly to any phone number, bank.', position: 'top' },
  { id: 'balanceCard', text: 'Tap Add Money to deposit funds into your M-PESA wallet instantly.', position: 'bottom' },
  { id: 'qrFabBtn', text: 'Scan to pay merchants or receive money instantly.', position: 'top' },
  { id: 'eyeBtn', text: 'Tap here to show or hide your balance birr securely.', position: 'bottom' }
];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}

export function AppWalkthroughScreen() {
  const frameRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [metrics, setMetrics] = useState<Record<string, ElementMetrics>>({});
  const [tooltipStyle, setTooltipStyle] = useState<CSSProperties & { '--arrow-left'?: string }>({});
  const [handStyle, setHandStyle] = useState<CSSProperties>({});

  useEffect(() => {
    const timer = window.setTimeout(() => setShowWalkthrough(true), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showWalkthrough) return;
    const timer = window.setInterval(() => {
      setCurrentStep((step) => {
        if (step >= WALKTHROUGH_STEPS.length - 1) {
          setShowWalkthrough(false);
          return step;
        }
        return step + 1;
      });
    }, 2500);
    return () => window.clearInterval(timer);
  }, [showWalkthrough]);

  useEffect(() => {
    if (!showWalkthrough || !frameRef.current) return;

    const updateMetrics = () => {
      const frame = frameRef.current;
      if (!frame) return;
      const frameRect = frame.getBoundingClientRect();
      const nextMetrics: Record<string, ElementMetrics> = {};

      WALKTHROUGH_STEPS.forEach((step) => {
        const element = frame.querySelector(`[data-walkthrough-id="${step.id}"]`);
        if (!element) return;
        const rect = element.getBoundingClientRect();
        nextMetrics[step.id] = {
          top: rect.top - frameRect.top,
          left: rect.left - frameRect.left,
          width: rect.width,
          height: rect.height,
          centerX: rect.left - frameRect.left + rect.width / 2
        };
      });

      setMetrics(nextMetrics);
    };

    updateMetrics();
    window.addEventListener('resize', updateMetrics);
    return () => window.removeEventListener('resize', updateMetrics);
  }, [showWalkthrough, currentStep]);

  useLayoutEffect(() => {
    if (!showWalkthrough || !frameRef.current || !tooltipRef.current) return;
    const step = WALKTHROUGH_STEPS[currentStep];
    const element = metrics[step.id];
    if (!element) return;

    const frameRect = frameRef.current.getBoundingClientRect();
    const tooltipWidth = tooltipRef.current.offsetWidth || 220;
    const tooltipHeight = tooltipRef.current.offsetHeight || 80;
    const tooltipLeft = clamp(element.centerX - tooltipWidth / 2, 12, frameRect.width - tooltipWidth - 12);
    const tooltipTop = step.position === 'top'
      ? Math.max(12, element.top - tooltipHeight - 14)
      : Math.min(frameRect.height - tooltipHeight - 12, element.top + element.height + 14);
    const arrowLeft = clamp(element.centerX - tooltipLeft, 16, tooltipWidth - 16);
    const handTop = Math.min(frameRect.height - 44, element.top + element.height + 4);
    const handLeft = clamp(element.centerX - 18, 8, frameRect.width - 44);

    setTooltipStyle({
      top: tooltipTop,
      left: tooltipLeft,
      '--arrow-left': `${arrowLeft}px`
    });
    setHandStyle({ top: handTop, left: handLeft });
  }, [showWalkthrough, currentStep, metrics]);

  const step = WALKTHROUGH_STEPS[currentStep];
  const element = metrics[step?.id];

  return (
    <div ref={frameRef} style={{ position: 'relative', width: 360, height: 780 }}>
      <HomeScreenPreview />
      {showWalkthrough && element && step && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 9999, borderRadius: 30, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)' }} />
          <div
            style={{
              position: 'absolute',
              top: element.top - 8,
              left: element.left - 8,
              width: element.width + 16,
              height: element.height + 16,
              borderRadius: 16,
              background: 'transparent',
              pointerEvents: 'none',
              boxShadow: '0 0 0 9999px rgba(0,0,0,0.75), 0 0 30px rgba(254,53,61,0.5)',
              animation: 'spotlightPulse 2s ease-in-out infinite'
            }}
          />
          <button
            onClick={() => setShowWalkthrough(false)}
            style={{
              position: 'absolute',
              top: 50,
              right: 24,
              padding: '8px 20px',
              background: C.primary,
              color: C.surface,
              border: 'none',
              borderRadius: 20,
              fontFamily: "'Poppins', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              zIndex: 10002,
              boxShadow: '0 4px 12px rgba(254,53,61,0.3)'
            }}
          >
            Skip
          </button>
          <div
            ref={tooltipRef}
            style={{
              position: 'absolute',
              ...tooltipStyle,
              background: C.surface,
              borderRadius: 12,
              padding: '14px 18px',
              maxWidth: 220,
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              zIndex: 10001,
              animation: 'tooltipSlide 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: 12,
                height: 12,
                background: C.surface,
                transform: 'rotate(45deg)',
                boxShadow: '-2px -2px 4px rgba(0,0,0,0.1)',
                ...(step.position === 'top' ? { bottom: -6 } : { top: -6 }),
                left: (tooltipStyle as Record<string, string | undefined>)['--arrow-left'] ?? '50%',
                marginLeft: -6
              }}
            />
            <div style={{ fontFamily: "'Switzer', sans-serif", fontSize: 14, fontWeight: 500, color: C.onSurface, lineHeight: 1.5, textAlign: 'center' }}>
              {step.text}
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              ...handStyle,
              width: 36,
              height: 36,
              background: C.surface,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              zIndex: 10001,
              animation: 'handBounce 1.5s ease-in-out infinite'
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
              <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
              <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
              <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
              <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
            </svg>
          </div>
          <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 10002 }}>
            {WALKTHROUGH_STEPS.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentStep(index)}
                style={{
                  width: index === currentStep ? 20 : 6,
                  height: 6,
                  borderRadius: index === currentStep ? 3 : '50%',
                  background: index === currentStep ? C.primary : 'rgba(255,255,255,0.4)',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
