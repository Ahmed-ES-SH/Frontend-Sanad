import { PaginationMeta } from "@/app/types/global";
import type { Order } from "@/app/types/order";

export interface UserOrdersPageProps {
  data: Order[];
  meta: PaginationMeta;
}

// Map API status → translation key (API uses underscores, translation keys use camelCase)
export const STATUS_API_TO_T_KEY: Record<string, string> = {
  pending: "pending",
  paid: "paid",
  in_progress: "inProgress",
  completed: "completed",
  cancelled: "cancelled",
};

// Filter key → API status mapping
export const FILTER_KEY_TO_STATUS: Record<string, string> = {
  all: "all",
  pending: "pending",
  paid: "paid",
  in_progress: "in_progress",
  completed: "completed",
  cancelled: "cancelled",
};
