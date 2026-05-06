import { CartItemType } from "@/app/types/cart";

/**
 * Calculated totals for the cart order summary.
 */
export interface CartTotals {
  subtotal: number;
  technicalFee: number;
  vat: number;
  total: number;
}

const VAT_RATE = 0.05;

/**
 * Calculates the cart totals including subtotal, VAT, and total.
 */
export const calculateCartTotals = (items: CartItemType[]): CartTotals => {
  const subtotal = items.reduce(
    (sum, item) => sum + (item.unitPrice ?? 0) * item.quantity,
    0,
  );
  const technicalFee = 0;
  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;

  return {
    subtotal,
    technicalFee,
    vat,
    total,
  };
};
