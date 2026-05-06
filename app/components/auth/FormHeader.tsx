"use client";
import React from "react";
import { motion } from "framer-motion";

interface FormHeaderProps {
  title: string;
  subtitle?: string;
}

function FormHeader(props: FormHeaderProps) {
  const { title, subtitle } = props;

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="text-center space-y-2 mb-6"
    >
      <h1
        className="text-3xl font-bold font-display"
        style={{ color: "var(--surface-900)" }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className="text-base"
          style={{ color: "var(--surface-500)" }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

export default FormHeader;
