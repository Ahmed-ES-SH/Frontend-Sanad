"use client";
import React from "react";
import { motion } from "framer-motion";

interface ServiceDescriptionProps {
  smallDesc: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  local: "en" | "ar";
}

export default function ServiceDescription({
  smallDesc,
  description,
  local,
}: ServiceDescriptionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="surface-card p-8"
    >
      <p className="text-primary font-display heading-sm mb-4">
        {smallDesc[local]}
      </p>
      <p className="text-surface-600 body-lg leading-relaxed">
        {description[local]}
      </p>
    </motion.div>
  );
}
