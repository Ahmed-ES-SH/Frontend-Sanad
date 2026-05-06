"use client";

import { motion } from "framer-motion";

interface QuickActionsProps {
  onAddClick: () => void;
}

export function QuickActions({ onAddClick }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onAddClick}
        className="cursor-pointer surface-card p-4 md:p-6 rounded-xl flex items-center gap-3 md:gap-4 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 shadow-surface-md"
      >
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <div className="min-w-0">
          <h3 className="text-base md:text-lg font-semibold text-surface-900 truncate">Add New Category</h3>
          <p className="text-xs md:text-sm text-surface-500 hidden sm:block">Create a new service/project category</p>
        </div>
      </motion.div>

      <div className="surface-card p-4 md:p-6 rounded-xl flex items-center gap-3 md:gap-4 border border-surface-200 shadow-surface-sm">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-cyan-50 text-cyan-500 flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div className="min-w-0">
          <h3 className="text-xs md:text-sm text-surface-500 hidden sm:block">Total Categories</h3>
          <p className="text-xl md:text-2xl font-bold text-surface-900">24</p>
        </div>
      </div>

      <div className="surface-card p-4 md:p-6 rounded-xl flex items-center gap-3 md:gap-4 border border-surface-200 shadow-surface-sm sm:col-span-2 lg:col-span-1">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <div className="min-w-0">
          <h3 className="text-xs md:text-sm text-surface-500 hidden sm:block">Active Usage</h3>
          <p className="text-xl md:text-2xl font-bold text-surface-900">1,248 items</p>
        </div>
      </div>
    </div>
  );
}
