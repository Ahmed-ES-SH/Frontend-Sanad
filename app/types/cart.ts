import { Category } from "./global";

export interface CartItemType {
  id: string;
  cartId: string;
  serviceId: string;
  serviceTitle: string;
  serviceSlug: string;
  serviceIconUrl: string | null;
  serviceImageUrl?: string | null;
  title?: string;
  details?: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  type?: "service" | "project";
  category?: Category;
  createdAt: string;
  updatedAt: string;
}

/**
 * Represents an undo toast for cart actions (remove/save for later).
 */
export interface UndoToast {
  item: CartItemType;
  action: "remove" | "save";
}

/**
 * Calculated totals for the cart order summary.
 */
export interface CartTotals {
  subtotal: number;
  technicalFee: number;
  vat: number;
  total: number;
}

/**
 * Props for the PaymentModal success/error callbacks.
 */
export interface PaymentCallbacks {
  onSuccess: () => void;
  onError: (error: string) => void;
}
