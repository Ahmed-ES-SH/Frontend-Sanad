/**
 * Date Helper Functions
 * Utility functions for date formatting
 */

/**
 * Format date for display in user info card
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "January 15, 2026 at 10:30 AM")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}