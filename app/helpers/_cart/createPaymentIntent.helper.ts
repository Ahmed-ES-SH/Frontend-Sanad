"use server";

import { PAYMENTS_ENDPOINTS } from "@/app/constants/endpoints";
import { globalRequest } from "@/app/helpers/globalRequest";
import { CartItemType } from "@/app/types/cart";

/**
 * Response from creating a payment intent.
 */
export interface PaymentIntentResponse {
  clientSecret: string;
  paymentId: string;
}

interface CreateIntentBody {
  amount: number;
  currency: string;
  description: string;
  userId: number;
  serviceId: string;
}

/**
 * Creates a payment intent for checkout.
 */
export const createPaymentIntent = async (
  total: number,
  items: CartItemType[],
  userId: number,
  serviceId: string,
): Promise<PaymentIntentResponse> => {
  if (!Number.isFinite(total) || total <= 0) {
    throw new Error("Cart total must be greater than 0 before payment.");
  }

  const itemLabels = items
    .map((item) => item.serviceTitle ?? item.title ?? item.serviceId)
    .filter((label) => label.trim().length > 0);

  const description = `Sanad Services: ${itemLabels.join(", ")}`;

  const result = await globalRequest<CreateIntentBody, PaymentIntentResponse>({
    endpoint: PAYMENTS_ENDPOINTS.CREATE_INTENT,
    method: "POST",
    body: {
      amount: total,
      currency: "usd",
      description: description.substring(0, 255),
      userId,
      serviceId,
    },
    defaultErrorMessage: "Unable to start payment. Please try again.",
  });

  if (!result.success) {
    const { statusCode, message } = result;

    if (statusCode === 400) {
      throw new Error(
        "Invalid payment data. Please review your cart and try again.",
      );
    }
    if (statusCode === 401) {
      throw new Error(
        "Your session has expired. Please sign in and try again.",
      );
    }
    if (statusCode === 502) {
      throw new Error(
        "Payment gateway is temporarily unavailable. Please retry.",
      );
    }

    throw new Error(message);
  }

  return {
    clientSecret: result.data!.clientSecret,
    paymentId: result.data!.paymentId,
  };
};
