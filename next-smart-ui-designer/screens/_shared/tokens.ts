/**
 * Screen palette constants (red M-PESA token set). The migrated screens are
 * SVG-heavy, and CSS `var(--...)` is NOT valid inside SVG presentation
 * attributes (fill="" / stroke=""). So screens de-hardcode by referencing these
 * named constants instead of raw hex — works in both style props and SVG attrs,
 * and keeps a single source for the palette. Values mirror data/themes.json (light).
 */
export const C = {
  primary: '#FE353D',
  primaryDark: '#C41520',
  primaryDarker: '#A41016',
  primaryContainer: '#FFDFE0',
  onPrimary: '#FFF1F2',
  surface: '#FFFFFF',
  surfaceContainer: '#FCFCFC',
  background: '#F5F5F5',
  onSurface: '#1C1C21',
  onSurfaceLow: '#7C7C87',
  success: '#1FC83B',
  successContainer: '#E8F9EC',
  stroke: '#E8E8EC',
  /** Disabled / inert control fill. */
  disabled: '#E0E0E0',
  /** The M-PESA red header gradient used across auth / header screens. */
  headerGradient: 'linear-gradient(160deg, #A41016 0%, #C41520 30%, #D32F2F 60%, #B71C1C 100%)'
} as const;
