/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { FiSearch, FiLoader } from "react-icons/fi";
import { UsersPaginatedResponse } from "@/app/types/user";
import { useAppQuery } from "@/app/hooks/useAppQuery";
import { useDebounce } from "@/app/hooks/useDebounce";
import { USER_ENDPOINTS } from "@/app/constants/endpoints";
import { NOTIFICATION_FORM } from "@/app/constants/notifications";
import { UserTableRow } from "./UserTableRow";
import { TablePagination } from "./TablePagination";
import type { SelectedUserInfo } from "@/app/types/notification";

interface UserSelectionTableProps {
  selectedUsers: number[];
  onSelectionChange: (selectedIds: number[]) => void;
  onUsersFetched?: (users: SelectedUserInfo[]) => void;
  onSelectAndContinue?: () => void;
  mode?: "single" | "multiple";
  maxSelections?: number;
}

export function UserSelectionTable({
  selectedUsers,
  onSelectionChange,
  onUsersFetched,
  onSelectAndContinue,
  mode = "multiple",
  maxSelections,
}: UserSelectionTableProps) {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(searchInput, 300);

  // Sync debounced search to actual search param
  useEffect(() => {
    setSearch(debouncedSearch);
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading } = useAppQuery<UsersPaginatedResponse, Error>({
    queryKey: ["users", "admin-list", { page, search }],
    endpoint: `${USER_ENDPOINTS.ADMIN_LIST}?page=${page}&limit=${NOTIFICATION_FORM.USERS_PER_PAGE}${search ? `&search=${encodeURIComponent(search)}` : ""}`,
    options: {
      staleTime: 1000 * 60 * 2,
      refetchOnWindowFocus: false,
    },
  });

  const users = useMemo(() => data?.data ?? [], [data?.data]);
  const total = data?.meta?.total ?? 0;
  const totalPages = data?.meta?.lastPage ?? 1;

  // Fetch all user IDs for "select all" functionality
  const { data: allIdsData, isLoading: isLoadingIds } = useAppQuery<
    number[],
    Error
  >({
    queryKey: ["users", "all-ids"],
    endpoint: USER_ENDPOINTS.GET_ALL_IDS,
    options: {
      staleTime: 1000 * 60 * 5, // Cache for 5 minutes
      refetchOnWindowFocus: false,
    },
  });

  const allUserIds = useMemo(() => allIdsData ?? [], [allIdsData]);

  // Notify parent of selected users info
  useEffect(() => {
    if (onUsersFetched && users.length > 0) {
      const selectedInfo = users
        .filter((u) => selectedUsers.includes(u.id))
        .map((u) => ({
          id: u.id,
          name: u.name || "",
          email: u.email,
          avatar: u.avatar ?? undefined,
        }));
      onUsersFetched(selectedInfo);
    }
  }, [selectedUsers, users, onUsersFetched]);

  const handleSelectUser = useCallback(
    (userId: number) => {
      if (mode === "single") {
        onSelectionChange([userId]);
        onSelectAndContinue?.();
      } else {
        const isSelected = selectedUsers.includes(userId);
        let newSelection: number[];

        if (isSelected) {
          newSelection = selectedUsers.filter((id) => id !== userId);
        } else {
          if (maxSelections && selectedUsers.length >= maxSelections) {
            return;
          }
          newSelection = [...selectedUsers, userId];
        }
        onSelectionChange(newSelection);
      }
    },
    [
      mode,
      selectedUsers,
      onSelectionChange,
      maxSelections,
      onSelectAndContinue,
    ],
  );

  const handleSelectAll = useCallback(() => {
    if (mode === "single") return;
    if (isLoadingIds || allUserIds.length === 0) return;

    // Use all user IDs (from all pages) instead of just current page
    const idsToSelect = allUserIds;
    const allSelected = idsToSelect.every((id) => selectedUsers.includes(id));

    if (allSelected) {
      // Deselect all - remove all user IDs from selection
      onSelectionChange(
        selectedUsers.filter((id) => !idsToSelect.includes(id)),
      );
    } else {
      // Select all - add all user IDs
      const newSelection = [...selectedUsers];
      idsToSelect.forEach((id) => {
        if (!newSelection.includes(id)) {
          if (!maxSelections || newSelection.length < maxSelections) {
            newSelection.push(id);
          }
        }
      });
      onSelectionChange(newSelection);
    }
  }, [
    allUserIds,
    selectedUsers,
    onSelectionChange,
    mode,
    maxSelections,
    isLoadingIds,
  ]);

  const allPageSelected = useMemo(() => {
    if (allUserIds.length === 0) return false;
    // Check if ALL users are selected (not just current page)
    return allUserIds.every((id) => selectedUsers.includes(id));
  }, [allUserIds, selectedUsers]);

  const columnCount = mode === "multiple" ? 5 : 6;

  console.log(allIdsData);

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
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
                      <div className="flex flex-col gap-1">
                        <input
                          type="checkbox"
                          checked={allPageSelected}
                          onChange={handleSelectAll}
                          disabled={isLoadingIds || allUserIds.length === 0}
                          className="w-5 h-5 rounded border-surface-300 text-primary focus:ring-primary/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        {isLoadingIds ? (
                          <FiLoader className="w-3 h-3 animate-spin text-surface-400" />
                        ) : allUserIds.length > 0 ? (
                          <span className="text-[10px] text-surface-400 whitespace-nowrap">
                            Select all ({allUserIds.length})
                          </span>
                        ) : null}
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
                      colSpan={columnCount}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <UserTableRow
                      key={user.id}
                      user={user}
                      isSelected={selectedUsers.includes(user.id)}
                      mode={mode}
                      onSelect={handleSelectUser}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <TablePagination
            page={page}
            totalPages={totalPages}
            total={total}
            perPage={NOTIFICATION_FORM.USERS_PER_PAGE}
            onPageChange={setPage}
          />

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
