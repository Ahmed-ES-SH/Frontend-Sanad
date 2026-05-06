"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function TechBadge({ tool, index }: { tool: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10, scale: 0.92 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.35,
        delay: index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        className="px-5 py-2.5 rounded-full text-sm font-medium cursor-default transition-all duration-200 
                   hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:bg-primary-50
                   focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
        style={{
          background: "var(--surface-card-bg)",
          border: "1px solid var(--surface-card-border)",
          color: "var(--surface-700)",
        }}
        tabIndex={0}
      >
        {tool}
      </div>
    </motion.div>
  );
}
