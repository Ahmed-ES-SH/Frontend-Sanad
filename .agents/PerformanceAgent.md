# 🚀 Performance Agent — Next.js & React

> **Role:** Senior Full-Stack Performance Engineer  
> **Stack:** Next.js 15 (App Router) · React 19 · TypeScript  
> **Mission:** Diagnose, optimize, and prevent performance issues across the entire rendering pipeline.

---

## Table of Contents

1. [Mental Model: The Performance Stack](#1-mental-model)
2. [React Core Performance Primitives](#2-react-core)
3. [Next.js Rendering Strategies](#3-rendering-strategies)
4. [Caching System (Next.js 15)](#4-caching-system)
5. [Code Splitting & Lazy Loading](#5-code-splitting)
6. [Image & Font Optimization](#6-assets)
7. [Bundle Optimization](#7-bundle)
8. [Streaming & Suspense Architecture](#8-streaming)
9. [Core Web Vitals](#9-cwv)
10. [Profiling & Measurement Tools](#10-profiling)
11. [Anti-Patterns & Pitfalls](#11-antipatterns)
12. [Performance Checklist](#12-checklist)

---

## 1. Mental Model: The Performance Stack <a name="1-mental-model"></a>

```
┌─────────────────────────────────────────────────────────┐
│                   BROWSER / CLIENT                      │
│  CWV Metrics → LCP · FID/INP · CLS · TTFB             │
├─────────────────────────────────────────────────────────┤
│                 REACT LAYER                             │
│  Re-render prevention → memo · useMemo · useCallback   │
│  Concurrent   → useTransition · useDeferredValue       │
│  Lazy         → React.lazy · Suspense                  │
├─────────────────────────────────────────────────────────┤
│                 NEXT.JS LAYER                           │
│  Rendering    → SSG · SSR · ISR · PPR · Server Comps   │
│  Caching      → Data Cache · Full Route · Request Memo │
│  Assets       → next/image · next/font · next/dynamic  │
│  Bundle       → Tree-shaking · Code-split · Turbopack  │
└─────────────────────────────────────────────────────────┘
```

**Golden Rule:** Push work to the server, cache aggressively, minimize client JavaScript.

---

## 2. React Core Performance Primitives <a name="2-react-core"></a>

### 2.1 `React.memo` — Prevent Unnecessary Re-renders

Wraps a component so it only re-renders when its **props change** (shallow comparison).

```tsx
import { memo } from "react";

// ✅ Only re-renders when `onSubmit` or specific props change
const ShippingForm = memo(function ShippingForm({ onSubmit, items }) {
  console.log("ShippingForm rendered");
  return (
    <form onSubmit={onSubmit}>
      {items.map((i) => (
        <div key={i.id}>{i.name}</div>
      ))}
    </form>
  );
});
```

> ⚠️ **Pitfall:** `memo` is useless if you pass new object/function references on every render — pair it with `useCallback` / `useMemo`.

---

### 2.2 `useCallback` — Stable Function References

```tsx
import { useCallback, memo } from "react";

function ProductPage({ productId, referrer }) {
  // ✅ Stable reference — only changes when productId or referrer change
  const handleSubmit = useCallback(
    (orderDetails) => {
      post(`/product/${productId}/buy`, { referrer, orderDetails });
    },
    [productId, referrer],
  );

  return <ShippingForm onSubmit={handleSubmit} />;
}
```

**When to use:**

- Passing callbacks to `memo`-wrapped children
- Callbacks used as `useEffect` dependencies
- Event handlers in large lists

**When NOT to use:**

- Simple components that render fast anyway
- Callbacks that change on every render intentionally

---

### 2.3 `useMemo` — Cache Expensive Computations

```tsx
import { useMemo, useState } from "react";

function ProductList({ products, filterText, sortBy }) {
  // ✅ Only recomputes when products, filterText, or sortBy change
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.name.toLowerCase().includes(filterText.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === "price") return a.price - b.price;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [products, filterText, sortBy]);

  // ✅ Stable object reference for child component
  const contextValue = useMemo(
    () => ({
      products: filteredProducts,
      total: filteredProducts.reduce((sum, p) => sum + p.price, 0),
    }),
    [filteredProducts],
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {filteredProducts.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </ProductContext.Provider>
  );
}
```

**Use `useMemo` for:**

- Filtering / sorting large arrays
- Deriving data from props
- Stable object references passed to context or memo children
- Expensive computations (>1ms)

---

### 2.4 `useTransition` — Non-Blocking State Updates

Marks a state update as **non-urgent**, keeping the UI responsive during heavy renders.

```tsx
import { useState, useTransition } from "react";

function TabContainer() {
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState("home");

  function selectTab(tab: string) {
    // ✅ This update won't block user input (typing, clicking)
    startTransition(() => {
      setActiveTab(tab);
    });
  }

  return (
    <>
      <TabBar onSelect={selectTab} />
      {/* Show stale UI while new tab loads */}
      <div style={{ opacity: isPending ? 0.7 : 1 }}>
        <TabContent tab={activeTab} />
      </div>
    </>
  );
}
```

> **Key difference from `setTimeout`:** `startTransition` is synchronous, interruptible, and integrated with React's scheduler — not deferred to the event loop.

---

### 2.5 `useDeferredValue` — Throttle Expensive Child Renders

```tsx
import { useDeferredValue, useState, Suspense } from "react";

function SearchPage() {
  const [query, setQuery] = useState("");
  // ✅ deferredQuery lags behind query — avoids rendering SearchResults on every keystroke
  const deferredQuery = useDeferredValue(query);

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      {/* Uses stale deferredQuery until React has idle time */}
      <Suspense fallback={<Spinner />}>
        <SearchResults query={deferredQuery} />
      </Suspense>
    </>
  );
}
```

| Hook               | Controls                 | Use When                 |
| ------------------ | ------------------------ | ------------------------ |
| `useTransition`    | Who triggers the update  | You own the state setter |
| `useDeferredValue` | A value received as prop | You don't own the state  |

---

### 2.6 `React.lazy` + `Suspense` — Component-Level Code Splitting

```tsx
import { lazy, Suspense } from "react";

// ✅ Bundle is split — only loaded when component mounts
const HeavyChart = lazy(() => import("./HeavyChart"));

export default function Dashboard() {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <HeavyChart />
    </Suspense>
  );
}
```

---

## 3. Next.js Rendering Strategies <a name="3-rendering-strategies"></a>

### Decision Matrix

```
Is the page data dynamic per request?
├── NO  → Is it the same for all users?
│         ├── YES → Static Generation (SSG) — build-time HTML
│         └── Can it be revalidated periodically?
│                  └── YES → ISR (revalidate: N seconds)
└── YES → Does it need full personalization?
          ├── NO  → Partial Prerendering (PPR) — static shell + dynamic islands
          └── YES → Server-Side Rendering (SSR) — dynamic() { revalidate: 0 }
```

### 3.1 Static Generation (SSG) — Fastest

```tsx
// app/blog/[slug]/page.tsx
// ✅ Generated at build time — served from CDN edge
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug); // cached at build time
  return <article>{post.content}</article>;
}
```

### 3.2 ISR — Stale-While-Revalidate

```tsx
// app/products/page.tsx
async function getProducts() {
  const res = await fetch("https://api.example.com/products", {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  return res.json();
}
```

### 3.3 Server Components (Default in App Router)

Zero JavaScript sent to client. Use for:

- Data fetching
- Database queries
- Auth checks
- Large dependencies (markdown parsers, ORMs)

```tsx
// app/dashboard/page.tsx — Server Component (no 'use client')
import { db } from "@/lib/db";

export default async function Dashboard() {
  // ✅ Runs on server — zero JS bundle cost
  const stats = await db.query("SELECT * FROM analytics LIMIT 100");
  return <StatsGrid data={stats} />;
}
```

### 3.4 Partial Prerendering (PPR) — Next.js 15+

Best of static + dynamic in one request.

```tsx
// next.config.ts
export default {
  experimental: { ppr: true },
};

// app/product/[id]/page.tsx
import { Suspense } from "react";

export default function ProductPage({ params }) {
  return (
    <>
      {/* ✅ Static — prerendered at build time */}
      <ProductDetails id={params.id} />

      {/* ✅ Dynamic — streams in after static shell */}
      <Suspense fallback={<PriceSkeleton />}>
        <LivePrice id={params.id} />
      </Suspense>

      <Suspense fallback={<RecommendationsSkeleton />}>
        <PersonalizedRecs userId={params.id} />
      </Suspense>
    </>
  );
}
```

---

## 4. Caching System (Next.js 15) <a name="4-caching-system"></a>

### 4.1 Four Cache Layers

```
┌─────────────────────────────────────────────────────────┐
│  1. Request Memoization   (React cache / per-request)   │
│  2. Data Cache            (fetch / unstable_cache)      │
│  3. Full Route Cache      (static HTML + RSC payload)   │
│  4. Router Cache          (client-side prefetch cache)  │
└─────────────────────────────────────────────────────────┘
```

### 4.2 `React.cache` — Deduplicate within a Request

```tsx
// lib/user.ts
import { cache } from "react";

export const getUser = cache(async (id: string) => {
  return db.users.findUnique({ where: { id } });
});

// app/dashboard/page.tsx
// ✅ Called twice — but only ONE DB query per request
export default async function DashboardPage() {
  const user = await getUser("123");
  return <Dashboard user={user} />;
}

// app/components/Sidebar.tsx (also a Server Component)
export async function Sidebar() {
  const user = await getUser("123"); // ✅ Returns memoized result — no extra query
  return <nav>{user.name}</nav>;
}
```

### 4.3 `unstable_cache` — Persistent Data Cache

```tsx
import { unstable_cache } from "next/cache";

// ✅ Cached across requests, tagged for invalidation
const getCachedProducts = unstable_cache(
  async (categoryId: string) => {
    return db.products.findMany({ where: { categoryId } });
  },
  ["products-by-category"], // cache key prefix
  {
    tags: ["products"], // invalidation tag
    revalidate: 60, // seconds
  },
);

// Invalidate from a Server Action
import { revalidateTag } from "next/cache";
async function updateProduct(id: string, data: ProductData) {
  "use server";
  await db.products.update({ where: { id }, data });
  revalidateTag("products"); // ✅ Purges all entries tagged 'products'
}
```

### 4.4 `'use cache'` Directive — Next.js 15 (Experimental)

Fine-grained caching with `cacheLife` and `cacheTag`:

```tsx
// app/blog/page.tsx
import { cacheLife, cacheTag } from "next/cache";

async function getBlogPosts() {
  "use cache";
  cacheLife("hours"); // Revalidate every hour
  cacheTag("posts"); // Tagged for manual invalidation

  const res = await fetch("https://api.example.com/blog");
  return res.json();
}
```

### 4.5 Mixed Caching Strategy (Production Pattern)

```tsx
import { Suspense } from "react";
import { cacheLife, cacheTag } from "next/cache";
import { cookies } from "next/headers";

// 1. Static — build time, shared across all users
async function getProduct(id: string) {
  "use cache";
  cacheTag(`product-${id}`);
  return db.products.findUnique({ where: { id } });
}

// 2. Shared runtime cache — 5 minute TTL, all users
async function getProductPrice(id: string) {
  "use cache: remote";
  cacheTag(`product-price-${id}`);
  cacheLife({ expire: 300 });
  return db.products.getPrice({ where: { id } });
}

// 3. Private per-user cache — never shared
async function getRecommendations(productId: string) {
  "use cache: private";
  cacheLife({ expire: 60 });
  const sessionId = (await cookies()).get("session-id")?.value;
  return db.recommendations.findMany({ where: { productId, sessionId } });
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);
  return (
    <div>
      <ProductDetails product={product} />
      <Suspense fallback={<PriceSkeleton />}>
        <DynamicPrice productId={params.id} />
      </Suspense>
      <Suspense fallback={<RecsSkeleton />}>
        <PersonalizedRecs productId={params.id} />
      </Suspense>
    </div>
  );
}
```

---

## 5. Code Splitting & Lazy Loading <a name="5-code-splitting"></a>

### 5.1 `next/dynamic` — Next.js Lazy Loading

```tsx
import dynamic from "next/dynamic";

// ✅ Loaded in a separate bundle — not in the initial JS
const HeavyEditor = dynamic(() => import("@/components/Editor"), {
  loading: () => <EditorSkeleton />,
  ssr: false, // Client-only component (uses window, etc.)
});

// ✅ Conditional loading — only when user opens the modal
const AnalyticsModal = dynamic(() => import("@/components/AnalyticsModal"));

export default function Dashboard() {
  const [showAnalytics, setShowAnalytics] = useState(false);

  return (
    <div>
      <HeavyEditor /> {/* Separate bundle, loaded immediately */}
      <button onClick={() => setShowAnalytics(true)}>View Analytics</button>
      {showAnalytics && <AnalyticsModal />} {/* Loaded on demand */}
    </div>
  );
}
```

### 5.2 Dynamic Import for Heavy Libraries

```tsx
// ❌ Bad — imports entire library into initial bundle
import _ from "lodash";

// ✅ Good — tree-shaken, only import what you need
import debounce from "lodash/debounce";

// ✅ Best for rarely-used heavy libs — dynamic import
async function processFile(file: File) {
  const { default: Papa } = await import("papaparse");
  return Papa.parse(file);
}
```

### 5.3 Route-based Code Splitting (Automatic)

Next.js App Router automatically splits every `page.tsx` into its own bundle. No configuration needed.

```
app/
├── page.tsx          → bundle: /
├── dashboard/
│   └── page.tsx      → bundle: /dashboard  (separate chunk)
└── settings/
    └── page.tsx      → bundle: /settings   (separate chunk)
```

---

## 6. Image & Font Optimization <a name="6-assets"></a>

### 6.1 `next/image` — Automatic Optimization

```tsx
import Image from "next/image";

// ✅ Automatic: WebP/AVIF conversion, lazy loading, size optimization
export function ProductCard({ product }) {
  return (
    <div>
      {/* Above the fold — prioritize loading (affects LCP) */}
      <Image
        src={product.heroImage}
        alt={product.name}
        width={800}
        height={600}
        priority // ✅ Removes lazy loading for LCP images
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Below the fold — lazy load (default) */}
      <Image
        src={product.thumbnail}
        alt={product.name}
        width={200}
        height={200}
        // lazy loading is default — no prop needed
      />
    </div>
  );
}
```

**Key props for performance:**
| Prop | Effect |
|---|---|
| `priority` | Preloads image — use for LCP candidates |
| `sizes` | Tells browser which size to download |
| `placeholder="blur"` | Prevents CLS with a blur-up effect |
| `quality={75}` | Default 75 — lower for non-critical images |

### 6.2 `next/font` — Zero-Layout-Shift Fonts

```tsx
// app/layout.tsx
import { Inter, Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";

// ✅ Self-hosted, preloaded, no external network requests
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Prevents invisible text during load
  variable: "--font-inter",
});

const mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

// ✅ Local font — fastest possible loading
const brandFont = localFont({
  src: "./fonts/Brand.woff2",
  variable: "--font-brand",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${mono.variable} ${brandFont.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

---

## 7. Bundle Optimization <a name="7-bundle"></a>

### 7.1 Analyze Bundle Size

```bash
# Install analyzer
npm install @next/bundle-analyzer

# next.config.ts
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  // ... your next config
});

# Run analysis
ANALYZE=true npm run build
```

### 7.2 Optimize Package Imports

```ts
// next.config.ts
export default {
  experimental: {
    // ✅ Only imports used components — critical for icon libraries
    optimizePackageImports: [
      "lucide-react",
      "@heroicons/react",
      "date-fns",
      "lodash",
    ],
  },
};
```

### 7.3 External Packages (Server Only)

```ts
// next.config.ts — keep heavy server-only packages out of client bundle
export default {
  serverExternalPackages: ["sharp", "prisma", "@prisma/client"],
};
```

### 7.4 Tree-Shaking Best Practices

```tsx
// ❌ Imports the ENTIRE library
import * as icons from "lucide-react";

// ✅ Tree-shakeable named imports
import { Search, User, Settings } from "lucide-react";

// ❌ Side-effect imports prevent tree-shaking
import "some-library"; // only if necessary

// ✅ Mark your own utilities as pure
// Add "sideEffects": false in package.json
```

### 7.5 Turbopack (Next.js 15 Default for Dev)

```bash
# Turbopack is default dev bundler in Next.js 15
next dev              # Uses Turbopack automatically

# For production builds (Turbopack production — stable in 15.3+)
next build --turbopack
```

---

## 8. Streaming & Suspense Architecture <a name="8-streaming"></a>

### 8.1 Page-Level Streaming Pattern

```tsx
// app/dashboard/page.tsx
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <main>
      {/* ✅ Instantly visible — static shell */}
      <DashboardHeader />

      {/* ✅ Streams in as data arrives */}
      <div className="grid grid-cols-3 gap-4">
        <Suspense fallback={<StatCardSkeleton />}>
          <RevenueCard /> {/* Fastest query first */}
        </Suspense>

        <Suspense fallback={<StatCardSkeleton />}>
          <UserCountCard />
        </Suspense>

        <Suspense fallback={<StatCardSkeleton />}>
          <OrdersCard /> {/* Slowest query — doesn't block others */}
        </Suspense>
      </div>

      {/* ✅ Heavy table — isolated loading state */}
      <Suspense fallback={<TableSkeleton rows={10} />}>
        <RecentTransactions />
      </Suspense>
    </main>
  );
}
```

### 8.2 `loading.tsx` — Route-Level Suspense

```
app/dashboard/
├── page.tsx
└── loading.tsx     ← Automatic Suspense boundary for the entire route
```

```tsx
// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-48 mb-4" />
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded" />
        ))}
      </div>
    </div>
  );
}
```

### 8.3 Parallel Data Fetching

```tsx
// ❌ Sequential — each awaits the previous (waterfall)
const user = await getUser(id);
const orders = await getOrders(user.id);
const stats = await getStats(user.id);

// ✅ Parallel — all start simultaneously
const [user, orders, stats] = await Promise.all([
  getUser(id),
  getOrders(id),
  getStats(id),
]);
```

### 8.4 `ViewTransition` (React 19)

```tsx
import { ViewTransition, startTransition } from "react";

function Navigation({ onNavigate }) {
  return (
    <button
      onClick={() => {
        startTransition(() => onNavigate("/dashboard"));
      }}
    >
      Go to Dashboard
    </button>
  );
}

// Wrap the content that should animate
function PageContent({ page }) {
  return (
    <ViewTransition>
      <Suspense fallback={<PageSkeleton />}>
        <PageRouter page={page} />
      </Suspense>
    </ViewTransition>
  );
}
```

---

## 9. Core Web Vitals <a name="9-cwv"></a>

### 9.1 Metrics Reference

| Metric   | Full Name                 | Good   | Poor    | What Affects It                                   |
| -------- | ------------------------- | ------ | ------- | ------------------------------------------------- |
| **LCP**  | Largest Contentful Paint  | ≤2.5s  | >4s     | Hero images, server response, render-blocking JS  |
| **INP**  | Interaction to Next Paint | ≤200ms | >500ms  | Heavy JS on main thread, long tasks               |
| **CLS**  | Cumulative Layout Shift   | ≤0.1   | >0.25   | Images without dimensions, fonts, dynamic content |
| **TTFB** | Time to First Byte        | ≤800ms | >1800ms | Server speed, caching, CDN                        |
| **FCP**  | First Contentful Paint    | ≤1.8s  | >3s     | Render-blocking resources                         |

### 9.2 LCP Optimization Checklist

```tsx
// 1. ✅ Use priority on the LCP image
<Image src="/hero.jpg" priority alt="Hero" width={1200} height={600} />;

// 2. ✅ Preload critical resources in layout.tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link
          rel="preload"
          href="/fonts/brand.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

// 3. ✅ Use generateMetadata for resource hints
export async function generateMetadata() {
  return {
    other: {
      link: "<https://api.example.com>; rel=preconnect",
    },
  };
}
```

### 9.3 CLS Prevention

```tsx
// ❌ No dimensions — causes layout shift
<img src="/photo.jpg" alt="photo" />

// ✅ Explicit dimensions — reserves space
<Image src="/photo.jpg" alt="photo" width={800} height={600} />

// ✅ Use aspect-ratio CSS for dynamic containers
<div style={{ aspectRatio: '16/9', position: 'relative' }}>
  <Image src="/video-thumb.jpg" alt="thumb" fill />
</div>

// ✅ Use placeholder blur for images loaded after hydration
<Image
  src={dynamicUrl}
  alt="Dynamic content"
  width={400}
  height={300}
  placeholder="blur"
  blurDataURL="data:image/png;base64,..."
/>
```

### 9.4 ESLint for Core Web Vitals

```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([...nextVitals]);
```

---

## 10. Profiling & Measurement Tools <a name="10-profiling"></a>

### 10.1 React DevTools Profiler

```tsx
// Wrap suspected slow sections in Profiler
import { Profiler } from "react";

function onRenderCallback(
  id: string,
  phase: "mount" | "update",
  actualDuration: number,
  baseDuration: number,
) {
  if (actualDuration > 16) {
    // > 1 frame at 60fps
    console.warn(`Slow render: ${id} took ${actualDuration.toFixed(2)}ms`);
  }
}

export function Dashboard() {
  return (
    <Profiler id="Dashboard" onRender={onRenderCallback}>
      <ExpensiveComponent />
    </Profiler>
  );
}
```

### 10.2 `next/bundle-analyzer` Workflow

```bash
ANALYZE=true npm run build

# Look for:
# 1. Large vendor chunks (> 100kb gzipped)
# 2. Duplicated modules across chunks
# 3. Server-only code bleeding into client bundle
# 4. Large libraries with small usage (lodash, moment, etc.)
```

### 10.3 Performance Monitoring in Production

```tsx
// app/layout.tsx — report Web Vitals to your analytics
export function reportWebVitals(metric: {
  name: string;
  value: number;
  id: string;
}) {
  // Send to your analytics endpoint
  fetch("/api/vitals", {
    method: "POST",
    body: JSON.stringify(metric),
    headers: { "Content-Type": "application/json" },
  });
}
```

### 10.4 Lighthouse CI (Automated)

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci && npm run build
      - uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            http://localhost:3000
            http://localhost:3000/dashboard
          budgetPath: ./budget.json
          uploadArtifacts: true
```

```json
// budget.json
[
  {
    "path": "/*",
    "timings": [
      { "metric": "interactive", "budget": 3000 },
      { "metric": "first-contentful-paint", "budget": 1500 }
    ],
    "resourceSizes": [
      { "resourceType": "script", "budget": 150 },
      { "resourceType": "total", "budget": 500 }
    ]
  }
]
```

---

## 11. Anti-Patterns & Pitfalls <a name="11-antipatterns"></a>

### ❌ Over-using `'use client'`

```tsx
// ❌ Entire tree becomes client-side
'use client';
export default function Page() {
  return (
    <div>
      <HeavyDataTable />    {/* Now client-rendered — big bundle */}
      <button onClick={...}>Toggle</button>
    </div>
  );
}

// ✅ Push the interactive leaf down
// page.tsx — Server Component
export default function Page() {
  return (
    <div>
      <HeavyDataTable />    {/* Stays server-rendered */}
      <ToggleButton />      {/* Only this is 'use client' */}
    </div>
  );
}
```

### ❌ Waterfalling Fetches Inside Components

```tsx
// ❌ Each component waits for parent to resolve
function Page() {
  return <UserProfile />;
}
async function UserProfile() {
  const user = await getUser();
  return <Orders userId={user.id} />;  // Starts only after getUser
}
async function Orders({ userId }) {
  const orders = await getOrders(userId);  // Starts only after UserProfile
  return ...
}

// ✅ Hoist fetches to the top and pass data down
async function Page() {
  const [user, orders] = await Promise.all([getUser(), getOrders(userId)]);
  return <UserProfile user={user} orders={orders} />;
}
```

### ❌ Misusing `useMemo` / `useCallback`

```tsx
// ❌ Premature optimization — cheap operations don't need memoization
const doubled = useMemo(() => value * 2, [value]); // Pointless

// ❌ Missing dependency — stale closure bug
const fn = useCallback(() => doSomething(count), []); // count is stale!

// ✅ Only memoize genuinely expensive operations or to stabilize references
const expensiveResult = useMemo(() => runHeavyAlgorithm(data), [data]);
```

### ❌ Fetching in `useEffect` (Client Waterfalls)

```tsx
// ❌ Fetch happens AFTER render — causes layout shift and waterfall
function Component() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/api/data")
      .then((r) => r.json())
      .then(setData);
  }, []);
  return data ? <Content data={data} /> : <Spinner />;
}

// ✅ Server Component — fetch during render, no client JS needed
async function Component() {
  const data = await fetch("/api/data").then((r) => r.json());
  return <Content data={data} />;
}
```

### ❌ Not Granularizing Suspense Boundaries

```tsx
// ❌ One slow component blocks the entire page from streaming
<Suspense fallback={<FullPageSpinner />}>
  <FastWidget />
  <MediumWidget />
  <SlowWidget />    {/* Holds up FastWidget and MediumWidget */}
</Suspense>

// ✅ Isolated boundaries — each streams independently
<FastWidget />
<MediumWidget />
<Suspense fallback={<SlowSkeleton />}>
  <SlowWidget />
</Suspense>
```

---

## 12. Performance Checklist <a name="12-checklist"></a>

### Build Time

- [ ] Run `ANALYZE=true npm run build` and audit bundle
- [ ] No server-only packages in client bundles
- [ ] `optimizePackageImports` configured for icon/utility libs
- [ ] All static routes use SSG or ISR

### Data Fetching

- [ ] No fetch waterfalls — use `Promise.all` for parallel requests
- [ ] `React.cache` used for repeated fetches per request
- [ ] `unstable_cache` / `'use cache'` for persistent data caching
- [ ] Cache tags configured for targeted invalidation

### Components

- [ ] `memo` used on heavy children that receive stable props
- [ ] `useCallback` used for functions passed to `memo` children
- [ ] `useMemo` used for expensive computations (>1ms)
- [ ] `'use client'` pushed to the leaf level

### Rendering

- [ ] Parallel `Suspense` boundaries for independent data streams
- [ ] `loading.tsx` added to all major routes
- [ ] `useTransition` for non-urgent state updates
- [ ] `useDeferredValue` for search/filter inputs

### Assets

- [ ] All images use `next/image` with explicit width/height
- [ ] LCP image has `priority` prop
- [ ] Fonts loaded via `next/font` (no layout shift)
- [ ] Third-party scripts use `next/script` with `strategy="lazyOnload"`

### Monitoring

- [ ] `reportWebVitals` connected to analytics
- [ ] Lighthouse CI in GitHub Actions
- [ ] Performance budget defined in `budget.json`
- [ ] React `<Profiler>` around suspected slow sections in development

---

## Quick Reference

```
Re-render prevention    → memo + useCallback + useMemo
Non-blocking updates    → useTransition + startTransition
Throttle renders        → useDeferredValue
Lazy load components    → next/dynamic + React.lazy
Cache per request       → React.cache
Cache across requests   → unstable_cache / 'use cache'
Streaming               → Suspense + Server Components
Static HTML             → SSG + ISR (revalidate)
Bundle reduction        → optimizePackageImports + dynamic imports
Image performance       → next/image (priority for LCP)
Font performance        → next/font (no external requests)
```

---

_Agent built from official [Next.js](https://nextjs.org/docs) and [React](https://react.dev) documentation — verified against Next.js 15 App Router and React 19._
