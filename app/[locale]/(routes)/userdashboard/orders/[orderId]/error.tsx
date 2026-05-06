"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { useEffect } from "react";

interface OrderTrackingErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error boundary for order tracking page
 * Displays user-friendly error message with retry option
 */
const OrderTrackingError: React.FC<OrderTrackingErrorProps> = ({
  error,
  reset,
}) => {
  const t = useTranslation("orderTracking");

  useEffect(() => {
    // Log error to monitoring service in production
    console.error("Order tracking page error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 page-bg">
      <div className="w-16 h-16 bg-accent-rose/10 text-accent-rose rounded-2xl flex items-center justify-center mb-5">
        <svg
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.773-1.334-2.697-1.334-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 className="display-sm font-display text-surface-900 mb-2">
        {t.errorTitle}
      </h2>
      <p className="body text-surface-600 max-w-md mb-8">
        {t.errorDescription}
      </p>
      <button
        onClick={reset}
        className="surface-btn-primary"
        aria-label={t.tryAgain}
      >
        {t.tryAgain}
      </button>
    </div>
  );
};

export default OrderTrackingError;
