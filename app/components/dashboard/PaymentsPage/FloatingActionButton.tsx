"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { FiPlus } from "react-icons/fi";

function FloatingActionButton() {
  const t = useTranslation("PaymentsPage.FloatingActionButton");

  return (
    <button
      className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors shadow-lg"
      aria-label={t.label}
    >
      <FiPlus size={20} />
    </button>
  );
}

export default FloatingActionButton;
