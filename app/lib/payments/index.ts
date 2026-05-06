import { PAYMENTS_ENDPOINTS } from "@/app/constants/endpoints";
import { globalRequest } from "@/app/helpers/globalRequest";
import type {
  CreatePaymentIntentDto,
  CreatePaymentIntentResponseDto,
  PaymentResponseDto,
  PaginatedPaymentsResponse,
  RefundResponseDto,
  PaymentFilterDto,
} from "@/app/types/payments";

/**
 * Payments API Service
 *
 * Provides functions for interacting with the Payments API.
 * All endpoints require authentication (Bearer token).
 */

/**
 * Create a payment intent with Stripe
 * @param data - Payment intent creation data
 * @returns Payment intent response with clientSecret
 */
export async function createPaymentIntent(
  data: CreatePaymentIntentDto,
): Promise<CreatePaymentIntentResponseDto> {
  const res = await globalRequest<
    CreatePaymentIntentDto,
    CreatePaymentIntentResponseDto
  >({
    endpoint: PAYMENTS_ENDPOINTS.CREATE_INTENT,
    method: "POST",
    body: data,
  });

  if (!res.success || !res.data) {
    throw new Error(res.message);
  }

  return res.data;
}

/**
 * Get all payments (admin endpoint)
 * @param filters - Optional filters and pagination parameters
 * @returns Paginated list of payments
 */
export async function getPayments(
  filters?: PaymentFilterDto,
): Promise<PaginatedPaymentsResponse> {
  const res = await globalRequest<PaymentFilterDto, PaginatedPaymentsResponse>({
    endpoint: PAYMENTS_ENDPOINTS.ADMIN_LIST,
    method: "GET",
    body: filters,
  });

  if (!res.success || !res.data) {
    throw new Error(res.message);
  }

  return res.data;
}

/**
 * Get a single payment by ID (admin endpoint)
 * @param id - Payment UUID
 * @returns Payment details
 */
export async function getPaymentById(id: string): Promise<PaymentResponseDto> {
  const res = await globalRequest<never, PaymentResponseDto>({
    endpoint: PAYMENTS_ENDPOINTS.ADMIN_GET(id),
    method: "GET",
  });

  if (!res.success || !res.data) {
    throw new Error(res.message);
  }

  return res.data;
}

/**
 * Get current user's payment status by ID
 * @param id - Payment UUID
 * @returns Payment details for the current authenticated user
 */
export async function getMyPaymentById(
  id: string,
): Promise<PaymentResponseDto> {
  const res = await globalRequest<never, PaymentResponseDto>({
    endpoint: PAYMENTS_ENDPOINTS.GET_BY_ID(id),
    method: "GET",
  });

  if (!res.success || !res.data) {
    throw new Error(res.message);
  }

  return res.data;
}

/**
 * Refund a payment (admin endpoint)
 * @param id - Payment UUID
 * @returns Refund response
 */
export async function refundPayment(id: string): Promise<RefundResponseDto> {
  const res = await globalRequest<never, RefundResponseDto>({
    endpoint: PAYMENTS_ENDPOINTS.ADMIN_REFUND(id),
    method: "POST",
  });

  if (!res.success || !res.data) {
    throw new Error(res.message);
  }

  return res.data;
}
