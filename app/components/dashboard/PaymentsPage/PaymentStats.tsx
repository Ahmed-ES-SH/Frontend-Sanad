"use client";

import {
  FiCreditCard,
  FiRefreshCw,
  FiDollarSign,
  FiTrendingUp,
} from "react-icons/fi";
import { PaymentStatsData } from "./payments-types";
import { useTranslation } from "@/app/hooks/useTranslation";

function PaymentStats() {
  const t = useTranslation("PaymentsPage.PaymentStats");

  const stats: PaymentStatsData[] = [
    {
      title: t.totalRevenue,
      value: "$128,430.00",
      change: "+12.5%",
      changeType: "positive",
      icon: <FiCreditCard className="text-orange-600" />,
      iconBg: "bg-orange-50",
    },
    {
      title: t.activeSubscriptions,
      value: "1,248",
      change: "+4.2%",
      changeType: "positive",
      icon: <FiRefreshCw className="text-orange-600" />,
      iconBg: "bg-orange-50",
    },
    {
      title: t.netVolume,
      value: "$94,210.50",
      change: t.stable,
      changeType: "neutral",
      icon: <FiDollarSign className="text-orange-600" />,
      iconBg: "bg-orange-50",
    },
    {
      title: t.avgTicketSize,
      value: "$102.85",
      change: "+8.1%",
      changeType: "positive",
      icon: <FiTrendingUp className="text-orange-600" />,
      iconBg: "bg-orange-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-5 rounded-xl border border-stone-200"
        >
          <div className="flex justify-between items-start mb-3">
            <div className={`p-2 rounded-lg ${stat.iconBg}`}>{stat.icon}</div>
            <span
              className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${
                stat.changeType === "positive"
                  ? "bg-green-50 text-green-700"
                  : stat.changeType === "negative"
                    ? "bg-red-50 text-red-700"
                    : "bg-stone-100 text-stone-600"
              }`}
            >
              {stat.change}
            </span>
          </div>
          <p className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-1">
            {stat.title}
          </p>
          <h3 className="text-xl font-bold text-stone-900">{stat.value}</h3>
        </div>
      ))}
    </div>
  );
}

export default PaymentStats;
