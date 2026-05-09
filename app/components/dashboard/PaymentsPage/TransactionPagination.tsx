import React from "react";
import { PaginationMeta } from "@/app/types/global";

interface TransactionPaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

export default function TransactionPagination({
  meta,
  onPageChange,
}: TransactionPaginationProps) {
  const maxVisible = 5;

  const getPageNumbers = () => {
    let startPage = Math.max(
      1,
      meta.page - Math.floor(maxVisible / 2)
    );
    let endPage = Math.min(meta.lastPage, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    const pages: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getPageNumbers();
  const startItem = (meta.page - 1) * meta.limit + 1;
  const endItem = Math.min(meta.page * meta.limit, meta.total);

  const canGoPrev = meta.page > 1;
  const canGoNext = meta.page < meta.lastPage;

  const showLeftEllipsis = pages[0] > 2;
  const showRightEllipsis = pages[pages.length - 1] < meta.lastPage - 1;

  return (
    <div className="px-6 py-4 border-t border-stone-200 flex items-center justify-between bg-stone-50">
      <div className="text-sm text-stone-500">
        Showing{" "}
        <span className="font-medium text-stone-900">{startItem}</span>
        {" "}to{" "}
        <span className="font-medium text-stone-900">{endItem}</span>
        {" "}of{" "}
        <span className="font-medium text-stone-900">{meta.total}</span>
        {" "}results
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(meta.page - 1)}
          disabled={!canGoPrev}
          className="px-3 py-1.5 text-sm font-medium text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          Previous
        </button>

        {showLeftEllipsis && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg bg-white text-stone-700 border border-stone-300 hover:bg-stone-50 transition-colors"
            >
              1
            </button>
            {pages[0] > 2 && (
              <span className="w-8 h-8 flex items-center justify-center text-stone-400">
                ...
              </span>
            )}
          </>
        )}

        {pages.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg transition-colors ${
              meta.page === pageNum
                ? "bg-orange-600 text-white border border-orange-600"
                : "bg-white text-stone-700 border border-stone-300 hover:bg-stone-50"
            }`}
            aria-current={meta.page === pageNum ? "page" : undefined}
          >
            {pageNum}
          </button>
        ))}

        {showRightEllipsis && (
          <>
            {pages[pages.length - 1] < meta.lastPage - 1 && (
              <span className="w-8 h-8 flex items-center justify-center text-stone-400">
                ...
              </span>
            )}
            <button
              onClick={() => onPageChange(meta.lastPage)}
              className="w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg bg-white text-stone-700 border border-stone-300 hover:bg-stone-50 transition-colors"
            >
              {meta.lastPage}
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(meta.page + 1)}
          disabled={!canGoNext}
          className="px-3 py-1.5 text-sm font-medium text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>
  );
}