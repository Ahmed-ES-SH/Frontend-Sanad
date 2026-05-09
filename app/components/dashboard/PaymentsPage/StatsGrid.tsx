"use client";

import { motion } from "framer-motion";
import {
  FiDollarSign,
  FiCheckCircle,
  FiClock,
  FiRefreshCw,
  FiXCircle,
  FiAlertCircle,
} from "react-icons/fi";

interface StatsGridProps {
  total: number;
  succeeded: number;
  pending: number;
  refunded: number;
  failed: number;
  partiallyRefunded: number;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const statsConfig = [
  { key: "total" as const, label: "Total", icon: FiDollarSign, color: "orange", bg: "bg-orange-50", iconColor: "text-orange-600" },
  { key: "succeeded" as const, label: "Succeeded", icon: FiCheckCircle, color: "emerald", bg: "bg-emerald-50", iconColor: "text-emerald-600" },
  { key: "pending" as const, label: "Pending", icon: FiClock, color: "blue", bg: "bg-blue-50", iconColor: "text-blue-600" },
  { key: "refunded" as const, label: "Refunded", icon: FiRefreshCw, color: "amber", bg: "bg-amber-50", iconColor: "text-amber-600" },
  { key: "failed" as const, label: "Failed", icon: FiXCircle, color: "red", bg: "bg-red-50", iconColor: "text-red-600" },
  { key: "partiallyRefunded" as const, label: "Partially Refunded", icon: FiAlertCircle, color: "purple", bg: "bg-purple-50", iconColor: "text-purple-600" },
];

export default function StatsGrid({
  total,
  succeeded,
  pending,
  refunded,
  failed,
  partiallyRefunded,
}: StatsGridProps) {
  const statsProps = { total, succeeded, pending, refunded, failed, partiallyRefunded };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {statsConfig.map((stat) => (
        <motion.div
          key={stat.key}
          variants={item}
          className="bg-white p-5 rounded-xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className={`p-2 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-stone-500 uppercase tracking-wider">
              {stat.label}
            </p>
            <h3 className="text-2xl font-bold text-stone-900 mt-1">
              {statsProps[stat.key]}
            </h3>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}