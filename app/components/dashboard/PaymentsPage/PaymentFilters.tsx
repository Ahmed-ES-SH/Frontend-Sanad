"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { FiSearch, FiFilter } from "react-icons/fi";

function PaymentFilters() {
  const t = useTranslation("PaymentsPage.PaymentFilters");

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[180px] max-w-xs">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-stone-400" />
        <input
          className="w-full pl-8 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:border-orange-300 focus:outline-none"
          placeholder={t.searchPlaceholder}
          type="text"
          aria-label={t.searchPlaceholder}
        />
      </div>
      <select className="px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-600 focus:border-orange-300 focus:outline-none">
        <option>{t.statusAll}</option>
        <option>{t.success}</option>
        <option>{t.pending}</option>
        <option>{t.failed}</option>
      </select>
      <select className="px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-600 focus:border-orange-300 focus:outline-none">
        <option>{t.methodCard}</option>
        <option>{t.bankTransfer}</option>
        <option>{t.crypto}</option>
      </select>
      <select className="px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-600 focus:border-orange-300 focus:outline-none">
        <option>{t.currencyUSD}</option>
        <option>EUR</option>
        <option>AED</option>
      </select>
      <button className="p-2 text-stone-400 hover:text-stone-600 transition-colors">
        <FiFilter className="text-sm" />
      </button>
    </div>
  );
}

export default PaymentFilters;
