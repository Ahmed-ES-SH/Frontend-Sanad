"use client";

import { motion } from "framer-motion";

export function LoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 bg-linear-to-b from-white/60 to-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl"
    >
      <motion.div
        className="flex flex-col items-center gap-4 px-8 py-6 bg-white/90 rounded-2xl shadow-xl border border-stone-100"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="relative">
          <div className="w-12 h-12 border-4 border-orange-200 rounded-full" />
          <motion.div
            className="absolute inset-0 w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <p className="text-sm font-semibold text-stone-700">
          Loading articles...
        </p>
        <div className="flex gap-1">
          <motion.div
            className="w-1.5 h-1.5 bg-orange-500 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-1.5 h-1.5 bg-orange-500 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-1.5 h-1.5 bg-orange-500 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}