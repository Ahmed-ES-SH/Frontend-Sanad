// ============================================================================
// PAYMENT HISTORY HOOK - Fetch and manage user payment history with filters
// ============================================================================

"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  PaymentResponseDto,
  PaginatedPaymentsResponse,
  PaymentFilterDto,
  PaymentStatus,
} from "@/app/types/payments";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface UsePaymentHistoryOptions {
  page?: number;
  limit?: number;
  status?: PaymentStatus | "all";
  startDate?: string;
  endDate?: string;
  userId?: string;
  enabled?: boolean;
}

export interface PaymentHistoryState {
  payments: PaymentResponseDto[];
  isLoading: boolean;
  error: Error | null;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
}

async function fetchPayments(
  filters: PaymentFilterDto,
): Promise<PaginatedPaymentsResponse> {
  const params = new URLSearchParams();

  if (filters.page && filters.page > 1)
    params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));
  if (filters.sortBy) params.set("sortBy", filters.sortBy);
  if (filters.order) params.set("order", filters.order);
  if (filters.status) params.set("status", filters.status);
  if (filters.userId) params.set("userId", filters.userId);
  if (filters.startDate) params.set("startDate", filters.startDate);
  if (filters.endDate) params.set("endDate", filters.endDate);

  const queryString = params.toString();
  const url = `${API_BASE_URL}/api/payments${queryString ? `?${queryString}` : ""}`;

  const response = await axios.get<PaginatedPaymentsResponse>(url, {
    withCredentials: true,
  });

  return response.data;
}

export function usePaymentHistory(options: UsePaymentHistoryOptions = {}) {
  const {
    page = 1,
    limit = 10,
    status = "all",
    startDate,
    endDate,
    userId,
    enabled = true,
  } = options;

  const filters: PaymentFilterDto = {
    page,
    limit,
    status: status === "all" ? undefined : status,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    userId: userId || undefined,
    sortBy: "createdAt",
    order: "DESC",
  };

  const queryResult = useQuery<PaginatedPaymentsResponse, Error>({
    queryKey: ["payments", filters],
    queryFn: () => fetchPayments(filters),
    enabled,
    staleTime: 1000 * 60 * 2, // 2 minutes
    retry: 1,
    placeholderData: (previousData) => previousData,
  });

  const payments = queryResult.data?.data ?? [];
  const isLoading = queryResult.isLoading;
  const isFetching = queryResult.isFetching;
  const error = queryResult.error;

  const meta = queryResult.data?.meta ?? null;
  const currentPage = meta?.page ?? 1;
  const totalPages = meta?.totalPages ?? 1;
  const total = meta?.total ?? 0;

  // Pagination helpers
  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      // This function is meant to be used with a router or state management
      // The actual page change should be handled by the component using this hook
      return newPage;
    }
    return currentPage;
  };

  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  // Filter helpers
  const hasActiveFilters = status !== "all" || !!startDate || !!endDate;

  const getActiveFilterCount = () => {
    let count = 0;
    if (status !== "all") count++;
    if (startDate) count++;
    if (endDate) count++;
    return count;
  };

  return {
    // Data
    payments,
    meta,

    // State
    isLoading,
    isFetching,
    error,

    // Pagination
    currentPage,
    totalPages,
    total,
    hasNextPage,
    hasPrevPage,
    goToPage,

    // Filters
    hasActiveFilters,
    getActiveFilterCount,

    // Refetch
    refetch: queryResult.refetch,
  };
}
