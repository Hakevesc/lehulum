'use client';
import { C } from '@/screens/_shared/tokens';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';

const BACKGROUND_IMAGES = ['/assets/first-visit-1.jpg', '/assets/first-visit-2.jpg', '/assets/first-visit-3.jpg', '/assets/first-visit-4.jpg'];

const CAROUSEL_SLIDES = [
  { title: ['Send Money', 'Instantly'], description: 'Transfer Birr to anyone, anywhere in seconds. No fees, no hassle.' },
  { title: ['Stay Connected', 'Always'], description: 'Buy voice, data, and SMS bundles for yourself or others instantly.' },
  { title: ['Skip the', 'Queue'], description: 'Pay your electricity, water, and other utility bills directly from your phone.' }
];

function StatusIcons() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
        <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9z" fill={C.surface} />
        <path d="M5 13l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" fill={C.surface} />
        <path d="M9 17l2 2c1.1-1.1 2.9-1.1 4 0l2-2c-2.21-2.21-5.79-2.21-8 0z" fill={C.surface} />
      </svg>
      <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
        <rect x="2" y="6" width="4" height="12" rx="1" fill={C.surface} />
        <rect x="8" y="4" width="4" height="14" rx="1" fill={C.surface} />
        <rect x="14" y="2" width="4" height="16" rx="1" fill={C.surface} />
        <rect x="20" y="0" width="4" height="18" rx="1" fill={C.surface} opacity="0.4" />
      </svg>
      <svg viewBox="0 0 28 14" fill="none" width="18" height="18">
        <rect x="0" y="1" width="22" height="12" rx="2.5" stroke={C.surface} strokeWidth="1.5" />
        <rect x="2" y="3" width="16" height="8" rx="1" fill={C.surface} />
        <rect x="24" y="4" width="2" height="6" rx="1" fill={C.surface} />
      </svg>
    </div>
  );
}

function OnboardingStatusBar() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px 8px' }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: C.surface, fontFamily: "'Switzer', sans-serif" }}>10:00</span>
      <StatusIcons />
    </div>
  );
}

function ButtonLink({ href, children, variant }: { href: string; children: React.ReactNode; variant: 'primary' | 'secondary' | 'white' }) {
  const baseStyle: React.CSSProperties = {
    width: '100%',
    height: 48,
    borderRadius: 12,
    fontFamily: "'Poppins', sans-serif",
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    transition: 'all 0.2s'
  };
  const variantStyle: React.CSSProperties = variant === 'primary'
    ? { background: C.primary, color: C.onPrimary, boxShadow: '0 4px 16px rgba(254,53,61,0.25)' }
    : variant === 'secondary'
      ? { background: C.surface, color: C.onSurface }
      : { background: C.surface, color: C.onSurface };

  return (
    <Link
      href={href}
      style={{ ...baseStyle, ...variantStyle }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-1px)';
        if (variant === 'primary') e.currentTarget.style.background = '#E5303A';
        if (variant === 'secondary' || variant === 'white') e.currentTarget.style.background = C.background;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        if (variant === 'primary') e.currentTarget.style.background = C.primary;
        if (variant === 'secondary' || variant === 'white') e.currentTarget.style.background = C.surface;
      }}
    >
      {children}
    </Link>
  );
}

function FirstVisitFrame({ backgroundImage, backgroundImages, children }: { backgroundImage?: string; backgroundImages?: string[]; children: React.ReactNode }) {
  const images = backgroundImages ?? (backgroundImage ? [backgroundImage] : []);

  return (
    <PhoneFrame>
      <div style={{ position: 'relative', height: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#111' }}>
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={index === 0}
            style={{
              objectFit: 'cover',
              objectPosition: 'center top',
              opacity: backgroundImage ? 1 : index === 0 ? 1 : 0,
              transition: 'opacity 0.55s ease',
              zIndex: 0
            }}
          />
        ))}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 160, background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '65%', background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.72) 40%, rgba(0,0,0,0.20) 75%, transparent 100%)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flex: 1, flexDirection: 'column' }}>
          {children}
        </div>
      </div>
    </PhoneFrame>
  );
}

export function FirstVisit1Screen() {
  return (
    <FirstVisitFrame backgroundImage="/assets/first-visit-1.jpg">
      <OnboardingStatusBar />
      <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 20px 0' }}>
        <Image src="/assets/M-PESA-white-logo.svg" alt="M-PESA" width={128} height={36} style={{ height: 36, width: 'auto', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))' }} />
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ padding: '0 24px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h1 style={{ color: C.surface, fontFamily: "'Switzer', sans-serif", fontSize: 28, fontWeight: 700, lineHeight: 1.25, marginBottom: 10, letterSpacing: '0.2px' }}>Welcome to<br />M-PESA Lehulum</h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontFamily: "'Switzer', sans-serif", fontSize: 15, fontWeight: 300, lineHeight: 1.5 }}>Your all-in-one mobile money app,<br />made just for you.</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 28 }}>
          <div style={{ width: 24, height: 8, borderRadius: 4, background: C.surface }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.40)' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.40)' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.40)' }} />
        </div>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ButtonLink href="/presentation?screen=first-visit-2" variant="primary">Get Started</ButtonLink>
          <ButtonLink href="/presentation?screen=auth-login" variant="secondary">Sign In</ButtonLink>
        </div>
      </div>
    </FirstVisitFrame>
  );
}

export function FirstVisit2Screen() {
  return <FirstVisitCarouselScreen initialSlide={0} />;
}

export function FirstVisit3Screen() {
  return <FirstVisitCarouselScreen initialSlide={1} />;
}

export function FirstVisit4Screen() {
  return <FirstVisitCarouselScreen initialSlide={2} />;
}

function FirstVisitCarouselScreen({ initialSlide }: { initialSlide: number }) {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsFading(true);
      const nextSlide = (currentSlide + 1) % CAROUSEL_SLIDES.length;
      const swapTimer = window.setTimeout(() => {
        setCurrentSlide(nextSlide);
        setIsFading(false);
      }, 280);
      return () => window.clearTimeout(swapTimer);
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [currentSlide]);

  const slide = CAROUSEL_SLIDES[currentSlide];

  return (
    <FirstVisitFrame backgroundImages={BACKGROUND_IMAGES.slice(1)}>
      <OnboardingStatusBar />
      <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 20px 0' }}>
        <Image src="/assets/M-PESA-white-logo.svg" alt="M-PESA" width={128} height={36} style={{ height: 36, width: 'auto', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))' }} />
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ padding: '0 24px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 24, width: '100%', opacity: isFading ? 0 : 1, transition: 'opacity 0.28s ease' }}>
          <h1 style={{ color: C.surface, fontFamily: "'Switzer', sans-serif", fontSize: 28, fontWeight: 700, lineHeight: 1.25, marginBottom: 10, letterSpacing: '0.2px' }}>{slide.title[0]}<br />{slide.title[1]}</h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontFamily: "'Switzer', sans-serif", fontSize: 15, fontWeight: 300, lineHeight: 1.5 }}>{slide.description}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 28 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.20)', flexShrink: 0 }} />
          {CAROUSEL_SLIDES.map((_, index) => (
            <div key={index} style={{ position: 'relative', width: index === currentSlide ? 24 : 8, height: 8, borderRadius: index === currentSlide ? 4 : '50%', background: index === currentSlide ? 'rgba(255,255,255,0.30)' : 'rgba(255,255,255,0.35)', overflow: 'hidden', flexShrink: 0 }}>
              {index === currentSlide && <div style={{ position: 'absolute', inset: 0, background: C.surface, borderRadius: 'inherit', animation: 'dotFill 2s linear forwards' }} />}
            </div>
          ))}
        </div>
        <ButtonLink href="/presentation?screen=auth-signup" variant="white">Sign Up</ButtonLink>
      </div>
    </FirstVisitFrame>
  );
}
