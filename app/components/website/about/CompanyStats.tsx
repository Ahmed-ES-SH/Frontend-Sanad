"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { motion } from "framer-motion";
import { useRef } from "react";
import { AnimatedCounter } from "../../global/AnimatedCounter";
import { useLocale } from "@/app/hooks/useLocale";
import { stats } from "@/app/constants/AboutStats";

export default function CompanyStats() {
  const locale = useLocale();
  const t = useTranslation("companyStats");
  const ref = useRef(null);

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl font-bold mb-4"
            style={{ color: "var(--surface-900)" }}
          >
            {t.title}
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto mb-16"
            style={{ color: "var(--surface-500)" }}
          >
            {t.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {stats.map(
            ({ icon, label, targetNumber, colorClass, suffix }, idx) => (
              <motion.div
                key={idx}
                className="group surface-card-subtle p-8 hover:shadow-lg transition-all duration-300 cursor-default"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15 * idx,
                  duration: 0.5,
                }}
              >
                <div
                  className="mb-6 mx-auto w-fit p-4 rounded-full transition-colors duration-300"
                  style={{
                    backgroundColor: "var(--surface-100)",
                    color: colorClass.includes("blue")
                      ? "var(--accent-cyan)"
                      : colorClass.includes("red")
                        ? "var(--accent-rose)"
                        : colorClass.includes("yellow")
                          ? "var(--accent-amber)"
                          : "var(--accent-emerald)",
                  }}
                >
                  {icon}
                </div>

                <div className="mb-4">
                  <AnimatedCounter
                    targetNumber={targetNumber}
                    start={true}
                    suffix={suffix}
                  />
                </div>

                <p
                  className="font-semibold text-lg text-center"
                  style={{ color: "var(--surface-600)" }}
                >
                  {label[locale]}
                </p>
              </motion.div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
