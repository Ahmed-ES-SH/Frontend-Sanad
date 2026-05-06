"use client";

import { FiDownload } from "react-icons/fi";
import { useTranslation } from "@/app/hooks/useTranslation";

export default function TeamEfficiency() {
  const t = useTranslation("ProjectsPage.TeamEfficiency");

  // Circle progress calculation
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (85 / 100) * circumference;

  return (
    <div className="bg-linear-to-br from-stone-800 to-stone-900 p-6 rounded-xl shadow-sm text-white flex flex-col justify-between h-full">
      <div>
        <h3 className="text-lg font-bold mb-2">{t.title}</h3>
        <p className="text-stone-400 text-sm">{t.subtitle}</p>
      </div>
      <div className="mt-6 flex items-center justify-center">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              className="text-stone-700"
              cx="64"
              cy="64"
              fill="transparent"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
            ></circle>
            <circle
              className="text-orange-500"
              cx="64"
              cy="64"
              fill="transparent"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            ></circle>
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-2xl font-extrabold">85%</span>
            <span className="text-[10px] uppercase font-bold text-stone-400">
              {t.onTrack}
            </span>
          </div>
        </div>
      </div>
      <button className="w-full mt-6 py-2 rounded-lg bg-stone-700 hover:bg-stone-600 transition-colors text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
        <FiDownload size={14} />
        {t.downloadReport}
      </button>
    </div>
  );
}
