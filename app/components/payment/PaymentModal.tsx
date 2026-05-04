/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { motion, AnimatePresence } from "framer-motion";
import { pollPaymentStatus } from "@/app/lib/payments/poll-payment-status";
import { useTranslation } from "@/app/hooks/useTranslation";

// Sub-components
import { PaymentHeader } from "./PaymentHeader";
import { PaymentSuccess } from "./PaymentSuccess";
import { PaymentFailed } from "./PaymentFailed";
import { PaymentAuthRequired } from "./PaymentAuthRequired";
import { PaymentProcessing } from "./PaymentProcessing";
import { PaymentDelayed } from "./PaymentDelayed";
import { PaymentSummary } from "./PaymentSummary";
import { StripePaymentForm } from "./StripePaymentForm";
import { useLocale } from "@/app/hooks/useLocale";
import { useRouter } from "next/navigation";

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripePublishableKey
  ? loadStripe(stripePublishableKey)
  : null;

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientSecret: string | null;
  amount: number;
  currency?: string;
  paymentId: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

type CheckoutUiState =
  | "collecting"
  | "pending"
  | "verification_delayed"
  | "auth_required"
  | "succeeded"
  | "failed";

export function PaymentModal({
  isOpen,
  onClose,
  clientSecret,
  amount,
  currency = "USD",
  paymentId,
  onSuccess,
  onError,
}: PaymentModalProps) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslation("PaymentModal");
  const [checkoutState, setCheckoutState] =
    useState<CheckoutUiState>("collecting");
  const pollCleanupRef = useRef<(() => void) | null>(null);

  const handleError = (error: string) => {
    setCheckoutState("failed");
    onError?.(error);
  };

  const stopPolling = useCallback(() => {
    if (pollCleanupRef.current) {
      pollCleanupRef.current();
      pollCleanupRef.current = null;
    }
  }, []);

  const handleModalClose = useCallback(() => {
    stopPolling();
    onClose();
  }, [onClose, stopPolling]);

  const startWebhookStatusPolling = useCallback(() => {
    stopPolling();
    setCheckoutState("pending");

    pollCleanupRef.current = pollPaymentStatus({
      paymentId,
      onStatusChange: (status) => {
        if (status === "succeeded") {
          setCheckoutState("succeeded");
          stopPolling();
          onSuccess?.();
          router.push(`/${locale}/userdashboard/payments/success`);
        }

        if (status === "failed") {
          setCheckoutState("failed");
          stopPolling();
          onError?.(t.errors.failed);
        }
      },
      onError: (error) => {
        const statusCode =
          (
            error as Error & {
              statusCode?: number;
              response?: { status?: number };
            }
          ).statusCode ??
          (
            error as Error & {
              statusCode?: number;
              response?: { status?: number };
            }
          ).response?.status;

        if (statusCode === 401) {
          setCheckoutState("auth_required");
          stopPolling();
          onError?.(t.errors.sessionExpired);
          return;
        }
        onError?.(t.errors.unableToVerify);
      },
      onTimeout: () => {
        setCheckoutState("verification_delayed");
        onError?.(t.errors.verificationDelayed);
      },
    });
  }, [stopPolling, paymentId, onSuccess, onError]);

  const handleConfirmed = (paymentIntentStatus: string | null) => {
    if (paymentIntentStatus === "requires_payment_method") {
      setCheckoutState("failed");
      onError?.(t.errors.notCompleted);
      return;
    }
    startWebhookStatusPolling();
  };

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen) {
      setCheckoutState("collecting");
    }
  }

  // Handle side-effects when modal is closed
  useEffect(() => {
    if (!isOpen) {
      stopPolling();
    }
  }, [isOpen, stopPolling]);

  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, [stopPolling]);

  // Format amount for display (amount is in dollars, not cents as per API spec)
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0  z-99999 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleModalClose}
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative bg-white  w-full max-w-2xl mx-auto bg-surface-card-bg border border-surface-card-border rounded-2xl shadow-surface-xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <PaymentHeader
              title={t.secureCheckout}
              paymentIdLabel={t.paymentId}
              paymentId={paymentId}
              onClose={handleModalClose}
            />

            {/* Content */}
            <div className="px-6 py-6 max-h-[70vh] overflow-y-auto md:px-8">
              {checkoutState === "succeeded" ? (
                <PaymentSuccess
                  title={t.successTitle}
                  description={t.successDescription.replace(
                    "{amount}",
                    formattedAmount,
                  )}
                  buttonText={t.done}
                  onClose={handleModalClose}
                />
              ) : checkoutState === "failed" ? (
                <PaymentFailed
                  title={t.failedTitle}
                  description={t.failedDescription}
                  buttonText={t.tryAgain}
                  onRetry={() => setCheckoutState("collecting")}
                />
              ) : checkoutState === "auth_required" ? (
                <PaymentAuthRequired
                  title={t.authRequiredTitle}
                  description={t.authRequiredDescription}
                  buttonText={t.close}
                  onClose={handleModalClose}
                />
              ) : checkoutState === "verification_delayed" ? (
                <PaymentDelayed
                  title={t.delayedTitle}
                  description={t.delayedDescription}
                  buttonText={t.checkAgain}
                  onCheckAgain={startWebhookStatusPolling}
                />
              ) : checkoutState === "pending" ? (
                <PaymentProcessing
                  title={t.processingTitle}
                  description={t.processingDescription}
                />
              ) : clientSecret ? (
                <div className="space-y-6">
                  {/* Amount Summary */}
                  <PaymentSummary
                    label={t.totalAmountDue}
                    amount={formattedAmount}
                  />

                  {/* Stripe Form */}
                  <div className="min-h-[250px]">
                    <StripePaymentForm
                      stripePromise={stripePromise}
                      clientSecret={clientSecret}
                      configMissingLabel={t.configMissing}
                      onConfirmed={handleConfirmed}
                      onError={handleError}
                    />
                  </div>
                </div>
              ) : (
                <PaymentProcessing title={t.initializing} description={""} />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
