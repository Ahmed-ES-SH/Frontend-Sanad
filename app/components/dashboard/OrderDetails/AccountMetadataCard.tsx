// ============================================================================
// ACCOUNT METADATA CARD COMPONENT - Account-related metadata display
// ============================================================================

"use client";

import { motion } from "framer-motion";
import { FiUserCheck, FiShield, FiFileText, FiMail } from "react-icons/fi";

import { MetaItem } from "./MetaItem";
import { useTranslation } from "@/app/hooks/useTranslation";
import type { AdminOrder } from "@/app/types/order";

interface AccountMetadataCardProps {
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

export function AccountMetadataCard({
  order,
}: AccountMetadataCardProps) {
  const t = useTranslation("orderDetails");

  const accountManager = order?.user?.name || "—";
  const email = order?.user?.email || "—";
  const userId = order?.userId ? `#${order.userId}` : "—";

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
        {t.accountMetadata}
      </motion.h3>
      <motion.div variants={item} className="space-y-1">
        <MetaItem
          icon={<FiUserCheck />}
          label={t.accountManager}
          value={accountManager}
        />
        <MetaItem
          icon={<FiMail />}
          label="Email"
          value={email}
        />
        <MetaItem
          icon={<FiShield />}
          label="User ID"
          value={userId}
        />
      </motion.div>
    </motion.div>
  );
}