"use client";

import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslation";

//////////////////////////////////////////////////////
///////  Contact stats card data with translation keys for labels and change indicators
//////////////////////////////////////////////////////

export function StatsCards({
  total,
  unread,
  replied,
  currentPageCount,
}: {
  total: number;
  unread: number;
  replied: number;
  currentPageCount: number;
}) {
  const locale = useLocale();
  const t = useTranslation("ContactUsPage.StatsCards");

  const stats = [
    {
      label: t.totalMessages,
      value: total.toString(),
      sub: locale === "ar" ? "إجمالي الرسائل" : "Total Messages",
      color: "text-stone-900",
    },
    {
      label: t.unread,
      value: unread.toString(),
      sub: locale === "ar" ? "بحاجة لرد" : "Needs Attention",
      color: "text-orange-600",
    },
    {
      label: t.replied,
      value: replied.toString(),
      sub: locale === "ar" ? "تم الرد" : "Replied",
      color: "text-emerald-600",
    },
    {
      label: locale === "ar" ? "في هذه الصفحة" : "On Page",
      value: currentPageCount.toString(),
      sub: locale === "ar" ? "عرض حالي" : "Currently Showing",
      color: "text-blue-600",
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white p-6 rounded-3xl space-y-2 border border-stone-200/50"
        >
          <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500/70">
            {stat.label}
          </span>
          <div className="flex items-baseline gap-2">
            <span className={`text-4xl font-extrabold ${stat.color}`}>
              {stat.value}
            </span>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter">
              {stat.sub}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}
