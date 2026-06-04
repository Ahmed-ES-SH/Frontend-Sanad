---
target: app/[locale]/(routes)/dashboard/blog/[articleId]/page.tsx
total_score: 18
p0_count: 0
p1_count: 3
timestamp: 2026-06-02T18-28-02Z
slug: pp-locale-routes-dashboard-blog-articleid-page-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Silent saves. No toast, no success indicator. `result.success` checked but the failure branch is empty; `console.error` is the only error path. |
| 2 | Match System / Real World | 3 | "Taxonomy" is consultant vocabulary, not editor vocabulary. Hard-coded `"en-US"` locale breaks the Arabic audience. |
| 3 | User Control and Freedom | 1 | `CategoriesTags` exposes Save but no Cancel. `previousFocusRef` is declared but never bound to a trigger; focus-return is a side-effect of `document.activeElement`. No undo on delete. |
| 4 | Consistency and Standards | 1 | Save is emerald in three components, orange link-style in `CategoriesTags`. `surface-btn-primary` is defined in tokens but unused. Edit-post uses solid `bg-primary`; tokens use a gradient. The vocabulary is split. |
| 5 | Error Prevention | 2 | Confirm dialogs exist for high-stakes actions. But the "E" keyboard shortcut fires from `SELECT` and `contenteditable`, and "S" saves the title from anywhere on the page (including while typing in the HTML content textarea in `ArticleContent`). |
| 6 | Recognition Rather than Recall | 2 | kbd hint shown for "E" only; S and Esc are hidden. No unsaved-changes badge — editors must remember which section they edited. Per-component dirty state, not global. |
| 7 | Flexibility and Efficiency | 2 | E/S/Esc shortcuts exist but no Cmd+S, no batch, no tag autocomplete, no "Save and stay"/"Save and close" distinction. |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained stone palette, no decoration, no gradients. Hero-metric 4-up card grid in `ArticleStats` and a 384px cover image dominate visual weight for a tool surface. |
| 9 | Error Recovery | 1 | Errors are silent. `setIsEditing(false)` runs in `finally` regardless of save success. If the API is down, the editor thinks it saved. |
| 10 | Help and Documentation | 1 | Tooltips exist for the stat labels and nothing else. No help link, no field-level guidance, no shortcut reference. |
| **Total** | | **18/40** | **Acceptable. Significant improvements needed before users feel confident.** |

---

## Anti-Patterns Verdict

**Start here. Does this look AI-generated?**

**LLM assessment**: No. The page is restrained, tool-like, and avoids the saturated tells (no gradient text, no side-stripe borders, no glassmorphism, no uppercase tracked eyebrows, no numbered scaffolding). The strongest residual tell is structural: `ArticleStats` is the canonical 4-card hero-metric grid, two of whose four cells contain hard-coded `"—"` data. Save-button vocabulary is split across emerald and orange without a rule. The reading is "competent hand-built code" not "AI scaffold."

**Deterministic scan**: 1 finding.
- `gray-on-color` at `app/components/dashboard/_articleDetails/ArticleHeader.tsx:412` — `text-stone-500 on bg-red-50`. This is the delete button: the default state is `text-stone-500` on the page background (white-ish with mesh gradients), and the hover state is `text-red-600` on `bg-red-50`. The detector is flagging the stacked default+hover class. Treat as a low-severity warning rather than a real bug; the visible state on hover is fine. **False positive, with a useful undercurrent:** the delete affordance is icon-only with no text label, which fails `Recognition` for first-time editors — the detector caught a real concern via the wrong rule.

**Visual overlays**: Skipped. No dev server is running and the target is a server component with auth-gated data; the live page would 404 in any case. CLI scan + manual source review is sufficient for this target.

The LLM review caught issues the detector did not: the `SEOMetadata` phantom field, the `dangerouslySetInnerHTML` XSS surface, the keyboard-shortcut correctness bugs, the emerald/orange button split, the hard-coded `en-US` locale, the `prefers-reduced-motion` gap, the `text-stone-400` contrast failures, and the silent error path. The detector caught nothing the LLM missed.

---

## Overall Impression

A working admin tool, structurally correct, with the bones of something trustworthy. The skeleton fidelity is genuinely good, the confirmation pattern is well-written, and the semantic structure (main, aside, dl/dt/dd, time) is more careful than most dashboards. But the page has a load-bearing trust problem: **saves are silent, the "Focus keyword" field is a phantom, and the "Save" button is a different color in every component that uses it.** Editors will not learn this surface because nothing on it teaches them — including their own mistakes. The single biggest opportunity is consolidating the dirty-state and save-affordance model into one global pattern, then making the "did it save?" answer visible.

---

## What's Working

1. **Confirmation pattern is well-written and consistent.** All three confirm dialogs in `ArticleHeader` use the same `ConfirmDialog` component with tone-aware colors and clear copy: "This action cannot be undone" for delete; "You can unpublish it anytime" for publish. Reassurance at high-stakes moments is the right call.
2. **Skeleton fidelity is unusually high.** `ArticleHeaderSkeleton` uses `bg-primary/20` to hint at the primary action's location; `ArticleContentSkeleton` matches the cover image height. The page does not "jump" on hydration. The inline skeletons in `loading.tsx` for SEO/Taxonomy are the weak spot (see Minor Observations).
3. **The status pill, kbd hint, and aside grid are restrained and on-brand.** No gradient text, no uppercase tracked eyebrow, no decorative chrome. The stone surface and orange accent follow the project's Restrained color strategy without a slip.

---

## Priority Issues

### [P1] `SEOMetadata` "Focus keyword" is a phantom field
**Why it matters**: `SEOMetadata.tsx:24` initializes `focusKeyword` to `article.title`. The input is rendered as editable. `handleSaveSEO` (line 28-47) only writes `excerpt`. An editor who types a real focus keyword, hits Save, and re-reads the card sees the field reset to the title on the next mount. This is a trust-destroying bug — the UI promises a feature it does not ship.
**Fix**: Either (a) wire to a real `focusKeyword` field with a backend column, or (b) remove the field, or (c) keep it as read-only SEO guidance and disable the input. Do not show an editable, unsaved, re-overwritten field.
**Suggested command**: `/impeccable clarify` (copy + structure) or a focused `harden` pass.

### [P1] `ArticleContent` renders `article.content` via `dangerouslySetInnerHTML` without sanitization
**Why it matters**: `ArticleContent.tsx:204` injects `article.content` as raw HTML. The same component exposes a raw HTML textarea editor at `ArticleContent.tsx:191-199` (line 197 is literally a `<textarea>` with `placeholder="<h1>Your content here</h1>..."`). Paste-from-Word vectors and stored XSS in an admin surface is critical-severity: any editor with a session can inject scripts that execute for every other admin viewing the article.
**Fix**: Sanitize on render with `isomorphic-dompurify` (server-side, fast) at minimum. Better: switch the content model to Markdown or block-based; HTML is an editor footgun.
**Suggested command**: `/impeccable harden` (security) or a focused security pass.

### [P1] `CategoriesTags` exposes Save with no Cancel
**Why it matters**: User adds a tag or changes the category, changes their mind. The "Save" button is the only recourse — committing a possibly-wrong change — or they navigate away, losing context. This is the most actionable "I made a mistake" moment on the page and it is missing.
**Fix**: Render a Cancel button next to Save when `hasChanges === true`. Wire to a `handleCancel` that resets `selectedCategoryId` and `tags` from `article`. Use the same `surface-btn-secondary` token.
**Suggested command**: `/impeccable polish` or a focused `harden` pass.

### [P2] `ArticleHeader` global keyboard listener has multiple correctness bugs
**Why it matters**:
- The `isInput` check at `ArticleHeader.tsx:214-215` covers `INPUT`/`TEXTAREA` only. Pressing "E" while focus is in a `SELECT` (the category dropdown) or any `contenteditable` element opens the title editor.
- The "S" key calls `handleSaveTitle` (the title save) from anywhere on the page, including when the user is editing the HTML content in `ArticleContent`. Wrong save fired.
- The focus trap's `previousFocusRef` relies on `document.activeElement` at the moment the modal opens. When the modal is opened via the global "E" key, `document.activeElement` is `body`, not the trigger button. Focus return goes to `body`, not the trigger.
**Fix**: Scope keyboard shortcuts to a containing element via `onKeyDown` on a `<div tabIndex={-1}>` wrapper. Add `SELECT` and `[contenteditable]` to the `isInput` check. Explicitly capture the trigger ref in `setShowXConfirm` callers.
**Suggested command**: `/impeccable audit` (keyboard/accessibility).

### [P2] Inconsistent Save button styling — emerald in 3 places, orange link in 1
**Why it matters**: `surface-btn-primary` exists in `globals.css` (gradient orange→amber, soft shadow) but is unused. The Edit-post button uses solid `bg-primary`; the Save buttons in `ArticleHeader`, `ArticleContent`, and `SEOMetadata` use solid `bg-emerald-600`; the Save in `CategoriesTags` is a text link in orange. Green-on-green also collapses the publish/save distinction (Publish is emerald-700 in `ArticleHeader`, Save is emerald-600 in three components — both green, both "go").
**Fix**: Pick the semantic split: orange = primary action, emerald = positive confirmation (publish/save succeeded). Either (a) replace the three emerald Save buttons with `surface-btn-primary` and add a `surface-btn-positive` token for publish, or (b) keep solid colors but standardize them — `bg-emerald-600` for all "save changes" and `bg-primary` for "publish". Same shape, same height, same focus ring everywhere.
**Suggested command**: `/impeccable polish` (component vocabulary) or `/impeccable document` (codify the rule).

### [P2] `ArticleStats` displays hard-coded `"—"` as data
**Why it matters**: "Shares" and "Comments" (`ArticleStats.tsx:47, 53`) are placeholder values in a real-looking card. They get the same visual weight as Views (which has data). This trains the editor to ignore the panel.
**Fix**: Either (a) wire to real fields, (b) hide the cards until data is available, or (c) replace the row with a single inline empty state ("Comments coming soon") instead of a fake 4-up grid. If the feature is not shipping, do not ship its UI. Also: the 4-up grid is the canonical hero-metric pattern — drop to 2 stats (Views, Read time) until more data is wired.
**Suggested command**: `/impeccable distill`.

### [P2] `motion.section` / `motion.article` ignore `prefers-reduced-motion`
**Why it matters**: All four motion components (`ArticleHeader.tsx:95-99`, `ArticleContent.tsx:83-87`, `SEOMetadata.tsx:56-60`, `CategoriesTags.tsx:103-107`) use opacity fade-in. For users with vestibular sensitivity this is a baseline accessibility violation. The page's `globals.css` resets `animation-duration` to `0.01ms` under `prefers-reduced-motion` but framer-motion animations are JS-driven and bypass CSS.
**Fix**: Wrap the dashboard in `<MotionConfig reducedMotion="user">` at the layout level, or branch on `useReducedMotion()` and skip the fade. The token is one line; coverage is whole-tree.
**Suggested command**: `/impeccable audit` (accessibility).

### [P3] Hard-coded `"en-US"` locale breaks Arabic audience
**Why it matters**: `formatDate` in `ArticleHeader.tsx:184` and `ArticleContent.tsx:44`, and `formatViews` in `ArticleStats.tsx:27`, hard-code `"en-US"`. Arabic users on a MENA product see English month names and English digit grouping. This contradicts the bilingual ar/en requirement in `PRODUCT.md`.
**Fix**: Read the route locale (next-intl `useLocale()` or `params.locale`) and pass it to `toLocaleDateString` and `Intl.NumberFormat`. Use `Intl.RelativeTimeFormat` for "X minutes ago" in `formatRelativeTime` (`ArticleHeader.tsx:193-209`).
**Suggested command**: `/impeccable clarify` (UX copy + locale).

### [P3] Color contrast: `text-stone-400` on `bg-stone-50` and white fails WCAG AA
**Why it matters**: `text-stone-400` (#a8a29e) is used in `SEOMetadata.tsx:94, 119, 123` for "Not set", "No description set", and the character counter. On white the contrast is ~2.85:1; on `bg-stone-50` it's worse. WCAG AA requires 4.5:1 for body text. This is the project's own anti-pattern from the parent skill: "Placeholder text needs the same 4.5:1, not the muted-gray default."
**Fix**: Replace `text-stone-400` with `text-stone-500` (~4.6:1 on white, passes AA). The `text-stone-500` already in use elsewhere is correct; `text-stone-400` is the slip.
**Suggested command**: `/impeccable audit` (contrast).

### [P3] Save failures are silent — `result.success` checked, false branch empty
**Why it matters**: In all four save handlers (`ArticleHeader.tsx:267`, `ArticleContent.tsx:59`, `SEOMetadata.tsx:37`, `CategoriesTags.tsx:84`), `result.success` is checked but the `else` branch does nothing. The `finally` block sets `isEditing(false)` and `isSaving(false)` regardless. If the API is down, the editor sees the spinner stop and the form close — they think it saved.
**Fix**: On failure, show an inline error (a `surface-badge` with `text-red-600`) inside the card, keep edit mode open, do not reset dirty state. Surface "Article saved" on success via a transient banner or aria-live region so the screen reader user hears the result.
**Suggested command**: `/impeccable harden`.

---

## Persona Red Flags

**Alex (Power User)**
- "E" fires from `SELECT` and `contenteditable` (`ArticleHeader.tsx:214-215`).
- "S" saves the title from anywhere — including while editing the HTML content textarea. Wrong save.
- No `Cmd+S`/`Ctrl+S` binding; the only way to save the title is the green icon or the global "S" listener.
- Tag input is `w-20` (80px) (`CategoriesTags.tsx:181`) — typing anything longer than 6 chars is painful.
- No "Save and stay" / "Save and close" distinction on edit forms.
- No bulk operations, no quick-tag suggestions from existing tag corpus.

**Sam (Accessibility-Dependent)**
- `text-stone-400` placeholder text fails AA contrast at `SEOMetadata.tsx:94, 119, 123` (~2.85:1).
- Custom buttons have hover states but no `focus-visible` ring (`ArticleHeader.tsx:365, 374, 388, 420`, etc.). Only inputs use `focus:ring-2`.
- Modal focus return is unreliable — when opened via the keyboard shortcut, `previousFocusRef` points at `body`, not the trigger.
- No `aria-live` region for save success/failure. Screen reader user hits Save, hears nothing change.
- "Taxonomy" and "SEO" are jargon; the field labels are correct but the section labels assume consultant vocabulary.
- Custom emerald Save buttons in `ArticleContent.tsx:102` and `SEOMetadata.tsx:133` have no visible text-only focus state.

**Riley (Stress Tester)**
- No error UI on save failure. If the API is down, the editor sees the spinner stop and the form close — they think it saved.
- No "are you sure you want to leave?" prompt for unsaved changes.
- Cover image URL field accepts any string including `javascript:` URIs (`ArticleContent.tsx:135-142`): no scheme validation. A malicious editor can store `javascript:alert(1)` as `coverImageUrl`.
- `dangerouslySetInnerHTML` on `article.content` is an XSS sink (see P1).
- `CategoriesTags` dirty check uses `JSON.stringify(tags) !== JSON.stringify(article.tags || [])` — order-dependent, will mark dirty if the editor reorders tags without changing them.
- `formatDate` hard-coded `"en-US"` locale — Arabic inputs and very long strings are not exercised.
- `article` prop changing while a save is in flight can race; the `useEffect` at `ArticleContent.tsx:31-35` resets edit state on every article change, including the `router.refresh()` that the same component triggers on save. Possible edit-state loss on rapid saves.

---

## Minor Observations

- `page.tsx:10` — `params: Promise<{ articleId: string; local: string }>`: `local` is likely a typo for `locale`. Inert if unused but the type lies.
- `page.tsx:24-40` — `<div className="flex flex-col gap-10">` is the only wrapper between `<main>` and the components. A `<header>` for the top group and `<section aria-labelledby="...">` for content would tighten the structure.
- `ArticleContent.tsx:117` — `h-72 sm:h-96` is 288px → 384px. For an internal tool, this is large. A `max-h-80` with `aspect-video` would be tighter.
- `ArticleHeader.tsx:303-316` — status pill uses inline `bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60` for published and `bg-stone-100 text-stone-600 ring-1 ring-stone-200/60` for draft. The orange `surface-badge` token is not reused for the published state; consider a `surface-badge-success` variant.
- `ArticleHeader.tsx:330` — title input `autoFocus`es but does not `select()`. Cursor goes to end of existing text. Annoying for an editor who wants to retitle.
- `CategoriesTags.tsx:31-46` — categories are loaded client-side from a server action, with a flash. Pass them as a prop from the server page instead.
- `SEOMetadata.tsx:151-156` — the "URL" footer is shown but is not an editable field. It earns its place but breaks the edit/view pattern of the rest of the card.
- `loading.tsx:20-33` — SEO/Taxonomy skeletons are inline `animate-pulse` divs while siblings use dedicated skeleton components. The shape doesn't match the real cards (3 divs vs 2 input + 1 select + tag list). Inconsistent skeleton fidelity.
- `ArticleHeader.tsx:193-209` — `formatRelativeTime` rolls its own logic instead of `Intl.RelativeTimeFormat`. The output is English-only.
- `ArticleContent.tsx:209-220` — "View on website" only shows when `isPublished`. A draft editor may want to preview-as-draft. No preview option.
- `ArticleHeader.tsx:61` — `setTimeout(50)` to wait for modal mount is a hack. `useLayoutEffect` or focusing on the next render via ref is more deterministic.
- The unused `SocialSharing.tsx` and `ArticleQuickActions.tsx` exist in `app/components/dashboard/_articleDetails/` but are not imported in `page.tsx`. Dead code or reserved for a future enhancement.

---

## Questions to Consider

1. **Is "Taxonomy" the right name for the section an editor will scan for?** Most CMS editors look for "Categories" or "Tags" first. The current label is consultant vocabulary, not editor vocabulary. Would renaming to "Categories & tags" (or splitting into two stacked sections) reduce search cost for the primary task?

2. **Should the page have any "you are in edit mode" indicator at the top?** Right now the only signal of edit mode is the form fields themselves. If an editor opens two tabs and edits both, there is no global "Edit mode active — autosaved 14:02" indicator. For a tool whose primary job is editing, is "edit-in-place, no banner" the right model?

3. **Is HTML the right content model?** The `ArticleContent` textarea invites paste-from-Word (with all its `<o:p>`, inline styles, MS classnames). The XSS surface, the lack of preview, and the lack of structure (headings/lists are just rendered, not editable as structure) all point to a content-model problem upstream. Would a block-based editor (Notion-style) or Markdown with live preview reduce both the security and the editor-experience cost?

4. **Where does "Saved" feedback live?** A tool whose entire job is making changes and seeing them persist, with no visible save feedback, is fighting its own task. A single transient "Saved" toast at the top right (or an `aria-live` region for screen readers) closes a loop the page currently leaves open.
