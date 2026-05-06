"use client";
import { motion } from "framer-motion";
import { useTranslation } from "@/app/hooks/useTranslation";
import { FaSearch } from "react-icons/fa";

export default function NoPostsFound() {
  const t = useTranslation("noArticles");
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-[50vh] p-10 bg-surface-card border border-surface-200 rounded-2xl text-surface-600 shadow-surface-sm"
    >
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <FaSearch className="text-3xl text-primary" />
      </div>
      <h3 className="text-2xl font-display font-bold text-surface-900 mb-2">
        {t.title}
      </h3>
      <p className="text-center text-surface-500 max-w-sm font-medium">
        {t.message}
      </p>
    </motion.div>
  );
}
