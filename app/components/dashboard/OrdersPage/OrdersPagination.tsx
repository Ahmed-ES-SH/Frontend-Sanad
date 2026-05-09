"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { PaginationMeta } from "@/app/types/global";

interface OrdersPaginationProps {
  meta: PaginationMeta;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function OrdersPagination({ meta, currentPage, onPageChange }: OrdersPaginationProps) {
  if (!meta || meta.total <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center justify-center gap-3 pt-6" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="group flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40"
      >
        <FiChevronLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
      </button>

      <span className="min-w-[120px] text-center text-sm font-medium text-gray-600 tabular-nums">
        <span className="text-gray-900">{currentPage}</span>
        <span className="mx-1.5 text-gray-400">/</span>
        <span>{meta.total}</span>
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === meta.total}
        aria-label="Next page"
        className="group flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40"
      >
        <FiChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </button>
    </nav>
  );
}

OrdersPagination.displayName = "OrdersPagination";