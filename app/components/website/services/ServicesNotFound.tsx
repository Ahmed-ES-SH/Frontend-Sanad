"use client";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslation";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiHome,
  FiHeadphones,
  FiAlertCircle,
  FiArrowRight,
  FiArrowLeft,
} from "react-icons/fi";
import {
  containerVariants,
  floatingAnimation,
  iconVariants,
  itemVariants,
} from "@/app/constants/animations";
import LocaleLink from "../../global/LocaleLink";

export default function ServicesNotFound() {
  const locale = useLocale();
  const t = useTranslation("servicesNotFound");
  const tComponents = useTranslation("servicesComponents");
  const isRTL = locale === "ar";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex items-center justify-center p-4">
      <motion.div
        className="max-w-2xl w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated Illustration */}
        <motion.div className="relative mb-8" variants={itemVariants}>
          <motion.div
            className="relative mx-auto w-64 h-64"
            animate={floatingAnimation}
          >
            {/* Circle background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full" />

            {/* Main icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              variants={iconVariants}
              whileHover="hover"
            >
              <div className="relative">
                <FiSearch className="text-8xl text-primary" />
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <FiAlertCircle className="text-3xl text-red-500" />
                </motion.div>
              </div>
            </motion.div>

            {/* Decorative dots */}
            {[...Array(8)].map((_, index) => (
              <motion.div
                key={index}
                className="absolute w-3 h-3 bg-primary/30 rounded-full"
                style={{
                  top: `${50 + 40 * Math.sin((index * Math.PI) / 4)}%`,
                  left: `${50 + 40 * Math.cos((index * Math.PI) / 4)}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div className="space-y-6" variants={containerVariants}>
          {/* Title */}
          <motion.h1
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent"
            variants={itemVariants}
          >
            {t.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg mx-auto"
            variants={itemVariants}
          >
            {t.description}
          </motion.p>

          {/* Suggestion */}
          <motion.p
            className="text-md text-gray-500 dark:text-gray-400"
            variants={itemVariants}
          >
            {t.suggestion}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
            variants={itemVariants}
          >
            <LocaleLink href="/">
              <motion.button
                className="group px-8 py-3 bg-primary text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isRTL ? (
                  <>
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span>{t.backToHome}</span>
                    <FiHome />
                  </>
                ) : (
                  <>
                    <FiHome />
                    <span>{t.backToHome}</span>
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </LocaleLink>

            <LocaleLink href="/support">
              <motion.button
                className="group px-8 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiHeadphones className="group-hover:animate-bounce" />
                <span>{t.contactSupport}</span>
              </motion.button>
            </LocaleLink>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            className="mt-8 p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FiAlertCircle />
              </motion.div>
              <span>{tComponents.errorCode}</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
