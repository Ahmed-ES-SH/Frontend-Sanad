"use client";
import { useLocale } from "@/app/hooks/useLocale";
import { ContactInfo } from "@/app/types/contact";
import { motion } from "framer-motion";

interface ContactInfoCardProps {
  info: ContactInfo;
  index: number;
}

export default function ContactInfoCard({ info, index }: ContactInfoCardProps) {
  const locale = useLocale();
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-surface-sm hover:shadow-surface-md transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start gap-5">
        <div className="flex-shrink-0 w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center text-primary shadow-sm">
          {info.icon}
        </div>
        <div>
          <h3 className="heading-sm font-display text-surface-900 mb-2">
            {info.title[locale]}
          </h3>
          <div className="space-y-1">
            {info.details.map((detail, idx) => (
              <p key={idx} className="body-sm text-surface-600">
                {detail}
              </p>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
