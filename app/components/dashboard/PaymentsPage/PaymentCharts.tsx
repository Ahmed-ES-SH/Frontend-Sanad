"use client";

import { useTranslation } from "@/app/hooks/useTranslation";

function PaymentCharts() {
  const t = useTranslation("PaymentsPage.PaymentCharts");

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Revenue vs Time Chart */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200 p-5">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-base font-semibold text-stone-900">
              {t.revenueVsTime}
            </h3>
            <p className="text-xs text-stone-500">{t.monthlyRevenueTrend}</p>
          </div>
          <div className="flex items-center gap-3 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              {t.revenue}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-stone-300"></span>
              {t.forecast}
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="h-48 flex items-end gap-1.5 px-2">
          {[35, 55, 40, 70, 50, 85, 65, 90, 75, 95, 80, 100].map(
            (height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-orange-500 rounded-t-md min-h-[4px]"
                  style={{ height: `${height}%` }}
                />
              </div>
            ),
          )}
        </div>
        <div className="flex justify-between text-[10px] text-stone-400 mt-3 px-2">
          <span>JAN</span>
          <span>MAR</span>
          <span>MAY</span>
          <span>JUL</span>
          <span>SEP</span>
          <span>NOV</span>
        </div>
      </div>

      {/* Method Distribution Donut */}
      <div className="bg-white rounded-xl border border-stone-200 p-5">
        <h3 className="text-sm font-semibold mb-6 text-stone-900">
          {t.methodDistribution}
        </h3>
        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 36 36"
          >
            <circle
              className="text-stone-200"
              cx="18"
              cy="18"
              fill="none"
              r="15.9"
              stroke="currentColor"
              strokeWidth="3.5"
            ></circle>
            <circle
              className="text-orange-500"
              cx="18"
              cy="18"
              fill="none"
              r="15.9"
              stroke="currentColor"
              strokeDasharray="65, 100"
              strokeLinecap="round"
              strokeWidth="3.5"
            ></circle>
            <circle
              className="text-orange-300"
              cx="18"
              cy="18"
              fill="none"
              r="15.9"
              stroke="currentColor"
              strokeDasharray="25, 100"
              strokeDashoffset="-65"
              strokeLinecap="round"
              strokeWidth="3.5"
            ></circle>
            <circle
              className="text-stone-400"
              cx="18"
              cy="18"
              fill="none"
              r="15.9"
              stroke="currentColor"
              strokeDasharray="10, 100"
              strokeDashoffset="-90"
              strokeLinecap="round"
              strokeWidth="3.5"
            ></circle>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs font-medium text-stone-500">
              {t.total}
            </span>
            <span className="text-xl font-bold text-stone-900">2.4k</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              <span className="text-xs font-medium text-stone-600">
                {t.creditCard}
              </span>
            </div>
            <span className="text-xs font-semibold text-stone-900">65%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-300"></div>
              <span className="text-xs font-medium text-stone-600">
                {t.bankTransfer}
              </span>
            </div>
            <span className="text-xs font-semibold text-stone-900">25%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-stone-400"></div>
              <span className="text-xs font-medium text-stone-600">
                {t.crypto}
              </span>
            </div>
            <span className="text-xs font-semibold text-stone-900">10%</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PaymentCharts;
