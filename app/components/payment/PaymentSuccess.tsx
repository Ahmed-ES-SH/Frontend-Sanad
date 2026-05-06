"use client";

import { motion } from "framer-motion";

interface PaymentSuccessProps {
  title: string;
  description: string;
  buttonText: string;
  onClose: () => void;
}

export function PaymentSuccess({
  title,
  description,
  buttonText,
  onClose,
}: PaymentSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
        <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
        <svg
          className="w-10 h-10 text-emerald-600 relative z-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-stone-900 mb-2 font-display">
        {title}
      </h3>
      <p className="text-stone-500 font-medium">{description}</p>
      <button
        onClick={onClose}
        className="mt-8 w-full py-3.5 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-colors shadow-surface-sm"
      >
        {buttonText}
      </button>
    </motion.div>
  );
}
