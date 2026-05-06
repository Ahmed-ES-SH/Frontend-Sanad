"use client";

import { useState, useEffect, useCallback } from "react";
import { Service } from "@/app/types/service";
import { PaginationMeta } from "@/app/types/global";
import { useAppQuery } from "@/app/hooks/useAppQuery";
import { togglePublishService, deleteService } from "@/app/actions/servicesActions";
import {
  SERVICE_QUERY_STALE_TIME,
  buildServiceQueryKey,
  buildServiceQueryString,
  transformServiceToCardData,
} from "@/app/constants/serviceCards";

export interface ServiceCardData {
  id: string;
  title: string;
  shortDescription: string;
  isPublished: boolean;
  categoryName: string;
  imageUrl: string | null;
  slug: string;
}

export interface UseServiceCardsProps {
  initialServices?: Service[];
  initialMeta?: PaginationMeta;
  searchQuery?: string;
  categoryId?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: number;
}

export interface UseServiceCardsReturn {
  services: ServiceCardData[];
  meta: PaginationMeta | undefined;
  isLoading: boolean;
  isFetching: boolean;
  deleteId: string | null;
  handleDeleteClick: (id: string) => void;
  handleConfirmDelete: () => Promise<void>;
  handleCancelDelete: () => void;
  handleTogglePublish: (id: string) => Promise<void>;
  refetch: () => void;
}

/**
 * Service Cards Hook
 * Manages state and data fetching for services list
 */
export function useServiceCards({
  initialServices = [],
  initialMeta,
  searchQuery = "",
  categoryId = "",
  sortBy = "createdAt",
  sortOrder = "DESC",
  page = 1,
}: UseServiceCardsProps): UseServiceCardsReturn {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Build query key
  const queryKey = buildServiceQueryKey(
    searchQuery,
    categoryId,
    page,
    sortBy,
    sortOrder,
  );

  // Build query string
  const queryString = buildServiceQueryString({
    page,
    search: searchQuery,
    categoryId,
    sortBy,
    sortOrder,
  });

  // Use React Query for data fetching
  const {
    data,
    isLoading,
    isFetching,
    refetch,
  } = useAppQuery<{ data: Service[]; meta: PaginationMeta }, Error>({
    queryKey,
    endpoint: `/api/admin/services?${queryString}`,
    config: {
      method: "GET",
    },
    enabled: true,
    options: {
      staleTime: SERVICE_QUERY_STALE_TIME,
      refetchOnWindowFocus: false,
    },
  });

  // Local state for services
  const [services, setServices] = useState<ServiceCardData[]>(() =>
    initialServices.map(transformServiceToCardData)
  );

  const [meta, setMeta] = useState<PaginationMeta | undefined>(initialMeta);

  // Update local state when query data changes
  useEffect(() => {
    if (data) {
      setServices(data.data.map(transformServiceToCardData));
      setMeta(data.meta);
    }
  }, [data, searchQuery, categoryId, page, sortBy, sortOrder]);

  // Handle delete click
  const handleDeleteClick = useCallback((id: string) => {
    setDeleteId(id);
  }, []);

  // Handle confirm delete
  const handleConfirmDelete = useCallback(async () => {
    if (!deleteId) return;

    try {
      const result = await deleteService(deleteId);
      if (result.success) {
        setServices((prev) => prev.filter((s) => s.id !== deleteId));
      }
    } catch (error) {
      console.error("Failed to delete service:", error);
      throw error;
    } finally {
      setDeleteId(null);
    }
  }, [deleteId]);

  // Handle cancel delete
  const handleCancelDelete = useCallback(() => {
    setDeleteId(null);
  }, []);

  // Handle toggle publish
  const handleTogglePublish = useCallback(async (id: string) => {
    try {
      await togglePublishService(id);
      // Update local state without reload
      setServices((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, isPublished: !s.isPublished } : s
        )
      );
      // Refetch data to ensure consistency
      refetch();
    } catch (error) {
      console.error("Failed to toggle publish status:", error);
      throw error;
    }
  }, [refetch]);

  return {
    services,
    meta,
    isLoading,
    isFetching,
    deleteId,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    handleTogglePublish,
    refetch,
  };
}

export default useServiceCards;