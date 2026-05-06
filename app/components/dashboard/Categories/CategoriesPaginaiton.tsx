import { PaginationMeta } from "@/app/types/global";
import React from "react";

interface CategoriesPaginaitonProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

export default function CategoriesPaginaiton({
  meta,
  onPageChange,
  isLoading,
}: CategoriesPaginaitonProps) {
  const { page, lastPage } = meta;
  
  // Calculate visible page numbers with ellipsis
  const getVisiblePages = (): (number | "ellipsis")[] => {
    const delta = 2; // Show 2 pages before and after current
    const range: (number | "ellipsis")[] = [];
    const rangeWithEllipsis: (number | "ellipsis")[] = [];

    for (let i = 1; i <= lastPage; i++) {
      if (i === 1 || i === lastPage || (i >= page - delta && i <= page + delta)) {
        range.push(i);
      }
    }

    // Add ellipsis where needed
    let prev: number | null = null;
    for (const item of range) {
      if (typeof item === "number") {
        if (prev !== null && item - prev > 1) {
          rangeWithEllipsis.push("ellipsis");
        }
        rangeWithEllipsis.push(item);
        prev = item;
      }
    }

    return rangeWithEllipsis;
  };

  const visiblePages = getVisiblePages();

  const renderPageButton = (pageNum: number | "ellipsis", idx: number) => {
    if (pageNum === "ellipsis") {
      return (
        <span
          key={`ellipsis-${idx}`}
          className="min-w-[32px] px-2 py-1.5 text-surface-400"
        >
          ...
        </span>
      );
    }

    const isActive = pageNum === page;
    return (
      <button
        key={`page-${pageNum}`}
        disabled={isLoading}
        onClick={() => onPageChange(pageNum)}
        className={`min-w-[32px] px-2 py-1.5 rounded-md border text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          isActive
            ? "bg-primary border-primary text-white"
            : "border-surface-300 text-surface-700 bg-white hover:bg-surface-50"
        }`}
      >
        {pageNum}
      </button>
    );
  };

  return (
    <div className="flex items-center gap-1">
      {visiblePages.map((pageNum, idx) => renderPageButton(pageNum, idx))}
    </div>
  );
}