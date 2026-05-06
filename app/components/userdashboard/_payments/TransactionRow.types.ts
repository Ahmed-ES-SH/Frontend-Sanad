import { ReactNode } from "react";

export interface TransactionRowProps {
  transaction: TransactionData;
  statusConfig: Record<
    "paid" | "pending" | "failed",
    { label: string; className: string; icon: ReactNode }
  >;
  onRetryPayment?: (id: string) => void;
}

export interface TransactionData {
  id: string;
  date: string;
  time: string;
  description: string;
  subtitle: string;
  icon: ReactNode;
  amount: string;
  status: "paid" | "pending" | "failed";
  errorReason?: string;
}