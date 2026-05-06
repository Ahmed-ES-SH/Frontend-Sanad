"use client";

import { useTranslation } from "@/app/hooks/useTranslation";

interface OrderActionsProps {
  amount: number;
  currency: string;
  orderId: string;
  onPayClick?: (orderId: string) => void;
}

export function OrderActions({
  amount,
  currency,
  orderId,
  onPayClick,
}: OrderActionsProps) {
  const orderDetail = useTranslation("orderDetail");

  const formatCurrency = (value: number, curr: string): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: curr.toUpperCase(),
    }).format(value);
  };

  const handlePayClick = () => {
    onPayClick?.(orderId);
  };

  return (
    <div className="flex justify-end gap-3">
      <button
        onClick={handlePayClick}
        className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
      >
        {orderDetail.pay} {formatCurrency(amount, currency)}
      </button>
    </div>
  );
}
