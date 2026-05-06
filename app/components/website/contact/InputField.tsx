"use client";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { itemVariants } from "./ContactPage";

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  icon: React.ReactNode;
  placeholder: string;
}

export default function InputField({
  label,
  type,
  name,
  value,
  onChange,
  error,
  icon,
  placeholder,
}: InputFieldProps) {
  return (
    <motion.div className="space-y-2" variants={itemVariants}>
      <label
        htmlFor={name}
        className="block body-sm font-medium text-surface-700"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-surface-400">
          {icon}
        </div>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full body pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200 ${
            error
              ? "border-accent-rose bg-accent-rose/5"
              : "border-surface-200 hover:border-surface-300 bg-white"
          }`}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            className="text-accent-rose caption flex items-center gap-1 mt-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <FiAlertCircle size={14} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
