"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function RevealSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-px w-8" style={{ backgroundColor: "var(--primary)" }} />
      <span
        className="caption-xs font-bold uppercase tracking-[0.12em]"
        style={{ color: "var(--primary)" }}
      >
        {label}
      </span>
    </div>
  );
}
