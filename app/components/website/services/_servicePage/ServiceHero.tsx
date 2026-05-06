"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiArrowDown } from "react-icons/fi";
import { Locale } from "@/app/types/global";
import { ServiceStats } from "@/app/types/service";
import type { Messages } from "@/app/hooks/useTranslation";

type ServicePageMsgs = Messages["servicePage"];
import LocaleLink from "@/app/components/global/LocaleLink";

interface ServiceHeroProps {
  title: { en: string; ar: string };
  smallDesc: { en: string; ar: string };
  image: string;
  category?: string;
  stats?: ServiceStats[];
  locale: Locale;
  translations: ServicePageMsgs;
}

const categoryLabels: Record<string, { en: string; ar: string }> = {
  development: { en: "Development", ar: "التطوير" },
  marketing: { en: "Marketing", ar: "التسويق" },
  design: { en: "Design", ar: "التصميم" },
  "data-security": { en: "Data & Security", ar: "البيانات والأمان" },
};

export default function ServiceHero({
  title,
  smallDesc,
  image,
  category,
  stats,
  locale,
  translations,
}: ServiceHeroProps) {
  const isArabic = locale === "ar";
  const localizedCategoryLabel: string | null = category
    ? (translations.category &&
        (translations.category as Record<string, string>)[category]) ||
      (categoryLabels[category] ? categoryLabels[category][locale] : null) ||
      null
    : null;

  return (
    <section className="c-container mx-auto px-4 pt-8 md:pt-12 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="surface-card-elevated overflow-hidden"
      >
        <div className="grid grid-cols-1 xl:grid-cols-12 min-h-[480px] md:min-h-[520px]">
          {/* Content Side */}
          <div
            className={`lg:col-span-7 p-8 md:p-12 lg:p-14 flex flex-col justify-center ${isArabic ? "lg:order-2" : ""}`}
          >
            {/* Breadcrumb */}
            <nav
              className="flex items-center gap-2 mb-6"
              aria-label="Breadcrumb"
            >
              <LocaleLink
                href="/services"
                className="body-sm text-surface-400 hover:text-primary transition-colors"
              >
                {translations.breadcrumbServices}
              </LocaleLink>
              {localizedCategoryLabel && (
                <>
                  <span className="text-surface-300">
                    {isArabic ? (
                      <FiChevronLeft className="w-3.5 h-3.5" />
                    ) : (
                      <FiChevronRight className="w-3.5 h-3.5" />
                    )}
                  </span>
                  <span className="body-sm text-surface-500">
                    {localizedCategoryLabel}
                  </span>
                </>
              )}
            </nav>

            {/* Category Badge */}
            {localizedCategoryLabel && (
              <motion.div
                initial={{ opacity: 0, x: isArabic ? 10 : -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="mb-5"
              >
                <span className="surface-badge">{localizedCategoryLabel}</span>
              </motion.div>
            )}

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.25,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="display-lg text-surface-900 font-display leading-[1.1] tracking-[-0.03em] mb-5"
            >
              {title[locale]}
            </motion.h1>

            {/* Lead Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[1.1rem] md:text-[1.2rem] leading-[1.7] text-surface-600 font-normal max-w-xl mb-8"
            >
              {smallDesc[locale]}
            </motion.p>

            {/* Inline Stats Bar */}
            {stats && stats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex items-center gap-0 mb-8 border-t border-b border-surface-200 py-5"
              >
                {stats.map((stat, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <div className="w-px h-10 bg-surface-200" />}
                    <div className="flex-1 px-4 first:pl-0 last:pr-0">
                      <p className="display-sm text-surface-900 font-display leading-none mb-1.5">
                        {stat.value}
                      </p>
                      <p className="caption text-surface-500 uppercase tracking-wider">
                        {stat.label[locale]}
                      </p>
                    </div>
                  </React.Fragment>
                ))}
              </motion.div>
            )}

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.6,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-wrap items-center gap-3"
            >
              <a href="#order-section" className="surface-btn-primary">
                <span>{translations.heroOrderService}</span>
                <FiArrowDown className="text-sm" />
              </a>
              <LocaleLink
                href="/services"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-surface-600 hover:text-primary hover:bg-primary-50 transition-all duration-300 font-display body-sm"
              >
                {isArabic ? (
                  <FiChevronRight className="w-4 h-4" />
                ) : (
                  <FiChevronLeft className="w-4 h-4" />
                )}
                <span>{translations.heroAllServices}</span>
              </LocaleLink>
            </motion.div>
          </div>

          {/* Image Side */}
          <div
            className={`xl:col-span-5 relative overflow-hidden ${isArabic ? "xl:order-1" : ""}`}
          >
            <div className="absolute inset-0 bg-surface-100" />
            <div className="relative w-full h-full min-h-[280px] md:min-h-[360px] xl:min-h-full">
              <Image
                src={image}
                alt={title[locale]}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
