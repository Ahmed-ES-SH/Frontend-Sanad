"use client";

import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import type { StatusStepProps } from "./StatusStep.types";

/**
 * Status step component for progress tracker
 * Displays completed, current, or pending status
 */
const StatusStep: React.FC<StatusStepProps> = ({ step, isRtl }) => {
  return (
    <div className="relative flex flex-col items-center gap-3 group">
      <div className="relative">
        {step.isCurrent && (
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20"
            animate={{ scale: [1, 1.35, 1], opacity: [0.45, 0, 0.45] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
        <div
          className={`relative w-11 h-11 rounded-full flex items-center justify-center ring-4 ring-surface-50 transition-all duration-300 ${
            step.isCompleted || step.isCurrent
              ? "bg-primary text-white"
              : "bg-surface-200 text-surface-500"
          }`}
          role="status"
          aria-label={`${step.label}${step.isCompleted ? " - completed" : step.isCurrent ? " - current step" : ""}`}
        >
          {step.isCompleted ? (
            <FiCheck className="w-5 h-5" />
          ) : step.isCurrent ? (
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 opacity-50"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
            </svg>
          )}
        </div>
      </div>
      <span
        className={`text-xs font-semibold tracking-wide transition-colors duration-200 ${
          step.isCurrent
            ? "text-primary"
            : step.isCompleted
              ? "text-surface-700"
              : "text-surface-400"
        }`}
      >
        {step.label}
      </span>
    </div>
  );
};

export default StatusStep;