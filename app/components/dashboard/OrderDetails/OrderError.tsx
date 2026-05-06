"use client";
import { useTranslation } from "@/app/hooks/useTranslation";
import { FiAlertCircle } from "react-icons/fi";

export default function OrderError() {
  const t = useTranslation("orderDetails");

  return (
    <div className="page-bg min-h-screen flex items-center justify-center">
      <div className="surface-card p-8 max-w-md text-center">
        <FiAlertCircle className="w-12 h-12 text-accent-rose mx-auto mb-4" />
        <h2 className="heading-lg text-surface-900 mb-2">
          {t.unableToLoadOrder}
        </h2>
        <p className="body text-surface-600 mb-6">
          {t.unableToLoadOrderDescription}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="surface-btn-primary mx-auto"
        >
          {t.tryAgain}
        </button>
      </div>
    </div>
  );
}
