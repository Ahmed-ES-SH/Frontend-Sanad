"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslation("BlogPage.Pagination");

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 2.4 }}
      className="mt-12 flex items-center justify-center gap-2"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() =>
          currentPage > 1 ? handlePageChange(currentPage - 1) : null
        }
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-stone-100 text-stone-500 hover:bg-orange-500 hover:text-white transition-all rtl:rotate-180 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={t.previous}
      >
        <HiOutlineChevronLeft className="text-xl" />
      </motion.button>

      {getPageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <motion.button
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handlePageChange(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold text-xs transition-all ${
              currentPage === page
                ? "bg-orange-500 text-white"
                : "bg-stone-100 text-stone-500 hover:bg-orange-500 hover:text-white"
            }`}
          >
            {page}
          </motion.button>
        ) : (
          <span key={index} className="text-stone-400 px-2 text-xs">
            ...
          </span>
        ),
      )}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() =>
          currentPage < totalPages ? handlePageChange(currentPage + 1) : null
        }
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-stone-100 text-stone-500 hover:bg-orange-500 hover:text-white transition-all rtl:rotate-180 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={t.next}
      >
        <HiOutlineChevronRight className="text-xl" />
      </motion.button>
    </motion.div>
  );
}
