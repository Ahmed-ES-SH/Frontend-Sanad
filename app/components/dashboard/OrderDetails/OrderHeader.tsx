// ============================================================================
// ORDER HEADER COMPONENT - Page header with actions
// ============================================================================

"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { AdminOrder } from "@/app/types/order";
import { motion } from "framer-motion";
import { FiPrinter, FiCheckCircle } from "react-icons/fi";

interface OrderHeaderProps {
  order: AdminOrder;
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

export function OrderHeader({ order }: OrderHeaderProps) {
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
          <span className="caption text-surface-500">{order.createdAt}</span>
        </motion.div>
        <motion.h1
          variants={item}
          className="display-sm text-surface-900 font-display"
        >
          {order.id}
        </motion.h1>
      </div>

      <motion.div
        variants={item}
        className="flex flex-wrap gap-3 w-full lg:w-auto"
      >
        <button className="surface-btn-secondary px-5 py-2.5 flex items-center justify-center gap-2 flex-1 lg:flex-none">
          <FiPrinter className="w-4 h-4" />
          {t.invoice}
        </button>
        <button className="surface-btn-primary px-6 py-2.5 flex items-center justify-center gap-2 flex-1 lg:flex-none shadow-primary-sm">
          <FiCheckCircle className="w-4 h-4" />
          {t.updateStatus}
        </button>
      </motion.div>
    </motion.div>
  );
}
