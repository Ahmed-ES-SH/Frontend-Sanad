// ============================================================================
// ORDER HEADER COMPONENT - Page header with actions
// ============================================================================

"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { AdminOrder, OrderStatus } from "@/app/types/order";
import { motion } from "framer-motion";
import { FiPrinter, FiCheckCircle } from "react-icons/fi";

interface OrderHeaderProps {
  order: AdminOrder;
  statusSelect?: OrderStatus | "";
  onStatusChange?: (status: OrderStatus) => void;
  onStatusUpdate?: () => void;
  isUpdatingStatus?: boolean;
}

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const statusOptions: OrderStatus[] = [
  "pending",
  "paid",
  "in_progress",
  "completed",
  "cancelled",
];

const statusLabels: Record<OrderStatus, string> = {
  pending: "Pending",
  paid: "Paid",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

function formatDate(dateString: string): string {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function OrderHeader({
  order,
  statusSelect = "",
  onStatusChange,
  onStatusUpdate,
  isUpdatingStatus = false,
}: OrderHeaderProps) {
  const t = useTranslation("orderDetails");

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10"
    >
      <div>
        <motion.div variants={item} className="flex items-center gap-3 mb-2">
          <span className="caption text-primary font-bold uppercase tracking-widest bg-primary/5 px-2 py-1 rounded">
            {t.orderCase}
          </span>
          <span className="w-1 h-1 rounded-full bg-surface-300" />
          <span className="caption text-surface-500">
            {formatDate(order.createdAt)}
          </span>
        </motion.div>
        <motion.h1
          variants={item}
          className="display-sm text-surface-900 uppercase  text-2xl font-bold "
        >
          {order.id}
        </motion.h1>
      </div>

      <motion.div
        variants={item}
        className="flex flex-wrap gap-3 w-full lg:w-auto"
      >
        {/* Status Update Section */}
        <div className="flex flex-wrap gap-2 flex-1 lg:flex-none">
          {onStatusChange && onStatusUpdate ? (
            <>
              <select
                value={statusSelect}
                onChange={(e) => onStatusChange(e.target.value as OrderStatus)}
                className="px-3 py-2 border border-surface-200 rounded-lg text-sm bg-surface-card-bg text-surface-900 focus:border-primary focus:ring-2 focus:ring-primary/20"
                disabled={isUpdatingStatus}
              >
                <option value="">Select...</option>
                {statusOptions.map((opt) => (
                  <option key={opt} value={opt} disabled={opt === order.status}>
                    {statusLabels[opt]}
                  </option>
                ))}
              </select>
              <button
                onClick={onStatusUpdate}
                disabled={
                  !statusSelect ||
                  statusSelect === order.status ||
                  isUpdatingStatus
                }
                className="surface-btn-primary px-4 py-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-primary-sm"
              >
                {isUpdatingStatus ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin block" />
                ) : (
                  <FiCheckCircle className="w-4 h-4" />
                )}
                {t.updateStatus}
              </button>
            </>
          ) : (
            <button className="surface-btn-primary px-6 py-2.5 flex items-center justify-center gap-2 flex-1 lg:flex-none shadow-primary-sm">
              <FiCheckCircle className="w-4 h-4" />
              {t.updateStatus}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
