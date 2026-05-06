"use client";
import React from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/app/hooks/useLocale";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { ReactNode } from "react";

interface SubmitButtonProps {
  isLoading: boolean;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

function SubmitButton(props: SubmitButtonProps) {
  const { isLoading, children, onClick, disabled } = props;
  const locale = useLocale();
  const isRTL = locale === "ar";

  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      whileHover={isDisabled ? {} : { scale: 1.01 }}
      whileTap={isDisabled ? {} : { scale: 0.98 }}
      onClick={onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className="w-full flex items-center mt-4 justify-center gap-2 py-3 px-4 rounded-lg font-medium text-base transition-all duration-200"
      style={{
        background: isDisabled
          ? "var(--surface-300)"
          : "var(--gradient-primary)",
        color: "white",
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.7 : 1,
        boxShadow: isDisabled ? "none" : "0 4px 16px rgba(249, 115, 22, 0.3)",
      }}
      onMouseEnter={(e) => {
        if (!isDisabled) {
          e.currentTarget.style.background = "var(--gradient-primary-hover)";
          e.currentTarget.style.boxShadow =
            "0 8px 24px rgba(249, 115, 22, 0.4)";
          e.currentTarget.style.transform = "translateY(-1px)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isDisabled) {
          e.currentTarget.style.background = "var(--gradient-primary)";
          e.currentTarget.style.boxShadow =
            "0 4px 16px rgba(249, 115, 22, 0.3)";
          e.currentTarget.style.transform = "translateY(0)";
        }
      }}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <>
          <span>{children}</span>
          {isRTL ? <FiArrowLeft /> : <FiArrowRight />}
        </>
      )}
    </motion.button>
  );
}

export default SubmitButton;
