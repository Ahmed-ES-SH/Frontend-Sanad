/**
 * Formats a numeric price as currency using the locale-appropriate number format.
 * @param price - The numeric amount to format
 * @param locale - The locale code ('ar' for Arabic, anything else for English)
 * @param currency - The currency code (default: 'USD')
 * @returns Formatted currency string (e.g., "$1,200.00" or "US$1,200.00")
 */
export function formatPrice(price: number, locale: string, currency: string = "USD"): string {
  return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US", {
    style: "currency",
    currency,
  }).format(price);
}
