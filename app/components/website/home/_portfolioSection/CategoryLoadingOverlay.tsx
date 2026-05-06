"use client";
import { useTranslation } from "@/app/hooks/useTranslation";
import { motion } from "framer-motion";

/**
 * A backdrop overlay with a spinner to show while filtering projects by category.
 * Provides visual feedback that an action is in progress.
 */
const CategoryLoadingOverlay = () => {
  const t = useTranslation("portfolioSection");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-page-bg/50 backdrop-blur-sm z-20 flex items-center justify-center rounded-2xl"
    >
      <div className="bg-white rounded-full px-4 py-2 shadow-lg flex items-center gap-3 border border-surface-100">
        <div className="relative w-5 h-5">
          {/* Static outer ring */}
          <div className="absolute inset-0 border-2 border-primary/20 rounded-full" />
          {/* Animated spinning arc */}
          <div className="absolute inset-0 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <span className="text-sm font-medium text-surface-700">
          {t.filtering}
        </span>
      </div>
    </motion.div>
  );
};

export default CategoryLoadingOverlay;
