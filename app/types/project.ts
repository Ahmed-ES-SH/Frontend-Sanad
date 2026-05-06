// Project / Portfolio Type Definitions

import { Category, PaginationMeta } from "./global";

export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string | null;
  coverImageUrl: string | null;
  images: string[];
  techStack: string[];
  categoryId: string | null;
  category: Category | null;
  liveUrl: string | null;
  repoUrl: string | null;
  isPublished: boolean;
  isFeatured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectListResponse {
  data: Project[];
  meta: PaginationMeta;
}

// Form types for creating/updating projects
export interface ProjectFormData {
  title: string;
  shortDescription: string;
  longDescription?: string;
  coverImageUrl?: string;
  images?: string[];
  techStack?: string[];
  categoryId?: string;
  liveUrl?: string;
  repoUrl?: string;
  isPublished?: boolean;
}

export interface PublishToggleResponse {
  id: string;
  isPublished: boolean;
  message: string;
}

export interface FeatureToggleResponse {
  id: string;
  isFeatured: boolean;
  message: string;
}

export interface ReorderItem {
  id: string;
  order: number;
}

export interface ReorderRequestBody {
  items: ReorderItem[];
}

export interface DeleteResponse {
  message: string;
}

// Query params for public portfolio listing
export interface PortfolioQueryParams {
  categoryId?: string;
  techStack?: string; // comma-separated tech names
  featured?: boolean;
}

// Query params for admin portfolio listing
export interface AdminPortfolioQueryParams {
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "updatedAt" | "title";
  order?: "ASC" | "DESC";
}
