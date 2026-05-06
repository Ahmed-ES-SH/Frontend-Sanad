import { useCallback, useMemo, useState } from "react";
import {
  AdminOrderListResponse,
  OrderFilters,
  UseAdminOrdersWithStateResult,
} from "../types/order";
import { useAppQuery } from "./useAppQuery";
import { ORDERS_ENDPOINTS } from "../constants/endpoints";

/**
 * Admin Orders hook with built-in state management
 * Uses useAppQuery for data fetching with dynamic query keys
 */
export function useAdminOrdersWithState(
  initialFilters: Partial<OrderFilters> = {},
): UseAdminOrdersWithStateResult {
  const defaultFilters: OrderFilters = useMemo(
    () => ({
      page: initialFilters.page || 1,
      limit: initialFilters.limit || 10,
      status: initialFilters.status,
      userId: initialFilters.userId,
      serviceId: initialFilters.serviceId,
    }),
    [
      initialFilters.page,
      initialFilters.limit,
      initialFilters.status,
      initialFilters.userId,
      initialFilters.serviceId,
    ],
  );

  const [filters, setFiltersState] = useState<OrderFilters>(defaultFilters);

  // Build query key dynamically based on filters
  const queryKey = useMemo(
    () => [
      "admin-orders",
      {
        page: filters.page,
        limit: filters.limit,
        status: filters.status,
        userId: filters.userId,
        serviceId: filters.serviceId,
      },
    ],
    [
      filters.page,
      filters.limit,
      filters.status,
      filters.userId,
      filters.serviceId,
    ],
  );

  // Build endpoint with current filters
  const endpoint = useMemo(
    () =>
      ORDERS_ENDPOINTS.ADMIN_LIST(
        filters.page,
        filters.limit,
        filters.status,
        filters.userId,
        filters.serviceId,
      ),
    [
      filters.page,
      filters.limit,
      filters.status,
      filters.userId,
      filters.serviceId,
    ],
  );

  // Use useAppQuery
  const queryResult = useAppQuery<AdminOrderListResponse, Error>({
    queryKey,
    endpoint,
    options: {
      staleTime: 1000 * 60 * 2, // 2 minutes
      refetchOnWindowFocus: false,
      enabled: true, // Always enabled since we have default values
    },
  });

  // Update filters helper
  const setFilters = useCallback((newFilters: Partial<OrderFilters>) => {
    setFiltersState((prev) => {
      const updated = { ...prev, ...newFilters };

      // Reset to page 1 if page-related filters change
      if (
        newFilters.status !== undefined ||
        newFilters.userId !== undefined ||
        newFilters.serviceId !== undefined
      ) {
        updated.page = 1;
      }

      return updated;
    });
  }, []);

  // Individual setters
  const setPage = useCallback((page: number) => {
    setFiltersState((prev) => ({ ...prev, page }));
  }, []);

  const setLimit = useCallback((limit: number) => {
    setFiltersState((prev) => ({ ...prev, limit, page: 1 }));
  }, []);

  const setStatus = useCallback((status: string) => {
    setFiltersState((prev) => ({ ...prev, status, page: 1 }));
  }, []);

  const setUserId = useCallback((userId: number | undefined) => {
    setFiltersState((prev) => ({ ...prev, userId, page: 1 }));
  }, []);

  const setServiceId = useCallback((serviceId: string | undefined) => {
    setFiltersState((prev) => ({ ...prev, serviceId, page: 1 }));
  }, []);

  const resetFilters = useCallback(() => {
    setFiltersState(defaultFilters);
  }, [defaultFilters]);

  return {
    orders: queryResult.data?.data ?? [],
    meta: queryResult.data?.meta ?? null,
    isLoading: queryResult.isLoading,
    isFetching: queryResult.isFetching,
    error: queryResult.error,
    refetch: queryResult.refetch,
    filters,
    setFilters,
    setPage,
    setLimit,
    setStatus,
    setUserId,
    setServiceId,
    resetFilters,
  };
}
