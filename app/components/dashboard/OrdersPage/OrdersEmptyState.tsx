"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/app/hooks/useTranslation";

export function OrdersEmptyState() {
  const emptyTitle = useTranslation("ordersList.emptyTitle");
  const emptyDescription = useTranslation("ordersList.emptyDescription");
  const browseServicesLabel = useTranslation("ordersList.browseServices");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12 px-6 bg-gray-50 rounded-xl border border-gray-200"
    >
      <svg
        className="w-12 h-12 text-gray-400 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {emptyTitle}
      </h3>
      <p className="text-gray-500 mb-6">
        {emptyDescription}
      </p>
      <Link
        href="/services"
        className="inline-flex px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        {browseServicesLabel}
      </Link>
    </motion.div>
  );
}

OrdersEmptyState.displayName = "OrdersEmptyState";