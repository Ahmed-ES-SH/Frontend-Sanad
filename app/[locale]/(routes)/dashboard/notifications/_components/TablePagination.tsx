"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface TablePaginationProps {
  page: number;
  totalPages: number;
  total: number;
  perPage: number;
  onPageChange: (page: number) => void;
}

export function TablePagination({
  page,
  totalPages,
  total,
  perPage,
  onPageChange,
}: TablePaginationProps) {
  if (totalPages <= 1) return null;

  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);

  return (
    <div className="flex items-center justify-between pt-2">
      <span className="text-xs font-medium text-surface-500 uppercase tracking-wider">
        Showing {start}-{end} of {total}
      </span>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(page - 1, 1))}
          disabled={page === 1}
          className="p-2 rounded-lg border border-surface-200 hover:bg-surface-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <FiChevronLeft className="w-4 h-4 text-surface-600" />
        </button>
        <div className="px-3 py-1 bg-surface-50 border border-surface-200 rounded-lg text-xs font-bold text-surface-700">
          {page} / {totalPages}
        </div>
        <button
          type="button"
          onClick={() => onPageChange(Math.min(page + 1, totalPages))}
          disabled={page === totalPages}
          className="p-2 rounded-lg border border-surface-200 hover:bg-surface-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <FiChevronRight className="w-4 h-4 text-surface-600" />
        </button>
      </div>
    </div>
  );
}
