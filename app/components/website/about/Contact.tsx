"use client";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { directionMap } from "@/app/constants/global";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslation";

import LocaleLink from "../../global/LocaleLink";
import AnimatedSection from "./AnimatedSection";

export default function Contact() {
  const locale = useLocale();
  const t = useTranslation("contactAbout");
  return (
    <>
      {/* Contact CTA Section */}
      <section
        dir={directionMap[locale]}
        className="py-20 relative overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="container mx-auto px-6 lg:text-center">
          <AnimatedSection>
            <h2
              className="lg:text-4xl text-xl font-bold mb-6"
              style={{ color: "var(--surface-900)" }}
            >
              {t.title}
            </h2>
            <p
              className="text-[14px] mb-8 max-w-2xl mx-auto"
              style={{ color: "var(--surface-600)" }}
            >
              {t.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(99, 102, 241, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <LocaleLink
                  href={`/contact`}
                  className="surface-btn-primary px-8 py-4 text-lg inline-flex"
                >
                  <FaEnvelope />
                  {t.getFreeQuote}
                </LocaleLink>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LocaleLink
                  href={`/contact`}
                  className="surface-btn-secondary px-8 py-4 text-lg inline-flex"
                >
                  <FaPhone />
                  {t.scheduleCall}
                </LocaleLink>
              </motion.div>
            </div>

            <div
              className="flex justify-center flex-wrap max-md:items-start max-lg:flex-col gap-8 text-sm"
              style={{ color: "var(--surface-500)" }}
            >
              <div className="flex items-center gap-2">
                <FaEnvelope />
                info@Sanad.tech
              </div>
              <div className="flex items-center gap-2">
                <FaPhone />
                +20 100 123 4567
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt />
                Cairo, Egypt
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
