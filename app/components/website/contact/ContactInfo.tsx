"use client";
import { directionMap } from "@/app/constants/global";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslation";
import { motion } from "framer-motion";
import ContactInfoCard from "./ContactInfoCard";
import { contactInfoData } from "@/app/constants/contact";

export default function ContactInfo() {
  const locale = useLocale();
  const t = useTranslation("contactPage");
  return (
    <motion.div
      dir={directionMap[locale]}
      className="space-y-8"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="mb-10">
        <h2 className="heading-lg font-display text-surface-900 mb-3">
          {t.contactTitle}
        </h2>
        <p className="body text-surface-600">{t.contactHelperText}</p>
      </div>

      <div className="space-y-6">
        {contactInfoData.map((info, index) => (
          <ContactInfoCard
            key={`${info.title.en} + ${index}`}
            info={info}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
}
