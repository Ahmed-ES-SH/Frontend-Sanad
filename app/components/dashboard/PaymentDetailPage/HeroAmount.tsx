"use client";

import { motion } from "framer-motion";

interface HeroAmountProps {
  amount: number;
  currency: string;
  status: "success" | "pending" | "failed" | "refunded";
}

const statusBorderColors: Record<string, string> = {
  success: "border-emerald-400",
  pending: "border-amber-400",
  failed: "border-red-400",
  refunded: "border-stone-400",
};

const statusBgTints: Record<string, string> = {
  success: "bg-emerald-50/50",
  pending: "bg-amber-50/50",
  failed: "bg-red-50/50",
  refunded: "bg-stone-100/50",
};

export default function HeroAmount({
  amount,
  currency,
  status,
}: HeroAmountProps) {
  const formattedAmount = amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl border-l-4 ${statusBorderColors[status]} ${statusBgTints[status]} bg-white p-6 md:p-8`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
    >
      {/* Subtle background pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">
          Transaction Amount
        </p>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight">
            {formattedAmount}
          </span>
          <span className="text-lg font-semibold text-stone-400">
            {currency}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
