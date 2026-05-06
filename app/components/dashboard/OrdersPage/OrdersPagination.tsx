"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import type { PaginationMeta } from "@/app/types/global";

interface OrdersPaginationProps {
  meta: PaginationMeta;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function OrdersPagination({ meta, currentPage, onPageChange }: OrdersPaginationProps) {
  const pageLabel = useTranslation("ordersList.paginationPage");
  const ofLabel = useTranslation("ordersList.paginationOf");

  if (!meta || meta.total <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2 pt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <span className="text-sm text-gray-600">
        {pageLabel} {currentPage} {ofLabel} {meta.total}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === meta.total}
        className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}

OrdersPagination.displayName = "OrdersPagination";