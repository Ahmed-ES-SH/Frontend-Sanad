"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/app/store/AuthSlice";
import { useCartStore } from "@/app/store/CartSlice";
import { guestCartStorage } from "@/app/helpers/_cart/guestCart";
import { toast } from "sonner";

/**
 * Handles guest-cart → server-cart merge for OAuth (Google) logins.
 *
 * Credential logins merge inside SignInForm before navigating away.
 * OAuth logins are a full-page redirect, so SignInForm never runs the
 * merge step. This hook fills that gap:
 *
 *  1. Fires once when `user` transitions from null → authenticated.
 *  2. Checks if there are any guest cart items in localStorage.
 *  3. If yes, calls `mergeGuestCart()` (which also calls POST /cart/merge
 *     and clears localStorage on success).
 *  4. Shows a warning toast if any items could not be merged.
 *
 * Safe to include for credential logins too — `guestCartStorage.read()`
 * returns [] after SignInForm already cleared it, so the merge is a no-op.
 */
export function useOAuthCartMerge() {
  const user = useAuthStore((state) => state.user);
  const mergeGuestCart = useCartStore((state) => state.mergeGuestCart);

  // Track the last user id we merged for to prevent duplicate calls
  const mergedFor = useRef<string | null>(null);

  useEffect(() => {
    if (!user) {
      mergedFor.current = null;
      return;
    }

    const userId = String(user.id ?? user.email ?? "authenticated");
    if (mergedFor.current === userId) return;
    mergedFor.current = userId;

    // Only attempt merge if there is actually something in localStorage
    const guestItems = guestCartStorage.read();
    if (guestItems.length === 0) return;

    void (async () => {
      const result = await mergeGuestCart();

      if (result.networkError) {
        toast.warning(
          "Your cart items could not be saved — please try adding them again.",
        );
        return;
      }

      if (result.failedItems.length > 0) {
        toast.warning(
          `${result.failedItems.length} item(s) from your cart could not be added.`,
        );
      }
    })();
  }, [user, mergeGuestCart]);
}
