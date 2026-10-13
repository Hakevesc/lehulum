'use client';

import { useState, useMemo } from 'react';
import { Search, Code2, ExternalLink, Download } from 'lucide-react';
import { templates, matchByKeywords, getTemplateById } from '@/lib/template-registry';
import { builderComponentMeta, resolveToken } from '@/lib/builder-registry';
import { TemplateRenderer } from '@/components/TemplateRenderer';

export default function TemplateBuilderPage() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const matches = useMemo(() => matchByKeywords(query), [query]);
  const selected = useMemo(() => selectedId ? getTemplateById(selectedId) : null, [selectedId]);

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5', padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1C1C21', margin: '0 0 4px' }}>Template Builder</h1>
        <p style={{ fontSize: 13, color: '#7C7C87', margin: 0 }}>Type a prompt to find and render a screen template.</p>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, background: '#FFF', borderRadius: 12, padding: '10px 14px', border: '1.5px solid #E8E8EC' }}>
          <Search size={18} color="#7C7C87" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); if (!selectedId && e.target.value) setSelectedId(null); }}
            placeholder='Try: "bill payment", "send money", "login"...'
            style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 14, color: '#1C1C21', fontFamily: "'Switzer', sans-serif" }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 400px' : '1fr', gap: 20, flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#7C7C87', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {query ? `Matches (${matches.length})` : `All templates (${templates.length})`}
          </div>
          <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
            {(query ? matches : templates).map((t) => (
              <button
                key={t.templateId}
                onClick={() => setSelectedId(t.templateId)}
                style={{
                  textAlign: 'left', padding: 16, borderRadius: 14, border: `1.5px solid ${selectedId === t.templateId ? '#FE353D' : '#E8E8EC'}`,
                  background: '#FFF', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 6,
                  boxShadow: selectedId === t.templateId ? '0 4px 16px rgba(254,53,61,0.15)' : '0 2px 6px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ fontSize: 15, fontWeight: 600, color: '#1C1C21' }}>{t.name}</div>
                <div style={{ fontSize: 12, color: '#7C7C87', lineHeight: 1.4 }}>{t.description}</div>
                {query && (
                  <div style={{ fontSize: 10, color: '#FE353D', fontWeight: 500, marginTop: 4 }}>
                    matches: {t.keywords.filter(k => query.toLowerCase().includes(k.toLowerCase())).length}
                  </div>
                )}
              </button>
            ))}
          </div>

          <details style={{ background: '#FFF', borderRadius: 14, border: '1px solid #E8E8EC', overflow: 'hidden', marginTop: 8 }}>
            <summary style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: '#1C1C21', cursor: 'pointer' }}>
              Component Registry ({builderComponentMeta.length})
            </summary>
            <div style={{ padding: '0 16px 12px', display: 'grid', gap: 8 }}>
              {builderComponentMeta.map((c) => (
                <div key={c.id} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #F0F0F0', display: 'flex', gap: 12 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.preview} alt={`${c.name} preview`} width={88} height={45} style={{ borderRadius: 8, border: '1px solid #F0F0F0', flexShrink: 0, alignSelf: 'flex-start' }} />
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#1C1C21' }}>{c.name}</span>
                      <span style={{ fontSize: 10, fontWeight: 600, color: '#FE353D', background: '#FFF1F2', borderRadius: 6, padding: '2px 6px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>{c.category}</span>
                      <code style={{ fontSize: 11, color: '#7C7C87', marginLeft: 'auto' }}>{c.id}</code>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {c.keywords.slice(0, 5).map((k) => (
                        <span key={k} style={{ fontSize: 10, color: '#7C7C87', background: '#F5F5F5', borderRadius: 6, padding: '2px 6px' }}>{k}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 10, color: '#9A9AA2' }}>tokens:</span>
                      {c.tokens.map((t) => {
                        const v = resolveToken(t);
                        const isColor = t.startsWith('color.');
                        return (
                          <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#7C7C87' }}>
                            {isColor && v && <span style={{ width: 10, height: 10, borderRadius: 3, background: v, border: '1px solid #E8E8EC' }} />}
                            {t}
                          </span>
                        );
                      })}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: '#9A9AA2' }}>
                      <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#9A9AA2" strokeWidth="2"><rect x="4" y="3" width="16" height="18" rx="2" /></svg>
                      Figma: <code style={{ color: '#7C7C87' }}>{c.figma.component}</code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </details>
        </div>

        {selected && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1C1C21' }}>{selected.name}</div>
                <div style={{ fontSize: 11, color: '#7C7C87', marginTop: 2 }}>id: {selected.templateId} · {selected.components.length} components</div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '6px 10px', borderRadius: 8, border: '1px solid #E8E8EC', background: '#FFF', fontSize: 11, color: '#1C1C21', cursor: 'pointer' }}>
                  <Download size={12} /> JSON
                </button>
                <button style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '6px 10px', borderRadius: 8, border: 'none', background: '#FE353D', color: '#FFF', fontSize: 11, cursor: 'pointer' }}>
                  <ExternalLink size={12} /> Launch
                </button>
              </div>
            </div>

            <div style={{ background: '#FFF', borderRadius: 16, overflow: 'hidden', border: '1px solid #F0F0F0', aspectRatio: '9/16', maxHeight: 600 }}>
              <TemplateRenderer components={selected.components} />
            </div>

            <details style={{ background: '#FFF', borderRadius: 12, border: '1px solid #F0F0F0', overflow: 'hidden' }}>
              <summary style={{ padding: '10px 12px', fontSize: 12, fontWeight: 600, color: '#1C1C21', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Code2 size={14} /> Component JSON
              </summary>
              <pre style={{ padding: '0 12px 12px', fontSize: 11, color: '#333', overflow: 'auto', maxHeight: 240, margin: 0 }}>
                {JSON.stringify(selected.components, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}
