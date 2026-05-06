"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { motion } from "framer-motion";
import {
  HiOutlinePencilAlt,
  HiOutlineCollection,
  HiOutlineCalendar,
} from "react-icons/hi";
import LocaleLink from "../../global/LocaleLink";

export function QuickActions() {
  const t = useTranslation("BlogPage.QuickActions");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <LocaleLink href={`/dashboard/blog/add`} className="block">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-4 p-5 bg-orange-50 rounded-2xl shadow-sm border border-orange-200/20 hover:bg-orange-100 transition-all text-left group"
          aria-label={t.createNewPost}
        >
          <motion.div
            whileHover={{ rotate: 15 }}
            className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all"
          >
            <HiOutlinePencilAlt className="text-xl" />
          </motion.div>
          <div>
            <p className="font-bold text-stone-900">{t.createNewPost}</p>
            <p className="text-xs text-stone-500">{t.createNewPostDesc}</p>
          </div>
        </motion.button>
      </LocaleLink>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-stone-200/50 hover:border-amber-300/50 transition-all text-left group"
        aria-label={t.manageCategories}
      >
        <motion.div
          whileHover={{ rotate: 15 }}
          className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 group-hover:bg-amber-100 group-hover:text-amber-600 transition-all"
        >
          <HiOutlineCollection className="text-xl" />
        </motion.div>
        <div>
          <p className="font-bold text-stone-900">{t.manageCategories}</p>
          <p className="text-xs text-stone-500">{t.manageCategoriesDesc}</p>
        </div>
      </motion.button>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6, ease: [0.25, 1, 0.5, 1] }}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-stone-200/50 hover:border-amber-300/50 transition-all text-left group"
        aria-label={t.viewScheduled}
      >
        <motion.div
          whileHover={{ rotate: 15 }}
          className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 group-hover:bg-amber-100 group-hover:text-amber-600 transition-all"
        >
          <HiOutlineCalendar className="text-xl" />
        </motion.div>
        <div>
          <p className="font-bold text-stone-900">{t.viewScheduled}</p>
          <p className="text-xs text-stone-500">{t.viewScheduledDesc}</p>
        </div>
      </motion.button>
    </div>
  );
}
