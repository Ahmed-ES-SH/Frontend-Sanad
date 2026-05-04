"use client";

import { PaginationMeta } from "@/app/types/global";
import {
  PAGINATION_VISIBLE_PAGES,
  PAGINATION_BUTTONS,
} from "@/app/constants/projects";

interface ProjectsPaginationProps {
  meta: PaginationMeta;
  currentPage: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

export default function ProjectsPagination({
  meta,
  currentPage,
  isLoading,
  onPageChange,
}: ProjectsPaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < meta.total && meta.total > 0) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = (): (number | null)[] => {
    const pages: (number | null)[] = [];
    const totalPages = meta.lastPage;

    if (totalPages <= PAGINATION_VISIBLE_PAGES) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (currentPage <= 2) {
        endPage = PAGINATION_VISIBLE_PAGES;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - PAGINATION_VISIBLE_PAGES + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div className="border-t border-[var(--surface-card-border)] bg-[var(--surface-50)] py-4 px-6 flex items-center justify-between">
      <p className="font-inter text-sm text-stone-500">
        Showing{" "}
        <span className="font-medium text-stone-900">{meta.limit ?? 20}</span>{" "}
        of <span className="font-medium text-stone-900">{meta.total}</span>{" "}
        results
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1 || isLoading}
          className="px-3 py-1.5 rounded-lg border border-[var(--surface-card-border)] bg-white text-sm font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-inter shadow-surface-sm"
        >
          {PAGINATION_BUTTONS.previous}
        </button>
        <div className="flex items-center gap-1 hidden sm:flex">
          {getPageNumbers().map((pageNum) => {
            if (pageNum === null) {
              return (
                <span key="ellipsis" className="px-2 text-stone-400">
                  ...
                </span>
              );
            }
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors font-inter flex items-center justify-center ${
                  currentPage === pageNum
                    ? "bg-[var(--primary)] text-white shadow-button"
                    : "text-stone-600 hover:bg-white border border-transparent hover:border-[var(--surface-card-border)]"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
        <button
          onClick={handleNext}
          disabled={currentPage === meta.total || isLoading || meta.total === 0}
          className="px-3 py-1.5 rounded-lg border border-[var(--surface-card-border)] bg-white text-sm font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-inter shadow-surface-sm"
        >
          {PAGINATION_BUTTONS.next}
        </button>
      </div>
    </div>
  );
}
