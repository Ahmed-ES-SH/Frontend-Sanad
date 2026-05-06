"use client";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "./ContactPage";
import FAQItem from "./FAQItem";
import { faqData } from "@/app/constants/faqData";
import { useTranslation } from "@/app/hooks/useTranslation";

export default function FAQSection() {
  const t = useTranslation("contactPage");
  return (
    <motion.section
      className="w-full max-w-4xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="text-center mb-16" variants={itemVariants}>
        <h2 className="display-sm font-display text-surface-900 mb-4">
          {t.faqTitle}
        </h2>
        <p className="body text-surface-600 max-w-2xl mx-auto">
          {t.faqDescription}
        </p>
      </motion.div>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <FAQItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </motion.section>
  );
}
