// ============================================================================
// LOGISTICS METADATA CARD COMPONENT - Logistics-related metadata display
// ============================================================================

"use client";

import { motion } from "framer-motion";
import { FiClock, FiCalendar, FiFileText } from "react-icons/fi";

import { MetaItem } from "./MetaItem";
import { useTranslation } from "@/app/hooks/useTranslation";
import type { AdminOrder } from "@/app/types/order";

interface LogisticsMetadataCardProps {
  order?: AdminOrder;
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

function formatDate(dateString: string): string {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function LogisticsMetadataCard({
  order,
}: LogisticsMetadataCardProps) {
  const t = useTranslation("orderDetails");

  const createdAt = order?.createdAt ? formatDate(order.createdAt) : "—";
  const updatedAt = order?.updatedAt ? formatDate(order.updatedAt) : "—";
  const notes = order?.notes || "—";

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="surface-card p-6"
    >
      <motion.h3
        variants={item}
        className="heading-sm text-surface-900 mb-4 border-b border-surface-100 pb-3"
      >
        {t.logisticsContext}
      </motion.h3>
      <motion.div variants={item} className="space-y-1">
        <MetaItem
          icon={<FiCalendar />}
          label="Created"
          value={createdAt}
        />
        <MetaItem
          icon={<FiClock />}
          label="Last Updated"
          value={updatedAt}
        />
        <MetaItem
          icon={<FiFileText />}
          label="Notes"
          value={notes}
        />
      </motion.div>
    </motion.div>
  );
}