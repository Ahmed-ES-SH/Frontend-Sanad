import type { Order } from "@/app/types/order";

export interface OrderCardProps {
  order: Order;
  t: Record<string, unknown>;
  isRTL: boolean;
  index: number;
  formatOrderId: (id: string) => string;
  formatDate: (date: string) => string;
  formatAmount: (amount: number, currency: string) => string;
}

export interface OrderCardStatusStyles {
  pending: string;
  paid: string;
  in_progress: string;
  completed: string;
  cancelled: string;
}

export const ORDER_CARD_STATUS_STYLES: OrderCardStatusStyles = {
  pending: "bg-amber-100 text-amber-700",
  paid: "bg-blue-100 text-blue-700",
  in_progress: "bg-orange-100 text-orange-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-surface-200 text-surface-600 opacity-75",
};
