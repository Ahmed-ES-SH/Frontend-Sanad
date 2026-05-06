"use client";

import Link from "next/link";
import { OrderStatus } from "@/app/types/order";
import { ORDERS_LIST_STATUS_CONFIG } from "@/app/constants/orderDetails";
import { useTranslation } from "@/app/hooks/useTranslation";

interface OrderHeaderProps {
  orderId: string;
  status: OrderStatus;
}

export function OrderHeader({ orderId, status }: OrderHeaderProps) {
  const t = useTranslation("orderDetail");
  const statusConfig =
    ORDERS_LIST_STATUS_CONFIG[status] || ORDERS_LIST_STATUS_CONFIG.pending;

  const statusLabels: Record<OrderStatus, string> = {
    pending: t.status.pending,
    paid: t.status.paid,
    in_progress: t.status.inProgress,
    completed: t.status.completed,
    cancelled: t.status.cancelled,
  };

  return (
    <div className="flex items-start justify-between">
      <div>
        <Link
          href="/dashboard/orders"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-2"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t.backToOrders}
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
        <p className="text-sm text-gray-500 mt-1">
          {t.orderPrefix}#{orderId.slice(0, 8)}
        </p>
      </div>
      <span
        className={`px-3 py-1.5 rounded-full text-sm font-medium ${statusConfig.bg} ${statusConfig.text}`}
      >
        {statusLabels[status]}
      </span>
    </div>
  );
}
