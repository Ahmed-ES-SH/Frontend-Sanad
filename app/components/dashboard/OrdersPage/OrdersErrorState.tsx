"use client";

import { useTranslation } from "@/app/hooks/useTranslation";

interface OrdersErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function OrdersErrorState({ error, onRetry }: OrdersErrorStateProps) {
  const tryAgainLabel = useTranslation("ordersList.tryAgain");

  return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-xl">
      <p className="text-red-600">{error}</p>
      <button
        onClick={onRetry}
        className="mt-4 text-sm text-indigo-600 hover:text-indigo-700"
      >
        {tryAgainLabel}
      </button>
    </div>
  );
}

OrdersErrorState.displayName = "OrdersErrorState";