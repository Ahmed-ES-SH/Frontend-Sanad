"use client";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";

interface props {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

// Pagination Component
export default function BlogPagination({
  currentPage,
  totalPages,
  isLoading,
  onPageChange,
}: props) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisible - 1);

      if (end === totalPages) {
        start = Math.max(1, totalPages - maxVisible + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <motion.div
      className="flex items-center justify-center gap-2 mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="p-2.5 rounded-xl border border-surface-200 bg-surface-card text-surface-600 hover:text-primary hover:border-primary/30 hover:shadow-surface-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        aria-label="Previous Page"
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-1.5">
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={isLoading}
            className={`min-w-[44px] h-[44px] flex items-center justify-center rounded-xl font-bold transition-all duration-300 ${
              page === currentPage
                ? "bg-primary text-white shadow-button ring-4 ring-primary/10"
                : "bg-surface-card border border-surface-200 text-surface-600 hover:text-primary hover:border-primary/30 hover:shadow-surface-sm disabled:opacity-50 disabled:cursor-not-allowed"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className="p-2.5 rounded-xl border border-surface-200 bg-surface-card text-surface-600 hover:text-primary hover:border-primary/30 hover:shadow-surface-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        aria-label="Next Page"
      >
        <FiChevronRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
}
