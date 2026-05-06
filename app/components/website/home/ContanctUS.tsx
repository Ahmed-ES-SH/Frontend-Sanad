"use client";
import { motion, useReducedMotion } from "framer-motion";
import ContactForm from "./ContactForm";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslation";
import { directionMap } from "@/app/constants/global";
import Img from "../../global/Img";

export default function ContactUS() {
  const locale = useLocale();
  const t = useTranslation("contactusSection");
  const shouldReduceMotion = useReducedMotion();
  const isRTL = locale === "ar";

  return (
    <section
      id="contactus"
      dir={directionMap[locale]}
      className="page-bg relative py-16 lg:py-24"
    >
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="c-container">
        <div className="max-w-2xl mb-12">
          <motion.h2
            initial={{
              opacity: 0,
              x: shouldReduceMotion ? 0 : isRTL ? 30 : -30,
            }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[2.25rem] lg:text-[3.5rem] font-bold text-surface-900 leading-[1.15] tracking-tight mb-4"
          >
            {t.contactUs}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[1.125rem] text-surface-600 leading-relaxed"
          >
            {t.description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-0 surface-card-elevated overflow-hidden border-none shadow-surface-xl">
          {/* Left Image Section */}
          <div className="lg:col-span-2 relative overflow-hidden h-[300px] lg:h-auto">
            <Img
              src="/contact-bg.jpg"
              alt={t.imageAlt}
              className="w-full h-full object-cover grayscale-20 brightness-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
            <div className="absolute inset-0 bg-linear-to-t from-surface-900/60 to-transparent" />
          </div>

          {/* Form Section */}
          <div className="lg:col-span-3 p-6 lg:p-12 relative bg-white/40 backdrop-blur-sm">
            <ContactForm t={t} shouldReduceMotion={shouldReduceMotion} />
          </div>
        </div>
      </div>
    </section>
  );
}
