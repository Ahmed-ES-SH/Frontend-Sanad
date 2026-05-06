"use server";

import { revalidateTag } from "next/cache";
import { ORDERS_ENDPOINTS } from "@/app/constants/endpoints";

import {
  Order,
  OrderListResponse,
  AdminOrderListResponse,
  AdminOrder,
  PaymentIntentResponse,
  OrderQueryParams,
  AdminOrderQueryParams,
  OrderActionResult,
  UpdateOrderStatusResponse,
  AddOrderUpdateResponse,
} from "@/app/types/order";
import { globalRequest } from "../helpers/globalRequest";
import { OrderDetails } from "../types/OrderTrackingTable.types";

const ORDER_CACHE_TAG = "orders";

function toErrorResult<T>(message: string): OrderActionResult<T> {
  return {
    success: false,
    message,
  };
}

// ============================================================================
// USER-FACING ORDER ACTIONS
// ============================================================================

/**
 * Creates a new order for the authenticated user.
 * POST /api/orders?serviceId={uuid}&notes={string}
 */
export async function createOrder(
  serviceId: string,
  notes?: string,
): Promise<OrderActionResult<Order>> {
  const response = await globalRequest<never, Order>({
    endpoint: ORDERS_ENDPOINTS.CREATE(serviceId, notes),
    method: "POST",
    defaultErrorMessage: "Failed to create order. Please try again.",
  });

  if (!response.success || !response.data) {
    return toErrorResult<Order>(response.message);
  }

  revalidateTag(ORDER_CACHE_TAG, "default");

  return {
    success: true,
    message: "Order created successfully",
    data: response.data,
  };
}

/**
 * Lists the authenticated user's orders with pagination.
 * GET /api/orders?page=1&limit=10
 */
export async function getMyOrders(
  params: OrderQueryParams = {},
): Promise<OrderActionResult<OrderListResponse>> {
  const response = await globalRequest<never, OrderListResponse>({
    endpoint: ORDERS_ENDPOINTS.LIST(
      params.page,
      params.limit,
      params.status,
      params.search,
    ),
    method: "GET",
    defaultErrorMessage: "Failed to fetch orders. Please try again.",
  });

  if (!response.success || !response.data) {
    return {
      success: false,
      message: response.message,
    };
  }

  return {
    success: true,
    message: "Orders fetched successfully",
    data: response.data,
  };
}

/**
 * Gets full details of a single order.
 * GET /api/orders/:id
 */
export async function getOrderById(
  id: string,
): Promise<OrderActionResult<Order>> {
  const response = await globalRequest<never, Order>({
    endpoint: ORDERS_ENDPOINTS.GET(id),
    method: "GET",
    defaultErrorMessage: "Failed to fetch order. Please try again.",
  });

  if (!response.success || !response.data) {
    return {
      success: false,
      message: response.message,
    };
  }

  return {
    success: true,
    message: "Order fetched successfully",
    data: response.data,
  };
}

/**
 * Initiates Stripe payment for a pending order.
 * POST /api/orders/:id/pay
 */
export async function initiatePayment(
  orderId: string,
): Promise<OrderActionResult<PaymentIntentResponse>> {
  const response = await globalRequest<never, PaymentIntentResponse>({
    endpoint: ORDERS_ENDPOINTS.PAY(orderId),
    method: "POST",
    defaultErrorMessage: "Failed to initiate payment. Please try again.",
  });

  if (!response.success || !response.data) {
    return {
      success: false,
      message: response.message,
    };
  }

  return {
    success: true,
    message: "Payment initiated successfully",
    data: response.data,
  };
}

// ============================================================================
// ADMIN-FACING ORDER ACTIONS
// ============================================================================

/**
 * Lists all orders with optional filtering and pagination (Admin).
 * GET /api/admin/orders?page=1&limit=10&status=paid&userId=5&serviceId=abc123
 */
export async function getAllOrders(
  params: AdminOrderQueryParams = {},
): Promise<OrderActionResult<AdminOrderListResponse>> {
  const response = await globalRequest<never, AdminOrderListResponse>({
    endpoint: ORDERS_ENDPOINTS.ADMIN_LIST(
      params.page,
      params.limit,
      params.status,
      params.userId,
      params.serviceId,
    ),
    method: "GET",
    defaultErrorMessage: "Failed to fetch orders. Please try again.",
  });

  if (!response.success || !response.data) {
    return {
      success: false,
      message: response.message,
    };
  }

  return {
    success: true,
    message: "Orders fetched successfully",
    data: response.data,
  };
}

/**
 * Gets full order details including user, service, payment (Admin).
 * GET /api/admin/orders/:id
 */
export async function getAdminOrderById(
  id: string,
): Promise<OrderActionResult<AdminOrder>> {
  const response = await globalRequest<never, AdminOrder>({
    endpoint: ORDERS_ENDPOINTS.ADMIN_GET(id),
    method: "GET",
    defaultErrorMessage: "Failed to fetch order. Please try again.",
  });

  if (!response.success || !response.data) {
    return {
      success: false,
      message: response.message,
    };
  }

  return {
    success: true,
    message: "Order fetched successfully",
    data: response.data,
  };
}

/**
 * Updates the status of an order (Admin).
 * PATCH /api/admin/orders/:id/status
 */
export async function updateOrderStatus(
  id: string,
  status: string,
): Promise<OrderActionResult<UpdateOrderStatusResponse>> {
  const response = await globalRequest<
    { status: string },
    UpdateOrderStatusResponse
  >({
    endpoint: ORDERS_ENDPOINTS.ADMIN_UPDATE_STATUS(id),
    method: "PATCH",
    body: { status },
    defaultErrorMessage: "Failed to update order status. Please try again.",
  });

  if (!response.success || !response.data) {
    return {
      success: false,
      message: response.message,
    };
  }

  revalidateTag(ORDER_CACHE_TAG, "default");

  return {
    success: true,
    message: "Order status updated successfully",
    data: response.data,
  };
}

/**
 * Adds a custom message to the order's timeline (Admin).
 * POST /api/admin/orders/:id/updates
 */
export async function addOrderUpdate(
  id: string,
  content: string,
): Promise<OrderActionResult<AddOrderUpdateResponse>> {
  const response = await globalRequest<
    { content: string },
    AddOrderUpdateResponse
  >({
    endpoint: ORDERS_ENDPOINTS.ADMIN_ADD_UPDATE(id),
    method: "POST",
    body: { content },
    defaultErrorMessage: "Failed to add update. Please try again.",
  });

  if (!response.success || !response.data) {
    return {
      success: false,
      message: response.message,
    };
  }

  revalidateTag(ORDER_CACHE_TAG, "default");

  return {
    success: true,
    message: "Update added successfully",
    data: response.data,
  };
}

/**
 * Fetches order details for the authenticated user
 * @param orderId - The order UUID
 * @returns Order details
 */
export async function fetchOrderById(orderId: string): Promise<OrderDetails> {
  const res = await globalRequest<never, OrderDetails>({
    endpoint: `/api/orders/${orderId}`,

    method: "GET",

    defaultErrorMessage: "Failed to fetch order details",
  });

  if (!res.success || !res.data) {
    throw new Error(res.message);
  }

  return res.data;
}
