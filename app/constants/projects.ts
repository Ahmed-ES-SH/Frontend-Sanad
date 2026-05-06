// Projects Page Constants

import { PaginationMeta } from "@/app/types/global";

/**
 * Default pagination settings for projects table
 */
export const PROJECTS_DEFAULT_LIMIT = 20;

/**
 * Default pagination meta for initial load
 */
export const DEFAULT_PAGINATION_META: PaginationMeta = {
  page: 1,
  limit: PROJECTS_DEFAULT_LIMIT,
  lastPage: 1,
  perPage: PROJECTS_DEFAULT_LIMIT,
  total: 0,
};

/**
 * Table column headers
 */
export const PROJECTS_TABLE_HEADERS = {
  project: "Project",
  category: "Category",
  status: "Status",
  featured: "Featured",
  actions: "Actions",
} as const;

/**
 * Status badge configurations
 */
export const PROJECT_STATUS_CONFIG = {
  published: {
    label: "Published",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
    borderColor: "border-emerald-200",
    dotColor: "bg-emerald-500",
  },
  draft: {
    label: "Draft",
    bgColor: "bg-stone-50",
    textColor: "text-stone-600",
    borderColor: "border-stone-200",
    dotColor: "bg-stone-400",
  },
} as const;

/**
 * Featured button configurations
 */
export const PROJECT_FEATURED_CONFIG = {
  featured: {
    activeColor: "text-amber-500 bg-amber-50",
    inactiveColor: "text-stone-400 hover:text-amber-500 hover:bg-stone-50",
    title: "Featured",
  },
  notFeatured: {
    activeColor: "text-amber-500 bg-amber-50",
    inactiveColor: "text-stone-400 hover:text-amber-500 hover:bg-stone-50",
    title: "Not Featured",
  },
} as const;

/**
 * Action button configurations
 */
export const PROJECT_ACTION_CONFIG = {
  viewLive: {
    title: "View Live Site",
    hrefPrefix: "",
    colors: {
      default: "text-stone-400",
      hover: "text-[var(--primary)] bg-orange-50",
    },
  },
  edit: {
    title: "Edit Project",
    hrefPrefix: "/dashboard/projects/",
    editSuffix: "/edit",
    colors: {
      default: "text-stone-400",
      hover: "text-amber-600 bg-amber-50",
    },
  },
  delete: {
    title: "Delete Project",
    colors: {
      default: "text-stone-400",
      hover: "text-red-600 bg-red-50",
    },
  },
} as const;

/**
 * Debounce delay for search input (ms)
 */
export const SEARCH_DEBOUNCE_DELAY = 300;

/**
 * Pagination visible page buttons count
 */
export const PAGINATION_VISIBLE_PAGES = 5;

/**
 * Delete modal translations keys
 */
export const DELETE_MODAL_CONTENT = {
  title: "Confirm Deletion",
  description: (projectTitle: string) =>
    `Are you sure you want to delete the project "${projectTitle}"? This action cannot be undone and will permanently remove the project and its media from the system.`,
  cancelButton: "Cancel",
  deleteButton: "Delete Project",
  deletingButton: "Deleting...",
} as const;

/**
 * Empty state message
 */
export const EMPTY_STATE_MESSAGE = "No projects found matching your criteria.";

/**
 * Pagination info text
 */
export const PAGINATION_INFO = {
  showing: "Showing",
  of: "of",
  results: "results",
} as const;

/**
 * Previous/Next button text
 */
export const PAGINATION_BUTTONS = {
  previous: "Previous",
  next: "Next",
} as const;

/**
 * New project button text
 */
export const NEW_PROJECT_BUTTON = {
  label: "New Project",
  href: "/dashboard/addproject",
} as const;

/**
 * Skeleton loading rows count
 */
export const SKELETON_ROWS_COUNT = 5;

/**
 * Animation delay per row (seconds)
 */
export const ROW_ANIMATION_DELAY = 0.05;