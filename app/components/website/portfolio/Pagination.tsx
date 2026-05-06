"use client";
import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface props {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  handlePageChange,
}: props) {
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

  return (
    <>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ color: "var(--surface-500)" }}
            onMouseEnter={(e) => {
              if (currentPage !== 1) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--surface-100)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
            }}
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>

          {getVisiblePages().map((page, idx) =>
            typeof page === "string" ? (
              <span key={`ellipsis-${idx}`} className="px-2" style={{ color: "var(--surface-400)" }}>
                {page}
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className="w-10 h-10 rounded-lg text-sm font-medium"
                style={
                  currentPage === page
                    ? { backgroundColor: "var(--primary)", color: "white" }
                    : { backgroundColor: "transparent", color: "var(--surface-600)" }
                }
                onMouseEnter={(e) => {
                  if (currentPage !== page) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--surface-100)";
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== page) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ color: "var(--surface-500)" }}
            onMouseEnter={(e) => {
              if (currentPage !== totalPages) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--surface-100)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
            }}
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </>
  );
}
