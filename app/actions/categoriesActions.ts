"use server";

import { revalidateTag } from "next/cache";
import { CATEGORIES_ENDPOINTS } from "@/app/constants/endpoints";
import { Category, CategoryFormData } from "@/app/types/category";
import { globalRequest } from "../helpers/globalRequest";
import { PaginationMeta } from "../types/global";

const CATEGORY_CACHE_TAG = "categories";

export interface CategoryQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}

function buildQuery(params: CategoryQueryParams = {}): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

export async function getAdminCategories(
  params: CategoryQueryParams = {},
): Promise<{
  data: Category[];
  meta: PaginationMeta;
}> {
  const res = await globalRequest<
    never,
    { data: Category[]; meta: PaginationMeta }
  >({
    endpoint: CATEGORIES_ENDPOINTS.ADMIN_LIST + buildQuery(params),
    method: "GET",
    defaultErrorMessage: "Failed to fetch categories",
    next: { tags: [CATEGORY_CACHE_TAG] },
  });

  if (!res.success || !res.data) {
    throw new Error(res.message);
  }

  // Handle case where backend directly returns array vs { data, meta }
  if (Array.isArray(res.data)) {
    return {
      data: res.data,
      meta: {
        page: 1,
        limit: res.data.length,
        total: res.data.length,
        lastPage: 1,
        perPage: res.data.length,
      },
    };
  }

  return res.data;
}

export async function createCategory(formData: CategoryFormData): Promise<{
  success: boolean;
  message: string;
  data?: Category;
}> {
  const res = await globalRequest<CategoryFormData, Category>({
    endpoint: CATEGORIES_ENDPOINTS.ADMIN_CREATE,
    method: "POST",
    body: formData,
    defaultErrorMessage: "Failed to create category",
  });

  if (res.success) {
    revalidateTag(CATEGORY_CACHE_TAG, {});
  }

  return {
    success: res.success,
    message: res.message,
    data: res.data,
  };
}

export async function deleteCategory(id: string): Promise<{
  success: boolean;
  message: string;
}> {
  const res = await globalRequest<never, unknown>({
    endpoint: CATEGORIES_ENDPOINTS.ADMIN_DELETE(id),
    method: "DELETE",
    defaultErrorMessage: "Failed to delete category",
  });

  if (res.success) {
    revalidateTag(CATEGORY_CACHE_TAG, {});
  }

  return {
    success: res.success,
    message: res.message,
  };
}

export async function updateCategory(
  id: string,
  formData: CategoryFormData,
): Promise<{
  success: boolean;
  message: string;
  data?: Category;
}> {
  const res = await globalRequest<CategoryFormData, Category>({
    endpoint: CATEGORIES_ENDPOINTS.ADMIN_UPDATE(id),
    method: "PATCH",
    body: formData,
    defaultErrorMessage: "Failed to update category",
  });

  if (res.success) {
    revalidateTag(CATEGORY_CACHE_TAG, {});
  }

  return {
    success: res.success,
    message: res.message,
    data: res.data,
  };
}
