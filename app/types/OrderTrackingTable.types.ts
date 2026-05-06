/**
 * Types for the Order Tracking page - User endpoint only
 * Based on API response from GET /orders/:id
 */

// Order status values from backend
export type OrderStatus =
  | "pending"
  | "paid"
  | "in_progress"
  | "completed"
  | "cancelled";

// Service information nested in order response
export interface OrderService {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  iconUrl: string | null;
  basePrice: number;
  isPublished: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Timeline update entry
export interface OrderUpdate {
  id: string;
  orderId: string;
  author: string;
  content: string;
  createdAt: string;
}

// Complete order response from user endpoint
export interface OrderDetails {
  id: string;
  userId: number;
  serviceId: string;
  service: OrderService;
  paymentId: string | null;
  status: OrderStatus;
  amount: number;
  currency: string;
  notes: string | null;
  updates: OrderUpdate[];
  createdAt: string;
  updatedAt: string;
}

// Display-ready order structure
export interface DisplayOrder {
  id: string;
  serviceName: string;
  amount: string;
  currency: string;
  placedDate: string;
  status: OrderStatus;
  statusLabel: string;
  notes: string | null;
  updates: TimelineEntry[];
}

// Timeline display entry
export interface TimelineEntry {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  source: string;
  isActive?: boolean;
}

// Props for OrderTrackingTable component
export interface OrderTrackingTableProps {
  order: DisplayOrder;
}

/**
 * Types for StatusStep component - Progress tracker
 */

export type StatusStepKey = OrderStatus;

export interface StatusStep {
  key: StatusStepKey;
  label: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface StatusStepProps {
  step: StatusStep;
  index: number;
  isRtl: boolean;
}
