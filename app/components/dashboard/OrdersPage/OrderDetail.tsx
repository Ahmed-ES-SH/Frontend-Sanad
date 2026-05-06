"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useOrderById } from "@/app/hooks/useOrderById";

import { OrderHeader } from "./OrderHeader";
import { OrderServiceCard } from "./OrderServiceCard";
import { OrderAmountCard } from "./OrderAmountCard";
import { OrderNotes } from "./OrderNotes";
import { TimelineItem } from "./TimelineItem";
import { OrderActions } from "./OrderActions";
import { useTranslation } from "@/app/hooks/useTranslation";

interface OrderDetailProps {
  orderId: string;
  onPayClick?: (orderId: string) => void;
}

export function OrderDetail({ orderId, onPayClick }: OrderDetailProps) {
  const orderDetail = useTranslation("orderDetail");

  const { order, isLoading, error, fetchOrder } = useOrderById(orderId);

  useEffect(() => {
    fetchOrder(orderId);
  }, [orderId, fetchOrder]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-xl">
        <p className="text-red-600">{error || orderDetail.notFound}</p>
        <Link
          href="/dashboard/orders"
          className="mt-4 inline-flex text-sm text-indigo-600 hover:text-indigo-700"
        >
          {orderDetail.backToOrders}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <OrderHeader orderId={order.id} status={order.status} />

      {/* Service & Amount */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <OrderServiceCard service={order.service} />
        <OrderAmountCard
          amount={order.amount}
          currency={order.currency}
          createdAt={order.createdAt}
        />
      </div>

      {/* Notes */}
      <OrderNotes notes={order.notes} />

      {/* Timeline / Updates */}
      <div className="p-4 bg-white rounded-xl border border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 mb-4">
          {orderDetail.timeline.title}
        </h3>
        <div className="space-y-4">
          {order.updates.map((update, index) => (
            <TimelineItem
              key={update.id}
              update={update}
              isLast={index === order.updates.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Actions */}
      {order.status === "pending" && (
        <OrderActions
          amount={order.amount}
          currency={order.currency}
          orderId={order.id}
          onPayClick={onPayClick}
        />
      )}
    </div>
  );
}
