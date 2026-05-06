"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { FiDollarSign } from "react-icons/fi";

function PayoutSchedule() {
  const t = useTranslation("PaymentsPage.PayoutSchedule");
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5">
      <div className="flex items-center gap-2 mb-4">
        <FiDollarSign className="text-orange-600" size={18} />
        <h3 className="font-semibold text-stone-900">{t.title}</h3>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-xs text-stone-500 mb-1">{t.nextDeposit}</p>
          <p className="text-lg font-bold text-stone-900">Oct 28, 2023</p>
        </div>
        <div className="p-3 bg-stone-50 rounded-lg">
          <p className="text-xs text-stone-500 mb-1">{t.amountToTransfer}</p>
          <p className="text-lg font-bold text-orange-600">$42,890.00</p>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-stone-600">{t.verificationProgress}</span>
            <span className="font-medium">85%</span>
          </div>
          <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 w-[85%] rounded-full" />
          </div>
        </div>
        <p className="text-[10px] text-stone-400">{t.payoutInfo}</p>
      </div>
      <button className="w-full py-2.5 mt-4 bg-stone-900 text-white text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors">
        {t.viewPayoutHistory}
      </button>
    </div>
  );
}

export default PayoutSchedule;
