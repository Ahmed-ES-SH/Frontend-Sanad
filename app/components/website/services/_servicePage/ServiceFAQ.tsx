"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Locale } from "@/app/types/global";
import { FAQ } from "@/app/types/service";
import type { Messages } from "@/app/hooks/useTranslation";

type ServicePageMsgs = Messages["servicePage"];

interface ServiceFAQProps {
  faq?: FAQ[];
  locale: Locale;
  translations: ServicePageMsgs;
}

export default function ServiceFAQ({
  faq,
  locale,
  translations,
}: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faq || faq.length === 0) return null;

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
            FAQ
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-primary to-accent-amber" />
        </div>
        <h2 className="display-sm md:display-md text-surface-900 font-display mb-4">
          {translations.frequentlyAsked}
        </h2>
        <p className="body-lg text-surface-500 max-w-2xl mx-auto">
          {translations.faqDescription}
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faq.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="surface-card overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 md:p-8 text-left"
              aria-expanded={openIndex === index}
            >
              <h3 className="heading-sm text-surface-900 font-display pr-4">
                {item.question[locale]}
              </h3>
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  openIndex === index
                    ? "bg-gradient-primary text-white"
                    : "bg-surface-100 text-surface-500"
                }`}
              >
                {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
              </div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8">
                    <div className="h-px w-full bg-surface-200 mb-4" />
                    <p className="body-lg text-surface-600 leading-relaxed">
                      {item.answer[locale]}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
