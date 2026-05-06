"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useTranslation } from "@/app/hooks/useTranslation";
import { Locale } from "@/app/types/global";
import { PAGINATION_RANGE } from "@/app/constants/contactUs";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  total: number;
  currentPageItems: number;
  isLoading?: boolean;
  locale: Locale;
  onPageChange: (page: number) => void;
}

export function PaginationControls({
  page,
  totalPages,
  total,
  currentPageItems,
  isLoading,
  locale,
  onPageChange,
}: PaginationControlsProps) {
  const t = useTranslation("ContactUsPage.MessagesTable");

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    const range = PAGINATION_RANGE;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - range && i <= page + range)
      ) {
        pages.push(i);
      } else if (i === page - range - 1 || i === page + range + 1) {
        pages.push("...");
      }
    }

    // Filter out duplicate ellipses
    const uniquePages = pages.filter(
      (v, i, a) => v !== "..." || a[i - 1] !== "...",
    );

    return uniquePages.map((p, idx) =>
      p === "..." ? (
        <span
          key={`ellipsis-${idx}`}
          className="px-2 text-stone-400 text-xs font-bold"
        >
          ...
        </span>
      ) : (
        <button
          key={p}
          onClick={() => onPageChange(p as number)}
          disabled={isLoading || page === p}
          className={`w-8 h-8 rounded-xl text-[11px] font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            page === p
              ? "bg-orange-500 text-white shadow-sm border border-orange-600"
              : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
          }`}
        >
          {p}
        </button>
      ),
    );
  };

  return (
    <div className="px-6 py-4 bg-stone-50/30 flex justify-between items-center border-t border-stone-100">
      <div className="text-[11px] text-stone-400 font-bold tracking-tight">
        {total > 0 ? (
          <>
            {t.showing}{" "}
            <span className="text-stone-600">{currentPageItems}</span>{" "}
            {t.of}{" "}
            <span className="text-stone-600">{total}</span>{" "}
            {t.messages}
          </>
        ) : (
          t.showingText
        )}
      </div>
      <div className="flex items-center gap-1">
        <button
          className="p-2 px-3 bg-white border border-stone-200 rounded-xl text-[11px] font-bold text-stone-600 hover:bg-stone-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
          disabled={page <= 1 || isLoading}
          onClick={() => onPageChange(page - 1)}
        >
          {locale === "ar" ? (
            <FiChevronRight size={16} />
          ) : (
            <FiChevronLeft size={16} />
          )}
          {t.previous}
        </button>

        <div className="flex items-center gap-1 mx-1">{renderPageNumbers()}</div>

        <button
          className="p-2 px-3 bg-white border border-stone-200 rounded-xl text-[11px] font-bold text-stone-600 hover:bg-stone-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
          disabled={page >= totalPages || isLoading}
          onClick={() => onPageChange(page + 1)}
        >
          {t.next}
          {locale === "ar" ? (
            <FiChevronLeft size={16} />
          ) : (
            <FiChevronRight size={16} />
          )}
        </button>
      </div>
    </div>
  );
}