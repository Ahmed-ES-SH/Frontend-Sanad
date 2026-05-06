"use client";

import { motion } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";
import { useTranslation } from "@/app/hooks/useTranslation";
import LocaleLink from "../../global/LocaleLink";

export default function QuickStartBanner() {
  const t = useTranslation("UserDashboard.QuickStart");

  return (
    <motion.section
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
      className="surface-card border-s-4 border-s-primary"
    >
      <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-surface-900 mb-1">{t.title}</h3>
          <p className="text-sm text-surface-400">{t.description}</p>
        </div>
        <LocaleLink
          href={"/services"}
          className="surface-btn-primary flex items-center gap-1 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={t.cta}
        >
          {t.cta}{" "}
          <FiChevronRight
            size={16}
            className="rtl:rotate-180 transition-transform"
          />
        </LocaleLink>
      </div>
    </motion.section>
  );
}
