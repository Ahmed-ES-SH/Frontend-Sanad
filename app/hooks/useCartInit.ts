"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/app/store/AuthSlice";
import { useCartStore } from "@/app/store/CartSlice";

/**
 * Initialises the cart and keeps it in sync with auth state.
 *
 * - Authenticated users  → fetch their server cart via GET /cart
 * - Guest users          → hydrate the Zustand store from localStorage
 *
 * Reacts to `user` changes so that:
 *   1. After a credential login (in-page), the cart is re-fetched immediately.
 *   2. After server-side auth hydration populates the store post-mount, the
 *      cart is fetched automatically (covers SSR token rehydration).
 *
 * NOTE: Google OAuth (full-page redirect) is handled separately by
 * OAuthCartSync which runs in the layout after the callback completes.
 *
 * Must be called inside a client component that renders after auth hydration
 * (e.g. the ClientDiv shell in the Navbar).
 */
export function useCartInit() {
  const user = useAuthStore((state) => state.user);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const loadGuestCart = useCartStore((state) => state.loadGuestCart);

  // Track whether we have already fetched for this specific user identity
  // to avoid duplicate API calls on re-renders.
  const lastFetchedFor = useRef<string | null>(null);

  useEffect(() => {
    if (user) {
      // Only re-fetch if the user identity actually changed
      const userId = String(user.id ?? user.email ?? "authenticated");
      if (lastFetchedFor.current === userId) return;
      lastFetchedFor.current = userId;
      void fetchCart();
    } else {
      // Reset the tracker so a fresh fetch fires on next login
      lastFetchedFor.current = null;
      loadGuestCart();
    }
  }, [user]); // re-fires whenever auth state changes
}
