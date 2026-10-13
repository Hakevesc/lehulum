import type { ReactNode } from 'react';
import { DesignerSidebar } from './DesignerSidebar';

export function AppShell({ title, subtitle, children, actions, hideTopbar }: {
  title: string;
  subtitle: string;
  children: ReactNode;
  actions?: ReactNode;
  hideTopbar?: boolean;
}) {
  return (
    <div className="page-shell">
      <div className="app-shell">
        <DesignerSidebar />
        <main className="main-content">
          {!hideTopbar && (
            <header className="topbar">
              <div className="topbar-title">
                <strong>{title}</strong>
                <span>{subtitle}</span>
              </div>
              {actions ?? null}
            </header>
          )}
          {hideTopbar && actions && (
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '8px 24px',
              gap: 10,
              background: 'var(--color-surface)',
              borderBottom: '1px solid var(--color-stroke)'
            }}>
              {actions}
            </div>
          )}
          <div className="content" style={hideTopbar ? { padding: '8px 24px' } : undefined}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}