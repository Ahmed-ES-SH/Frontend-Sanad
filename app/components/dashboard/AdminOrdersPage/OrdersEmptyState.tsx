"use client";

import React from "react";
import { useTranslation } from "@/app/hooks/useTranslation";

interface OrdersEmptyStateProps {
  onBrowseServices?: () => void;
}

export function OrdersEmptyState({ onBrowseServices }: OrdersEmptyStateProps) {
  const t = useTranslation("OrdersPage");

  return (
    <div className="p-6 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-surface-100 mb-4">
        <svg
          className="w-6 h-6 text-surface-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-surface-900 mb-2">
        {t.empty?.title || "No orders found"}
      </h3>
      <p className="text-sm text-surface-500">
        {t.empty?.description || "There are no orders matching your filters."}
      </p>
    </div>
  );
}