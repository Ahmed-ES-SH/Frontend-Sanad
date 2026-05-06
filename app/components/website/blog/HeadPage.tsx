// Header Component
"use client";

import { motion } from "framer-motion";

export default function BlogHeadPage() {
  return (
    <motion.header
      className="text-center py-20 bg-surface-50 border-b border-surface-200 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent-amber rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Sanad Insights
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-display font-extrabold text-surface-900 mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Knowledge to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-amber">
            Empower
          </span>{" "}
          Your Business
        </motion.h1>

        <motion.p
          className="text-lg text-surface-600 max-w-2xl mx-auto font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Expert perspectives on digital transformation, SME growth, and
          technical excellence in the MENA region.
        </motion.p>
      </div>
    </motion.header>
  );
}
