"use client";

import { FiChevronLeft, FiLoader } from "react-icons/fi";
import { TransactionPaginationProps } from "./TransactionPagination.types";
import { useTranslation } from "@/app/hooks/useTranslation";

const TransactionPagination: React.FC<TransactionPaginationProps> = ({
  currentPage,
  totalPages,
  total,
  isFetching,
  hasNextPage,
  hasPrevPage,
  filteredCount,
  onPageChange,
  onPreviousPage,
  onNextPage,
}) => {
  const t = useTranslation("payments");

  return (
    <div className="p-4 bg-stone-100 border-t border-stone-200/50 flex flex-col sm:flex-row justify-between items-center gap-4">
      <p className="text-xs text-muted-foreground order-2 sm:order-1">
        {isFetching ? (
          <span className="flex items-center gap-2">
            <FiLoader className="animate-spin" />
            {t.loadingText}
          </span>
        ) : (
          <>
            {t.showingText.replace("{{count}}", String(filteredCount))}{" "}
            {t.ofText} {total} {t.transactionsText}
          </>
        )}
      </p>
      <div className="flex gap-2 order-1 sm:order-2">
        <button
          className="p-2 rounded-lg bg-white border border-stone-200/50 text-muted-foreground disabled:opacity-30 hover:bg-stone-50 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed"
          onClick={onPreviousPage}
          disabled={!hasPrevPage || isFetching}
          aria-disabled={!hasPrevPage || isFetching}
          aria-label={t.previousPageLabel}
        >
          <FiChevronLeft className="text-sm" />
        </button>
        <span className="px-3 py-2 text-xs font-medium text-muted-foreground whitespace-nowrap">
          {t.pageText
            .replace("{{current}}", String(currentPage))
            .replace("{{total}}", String(totalPages))}
        </span>
        <button
          className="p-2 rounded-lg bg-white border border-stone-200/50 text-muted-foreground disabled:opacity-30 hover:bg-stone-50 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed"
          onClick={onNextPage}
          disabled={!hasNextPage || isFetching}
          aria-disabled={!hasNextPage || isFetching}
          aria-label={t.nextPageLabel}
        >
          <FiChevronLeft className="text-sm rotate-180" />
        </button>
      </div>
    </div>
  );
};

export default TransactionPagination;
