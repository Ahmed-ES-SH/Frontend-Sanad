"use client";
import React from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <motion.div
      className="flex items-center justify-center gap-2 mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2.5 rounded-xl border border-surface-200 bg-white text-surface-600 transition-all hover:bg-surface-50 hover:border-surface-300 disabled:opacity-40 disabled:cursor-not-allowed group"
        aria-label="Previous page"
      >
        <FiChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
      </button>

      <div className="flex items-center gap-1.5">
        {getVisiblePages().map((page, idx) =>
          typeof page === "string" ? (
            <span
              key={`ellipsis-${idx}`}
              className="w-10 text-center text-surface-400 font-medium"
            >
              {page}
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                currentPage === page
                  ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                  : "bg-white border border-surface-200 text-surface-600 hover:bg-surface-50 hover:border-surface-300"
              }`}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2.5 rounded-xl border border-surface-200 bg-white text-surface-600 transition-all hover:bg-surface-50 hover:border-surface-300 disabled:opacity-40 disabled:cursor-not-allowed group"
        aria-label="Next page"
      >
        <FiChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
      </button>
    </motion.div>
  );
}
