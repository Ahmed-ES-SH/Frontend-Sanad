"use client";

import { User } from "@/app/types/user";
import UserTable from "./UserTable";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

// ============================================================================
// USER TABLE WITH PAGINATION - Wraps UserTable with pagination controls
// ============================================================================

interface UserTableWithPaginationProps {
  users: User[];
  currentPage: number;
  totalPages: number;
  total: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onDelete: (user: User) => void;
  deletingId: number | null;
}

export default function UserTableWithPagination({
  users,
  currentPage,
  totalPages,
  total,
  perPage,
  onPageChange,
  onDelete,
  deletingId,
}: UserTableWithPaginationProps) {
  const startIndex = (currentPage - 1) * perPage;

  // Error state
  if (users.length === 0 && total === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-12 text-center">
        <div className="text-stone-400 text-sm">
          No users found. Create your first user to get started.
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-12 text-center">
        <div className="text-stone-400 text-sm">
          No users found matching your filters.
        </div>
      </div>
    );
  }

  return (
    <>
      <UserTable users={users} onDelete={onDelete} deletingId={deletingId} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white rounded-xl shadow-sm px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-stone-500 font-medium">
            Showing {startIndex + 1}-{Math.min(startIndex + perPage, total)} of{" "}
            {total} users
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-stone-400 hover:bg-stone-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <HiChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let page: number;
              if (totalPages <= 5) {
                page = i + 1;
              } else if (currentPage <= 3) {
                page = i + 1;
              } else if (currentPage >= totalPages - 2) {
                page = totalPages - 4 + i;
              } else {
                page = currentPage - 2 + i;
              }

              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                    currentPage === page
                      ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                      : "text-stone-500 hover:bg-stone-200"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span className="text-stone-400 mx-1">...</span>
                <button
                  onClick={() => onPageChange(totalPages)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-stone-500 hover:bg-stone-200 transition-colors text-xs font-bold"
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              onClick={() =>
                onPageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-stone-400 hover:bg-stone-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <HiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
