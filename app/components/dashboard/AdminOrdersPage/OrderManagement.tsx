"use client";

import { useEffect, useState } from "react";

import { OrderStatus } from "@/app/types/order";
import Image from "next/image";
import { useUpdateOrderStatus } from "@/app/hooks/useUpdateOrderStatus";
import { useAddOrderUpdate } from "@/app/hooks/useAddOrderUpdate";
import { useAdminOrderById } from "@/app/hooks/useAdminOrderById";

// Status badge configuration
const statusConfig: Record<
  OrderStatus,
  { bg: string; text: string; label: string }
> = {
  pending: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    label: "Pending",
  },
  paid: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    label: "Paid",
  },
  in_progress: {
    bg: "bg-orange-100",
    text: "text-orange-700",
    label: "In Progress",
  },
  completed: {
    bg: "bg-green-100",
    text: "text-green-700",
    label: "Completed",
  },
  cancelled: {
    bg: "bg-red-100",
    text: "text-red-700",
    label: "Cancelled",
  },
};

const statusOptions: OrderStatus[] = [
  "pending",
  "paid",
  "in_progress",
  "completed",
  "cancelled",
];

// Format currency
function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);
}

// Format date
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface OrderManagementProps {
  orderId: string;
  onBack?: () => void;
}

export function OrderManagement({ orderId, onBack }: OrderManagementProps) {
  const { order, isLoading, error, fetchOrder } = useAdminOrderById(orderId);
  const updateStatusHook = useUpdateOrderStatus();
  const addUpdateHook = useAddOrderUpdate();

  const [newStatus, setNewStatus] = useState<OrderStatus | "">("");
  const [updateContent, setUpdateContent] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isAddingUpdate, setIsAddingUpdate] = useState(false);

  useEffect(() => {
    fetchOrder(orderId);
  }, [orderId, fetchOrder]);

  useEffect(() => {
    const handleNewStatus = (state: OrderStatus) => {
      setNewStatus(state);
    };

    if (order) {
      handleNewStatus(order.status);
    }
  }, [order]);

  const handleStatusUpdate = async () => {
    if (!newStatus || newStatus === order?.status) return;

    setIsUpdatingStatus(true);
    const result = await updateStatusHook.updateStatus(orderId, newStatus);
    setIsUpdatingStatus(false);

    if (result.success) {
      fetchOrder(orderId);
    } else {
      alert(result.message || "Failed to update status");
    }
  };

  const handleAddUpdate = async () => {
    if (!updateContent.trim()) return;

    setIsAddingUpdate(true);
    const result = await addUpdateHook.addUpdate(orderId, updateContent.trim());
    setIsAddingUpdate(false);

    if (result.success) {
      setUpdateContent("");
      fetchOrder(orderId);
    } else {
      alert(result.message || "Failed to add update");
    }
  };

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
        <p className="text-red-600">{error || "Order not found"}</p>
        {onBack && (
          <button
            onClick={onBack}
            className="mt-4 text-sm text-indigo-600 hover:text-indigo-700"
          >
            Go Back
          </button>
        )}
      </div>
    );
  }

  const status = statusConfig[order.status] || statusConfig.pending;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          {onBack && (
            <button
              onClick={onBack}
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
              Back to Orders
            </button>
          )}
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Order #{order.id.slice(0, 8)}
          </p>
        </div>
        <span
          className={`px-3 py-1.5 rounded-full text-sm font-medium ${status.bg} ${status.text}`}
        >
          {status.label}
        </span>
      </div>

      {/* Order Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* User Info */}
        <div className="p-4 bg-white rounded-xl border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Customer</h3>
          <div className="flex items-center gap-3">
            {order.user.avatar && (
              <Image
                src={order.user.avatar}
                alt={order.user.name || ""}
                className="w-10 h-10 rounded-full"
              />
            )}
            <div>
              <p className="font-medium text-gray-900">
                {order.user.name || "Unknown"}
              </p>
              <p className="text-sm text-gray-500">{order.user.email}</p>
            </div>
          </div>
        </div>

        {/* Service Info */}
        <div className="p-4 bg-white rounded-xl border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Service</h3>
          <p className="font-medium text-gray-900">{order.service.title}</p>
          <p className="text-sm text-gray-500 mt-1">
            {order.service.shortDescription}
          </p>
        </div>

        {/* Payment Info */}
        <div className="p-4 bg-white rounded-xl border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Payment</h3>
          <p className="font-medium text-gray-900">
            {formatCurrency(order.amount, order.currency)}
          </p>
          {order.payment && (
            <p className="text-sm text-gray-500 mt-1">
              {order.payment.status} — {formatDate(order.payment.createdAt)}
            </p>
          )}
          {!order.payment && (
            <p className="text-sm text-gray-500 mt-1">No payment yet</p>
          )}
        </div>
      </div>

      {/* Notes */}
      {order.notes && (
        <div className="p-4 bg-gray-50 rounded-xl">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Customer Notes
          </h3>
          <p className="text-gray-700">{order.notes}</p>
        </div>
      )}

      {/* Update Status */}
      <div className="p-4 bg-white rounded-xl border border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 mb-3">
          Update Status
        </h3>
        <div className="flex gap-3">
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          >
            <option value="">Select status...</option>
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>
                {statusConfig[opt].label}
              </option>
            ))}
          </select>
          <button
            onClick={handleStatusUpdate}
            disabled={
              !newStatus || newStatus === order.status || isUpdatingStatus
            }
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isUpdatingStatus ? "Updating..." : "Update"}
          </button>
        </div>
      </div>

      {/* Add Timeline Update */}
      <div className="p-4 bg-white rounded-xl border border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 mb-3">
          Add Timeline Update
        </h3>
        <textarea
          value={updateContent}
          onChange={(e) => setUpdateContent(e.target.value)}
          rows={3}
          maxLength={2000}
          placeholder="Add a progress update or note..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 resize-none"
        />
        <div className="flex justify-between items-center mt-3">
          <span className="text-xs text-gray-500">
            {updateContent.length}/2000
          </span>
          <button
            onClick={handleAddUpdate}
            disabled={!updateContent.trim() || isAddingUpdate}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isAddingUpdate ? "Adding..." : "Add Update"}
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="p-4 bg-white rounded-xl border border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Timeline</h3>
        <div className="space-y-4">
          {order.updates.map((update) => (
            <div key={update.id} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                {update.author === "admin" ? (
                  <svg
                    className="w-4 h-4 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 capitalize">
                    {update.author}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(update.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{update.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
