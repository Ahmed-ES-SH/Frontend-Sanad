"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { PaginationBarProps, getPaginationLabels } from "./PaginationBar.types";

const PaginationBar: React.FC<PaginationBarProps> = ({
  meta,
  hasPrevPage,
  hasNextPage,
  isRTL,
  navigateToPage,
  locale,
}) => {
  const totalPages = meta.total;
  const currentPage = meta.page;
  const labels = getPaginationLabels(locale);

  // Build page number buttons — always show first, last, current ± 1
  const getPageNumbers = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
      {/* Summary */}
      <p className="text-sm text-surface-500 font-body order-2 sm:order-1">
        {labels.page} {currentPage} {labels.of} {totalPages}
      </p>

      {/* Page Buttons */}
      <div className="flex items-center gap-2 order-1 sm:order-2">
        {/* Prev */}
        <button
          onClick={() => navigateToPage(currentPage - 1)}
          disabled={!hasPrevPage}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            hasPrevPage
              ? "bg-white text-surface-700 border border-surface-200 hover:border-primary/30 hover:bg-primary-50 hover:text-primary active:scale-95"
              : "bg-surface-100 text-surface-400 cursor-not-allowed opacity-50"
          } ${isRTL ? "flex-row-reverse" : ""}`}
          aria-label={labels.prev}
        >
          <FiChevronLeft className={isRTL ? "rotate-180" : ""} />
          <span>{labels.prev}</span>
        </button>

        {/* Page numbers */}
        <div className="hidden sm:flex items-center gap-1.5">
          {pageNumbers.map((page, i) =>
            page === "..." ? (
              <span
                key={`ellipsis-${i}`}
                className="px-3 py-2.5 text-surface-400 font-body text-sm"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => navigateToPage(page)}
                className={`w-10 h-10 rounded-xl font-semibold text-sm transition-all ${
                  page === currentPage
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-white text-surface-700 border border-surface-200 hover:border-primary/30 hover:bg-primary-50 hover:text-primary"
                }`}
                aria-label={`${labels.page} ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            ),
          )}
        </div>

        {/* Next */}
        <button
          onClick={() => navigateToPage(currentPage + 1)}
          disabled={!hasNextPage}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            hasNextPage
              ? "bg-white text-surface-700 border border-surface-200 hover:border-primary/30 hover:bg-primary-50 hover:text-primary active:scale-95"
              : "bg-surface-100 text-surface-400 cursor-not-allowed opacity-50"
          } ${isRTL ? "flex-row-reverse" : ""}`}
          aria-label={labels.next}
        >
          <span>{labels.next}</span>
          <FiChevronRight className={isRTL ? "rotate-180" : ""} />
        </button>
      </div>
    </div>
  );
};

export default PaginationBar;
