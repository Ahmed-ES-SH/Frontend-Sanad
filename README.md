# Sanad — Frontend

# Sanad — Frontend

A production-ready Next.js (App Router) TypeScript frontend for the Sanad project. This repository contains the UI, client-side integrations, and feature components powering the web application.

---

## Table of contents

- **Quick Start**
- **Tech Stack**
- **Project Structure**
- **Local Development**
- **Environment**
- **Deployment**
- **Contributing**
- **Troubleshooting**

---

## Quick Start

Prerequisites: Node.js (recommended >=18), pnpm (preferred), Git.

Install and run locally:

```bash
pnpm install
pnpm dev
```

Available npm scripts (see [package.json](package.json#L1)):

- **dev**: starts Next.js in development mode (`pnpm dev`).
- **build**: builds the production app (`pnpm build`).
- **start**: runs the production server (`pnpm start`).
- **lint**: runs ESLint (`pnpm lint`).

---

## Tech Stack

- **Framework**: Next.js 16 (App Router) — see [app/layout.tsx](app/layout.tsx#L1).
- **UI**: React 19 + TypeScript 5.
- **Styling**: Tailwind CSS (v4) + PostCSS (`postcss.config.mjs`).
- **State & Data**: `@tanstack/react-query` (server data) and `zustand` (local/global UI state).
- **Payments**: Stripe client libraries (`@stripe/react-stripe-js`, `@stripe/stripe-js`, `stripe`).
- **Realtime**: `socket.io-client` for socket integrations.
- **Editor**: TipTap (`@tiptap/react`) for rich text editing.
- **UI/UX**: Framer Motion, Swiper, Sonner (toasts), Recharts for charts.
- **Networking**: Axios (centralized helpers in `helpers/axios.ts`).
- **Security**: DOMPurify for sanitizing HTML.

Dependencies are listed in [package.json](package.json#L1).

---

## Project Structure (high level)

- **app/**: Next.js App Router pages & layouts. See [app/layout.tsx](app/layout.tsx#L1) and localized route [app/[locale]/layout.tsx](app/%5Blocale%5D/layout.tsx#L1).
- **actions/**: Reusable server/client actions (auth, cart, blog, payments). Example: [actions/authActions.ts](actions/authActions.ts#L1).
- **api/**: API route handlers (server endpoints).
- **components/**: Feature-organized React components (auth, cart, dashboard, website, etc.).
- **constants/**: Static content, data arrays, and UI constants.
- **helpers/**: Utility functions & clients (e.g., [helpers/axios.ts](helpers/axios.ts#L1), formatters, session helpers).
- **hooks/**: Custom React hooks used across the app.
- **lib/**: Integration libraries (payments, third-party adapters).
- **store/**: Global state slices / stores (Zustand or similar) — see [store/AuthSlice.tsx](store/AuthSlice.tsx#L1).
- **translations/**: JSON translation files (`en.json`, `ar.json`) used by localized routing.
- **public/**: Static assets, example folders: `portfoliosection/`, `servicessection/`.

Config & tooling:

- **next.config.ts**: Next.js configuration ([next.config.ts](next.config.ts#L1)).
- **tsconfig.json**: TypeScript config ([tsconfig.json](tsconfig.json#L1)).
- **eslint.config.mjs**: ESLint setup.
- **postcss.config.mjs**: PostCSS/Tailwind integration.

---

## Local Development Notes

- The project uses the Next.js App Router. Server Components are the default — only use `use client` in components that need client-side state, effects, or browser-only APIs.
- Prefer server-side fetching for initial page data and React Query for client caching and optimistic updates.
- Translations are colocated in `translations/` and localized routes live under `app/[locale]/`.
- Centralized helpers live in `helpers/` (e.g., networking and formatting utilities).

Recommended workflow when adding features:

1. Add UI under `components/` and a colocated hook in `hooks/` if needed.
2. Add server actions in `actions/` for shared logic between server & client.
3. Use React Query for server state and `store/` (Zustand) for ephemeral UI state.

---

## Environment

Create a `.env.local` (not committed). Suggested variables (adjust to your backend):

```
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
NEXT_PUBLIC_SOCKET_URL=wss://socket.example.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...         # server-only secret, do NOT expose
JWT_SECRET=your_jwt_secret            # server-only
```

Notes:

- Prefix with `NEXT_PUBLIC_` only for values that are safe to be exposed to the browser.
- Keep server secrets out of version control.

---

## Deployment

- Recommended platform: Vercel (first-class Next.js support). Connect the repo and provide environment variables in the Vercel project settings.
- Build command: `pnpm build` and the production start uses `pnpm start` if you run a Node server.

Basic manual deploy steps:

```bash
pnpm build
pnpm start
```

CI/Preview:

- Configure your CI to run `pnpm install --frozen-lockfile`, `pnpm build`, and `pnpm lint` as part of checks.

---

## Testing & Linting

- ESLint is available via `pnpm lint` (see [eslint.config.mjs](eslint.config.mjs#L1)).
- There is no test configuration in the repo by default; we recommend adding Jest + React Testing Library for unit tests and Playwright for E2E.

---

## Contributing

- Fork, create a feature branch, and open a PR with a clear description and screenshots where applicable.
- Follow existing code conventions (TypeScript strict, no `any`, prefer Server Components where possible).
- Run `pnpm lint` and ensure static checks pass before submitting a PR.

---

## Troubleshooting

- If types fail locally, run `pnpm install` and ensure your Node version matches the project requirements.
- For runtime API issues, verify `NEXT_PUBLIC_API_BASE_URL` and back-end availability.

---

## Where to look (quick links)

- App entry & routes: [app/layout.tsx](app/layout.tsx#L1)
- Localized routes: [app/[locale]/page.tsx](app/%5Blocale%5D/page.tsx#L1)
- Actions: [actions/authActions.ts](actions/authActions.ts#L1)
- Helpers: [helpers/axios.ts](helpers/axios.ts#L1)
- Global store example: [store/AuthSlice.tsx](store/AuthSlice.tsx#L1)
- Package manifest: [package.json](package.json#L1)

---

## License & Credit

This frontend is part of the Sanad project. Add license information here if applicable.

---

If you'd like, I can now:

- run a quick sanity check (type check / lint) locally, or
- extend README with a `.env.example` and contributor guide.

Next.js App Router + TypeScript frontend for the Sanad platform. Focused on a server-first rendering model, modular feature-based components, Stripe payments, and real-time notifications.

---

## Table of contents

- [Quick Start](#quick-start)
- [Requirements](#requirements)
- [Available scripts](#available-scripts)
- [Environment variables](#environment-variables)
- [Tech stack](#tech-stack)
- [Architecture & patterns](#architecture--patterns)
- [Folder map](#folder-map)
- [Developer notes](#developer-notes)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Quick Start

1. Install dependencies (preferred: `pnpm` because the repo contains `pnpm-lock.yaml`):

```bash
pnpm install
```

2. Run the development server:

```bash
pnpm dev
# -> runs `next dev`
```

3. Build for production:

```bash
pnpm build
pnpm start
```

Run type-check only (no emit):

```bash
npx tsc --noEmit
```

---

## Requirements

- Node.js 18+ (use the latest LTS compatible with Next 16+)
- pnpm (recommended) or npm / yarn
- Recommended editor: VS Code with TypeScript, ESLint and Tailwind extensions

---

## Available scripts

- `pnpm dev` — start Next.js in development (maps to `next dev`)
- `pnpm build` — production build (`next build`)
- `pnpm start` — start production server (`next start`)
- `pnpm lint` — run the project's ESLint configuration

These are defined in [package.json](package.json).

---

## Environment variables

This project relies on runtime configuration from environment variables. Exact variable names are declared in source code; the list below is a suggested starting point — verify names in the codebase before use.

Example `.env.local` (adjust to your backend and secrets):

```env
# API
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api

# Realtime
NEXT_PUBLIC_SOCKET_URL=http://localhost:8000

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx

# Auth / JWT
NEXTAUTH_SECRET=your-secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Keep secrets out of source control and use your platform's secret manager for production (Vercel, Netlify, Docker secrets, etc.).

---

## Tech stack

- Framework: `Next.js` (App Router, v16.x)
- UI: `React` + `TypeScript`
- Styling: `Tailwind CSS` (v4) + PostCSS
- Data + caching: `@tanstack/react-query` (v5)
- Client state: `zustand`
- HTTP client: `axios`
- Realtime: `socket.io-client`
- Payments: `stripe`, `@stripe/react-stripe-js`
- Rich text: `tiptap` (+ image/link/placeholder extensions)
- Charts: `recharts`
- Motion: `framer-motion`
- Carousel: `swiper`
- Notifications: `sonner`
- Security: `dompurify` (sanitize HTML)
- Linting: `eslint` + `eslint-config-next`

All core dependencies are declared in [package.json](package.json).

---

## Architecture & patterns

- App Router first: `app/` contains the routes, layouts, and server components.
- Server-first data fetching: prefer server components for loading data and use React Query for client-side caching when needed.
- `actions/` holds server actions and API-facing helper functions.
- Feature-based component organization: `components/` is organized by feature area (auth, cart, dashboard, website, etc.).
- Utility layers:
  - `helpers/` for small utilities and shared functions
  - `hooks/` for reusable React hooks
  - `store/` for global client state
  - `types/` for shared TypeScript types

Security & validation recommendations:

- Sanitize user-generated HTML before rendering with `dompurify`.
- Validate and sanitize all server inputs (use Zod or a similar runtime validation library in server actions).
- Keep secrets in env vars and avoid exposing any secret to the browser.

---

## Folder map

- [app/](app/) — Next.js App Router entry, layouts and page routes.
- [actions/](actions/) — server actions and higher-level request handlers.
- [api/](api/) — API route helpers and server endpoints.
- [components/](components/) — feature-organized React components.
- [constants/](constants/) — shared constants, UI data and static content.
- [helpers/](helpers/) — utilities and request wrappers (axios, fetch helpers).
- [hooks/](hooks/) — reusable React hooks.
- [lib/](lib/) — small wrappers for external libs (e.g., payments)
- [store/](store/) — global state management (slices, stores).
- [translations/](translations/) — i18n JSON files (`ar.json`, `en.json`).
- [types/](types/) — TypeScript interfaces and domain types.
- [public/](public/) — static assets (images, sections, icons).

Links above point to the repository folders for quick navigation.

---

## Developer notes

- Code style: follow the existing ESLint configuration (`eslint-config-next`).
- Type checking: run `npx tsc --noEmit` to validate types before commits.
- Prefer server components in `app/` for initial data loading to reduce client bundle size.
- Keep environment variables prefixed with `NEXT_PUBLIC_` only for values safe to expose to the browser.

Recommended VS Code extensions:

- ESLint
- Tailwind CSS IntelliSense
- TypeScript and React snippets

---

## Testing

No test suite is configured in this repository. Recommended next steps:

- Unit + components: `Jest` + `React Testing Library`
- E2E: `Playwright` (preferred for Next.js flows and auth)

---

## Deployment

Recommended: Vercel for best Next.js experience. A generic deployment flow:

```bash
pnpm build
pnpm start
```

Set environment variables in your hosting platform (Vercel/Netlify/Render) rather than in the repo.

---

## Contributing

- Fork and create a feature branch for changes.
- Keep pull requests small, focused, and well-tested.
- Run `pnpm lint` and `npx tsc --noEmit` before opening a PR.

If you want, I can add a PR checklist, commit hooks, or a GitHub Actions CI workflow.

---

## License

This repository is marked `private` in `package.json`. Confirm license and publishing rules with the maintainers before publishing.

---

## Where to look next

- App entry & routes: [app/](app/)
- Server actions: [actions/](actions/)
- UI components: [components/](components/)
- Helpers & hooks: [helpers/](helpers/) · [hooks/](hooks/)

If you'd like, I can now:

1. Run a local type-check and report errors.
2. Add a CI workflow (GitHub Actions) that runs lint + type-check.
3. Generate an env example file `.env.example` from detected variables.

Tell me which next step you prefer.
