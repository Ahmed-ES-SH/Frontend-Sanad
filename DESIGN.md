---
name: Sanad
description: A digital transformation platform for MENA-region SMEs, with an admin dashboard and public brand site.
colors:
  signal-orange: "#f97316"
  signal-orange-light: "#fb923c"
  signal-orange-dark: "#ea580c"
  amber-accent: "#f59e0b"
  rose-state: "#ef4444"
  emerald-state: "#10b981"
  cyan-accent: "#06b6d4"
  stone-white: "#ffffff"
  stone-bg: "#fafaf9"
  stone-border: "#e7e5e4"
  stone-muted: "#a8a29e"
  stone-body: "#57534e"
  stone-strong: "#44403c"
  stone-heading: "#292524"
  stone-ink: "#1c1917"
  stone-card-bg: "#ffffff"
  stone-card-border: "#e7e5e4"
  stone-input-bg: "#ffffff"
  stone-input-border: "#e7e5e4"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, Inter, system-ui, sans-serif"
    fontWeight: 700
    lineHeight: 1.15
  heading:
    fontFamily: "Plus Jakarta Sans, Inter, system-ui, sans-serif"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.05em"
    textTransform: "uppercase"
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.75rem"
rounded:
  card: "1rem"
  card-elevated: "1.25rem"
  card-subtle: "0.75rem"
  button: "0.75rem"
  input: "0.75rem"
  badge: "9999px"
  table: "1rem"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  section: "2.5rem"
components:
  button-primary:
    backgroundColor: "{colors.signal-orange}"
    textColor: "{colors.stone-white}"
    rounded: "{rounded.button}"
    padding: "0.75rem 1.5rem"
    typography: "600 0.9375rem Inter"
  button-primary-hover:
    backgroundColor: "{colors.signal-orange-dark}"
    textColor: "{colors.stone-white}"
    rounded: "{rounded.button}"
  button-secondary:
    backgroundColor: "{colors.stone-card-bg}"
    textColor: "{colors.signal-orange}"
    rounded: "{rounded.button}"
    border: "1px solid {colors.stone-card-border}"
    padding: "0.75rem 1.5rem"
  button-secondary-hover:
    backgroundColor: "{colors.signal-orange}"
    textColor: "{colors.stone-white}"
    rounded: "{rounded.button}"
  card:
    backgroundColor: "{colors.stone-card-bg}"
    textColor: "{colors.stone-body}"
    rounded: "{rounded.card}"
    border: "1px solid {colors.stone-card-border}"
  input:
    backgroundColor: "{colors.stone-input-bg}"
    textColor: "{colors.stone-body}"
    rounded: "{rounded.input}"
    border: "1px solid {colors.stone-input-border}"
    padding: "0.75rem 1rem"
---

# Design System: Sanad

## 1. Overview

**Creative North Star: "The Solid Desk"**

Sanad's design system is a workspace built from solid surfaces with defined edges — nothing floats, nothing glows, nothing blurs. The analogy is a well-organized workbench: heavy enough to trust, clean enough to think.

On the public-facing site, the desk carries brand energy through the orange accent and the typographic scale. On the dashboard, it disappears into the task. The system explicitly rejects SaaS-cliché ornament: gradient mesh backgrounds, glassmorphism, colored side-stripes, glow shadows, and uppercase tracked eyebrows over every section. When the user sits down at this desk, they find reliable tools placed where they expect them.

**Key Characteristics:**
- Solid, not floating. Every surface has a defined edge (1px border) and rests on the surface below it with a small, precise shadow.
- One voice. The orange (#f97316) accent is the only color that carries brand energy. It appears on ≤10% of any given surface, on primary actions and selected state only. It is never decorative.
- RTL is structural, not cosmetic. The entire surface mirrors — spacing, motion, hierarchy — for Arabic.
- Depth is communicated through solid means: borders, background shifts, and subtle layered shadows. Not through blurs, transparency, or gradient meshes.
- The tool should disappear. On the dashboard, editors should not notice the interface. If they notice it, it's too loud.

## 2. Colors

The palette is restrained by default: a single orange accent against a 10-step stone neutral scale. Semantic colors (emerald, rose, amber, cyan) are reserved for state — success, error, warning, info — and appear as tinted badge backgrounds or text, never as independent surface colors.

### Primary
- **Signal Orange** (#f97316 / oklch(0.68 0.19 45)): Primary accent for CTA buttons, active nav items, selected states, and focused inputs. Used sparingly (≤10% of any surface). Never applied to body text, cards, or decorative elements.

### Neutral
- **Stone White** (#ffffff): Card surfaces, elevated panels, input backgrounds, modals.
- **Stone Bg** (#fafaf9): Page backgrounds, subtle card-alternate surfaces, sidebar.
- **Stone Border** (#e7e5e4): Default border for cards, inputs, table rows, dividers.
- **Stone Muted** (#a8a29e): Placeholder text, disabled text, secondary labels, subtle icons.
- **Stone Body** (#57534e): Primary body text, paragraph content.
- **Stone Strong** (#44403c): Strong emphasis text, table headers.
- **Stone Heading** (#292524): Heading text, bold labels.
- **Stone Ink** (#1c1917): Title text, maximal contrast on white.

### State
- **Emerald State** (#10b981): Success actions (Publish, Save), positive indicators (active, verified).
- **Rose State** (#ef4444): Destructive actions (Delete, Unpublish, Cancel), error states.
- **Amber Accent** (#f59e0b): Warning states, secondary brand accent.
- **Cyan Accent** (#06b6d4): Info accents, alternative state indicator.

### Named Rules

**The One Voice Rule.** Signal orange is the only brand color. Amber is its secondary gradient partner — not a separate accent. Cyan, emerald, and rose communicate state, not brand. If a screen uses more than one of these as decoration, it's broken.

**The Restrained Palette Rule.** Color is state, not decoration. If an element is not interactive, not selected, not in error, and not a primary CTA, it should be stone-neutral. No colored side-stripes on cards, no colored hover borders on inactive elements, no tinted card surfaces without functional purpose.

## 3. Typography

**Display Font:** Plus Jakarta Sans (with Inter as fallback)
**Body Font:** Inter (with system-ui as fallback)
**Label/Mono Font:** Inter at 12px / system monospace

**Character:** The pairing is utilitarian — one sans for both display and body, differentiated by weight and size. Plus Jakarta Sans brings a compact, authoritative note to headlines. Inter provides measured, highly legible body type. The scale is 1.25 ratio between steps for clear hierarchy.

### Hierarchy

- **Display XL** (800, 2.5rem / 4.5rem desktop, 1.15): Hero headlines on the public site and dashboard page mastheads. `text-wrap: balance`, letter-spacing -0.025em.
- **Display LG — SM** (800→700, 2.5rem→1.75rem mobile, scaling to 3.75rem→2.25rem desktop, 1.15→1.25): Section-level headings on the public site. Used sparingly; most dashboard surfaces top out at Heading LG.
- **Heading LG** (700, 1.5rem / 1.875rem desktop, 1.25): Dashboard section titles (e.g. "Recent Orders"), modal titles. `text-wrap: balance`.
- **Heading MD** (600, 1.25rem / 1.5rem desktop, 1.35): Card titles, sidebar section headings. `text-wrap: balance`.
- **Heading SM** (600, 1.125rem / 1.25rem desktop, 1.35): Subsection headings, filter group titles.
- **Body LG** (400, 1rem / 1.125rem desktop, 1.6): Long-form prose, article content, excerpt text. Max line length 65–75ch.
- **Body** (400, 0.9375rem / 1rem desktop, 1.6): Default body text across dashboard and public site.
- **Body SM** (400, 0.8125rem / 0.875rem desktop, 1.5): Secondary text, table cell content, metadata.
- **Label** (600, 0.75rem, 1.4): Button labels, small form labels, table header text. Uppercase + 0.05em tracking only on intentional <4-word labels or badge text — never on every section.
- **Caption** (500, 0.6875rem / 0.75rem desktop, 1.4): Minimal-size legal text, timestamps, character counts.
- **Caption XS** (500, 0.625rem / 0.6875rem desktop, 1.4): Table row meta, very small labels. Used rarely.

### Named Rules

**The Flat Hierarchy Rule.** Dashboard surfaces do not use fluid clamp sizes. Font sizes are fixed at the mobile value on screens <1024px and at the desktop value on screens ≥1024px. The scale ratio is 1.25. Going above 1.35 creates noise.

**The No-Orphan Rule.** Long prose uses `text-wrap: pretty` on paragraph elements to reduce widows. Headings use `text-wrap: balance`.

## 4. Elevation

Depth is layered through a deliberate combination of borders, background shifts, and diffuse shadows. At rest, every surface has a defined edge (1px border on the stone-border color). The elevation hierarchy is expressed through shadow intensity and background tint rather than layering multiple cards.

### Shadow Vocabulary

- **Surface SM** (`0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04)`): Applied by default to `.surface-card`. Represents the resting elevation for all card surfaces.
- **Surface MD** (`0 4px 6px rgba(15,23,42,0.05), 0 2px 4px rgba(15,23,42,0.04)`): Active hover state for cards and panels. Applied via `:hover` on `.surface-card` and `hover:shadow-surface-md`.
- **Surface LG** (`0 10px 15px rgba(15,23,42,0.06), 0 4px 6px rgba(15,23,42,0.04)`): Elevated panels, dropdowns, mobile navigation drawers.
- **Surface XL** (`0 20px 25px rgba(15,23,42,0.08), 0 8px 10px rgba(15,23,42,0.04)`): Modals, dialogs, maximum elevation.
- **Button Glow** (`0 4px 14px rgba(249,115,22,0.22)`): Primary button glow at rest. Hover elevates to `0 8px 22px rgba(234,88,12,0.28)`.

### Named Rules

**The Flat-at-Rest Rule.** Shadows are not decorative. At rest, cards carry only the minimal SM shadow. Elevation increases only as a response to interaction (hover, active) or structural hierarchy (modals get XL). A surface that needs elevation at rest should use a background tint rather than stacking shadow.

**The No-Glass Rule.** No backdrop-blur, no transparency, no gradient overlay as surface treatment. Depth is communicated through solid borders and shadows. Blur is reserved for modal backdrops only.

## 5. Components

### Buttons

- **Shape:** Gently rounded corners (0.75rem / 12px). Full pill reserved for badges.
- **Primary.** Signal Orange background, white text, semibold 15px, 12px radius, button glow shadow at rest (`0 4px 14px rgba(249,115,22,0.22)`). Hover: darkens to Signal Orange Dark (`#ea580c`), glow deepens, lifts 2px. Active: resets to y:0, shadow shrinks. Disabled: 50% opacity + not-allowed cursor.
- **Secondary.** White background, Signal Orange text, 1px stone-border. Hover: fills with Signal Orange 50 (`#fff7ed`), border shifts to Signal Orange Light (`#fb923c`), lifts 1px.
- **Ghost.** Text-only at 14px semibold, stone-600. Hover: stone-100 bg. Used for "Edit", "Cancel", "View all" text actions.
- **Destructive.** Rose (`#ef4444`) background, white text, same shape as primary. Hover: darkens to `#dc2626`. Used for Delete, Remove, Discard.

### Cards / Containers

- **Corner Style:** 1rem (16px) for default `.surface-card`. 1.25rem (20px) for `.surface-card-elevated`. 0.75rem (12px) for `.surface-card-subtle`.
- **Background:** Pure white (`#ffffff`) for default and elevated. Stone Bg (`#fafaf9`) for subtle variant.
- **Shadow Strategy:** SM at rest, MD on hover. Elevated carries LG at rest, no hover change.
- **Border:** Always 1px solid stone-border (`#e7e5e4`). Hover shifts to darker stone-border-hover (`#d6d3d1`).
- **Internal Padding:** px-5 (1.25rem) and py-4 (1rem) is the standard; section cards use p-6 (1.5rem).

### Inputs / Fields

- **Style:** White background, 1px stone-border, 12px radius, 12px/14px padding, 15px font size.
- **Focus:** Outline removed, border shifts to Signal Orange, 3px rgba(249,115,22,0.15) glow ring.
- **Error:** Rose border (`#ef4444`) + rose-tinted background (`bg-rose-50`).
- **Disabled:** 50% opacity, not-allowed cursor, stone-200 border.
- **Labels:** 14px font-medium stone-body for public forms; 12px font-semibold stone-700 for dashboard forms.

### Badges / Chips

- **Style:** Pill shape (9999px), orange-50 background, Signal Orange text, 12px font-semibold. Semantic variants (Published: emerald-50 + emerald-700; Draft: stone-100 + stone-600; Status tags per `ORDERS_LIST_STATUS_CONFIG`).
- **Tags (editable):** 12px rounded-md `bg-stone-100 text-stone-700`, with close X.
- **State dot:** 6px circle, colored per state, paired with text.

### Navigation

- **Sidebar (dashboard):** 64px fixed-width + border-right. Stone-50/100 background. Nav items: 14px semibold, stone-500, hover stone-200/60 bg. Active: Signal Orange 600 bg, white text, shadow. Active indicator is a white vertical bar (Framer Motion `layoutId`).
- **Top Nav (dashboard):** Sticky, white/80 with backdrop-blur (the only acceptable blur), 1px bottom border, shadow. Breadcrumbs in 12px semibold, last crumb bold stone-800. Mobile: hamburger toggles a fixed sidebar overlay.
- **Site Nav (public):** 12px→15px bold tracking-tight via plus-jakarta-sans. Active: Signal Orange. Inactive: stone-700, hover Signal Orange. Animated underline on active.

### Tables

- **Container:** White background, 16px radius, 1px stone-border, shadow-sm.
- **Head:** stone-50/50 row, cells are 11px semibold uppercase tracking-wide stone-500.
- **Body:** `divide-y divide-stone-100`. Rows: hover stone-50/50. No striping.
- **Cell:** px-5 py-3, 14px text. Responsive: horizontal scroll wrapper.

### Modals / Dialogs

- **Backdrop:** Fixed fullscreen, stone-900/50 overlay. No blur on panel content.
- **Panel:** `.surface-card` (16px radius, white bg, 1px border, shadow-xl), max-w-md, mx-4.
- **Animation:** 150ms fade-in on backdrop, 180ms ease-out-expo scale-fade on panel. No spring, no bounce. The only motion is the panel's vertical entry (y: 8px → 0).
- **Icon:** 36px circle, tone-appropriate background (emerald-50 for positive, rose-50 for negative), 16px icon.
- **Actions:** "Cancel" (ghost, 14px font-medium, border stone-200) + confirm (state-colored, 14px font-medium, white).
- **Accessibility:** `role="dialog"`, `aria-modal="true"`, `aria-labelledby` + `aria-describedby`. Focus moves to the confirm button. Escape closes. Focus returns to trigger on close.

## 6. Do's and Don'ts

### Do:
- **Do** use Signal Orange for primary actions, current nav selection, and focused inputs only. ≤10% of any given surface.
- **Do** give every surface a defined 1px border. A card without a border is a floating sheet; borders anchor cards to their context.
- **Do** use stone-900 (`#1c1917`) for title text, stone-700 (`#44403c`) for body text, stone-500 (`#78716c`) for secondary text. Verify contrast against each background.
- **Do** use `text-wrap: balance` on headings (h1–h3) and `text-wrap: pretty` on long prose paragraphs.
- **Do** pass `prefers-reduced-motion: reduce` into every Framer Motion component via `transition={{ duration: isReduced ? 0.01 : normal }}`.
- **Do** respect the typographic scale (ratio 1.25) and the fixed breakpoints (mobile <1024px, desktop ≥1024px).
- **Do** use the stone neutral ramp for all non-state surfaces. Emerald for success, rose for error, amber for warning.
- **Do** use semantic HTML with ARIA on modals: `role="dialog"`, `aria-modal`, `aria-labelledby`, `aria-describedby`.
- **Do** match the RTL surface exactly — spacing, motion, alignment — not just mirror layout.

### Don't:
- **Don't** use gradient text (`background-clip: text`). Use solid Signal Orange for emphasis, or use weight and size contrast.
- **Don't** use glassmorphism (backdrop-blur + transparency) as a default surface treatment. Modal overlays are the only acceptable blur.
- **Don't** use mesh gradient backgrounds, repeating gradient stripes, or colored page overlays (the `page-bg` class pattern). These are the primary AI tell in this codebase.
- **Don't** use side-stripe borders (border-left/border-right > 1px) on cards, list items, or callouts. Replace with full background tints or leading indicators.
- **Don't** place uppercase tracked eyebrows (e.g. "SEO METADATA", "SOCIAL SHARING", "PROACTIVE INSIGHTS") above every section. One or two per page are voice; more is AI grammar.
- **Don't** combine `1px solid` border with a wide blur shadow (`box-shadow` with blur ≥16px) on the same element. Pick one.
- **Don't** over-round. Cards top out at 16px; full pill is for badges only. No 24px+ radii.
- **Don't** place placeholder/fake data in production components ("Total Shares: 0", "15% better than last week"). Show an em-dash (`—`) or an empty state that teaches the interface.
- **Don't** animate CSS layout properties. Use `transform` and `opacity` only.
- **Don't** bounce or elastic ease on motion. Ease-out-expo (`cubic-bezier(0.16, 1, 0.3, 1)`) for entrances; ease-out-quart for hovers.
- **Don't** use all-caps for body text, sentences, or multi-word labels. Short labels (≤4 words) are the ceiling for uppercase.
- **Don't** use display font weights (800) in dashboard context — that's the public site's voice. Dashboard typography caps at 700.
- **Don't** hard-code shadow or spacing values; use the surface-shadow vocabulary and spacing scale from the tokens.
- **Don't** show a modal when an inline or progressive disclosure pattern would serve the user's flow better. Modals are the last answer.
