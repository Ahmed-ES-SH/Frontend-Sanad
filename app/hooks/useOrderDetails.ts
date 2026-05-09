/* eslint-disable react-hooks/set-state-in-effect */
// ============================================================================
// USE ORDER DETAILS HOOK - State management for order details page
// ============================================================================

import { useEffect, useState, useCallback } from "react";

import type { TimelineEntry, OrderStatus } from "../types/order";
import type { AdminOrder } from "../types/order";
import { useAdminOrderById } from "./useAdminOrderById";
import { useUpdateOrderStatus } from "./useUpdateOrderStatus";
import { useAddOrderUpdate } from "./useAddOrderUpdate";

// ============================================================================
// TYPES
// ============================================================================

type FetchState = "loading" | "success" | "error";
type SubmitState = "idle" | "submitting" | "submitted" | "error";

interface SubmissionError {
  message: string;
}

interface UseOrderDetailsReturn {
  order: AdminOrder | null;
  timeline: TimelineEntry[];
  fetchState: FetchState;
  submitState: SubmitState;
  submissionError: SubmissionError | null;
  updateText: string;
  statusSelect: OrderStatus | "";
  isUpdatingStatus: boolean;
  setUpdateText: (text: string) => void;
  setStatusSelect: (status: OrderStatus | "") => void;
  handlePostUpdate: () => Promise<void>;
  handleStatusUpdate: () => Promise<void>;
  refreshOrder: () => Promise<void>;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function formatDateTime(dateString: string): string {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function transformOrderUpdatesToTimeline(
  updates: AdminOrder["updates"],
): TimelineEntry[] {
  if (!updates || updates.length === 0) return [];

  return updates.map((update) => ({
    id: update.id,
    author: update.author === "admin" ? "Admin" : "System",
    authorAvatar: undefined,
    timestamp: formatDateTime(update.createdAt),
    content: update.content,
    isSystem: update.author === "system",
  }));
}

// ============================================================================
// HOOK
// ============================================================================

export function useOrderDetails(orderId: string): UseOrderDetailsReturn {
  const {
    order,
    isLoading: isFetchingOrder,
    error: fetchError,
    isInitialLoad,
    fetchOrder,
  } = useAdminOrderById(orderId);

  const { isLoading: isUpdatingStatus, updateStatus } = useUpdateOrderStatus();

  const { isLoading: isAddingUpdate, addUpdate } = useAddOrderUpdate();

  const [fetchState, setFetchState] = useState<FetchState>("loading");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submissionError, setSubmissionError] =
    useState<SubmissionError | null>(null);
  const [updateText, setUpdateText] = useState("");
  const [statusSelect, setStatusSelect] = useState<OrderStatus | "">("");

  // Handle order fetching state
  useEffect(() => {
    if (isFetchingOrder && isInitialLoad) {
      setFetchState("loading");
    } else if (fetchError) {
      setFetchState("error");
    } else if (order) {
      setFetchState("success");
    }
  }, [isFetchingOrder, isInitialLoad, fetchError, order]);

  // Sync status select with order status
  useEffect(() => {
    if (order?.status) {
      setStatusSelect(order.status as OrderStatus);
    }
  }, [order?.status]);

  const refreshOrder = useCallback(async () => {
    await fetchOrder(orderId);
  }, [orderId, fetchOrder]);

  const handleStatusUpdate = useCallback(async () => {
    if (!statusSelect || statusSelect === order?.status) return;

    const result = await updateStatus(orderId, statusSelect, () => {
      refreshOrder();
    });

    if (!result.success) {
      setSubmissionError({ message: result.message });
    }
  }, [orderId, statusSelect, order?.status, updateStatus, refreshOrder]);

  const handlePostUpdate = useCallback(async () => {
    if (!updateText.trim()) return;

    setSubmitState("submitting");
    setSubmissionError(null);

    const result = await addUpdate(orderId, updateText.trim(), () => {
      refreshOrder();
    });

    if (result.success) {
      setSubmitState("submitted");
      setUpdateText("");
      setTimeout(() => setSubmitState("idle"), 3000);
    } else {
      setSubmitState("error");
      setSubmissionError({
        message: result.message || "Failed to post update. Please try again.",
      });
    }
  }, [orderId, updateText, addUpdate, refreshOrder]);

  const timeline = order?.updates
    ? transformOrderUpdatesToTimeline(order.updates)
    : [];

  return {
    order,
    timeline,
    fetchState,
    submitState,
    submissionError,
    updateText,
    statusSelect,
    isUpdatingStatus: isUpdatingStatus || isAddingUpdate,
    setUpdateText,
    setStatusSelect,
    handlePostUpdate,
    handleStatusUpdate,
    refreshOrder,
  };
}
