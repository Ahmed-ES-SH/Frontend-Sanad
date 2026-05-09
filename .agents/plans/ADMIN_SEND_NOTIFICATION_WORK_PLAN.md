# Admin Send Notification — Frontend Integration Work Plan

## Analysis: Current State vs. Required Integration

### What Exists Today

| Layer | File | Current Behavior |
|---|---|---|
| **Endpoint** | `app/constants/endpoints.ts` | `ADMIN_SEND: /api/admin/notifications/send` ✅ correct<br>`ADMIN_SEND_BATCH: /api/admin/sendnotification?ids=...` ❌ legacy (GET-style query params, typo in path) |
| **API Layer** | `app/actions/notificationApi.ts` | `sendNotification()` → hits `ADMIN_SEND` but body is `SendNotificationFormData` (missing `ids` array)<br>`sendNotificationBatch()` → hits legacy `ADMIN_SEND_BATCH(ids)` via query params |
| **Server Action** | `app/[locale]/.../actions/sendNotification.ts` | Validates + delegates to `sendNotificationBatch()`.<br>Returns `{ success, message }` only — **discards `sent`, `failed`, `failedIds`** |
| **UI Form** | `AdminSendNotificationForm.tsx` | Two-step wizard: user selection → notification form in modal.<br>Shows generic success/error banner, no detailed breakdown. |
| **User Selection** | `UserSelectionTable.tsx` | Paginated table with search, checkbox selection — functionally sound. |

### Key Gaps

| # | Gap | Impact |
|---|------|--------|
| 1 | No `SendNotificationResponse` type with `sent`, `failed`, `failedIds` | Frontend can't display partial-failure breakdown |
| 2 | `sendNotificationBatch()` uses legacy GET-style endpoint | Wrong method + query params → won't work with new backend |
| 3 | `sendNotification()` has no `ids` field in body | Can't send to multiple users in single request |
| 4 | Server action returns minimal `{ success, message }` | Lost info about partial failures |
| 5 | UI doesn't display `sent`/`failed` counts | Admin doesn't know if some deliveries failed |
| 6 | `maxSelections=50` vs backend max 100 | Mismatch → could silently hit backend limit |
| 7 | No `data` field in form | Can't attach metadata (e.g. `maintenanceWindow`) |
| 8 | No timeout handling for long requests | Admin could wait indefinitely with no feedback |
| 9 | Error handling doesn't differentiate 400 vs 401 vs 403 | All errors look the same |
| 10 | No confirmation on modal backdrop click | Could accidentally dismiss form and lose state |

---

## Integration Plan

### Phase 1 — Types & Contracts

**Files:** `app/types/notification.ts`

**Changes:**
1. Add `SendNotificationDto` type:
   - `ids: number[]` (1–100)
   - `type: NotificationType`
   - `title: string`
   - `message: string`
   - `data?: Record<string, unknown>`
2. Add `SendNotificationResponse` type:
   - `success: boolean`
   - `message: string`
   - `sent: number`
   - `failed: number`
   - `failedIds: number[]`
3. Remove/archive legacy `SendNotificationFormData` (has singular `userId`, not `ids`)

---

### Phase 2 — Endpoint Constants

**Files:** `app/constants/endpoints.ts`

**Changes:**
1. Remove legacy `ADMIN_SEND_BATCH` (`/api/admin/sendnotification?ids=...`)
2. Keep `ADMIN_SEND` (`/api/admin/notifications/send`) — already correct

---

### Phase 3 — API Layer Refactor

**Files:** `app/actions/notificationApi.ts`

**Changes:**
1. Create `adminSendNotification(data: SendNotificationDto): Promise<SendNotificationResponse>`
   - Method: `POST`
   - Endpoint: `ENDPOINTS.ADMIN_SEND`
   - Body: full DTO including `ids` array
2. Remove legacy `sendNotification()` and `sendNotificationBatch()`
3. Handle 400/401/403 explicitly:
   - 400 → forward backend validation message
   - 401 → "Your session has expired, please login again"
   - 403 → "You don't have permission to send notifications"

---

### Phase 4 — Server Action Update

**Files:** `app/[locale]/.../actions/sendNotification.ts`

**Changes:**
1. Replace `sendNotificationBatch()` call with `adminSendNotification()`
2. Update return type to `SendNotificationResponse`
3. Forward complete response object to UI

---

### Phase 5 — UI Form Enhancement

**Files:** `AdminSendNotificationForm.tsx`

**Changes:**
1. **Update `result` state type** — include `sent`, `failed`, `failedIds`
2. **Detailed result display:**
   - ✅ All succeeded: "Notification sent to {sent} user(s)"
   - ⚠️ Partial: "Sent to {sent} user(s), {failed} failed"
   - ❌ All failed: "Failed to send to all {failed} user(s)"
3. **`maxSelections`** → align to 100 (match backend limit)
4. **Loading timeout indicator** — show elapsed time after 5s
5. **Optional `data` field** — collapsed JSON input for advanced usage
6. **Improved error messaging** — differentiate 400 vs 401 vs 403 vs network
7. **Backdrop click confirmation** — confirm before closing with unsaved state
8. **Reset on type change** — `setResult(null)` when switching notification type

---

### Phase 6 — Edge Cases & Error Boundaries

**Files:** `AdminSendNotificationForm.tsx` + potential error boundary

**Changes:**
1. Add `error.tsx` boundary at notifications segment level
2. Handle:
   - **Duplicate IDs** — frontend deduplication before send
   - **Network timeout** — `AbortController` with 30s timeout
   - **Navigation away during submission** — `beforeunload` warning
3. **Cleanup on unmount** — clear timers in `useEffect` return

---

## Dependency Graph

```
Phase 1 (Types) ──► Phase 3 (API Layer) ──► Phase 4 (Server Action) ──► Phase 5 (UI Form)
       │                                                                    │
       └──► Phase 2 (Constants) ──────────►──────────────◄─────────────────┘
                                                                       │
                                                                  Phase 6 (Edge Cases)
```

Phases 1 & 2 can run in parallel.

---

## Test Scenarios

| Scenario | Expected UX |
|----------|-------------|
| All 50 users receive notification | ✅ Green: "Sent to 50 user(s)" |
| 48 sent, 2 failed | ⚠️ Amber: "Sent to 48 user(s), 2 failed" |
| All 50 fail | ❌ Red: "Failed to send" with specific error |
| Empty IDs | Form validation blocks submission |
| >100 IDs (bypassed selection) | Backend 400 shown in error banner |
| Session expired (401) | Redirect / "session expired" banner |
| Not admin (403) | "Admin access required" banner |
| Network down | "Connection lost. Please try again." |
| Backdrop click during form fill | Confirm dialog |
| Request >10s | "Still sending... (12s elapsed)" |
