/**
 * Order Formatter Helper Functions
 * Utility functions for formatting order data
 */

/**
 * Format currency amount with proper locale and currency code
 * @param amount - The numeric amount to format
 * @param currency - The currency code (default: 'USD')
 * @returns Formatted currency string (e.g., "$1,200.00")
 */
export function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);
}

/**
 * Format date string for display in table cells
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "Jan 15, 2026")
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}