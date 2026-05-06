"use client";
import { directionMap } from "@/app/constants/global";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslation";
import { motion } from "framer-motion";
import LocaleLink from "../../global/LocaleLink";
import Image from "next/image";
import { useAuthStore } from "@/app/store/AuthSlice";

export default function Hero_section() {
  const locale = useLocale();
  const { user } = useAuthStore();
  const t = useTranslation("hero");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <div
      id="main-content"
      dir={directionMap[locale]}
      className="relative w-full min-h-[100dvh]  flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-surface-50"
    >
      {/* Premium Background Treatment */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,var(--primary-100),transparent_70%)] opacity-40" />
        <div className="absolute inset-0 bg-[url('/big-wave.png')] bg-repeat opacity-[0.03] mix-blend-overlay" />
      </div>

      <motion.div
        className="c-container relative z-10 flex flex-col items-center text-center max-w-5xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 mb-8 px-4 py-2 surface-card-subtle rounded-full border-surface-200"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-[10px] lg:text-xs font-bold tracking-[0.2em] uppercase text-surface-600">
            {t.digital_transformation}
          </span>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4 mb-8">
          <h1 className="text-[2.75rem] lg:text-[5.5rem] font-black leading-[1.05] text-surface-900 tracking-tight">
            {t.title1}{" "}
            <span className="text-primary italic font-serif px-2">
              {t.solutions}
            </span>
            <br />
            {t.forYour}
          </h1>
          <p className="text-lg lg:text-xl text-surface-600 max-w-2xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-6 pt-4"
        >
          {!user && (
            <LocaleLink
              href={"/signup"}
              className="surface-btn-primary min-h-[56px] px-10 text-lg shadow-button hover:shadow-button-hover"
            >
              {t.join}
            </LocaleLink>
          )}

          <div className="flex -space-x-3 rtl:space-x-reverse">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm"
              >
                <Image
                  src={`/avatar-${i}.jpg`}
                  className="w-full h-full object-cover"
                  alt="User"
                  width={100}
                  height={100}
                  priority
                />
              </div>
            ))}
            <div className="flex flex-col items-start ms-4 rtl:items-end rtl:me-4 text-start rtl:text-end">
              <span className="text-xs font-bold text-surface-900">
                500+ {t.clients}
              </span>
              <span className="text-[10px] text-surface-500">
                {t.trust_our_expertise}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-3"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-surface-400 [writing-mode:vertical-lr]">
          SCROLL
        </span>
        <div className="w-px h-12 bg-linear-to-b from-primary to-transparent" />
      </motion.div>
    </div>
  );
}
