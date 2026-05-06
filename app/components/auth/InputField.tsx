"use client";
import React from "react";
import { motion } from "framer-motion";
import { FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";
import { ChangeEvent, ReactNode } from "react";
import { useTranslation } from "@/app/hooks/useTranslation";

interface InputFieldProps {
  label?: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  icon?: ReactNode;
  placeholder?: string;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  showPassword?: boolean;
  autoComplete?: string;
}

function InputField(props: InputFieldProps) {
  const {
    label,
    type,
    name,
    value,
    onChange,
    error,
    icon,
    placeholder,
    showPasswordToggle,
    onTogglePassword,
    showPassword,
    autoComplete,
  } = props;
  const authT = useTranslation("auth");

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium"
          style={{ color: "var(--surface-700)" }}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <div
          className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none"
          style={{ color: "var(--surface-400)" }}
        >
          {icon}
        </div>
        <input
          id={name}
          name={name}
          type={
            showPasswordToggle ? (showPassword ? "text" : "password") : type
          }
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="block w-full ps-10 pe-12 py-2.5 rounded-lg shadow-sm transition-all duration-200 placeholder-[color:var(--surface-400)]"
          style={{
            backgroundColor: "var(--surface-input-bg)",
            borderColor: error ? "var(--accent-rose)" : "var(--surface-input-border)",
            color: "var(--surface-900)",
          }}
          onFocus={(e) => {
            if (!error) {
              e.target.style.borderColor = "var(--primary)";
              e.target.style.boxShadow = "0 0 0 3px rgba(249, 115, 22, 0.15)";
            }
          }}
          onBlur={(e) => {
            if (!error) {
              e.target.style.borderColor = "var(--surface-input-border)";
              e.target.style.boxShadow = "none";
            }
          }}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        {showPasswordToggle && onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute inset-y-0 end-0 pe-3 flex items-center transition-colors duration-150"
            style={{ color: "var(--surface-400)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--surface-600)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--surface-400)")
            }
            aria-label={showPassword ? authT.hidePassword : authT.showPassword}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1.5 text-sm"
          style={{ color: "var(--accent-rose)" }}
          id={`${name}-error`}
          role="alert"
        >
          <FiAlertCircle size={14} />
          <span>{error}</span>
        </motion.div>
      )}
    </div>
  );
}

export default InputField;
