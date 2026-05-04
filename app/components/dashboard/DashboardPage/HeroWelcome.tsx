"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { motion } from "framer-motion";
import { FiPlusCircle, FiDownload } from "react-icons/fi";
import LocaleLink from "../../global/LocaleLink";
import { comingSoon } from "../../userdashboard/_userDashboard/lib";

export default function HeroWelcome() {
  const t = useTranslation("DashboardPage.HeroWelcome");

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-white flex flex-col md:flex-row justify-between items-center gap-6 border border-stone-200"
    >
      <div className="relative z-10 space-y-2 text-center sm:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-stone-900">
          {t.greeting}
        </h2>
        <p className="text-stone-600 max-w-lg">{t.subtitle}</p>
        <div className="pt-4 flex max-sm:flex-col max-sm:items-start  gap-3  md:justify-start">
          <LocaleLink
            href="/dashboard/addproject"
            className="px-6 py-2.5 max-sm:w-full rounded-lg bg-orange-500 text-white text-sm font-semibold flex items-center gap-2 shadow-sm hover:bg-orange-600 transition-colors active:bg-orange-700"
          >
            <FiPlusCircle size={18} />
            {t.newProjectBtn}
          </LocaleLink>
          <button
            onClick={() => comingSoon(t.downloadReportBtn)}
            className="px-6 py-2.5 max-sm:w-full max-sm:text-left rounded-lg bg-stone-100 text-stone-700 text-sm font-semibold hover:bg-stone-200 transition-colors border border-stone-200"
          >
            <FiDownload size={16} className="inline mr-1.5" />
            {t.downloadReportBtn}
          </button>
        </div>
      </div>

      <div className="relative w-28 h-28 hidden xl:block">
        <div className="absolute inset-0 bg-orange-100 rounded-full" />
        <div className="absolute inset-3 bg-orange-200 rounded-full" />
        <div className="absolute inset-6 bg-orange-500 rounded-full flex items-center justify-center text-white">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        </div>
      </div>
    </motion.section>
  );
}
