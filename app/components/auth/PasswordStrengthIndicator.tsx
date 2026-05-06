"use client";
import React from "react";
import { FiCheck, FiX } from "react-icons/fi";

interface Props {
  password: string;
  locale: "en" | "ar";
}

const translations = {
  en: {
    length: "At least 8 characters",
    lowercase: "Contains a lowercase letter",
    uppercase: "Contains an uppercase letter",
    number: "Contains a number",
    weak: "Weak",
    fair: "Fair",
    good: "Good",
    strong: "Strong",
  },
  ar: {
    length: "8 أحرف على الأقل",
    lowercase: "يحتوي على حرف صغير",
    uppercase: "يحتوي على حرف كبير",
    number: "يحتوي على رقم",
    weak: "ضعيفة",
    fair: "مقبولة",
    good: "جيدة",
    strong: "قوية",
  },
};

function PasswordStrengthIndicator({ password, locale }: Props) {
  const t = translations[locale];
  const isRTL = locale === "ar";

  if (!password) return null;

  const checks = [
    { label: t.length, met: password.length >= 8 },
    { label: t.lowercase, met: /[a-z]/.test(password) },
    { label: t.uppercase, met: /[A-Z]/.test(password) },
    { label: t.number, met: /\d/.test(password) },
  ];

  const metCount = checks.filter((c) => c.met).length;
  const strengthLevel = metCount <= 1 ? 0 : metCount === 2 ? 1 : metCount === 3 ? 2 : 3;
  const strengthLabels = [t.weak, t.fair, t.good, t.strong];
  const strengthColors = [
    "var(--accent-rose)",
    "var(--accent-amber)",
    "var(--primary)",
    "var(--accent-emerald)",
  ];

  return (
    <div className="space-y-2" dir={isRTL ? "rtl" : "ltr"}>
      {/* Strength bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex gap-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  i <= strengthLevel ? strengthColors[strengthLevel] : "var(--surface-200)",
              }}
            />
          ))}
        </div>
        <span
          className="text-xs font-medium whitespace-nowrap"
          style={{ color: strengthColors[strengthLevel] }}
        >
          {strengthLabels[strengthLevel]}
        </span>
      </div>

      {/* Requirements checklist */}
      <ul className="space-y-1">
        {checks.map((check, index) => (
          <li
            key={index}
            className="flex items-center gap-1.5 text-xs transition-colors duration-200"
            style={{ color: check.met ? "var(--surface-600)" : "var(--surface-400)" }}
          >
            {check.met ? (
              <FiCheck size={12} style={{ color: "var(--accent-emerald)" }} />
            ) : (
              <FiX size={12} />
            )}
            <span>{check.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PasswordStrengthIndicator;
