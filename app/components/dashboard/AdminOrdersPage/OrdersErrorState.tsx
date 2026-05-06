"use client";

import React from "react";
import { useTranslation } from "@/app/hooks/useTranslation";

interface OrdersErrorStateProps {
  error: Error;
  onRetry?: () => void;
}

export function OrdersErrorState({ error, onRetry }: OrdersErrorStateProps) {
  const t = useTranslation("OrdersPage");

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="p-6 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
        <svg
          className="w-6 h-6 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-surface-900 mb-2">
        {t.errors?.loadFailed || "Failed to load orders"}
      </h3>
      <p className="text-sm text-surface-500 mb-4">
        {error.message || t.errors?.generic || "An error occurred while fetching orders."}
      </p>
      <button
        onClick={handleRetry}
        className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
      >
        {t.actions?.tryAgain || "Try Again"}
      </button>
    </div>
  );
}