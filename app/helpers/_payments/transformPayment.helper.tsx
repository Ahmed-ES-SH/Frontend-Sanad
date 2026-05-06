import { ReactNode } from "react";
import { FiDollarSign, FiCreditCard } from "react-icons/fi";
import { formatPaymentAmount } from "./formatPayment.helper";
import { parsePaymentDate } from "./parsePaymentDate.helper";
import { PaymentResponseDto, PaymentStatus } from "@/app/types/payments";

export type TransactionStatus = "paid" | "pending" | "failed";

export interface Transaction {
  id: string;
  date: string;
  time: string;
  description: string;
  subtitle: string;
  icon: ReactNode;
  amount: string;
  status: TransactionStatus;
  errorReason?: string;
  timestamp: Date;
  currency: string;
}

/**
 * Maps backend payment status to frontend transaction status.
 */
export const mapBackendStatusToFrontend = (
  status: PaymentStatus,
): TransactionStatus => {
  switch (status) {
    case "succeeded":
      return "paid";
    case "pending":
      return "pending";
    case "failed":
    case "refunded":
      return "failed";
    default:
      return "pending";
  }
};

/**
 * Determines the icon based on the payment description.
 */
const getIconFromDescription = (description: string | undefined): ReactNode => {
  const descriptionLower = (description || "").toLowerCase();

  if (
    descriptionLower.includes("cloud") ||
    descriptionLower.includes("support")
  ) {
    return <FiCreditCard className="text-sm" />;
  }

  return <FiDollarSign className="text-sm" />;
};

/**
 * Transforms an API payment response into a Transaction object.
 */
export const transformPaymentToTransaction = (
  payment: PaymentResponseDto,
): Transaction => {
  const { date, time, timestamp } = parsePaymentDate(payment.createdAt);
  const icon = getIconFromDescription(payment.description as string);

  return {
    id: payment.id,
    date,
    time,
    description: payment.description || "Payment",
    subtitle: payment.stripePaymentIntentId
      ? `Ref: ${payment.stripePaymentIntentId.slice(0, 15)}...`
      : "Payment",
    icon,
    amount: formatPaymentAmount(payment.amount, payment.currency),
    status: mapBackendStatusToFrontend(payment.status),
    timestamp,
    currency: payment.currency,
  };
};

/**
 * Transforms an array of API payments to Transaction objects.
 */
export const transformPaymentsArray = (
  payments: PaymentResponseDto[],
): Transaction[] => {
  return payments.map(transformPaymentToTransaction);
};
