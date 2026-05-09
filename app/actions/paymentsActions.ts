"use server";

import { PAYMENTS_ENDPOINTS } from "@/app/constants/endpoints";
import {
  PaginatedPaymentsResponse,
  PaymentFilterDto,
  PaymentStatistics,
} from "../types/payments";
import { globalRequest } from "../helpers/globalRequest";
import { PaginationMeta } from "../types/global";

/* =========================================================
   HELPERS
========================================================= */

function buildQuery(params: PaymentFilterDto = {}): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  const query = searchParams.toString();

  return query ? `?${query}` : "";
}

/* =========================================================
   GET PAYMENTS
========================================================= */

export async function getInitialPayments(
  params: PaymentFilterDto = {},
): Promise<{
  success: boolean;
  data?: PaginatedPaymentsResponse;
  message?: string;
}> {
  const res = await globalRequest<never, PaginatedPaymentsResponse>({
    endpoint: PAYMENTS_ENDPOINTS.ADMIN_LIST + buildQuery(params),

    method: "GET",

    defaultErrorMessage: "Failed to fetch payments. Please try again.",
  });

  if (!res.success) {
    return res;
  }

  return {
    success: true,
    data: res.data,
  };
}

export async function getPaymentStats(): Promise<{
  success: boolean;
  data?: PaymentStatistics;
  meta?: PaginationMeta;
}> {
  const res = await globalRequest<never, PaymentStatistics>({
    endpoint: PAYMENTS_ENDPOINTS.ADMIN_STATS,

    method: "GET",

    defaultErrorMessage: "Failed to fetch payment stats. Please try again.",
  });

  if (!res.success) {
    return res;
  }

  return {
    success: true,
    data: res.data,
  };
}

/* =========================================================
   REFUND PAYMENT
========================================================= */

export async function refundPayment(paymentId: string): Promise<{
  success: boolean;
  data?: unknown;
  message?: string;
}> {
  const res = await globalRequest<never, unknown>({
    endpoint: PAYMENTS_ENDPOINTS.ADMIN_REFUND(paymentId),

    method: "POST",

    defaultErrorMessage: "Failed to refund payment. Please try again.",
  });

  if (!res.success) {
    return res;
  }

  return {
    success: true,
    message: "Payment refunded successfully",
    data: res.data,
  };
}
