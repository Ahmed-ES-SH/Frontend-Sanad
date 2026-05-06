"use client";

/**
 * Order formatting utilities hook
 * Provides pure formatting functions for order display
 */

// Format currency with locale-aware number formatting
export function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);
}

// Format date for display
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Extract short ID for display
export function extractShortId(fullId: string, length: number = 8): string {
  return fullId.slice(0, length);
}