# Refactoring Plan: AdminSendNotificationForm & UserSelectionTable

## Goal
Refactor the monolithic `AdminSendNotificationForm` (707 lines) and `UserSelectionTable` (346 lines) into focused, single-responsibility child components with extracted hooks, constants, and helpers. English-only — no translation extraction.

---

## Analysis Summary

### Current State

| File | Lines | Responsibilities |
|------|-------|------------------|
| `AdminSendNotificationForm.tsx` | 707 | User mode selection, user table orchestration, modal form (type/title/message/data), submission with elapsed timer, result banner, close confirmation dialog |
| `UserSelectionTable.tsx` | 346 | Search input with debounce, user data fetching (useAppQuery), table rendering, row selection, pagination, selection counter |

### Pain Points
1. **AdminSendNotificationForm has 6+ concerns** in one file — user mode selection, modal orchestration, form fields, JSON parsing, result rendering, confirmation dialog
2. **Duplicated "Continue" button** — rendered twice (top + bottom) for multi-select
3. **Inline `NOTIFICATION_TYPES` array** — should be in constants (partial data in `app/constants/notifications.tsx` already exists but doesn't include ORDER_CREATED or emoji icons)
4. **`SelectedUserInfo` interface** inline — should be shared
5. **Elapsed timer logic** — inline `useEffect` + `useRef` — should be a reusable hook
6. **`resultBanner` memo** — complex display logic inline — should be its own component
7. **UserSummary** — rendering logic inside the parent — should be a component
8. **Close confirmation dialog** — inline JSX with its own state — should be a component
9. **UserSelectionTable's debounce** — already a reusable `useDebounce` hook exists in the project but isn't used — the table has its own inline debounce implementation
10. **UserSelectionTable table row** — each row's markup is verbose and could be extracted

---

## Phase 1: Types & Constants

### Types to create/modify in `app/types/notification.ts`

Add exported `SelectedUserInfo` interface:
```ts
export interface SelectedUserInfo {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}
```

Add `UserMode` type:
```ts
export type UserMode = "single" | "multiple";
```

### Constants to create in `app/constants/notifications.tsx`

Add `SEND_NOTIFICATION_TYPES` — extends the existing `NOTIFICATION_TYPE_LABELS` with emoji icons and the missing `ORDER_CREATED` type:
```ts
export const SEND_NOTIFICATION_TYPES: {
  value: NotificationType;
  label: string;
  icon: string;
}[] = [
  { value: "ORDER_UPDATED", label: "Order Updated", icon: "📦" },
  { value: "ORDER_CREATED", label: "Order Created", icon: "🆕" },
  { value: "PAYMENT_SUCCESS", label: "Payment Success", icon: "✅" },
  { value: "PAYMENT_FAILED", label: "Payment Failed", icon: "❌" },
  { value: "SYSTEM", label: "System Alert", icon: "🔔" },
  { value: "BROADCAST", label: "Announcement", icon: "📢" },
];
```

Add notification form defaults:
```ts
export const NOTIFICATION_FORM = {
  MAX_SELECTIONS_MULTIPLE: 100,
  MAX_SELECTIONS_SINGLE: 1,
  MAX_TITLE_LENGTH: 255,
  USERS_PER_PAGE: 10,
} as const;
```

---

## Phase 2: Extract Hooks

### `useElapsedTimer` → `app/notifications/hooks/useElapsedTimer.ts`
- Encapsulates the `isSubmitting` → elapsed seconds logic
- Arguments: `isSubmitting: boolean`
- Returns: `elapsed: number`
- Handles cleanup on unmount internally

### `useSendNotification` → `app/notifications/hooks/useSendNotification.ts`
- Encapsulates submission state: `isSubmitting`, `result`, `submit`
- Calls `sendNotificationAction()` and returns full `SendNotificationResponse`
- Handles JSON parsing of extra data
- Returns: `{ isSubmitting, result, elapsed, submit: (params) => Promise<void> }`

---

## Phase 3: Extract Child Components

### From `AdminSendNotificationForm.tsx`:

| Component | File | Responsibility | Estimated lines |
|-----------|------|----------------|-----------------|
| `UserSelectionStep` | `_components/UserSelectionStep.tsx` | User mode toggle (single/multiple), "Continue" buttons (top/bottom), renders `UserSelectionTable` | ~120 |
| `SendNotificationModal` | `_components/SendNotificationModal.tsx` | Modal with form (type, title, message, advanced data), submit button with elapsed timer, result banner | ~180 |
| `ResultBanner` | `_components/ResultBanner.tsx` | Renders green/amber/red result banner based on `SendNotificationResponse` | ~70 |
| `UserSummaryBar` | `_components/UserSummaryBar.tsx` | Shows single user card or multi-user avatar stack | ~90 |
| `CloseConfirmDialog` | `_components/CloseConfirmDialog.tsx` | "Discard notification?" confirmation dialog | ~60 |

### From `UserSelectionTable.tsx`:

| Component | File | Responsibility | Estimated lines |
|-----------|------|----------------|-----------------|
| `UserTableRow` | `_components/UserTableRow.tsx` | Single table row with avatar, name, email, role, selection checkbox/radio | ~80 |
| `TablePagination` | `_components/TablePagination.tsx` | Page nav with prev/next buttons and "page X / Y" display | ~60 |

---

## Phase 4: Refactor UserSelectionTable

After extraction:
- Use existing `useDebounce` hook from `app/hooks/useDebounce.ts` instead of inline debounce
- Replace inline row rendering with `<UserTableRow />`
- Replace inline pagination with `<TablePagination />`
- Remove `onUsersFetched` logic (move it up to where it's needed)
- Target: **~120-150 lines**

## Phase 5: Refactor AdminSendNotificationForm

After extraction:
- Orchestrate child components only
- State management for: `userMode`, `selectedUsers`, `isModalOpen`, `pendingClose`
- Pass event handlers down
- Target: **~120-150 lines**

---

## Final File Structure

```
app/[locale]/(routes)/dashboard/notifications/
├── page.tsx                             (unchanged)
├── actions/
│   └── sendNotification.ts             (unchanged)
├── hooks/
│   ├── useElapsedTimer.ts               [NEW]
│   └── useSendNotification.ts           [NEW]
├── _components/
│   ├── AdminSendNotificationForm.tsx    [REFACTORED ~130 lines]
│   ├── UserSelectionTable.tsx           [REFACTORED ~130 lines]
│   ├── UserSelectionStep.tsx            [NEW]
│   ├── SendNotificationModal.tsx        [NEW]
│   ├── ResultBanner.tsx                 [NEW]
│   ├── UserSummaryBar.tsx               [NEW]
│   ├── CloseConfirmDialog.tsx           [NEW]
│   ├── UserTableRow.tsx                 [NEW]
│   └── TablePagination.tsx              [NEW]
├── error.tsx                            (unchanged)
└── loading.tsx                          (unchanged)
```

---

## Execution Order

1. **Types & Constants** — Add `SelectedUserInfo`, `UserMode` types and `SEND_NOTIFICATION_TYPES`, `NOTIFICATION_FORM` constants
2. **Hooks** — Extract `useElapsedTimer` and `useSendNotification`
3. **Leaf components** — `ResultBanner`, `UserSummaryBar`, `CloseConfirmDialog`, `UserTableRow`, `TablePagination`
4. **Composite components** — `UserSelectionStep`, `SendNotificationModal`
5. **Refactor UserSelectionTable** — Use extracted components + `useDebounce`
6. **Refactor AdminSendNotificationForm** — Orchestrate children only

---

## Quality Gates

- [ ] TypeScript strict — no `any`, no implicit types
- [ ] Each component < 200 lines (ideally 60-150)
- [ ] No functionality changes — feature parity with original
- [ ] All inline styles preserved (Tailwind classes)
- [ ] Framer-motion animations preserved
- [ ] All edge cases preserved (empty states, error states, loading states, validation)
- [ ] Build passes with `npx tsc --noEmit`
- [ ] Elapsed timer cleanup verified on unmount
