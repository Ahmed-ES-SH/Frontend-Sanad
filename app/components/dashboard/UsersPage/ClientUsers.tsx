"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  UserFilterState,
  UsersPaginatedResponse,
} from "@/app/types/user";
import { adminDeleteUser } from "@/app/actions/userActions";
import { toast } from "sonner";
import { useAppQuery } from "@/app/hooks/useAppQuery";
import { useParams } from "next/navigation";
import { Locale } from "@/app/types/global";

import FilterBar from "./FilterBar";
import UserTableSkeleton from "./UserTableSkeleton";
import DeleteConfirmModal from "./EditUser/DeleteConfirmModal";
import UserTableWithPagination from "./UserTableWithPagination";

// ============================================================================
// CLIENT USERS - Main client orchestrator component
// Manages server-side filtering, pagination via API calls
// ============================================================================

interface ClientUsersProps {
  initialData: User[];
  total: number;
  page: number;
  perPage: number;
  lastPage: number;
}

export default function ClientUsers({
  initialData,
  total: initialTotal,
  page: initialPage,
  perPage,
  lastPage: initialLastPage,
}: ClientUsersProps) {
  const router = useRouter();

  // Filter state - controlled inputs for search, role, and verification status
  const [filters, setFilters] = useState<UserFilterState>({
    role: "all",
    status: "all",
    search: "",
  });

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const { locale } = useParams();

  // Build query string with filters and pagination
  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", currentPage.toString());
    params.set("limit", perPage.toString());

    if (filters.role && filters.role !== "all") {
      params.set("role", filters.role);
    }

    if (filters.status && filters.status !== "all") {
      params.set("status", filters.status);
    }

    if (filters.search && filters.search.trim()) {
      params.set("search", filters.search.trim());
    }

    return params.toString();
  }, [currentPage, perPage, filters]);

  // Fetch users with filters from server
  const {
    data: usersResponse,
    isLoading,
    refetch,
  } = useAppQuery<UsersPaginatedResponse, Error>({
    queryKey: [
      "users",
      filters.role,
      filters.status,
      filters.search,
      currentPage,
    ],
    endpoint: `/api/user?${queryParams}`,
    config: {
      method: "GET",
    },
    enabled: true,
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      retry: 1,
    },
  });

  // Get users and pagination data from server response
  const userData: UsersPaginatedResponse = usersResponse || {
    data: initialData,
    total: initialTotal,
    page: currentPage,
    perPage,
    lastPage: initialLastPage,
  };

  const users: User[] = userData.data || [];
  const total = userData.total || 0;
  const serverLastPage = userData.lastPage || 1;

  // Update filters and reset to page 1
  const updateFilters = useCallback((newFilters: UserFilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  // Handle user deletion trigger
  const handleDeleteTrigger = (user: User) => {
    setUserToDelete(user);
  };

  // Confirm and perform user deletion
  const confirmDelete = async () => {
    if (!userToDelete) return;

    setDeletingId(userToDelete.id);

    try {
      const result = await adminDeleteUser(userToDelete.id);

      if (result.success) {
        toast.success(result.message);
        router.refresh();
        refetch();
        setUserToDelete(null); // Close modal on success
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("Failed to delete user");
      console.error("[ClientUsers] Delete error:", err);
    } finally {
      setDeletingId(null);
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <FilterBar onFilterChange={updateFilters} />

      {/* Loading State - Show Skeleton */}
      {isLoading ? (
        <UserTableSkeleton rows={perPage} />
      ) : (
        /* User Table with Pagination */
        <UserTableWithPagination
          users={users}
          currentPage={currentPage}
          totalPages={serverLastPage}
          total={total}
          perPage={perPage}
          onPageChange={handlePageChange}
          onDelete={handleDeleteTrigger}
          deletingId={deletingId}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!userToDelete}
        userName={userToDelete?.name || ""}
        userEmail={userToDelete?.email || ""}
        locale={locale as Locale}
        isDeleting={deletingId !== null}
        onClose={() => setUserToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
