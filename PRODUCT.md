# Product

## Register

product

## Users

SME owners and operations managers in the MENA region (primary, public-facing site) and Sanad's internal admin team (secondary, dashboard at `/dashboard/*`). The admin team writes, edits, and ships content that the MENA audience reads.

## Product Purpose

Sanad delivers digital transformation services and content for SMEs in the MENA region. The frontend is two surfaces under one Next.js App Router codebase:

- **Public site** (root, `/blog/*`, `/services/*`, `/contactus/*`): brand and lead-gen, RTL + LTR, Arabic + English.
- **Admin dashboard** (`/dashboard/*`): internal tool for editors and admins to manage content, users, services, payments, and orders.

Success on the dashboard means an editor can update, publish, and unpublish content fast without thinking about the UI. The dashboard is a tool, not a showcase.

## Brand Personality

Reliable. Empowering. Intelligent.

The brand carries its energy through typography, intentional depth, and content. On product surfaces, the personality shows up as solid surfaces, defined borders, subtle shadows, and a single orange/amber accent used for primary actions and current state only. Decoration is absent by default.

## Anti-references

- SaaS dashboards that layer mesh gradients, glow shadows, glassmorphism, and uppercase tracked eyebrows on every section to look "premium". The tool should disappear into the task.
- Marketing-site ornament on a tool surface: drop caps, hero-metric blocks, decorative animations, and gradient text.
- Dashboards that put a colored side-stripe (border-left/border-right > 1px) on cards as a "category accent". Use full borders, background tints, or leading numbers instead.

## Design Principles

1. **Tool, not showcase**: the dashboard serves the editorial workflow. Visual energy that does not communicate state is removed.
2. **One accent, used honestly**: orange/amber is for primary actions, current state, and warnings. It is never decorative. Neutral surface (stone) does the rest of the work.
3. **Solid depth over glass and glow**: depth comes from solid surfaces, defined borders, and a small shadow scale. No backdrop-blur as decoration, no colored glow shadows, no mesh gradient backgrounds.
4. **RTL is structural, not cosmetic**: F-pattern hierarchy, mirrored controls, mirrored motion, and matched typographic rhythm in both Arabic and English. Mirroring the LTR layout in pixels is not enough.
5. **Quiet hierarchy through weight and space, not loudness**: contrast is built with type weight, type size, and whitespace. Not with color, not with all-caps labels on every section.

## Accessibility & Inclusion

WCAG 2.1 AA target. Body text meets 4.5:1 contrast against its background. Keyboard navigation, focus rings, and screen-reader semantics are baseline requirements. RTL and LTR both ship the same accessibility surface. `prefers-reduced-motion` is honored on every animation. Editors using the dashboard for long sessions get a low-fatigue interface (no decorative motion, no glassmorphism, no gradient surfaces).
