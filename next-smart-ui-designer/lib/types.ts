export type ThemeId = 'light' | 'dark';

export type ColorToken = Record<string, string>;

export type TypographyToken = {
  fontSize: string;
  lineHeight: string;
  fontWeight: number;
  letterSpacing?: string;
  textTransform?: string;
};

export type DesignTheme = {
  id: ThemeId;
  label: string;
  colors: ColorToken;
};

export type DesignTokens = {
  version: string;
  spacing: Record<string, string>;
  radius: Record<string, string>;
  shadow: Record<string, string>;
  blur: Record<string, string>;
  stroke: Record<string, string>;
  typography: Record<string, TypographyToken>;
  icons: Record<string, string | number>;
  fonts: string[];
};

export type ScreenStatus = 'legacy-html' | 'next-component' | 'design-system';

export type ScreenDefinition = {
  id: string;
  title: string;
  group: string;
  path: string;
  icon: string;
  status: ScreenStatus;
  sourceFile: string;
};

export type FlowDefinition = {
  id: string;
  label: string;
  description: string;
  icon: string;
  firstScreenId: string;
  screens: string[];
};

export type ComponentVariant = {
  id: string;
  label: string;
  description?: string;
};

export type ComponentDefinition = {
  id: string;
  name: string;
  category: string;
  description: string;
  props: string[];
  variants: string[];
  states: string[];
  tokens: string[];
};

export type ScenarioDefinition = {
  id: string;
  name: string;
  description: string;
  targetScreens: string[];
  type: 'modal' | 'tooltip' | 'toast' | 'state';
  tone: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'neutral';
};

export type ComponentInstance = {
  componentId: string;
  props?: Record<string, string | boolean | number>;
};

/**
 * Metadata for a registered builder primitive (Phase 2 component registry).
 * `props` maps a prop name to its type; `tokens` lists the design tokens the
 * component consumes (red M-PESA set, e.g. "color.primary"). Pairs by `id` with
 * the live component in components/BuilderComponents.tsx.
 */
export type BuilderComponentMeta = {
  id: string;
  name: string;
  category: string;
  keywords: string[];
  variants: string[];
  props: Record<string, 'string' | 'boolean' | 'number'>;
  tokens: string[];
  /** Code-Connect-style mapping: Figma component path + per-prop binding. */
  figma: {
    component: string;
    type: 'COMPONENT' | 'INSTANCE';
    /** prop name -> Figma binding, e.g. "text:Label" or "variant:State". */
    props: Record<string, string>;
  };
  /** Path to a static preview thumbnail under /public. */
  preview: string;
};

/** A reusable screen blueprint for the rule-based template builder. */
export type Template = {
  templateId: string;
  name: string;
  description: string;
  /** Lowercase keywords used by the rule-based parser to match a user request. */
  keywords: string[];
  /** Ordered component instances that compose the screen. */
  components: ComponentInstance[];
};
