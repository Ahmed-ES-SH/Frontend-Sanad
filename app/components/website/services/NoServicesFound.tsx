"use client";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { useTranslation } from "@/app/hooks/useTranslation";

export default function NoServicesFound({ locale }: { locale: string }) {
  const t = useTranslation("servicesComponents");

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="col-span-full py-20 flex flex-col items-center justify-center text-center"
    >
      <div className="w-16 h-16 rounded-full bg-surface-100 flex items-center justify-center mb-6">
        <FiArrowUpRight className="size-8 text-surface-400 rotate-45" />
      </div>
      <h3 className="text-xl font-bold text-surface-900 mb-2">
        {t.noSolutionsFound}
      </h3>
      <p className="text-surface-500 max-w-xs">
        {t.tryDifferentCategory}
      </p>
    </motion.div>
  );
}
