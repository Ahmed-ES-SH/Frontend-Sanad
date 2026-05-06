export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string | null;
  icon: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryWithCounts extends Category {
  projectsCount: number;
  servicesCount: number;
  articlesCount: number;
}

export interface CategoryFormData {
  name: string;
  slug?: string;
  description?: string;
  color?: string;
  icon?: string;
  order?: number;
}
