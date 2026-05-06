// ============================================================================
// ORDER DETAILS CONSTANTS - Status and stepper configurations
// ============================================================================

import type { StatusBadgeConfig } from "../types/order";

export const ORDER_STATUS_BADGE_CONFIG: Record<string, StatusBadgeConfig> = {
  pending: {
    label: "Pending",
    bgColor: "bg-accent-amber/15",
    textColor: "text-accent-amber",
    dotColor: "bg-accent-amber",
  },
  in_progress: {
    label: "Processing",
    bgColor: "bg-primary-100",
    textColor: "text-primary-dark",
    dotColor: "bg-primary",
  },
  completed: {
    label: "Completed",
    bgColor: "bg-accent-emerald/15",
    textColor: "text-accent-emerald",
    dotColor: "bg-accent-emerald",
  },
  cancelled: {
    label: "Cancelled",
    bgColor: "bg-surface-100",
    textColor: "text-surface-500",
    dotColor: "bg-surface-400",
  },
  paid: {
    label: "Paid",
    bgColor: "bg-accent-emerald/15",
    textColor: "text-accent-emerald",
    dotColor: "bg-accent-emerald",
  },
};

export const STATUS_STEPPER_STEPS = [
  { id: "pending", label: "Pending", icon: "FiClock" },
  { id: "in_progress", label: "Processing", icon: "FiTruck" },
  { id: "completed", label: "Completed", icon: "FiCheckCircle" },
] as const;

// Map current page status to API status
export const mapStatusToApi = (status: string): string => {
  const mapping: Record<string, string> = {
    processing: "in_progress",
  };
  return mapping[status] || status;
};

// Map API status to page status for display
export const mapApiStatusToDisplay = (status: string): string => {
  const mapping: Record<string, string> = {
    in_progress: "processing",
  };
  return mapping[status] || status;
};

// ============================================================================
// ORDERS LIST STATUS CONFIG - Visual configuration for user-facing order list
// ============================================================================

export const ORDERS_LIST_STATUS_CONFIG: Record<string, { bg: string; text: string }> = {
  pending: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
  },
  paid: {
    bg: "bg-blue-100",
    text: "text-blue-700",
  },
  in_progress: {
    bg: "bg-orange-100",
    text: "text-orange-700",
  },
  completed: {
    bg: "bg-green-100",
    text: "text-green-700",
  },
  cancelled: {
    bg: "bg-red-100",
    text: "text-red-700",
  },
};

// ============================================================================
// ORDERS TABLE CONFIG - Pagination and display settings
// ============================================================================

export const PAGINATION_LIMITS = [10, 25, 50, 100] as const;
export type PaginationLimit = (typeof PAGINATION_LIMITS)[number];

export const DEFAULT_PAGINATION_LIMIT: PaginationLimit = 10;