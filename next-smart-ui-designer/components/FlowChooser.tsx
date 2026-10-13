'use client';

import { useRouter } from 'next/navigation';
import { ChevronDown, ListFilter } from 'lucide-react';
import { useState } from 'react';
import { flows, getFirstScreenForFlow } from '@/lib/registry';
import { Icon } from './Icon';

export function FlowChooser({ onFlowSelect }: { onFlowSelect?: (flowId: string) => void }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(flows[0]);

  function selectFlow(flowId: string) {
    const flow = flows.find((item) => item.id === flowId) ?? flows[0];
    const firstScreen = getFirstScreenForFlow(flow.id);
    setSelected(flow);
    setOpen(false);
    onFlowSelect?.(flowId);
    router.push(firstScreen.path);
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((value) => !value)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 10px',
          borderRadius: 8,
          border: '1px solid var(--color-stroke)',
          background: 'var(--color-surface-container)',
          color: 'var(--color-on-surface)',
          cursor: 'pointer',
          fontSize: 12,
          fontWeight: 600,
          whiteSpace: 'nowrap',
          width: '100%'
        }}
      >
        <ListFilter size={14} />
        <span style={{ flex: 1, textAlign: 'left' }}>Flow: {selected.label}</span>
        <ChevronDown size={14} />
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          right: 0,
          background: 'var(--color-surface)',
          border: '1px solid var(--color-stroke)',
          borderRadius: '10px',
          boxShadow: 'var(--shadow-medium)',
          overflow: 'hidden',
          zIndex: 30
        }}>
          {flows.map((flow) => (
            <button
              key={flow.id}
              onClick={() => selectFlow(flow.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '7px 10px',
                border: 0,
                borderBottom: '1px solid var(--color-stroke)',
                background: 'transparent',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: 12,
                color: 'var(--color-on-surface)'
              }}
            >
              <Icon name={flow.icon} />
              <span style={{ flex: 1 }}>
                <strong style={{ display: 'block', fontSize: 12 }}>{flow.label}</strong>
                <span style={{ display: 'block', marginTop: 1, color: 'var(--color-on-surface-low)', fontSize: 10 }}>{flow.description}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}