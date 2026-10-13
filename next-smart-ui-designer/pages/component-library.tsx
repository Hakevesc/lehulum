'use client';

import { useState } from 'react';
import { Check, Loader2, Sun, Moon, Search, X, Bell, Lock, Eye, EyeOff, Star } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { ThemeToggle } from '@/components/ThemeToggle';
import { components } from '@/lib/registry';
import { Icon } from '@/components/Icon';
import { PhoneFrame } from '@/components/PhoneFrame';
import { BannerSlider } from '@/components/BannerSlider';

function ButtonPreview() {
  const [shape, setShape] = useState<'normal' | 'half' | 'circle'>('normal');
  const [loading, setLoading] = useState(false);

  const radius = shape === 'normal' ? 14 : shape === 'half' ? 999 : '50%';

  return (
    <div className="card section-card">
      <div className="section-heading">
        <h2>Button Playground</h2>
        <p>Live preview for button variants, shapes and states.</p>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        <button className={shape === 'normal' ? 'primary-button' : 'secondary-button'} onClick={() => setShape('normal')}>Normal</button>
        <button className={shape === 'half' ? 'primary-button' : 'secondary-button'} onClick={() => setShape('half')}>Half Rectangle</button>
        <button className={shape === 'circle' ? 'primary-button' : 'secondary-button'} onClick={() => setShape('circle')}>Circle</button>
      </div>

      <div className="grid cols-3">
        <button className="primary-button" style={{ borderRadius: radius }} onClick={() => setLoading(true)}>
          {loading ? <Loader2 size={18} className="spin" /> : <Check size={18} />}
          Primary
        </button>
        <button className="secondary-button" style={{ borderRadius: radius }}>Secondary</button>
        <button className="secondary-button" style={{ borderRadius: radius, opacity: 0.5 }} disabled>Disabled</button>
        <button className="secondary-button" style={{ borderRadius: radius }}>Text Link</button>
        <button className="secondary-button" style={{ borderRadius: radius }}><Icon name="send" /> With Icon</button>
        <button className="icon-button" style={{ borderRadius: radius }}><Icon name="bell" /></button>
      </div>

      <pre style={{ background: 'var(--color-surface-container)', padding: 12, borderRadius: 12, marginTop: 16, fontSize: 12, overflow: 'auto' }}>
{`<button className="primary-button">Primary</button>
<button className="secondary-button">Secondary</button>
<button className="icon-button"><Bell /></button>
<button className="primary-button" disabled>Disabled</button>`}
      </pre>
    </div>
  );
}

function TogglePreview() {
  const [checked, setChecked] = useState(false);
  return (
    <div className="card section-card">
      <div className="section-heading">
        <h2>Toggle / Switch</h2>
        <p>Binary toggle for enabling or disabling settings.</p>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div onClick={() => setChecked(!checked)} style={{
          width: 44, height: 24, borderRadius: 12, cursor: 'pointer',
          background: checked ? 'var(--color-primary)' : 'var(--color-stroke)',
          padding: 2, transition: 'background 0.2s'
        }}>
          <div style={{
            width: 20, height: 20, borderRadius: 10, background: 'white',
            transform: checked ? 'translateX(20px)' : 'translateX(0)',
            transition: 'transform 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.15)'
          }} />
        </div>
        <span style={{ fontSize: 14 }}>{checked ? 'On' : 'Off'}</span>
      </div>
      <pre style={{ background: 'var(--color-surface-container)', padding: 12, borderRadius: 12, marginTop: 16, fontSize: 12, overflow: 'auto' }}>
{`const [checked, setChecked] = useState(false);
<div onClick={() => setChecked(!checked)}
  style={{ background: checked ? 'var(--color-primary)' : 'var(--color-stroke)', ... }}>
  <div style={{ transform: checked ? 'translateX(20px)' : 'translateX(0)', ... }} />
</div>`}
      </pre>
    </div>
  );
}

function PinInputPreview() {
  const [pin, setPin] = useState(['', '', '', '']);
  const [activeIndex, setActiveIndex] = useState(0);

  function handleKeyDown(e: React.KeyboardEvent, i: number) {
    if (e.key === 'Backspace') {
      const newPin = [...pin];
      newPin[i] = '';
      setPin(newPin);
      if (i > 0) setActiveIndex(i - 1);
    } else if (/^\d$/.test(e.key)) {
      const newPin = [...pin];
      newPin[i] = e.key;
      setPin(newPin);
      if (i < 3) setActiveIndex(i + 1);
    }
  }

  return (
    <div className="card section-card">
      <div className="section-heading">
        <h2>PIN Input</h2>
        <p>Four-box PIN entry. Click a box and type.</p>
      </div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
        {pin.map((digit, i) => (
          <div
            key={i}
            tabIndex={0}
            onFocus={() => setActiveIndex(i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            style={{
              width: 48, height: 56, borderRadius: 12, cursor: 'pointer',
              background: activeIndex === i ? 'var(--color-surface)' : 'var(--color-surface-container)',
              border: `2px solid ${activeIndex === i ? 'var(--color-primary)' : 'var(--color-stroke)'}`,
              display: 'grid', placeItems: 'center', fontSize: 22, fontWeight: 700,
              transition: 'border-color 0.15s'
            }}
          >
            {digit ? '●' : ''}
          </div>
        ))}
      </div>
      <pre style={{ background: 'var(--color-surface-container)', padding: 12, borderRadius: 12, marginTop: 16, fontSize: 12, overflow: 'auto' }}>
{`<div style={{ border: '2px solid var(--color-primary)' }}>
  {pin.map((d, i) => <div key={i}>{d ? '●' : ''}</div>)}
</div>`}
      </pre>
    </div>
  );
}

function ToastPreview() {
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState<'success' | 'error' | 'info'>('success');

  const colors = {
    success: { bg: '#E8F9EC', text: '#1FC83B', border: '#B7EFC5' },
    error: { bg: '#FFF1F2', text: '#FE353D', border: '#FFC7CA' },
    info: { bg: '#E8F4FF', text: '#2E90FA', border: '#B2DDFF' }
  };

  const c = colors[variant];

  return (
    <div className="card section-card">
      <div className="section-heading">
        <h2>Toast Messages</h2>
        <p>Success, error and info toasts with live preview.</p>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        <button className="primary-button" style={{ background: '#1FC83B' }} onClick={() => { setVariant('success'); setShow(true); }}>Success</button>
        <button className="primary-button" style={{ background: '#FE353D' }} onClick={() => { setVariant('error'); setShow(true); }}>Error</button>
        <button className="primary-button" style={{ background: '#2E90FA' }} onClick={() => { setVariant('info'); setShow(true); }}>Info</button>
      </div>

      {show && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 14, background: c.bg, border: `1px solid ${c.border}`, marginBottom: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: c.text + '20', display: 'grid', placeItems: 'center' }}>
            {variant === 'success' ? <Check size={16} color={c.text} /> : variant === 'error' ? <X size={16} color={c.text} /> : <Bell size={16} color={c.text} />}
          </div>
          <div style={{ flex: 1 }}>
            <strong style={{ fontSize: 13, display: 'block' }}>{variant === 'success' ? 'Success' : variant === 'error' ? 'Error' : 'Info'}</strong>
            <span style={{ fontSize: 12, color: 'var(--color-on-surface-low)' }}>{variant === 'success' ? 'Transaction completed successfully.' : variant === 'error' ? 'Something went wrong.' : 'Update available.'}</span>
          </div>
          <button className="icon-button" style={{ width: 28, height: 28 }} onClick={() => setShow(false)}><X size={14} /></button>
        </div>
      )}

      <pre style={{ background: 'var(--color-surface-container)', padding: 12, borderRadius: 12, marginTop: 16, fontSize: 12, overflow: 'auto' }}>
{`<div style={{ background: variant === 'success' ? '#E8F9EC' : '#FFF1F2' }}>
  <Check size={16} />
  <strong>Success</strong>
  <span>Transaction completed successfully.</span>
</div>`}
      </pre>
    </div>
  );
}

function CheckboxRadioPreview() {
  const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState('option1');
  return (
    <div className="card section-card">
      <div className="section-heading">
        <h2>Checkbox & Radio</h2>
        <p>Multi-select and single-select inputs.</p>
      </div>
      <div style={{ display: 'flex', gap: 24 }}>
        <div>
          <strong style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>Checkbox</strong>
          <div onClick={() => setChecked(!checked)} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <div style={{
              width: 20, height: 20, borderRadius: 6, display: 'grid', placeItems: 'center',
              background: checked ? 'var(--color-primary)' : 'transparent',
              border: `2px solid ${checked ? 'var(--color-primary)' : 'var(--color-stroke)'}`,
              transition: 'all 0.15s'
            }}>
              {checked && <Check size={14} color="white" strokeWidth={3} />}
            </div>
            <span style={{ fontSize: 14 }}>I agree to terms</span>
          </div>
        </div>
        <div>
          <strong style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>Radio</strong>
          {['Option 1', 'Option 2'].map((option, i) => (
            <div key={i} onClick={() => setSelected(`option${i + 1}`)} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 6 }}>
              <div style={{
                width: 20, height: 20, borderRadius: 10, display: 'grid', placeItems: 'center',
                border: `2px solid ${selected === `option${i + 1}` ? 'var(--color-primary)' : 'var(--color-stroke)'}`
              }}>
                {selected === `option${i + 1}` && <div style={{ width: 10, height: 10, borderRadius: 5, background: 'var(--color-primary)' }} />}
              </div>
              <span style={{ fontSize: 14 }}>{option}</span>
            </div>
          ))}
        </div>
      </div>
      <pre style={{ background: 'var(--color-surface-container)', padding: 12, borderRadius: 12, marginTop: 16, fontSize: 12, overflow: 'auto' }}>
{`// Checkbox
<div onClick={() => setChecked(!checked)}>
  <div>{checked && <Check />}</div>
  <span>I agree to terms</span>
</div>

// Radio
<div onClick={() => setSelected(option)}>
  <div>{selected && <div />}</div>
  <span>{option}</span>
</div>`}
      </pre>
    </div>
  );
}

function EmptyStatePreview() {
  return (
    <div className="card section-card">
      <div className="section-heading">
        <h2>Empty State</h2>
        <p>Placeholder for empty lists like notifications, favourites or statements.</p>
      </div>
      <div style={{ textAlign: 'center', padding: 32 }}>
        <div style={{ width: 64, height: 64, borderRadius: 20, background: 'var(--color-surface-container)', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}>
          <Bell size={28} color="var(--color-on-surface-low)" />
        </div>
        <h3 style={{ margin: '0 0 6px', fontSize: 18 }}>No Notifications</h3>
        <p style={{ margin: '0 0 20px', color: 'var(--color-on-surface-low)', fontSize: 14, lineHeight: 1.5 }}>You&apos;re all caught up! Check back later for updates.</p>
        <button className="primary-button">Refresh</button>
      </div>
      <pre style={{ background: 'var(--color-surface-container)', padding: 12, borderRadius: 12, marginTop: 16, fontSize: 12, overflow: 'auto' }}>
{`<div style={{ textAlign: 'center' }}>
  <Bell size={28} />
  <h3>No Notifications</h3>
  <p>You're all caught up!</p>
  <button className="primary-button">Refresh</button>
</div>`}
      </pre>
    </div>
  );
}

function BannerSliderPreview() {
  const DEMO_SLIDES = [
    { img: '/assets/banner-ads-1.png', title: 'Do it all with M-PESA', subtitle: 'Make payments quickly and conveniently.' },
    { img: '/assets/banner-ads-2.png', title: 'Send Money Anywhere', subtitle: 'Transfer to any M-PESA user instantly.' },
    { img: '/assets/banner-ads-3.png', title: 'Pay Bills Easily', subtitle: 'Settle your utilities and services in seconds.' }
  ];

  return (
    <div className="card section-card">
      <div className="section-heading">
        <h2>Banner Slider</h2>
        <p>Auto-playing promotional carousel with dot navigation.</p>
      </div>
      <div style={{ maxWidth: 360, margin: '0 auto' }}>
        <BannerSlider slides={DEMO_SLIDES} />
      </div>
      <pre style={{ background: 'var(--color-surface-container)', padding: 12, borderRadius: 12, marginTop: 16, fontSize: 12, overflow: 'auto' }}>
{`<BannerSlider slides={[
  { img: '/assets/banner-ads-1.png', title: 'Do it all', subtitle: 'Make payments' },
  ...
]} />`}
      </pre>
    </div>
  );
}

export default function ComponentLibraryPage() {
  return (
    <AppShell
      title="Component Library"
      subtitle="Reusable components, variants, props, states and token dependencies"
      actions={<ThemeToggle />}
    >
      <div className="grid">
        <h2 style={{ margin: 0 }}>Interactive Previews</h2>
        <p style={{ margin: '-12px 0 0', color: 'var(--color-on-surface-low)', fontSize: 13 }}>Live component playgrounds with code examples.</p>

        <ButtonPreview />
        <TogglePreview />
        <PinInputPreview />
        <ToastPreview />
        <CheckboxRadioPreview />
        <EmptyStatePreview />
        <BannerSliderPreview />

        <section className="card section-card">
          <div className="section-heading">
            <h2>Component Catalog</h2>
            <p>{components.length} components documented for migration. Click a category to filter.</p>
          </div>

          <div className="grid cols-2">
            {components.map((component) => (
              <article key={component.id} className="card section-card" style={{ boxShadow: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
                  <div>
                    <div className="pill">{component.category}</div>
                    <h3 style={{ margin: '12px 0 6px', fontSize: 18 }}>{component.name}</h3>
                    <p style={{ margin: 0, color: 'var(--color-on-surface-low)', lineHeight: 1.5 }}>{component.description}</p>
                  </div>
                </div>

                <div className="grid cols-2">
                  <div>
                    <strong style={{ fontSize: 12 }}>Props</strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                      {component.props.map((prop) => <span key={prop} className="pill">{prop}</span>)}
                    </div>
                  </div>
                  <div>
                    <strong style={{ fontSize: 12 }}>States</strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                      {component.states.map((state) => <span key={state} className="pill">{state}</span>)}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 14 }}>
                  <strong style={{ fontSize: 12 }}>Variants</strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                    {component.variants.map((variant) => <span key={variant} className="pill">{variant}</span>)}
                  </div>
                </div>

                <div style={{ marginTop: 14 }}>
                  <strong style={{ fontSize: 12 }}>Token Dependencies</strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                    {component.tokens.map((token) => <span key={token} className="pill">{token}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}