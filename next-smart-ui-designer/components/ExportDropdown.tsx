'use client';

import { useEffect, useRef, useState } from 'react';
import { Boxes, Download, FileJson, ImageIcon, Palette, Smartphone } from 'lucide-react';
import { components, designTokens, downloadJson, screens, themes } from '@/lib/registry';
import { exportPhonePreviewAsPng } from '@/lib/export';
import { exportPhoneToFigmaJson } from '@/lib/figma-export';

function buildFigmaTokens() {
  const collections = Object.values(themes).map((theme) => ({
    name: `M-PESA / ${theme.label}`,
    modes: [theme.id],
    variables: Object.entries(theme.colors).map(([name, value]) => ({
      name: name.replace(/[A-Z]/g, (m) => '/' + m.toLowerCase()),
      type: 'COLOR',
      valuesByMode: { [theme.id]: value }
    }))
  }));
  return {
    version: designTokens.version,
    exportedFrom: 'mpesa-smart-ui-designer',
    type: 'figma-variables',
    collections,
    primitives: {
      spacing: designTokens.spacing,
      radius: designTokens.radius,
      shadow: designTokens.shadow
    }
  };
}

export function ExportDropdown() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  async function exportPng() {
    setOpen(false);
    let node: HTMLElement | null = null;
    try {
      const iframe = document.querySelector('iframe') as HTMLIFrameElement | null;
      node = (iframe?.contentDocument?.querySelector('.phone-frame') as HTMLElement | null) ?? null;
    } catch {
      node = null;
    }
    if (!node) node = document.querySelector('.phone-frame') as HTMLElement | null;
    await exportPhonePreviewAsPng(node, 'mpesa-screen.png');
  }

  function pick(action: () => void) {
    setOpen(false);
    action();
  }

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 10px',
          borderRadius: 8,
          border: 'none',
          background: '#1C1C21',
          color: '#FFFFFF',
          cursor: 'pointer',
          fontSize: 12,
          fontWeight: 600,
          whiteSpace: 'nowrap',
          width: '100%',
          justifyContent: 'center',
          transition: 'opacity 0.15s'
        }}
      >
        <Download size={14} />
        Export
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          // open upward: the Export button sits at the very bottom of the sidebar,
          // so a downward menu would render off-screen and get cropped
          bottom: 'calc(100% + 4px)',
          left: 0,
          right: 0,
          background: '#FFFFFF',
          border: '1px solid var(--color-stroke, #E8E8EC)',
          borderRadius: '10px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.16)',
          overflow: 'hidden',
          maxHeight: 'min(60vh, 320px)',
          overflowY: 'auto',
          zIndex: 30
        }}>
          <button onClick={exportPng} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px',
            border: 0, borderBottom: '1px solid #E8E8EC', background: 'transparent', cursor: 'pointer',
            textAlign: 'left', fontSize: 12, color: '#1C1C21'
          }}>
            <ImageIcon size={14} /> Current screen PNG
          </button>
          <button onClick={() => pick(() => downloadJson('mpesa-tokens.json', designTokens))} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px',
            border: 0, borderBottom: '1px solid #E8E8EC', background: 'transparent', cursor: 'pointer',
            textAlign: 'left', fontSize: 12, color: '#1C1C21'
          }}>
            <FileJson size={14} /> Tokens JSON
          </button>
          <button onClick={() => pick(() => downloadJson('mpesa-figma-tokens.json', buildFigmaTokens()))} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px',
            border: 0, borderBottom: '1px solid #E8E8EC', background: 'transparent', cursor: 'pointer',
            textAlign: 'left', fontSize: 12, color: '#1C1C21'
          }}>
            <Palette size={14} /> Figma-compatible JSON
          </button>
          <button onClick={() => pick(() => downloadJson('mpesa-components.json', components))} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px',
            border: 0, borderBottom: '1px solid #E8E8EC', background: 'transparent', cursor: 'pointer',
            textAlign: 'left', fontSize: 12, color: '#1C1C21'
          }}>
            <Boxes size={14} /> Component spec JSON
          </button>
          <button onClick={() => pick(() => downloadJson('mpesa-screens.json', screens))} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px',
            border: 0, background: 'transparent', cursor: 'pointer',
            textAlign: 'left', fontSize: 12, color: '#1C1C21'
          }}>
            <Smartphone size={14} /> Screens JSON
          </button>
        </div>
      )}
    </div>
  );
}