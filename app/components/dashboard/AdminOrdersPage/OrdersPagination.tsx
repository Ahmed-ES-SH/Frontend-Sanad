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
    <div className="px-4 py-4 border-t border-surface-100 bg-surface-50/30">
      <div className="flex items-center justify-between">
        {/* Results per page */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-surface-500">
            {t.pagination?.show || "Show"}
          </span>
          <select
            value={filters.limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            disabled={isFetching}
            className="px-2 py-1 text-sm border border-surface-200 rounded-lg bg-white text-surface-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {PAGINATION_LIMITS.map((limit) => (
              <option key={limit} value={limit}>
                {limit}
              </option>
            ))}
          </select>
          <span className="text-xs text-surface-500">
            {t.pagination?.perPage || "per page"}
          </span>
        </div>

        {/* Pagination controls */}
        <Pagination
          currentPage={meta.page}
          totalPages={meta.lastPage}
          onPageChange={onPageChange}
        />
      </div>

      {/* Results count */}
      <div className="text-xs text-surface-500 mt-2 text-center">
        {t.pagination?.showing || "Showing"}{" "}
        <span className="font-medium text-surface-700">
          {(meta.page - 1) * meta.limit + 1}
        </span>{" "}
        -{" "}
        <span className="font-medium text-surface-700">
          {Math.min(meta.page * meta.perPage, meta.total)}
        </span>{" "}
        {t.pagination?.of || "of"}{" "}
        <span className="font-medium text-surface-700">{meta.total}</span>{" "}
        {t.pagination?.results || "results"}
      </div>
    </div>
  );
}