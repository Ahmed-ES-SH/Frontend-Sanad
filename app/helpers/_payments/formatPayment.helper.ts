/**
 * Formats a payment amount with the specified currency.
 */
export const formatPaymentAmount = (amount: number, currency: string = "SAR"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);
};