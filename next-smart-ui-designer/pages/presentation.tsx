'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Expand, Minimize, Search } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { FlowChooser } from '@/components/FlowChooser';
import { ExportDropdown } from '@/components/ExportDropdown';
import { ScenarioRunner } from '@/components/ScenarioRunner';
import { renderScreen } from '@/lib/screen-components';
import { getScreenById, getFlowById, groupScreensByGroup } from '@/lib/registry';
import { Icon } from '@/components/Icon';

function CollapsibleGroup({ label, children, defaultOpen = true }: { label: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          padding: '6px 6px 4px',
          color: 'var(--color-on-surface-low)',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.5px',
          cursor: 'pointer',
          userSelect: 'none',
          borderBottom: '1px solid var(--color-stroke)',
          marginBottom: 4
        }}
      >
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        <span>{label}</span>
      </div>
      {open && children}
    </div>
  );
}

export default function PresentationPage() {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get('screen') ?? 'lehulum-home';
  const selectedScreen = getScreenById(selectedId);
  const groupedScreens = useMemo(() => groupScreensByGroup(), []);
  const [screenSearch, setScreenSearch] = useState('');
  const [fullscreen, setFullscreen] = useState(false);

  // Flow navigation state
  const [activeFlowId, setActiveFlowId] = useState<string | null>(null);
  const activeFlow = activeFlowId ? getFlowById(activeFlowId) : null;
  const currentIndexInFlow = activeFlow ? activeFlow.screens.indexOf(selectedId) : -1;
  const hasPrevInFlow = currentIndexInFlow > 0;
  const hasNextInFlow = currentIndexInFlow >= 0 && currentIndexInFlow < (activeFlow?.screens.length ?? 0) - 1;

  // Filter screens by search
  const filteredGroups = useMemo(() => {
    if (!screenSearch.trim()) return groupedScreens;
    const q = screenSearch.toLowerCase();
    const result: Record<string, typeof groupedScreens[string]> = {};
    for (const [group, items] of Object.entries(groupedScreens)) {
      const filtered = items.filter(s => s.title.toLowerCase().includes(q));
      if (filtered.length > 0) result[group] = filtered;
    }
    return result;
  }, [groupedScreens, screenSearch]);

  // Compute prev/next screen links
  const prevScreenId = activeFlow && currentIndexInFlow > 0 ? activeFlow.screens[currentIndexInFlow - 1] : null;
  const nextScreenId = activeFlow && currentIndexInFlow >= 0 && currentIndexInFlow < activeFlow.screens.length - 1 ? activeFlow.screens[currentIndexInFlow + 1] : null;

  // Native React component if registered in the screen-components map, else the
  // legacy HTML in an iframe. See lib/screen-components.tsx.
  function renderPreview() {
    return renderScreen(selectedScreen.id);
  }

  return (
    <AppShell title="" subtitle="" hideTopbar={true}>
      {fullscreen ? (
        // Fullscreen mode
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'var(--color-background)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '12px 24px', background: 'var(--color-surface)', borderBottom: '1px solid var(--color-stroke)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{selectedScreen.title}</span>
              <button className="icon-button" onClick={() => setFullscreen(false)} aria-label="Exit fullscreen">
                <Minimize size={18} />
              </button>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: 20, overflow: 'auto' }}>
            {renderPreview()}
          </div>
        </div>
      ) : (
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 280px',
        alignItems: 'stretch',
        height: '100vh',
        // cancel the .content wrapper padding so the right sidebar sits flush against the edge, like the left one
        margin: '-8px -24px'
      }}>
        {/* Left: Phone preview */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: '100vh',
          overflow: 'auto',
          padding: '20px 24px 0'
        }}>
          {/* Screen info bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, width: '100%', maxWidth: 456, justifyContent: 'center' }}>
            <span style={{ fontSize: 16, fontWeight: 700 }}>{selectedScreen.title}</span>
            <span className="pill" style={{ fontSize: 10 }}>{selectedScreen.group}</span>
          </div>

          {/* Flow nav breadcrumbs */}
          {activeFlow && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, fontSize: 12, color: 'var(--color-on-surface-low)' }}>
              <span>Flow: <strong>{activeFlow.label}</strong></span>
              {currentIndexInFlow >= 0 && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span>·</span>
                  <span>Screen {currentIndexInFlow + 1} of {activeFlow.screens.length}</span>
                </span>
              )}
            </div>
          )}

          {/* Navigation buttons */}
          {(hasPrevInFlow || hasNextInFlow) && (
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              {prevScreenId && (
                <a href={`/presentation?screen=${prevScreenId}`} className="secondary-button" style={{ padding: '6px 12px', minHeight: 36, fontSize: 13 }}>
                  <ChevronLeft size={16} /> Previous
                </a>
              )}
              {nextScreenId && (
                <a href={`/presentation?screen=${nextScreenId}`} className="primary-button" style={{ padding: '6px 12px', minHeight: 36, fontSize: 13 }}>
                  Next <ChevronRight size={16} />
                </a>
              )}
            </div>
          )}

          {renderPreview()}
        </div>

        {/* Right sidebar: flush to the edge, full height, like the left one */}
        <aside style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          background: 'var(--color-surface)',
          borderLeft: '1px solid var(--color-stroke)'
        }}>
          {/* Flow dropdown - compact */}
          <div style={{
            padding: '10px',
            borderBottom: '1px solid var(--color-stroke)'
          }}>
            <div className="nav-section-label" style={{ margin: '0 0 6px' }}>Flow</div>
            <FlowChooser onFlowSelect={(flowId) => setActiveFlowId(flowId)} />
          </div>

          {/* Screen search */}
          <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--color-stroke)' }}>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-on-surface-low)' }} />
              <input
                value={screenSearch}
                onChange={(e) => setScreenSearch(e.target.value)}
                placeholder="Search screens..."
                style={{
                  width: '100%',
                  padding: '7px 10px 7px 30px',
                  borderRadius: 8,
                  border: '1px solid var(--color-stroke)',
                  background: 'var(--color-surface-container)',
                  color: 'var(--color-on-surface)',
                  fontSize: 12
                }}
              />
            </div>
          </div>

          {/* Screens list */}
          <div style={{ flex: 1, overflow: 'auto', padding: '10px' }}>
            <div className="nav-section-label" style={{ margin: '0 0 8px' }}>Screens</div>
            {Object.entries(filteredGroups).length === 0 && (
              <p style={{ padding: '12px', fontSize: 12, color: 'var(--color-on-surface-low)', textAlign: 'center' }}>No screens match &quot;{screenSearch}&quot;</p>
            )}
            {Object.entries(filteredGroups).map(([group, items]) => (
              <CollapsibleGroup key={group} label={group} defaultOpen={group === 'Home' && !screenSearch}>
                {items.map((screen) => (
                  <a
                    key={screen.id}
                    href={screen.path}
                    className={`nav-link ${screen.id === selectedScreen.id ? 'active' : ''}`}
                  >
                    <Icon name={screen.icon} />
                    <span>{screen.title}</span>
                  </a>
                ))}
              </CollapsibleGroup>
            ))}
          </div>

          {/* Export + Fullscreen at bottom */}
          <div style={{
            borderTop: '1px solid var(--color-stroke)',
            padding: '10px',
            display: 'flex',
            gap: 6,
            flexShrink: 0
          }}>
            <div style={{ flex: 1 }}>
              <ExportDropdown />
            </div>
            <button className="icon-button" onClick={() => setFullscreen(true)} aria-label="Fullscreen preview" title="Fullscreen">
              <Expand size={16} />
            </button>
            <button className="icon-button" onClick={() => setFullscreen(false)} aria-label="Exit fullscreen" title="Exit fullscreen">
              <Minimize size={16} />
            </button>
          </div>
        </aside>
      </div>
      )}
      <ScenarioRunner />
    </AppShell>
  );
}