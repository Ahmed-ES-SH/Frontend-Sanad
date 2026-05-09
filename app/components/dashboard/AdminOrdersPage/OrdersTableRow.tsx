"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { formatCurrency, formatDate } from "@/app/helpers/orderFormatter";
import { ORDERS_LIST_STATUS_CONFIG } from "@/app/constants/orderDetails";
import type { AdminOrder, OrderStatus } from "@/app/types/order";
import Img from "../../global/Img";
import { BsEye } from "react-icons/bs";
import LocaleLink from "../../global/LocaleLink";

interface OrdersTableRowProps {
  order: AdminOrder;
  onViewOrder?: (orderId: string) => void;
}

// Map API status to translation key
const STATUS_KEY_MAP: Record<OrderStatus, string> = {
  pending: "pending",
  paid: "paid",
  in_progress: "inProgress",
  completed: "completed",
  cancelled: "cancelled",
};

export function OrdersTableRow({ order, onViewOrder }: OrdersTableRowProps) {
  const t = useTranslation("OrdersPage");
  const statusConfig =
    ORDERS_LIST_STATUS_CONFIG[order.status] ||
    ORDERS_LIST_STATUS_CONFIG.pending;
  const translationStatusKey = STATUS_KEY_MAP[order.status] || "pending";

  // Get status label from translations with proper typing
  const statusLabel =
    translationStatusKey in (t.status ?? {})
      ? (t.status as Record<string, string>)[translationStatusKey]
      : order.status.replace("_", " ");

  return (
    <tr className="hover:bg-surface-50/50 transition-colors">
      {/* Order ID */}
      <td className="px-4 py-3">
        <span className="text-sm font-mono font-bold text-primary">
          {order.id
            ? order.id.slice(0, 8).toUpperCase()
            : t.fallback?.na || "N/A"}
        </span>
      </td>

      {/* User */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2.5">
          {order.user.avatar ? (
            <Img
              src={order.user.avatar}
              alt=""
              className="w-8 h-8 rounded-full object-cover ring-2 ring-surface-100"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-surface-100 flex items-center justify-center">
              <span className="text-xs font-bold text-surface-500">
                {order.user.name?.[0]?.toUpperCase() || "U"}
              </span>
            </div>
          )}
          <div>
            <p className="text-sm font-bold text-surface-800">
              {order.user.name || t.fallback?.unknown || "Unknown"}
            </p>
            <p className="text-xs text-surface-500">{order.user.email}</p>
          </div>
        </div>
      </td>

      {/* Service */}
      <td className="px-4 py-3">
        <div>
          <p className="text-sm font-medium text-surface-800">
            {order.service.title}
          </p>
          <p className="text-xs text-surface-500 truncate max-w-[150px]">
            {order.service.shortDescription}
          </p>
        </div>
      </td>

      {/* Amount */}
      <td className="px-4 py-3">
        <span className="text-sm font-bold text-surface-800 tabular-nums">
          {formatCurrency(order.amount, order.currency)}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusConfig.bg} ${statusConfig.text}`}
        >
          {statusLabel}
        </span>
      </td>

      {/* Date */}
      <td className="px-4 py-3">
        <span className="text-xs text-surface-500">
          {formatDate(order.createdAt)}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <LocaleLink
          href={`/dashboard/orders/${order.id}`}
          className="p-2 w-fit text-surface-500 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
          aria-label={t.actions?.viewOrder || "View order"}
        >
          <BsEye />
        </LocaleLink>
      </td>
    </tr>
  );
}
