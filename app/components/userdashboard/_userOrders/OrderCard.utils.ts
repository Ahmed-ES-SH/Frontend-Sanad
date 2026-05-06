/**
 * Format order ID for display — short UUID (first 8 chars)
 */
export const formatOrderId = (id: string): string =>
  `#${id.replace(/-/g, "").slice(0, 8).toUpperCase()}`;

/**
 * Format date for display
 */
export const formatDate = (dateString: string, local: string): string => {
  return new Date(dateString).toLocaleDateString(local === "ar" ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Format amount with currency
 */
export const formatAmount = (amount: number, currency: string, local: string): string => {
  return new Intl.NumberFormat(local === "ar" ? "ar-EG" : "en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);
};