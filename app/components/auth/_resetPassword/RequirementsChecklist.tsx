import React from "react";
import { FiCheckCircle, FiCircle } from "react-icons/fi";
import { Messages } from "@/app/hooks/useTranslation";

interface RequirementsChecklistProps {
  t: Messages["resetPassword"];
  passwordRequirements: {
    length: boolean;
    numberAndSpecial: boolean;
    match: boolean;
  };
}

export default function RequirementsChecklist({
  t,
  passwordRequirements,
}: RequirementsChecklistProps) {
  return (
    <div
      className="rounded-xl p-4 border"
      style={{
        backgroundColor: "var(--surface-input-bg)",
        borderColor: "var(--surface-input-border)",
      }}
    >
      <ul className="space-y-2">
        <li
          className="flex items-center gap-3 text-xs"
          style={{ color: "var(--surface-600)" }}
        >
          {passwordRequirements.length ? (
            <FiCheckCircle size={16} className="text-primary" />
          ) : (
            <FiCircle size={16} style={{ color: "var(--surface-300)" }} />
          )}
          <span>{t.requirements.minChars}</span>
        </li>
        <li
          className="flex items-center gap-3 text-xs"
          style={{ color: "var(--surface-600)" }}
        >
          {passwordRequirements.numberAndSpecial ? (
            <FiCheckCircle size={16} className="text-primary" />
          ) : (
            <FiCircle size={16} style={{ color: "var(--surface-300)" }} />
          )}
          <span>{t.requirements.numberAndSpecial}</span>
        </li>
        <li
          className="flex items-center gap-3 text-xs"
          style={{ color: "var(--surface-600)" }}
        >
          {passwordRequirements.match ? (
            <FiCheckCircle size={16} className="text-primary" />
          ) : (
            <FiCircle size={16} style={{ color: "var(--surface-300)" }} />
          )}
          <span>{t.requirements.mustMatch}</span>
        </li>
      </ul>
    </div>
  );
}
