"use client";
import { useTranslation } from "@/app/hooks/useTranslation";
import { motion } from "framer-motion";

interface Props {
  locale: "en" | "ar";
  projectCount: number;
}

export default function PortfolioHero({ locale, projectCount }: Props) {
  const isRTL = locale === "ar";
  const t = useTranslation("portfolioPage");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24">
      {/* Dynamic Mesh Background */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-80">
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-mesh-1)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-mesh-2)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-mesh-3)" }}
        />
      </div>

      <div className="c-container relative z-10 px-4">
        <motion.div
          className="max-w-4xl mx-auto flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Projects Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <div
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border shadow-surface-sm"
              style={{
                backgroundColor: "var(--surface-card-bg)",
                borderColor: "var(--surface-200)",
              }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: "var(--primary)" }}
                ></span>
                <span
                  className="relative inline-flex rounded-full h-2.5 w-2.5"
                  style={{ backgroundColor: "var(--primary)" }}
                ></span>
              </span>
              <span
                className="font-semibold text-sm sm:text-base"
                style={{ color: "var(--primary)" }}
              >
                {projectCount}
              </span>
              <span
                className="font-medium text-sm sm:text-base"
                style={{ color: "var(--surface-600)" }}
              >
                {t.projectsDelivered}
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="display-xl font-display mb-6 tracking-tight"
            style={{ color: "var(--surface-900)" }}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {t.heroTitle}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="body-lg max-w-2xl mb-10"
            style={{ color: "var(--surface-500)" }}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {t.heroDescription}
          </motion.p>

          {/* Decorative Divider */}
          <motion.div
            variants={itemVariants}
            className="w-20 h-1.5 rounded-full shadow-surface-sm"
            style={{ background: "var(--gradient-primary)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
