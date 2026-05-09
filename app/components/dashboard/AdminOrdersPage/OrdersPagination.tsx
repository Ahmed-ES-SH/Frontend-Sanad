"use client";

import React from "react";
import { useTranslation } from "@/app/hooks/useTranslation";
import { PAGINATION_LIMITS } from "@/app/constants/orderDetails";
import Pagination from "../../global/Pagination";
import type { PaginationMeta } from "@/app/types/global";

interface OrdersPaginationProps {
  meta: PaginationMeta | null;
  filters: {
    limit: number;
  };
  isFetching: boolean;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export function OrdersPagination({
  meta,
  filters,
  isFetching,
  onPageChange,
  onLimitChange,
}: OrdersPaginationProps) {
  const t = useTranslation("OrdersPage");

  if (!meta || meta.lastPage <= 1) {
    return null;
  }

  return (
    <div className="px-6 py-5 border-t border-surface-100 bg-surface-50/20 backdrop-blur-sm rounded-b-2xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Results summary info */}
        <div className="flex items-center gap-2.5 text-sm order-2 md:order-1">
          <span className="text-surface-500 font-medium">
            {t.pagination?.showing || "Showing"}
          </span>
          <div className="flex items-center px-3 py-1 bg-white border border-surface-200 rounded-full shadow-sm">
            <span className="font-bold text-primary">
              {(meta.page - 1) * meta.limit + 1}
            </span>
            <span className="mx-1.5 text-surface-300">-</span>
            <span className="font-bold text-primary">
              {Math.min(meta.page * meta.limit, meta.total)}
            </span>
          </div>
          <span className="text-surface-500 font-medium">
            {t.pagination?.of || "of"}
          </span>
          <span className="font-bold text-surface-900">{meta.total}</span>
          <span className="text-surface-500 font-medium">
            {t.pagination?.results || "results"}
          </span>
        </div>

        {/* Controls group (Pagination + Limit) */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto order-1 md:order-2">
          {/* Limit selector styled as a premium button-select */}
          <div className="flex items-center bg-white border border-surface-200 rounded-xl p-1 shadow-sm">
            <span className="px-3 text-xs font-semibold text-surface-400 uppercase tracking-wider border-r border-surface-100">
              {t.pagination?.show || "Show"}
            </span>
            <div className="relative group">
              <select
                value={filters.limit}
                onChange={(e) => onLimitChange(Number(e.target.value))}
                disabled={isFetching}
                className="appearance-none pl-4 pr-10 py-1.5 text-sm font-bold text-surface-700 bg-transparent focus:outline-none cursor-pointer disabled:cursor-not-allowed"
              >
                {PAGINATION_LIMITS.map((limit) => (
                  <option key={limit} value={limit}>
                    {limit}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-surface-400 group-hover:text-primary transition-colors">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-surface-200 hidden sm:block" />

          {/* Pagination controls */}
          <div className="pagination-wrapper">
            <Pagination
              currentPage={meta.page}
              totalPages={meta.lastPage}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .pagination-wrapper > div {
          margin-top: 0 !important;
          gap: 0.5rem !important;
        }
        .pagination-wrapper button {
          height: 2.25rem !important;
          width: 2.25rem !important;
          padding: 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          border-radius: 0.75rem !important;
        }
      `}</style>
    </div>
  );
}
