/**
 * Service cards constants for the dashboard services page
 * Contains category color mappings and default configurations
 */

import { Service } from "../types/service";

/** Category color mapping for badge styling */
export const CATEGORY_COLORS: Record<string, string> = {
  cloudarchitecture: "text-orange-600 bg-orange-50",
  cloud: "text-orange-600 bg-orange-50",
  cybersecurity: "text-blue-600 bg-blue-50",
  security: "text-blue-600 bg-blue-50",
  managedsupport: "text-amber-600 bg-amber-50",
  support: "text-amber-600 bg-amber-50",
  datasystems: "text-purple-600 bg-purple-50",
  data: "text-purple-600 bg-purple-50",
  development: "text-teal-600 bg-teal-50",
  marketing: "text-pink-600 bg-pink-50",
  design: "text-violet-600 bg-violet-50",
};

/** Default category when none is provided */
export const DEFAULT_CATEGORY = "General";

/** Default skeleton count for loading state */
export const DEFAULT_SKELETON_COUNT = 4;

/** Default page size for pagination */
export const DEFAULT_PAGE_SIZE = 10;

/** Stale time for React Query (2 minutes) */
export const SERVICE_QUERY_STALE_TIME = 1000 * 60 * 2;

/** Default query key prefix */
export const SERVICE_QUERY_KEY_PREFIX = "admin-services";

/**
 * Get category color by category key
 * @param categoryKey - The category key to look up
 * @returns The Tailwind color classes for the category
 */
export function getCategoryColor(categoryKey: string): string {
  const normalizedKey = categoryKey.toLowerCase().replace(/\s+/g, "");
  return CATEGORY_COLORS[normalizedKey] || "text-stone-600 bg-white/90";
}

/**
 * Transform Service type to ServiceCardData
 * @param service - Service from API
 * @returns ServiceCardData for component
 */
export function transformServiceToCardData(service: Service) {
  return {
    id: service.id,
    title: service.title,
    shortDescription: service.shortDescription,
    isPublished: service.isPublished,
    categoryName: service.category?.name || DEFAULT_CATEGORY,
    imageUrl: service.coverImageUrl,
    slug: service.slug,
  };
}

/**
 * Build query key for React Query
 * @param searchQuery - Search filter
 * @param categoryId - Category filter
 * @param page - Page number
 * @param sortBy - Sort field
 * @param sortOrder - Sort direction
 * @returns Query key array
 */
export function buildServiceQueryKey(
  searchQuery: string,
  categoryId: string,
  page: number,
  sortBy: string,
  sortOrder: string,
): (string | number | undefined)[] {
  return [
    SERVICE_QUERY_KEY_PREFIX,
    searchQuery,
    categoryId,
    page,
    sortBy,
    sortOrder,
  ];
}

/**
 * Build query string for API endpoint
 * @param params - Query parameters
 * @returns Query string
 */
export function buildServiceQueryString(params: {
  page: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  sortBy?: string;
  sortOrder?: string;
}): string {
  const queryParams = new URLSearchParams({
    page: params.page.toString(),
    limit: (params.limit || DEFAULT_PAGE_SIZE).toString(),
  });

  if (params.search) queryParams.set("search", params.search);
  if (params.categoryId) queryParams.set("categoryId", params.categoryId);
  if (params.sortBy) queryParams.set("sortBy", params.sortBy);
  if (params.sortOrder) queryParams.set("order", params.sortOrder);

  return queryParams.toString();
}
