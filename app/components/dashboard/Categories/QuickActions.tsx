"use client";

import { motion } from "framer-motion";
import { FiPlus, FiActivity, FiTrendingUp } from "react-icons/fi";

interface QuickActionsProps {
  onAddClick: () => void;
}

export function QuickActions({ onAddClick }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onAddClick}
        className="cursor-pointer surface-card p-4 md:p-6 rounded-xl flex items-center gap-3 md:gap-4 bg-linear-to-r from-orange-50 to-amber-50 border border-orange-200 shadow-surface-md"
      >
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <FiPlus className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className="min-w-0">
          <h3 className="text-base md:text-lg font-semibold text-surface-900 truncate">
            Add New Category
          </h3>
          <p className="text-xs md:text-sm text-surface-500 hidden sm:block">
            Create a new service/project category
          </p>
        </div>
      </motion.div>

      <div className="surface-card p-4 md:p-6 rounded-xl flex items-center gap-3 md:gap-4 border border-surface-200 shadow-surface-sm">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-cyan-50 text-cyan-500 flex items-center justify-center shrink-0">
          <FiActivity className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className="min-w-0">
          <h3 className="text-xs md:text-sm text-surface-500 hidden sm:block">
            Total Categories
          </h3>
          <p className="text-xl md:text-2xl font-bold text-surface-900">24</p>
        </div>
      </div>

      <div className="surface-card p-4 md:p-6 rounded-xl flex items-center gap-3 md:gap-4 border border-surface-200 shadow-surface-sm sm:col-span-2 lg:col-span-1">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
          <FiTrendingUp className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className="min-w-0">
          <h3 className="text-xs md:text-sm text-surface-500 hidden sm:block">
            Active Usage
          </h3>
          <p className="text-xl md:text-2xl font-bold text-surface-900">
            1,248 items
          </p>
        </div>
      </div>
    </div>
  );
}
