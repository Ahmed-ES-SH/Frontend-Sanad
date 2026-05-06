"use client";

import { useTranslation } from "@/app/hooks/useTranslation";

export default function ProjectWorkloadChart() {
  const t = useTranslation("ProjectsPage.ProjectWorkloadChart");

  const days = [
    { day: "Mon", height: "40%" },
    { day: "Tue", height: "65%" },
    { day: "Wed", height: "90%", isActive: true },
    { day: "Thu", height: "55%" },
    { day: "Fri", height: "75%" },
    { day: "Sat", height: "30%" },
    { day: "Sun", height: "20%" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
      <h3 className="text-lg font-bold text-stone-900 mb-4">{t.title}</h3>
      <div className="h-48 flex items-end justify-between gap-2 pt-4">
        {days.map((day, index) => (
          <div
            key={index}
            className="flex-1 bg-stone-100 rounded-t-lg relative group h-full min-h-[80px]"
            style={{ height: day.height }}
          >
            <div
              className={`absolute inset-0 rounded-t-lg transition-opacity ${
                day.isActive
                  ? "bg-orange-500 opacity-100"
                  : "bg-orange-400 opacity-0 group-hover:opacity-100"
              }`}
            ></div>
            <span
              className={`absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold ${
                day.isActive ? "text-orange-500" : "text-stone-400"
              }`}
            >
              {day.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
