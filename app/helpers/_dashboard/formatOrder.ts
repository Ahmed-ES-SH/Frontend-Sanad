/**
 * Formatting helpers for order display
 * Transforms raw API response into display-ready structures
 */

import {
  DisplayOrder,
  OrderDetails,
  OrderStatus,
  StatusStep,
  TimelineEntry,
} from "@/app/types/OrderTrackingTable.types";

/**
 * Maps backend status to display label
 * Uses translation keys from orderTracking.status in translations
 */
export const statusLabelMap: Record<OrderStatus, string> = {
  pending: "pending",
  paid: "paid",
  in_progress: "inProgress",
  completed: "completed",
  cancelled: "cancelled",
};

/**
 * Status progression order for progress tracker
 */
export const statusOrder: OrderStatus[] = [
  "pending",
  "paid",
  "in_progress",
  "completed",
];

/**
 * Formats a raw order into display-ready structure
 */
export function formatOrder(
  raw: OrderDetails,
  locale: string = "en",
): DisplayOrder {
  return {
    id: raw.id,
    serviceName: raw.service.title,
    amount: formatAmount(raw.amount, raw.currency),
    currency: raw.currency.toUpperCase(),
    placedDate: formatDate(raw.createdAt, locale),
    status: raw.status,
    statusLabel: statusLabelMap[raw.status],
    notes: raw.notes,
    updates: formatTimeline(raw.updates, locale),
  };
}

/**
 * Formats amount with currency symbol
 */
export function formatAmount(amount: number, currency: string): string {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(amount);

  return formatted;
}

/**
 * Formats a date string for display
 */
export function formatDate(dateString: string, locale: string = "en"): string {
  const date = new Date(dateString);

  if (locale === "ar") {
    return new Intl.DateTimeFormat("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

/**
 * Formats a datetime for timeline display
 */
export function formatDateTime(
  dateString: string,
  locale: string = "en",
): string {
  const date = new Date(dateString);

  if (locale === "ar") {
    return new Intl.DateTimeFormat("ar-SA", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

/**
 * Transforms API timeline updates into display entries
 */
export function formatTimeline(
  updates: OrderDetails["updates"],
  locale: string = "en",
): TimelineEntry[] {
  return updates.map((update, index) => ({
    id: update.id,
    title: extractTitleFromContent(update.content),
    description: update.content,
    timestamp: formatDateTime(update.createdAt, locale),
    source: formatAuthor(update.author),
    isActive: index === updates.length - 1, // Most recent is active
  }));
}

/**
 * Extracts a title from update content
 * Uses first sentence or truncates
 */
function extractTitleFromContent(content: string): string {
  const firstSentence = content.split(".")[0];
  if (firstSentence.length > 60) {
    return firstSentence.substring(0, 57) + "...";
  }
  return firstSentence;
}

/**
 * Formats author name for display
 */
function formatAuthor(author: string): string {
  const authorMap: Record<string, string> = {
    system: "System",
    admin: "Admin Team",
  };
  return authorMap[author] || author;
}

/**
 * Generates status steps based on current order status
 */
export function getStatusSteps(currentStatus: OrderStatus): {
  steps: StatusStep[];
  progressWidth: string;
} {
  const currentIndex = statusOrder.indexOf(currentStatus);

  // Default to 0 for unknown statuses
  if (currentIndex === -1) {
    return {
      steps: [],
      progressWidth: "0%",
    };
  }

  const steps: StatusStep[] = statusOrder.map((key, index) => ({
    key,
    label: statusLabelMap[key],
    isCompleted: index < currentIndex,
    isCurrent: index === currentIndex,
  }));

  const progressMap: Record<number, string> = {
    0: "0%",
    1: "33%",
    2: "66%",
    3: "100%",
  };

  return {
    steps,
    progressWidth: progressMap[currentIndex] || "0%",
  };
}

/**
 * Fallback order data when API fails or returns null
 */
export function createFallbackOrder(orderId: string): DisplayOrder {
  return {
    id: orderId,
    serviceName: "—",
    amount: "—",
    currency: "USD",
    placedDate: "—",
    status: "pending",
    statusLabel: "pending",
    notes: null,
    updates: [],
  };
}
