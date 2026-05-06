"use client";

import { motion } from "framer-motion";
import { HiOutlineDocumentText, HiOutlinePlus } from "react-icons/hi";
import LocaleLink from "../../../global/LocaleLink";

interface EmptyStateProps {
  t: any;
}

export function EmptyState({ t }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6">
        <HiOutlineDocumentText className="text-4xl text-orange-400" />
      </div>
      <h3 className="text-xl font-bold text-stone-900 mb-2">
        {t.noArticlesTitle}
      </h3>
      <p className="text-stone-500 text-center mb-6 max-w-md">
        {t.noArticlesDesc}
      </p>
      <LocaleLink
        href="/dashboard/blog/create"
        className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30"
      >
        <HiOutlinePlus className="text-xl" />
        {t.createFirstPost}
      </LocaleLink>
    </motion.div>
  );
}