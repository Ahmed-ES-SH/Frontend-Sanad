"use client";
import { useTranslation } from "@/app/hooks/useTranslation";
import { motion } from "framer-motion";
import { FiLoader } from "react-icons/fi";

export default function LoadingBlogSpinner() {
  const t = useTranslation("blogPage");
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-[50vh] py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="mb-4"
      >
        <FiLoader className="size-12 text-blue-600" />
      </motion.div>
      <motion.p
        className="text-gray-600 font-medium"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {t.loadingText}
      </motion.p>
    </motion.div>
  );
}
