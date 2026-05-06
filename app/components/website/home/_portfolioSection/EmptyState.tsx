"use client";
import { useTranslation } from "@/app/hooks/useTranslation";
import { motion } from "framer-motion";
import { FiInbox, FiRefreshCw } from "react-icons/fi";

interface EmptyStateProps {
  onReset: () => void;
}

/**
 * Displayed when no projects match the selected category.
 * Provides a call-to-action to reset filters.
 */
const EmptyState = ({ onReset }: EmptyStateProps) => {
  const t = useTranslation("portfolioSection");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="col-span-full"
    >
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="relative mb-6">
          {/* Subtle background glow for the icon */}
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl" />
          <div className="relative bg-surface-50 rounded-full p-6 border border-surface-200">
            <FiInbox className="w-12 h-12 text-surface-400" />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-surface-800 mb-2">
          {t.noProjectsFound}
        </h3>

        <p className="text-surface-500 max-w-md mb-6">
          {t.noProjectsDescription}
        </p>

        {/* Reset filter button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-full font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
        >
          <FiRefreshCw className="w-4 h-4" />
          <span>{t.viewAllProjects}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EmptyState;
