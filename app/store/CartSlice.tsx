import { create } from "zustand";
import { CartItemType } from "../types/cart";
import { guestCartStorage, GuestCartItem } from "../helpers/_cart/guestCart";
import {
  fetchCartAction,
  addItemAction,
  updateItemAction,
  removeItemAction,
  clearCartAction,
  mergeCartAction,
  type CartApiResponse,
  type FailedMergeItem,
  type MergeApiResponse,
} from "../actions/cart.actions";
import { globalRequest } from "../helpers/globalRequest";

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 99;

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

// FailedMergeItem, CartApiResponse, and MergeApiResponse are re-exported
// from the server action file so they stay in sync with the server layer.
export type { FailedMergeItem, CartApiResponse, MergeApiResponse };

export interface MergeCartResult {
  failedItems: FailedMergeItem[];
  /** True when the merge request itself failed (network / server error). */
  networkError?: boolean;
}

// ---------------------------------------------------------------------------
// Store interface
// ---------------------------------------------------------------------------

export interface AddItemInput {
  serviceId: string;
  quantity?: number;
  // Optional display fields (used for guest cart rendering)
  serviceTitle?: string;
  serviceSlug?: string;
  serviceIconUrl?: string | null;
  serviceImageUrl?: string | null;
  unitPrice?: number;
  type?: "service" | "project";
}

interface CartState {
  items: CartItemType[];
  totalItems: number;
  totalAmount: number;
  isLoading: boolean;
  error: string | null;

  /** Load server cart for the authenticated user. No-op for guests. */
  fetchCart: () => Promise<void>;

  /** Hydrate store from guest localStorage (called once on app init for guests). */
  loadGuestCart: () => void;

  /** Add an item. Calls API for auth users; updates localStorage for guests. */
  add: (item: AddItemInput) => Promise<void>;

  /** Absolute quantity update. Calls API for auth users; updates localStorage for guests. */
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;

  /** Remove an item. Calls API for auth users; updates localStorage for guests. */
  remove: (target: { itemId: string; serviceId?: string }) => Promise<void>;

  /** Clear the entire cart. */
  clear: () => Promise<void>;

  /** Read localStorage guest cart → POST /cart/merge → clear localStorage → sync store. */
  mergeGuestCart: () => Promise<MergeCartResult>;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const clampQuantity = (q: number): number =>
  Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, Math.trunc(q)));

/** Read auth state at call-time to avoid a circular import at module level. */
const getIsAuthenticated = (): boolean => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useAuthStore } = require("./AuthSlice") as {
      useAuthStore: { getState: () => { user: unknown } };
    };
    return Boolean(useAuthStore.getState().user);
  } catch {
    return false;
  }
};

const hydrateFromResponse = (
  data: CartApiResponse,
): Pick<CartState, "items" | "totalItems" | "totalAmount"> => ({
  items: data.items,
  totalItems: data.totalItems,
  totalAmount: data.totalAmount,
});

/**
 * Convert the minimal GuestCartItem (from localStorage) to a full CartItemType
 * suitable for rendering while offline / unauthenticated.
 */
const guestItemToCartItem = (item: GuestCartItem): CartItemType => {
  const now = new Date().toISOString();
  const unitPrice = item.unitPrice ?? 0;
  return {
    id: `guest-${item.serviceId}`,
    cartId: "guest",
    serviceId: item.serviceId,
    serviceTitle: item.serviceTitle ?? "",
    serviceSlug: item.serviceSlug ?? "",
    serviceIconUrl: item.serviceIconUrl ?? null,
    serviceImageUrl: item.serviceImageUrl,
    quantity: item.quantity,
    unitPrice,
    subtotal: unitPrice * item.quantity,
    createdAt: now,
    updatedAt: now,
  };
};

/**
 * Persist the current cart items back to localStorage in GuestCartItem format.
 * Includes display fields so the cart can be rendered on the next page load.
 */
const persistGuestCart = (items: CartItemType[]): void => {
  const payload: GuestCartItem[] = items.map((i) => ({
    serviceId: i.serviceId,
    quantity: i.quantity,
    serviceTitle: i.serviceTitle,
    serviceSlug: i.serviceSlug,
    serviceIconUrl: i.serviceIconUrl,
    serviceImageUrl: i.serviceImageUrl,
    unitPrice: i.unitPrice,
  }));
  guestCartStorage.write(payload);
};

/** Pure function: apply an add/merge to a local item list. */
const applyGuestAdd = (
  currentItems: CartItemType[],
  item: AddItemInput,
): CartItemType[] => {
  const quantityToAdd = clampQuantity(item.quantity ?? MIN_QUANTITY);
  const existingIndex = currentItems.findIndex(
    (i) => i.serviceId === item.serviceId,
  );

  if (existingIndex >= 0) {
    const next = [...currentItems];
    const existing = next[existingIndex];
    const mergedQty = clampQuantity(existing.quantity + quantityToAdd);
    next[existingIndex] = {
      ...existing,
      // Freshen display fields if provided
      ...(item.serviceTitle && { serviceTitle: item.serviceTitle }),
      ...(item.serviceIconUrl !== undefined && {
        serviceIconUrl: item.serviceIconUrl,
      }),
      ...(item.serviceImageUrl !== undefined && {
        serviceImageUrl: item.serviceImageUrl,
      }),
      quantity: mergedQty,
      subtotal: (item.unitPrice ?? existing.unitPrice ?? 0) * mergedQty,
    };
    return next;
  }

  const unitPrice = item.unitPrice ?? 0;
  const now = new Date().toISOString();
  return [
    ...currentItems,
    {
      id: `guest-${item.serviceId}-${Date.now()}`,
      cartId: "guest",
      serviceId: item.serviceId,
      serviceTitle: item.serviceTitle ?? "",
      serviceSlug: item.serviceSlug ?? "",
      serviceIconUrl: item.serviceIconUrl ?? null,
      serviceImageUrl: item.serviceImageUrl,
      quantity: quantityToAdd,
      unitPrice,
      subtotal: unitPrice * quantityToAdd,
      type: item.type ?? "service",
      createdAt: now,
      updatedAt: now,
    },
  ];
};

const recalcTotals = (
  items: CartItemType[],
): Pick<CartState, "totalItems" | "totalAmount"> => ({
  totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
  totalAmount: items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
});

/** Returns true when the itemId looks like a guest-generated ID (not a real UUID). */
const isGuestItemId = (itemId: string): boolean =>
  itemId.startsWith("guest-") || itemId === "";

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  totalItems: 0,
  totalAmount: 0,
  isLoading: false,
  error: null,

  // ── Init ──────────────────────────────────────────────────────────────────

  fetchCart: async () => {
    if (!getIsAuthenticated()) return;
    set({ isLoading: true, error: null });
    const result = await fetchCartAction();
    if (result.success && result.data) {
      set({ ...hydrateFromResponse(result.data), isLoading: false });
    } else {
      set({ isLoading: false, error: result.message ?? "Failed to load cart" });
    }
  },

  loadGuestCart: () => {
    const guestItems = guestCartStorage.read();
    if (guestItems.length === 0) return;
    const items = guestItems.map(guestItemToCartItem);
    set({ items, ...recalcTotals(items) });
  },

  // ── Mutations ─────────────────────────────────────────────────────────────

  add: async (item) => {
    if (!getIsAuthenticated()) {
      const nextItems = applyGuestAdd(get().items, item);
      set({ items: nextItems, ...recalcTotals(nextItems) });
      persistGuestCart(nextItems);
      return;
    }

    set({ isLoading: true, error: null });
    const result = await addItemAction(
      item.serviceId,
      clampQuantity(item.quantity ?? MIN_QUANTITY),
    );
    if (result.success && result.data) {
      set({ ...hydrateFromResponse(result.data), isLoading: false });
    } else {
      set({
        isLoading: false,
        error: result.message ?? "Failed to add item to cart",
      });
    }
  },

  updateQuantity: async (itemId, quantity) => {
    const clamped = clampQuantity(quantity);

    if (!getIsAuthenticated() || isGuestItemId(itemId)) {
      const nextItems = get().items.map((i) =>
        i.id === itemId
          ? { ...i, quantity: clamped, subtotal: i.unitPrice * clamped }
          : i,
      );
      set({ items: nextItems, ...recalcTotals(nextItems) });
      persistGuestCart(nextItems);
      return;
    }

    // Optimistic update — snapshot current state for rollback
    const snapshot = get().items;
    const optimisticItems = snapshot.map((i) =>
      i.id === itemId
        ? { ...i, quantity: clamped, subtotal: i.unitPrice * clamped }
        : i,
    );
    set({ items: optimisticItems, ...recalcTotals(optimisticItems) });

    const result = await updateItemAction(itemId, clamped);
    if (result.success && result.data) {
      // Replace optimistic state with authoritative server response
      set(hydrateFromResponse(result.data));
    } else {
      // Rollback to snapshot on failure
      set({
        items: snapshot,
        ...recalcTotals(snapshot),
        error: result.message ?? "Failed to update quantity",
      });
    }
  },

  remove: async ({ itemId, serviceId }) => {
    if (!getIsAuthenticated() || isGuestItemId(itemId)) {
      const nextItems = get().items.filter((i) =>
        serviceId ? i.serviceId !== serviceId : i.id !== itemId,
      );
      set({ items: nextItems, ...recalcTotals(nextItems) });
      persistGuestCart(nextItems);
      return;
    }

    // Optimistic update — snapshot current state for rollback
    const snapshot = get().items;
    const optimisticItems = snapshot.filter((i) => i.id !== itemId);
    set({ items: optimisticItems, ...recalcTotals(optimisticItems) });

    const result = await removeItemAction(itemId);
    if (result.success && result.data) {
      // Replace optimistic state with authoritative server response
      set(hydrateFromResponse(result.data));
    } else {
      // Rollback to snapshot on failure
      set({
        items: snapshot,
        ...recalcTotals(snapshot),
        error: result.message ?? "Failed to remove item",
      });
    }
  },

  clear: async () => {
    if (!getIsAuthenticated()) {
      set({ items: [], totalItems: 0, totalAmount: 0, error: null });
      guestCartStorage.clear();
      return;
    }

    set({ isLoading: true, error: null });
    const result = await clearCartAction();
    if (result.success) {
      set({
        items: [],
        totalItems: 0,
        totalAmount: 0,
        isLoading: false,
        error: null,
      });
    } else {
      set({
        isLoading: false,
        error: result.message ?? "Failed to clear cart",
      });
    }
  },

  mergeGuestCart: async () => {
    const guestItems = guestCartStorage.read();
    if (guestItems.length === 0) return { failedItems: [] };

    const result = await mergeCartAction(
      guestItems.map(({ serviceId, quantity }) => ({ serviceId, quantity })),
    );

    if (result.success && result.data) {
      set(hydrateFromResponse(result.data.cart));
      guestCartStorage.clear();
      return { failedItems: result.data.failedItems };
    }

    // Merge failed — keep localStorage intact so it can be retried.
    // Return networkError flag so callers can show a retry option.
    return { failedItems: [], networkError: true };
  },
}));

// ---------------------------------------------------------------------------
// Selectors
// ---------------------------------------------------------------------------

export const selectCartItems = (state: CartState): CartItemType[] =>
  state.items;
export const selectCartCount = (state: CartState): number => state.totalItems;
export const selectCartTotalAmount = (state: CartState): number =>
  state.totalAmount;
export const selectCartIsEmpty = (state: CartState): boolean =>
  state.totalItems === 0;
