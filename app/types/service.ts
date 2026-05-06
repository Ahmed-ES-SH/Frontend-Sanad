import { Category, PaginationMeta } from "./global";

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  coverImageUrl: string;
  iconUrl: string;
  basePrice: string;
  isPublished: boolean;
  order: number;
  categoryId: string;
  category: Partial<Category>;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceStats {
  label: { en: string; ar: string };
  value: string;
  icon: string;
}

export interface PublicServiceListResponse {
  data: Service[];
  meta?: PaginationMeta;
}

export interface ServiceListResponse {
  data: Service[];
  meta: PaginationMeta;
}

export interface ReorderItem {
  id: string;
  order: number;
}

export interface ServiceFormData {
  title: string;
  shortDescription: string;
  longDescription?: string;
  iconUrl?: string;
  coverImageUrl?: string;
  categoryId?: string;
}

export interface PublishToggleResponse {
  id: string;
  isPublished: boolean;
  message: string;
}

export interface DeleteResponse {
  message: string;
}

export interface ServiceQueryParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  sortBy?: "createdAt" | "updatedAt" | "title" | "order";
  order?: "ASC" | "DESC";
}

export interface ProcessStep {
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  icon: string;
}

export interface FAQ {
  question: { en: string; ar: string };
  answer: { en: string; ar: string };
}

export interface ServicePackage {
  name: { en: string; ar: string };
  price: { en: string; ar: string };
  features: { en: string[]; ar: string[] };
  isPopular: boolean;
}

export interface StaticServiceData {
  id: number;
  category?: "development" | "marketing" | "design" | "data-security";
  title: {
    en: string;
    ar: string;
  };
  smallDesc: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  benefits: {
    en: string[];
    ar: string[];
  };
  features: {
    en: string[];
    ar: string[];
  };
  targetAudience: {
    en: string;
    ar: string;
  };
  slug: string;
  imgsrc: string;
  fullImage: string;
  processSteps?: ProcessStep[];
  faq?: FAQ[];
  stats?: ServiceStats[];
  packages?: ServicePackage[];
}
