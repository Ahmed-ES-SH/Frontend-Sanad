// ============================================================================
// ORDER STATUS - Allowed values for order lifecycle
// ============================================================================

import { PaginationMeta } from "./global";

export type OrderStatus =
  | "pending"
  | "paid"
  | "in_progress"
  | "completed"
  | "cancelled";

// ============================================================================
// ORDER TIMELINE - Track order progress updates
// ============================================================================

export interface OrderUpdate {
  id: string;
  orderId: string;
  author: "system" | "admin";
  content: string;
  createdAt: string;
}

// ============================================================================
// SERVICE REFERENCE - Embeded service data in orders
// ============================================================================

export interface OrderService {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  iconUrl: string;
  coverImageUrl: string;
  basePrice: number;
  isPublished: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

// ============================================================================
// ORDER ENTITY - Core order data structure (User-facing)
// ============================================================================

export interface Order {
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

// ============================================================================
// USER REFERENCE - Embedded user data in admin orders
// ============================================================================

export interface OrderUser {
  id: number;
  email: string;
  name: string | null;
  avatar: string | null;
  role: "admin" | "user";
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// PAYMENT DETAILS - Payment information for orders (Admin view)
// ============================================================================

export interface OrderPayment {
  id: string;
  stripePaymentIntentId: string;
  amount: number;
  currency: string;
  status: "pending" | "succeeded" | "failed" | "refunded";
  description: string;
  metadata: {
    orderId: string;
  };
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// ORDER ENTITY - Extended order data (Admin-facing)
// ============================================================================

export interface AdminOrder extends Omit<Order, "service"> {
  user: OrderUser;
  service: OrderService & {
    longDescription?: string;
  };
  payment?: OrderPayment | null;
}

// ============================================================================
// API RESPONSES - Typed responses from backend endpoints
// ============================================================================

// Initiate Payment Response (201 Created)
export interface PaymentIntentResponse {
  clientSecret: string;
  paymentId: string;
  stripePaymentIntentId: string;
}

// List Orders Response (200 OK)
export interface OrderListResponse {
  data: Order[];
  meta: PaginationMeta;
}

// List Admin Orders Response (200 OK)
export interface AdminOrderListResponse {
  data: AdminOrder[];
  meta: PaginationMeta;
}

// ============================================================================
// QUERY PARAMETERS - API request parameters
// ============================================================================

export interface OrderQueryParams {
  page?: number;
  limit?: number;
  status?: OrderStatus;
  search?: string;
}

export interface AdminOrderQueryParams extends OrderQueryParams {
  status?: OrderStatus;
  userId?: number;
  serviceId?: string;
}

// ============================================================================
// FORM DATA - Client-side form state
// ============================================================================

export interface CreateOrderFormData {
  serviceId: string;
  notes?: string;
}

export interface UpdateOrderStatusFormData {
  status: OrderStatus;
}

export interface AddOrderUpdateFormData {
  content: string;
}

// ============================================================================
// ACTION RESULTS - Server action return types
// ============================================================================

export interface OrderActionResult<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export interface InitiatePaymentResult {
  clientSecret: string;
  paymentId: string;
  stripePaymentIntentId: string;
}

// ============================================================================
// STATUS STEPPER - Order progress stepper configuration
// ============================================================================

export interface StatusStepperStep {
  id: string;
  label: string;
  icon: string; // Icon component name from react-icons/fi
}

export interface StatusStepperConfig {
  steps: StatusStepperStep[];
  currentStatus: OrderStatus;
}

// ============================================================================
// TIMELINE - Order audit trail entries
// ============================================================================

export interface TimelineEntry {
  id: string;
  author: string;
  authorAvatar?: string;
  timestamp: string;
  content: string;
  isSystem?: boolean;
}

// ============================================================================
// STATUS BADGE CONFIG - Visual configuration for status badges
// ============================================================================

export interface StatusBadgeConfig {
  label: string;
  bgColor: string;
  textColor: string;
  dotColor: string;
}

// Update Order Status Response (200 OK)
export type UpdateOrderStatusResponse = Omit<AdminOrder, "payment">;

// Add Timeline Update Response (201 Created)
export type AddOrderUpdateResponse = OrderUpdate;

export interface UseCreateOrderState {
  isLoading: boolean;
  error: string | null;
}

// ============================================================================
// RE-EXPORT: Hook with state management for standalone use
// ============================================================================

export interface OrderFilters {
  page: number;
  limit: number;
  status?: string;
  userId?: number;
  serviceId?: string;
}

export interface UseAdminOrdersWithStateResult {
  orders: AdminOrderListResponse["data"];
  meta: PaginationMeta | null;
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  refetch: () => void;

  // Filter state
  filters: OrderFilters;
  setFilters: (filters: Partial<OrderFilters>) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setStatus: (status: string) => void;
  setUserId: (userId: number | undefined) => void;
  setServiceId: (serviceId: string | undefined) => void;
  resetFilters: () => void;
}
