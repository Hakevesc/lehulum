'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

export interface BannerSlide {
  img: string;
  title: string;
  subtitle: string;
}

const DEFAULT_BANNERS: BannerSlide[] = [
  { img: '/assets/banner-ads-1.png', title: 'Do it all with M-PESA', subtitle: 'Make payments quickly and conveniently.' },
  { img: '/assets/banner-ads-2.png', title: 'Send Money Anywhere', subtitle: 'Transfer to any M-PESA user instantly.' },
  { img: '/assets/banner-ads-3.png', title: 'Pay Bills Easily', subtitle: 'Settle your utilities and services in seconds.' }
];

export function BannerSlider({ slides = DEFAULT_BANNERS, autoPlayInterval = 4000 }: {
  slides?: BannerSlide[];
  autoPlayInterval?: number;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const stopAutoSlide = useCallback(() => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
      slideIntervalRef.current = null;
    }
  }, []);

  const startAutoSlide = useCallback(() => {
    stopAutoSlide();
    slideIntervalRef.current = setInterval(
      () => setCurrentSlide((p) => (p + 1) % slides.length),
      autoPlayInterval
    );
  }, [stopAutoSlide, slides.length, autoPlayInterval]);

  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, [startAutoSlide, stopAutoSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    stopAutoSlide();
    startAutoSlide();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
    stopAutoSlide();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      setCurrentSlide((p) => (p + (diff > 0 ? 1 : -1) + slides.length) % slides.length);
    }
    startAutoSlide();
  };

  return (
    <div className="banner-slider" style={{
      width: 'calc(100% - 32px)',
      maxWidth: '328px',
      height: '110px',
      margin: '16px auto 0',
      borderRadius: 16,
      overflow: 'hidden',
      position: 'relative',
      background: '#F5F5F5',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)'
    }}>
      <div
        className="banner-slides-container"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={stopAutoSlide}
        onMouseLeave={startAutoSlide}
      >
        {slides.map((banner, i) => (
          <div
            key={i}
            className={`banner-slide ${i === currentSlide ? 'active' : ''}`}
            style={{
              position: 'absolute',
              top: 0,
              width: '100%',
              height: '100%',
              opacity: i === currentSlide ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
              pointerEvents: i === currentSlide ? 'auto' : 'none',
              zIndex: i === currentSlide ? 1 : 0
            }}
          >
            <div className="banner-image" style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1
            }}>
              <Image
                src={banner.img}
                alt={banner.title}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                priority={i === 0}
              />
            </div>
            {/* M-PESA red gradient overlay */}
            <div className="banner-overlay" style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, rgba(254,53,61,0.85) 0%, rgba(254,53,61,0.5) 40%, rgba(196,21,32,0.15) 70%, transparent 100%)',
              zIndex: 2
            }} />
            <div className="banner-content" style={{
              position: 'relative',
              zIndex: 3,
              padding: '14px 16px',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <h3 className="banner-title" style={{
                color: '#FFF',
                fontSize: 15,
                fontWeight: 700,
                lineHeight: 1.3,
                letterSpacing: '0.2px',
                maxWidth: '70%',
                margin: 0
              }}>
                {banner.title}
              </h3>
              <p className="banner-subtitle" style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: 11,
                fontWeight: 400,
                lineHeight: 1.4,
                maxWidth: '65%',
                margin: '4px 0 0'
              }}>
                {banner.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="banner-dots" style={{
        position: 'absolute',
        bottom: 8,
        right: 12,
        display: 'flex',
        gap: 6,
        zIndex: 4
      }}>
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(i)}
            style={{
              width: i === currentSlide ? 18 : 6,
              height: 6,
              borderRadius: i === currentSlide ? 3 : '50%',
              background: i === currentSlide ? '#FFF' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
}