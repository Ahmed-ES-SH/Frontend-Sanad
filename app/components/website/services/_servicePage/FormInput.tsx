"use client";
import { motion } from "framer-motion";

interface props {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  multiline?: boolean;
  placeholder?: string;
}

// Form Input Component
export default function FormInput({
  label,
  type = "text",
  value,
  onChange,
  error,
  required,
  multiline,
  placeholder,
}: props) {
  const inputClasses = `surface-input w-full ${
    error ? "border-red-500 bg-red-50/50" : ""
  }`;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-surface-700 font-display">
        {label} {required && <span className="text-accent-rose">*</span>}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className={inputClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${label}-error` : undefined}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${label}-error` : undefined}
        />
      )}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm"
          id={`${label}-error`}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
