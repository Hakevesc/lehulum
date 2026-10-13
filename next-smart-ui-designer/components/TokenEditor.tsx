'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { Download, RotateCcw, Upload } from 'lucide-react';
import { themes, downloadJson } from '@/lib/registry';

type Overrides = Record<string, Record<string, string>>; // themeId -> { token: value }

const STORAGE_KEY = 'mpesa-token-overrides';
const kebab = (key: string) => key.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());

// Build a scoped <style> body so light/dark overrides stay theme-specific.
function buildCss(overrides: Overrides) {
  return Object.entries(overrides)
    .map(([themeId, tokens]) => {
      const decls = Object.entries(tokens)
        .map(([k, v]) => `  --color-${kebab(k)}: ${v};`)
        .join('\n');
      return decls ? `[data-theme='${themeId}'] {\n${decls}\n}` : '';
    })
    .filter(Boolean)
    .join('\n');
}

export function TokenEditor() {
  const { theme } = useTheme();
  const activeId = (theme === 'dark' ? 'dark' : 'light') as 'light' | 'dark';
  const [overrides, setOverrides] = useState<Overrides>({ light: {}, dark: {} });
  const [mounted, setMounted] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setOverrides(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let tag = document.getElementById('token-overrides') as HTMLStyleElement | null;
    if (!tag) {
      tag = document.createElement('style');
      tag.id = 'token-overrides';
      document.head.appendChild(tag);
    }
    tag.textContent = buildCss(overrides);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    } catch {
      /* ignore */
    }
  }, [overrides, mounted]);

  const baseColors = themes[activeId].colors;
  const mergedColors = useMemo(
    () => ({ ...baseColors, ...(overrides[activeId] ?? {}) }),
    [baseColors, overrides, activeId]
  );

  function setToken(key: string, value: string) {
    setOverrides((prev) => ({ ...prev, [activeId]: { ...(prev[activeId] ?? {}), [key]: value } }));
  }

  function resetTheme() {
    setOverrides((prev) => ({ ...prev, [activeId]: {} }));
  }

  function importJson(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(String(e.target?.result));
        const colors = (data.colors ?? data) as Record<string, string>;
        setOverrides((prev) => ({ ...prev, [activeId]: { ...colors } }));
      } catch {
        alert('Invalid token JSON file.');
      }
    };
    reader.readAsText(file);
  }

  if (!mounted) return null;

  return (
    <section className="card section-card">
      <div className="section-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div>
          <h2>Token Editor</h2>
          <p>Edit the <strong>{activeId}</strong> theme colors live — changes apply instantly and persist in this browser. Toggle the theme to edit the other set.</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <button className="secondary-button" onClick={() => fileRef.current?.click()}><Upload size={16} /> Import</button>
          <button className="secondary-button" onClick={() => downloadJson(`mpesa-${activeId}-tokens.json`, { id: activeId, colors: mergedColors })}><Download size={16} /> Export</button>
          <button className="secondary-button" onClick={resetTheme}><RotateCcw size={16} /> Reset</button>
        </div>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="application/json"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) importJson(file);
          e.currentTarget.value = '';
        }}
      />

      <div className="grid cols-3">
        {Object.entries(mergedColors).map(([key, value]) => {
          const isHex = /^#([0-9a-f]{3,8})$/i.test(value);
          const edited = overrides[activeId]?.[key] !== undefined;
          return (
            <div key={key} className="token-swatch" style={{ outline: edited ? '2px solid var(--color-primary)' : 'none' }}>
              <div className="swatch-preview" style={{ background: value }} />
              <div className="token-name">{key}{edited ? ' •' : ''}</div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 6 }}>
                {isHex && (
                  <input
                    type="color"
                    value={value.slice(0, 7)}
                    onChange={(e) => setToken(key, e.target.value)}
                    style={{ width: 28, height: 28, border: 'none', background: 'none', padding: 0, cursor: 'pointer', flexShrink: 0 }}
                    aria-label={`${key} color`}
                  />
                )}
                <input
                  value={value}
                  onChange={(e) => setToken(key, e.target.value)}
                  style={{ flex: 1, fontSize: 12, padding: '5px 7px', borderRadius: 8, border: '1px solid var(--color-stroke)', background: 'var(--color-surface)', color: 'var(--color-on-surface)', minWidth: 0 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
