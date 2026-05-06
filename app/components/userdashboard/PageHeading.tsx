"use client";

import { motion } from "framer-motion";
import type { PageHeadingProps } from "./PageHeading.types";

const PageHeading: React.FC<PageHeadingProps> = ({ title, description, isRTL }) => {
  return (
    <div className="space-y-2">
      <motion.h1
        initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl md:text-4xl font-extrabold text-surface-900 tracking-tight font-display"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="text-surface-500 text-lg max-w-2xl font-body"
      >
        {description}
      </motion.p>
    </div>
  );
};

export default PageHeading;