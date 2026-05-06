"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Locale } from "@/app/types/global";
import { ProcessStep } from "@/app/types/service";

import type { Messages } from "@/app/hooks/useTranslation";

type ServicePageMsgs = Messages["servicePage"];

interface ServiceProcessProps {
  steps?: ProcessStep[];
  locale: Locale;
  translations: ServicePageMsgs;
}

const stepIcons: Record<string, string> = {
  search: "🔍",
  plan: "📋",
  launch: "🚀",
  chart: "📊",
  idea: "💡",
  design: "🎨",
  code: "💻",
  rocket: "🚀",
  scale: "📈",
  clipboard: "📋",
  campaign: "📣",
  phone: "📱",
  star: "⭐",
  check: "✅",
  zap: "⚡",
  download: "📥",
};

export default function ServiceProcess({
  steps,
  locale,
  translations,
}: ServiceProcessProps) {
  const [activeStep, setActiveStep] = useState(0);

  if (!steps || steps.length === 0) return null;

  return (
    <section className="c-container mx-auto px-4 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 md:mb-16"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-primary to-accent-amber" />
          <span className="caption-xs font-semibold text-primary uppercase tracking-wider">
            {translations.ourProcess}
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-primary to-accent-amber" />
        </div>
        <h2 className="display-sm md:display-md text-surface-900 font-display mb-4">
          {translations.processHeading}
        </h2>
        <p className="body-lg text-surface-500 max-w-2xl mx-auto">
          {translations.processDescription}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-3">
          {steps.map((step, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-full text-left p-5 md:p-6 rounded-xl border transition-all duration-300 ${
                activeStep === index
                  ? "surface-card-elevated border-primary/20 shadow-surface-sm"
                  : "surface-card-subtle border-transparent hover:border-surface-200"
              }`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 ${
                    activeStep === index
                      ? "bg-gradient-primary shadow-lg scale-110"
                      : "bg-surface-100"
                  }`}
                >
                  {stepIcons[step.icon] || "📌"}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`heading-sm font-display transition-colors ${
                        activeStep === index
                          ? "text-primary"
                          : "text-surface-700"
                      }`}
                    >
                      {step.title[locale]}
                    </h3>
                    {activeStep === index ? (
                      <FiChevronUp className="text-primary" />
                    ) : (
                      <FiChevronDown className="text-surface-400" />
                    )}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="surface-card-elevated p-8 md:p-10 h-full flex flex-col justify-center"
            >
              <div className="text-6xl mb-6">
                {stepIcons[steps[activeStep].icon] || "📌"}
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="surface-badge">
                  {translations.step} {activeStep + 1}
                </span>
              </div>
              <h3 className="heading-lg text-surface-900 font-display mb-4">
                {steps[activeStep].title[locale]}
              </h3>
              <p className="body-lg text-surface-600 leading-relaxed">
                {steps[activeStep].description[locale]}
              </p>
              <div className="mt-8 flex gap-2">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeStep
                        ? "w-8 bg-gradient-primary"
                        : i < activeStep
                          ? "w-4 bg-primary/30"
                          : "w-4 bg-surface-200"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
