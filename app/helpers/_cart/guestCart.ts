/**
 * Guest cart localStorage persistence layer.
 *
 * Stores serviceId, quantity, and optional display fields so items
 * can be rendered without an API call. Prices stored here are for
 * display only — the backend always revalidates them on merge.
 */

const GUEST_CART_KEY = "guest_cart";

export interface GuestCartItem {
  serviceId: string;
  quantity: number;
  // Optional display cache — never sent as source of truth to the API
  serviceTitle?: string;
  serviceSlug?: string;
  serviceIconUrl?: string | null;
  serviceImageUrl?: string | null;
  unitPrice?: number;
}

const isValidItem = (item: unknown): item is GuestCartItem =>
  typeof item === "object" &&
  item !== null &&
  typeof (item as GuestCartItem).serviceId === "string" &&
  typeof (item as GuestCartItem).quantity === "number";

export const guestCartStorage = {
  read(): GuestCartItem[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(GUEST_CART_KEY);
      if (!raw) return [];
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(isValidItem);
    } catch {
      return [];
    }
  },

  write(items: GuestCartItem[]): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
    } catch {
      // Storage might be full or blocked — fail silently
    }
  },

  clear(): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(GUEST_CART_KEY);
    } catch {
      // Ignore
    }
  },
};
