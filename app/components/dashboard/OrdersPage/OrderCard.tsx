"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Order } from "@/app/types/order";
import { useTranslation } from "@/app/hooks/useTranslation";
import { ORDERS_LIST_STATUS_CONFIG } from "@/app/constants/orderDetails";
import { formatCurrency, formatDate, extractShortId } from "@/app/hooks/useOrderFormatters";

interface OrderCardProps {
  order: Order;
  onPayClick?: (orderId: string) => void;
}

export function OrderCard({ order, onPayClick }: OrderCardProps) {
  const statusLabel = useTranslation(`ordersList.status.${order.status}` as any);
  const viewDetailsLabel = useTranslation("ordersList.viewDetails");
  const payNowLabel = useTranslation("ordersList.payNow");
  const orderPrefixLabel = useTranslation("ordersList.orderPrefix");

  const statusStyle = ORDERS_LIST_STATUS_CONFIG[order.status] || ORDERS_LIST_STATUS_CONFIG.pending;

  return (
    <motion.div
      key={order.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors"
    >
      <div className="flex items-start justify-between gap-4">
        {/* Service Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            {order.service.iconUrl && (
              <Image
                src={order.service.iconUrl}
                alt={order.service.title}
                className="w-10 h-10 rounded-lg object-cover"
              />
            )}
            <div>
              <h3 className="font-medium text-gray-900 truncate">
                {order.service.title}
              </h3>
              <p className="text-sm text-gray-500">
                {orderPrefixLabel} {extractShortId(order.id)}
              </p>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <span
          className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}
        >
          {statusLabel}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        {/* Amount & Date */}
        <div className="text-sm">
          <span className="font-medium text-gray-900">
            {formatCurrency(order.amount, order.currency)}
          </span>
          <span className="text-gray-500 ml-2">
            {formatDate(order.createdAt)}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href={`/orders/${order.id}`}
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            {viewDetailsLabel}
          </Link>
          {order.status === "pending" && onPayClick && (
            <button
              onClick={() => onPayClick(order.id)}
              className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {payNowLabel}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

OrderCard.displayName = "OrderCard";