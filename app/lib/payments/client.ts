"use server";

import { PAYMENTS_ENDPOINTS } from "@/app/constants/endpoints";
import { globalRequest } from "@/app/helpers/globalRequest";

export interface CreatePaymentIntentParams {
  amount: number;
  currency?: string;
  description: string;
  userId?: string;
}

export interface CreatePaymentIntentResponse {
  clientSecret: string;
  paymentId: string;
  stripePaymentIntentId: string;
}

export interface PaymentStatusResponse {
  id: string;
  status:
    | "pending"
    | "succeeded"
    | "failed"
    | "partially_refunded"
    | "refunded";
}

export const paymentsApi = {
  createPaymentIntent: async (data: CreatePaymentIntentParams) => {
    const result = await globalRequest<
      CreatePaymentIntentParams,
      CreatePaymentIntentResponse
    >({
      endpoint: PAYMENTS_ENDPOINTS.CREATE_INTENT,
      method: "POST",
      body: data,
      defaultErrorMessage: "Failed to create payment intent",
    });

    // 404 fallback — try the local Next.js API route
    if (!result.success && result.statusCode === 404) {
      return globalRequest<
        CreatePaymentIntentParams,
        CreatePaymentIntentResponse
      >({
        endpoint: "/api/payments/create-intent",
        method: "POST",
        body: data,
        defaultErrorMessage: "Failed to create payment intent",
      });
    }

    return result;
  },

  getPaymentById: async (paymentId: string) => {
    const result = await globalRequest<undefined, PaymentStatusResponse>({
      endpoint: PAYMENTS_ENDPOINTS.GET_BY_ID(paymentId),
      method: "GET",
      defaultErrorMessage: "Failed to fetch payment",
    });

    // 404 fallback — try the local Next.js API route
    if (!result.success && result.statusCode === 404) {
      return globalRequest<undefined, PaymentStatusResponse>({
        endpoint: `/api/payments/${paymentId}`,
        method: "GET",
        defaultErrorMessage: "Failed to fetch payment",
      });
    }

    return result;
  },
};
