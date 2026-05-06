"use server";

import { revalidateTag } from "next/cache";
import { BLOG_ENDPOINTS } from "@/app/constants/endpoints";

import {
  Article,
  ArticleFormData,
  BlogListResponse,
  PublishToggleResponse,
  DeleteResponse,
} from "@/app/types/blog";
import { globalRequest } from "../helpers/globalRequest";
import { Category } from "../types/global";

/* =========================================================
   TYPES
========================================================= */

export interface BlogQueryParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  tag?: string;
  search?: string;
  sortBy?: string;
  order?: "ASC" | "DESC";
}

/* =========================================================
   HELPERS
========================================================= */

function buildQuery(params: BlogQueryParams = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  const query = searchParams.toString();

  return query ? `?${query}` : "";
}

/* =========================================================
   PUBLIC: GET ARTICLES
========================================================= */

export async function getArticles(params: BlogQueryParams = {}): Promise<{
  data: Article[];
  meta: BlogListResponse["meta"];
}> {
  const res = await globalRequest<never, BlogListResponse>({
    endpoint: BLOG_ENDPOINTS.LIST_PUBLISHED + buildQuery(params),
    method: "GET",
    defaultErrorMessage: "Failed to fetch articles",
  });

  if (!res.success || !res.data) {
    throw new Error(res.message);
  }

  return res.data;
}

/* =========================================================
   PUBLIC: GET CATEGORIES
========================================================= */

export async function getCategories(): Promise<Category[]> {
  const res = await globalRequest<never, Category[]>({
    endpoint: BLOG_ENDPOINTS.CATEGORIES,
    method: "GET",
    defaultErrorMessage: "Failed to fetch categories",
    // ISR: revalidate every 10 minutes (categories change rarely)
    next: { revalidate: 600 },
  });

  if (!res.success || !res.data) {
    throw new Error(res.message);
  }

  return res.data;
}

/* =========================================================
   PUBLIC: GET ARTICLE BY SLUG
========================================================= */

export async function getArticleBySlug(slug: string): Promise<Article> {
  const res = await globalRequest<never, Article>({
    endpoint: BLOG_ENDPOINTS.GET_BY_SLUG(slug),

    method: "GET",

    defaultErrorMessage: "Failed to fetch article",
  });

  if (!res.success || !res.data) {
    throw new Error(res.message);
  }

  return res.data;
}

/* =========================================================
   ADMIN: GET ALL ARTICLES
========================================================= */

export async function getAdminArticles(params: BlogQueryParams = {}): Promise<{
  data: Article[];
  meta: BlogListResponse["meta"];
}> {
  const res = await globalRequest<never, BlogListResponse>({
    endpoint: BLOG_ENDPOINTS.ADMIN_LIST + buildQuery(params),

    method: "GET",

    defaultErrorMessage: "Failed to fetch admin articles",
  });

  if (!res.success || !res.data) {
    throw new Error(res.message);
  }

  return res.data;
}

/* =========================================================
   ADMIN: GET BY ID
========================================================= */

export async function getAdminArticleById(id: string): Promise<Article | null> {
  const res = await globalRequest<never, Article>({
    endpoint: BLOG_ENDPOINTS.ADMIN_GET(id),

    method: "GET",

    defaultErrorMessage: "Failed to fetch article",
  });

  if (!res.success) {
    if (res.statusCode === 404) {
      return null;
    }

    throw new Error(res.message);
  }

  return res.data!;
}

/* =========================================================
   ADMIN: CREATE
========================================================= */

export async function createArticle(formData: ArticleFormData): Promise<{
  success: boolean;
  message: string;
  data?: Article;
}> {
  const res = await globalRequest<ArticleFormData, Article>({
    endpoint: BLOG_ENDPOINTS.ADMIN_CREATE,

    method: "POST",

    body: formData,

    defaultErrorMessage: "Failed to create article",
  });

  if (!res.success) {
    return res;
  }

  revalidateTag("blog", {});

  return {
    success: true,
    message: "Article created successfully",
    data: res.data,
  };
}

/* =========================================================
   ADMIN: UPDATE
========================================================= */

export async function updateArticle(
  id: string,
  formData: Partial<ArticleFormData>,
): Promise<{
  success: boolean;
  message: string;
  data?: Article;
}> {
  const res = await globalRequest<Partial<ArticleFormData>, Article>({
    endpoint: BLOG_ENDPOINTS.ADMIN_UPDATE(id),

    method: "PATCH",

    body: formData,

    defaultErrorMessage: "Failed to update article",
  });

  if (!res.success) {
    return res;
  }

  revalidateTag("blog", {});

  return {
    success: true,
    message: "Article updated successfully",
    data: res.data,
  };
}

/* =========================================================
   ADMIN: TOGGLE PUBLISH
========================================================= */

export async function togglePublishStatus(id: string): Promise<{
  success: boolean;
  message: string;
  data?: PublishToggleResponse;
}> {
  const res = await globalRequest<never, PublishToggleResponse>({
    endpoint: BLOG_ENDPOINTS.ADMIN_PUBLISH(id),

    method: "PATCH",

    defaultErrorMessage: "Failed to toggle publish status",
  });

  if (!res.success) {
    return res;
  }

  revalidateTag("blog", {});

  return {
    success: true,
    message: res.data?.message || "Status updated",
    data: res.data,
  };
}

/* =========================================================
   ADMIN: DELETE
========================================================= */

export async function deleteArticle(id: string): Promise<{
  success: boolean;
  message: string;
}> {
  const res = await globalRequest<never, DeleteResponse>({
    endpoint: BLOG_ENDPOINTS.ADMIN_DELETE(id),

    method: "DELETE",

    defaultErrorMessage: "Failed to delete article",
  });

  if (!res.success) {
    return res;
  }

  revalidateTag("blog", {});

  return {
    success: true,
    message: "Article deleted successfully",
  };
}
