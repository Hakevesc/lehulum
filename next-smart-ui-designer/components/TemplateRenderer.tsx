'use client';

import { builderComponents } from '@/components/BuilderComponents';
import { PhoneFrame } from '@/components/PhoneFrame';
import type { ComponentInstance } from '@/lib/types';
import type { ComponentType } from 'react';

export function TemplateRenderer({ components }: { components: ComponentInstance[] }) {
  return (
    <PhoneFrame>
      <div style={{
        height: '100%', display: 'flex', flexDirection: 'column',
        background: '#F5F5F5', overflow: 'hidden'
      }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {components.map((instance, index) => {
            const Component = builderComponents[instance.componentId] as ComponentType<Record<string, unknown>> | undefined;
            if (!Component) {
              return (
                <div key={index} style={{
                  padding: 12, borderRadius: 8, border: '1px dashed #E8E8EC',
                  color: '#7C7C87', fontSize: 12, background: '#FFF'
                }}>
                  Unknown component: {instance.componentId}
                </div>
              );
            }
            return <Component key={index} {...instance.props} />;
          })}
        </div>
      </div>
    </PhoneFrame>
  );
}
