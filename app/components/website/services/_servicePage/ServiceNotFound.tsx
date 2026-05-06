"use client";

import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { useTranslation } from "@/app/hooks/useTranslation";
import LocaleLink from "@/app/components/global/LocaleLink";

export default function ServiceNotFound() {
  const { title, message, backToServices } = useTranslation(
    "servicePage.serviceNotFound",
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center space-y-6 surface-card p-8 rounded-2xl shadow-surface-md"
      >
        <div className="flex justify-center">
          <div
            className="p-4 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "rgba(249, 115, 22, 0.1)",
              color: "var(--primary, #f97316)",
            }}
          >
            <FiSearch className="w-12 h-12" />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-stone-900 font-display">
            {title}
          </h2>
          <p className="text-stone-600">{message}</p>
        </div>

        <div className="pt-4">
          <LocaleLink
            href={`/services`}
            className="surface-btn-primary inline-flex items-center justify-center px-6 py-3 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
          >
            {backToServices}
          </LocaleLink>
        </div>
      </motion.div>
    </div>
  );
}
