"use client";

import { useState, useMemo, useCallback } from "react";
import {
  FiSearch,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiLoader,
} from "react-icons/fi";
import { User } from "@/app/types/user";
import Image from "next/image";
import { useAppQuery } from "@/app/hooks/useAppQuery";

interface UserSelectionTableProps {
  selectedUsers: number[];
  onSelectionChange: (selectedIds: number[]) => void;
  mode?: "single" | "multiple";
  maxSelections?: number;
}

const USERS_PER_PAGE = 10;

export function UserSelectionTable({
  selectedUsers,
  onSelectionChange,
  mode = "multiple",
  maxSelections,
}: UserSelectionTableProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // Debounced search
  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
    const timer = setTimeout(() => {
      setSearch(value);
      setPage(1); // Reset to first page on search
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Fetch users using useAppQuery
  // Handle both array response (all users) and paginated response {data, total}
  const { data, isLoading } = useAppQuery<
    User[] | { data: User[]; total: number },
    Error
  >({
    queryKey: ["users", page, search],
    endpoint: `/user?page=${page}&limit=${USERS_PER_PAGE}${search ? `&search=${encodeURIComponent(search)}` : ""}`,
    options: {
      staleTime: 1000 * 60 * 2,
      refetchOnWindowFocus: false,
    },
  });

  // Parse response - handle both array and paginated formats
  const users = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    return data.data || [];
  }, [data]);

  const total = useMemo(() => {
    if (!data) return 0;
    if (Array.isArray(data)) return data.length;
    return data.total || 0;
  }, [data]);

  const totalPages = Math.ceil(total / USERS_PER_PAGE);

  // Handle individual selection
  const handleSelectUser = useCallback(
    (userId: number) => {
      if (mode === "single") {
        onSelectionChange([userId]);
      } else {
        const isSelected = selectedUsers.includes(userId);
        let newSelection: number[];

        if (isSelected) {
          newSelection = selectedUsers.filter((id) => id !== userId);
        } else {
          if (maxSelections && selectedUsers.length >= maxSelections) {
            return; // Don't allow more selections
          }
          newSelection = [...selectedUsers, userId];
        }
        onSelectionChange(newSelection);
      }
    },
    [mode, selectedUsers, onSelectionChange, maxSelections],
  );

  // Handle select all on current page
  const handleSelectAll = useCallback(() => {
    if (mode === "single") return;

    const allPageUserIds = users.map((u: User) => u.id);
    const allSelected = allPageUserIds.every((id: number) =>
      selectedUsers.includes(id),
    );

    if (allSelected) {
      // Deselect all from current page
      const newSelection = selectedUsers.filter(
        (id) => !allPageUserIds.includes(id),
      );
      onSelectionChange(newSelection);
    } else {
      // Select all from current page (respecting maxSelections)
      const newSelection = [...selectedUsers];
      allPageUserIds.forEach((id: number) => {
        if (!newSelection.includes(id)) {
          if (!maxSelections || newSelection.length < maxSelections) {
            newSelection.push(id);
          }
        }
      });
      onSelectionChange(newSelection);
    }
  }, [users, selectedUsers, onSelectionChange, mode, maxSelections]);

  // Check if all users on current page are selected
  const allPageSelected = useMemo(() => {
    if (users.length === 0) return false;
    return users.every((u: User) => selectedUsers.includes(u.id));
  }, [users, selectedUsers]);

  // Handle pagination
  const goToNextPage = () => setPage((p) => Math.min(p + 1, totalPages));
  const goToPrevPage = () => setPage((p) => Math.max(p - 1, 1));

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchInput}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="surface-input w-full pl-10"
        />
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <FiLoader className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-hidden border border-surface-200 rounded-xl bg-white shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-surface-50 text-surface-700 font-semibold border-b border-surface-200">
                <tr>
                  {mode === "multiple" && (
                    <th className="px-6 py-4 w-12">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={allPageSelected}
                          onChange={handleSelectAll}
                          className="w-5 h-5 rounded border-surface-300 text-primary focus:ring-primary/20 cursor-pointer"
                        />
                      </div>
                    </th>
                  )}
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  {mode === "single" && (
                    <th className="px-6 py-4 text-center">Select</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={mode === "multiple" ? 5 : 6}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => {
                    const isSelected = selectedUsers.includes(user.id);
                    return (
                      <tr
                        key={user.id}
                        className={`border-b border-surface-100 hover:bg-surface-50/50 cursor-pointer transition-colors ${
                          isSelected ? "bg-primary/5" : ""
                        }`}
                        onClick={() => handleSelectUser(user.id)}
                      >
                        {mode === "multiple" && (
                          <td
                            className="px-6 py-4"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleSelectUser(user.id)}
                                className="w-5 h-5 rounded border-surface-300 text-primary focus:ring-primary/20 cursor-pointer"
                              />
                            </div>
                          </td>
                        )}
                        <td className="px-6 py-4 font-semibold text-surface-900">
                          {user.id}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {user.avatar ? (
                              <Image
                                src={user.avatar}
                                alt=""
                                className="w-8 h-8 rounded-full object-cover ring-2 ring-surface-100"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-surface-100 border border-surface-200 flex items-center justify-center text-[10px] font-bold text-surface-500 uppercase">
                                {user.name?.[0] || user.email[0]}
                              </div>
                            )}
                            <span className="text-surface-900 font-medium">
                              {user.name || "-"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-surface-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`surface-badge whitespace-nowrap ${
                              user.role === "admin"
                                ? "bg-accent-amber/10 text-accent-amber"
                                : ""
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        {mode === "single" && (
                          <td
                            className="px-6 py-4 text-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              type="button"
                              onClick={() => handleSelectUser(user.id)}
                              className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? "bg-primary border-primary text-white"
                                  : "border-surface-300 hover:border-primary hover:bg-primary/5"
                              }`}
                              aria-label={
                                isSelected ? "Deselect user" : "Select user"
                              }
                            >
                              {isSelected && <FiCheck className="w-4 h-4" />}
                            </button>
                          </td>
                        )}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-medium text-surface-500 uppercase tracking-wider">
                Showing {(page - 1) * USERS_PER_PAGE + 1}-
                {Math.min(page * USERS_PER_PAGE, total)} of {total}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={goToPrevPage}
                  disabled={page === 1}
                  className="p-2 rounded-lg border border-surface-200 hover:bg-surface-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <FiChevronLeft className="w-4 h-4 text-surface-600" />
                </button>
                <div className="px-3 py-1 bg-surface-50 border border-surface-200 rounded-lg text-xs font-bold text-surface-700">
                  {page} / {totalPages}
                </div>
                <button
                  type="button"
                  onClick={goToNextPage}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg border border-surface-200 hover:bg-surface-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <FiChevronRight className="w-4 h-4 text-surface-600" />
                </button>
              </div>
            </div>
          )}

          {/* Selection Info */}
          {mode === "multiple" && (
            <div className="text-xs font-semibold text-surface-500 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {selectedUsers.length} user(s) selected
              {maxSelections && ` (max: ${maxSelections})`}
            </div>
          )}
        </>
      )}
    </div>
  );
}
