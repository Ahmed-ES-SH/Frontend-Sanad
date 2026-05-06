"use client";
import { Messages } from "@/app/hooks/useTranslation";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

interface SubmittedMessageProps {
  t: Messages["contactPage"];
}

export default function SubmittedMessage({ t }: SubmittedMessageProps) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-surface-md p-10 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="w-20 h-20 bg-accent-emerald/10 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <FiCheck className="w-10 h-10 text-accent-emerald" />
      </motion.div>
      <h3 className="heading-lg font-display text-surface-900 mb-3">
        {t.messageSend}
      </h3>
      <p className="body text-surface-600">{t.thanksMessage}</p>
    </motion.div>
  );
}
