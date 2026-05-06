// ============================================================================
// ORDER PROGRESS CARD COMPONENT - Progress stepper with title
// ============================================================================

"use client";

import { motion } from "framer-motion";
import { FiTruck } from "react-icons/fi";

import { StatusStepper } from "./StatusStepper";
import { useTranslation } from "@/app/hooks/useTranslation";

interface OrderProgressCardProps {
  currentStatus: string;
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

export function OrderProgressCard({ currentStatus }: OrderProgressCardProps) {
  const t = useTranslation("orderDetails");

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="surface-card p-6 mb-8 overflow-hidden"
    >
      <motion.h3
        variants={item}
        className="heading-sm text-surface-900 mb-2 flex items-center gap-2"
      >
        <FiTruck className="text-primary" />
        {t.orderProgress}
      </motion.h3>
      <StatusStepper currentStatus={currentStatus} />
    </motion.div>
  );
}
