// ============================================================================
// SERVICE OVERVIEW CARD COMPONENT - Main service details section
// ============================================================================

"use client";

import { motion } from "framer-motion";
import {
  FiFileText,
  FiShield,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

import Img from "@/app/components/global/Img";
import { StatusBadge } from "./StatusBadge";
import { AdminOrder } from "@/app/types/order";
import { useTranslation } from "@/app/hooks/useTranslation";

interface ServiceOverviewCardProps {
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

export function ServiceOverviewCard({ order }: ServiceOverviewCardProps) {
  const t = useTranslation("orderDetails");

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="surface-card overflow-hidden"
    >
      <motion.div
        variants={item}
        className="p-6 border-b border-surface-100 bg-surface-50/30 flex justify-between items-center"
      >
        <h2 className="heading-md text-surface-900 flex items-center gap-3">
          <FiFileText className="text-primary" />
          {t.serviceOverview}
        </h2>
        <StatusBadge status={order.status} />
      </motion.div>

      <motion.div variants={item} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Customer Info */}
          <div>
            <label className="caption-xs text-surface-400 uppercase tracking-widest mb-4 block">
              {t.customerEntity}
            </label>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-50 border border-surface-100">
              <Img
                alt={order.user.name || ""}
                src={order.user.avatar || ""}
                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div>
                <p className="heading-sm text-surface-900 leading-tight">
                  {order.user.name}
                </p>
                <p className="body-sm text-surface-500">{order.user.email}</p>
                <button className="text-primary caption font-bold mt-1 hover:underline">
                  {t.viewProfile}
                </button>
              </div>
            </div>
          </div>

          {/* Service Info */}
          <div>
            <label className="caption-xs text-surface-400 uppercase tracking-widest mb-4 block">
              {t.subscriptionDetails}
            </label>
            <div className="space-y-4">
              <div>
                <p className="heading-md text-surface-900 font-display">
                  {order.service.title}
                </p>
                <p className="body-sm text-primary font-medium flex items-center gap-1.5 mt-1">
                  <FiShield className="w-3.5 h-3.5" />
                  {"subscriptionType"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <motion.div
          variants={item}
          className="mt-10 pt-8 border-t border-surface-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-4 rounded-xl border border-surface-100 shadow-surface-sm">
              <p className="caption text-surface-400 mb-1">{t.totalPayable}</p>
              <div className="flex items-baseline gap-1">
                <span className="heading-xl text-surface-900">
                  ${order.amount}
                </span>
                <span className="caption text-surface-500 font-bold">
                  {order.currency}
                </span>
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col justify-center space-y-3">
              <div className="flex justify-between items-center px-2">
                <span className="body-sm text-surface-500">
                  {t.transactionId}
                </span>
                <span className="body-sm font-mono text-surface-900 bg-surface-100 px-2 py-0.5 rounded">
                  {order.paymentId}
                </span>
              </div>
              <div className="flex justify-between items-center px-2">
                <span className="body-sm text-surface-500">
                  {t.paymentStatus}
                </span>
                <span className="body-sm font-bold text-accent-emerald flex items-center gap-1.5">
                  <FiCheckCircle /> {t.verified}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Internal Context */}
        {order.notes && (
          <motion.div
            variants={item}
            className="mt-8 p-5 rounded-xl bg-accent-amber/5 border border-accent-amber/10"
          >
            <p className="caption-xs text-accent-amber font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <FiAlertCircle className="w-3.5 h-3.5" />
              {t.operatorContext}
            </p>
            <p className="body-sm text-surface-700 leading-relaxed italic">
              {`"${order.notes}"`}
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
