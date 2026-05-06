"use client";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { useLocale } from "@/app/hooks/useLocale";
import { useState } from "react";
import { FAQItem as FAQItemType } from "@/app/types/contact";

interface props {
  item: FAQItemType;
  index: number;
}

export default function FAQItem({ item, index }: props) {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-surface-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-5 text-left flex items-center justify-between hover:bg-surface-50 transition-colors duration-200"
        whileHover={{ backgroundColor: "var(--surface-50)" }}
      >
        <h3 className="heading-sm font-display text-surface-900 pr-4">
          {item.question[locale]}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <FiChevronDown
            className={`w-5 h-5 ${isOpen ? "text-primary" : "text-surface-400"}`}
          />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // ease-out-expo
            className="overflow-hidden"
          >
            <div className="px-8 pb-6">
              <p className="body text-surface-600 leading-relaxed">
                {item.answer[locale]}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
