// ============================================================================
// ACCOUNT METADATA CARD COMPONENT - Account-related metadata display
// ============================================================================

"use client";

import { motion } from "framer-motion";
import { FiUserCheck, FiShield, FiFileText } from "react-icons/fi";

import { MetaItem } from "./MetaItem";
import { useTranslation } from "@/app/hooks/useTranslation";

interface AccountMetadataCardProps {
  accountManager?: string;
  securityLevel?: string;
  contract?: string;
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

const defaultValues = {
  accountManager: "Mark Thompson",
  securityLevel: "Level 3 Verified",
  contract: "Annual Agreement",
};

export function AccountMetadataCard({
  accountManager = defaultValues.accountManager,
  securityLevel = defaultValues.securityLevel,
  contract = defaultValues.contract,
}: AccountMetadataCardProps) {
  const t = useTranslation("orderDetails");

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
          icon={<FiShield />}
          label={t.securityLevel}
          value={securityLevel}
        />
        <MetaItem icon={<FiFileText />} label={t.contract} value={contract} />
      </motion.div>
    </motion.div>
  );
}
