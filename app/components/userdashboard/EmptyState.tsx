"use client";

import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import type { EmptyStateProps } from "./EmptyState.types";

const EmptyState: React.FC<EmptyStateProps> = ({ title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <div className="w-20 h-20 rounded-full bg-surface-100 flex items-center justify-center mb-6">
        <FiSearch className="text-surface-400 text-3xl" />
      </div>
      <h3 className="text-xl font-bold text-surface-900 font-display mb-2">
        {title}
      </h3>
      <p className="text-surface-500 font-body text-center max-w-sm">
        {description}
      </p>
    </motion.div>
  );
};

export default EmptyState;