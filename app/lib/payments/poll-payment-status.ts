import { PaymentStatus } from "@/app/types/payments";
import { getMyPaymentById } from "@/app/lib/payments";

export type PaymentStatusCallback = (status: PaymentStatus) => void;

export interface PollPaymentStatusOptions {
  /** Payment ID to poll */
  paymentId: string;
  /** Callback when status changes */
  onStatusChange: PaymentStatusCallback;
  /** Maximum number of polling attempts (default: 10) */
  maxAttempts?: number;
  /** Interval between polling attempts in ms (default: 2000) */
  intervalMs?: number;
  /** Callback when polling fails */
  onError?: (error: Error) => void;
  /** Callback when polling times out */
  onTimeout?: () => void;
  /** Continue as pending on timeout instead of forcing failed (default: true) */
  keepPendingOnTimeout?: boolean;
}

/**
 * Poll for payment status updates after initiating payment.
 * Since status changes are webhook-driven, polling is needed to detect async updates.
 *
 * @returns Cleanup function to stop polling
 */
export function pollPaymentStatus({
  paymentId,
  onStatusChange,
  maxAttempts = 10,
  intervalMs = 2000,
  onError,
  onTimeout,
  keepPendingOnTimeout = true,
}: PollPaymentStatusOptions): () => void {
  let attempts = 0;
  let isCancelled = false;

  const interval = setInterval(async () => {
    if (isCancelled) {
      clearInterval(interval);
      return;
    }

    attempts++;

    try {
      console.log(`[Poll Request Attempt ${attempts}] GET /payments/my-payments/${paymentId}`, {
        timestamp: new Date().toISOString()
      });
      const payment = await getMyPaymentById(paymentId);
      const { status } = payment;
      console.log(`[Poll Response Attempt ${attempts}] Success:`, {
        status,
        payment,
        timestamp: new Date().toISOString()
      });

      onStatusChange(status);

      // Checkout flow only finalizes on succeeded/failed.
      if (status === "succeeded" || status === "failed") {
        clearInterval(interval);
      }
    } catch (error) {
      // Log error but continue polling
      console.error(`[Poll Error Attempt ${attempts}] Request failed:`, {
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      });
      if (onError && error instanceof Error) {
        onError(error);
      }
    }

    // Handle timeout
    if (attempts >= maxAttempts) {
      clearInterval(interval);
      if (onTimeout) {
        onTimeout();
      }
      if (!keepPendingOnTimeout) {
        onStatusChange("failed");
      }
    }
  }, intervalMs);

  // Return cleanup function
  return () => {
    isCancelled = true;
    clearInterval(interval);
  };
}

/**
 * Check if payment status terminal (not pending)
 */
export function isPaymentStatusTerminal(status: PaymentStatus): boolean {
  return status === "succeeded" || status === "failed";
}

/**
 * Get user-friendly message for payment status
 */
export function getPaymentStatusMessage(status: PaymentStatus): string {
  switch (status) {
    case "pending":
      return "Payment is being processed...";
    case "succeeded":
      return "Payment completed successfully!";
    case "failed":
      return "Payment failed. Please try again.";
    case "partially_refunded":
      return "Payment is partially refunded.";
    case "refunded":
      return "Payment has been refunded.";
    default:
      return "Unknown payment status";
  }
}
