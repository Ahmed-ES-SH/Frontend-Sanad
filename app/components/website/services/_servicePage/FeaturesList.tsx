"use client";
import React from "react";
import { motion } from "framer-motion";
import { FiLayers } from "react-icons/fi";
import type { Messages } from "@/app/hooks/useTranslation";

type ServicePageMsgs = Messages["servicePage"];

interface FeaturesListProps {
  features: {
    en: string[];
    ar: string[];
  };
  local: "en" | "ar";
  translations: ServicePageMsgs;
}

export default function FeaturesList({ features, local, translations }: FeaturesListProps) {
  const servicePage = translations;
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="surface-card-elevated p-8 h-full"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-accent-cyan/10">
          <FiLayers className="text-accent-cyan text-2xl" />
        </div>
        <h3 className="display-sm text-primary font-display">
          {servicePage.features}
        </h3>
      </div>
      <ul className="grid sm:grid-cols-2 gap-6">
        {features[local].map((feature, index) => (
          <li key={index} className="flex flex-col gap-2 p-4 rounded-xl hover:bg-white/40 transition-all group">
            <span className="text-surface-900 font-display font-semibold group-hover:text-primary transition-colors">
              {feature}
            </span>
            <div className="h-0.5 w-8 bg-accent-cyan/30 group-hover:w-full transition-all duration-300" />
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
