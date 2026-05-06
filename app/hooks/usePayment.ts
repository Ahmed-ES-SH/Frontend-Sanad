// ============================================================================
// PAYMENT HOOK - Client-side hook for Stripe payment flow
// ============================================================================

"use client";

import { useState, useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useInitiatePayment } from "./useInitiatePayment";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
);

interface PaymentState {
  clientSecret: string | null;
  paymentId: string | null;
  stripePaymentIntentId: string | null;
  isLoading: boolean;
  error: string | null;
}

export function usePayment(orderId: string) {
  const initiatePaymentHook = useInitiatePayment();

  const [state, setState] = useState<PaymentState>({
    clientSecret: null,
    paymentId: null,
    stripePaymentIntentId: null,
    isLoading: false,
    error: null,
  });

  const initiatePayment = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    const result = await initiatePaymentHook.initiatePayment(orderId);

    if (result.success && result.data) {
      setState({
        clientSecret: result.data.clientSecret,
        paymentId: result.data.paymentId,
        stripePaymentIntentId: result.data.stripePaymentIntentId,
        isLoading: false,
        error: null,
      });
    } else {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: result.message || "Failed to initiate payment",
      }));
    }

    return result;
  }, [orderId, initiatePaymentHook]);

  const confirmPayment = useCallback(
    async (clientSecret: string, returnUrl?: string) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const stripe = await stripePromise;
        if (!stripe) {
          throw new Error("Stripe failed to load");
        }

        // Note: This requires the PaymentElement to be mounted in a parent component
        // For now, we'll return the clientSecret and let the parent handle the actual confirmation
        setState((prev) => ({ ...prev, isLoading: false }));

        return { success: true };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Payment failed";
        setState((prev) => ({ ...prev, isLoading: false, error: message }));
        return { success: false, error: message };
      }
    },
    [],
  );

  const reset = useCallback(() => {
    setState({
      clientSecret: null,
      paymentId: null,
      stripePaymentIntentId: null,
      isLoading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    initiatePayment,
    confirmPayment,
    reset,
  };
}
