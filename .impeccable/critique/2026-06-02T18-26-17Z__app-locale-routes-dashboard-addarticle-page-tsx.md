---
target: app/[locale]/(routes)/dashboard/addarticle/page.tsx
total_score: 13
p0_count: 5
p1_count: 4
timestamp: 2026-06-02T18-26-17Z
slug: app-locale-routes-dashboard-addarticle-page-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 1 | No save indicator, no skeleton for categories, no "saving..." state on buttons |
| 2 | Match Between System and Real World | 3 | "Untitled Masterpiece" whimsical copy is off-tone for an internal admin tool |
| 3 | User Control and Freedom | 1 | No autosave, no draft recovery, redirect on success with no undo, no preview-before-publish |
| 4 | Consistency and Standards | 2 | Three different card surface treatments in the same sidebar; inline gradient button where a class exists |
| 5 | Error Prevention | 1 | Empty title saves as "Untitled Draft" with no guardrail; no confirmation before publish; no character limits |
| 6 | Recognition Rather than Recall | 2 | 9 toolbar buttons are icon-only with no labels/tooltips; the rest of the screen is mostly self-describing |
| 7 | Flexibility and Efficiency of Use | 0 | No keyboard shortcuts, no Ctrl+S, no formatting shortcuts (toolbar is non-functional anyway) |
| 8 | Aesthetic and Minimalist Design | 2 | Dead toolbar is pure noise; 3 of 5 sidebars are decorative shells with no function |
| 9 | Error Recovery | 1 | Error appears at the top of the page, far from the source; no retry CTA; no role="alert" |
| 10 | Help and Documentation | 0 | No tooltips, no help link, no inline guidance for first-time editors |
| **Total** | | **13/40** | **Poor — major UX overhaul required before this is shippable as a real editor** |

## Anti-Patterns Verdict

**LLM assessment.** The AddArticle surface is *visually* pleasant but is a high-fidelity shell: the chrome looks finished, the components are well-typed, the i18n is wired up, but the work that actually matters on an article editor is missing. The deterministic scan is clean (`[]`); the issues are semantic, not decorative.

The slop reading is mixed. On the bright side: no glassmorphism-as-decoration, no mesh gradient bg, no gradient text, no side-stripe accents, no identical card grid. The page commits to a single orange/amber accent and a stone neutral, which fits the project's "tool, not showcase" principle.

But several rules in DESIGN.md and the Impeccable guidance are violated:

- **Eyebrow on every section.** All five cards (Article Details, Cover, Collaborators, Version History, Publishing Settings) carry an identical-format uppercase tracked kicker. DESIGN.md calls this out: "an eyebrow on every section is AI grammar." One eyebrow is voice; five is the reflex.
- **Glassmorphism as default.** `BasicInfoCard` and `MediaPreviewCard` use `bg-stone-100/40 border border-stone-200/60 backdrop-blur-sm`. The 40% opacity + blur is decorative glass. DESIGN.md: "no backdrop-blur as decoration."
- **Gradient + colored glow on the primary button.** `bg-linear-to-r from-orange-500 to-amber-500 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40`. The colored shadow on a saturated gradient is the orange-amber equivalent of the indigo ghost-button pattern. The shared shadow scale in `globals.css` (`shadow-surface-*`) is stone-toned for a reason; a primary button that glows orange is the "colored glow shadows" the design principles reject.
- **Border + shadow stacked for definition.** Multiple cards pair `border-stone-200` with `shadow-sm` and `rounded-2xl` (16px). Within the 12-16px ceiling the corners are fine, but the doubled depth treatment (border + soft shadow) is the codex ghost-card pattern. Pick one.
- **Inconsistent surface vocabulary.** The sidebar mixes `bg-stone-100/50` (Collaborators), `bg-white` (Version History), and `bg-orange-50` (Visibility) for what is, semantically, the same control surface.

The honest read: a fluent user of Linear, Notion, or a real CMS would sit down at this editor and pause at the first dead toolbar button, then at the empty Category select, then at the three sidebar shells that go nowhere. The chrome is the product here; the work isn't.

**Deterministic scan.** The bundled detector (`node .agents/skills/impeccable/scripts/detect.mjs --json ...`) returned `[]` against both the page entry and `AddArticleContent.tsx`. The automated scan is clean — its rule set catches the pure codex giveaways (gradient text, side-stripe borders, sketchy SVG, repeating-linear-gradient stripes) and none of those are present. The detector intentionally does not flag dead controls or fake sidebars; that's the LLM review's job, and it found them.

**Browser visualization.** Not run in this session — no live server was started, no overlay was injected. The user supplied a source path, not a URL, and the project has no dev server running on a known port in this context. Reporting the fallback signal: source-only review. The page is not in a tab in the user's browser.

## Overall Impression

The screen is dressed for shipping but not built for editing. The header, the layout, the typography scale, and the card vocabulary are all credible. The moment an editor tries to *use* the article editor — type a sentence, click Bold, upload an image, find a collaborator, see the version history, toggle visibility — every one of those primary actions hits a wall: a dead button, a missing affordance, a decorative shell, or a placeholder string. The page reads as a polished screenshot of a CMS; it does not function as one.

The single biggest opportunity is to either commit to a real rich text editor (TipTap / Lexical / Slate) and wire the toolbar to it, or strip the toolbar entirely and present this as a plain markdown textarea with a small "formatting help" link. The current middle ground — a full toolbar of fake affordances — is worse than either extreme.

## What's Working

- **Type and weight contrast are calibrated.** The h2 (`text-3xl md:text-4xl font-extrabold tracking-tight text-stone-900`) and the supporting "Drafting: <title>" line below it establish hierarchy without a colored accent. The italic primary-color treatment on the live title is a small, deliberate touch.
- **The two-button header is well-modeled.** "Save Draft" as a secondary white surface with a 1px stone border, "Publish Now" as the orange primary, with the same height and a clear visual ranking. The `flex-1 md:flex-none` lets the pair share the row on mobile and split on desktop without a layout reflow.
- **i18n is properly threaded.** Translations are injected at the page level and passed down to the children, the locale drives the `dir` attribute on the page wrapper, and the arrow icon flips with `isRTL` on the back link. The pattern is consistent with the rest of the dashboard.

## Priority Issues

### [P0] Article editor toolbar is fully non-functional
**What.** The 9 formatting buttons in `ArticleEditor.tsx` (Bold, Italic, Underline, Align×3, Link, Image, Code, Maximize) render icons but have no `onClick`, no key handlers, and no connection to the `<textarea>` underneath. The editor is a plain `<textarea>`, which cannot apply any of those formats to its value.
**Why it matters.** This is the only thing the user actually came to do. A 10-icon toolbar that does nothing is the worst kind of UI: it teaches the user the system is broken, and they will close the tab. Worse, on a plain `<textarea>`, even wiring `document.execCommand` (deprecated) won't deliver alignment or links cleanly. The decision to use a textarea effectively *prevents* the visible toolbar from being real.
**Fix.** Pick one path and ship it:
1. **Real editor.** Adopt TipTap (ProseMirror) or Lexical, wire the toolbar to actual commands, replace the textarea. This is the right call for a CMS that has a "Publish Now" button.
2. **Honest markdown textarea.** Remove the toolbar, drop the `prose prose-orange` class (it does nothing on a `<textarea>`), keep the word count, and add a "Markdown supported" hint with a small `?` popover explaining the syntax.
3. **No toolbar, contenteditable div + minimal button set** for just the formats that matter (bold, italic, link, list). Don't show controls that don't work.
**Suggested command:** `$impeccable shape` (decide the editor strategy), then `$impeccable polish` (implement).

### [P0] Save Draft creates empty articles with no validation
**What.** `handleSaveDraft` in `AddArticleContent.tsx:64` calls `createArticle` with whatever is in the form, with no title/content/excerpt check. `createArticlePayload` (`articleHelpers.ts:44`) falls back to `"Untitled Draft"` if the title is empty. An editor who clicks Save Draft on a blank form posts a real article titled "Untitled Draft" with empty content, empty excerpt, no category, no cover.
**Why it matters.** Save Draft is positioned as the safe, recoverable action. If it creates a real, broken article in the same table as published content, it isn't a draft — it's a leak. The blog list will fill with phantom empty records.
**Fix.** Either rename "Save Draft" to "Create Article" and treat both flows as create-with-validation (require at minimum a title), or implement a true draft state (separate `status` enum, distinct endpoint, hidden from the public list). Also disable the button when `formData.title.trim() === ""` and the content is empty, with an inline hint.
**Suggested command:** `$impeccable clarify` (the button label and the validation copy) and `$impeccable harden` (the state model).

### [P0] Three of the five right-rail cards are decorative shells
**What.** `CollaboratorsSidebar.tsx` renders only a heading and a description. There is no collaborator list, no "Add collaborator" action, no avatar stack, no count. `VersionHistorySidebar.tsx` is the same: a heading, a clock icon, a description, and no version list. `VisibilityCard.tsx` displays "Draft" as static text with a settings icon, but offers no toggle, no schedule, no date picker.
**Why it matters.** These three cards take up 60% of the right rail's vertical real estate and signal capabilities that don't exist. An editor who scans the page will assume collaborator management and version history are wired up, try to use them, and find nothing. This is worse than not having the cards at all.
**Fix.** Three options per card, pick by product reality:
1. **Remove the cards** that aren't backed by features. The right rail becomes a single "Publishing Settings" card with a real status toggle. Honest, focused.
2. **Build the features** they promise. If collaborators and version history are on the roadmap, ship them behind a "Coming soon" badge — not a fake "Add collaborators to work on this article together" copy that pretends to be a CTA.
3. **Replace with real, simple surfaces.** "Recent activity" (your last 5 saved drafts), "Article checklist" (title ✓, excerpt ✓, cover ✓, category ✗, ≥300 words ✗), and "Publishing settings" (visibility toggle + scheduled date). All three can be built from the data the form already has.
**Suggested command:** `$impeccable shape` (decide which surfaces are real) and `$impeccable polish` (execute).

### [P0] Two-call publish flow with no rollback
**What.** `handlePublishNow` in `AddArticleContent.tsx:84` calls `createArticle(payload)` and then awaits `togglePublishStatus(result.data.id)` — two API roundtrips to do one logical action. If the second call fails, the article exists in an indeterminate state (created but not published), the user gets a generic error, and the form's state is lost on redirect.
**Why it matters.** Publishing is the highest-stakes action on the page. The cost of an inconsistent state (created-but-unpublished article, error message, no recovery) is editor trust loss. Two HTTP calls also doubles the latency for the action the user waits on the longest.
**Fix.** Add a single `publishArticle` server action that takes the payload and an `isPublished` flag (or a `status: "draft" | "published"`) and does one atomic write. If the API is already split, wrap the two calls in a try block and roll back by deleting the created record on second-call failure (and surface that to the user explicitly).
**Suggested command:** `$impeccable harden`.

### [P0] No image upload affordance
**What.** `MediaPreviewCard.tsx` is a single text input asking for an image URL (`placeholder="Enter image URL..."`). There is no file picker, no drag-and-drop, no paste handling, no upload progress, no validation that the URL is reachable before save.
**Why it matters.** Cover image is the second-most-visible piece of an article (after the title). Asking an editor to find a URL on another tab, paste it, hope the CORS works, and not know if it loaded until they save — that is a 2020-era pattern. The existing `onError` handler silently returns `null`; a broken image URL produces no feedback at all.
**Fix.** Add a real file uploader (drag-and-drop zone with a click-to-browse fallback). Show a thumbnail preview with a remove button, a loading state, and an inline error if the upload fails. Keep the URL fallback as a secondary "Paste image URL" expander for power users, not the default.
**Suggested command:** `$impeccable shape` (upload UX) and `$impeccable polish` (implement).

### [P1] No autosave, no draft recovery
**What.** Nothing is persisted between visits. If the editor closes the tab mid-write, the article is gone. There is no "Restore unsaved changes" prompt, no local-storage draft, no debounced server-side draft.
**Why it matters.** Article writing is long-form, multi-session work. Losing 30 minutes of writing to a misclicked close is the kind of error an editor will not forgive. The current "Save Draft" button only saves on click, with no protection between clicks.
**Fix.** Add debounced autosave (every 8-10s after the last keystroke, or on blur) to a `drafts` endpoint. On page load, check for an in-flight draft and offer to restore. Add a small "Saved 2s ago" indicator in the header so the editor knows the safety net is live.
**Suggested command:** `$impeccable harden`.

### [P1] Validation errors detached from the source
**What.** When "Publish Now" fails validation (missing title or excerpt), `setError(validation.errors[0])` populates the top-of-page `<ErrorMessage>`. The error says "Please add a title before publishing" but the title input is below the fold in a card the user is not currently focused on. The error has no anchor, no `scrollIntoView`, no `aria-live`, no `role="alert"`.
**Why it matters.** Errors that don't point at their source are restart-the-flow errors. The user has to scan the page to figure out which input needs attention.
**Fix.** Add inline field-level validation: red border + inline message under each invalid field on blur. Keep the top-of-page error for systemic failures (network, server) only. Anchor scroll + focus to the first invalid field on publish attempt. Add `aria-live="polite"` and `role="alert"` to the field message and the top error respectively.
**Suggested command:** `$impeccable clarify` and `$impeccable polish`.

### [P1] Toolbar buttons are icon-only with no labels or tooltips
**What.** All 9 toolbar buttons (`ArticleEditor.tsx:39-73`) render only an icon. There is no `aria-label`, no `title`, no visible text, no tooltip on hover.
**Why it matters.** Toolbar usability is a recognition problem: users should not have to guess what an icon does. The icons chosen (FiAlignLeft etc.) are conventional in real editors, but on a tool with a non-functional toolbar they read as "broken buttons" not "formatting controls." Screen reader users get nothing — the buttons announce as "button" with no name.
**Fix.** Add `aria-label="Bold"` (etc.) to every toolbar button. For accessibility, also support `aria-keyshortcuts` if shortcuts are added. If the toolbar becomes real, add visible labels in a tooltip via `title` attribute or a small popover.
**Suggested command:** `$impeccable audit` (a11y pass) and `$impeccable polish`.

### [P1] Empty category state is silent
**What.** `useEffect` in `AddArticleContent.tsx:52` calls `getCategories()`. If the call throws, the only feedback is `console.error("Failed to fetch categories:", err)`. The category select shows the placeholder "Select Category" with no categories behind it, no retry button, no explanation.
**Why it matters.** "Select Category" looks like a state the editor needs to act on; in reality the categories failed to load and the editor has no way to know. They will pick a category, see it save empty, and lose the article to the empty-record bug above.
**Fix.** Track `categoriesError` separately. Render an inline error inside the select card ("Couldn't load categories. Retry") with a "Try again" button. While loading, show a skeleton row in the select instead of an empty list.
**Suggested command:** `$impeccable harden`.

### [P2] Identical uppercase tracked eyebrow on every card
**What.** Five cards (BasicInfoCard, MediaPreviewCard, CollaboratorsSidebar, VersionHistorySidebar, VisibilityCard) all use the same pattern: a 9-11px, font-black, uppercase, wide-tracked label with `tracking-widest` or `tracking-[0.15em]`, with an icon to the left. They differ only in color (stone-500/700 or orange-700 for the VisibilityCard) and the exact tracking value.
**Why it matters.** DESIGN.md and the Impeccable guidance both flag this: an eyebrow on every section is AI grammar. It also flattens hierarchy — when every section is announced with the same shout, the user can't tell what's primary, what's metadata, what's a state.
**Fix.** Pick one canonical eyebrow treatment (font, size, tracking, color) and use it in *one* deliberate place. For the others, demote to a normal-weight sentence label or rely on the card's title and the visual hierarchy of the form fields. The VisibilityCard's orange-700 eyebrow stands out as the only state-driven color in the rail — keep that one, drop the rest.
**Suggested command:** `$impeccable quieter` and `$impeccable typeset`.

### [P2] Glassmorphism as decoration on two cards
**What.** `BasicInfoCard` and `MediaPreviewCard` use `bg-stone-100/40 border border-stone-200/60 backdrop-blur-sm`. The 40% surface alpha plus blur is decorative glass, not functional (the page bg is a flat stone-50, so the blur has nothing to blur meaningfully).
**Why it matters.** DESIGN.md: "no backdrop-blur as decoration." Glassmorphism reads as ornament on a tool, and on a page where three other cards use solid surfaces it reads as inconsistent ornament.
**Fix.** Replace `bg-stone-100/40 backdrop-blur-sm` with solid `bg-white` (matching VersionHistorySidebar) or `bg-stone-50`. Pick one surface treatment for the whole rail.
**Suggested command:** `$impeccable quieter` and `$impeccable polish`.

### [P2] Publish button pairs a saturated gradient with a colored glow shadow
**What.** `AddArticleHeader.tsx:64`: `bg-linear-to-r from-orange-500 to-amber-500 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40`. The orange-to-amber gradient primary button with a tinted orange shadow is the colored-glow pattern DESIGN.md rejects: "no colored glow shadows."
**Why it matters.** A glowing button on a tool page reads as marketing. The product register's permission is "familiar sans defaults, standard navigation, density, consistency" — a gradient + colored shadow violates the "solid depth over glass and glow" principle.
**Fix.** Use the design system's `surface-btn-primary` class (solid `var(--gradient-primary)` with the standard shadow), or go fully solid: `bg-primary text-white shadow-sm` with a stone shadow (`shadow-surface-md`). The gradient on the button is acceptable; the *orange* shadow is not.
**Suggested command:** `$impeccable polish` and `$impeccable quieter`.

### [P2] Surface-card class uses stale indigo shadows
**What.** `globals.css:366` and `:432, :442, :469, :485` define `surface-btn-primary`, `surface-input:focus`, `shadow-button`, and `shadow-button-hover` with `rgba(99, 102, 241, 0.x)` — indigo. The brand is orange. These classes are defined in the design system but unused on this page (which rolls its own classes); the inconsistency is invisible here, but it would surface the moment the AddArticle page adopts `surface-btn-primary`.
**Why it matters.** Stale design tokens ship bug-compatible. The class is the canonical way to render a primary button; the moment a developer reaches for it on a non-indigo surface, the glow will look wrong.
**Fix.** Replace the indigo alpha in all four rules with the brand orange alpha (`rgba(249, 115, 22, 0.x)` and `rgba(234, 88, 12, 0.x)` for hover). Then either adopt the class on the Publish button or remove it from the stylesheet to keep the surface intentional.
**Suggested command:** `$impeccable audit` and `$impeccable polish`.

### [P2] Missing accessibility semantics
**What.** Multiple interactive elements have no accessible name or wrong role:
- The cover image input has only a placeholder; no `<label>` or `aria-label`.
- The category `<select>` has no associated `<label>` (the visual "Category" label is a `<label>` without `htmlFor`).
- The tag remove `X` (`TagInput.tsx:41`) is an icon with no `aria-label`.
- The error message (`ErrorMessage.tsx`) has no `role="alert"` or `aria-live`.
- Disabled buttons use `disabled:opacity-50` but not `disabled:cursor-not-allowed` and not `aria-disabled` (depending on the case, `aria-disabled` is preferred over `disabled` so focus remains on the button).
**Why it matters.** WCAG 2.1 AA target (per DESIGN.md). Editors using screen readers can't navigate the form, can't recover from validation errors, and can't remove tags.
**Fix.** Wrap each input in a labeled group, add `aria-label` to icon-only buttons, give the error region `role="alert" aria-live="polite"`. Add `disabled:cursor-not-allowed` to all disabled states. Run an axe-core sweep before shipping.
**Suggested command:** `$impeccable audit`.

### [P3] "Untitled Masterpiece" is off-tone for an admin tool
**What.** `AddArticleHeader.tsx:148` default placeholder string `t.untitledMasterpiece || "Untitled Masterpiece"`. While the title is empty, the page echoes "Drafting: Untitled Masterpiece" to the editor in the header.
**Why it matters.** Whimsical copy on a content management tool mismatches the rest of the surface's neutral tone. It's the kind of voice that ages badly and gets "fixed" in a later PR with a more boring "Untitled" or "Untitled draft."
**Fix.** Default to "Untitled draft" or "New article". The tool is a workplace, not a stage.
**Suggested command:** `$impeccable clarify`.

### [P3] RTL icons don't mirror in tag input
**What.** `TagInput` receives `isRTL` but the `FiX` and `FiPlus` icons are not flipped. The visual order of remove/add is LTR-only.
**Why it matters.** DESIGN.md: "RTL is structural, not cosmetic... Mirroring the LTR layout in pixels is not enough."
**Fix.** Apply `className={isRTL ? "rotate-180" : ""}` to the icons that need mirroring, or use the locale to drive the input's flex direction. Also test the "Drafting: <title>" sentence in Arabic — the current order will read as English.
**Suggested command:** `$impeccable adapt`.

### [P3] Dead `no-scrollbar` class on the toolbar
**What.** `ArticleEditor.tsx:38` references `no-scrollbar` but the class is not defined in `globals.css`. The toolbar has no scrollbar regardless because the parent is the flex row, but the class is aspirational dead code.
**Why it matters.** Minor — but it's a tell that the toolbar's overflow behavior was specified without being implemented.
**Fix.** Define the class (`.no-scrollbar::-webkit-scrollbar { display: none; }`) or remove the class.
**Suggested command:** `$impeccable polish`.

## Persona Red Flags

**Alex (Power User).** Will hit Ctrl+S the moment they start typing. Nothing happens — no keyboard shortcut, no autosave. Will see a 10-icon toolbar and try Ctrl+B; nothing happens. Will scroll the right rail looking for a "duplicate" or "import markdown" action; doesn't exist. Will try to drag a `.md` file onto the cover image area; no drop zone. Will try to right-click a tag to rename; only remove works. **Abandons after 2 minutes.**

**Sam (Accessibility-Dependent User).** Tab order: Back link → Save Draft button → Publish Now button → Title input → Excerpt textarea → Category select → Tag input → 9 toolbar buttons (no labels) → Word count (decorative) → Cover image URL input. Screen reader announces the toolbar as "button, button, button..." nine times with no differentiation. The cover image input has no label. The category `<select>` has no associated `<label>`. Validation errors fire at the top of the page with no `aria-live`, so the screen reader user gets nothing. **Cannot complete the primary action.**

**Riley (Deliberate Stress Tester).** Will refresh mid-write: state lost. Will paste a 50,000-character article: no max length, no warning, the page will lag on every keystroke. Will paste a broken cover image URL: silent failure, no error feedback. Will click "Save Draft" with an empty form: posts a real "Untitled Draft" article. Will try to back out of the form after typing: no "are you sure" prompt, all work is lost on navigation. **Finds 5+ broken paths in the first 10 minutes.**

**Yasmin (MENA Editor, project-specific).** Will switch the locale to Arabic and expect the page to read natively. "Drafting: <title>" will still read in English order. The tag add/remove icons will not mirror. The `+` button's `FiPlus` will sit awkwardly to the right of the input in RTL. Will wonder why the `Untitled Masterpiece` placeholder doesn't translate. **Feels like the page was English-first, Arabic-second.**

## Minor Observations

- `useAddArticleForm` returns `setFormData`, `setTags`, `setNewTag` but no caller uses them. Dead exports.
- `addTag` and `removeTag` `useCallback` deps include `newTag` and `tags`, so they're re-created on every keystroke. Not a bug at this scale, but a refactor target.
- `VisibilityCard` has `className="text-sm text-orange-600"` on a `FiSettings` icon — `text-sm` controls text size, not icon size, so the icon renders at default 24px while inheriting the text color. Pick `size={14}` like the other icons.
- `disabled:opacity-50` is on Save/Publish buttons without `disabled:cursor-not-allowed`. Looks disabled, behaves enabled on hover.
- The header's "Drafting:" label is a sentence in mixed case. Other eyebrows are all-caps. Pick a register.
- The form has no `accept-charset` or `<form>` element wrapping the inputs; "Save Draft" and "Publish Now" are buttons without form association, which means Enter doesn't submit. Keyboard users must click.

## Questions to Consider

- What is the *actual* capability surface of this editor? If only `title + content + excerpt + cover + tags` are persisted, the toolbar, the collaborator sidebar, and the version history sidebar are all promises the backend can't keep. Either build them, scope them down, or remove them.
- Is the toolbar supposed to be a real rich text editor? If yes, which one (TipTap, Lexical, Slate)? If no, why is it 10 buttons wide?
- Should "Save Draft" be a true draft state, or is the product a single `articles` table where everything is a published article that may be hidden? The current behavior (saves a real article with a fallback title) implies the latter, but the button label implies the former.
- Is the editor working with Arabic content too? A bare `<textarea>` is direction-agnostic; the toolbar and tag input aren't. What does "Bold" even mean for RTL Arabic text?
- Does the brand genuinely want a glass-tinted `bg-stone-100/40 backdrop-blur-sm` card, or did that come from a copy-paste of a marketing pattern? The two cards that use it are the only ones in the surface; nothing else does.
