"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { FiCalendar, FiChevronDown } from "react-icons/fi";

function PaymentsHeader() {
  const t = useTranslation("PaymentsPage.PaymentsHeader");

  return (
    <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-stone-900 mb-1">{t.title}</h1>
        <p className="text-sm text-stone-500">{t.subtitle}</p>
      </div>
      <button className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg text-sm text-stone-600 border border-stone-200 hover:border-orange-300 transition-colors">
        <FiCalendar size={14} />
        <span>{t.last30Days}</span>
        <FiChevronDown size={14} />
      </button>
    </section>
  );
}

export default PaymentsHeader;
