# Rule-Based Template Builder Plan

Goal: let users type a prompt like "build a bill payment screen" and instantly get a live phone preview composed from existing components, without AI or file writes — deterministic, reversible, offline.

## What exists already (reuse)

- `data/components.json` — 44 components with id, category, props, variants, states, token dependencies.
- `data/screens.json` / `data/flows.json` — screen/flow registry and routing.
- `lib/screen-components.tsx` — maps screen IDs to React components.
- `pages/presentation.tsx` — phone preview shell, theme toggle, export buttons.
- `components/PhoneFrame.tsx`, `components/Icon.tsx` — render primitives.

## New files

1. `data/templates.json` — ordered array of templates. Each template:
   - `templateId`, `name`, `description`, `icon` (lucide name), `keywords[]`, `requiredTokens[]` (optional theme needs).
   - `components[]` — flat ordered list of component instances: `{ "componentId": "header-nav", "props": { "title": "Pay Bill" } }`.

2. `lib/template-registry.ts` — loads templates, exposes:
   - `templates: Template[]`
   - `matchByKeywords(query: string): Template[]`
   - `getById(id: string): Template | undefined`

3. `components/TemplateRenderer.tsx` — renders a flat component list inside `PhoneFrame`.
   - Input: `components: ComponentInstance[]`
   - For each instance: resolve `componentId` from `screen-components.tsx`; if missing, render a placeholder "Unknown component" box so the list never breaks.
   - Render `<Component {...props} />` directly.

4. `pages/template-builder.tsx` — the studio page.
   - **Prompt bar:** free-text input + "Generate" button.
     - Calls `matchByKeywords(query)`.
     - Displays matching template as a selectable card grid.
   - **Live preview:** render the selected template with `TemplateRenderer` inside the existing phone frame shell.
   - **JSON editor (read-only or editable):** show the template's `components` array for inspection/copy.
   - **Actions:**
     - "Launch in Presentation" — navigates to `/presentation?template=<templateId>`.
     - "Export JSON" — downloads `data/templates/<templateId>.json`.
     - "Add to Flow" — optional; let users append the template as a new screen in a flow (writes to `data/flows.json` / `data/screens.json` using server action or client-side download-patch).

## Data model (templates.json)

```json
{
  "templates": [
    {
      "templateId": "bill-payment",
      "name": "Bill Payment",
      "description": "Select a biller, enter account, amount, and PIN.",
      "icon": "receipt",
      "keywords": ["bill", "payment", "utility", "electricity", "water"],
      "requiredTokens": [],
      "components": [
        { "componentId": "header-nav", "props": { "title": "Pay Bill" } },
        { "componentId": "section-header", "props": { "title": "Quick Pay" } },
        { "componentId": "biller-grid", "props": {} },
        { "componentId": "amount-input", "props": { "label": "Amount" } },
        { "componentId": "primary-button", "props": { "label": "Pay Now" } }
      ]
    }
  ]
}
```

Keyword matching: naive inclusive search. If a query contains any keyword of a template, that template is a candidate. Sort candidates by keyword overlap count, then by template name. If no keywords match, show all templates.

## Page layout (template-builder.tsx)

- Top: prompt input (full width).
- Middle left: matching template cards (name + description + icon + match score).
- Middle right: live phone preview of selected template.
- Bottom: JSON preview of the template's component list + action buttons.

## Router integration

- Add `pages/template-builder.tsx` route: `/template-builder`.
- Optionally add query param load: `/template-builder?template=<templateId>` auto-selects.
- Optionally add presentation integration: `/presentation?template=bill-payment` renders template inside the existing presentation page using `TemplateRenderer` instead of `renderScreen`.

## Validation

- `lib/validators.ts` add `TemplateSchema` and `ComponentInstanceSchema` using Zod.
- `scripts/verify-templates.mjs` — script that loads `templates.json`, validates every `componentId` exists in `data/components.json`, reports missing refs. Run with `node scripts/verify-templates.mjs`.

## Acceptance criteria

1. Prompt "bill" returns and renders the bill-payment template.
2. Prompt "login" returns and renders a login template.
3. Every template componentId points to an existing registered component or shows a placeholder.
4. Templates are fully data-driven; no code changes required to add a template.
5. `scripts/verify-templates.mjs` exits non-zero if templates reference missing components.

## Phases

- **Phase 1: Core schema + renderer** `templates.json` `template-registry.ts` `TemplateRenderer.tsx`
- **Phase 2: Builder page** `pages/template-builder.tsx`
- **Phase 3: Router hooks** query-param loading, optional presentation integration
- **Phase 4: Validation** Zod schemas + verify script

## Out of scope (later)

- Nested/slotted layouts (can migrate flat list to tree later if needed)
- Drag-and-drop reorder (add after renderer is stable)
- Template editing (props mutation UI)
- Saving new templates from builder UI (start with read-only + manual JSON edit)
