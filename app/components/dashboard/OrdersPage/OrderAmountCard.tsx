"use client";

import { useTranslation } from "@/app/hooks/useTranslation";

interface OrderAmountCardProps {
  amount: number;
  currency: string;
  createdAt: string;
}

export function OrderAmountCard({
  amount,
  currency,
  createdAt,
}: OrderAmountCardProps) {
  const orderDetail = useTranslation("orderDetail");

  const formatCurrency = (value: number, curr: string): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: curr.toUpperCase(),
    }).format(value);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-4 bg-white rounded-xl border border-gray-200">
      <h3 className="text-sm font-medium text-gray-500 mb-2">
        {orderDetail.amount}
      </h3>
      <p className="text-2xl font-bold text-gray-900">
        {formatCurrency(amount, currency)}
      </p>
      <p className="text-sm text-gray-500 mt-1">
        {orderDetail.createdAt} {formatDate(createdAt)}
      </p>
    </div>
  );
}
