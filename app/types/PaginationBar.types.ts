export interface PaginationBarProps {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  hasPrevPage: boolean;
  hasNextPage: boolean;
  isRTL: boolean;
  navigateToPage: (page: number) => void;
  local: string;
}

export interface PaginationLabels {
  prev: string;
  next: string;
  page: string;
  of: string;
}

export const getPaginationLabels = (local: string): PaginationLabels => ({
  prev: local === "ar" ? "السابق" : "Prev",
  next: local === "ar" ? "التالي" : "Next",
  page: local === "ar" ? "صفحة" : "Page",
  of: local === "ar" ? "من" : "of",
});