"use client";

import { motion } from "framer-motion";
import { FiCheckCircle, FiCreditCard, FiTrendingDown } from "react-icons/fi";
import Tooltip from "./Tooltip";

interface SecondaryMetricsProps {
  netVolume: number;
  currency: string;
  processingFeePercent: number;
  status: "success" | "pending" | "failed" | "refunded";
  method: {
    brand: string;
    last4: string;
  };
}

const metricVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export default function SecondaryMetrics({
  netVolume,
  currency,
  processingFeePercent,
  status,
  method,
}: SecondaryMetricsProps) {
  const formattedNetVolume = netVolume.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
      variants={{
        visible: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {/* Net Volume */}
      <motion.div
        className="bg-white p-5 rounded-xl border border-stone-200"
        variants={metricVariants}
      >
        <div className="flex items-center gap-2 mb-2">
          <FiTrendingDown size={14} className="text-stone-400" />
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 flex items-center gap-1">
            Net Volume
            <Tooltip text="Amount after processing fees are deducted" />
          </p>
        </div>
        <p className="text-lg font-bold text-stone-900">
          {formattedNetVolume}{" "}
          <span className="text-sm font-medium text-stone-500">{currency}</span>
        </p>
        <p className="text-[10px] text-orange-600 font-semibold mt-1">
          After {processingFeePercent}% Processing Fee
        </p>
      </motion.div>

      {/* Status */}
      <motion.div
        className="bg-white p-5 rounded-xl border border-stone-200"
        variants={metricVariants}
      >
        <div className="flex items-center gap-2 mb-2">
          <FiCheckCircle size={14} className="text-stone-400" />
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Status
          </p>
        </div>
        <div
          className={`flex items-center gap-2 font-semibold text-sm ${
            status === "success"
              ? "text-emerald-600"
              : status === "pending"
                ? "text-amber-600"
                : status === "failed"
                  ? "text-red-600"
                  : "text-stone-600"
          }`}
          role="status"
          aria-label={`Payment status: ${status}`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              status === "success"
                ? "bg-emerald-500"
                : status === "pending"
                  ? "bg-amber-500 animate-pulse"
                  : status === "failed"
                    ? "bg-red-500"
                    : "bg-stone-500"
            }`}
            aria-hidden="true"
          />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      </motion.div>

      {/* Method */}
      <motion.div
        className="bg-white p-5 rounded-xl border border-stone-200"
        variants={metricVariants}
      >
        <div className="flex items-center gap-2 mb-2">
          <FiCreditCard size={14} className="text-stone-400" />
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Payment Method
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-6 bg-stone-100 rounded border border-stone-200 flex items-center justify-center overflow-hidden">
            <FiCreditCard size={14} className="text-stone-500" />
          </div>
          <p className="text-stone-900 font-semibold text-sm">
            {method.brand}{" "}
            <span className="text-stone-500 font-medium">
              •••• {method.last4}
            </span>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
