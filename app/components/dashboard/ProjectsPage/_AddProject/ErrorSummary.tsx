"use client";

import { FiAlertCircle } from "react-icons/fi";

interface ErrorSummaryProps {
  submitErrors: string[];
}

export default function ErrorSummary({ submitErrors }: ErrorSummaryProps) {
  if (submitErrors.length === 0) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6" role="alert">
      <div className="flex items-start gap-3">
        <FiAlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
        <div>
          <h4 className="text-sm font-bold text-red-800">
            {submitErrors.length} {submitErrors.length === 1 ? "issue" : "issues"} need to be fixed
          </h4>
          <ul className="mt-2 text-xs text-red-700 space-y-1">
            {submitErrors.map((err) => (
              <li key={err}>• {err}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
