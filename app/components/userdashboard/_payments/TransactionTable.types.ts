import { ReactNode } from "react";

export type FilterStatus = "paid" | "pending" | "failed" | "all";

export interface TransactionTableProps {
  transactions: TransactionRowData[];
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  currentPage: number;
  totalPages: number;
  total: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
  onRetry: () => void;
  onRetryPayment?: (transactionId: string) => void;
}

export interface TransactionRowData {
  id: string;
  date: string;
  time: string;
  description: string;
  subtitle: string;
  icon: ReactNode;
  amount: string;
  status: "paid" | "pending" | "failed";
  errorReason?: string;
  timestamp: Date;
}

export interface TransactionStatusConfig {
  label: string;
  className: string;
  icon: ReactNode;
}

export const STATUS_CONFIG: Record<
  "paid" | "pending" | "failed",
  TransactionStatusConfig
> = {
  paid: {
    label: "Paid",
    className: "bg-green-50 text-green-700",
    icon: null, // Will be filled by parent
  },
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700",
    icon: null,
  },
  failed: {
    label: "Failed",
    className: "bg-red-50 text-red-700",
    icon: null,
  },
};