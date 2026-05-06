// Blog Type Definitions

import { Category, PaginationMeta } from "./global";

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  isPublished: boolean;
  publishedAt: string;
  readTimeMinutes: number;
  viewsCount: number;
  tags: string[];
  categoryId: string;
  category: Category; // العلاقة المتداخلة
  createdAt: string;
  updatedAt: string;
}

export interface BlogListResponse {
  data: Article[];
  meta: PaginationMeta;
}

// Form types for creating/updating articles
export interface ArticleFormData {
  title: string;
  content: string;
  excerpt?: string;
  coverImageUrl?: string;
  tags?: string[];
  categoryId?: string;
}

export interface PublishToggleResponse {
  id: string;
  isPublished: boolean;
  publishedAt: string | null;
  message: string;
}

export interface DeleteResponse {
  message: string;
}
