import data from '@/data/builder-components.json';
import { themes, designTokens } from '@/lib/registry';
import type { BuilderComponentMeta } from '@/lib/types';

/**
 * Phase 2 component registry: metadata for every builder primitive. The live
 * components (keyed by the same `id`) live in components/BuilderComponents.tsx;
 * this module is the metadata source of truth — ids, keywords, props, tokens.
 */
export const builderComponentMeta = data.components as BuilderComponentMeta[];

/** Canonical ordered list of registered component ids (derived from metadata). */
export const builderComponentIds = builderComponentMeta.map((c) => c.id);

export function getBuilderMeta(id: string): BuilderComponentMeta | undefined {
  return builderComponentMeta.find((c) => c.id === id);
}

/** Keyword search over the registry (same rule-based approach as the template parser). */
export function searchComponents(query: string): BuilderComponentMeta[] {
  const q = query.trim().toLowerCase();
  if (!q) return builderComponentMeta;
  return builderComponentMeta.filter(
    (c) => c.name.toLowerCase().includes(q) || c.keywords.some((k) => q.includes(k.toLowerCase()) || k.toLowerCase().includes(q))
  );
}

/**
 * Resolve a "color.primary" / "radius.md" token reference to its concrete value
 * for a theme. Used to validate that a component only consumes real tokens and
 * to preview the red M-PESA set.
 */
export function resolveToken(ref: string, themeId: 'light' | 'dark' = 'light'): string | undefined {
  const [group, key] = ref.split('.');
  if (group === 'color') return themes[themeId]?.colors[key];
  const groupMap = (designTokens as unknown as Record<string, Record<string, string>>)[group];
  return groupMap?.[key];
}

/** Distinct token references a component consumes, with resolved light-theme values. */
export function resolveComponentTokens(id: string, themeId: 'light' | 'dark' = 'light'): { ref: string; value: string | undefined }[] {
  const meta = getBuilderMeta(id);
  if (!meta) return [];
  return meta.tokens.map((ref) => ({ ref, value: resolveToken(ref, themeId) }));
}
