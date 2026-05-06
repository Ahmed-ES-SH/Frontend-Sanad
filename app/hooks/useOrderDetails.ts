// ============================================================================
// USE ORDER DETAILS HOOK - State management for order details page
// ============================================================================

import { useEffect, useState, useCallback } from "react";

import type { TimelineEntry } from "../types/order";
import type { AdminOrder } from "../types/order";

// ============================================================================
// TYPES
// ============================================================================

type FetchState = "loading" | "success" | "error";
type SubmitState = "idle" | "submitting" | "submitted" | "error";

interface SubmissionError {
  message: string;
}

interface UseOrderDetailsReturn {
  // State
  order: AdminOrder | null;
  timeline: TimelineEntry[];
  fetchState: FetchState;
  submitState: SubmitState;
  submissionError: SubmissionError | null;
  updateText: string;
  // Actions
  setUpdateText: (text: string) => void;
  handlePostUpdate: () => Promise<void>;
  refreshOrder: () => Promise<void>;
}

// ============================================================================
// MOCK DATA - Replace with actual API calls
// ============================================================================

const mockOrderDetails: AdminOrder = {
  id: "#ORD-8821",
  userId: 1,
  serviceId: "svc-1",
  service: {
    id: "svc-1",
    title: "Enterprise Maintenance Suite",
    slug: "enterprise-maintenance",
    shortDescription: "Comprehensive maintenance solution",
    iconUrl: "",
    coverImageUrl: "",
    basePrice: 250,
    isPublished: true,
    order: 1,
  },
  paymentId: "PAY-7721-X992-B82",
  status: "in_progress",
  amount: 250,
  currency: "USD",
  notes: "Client requested priority handling for the first month setup.",
  updates: [],
  createdAt: "Oct 24, 2023 at 02:45 PM",
  updatedAt: "Oct 25, 2023 at 10:12 AM",
  user: {
    id: 1,
    email: "sarah.j@example.com",
    name: "Sarah Jenkins",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    role: "user",
    isEmailVerified: true,
    createdAt: "",
    updatedAt: "",
  },
  payment: {
    id: "pay-1",
    stripePaymentIntentId: "pi_123",
    amount: 250,
    currency: "USD",
    status: "succeeded",
    description: "Payment for Enterprise Maintenance Suite",
    metadata: { orderId: "#ORD-8821" },
    createdAt: "",
    updatedAt: "",
  },
};

const mockTimeline: TimelineEntry[] = [
  {
    id: "update-1",
    author: "Admin Sanad",
    authorAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    timestamp: "TODAY, 10:12 AM",
    content:
      'Verified payment receipt and moved order to "Processing" state. Notified customer via email.',
  },
  {
    id: "update-2",
    author: "System Activity",
    timestamp: "OCT 24, 02:45 PM",
    content:
      "Order created successfully through the customer portal. Payment status: Pending.",
    isSystem: true,
  },
];

// ============================================================================
// HOOK
// ============================================================================

export function useOrderDetails(orderId: string): UseOrderDetailsReturn {
  const [order, setOrder] = useState<AdminOrder | null>(null);
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [fetchState, setFetchState] = useState<FetchState>("loading");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submissionError, setSubmissionError] = useState<SubmissionError | null>(
    null
  );
  const [updateText, setUpdateText] = useState("");

  const fetchOrder = useCallback(async () => {
    try {
      setFetchState("loading");
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/orders/${orderId}`);
      // const data = await response.json();
      
      await new Promise((r) => setTimeout(r, 800)); // Simulated delay
      setOrder(mockOrderDetails as AdminOrder);
      setTimeline(mockTimeline);
      setFetchState("success");
    } catch {
      setFetchState("error");
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const handlePostUpdate = useCallback(async () => {
    if (!updateText.trim()) return;

    setSubmitState("submitting");
    setSubmissionError(null);

    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/orders/${orderId}/updates`, {
      //   method: 'POST',
      //   body: JSON.stringify({ content: updateText }),
      // });
      
      await new Promise((r) => setTimeout(r, 600)); // Simulated delay
      setSubmitState("submitted");
      setUpdateText("");
      setTimeout(() => setSubmitState("idle"), 3000);
    } catch {
      setSubmitState("error");
      setSubmissionError({
        message: "Failed to post update. Please try again.",
      });
    }
  }, [updateText, orderId]);

  return {
    order,
    timeline,
    fetchState,
    submitState,
    submissionError,
    updateText,
    setUpdateText,
    handlePostUpdate,
    refreshOrder: fetchOrder,
  };
}