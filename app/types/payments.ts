/**
 * Payment Types based on the Payments Integration Plan
 */

import { ReactNode } from "react";
import { PaginationMeta } from "./global";

export type PaymentStatus =
  | "pending"
  | "succeeded"
  | "failed"
  | "refunded"
  | "partially_refunded";

export interface PaymentResponseDto {
  id: string;
  userId: string | null;
  stripePaymentIntentId: string;
  stripeCustomerId: string | null;
  amount: number;
  currency: string;
  status: PaymentStatus;
  description: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedPaymentsResponse {
  data: PaymentResponseDto[];
  meta: PaginationMeta;
}

export interface PaymentStatistics {
  total: number;
  succeeded: number;
  pending: number;
  refunded: number;
  failed: number;
  partiallyRefunded: number;
}

export interface PaymentFilterDto {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "ASC" | "DESC";
  status?: PaymentStatus;
  userId?: string;
  startDate?: string;
  endDate?: string;
}

export interface CreatePaymentIntentDto {
  amount: number;
  currency?: string;
  description: string;
  userId?: string;
}

export interface CreatePaymentIntentResponseDto {
  clientSecret: string;
  paymentId: string;
  stripePaymentIntentId: string;
}

export interface RefundResponseDto {
  id: string;
  status: string;
  message: string;
}

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
