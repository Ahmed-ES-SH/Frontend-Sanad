/**
 * Order tracking page helpers
 * Shared logic for order tracking page components
 */

import type { OrderStatus, StatusStep } from "@/app/types/OrderTrackingTable.types";

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
 * Progress width mapping based on status index
 */
export const progressWidthMap: Record<number, string> = {
  0: "0%",
  1: "33%",
  2: "66%",
  3: "100%",
};

/**
 * Builds status label map from translations
 */
export function buildStatusLabelMap(statusTranslations: {
  pending: string;
  paid: string;
  inProgress: string;
  completed: string;
  cancelled: string;
}): Record<string, string> {
  return {
    pending: statusTranslations.pending,
    paid: statusTranslations.paid,
    in_progress: statusTranslations.inProgress,
    completed: statusTranslations.completed,
    cancelled: statusTranslations.cancelled,
  };
}

/**
 * Generates status steps based on current order status
 */
export function getStatusSteps(currentStatus: OrderStatus): {
  steps: StatusStep[];
  progressWidth: string;
} {
  const currentIndex = statusOrder.indexOf(currentStatus);

  if (currentIndex === -1) {
    return {
      steps: [],
      progressWidth: "0%",
    };
  }

  const steps: StatusStep[] = statusOrder.map((key, index) => ({
    key,
    label: key,
    isCompleted: index < currentIndex,
    isCurrent: index === currentIndex,
  }));

  return {
    steps,
    progressWidth: progressWidthMap[currentIndex] || "0%",
  };
}

/**
 * Generates back link based on locale
 */
export function getBackLink(isRtl: boolean, locale: string): string {
  return isRtl ? `/${locale}/userdashboard/orders` : `/${locale}/userdashboard/orders`;
}

/**
 * Gets fallback message for empty updates
 */
export function getFallbackMessage(isRtl: boolean): string {
  return isRtl
    ? "سيتم تحديثك فور بدء معالجة طلبك."
    : "You will be updated once we start processing your order.";
}

/**
 * Gets the latest update description or fallback
 */
export function getLatestUpdateDescription(
  updates: { description: string }[],
  isRtl: boolean,
): string {
  if (updates.length > 0) {
    return updates[updates.length - 1].description;
  }
  return getFallbackMessage(isRtl);
}