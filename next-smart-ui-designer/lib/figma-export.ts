/**
 * Figma Export for Next.js Designer
 * 
 * Serializes the phone frame DOM to a .figma-export.json file
 * that is compatible with the existing Figma plugin at /figma-plugin/
 * 
 * This replaces the HTML-page injection approach (figma-export.js)
 * with a programmatic export from the Next.js designer.
 */

import { saveAs } from 'file-saver';

// ── Color parsing ──
function parseCssColor(raw: string | null): { r: number; g: number; b: number; a: number } | null {
  if (!raw || raw === 'transparent' || raw === 'rgba(0, 0, 0, 0)') return null;
  const m = raw.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (m) {
    return { r: +m[1] / 255, g: +m[2] / 255, b: +m[3] / 255, a: m[4] !== undefined ? +m[4] : 1 };
  }
  return null;
}

function parseBoxShadow(raw: string | null): any[] {
  if (!raw || raw === 'none') return [];
  const effects: any[] = [];
  const parts = raw.split(/,(?![^(]*\))/);
  for (const p of parts) {
    const trimmed = p.trim();
    const colorMatch = trimmed.match(/rgba?\([^)]+\)|#[0-9a-fA-F]{3,8}/);
    const nums = trimmed.replace(/rgba?\([^)]+\)/, '').match(/(-?[\d.]+)px/g);
    if (!colorMatch || !nums || nums.length < 2) continue;
    const c = parseCssColor(colorMatch[0]);
    if (!c) continue;
    effects.push({
      type: trimmed.includes('inset') ? 'INNER_SHADOW' : 'DROP_SHADOW',
      color: c,
      offset: { x: parseFloat(nums[0]), y: parseFloat(nums[1]) },
      radius: nums[2] ? parseFloat(nums[2]) : 0,
      spread: nums[3] ? parseFloat(nums[3]) : 0,
      visible: true
    });
  }
  return effects;
}

function extractAutoLayout(style: CSSStyleDeclaration): any | null {
  const disp = style.display;
  if (disp !== 'flex' && disp !== 'inline-flex') return null;
  const horizontal = (style.flexDirection || 'row').indexOf('row') === 0;
  const gap = parseFloat(horizontal ? style.columnGap : style.rowGap) || 0;
  const primaryMap: Record<string, string> = {
    'flex-start': 'MIN', 'start': 'MIN', 'left': 'MIN', 'normal': 'MIN',
    'center': 'CENTER', 'flex-end': 'MAX', 'end': 'MAX', 'right': 'MAX',
    'space-between': 'SPACE_BETWEEN'
  };
  const counterMap: Record<string, string> = {
    'flex-start': 'MIN', 'start': 'MIN', 'normal': 'MIN', 'stretch': 'MIN',
    'center': 'CENTER', 'flex-end': 'MAX', 'end': 'MAX', 'baseline': 'BASELINE'
  };
  return {
    direction: horizontal ? 'HORIZONTAL' : 'VERTICAL',
    itemSpacing: gap,
    paddingTop: parseFloat(style.paddingTop) || 0,
    paddingRight: parseFloat(style.paddingRight) || 0,
    paddingBottom: parseFloat(style.paddingBottom) || 0,
    paddingLeft: parseFloat(style.paddingLeft) || 0,
    primaryAlign: primaryMap[style.justifyContent] || 'MIN',
    counterAlign: counterMap[style.alignItems] || 'MIN',
    wrap: horizontal && style.flexWrap === 'wrap'
  };
}

function serializeElement(el: Element, containerRect: DOMRect, depth: number): any | null {
  if (depth > 24) return null;
  const rect = el.getBoundingClientRect();
  if (rect.width < 1 || rect.height < 1) return null;
  const style = getComputedStyle(el);
  if (style.display === 'none' || style.visibility === 'hidden') return null;
  if (el.getAttribute('aria-hidden') === 'true') return null;
  const computedOpacity = parseFloat(style.opacity);
  if (computedOpacity === 0) return null;

  const tag = el.tagName.toLowerCase();
  const cls = (el.className && typeof el.className === 'string') ? el.className.split(/\s+/)[0] : '';
  const name = cls || tag;

  const node: any = {
    type: 'FRAME',
    name,
    x: Math.round(rect.left - containerRect.left),
    y: Math.round(rect.top - containerRect.top),
    w: Math.round(rect.width),
    h: Math.round(rect.height),
    fills: [],
    strokes: [],
    effects: [],
    cornerRadius: [
      parseFloat(style.borderTopLeftRadius) || 0,
      parseFloat(style.borderTopRightRadius) || 0,
      parseFloat(style.borderBottomRightRadius) || 0,
      parseFloat(style.borderBottomLeftRadius) || 0
    ],
    opacity: computedOpacity,
    clipsContent: style.overflow === 'hidden' || style.overflow === 'clip',
    absolute: style.position === 'absolute' || style.position === 'fixed',
    autoLayout: extractAutoLayout(style),
    children: []
  };

  // Background
  const bgColor = style.backgroundColor;
  if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
    const c = parseCssColor(bgColor);
    if (c) node.fills.push({ type: 'SOLID', color: c });
  }

  // Border
  const bw = parseFloat(style.borderTopWidth);
  if (bw > 0 && style.borderTopStyle !== 'none') {
    const bc = parseCssColor(style.borderTopColor);
    if (bc) node.strokes.push({ type: 'SOLID', color: bc, weight: bw });
  }

  // Shadow
  node.effects = parseBoxShadow(style.boxShadow);

  // Text nodes
  for (let i = 0; i < el.childNodes.length; i++) {
    const n = el.childNodes[i];
    if (n.nodeType === 3) {
      const text = (n.textContent || '').replace(/\s+/g, ' ').trim();
      if (!text) continue;
      const range = document.createRange();
      range.selectNode(n);
      const r = range.getBoundingClientRect();
      range.detach();
      if (r.width < 1 || r.height < 1) continue;
      node.children.push({
        type: 'TEXT',
        name: 'text',
        text,
        x: Math.round(r.left - rect.left),
        y: Math.round(r.top - rect.top),
        w: Math.ceil(r.width) + 1,
        h: Math.ceil(r.height),
        fontSize: parseFloat(style.fontSize) || 14,
        fontWeight: parseInt(style.fontWeight) || 400,
        fontFamily: style.fontFamily.split(',')[0].replace(/['"]/g, '').trim() || 'Inter',
        color: parseCssColor(style.color) || { r: 0, g: 0, b: 0, a: 1 },
        lineHeight: style.lineHeight === 'normal' ? null : parseFloat(style.lineHeight),
        textAlign: style.textAlign === 'center' ? 'CENTER' : style.textAlign === 'right' ? 'RIGHT' : 'LEFT',
        letterSpacing: parseFloat(style.letterSpacing) || 0
      });
    } else if (n.nodeType === 1) {
      const child = serializeElement(n as Element, containerRect, depth + 1);
      if (child) {
        child.x -= node.x;
        child.y -= node.y;
        node.children.push(child);
      }
    }
  }

  return node;
}

/**
 * Serialize a phone frame element to Figma-compatible JSON
 */
export function serializePhoneToFigma(phoneElement: HTMLElement | null): any | null {
  if (!phoneElement) return null;
  const rect = phoneElement.getBoundingClientRect();
  const tree = serializeElement(phoneElement, rect, 0);
  return tree;
}

/**
 * Export the current phone frame as a .figma-export.json file
 */
export function exportPhoneToFigmaJson(phoneElement: HTMLElement | null, filename = 'mpesa-screen') {
  const tree = serializePhoneToFigma(phoneElement);
  if (!tree) return;

  const output = {
    version: 3,
    name: filename,
    width: phoneElement!.offsetWidth,
    height: phoneElement!.offsetHeight,
    tree,
    exportedAt: new Date().toISOString(),
    sourceUrl: typeof window !== 'undefined' ? window.location.href : ''
  };

  const blob = new Blob([JSON.stringify(output, null, 2)], { type: 'application/json' });
  saveAs(blob, `${filename.replace(/[^a-zA-Z0-9]/g, '_')}.figma-export.json`);
}

/**
 * Download the Figma plugin for reference
 */
export function downloadFigmaPlugin() {
  // Create a simple reference file
  const info = {
    plugin: 'M-PESA HTML Import',
    instructions: `1. In Figma, go to Plugins → Development → Import plugin from manifest
2. Select the /figma-plugin/manifest.json file
3. Run the plugin and drop the .figma-export.json file exported from this designer`,
    manifestLocation: '/figma-plugin/manifest.json',
    version: '1.0.0',
    moreInfo: 'https://github.com/Hakevesc/m-pesa-light'
  };
  const blob = new Blob([JSON.stringify(info, null, 2)], { type: 'application/json' });
  saveAs(blob, 'figma-plugin-setup.json');
}