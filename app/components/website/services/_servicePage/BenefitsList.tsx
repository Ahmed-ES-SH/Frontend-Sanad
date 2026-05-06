"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import type { Messages } from "@/app/hooks/useTranslation";

type ServicePageMsgs = Messages["servicePage"];

interface BenefitsListProps {
  benefits: {
    en: string[];
    ar: string[];
  };
  local: "en" | "ar";
  translations: ServicePageMsgs;
}

export default function BenefitsList({ benefits, local, translations }: BenefitsListProps) {
  const servicePage = translations;
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="surface-card-subtle p-8 h-full bg-gradient-surface"
    >
      <h3 className="heading-sm text-primary font-display mb-6">
        {servicePage.benefits}
      </h3>
      <ul className="space-y-5">
        {benefits[local].map((benefit, index) => (
          <li key={index} className="flex gap-4 items-start group">
            <div className="mt-1 w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full bg-accent-emerald text-white shadow-sm transition-transform group-hover:scale-110">
              <FaCheckCircle className="text-sm" />
            </div>
            <span className="text-surface-700 body-lg font-medium">
              {benefit}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
