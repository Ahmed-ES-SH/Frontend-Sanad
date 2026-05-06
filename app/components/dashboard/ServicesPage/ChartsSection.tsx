"use client";

import { useTranslation } from "@/app/hooks/useTranslation";

export default function ChartsSection() {
  const t = useTranslation("ServicesPage.ChartsSection");

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Featured Performance (Line Chart Simulation) */}
      <div className="lg:col-span-2 bg-stone-50 rounded-xl p-6 relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold text-stone-900">
              {t.featuredPerformance}
            </h3>
            <p className="text-sm text-stone-500">{t.performanceSubtitle}</p>
          </div>
          <div className="flex gap-4">
            <span className="flex items-center gap-2 text-xs font-semibold text-orange-500">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              {t.uptime}
            </span>
            <span className="flex items-center gap-2 text-xs font-semibold text-blue-500">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              {t.load}
            </span>
          </div>
        </div>

        {/* Mock Line Chart */}
        <div className="h-48 w-full flex items-end gap-1 px-2 relative">
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 100 40"
          >
            <defs>
              <linearGradient id="orangeGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,35 Q10,30 20,32 T40,25 T60,28 T80,15 T100,20"
              fill="none"
              stroke="#f97316"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M0,38 Q15,35 30,30 T50,32 T70,20 T85,25 T100,10"
              fill="none"
              stroke="#006591"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div className="w-full flex justify-between text-[10px] text-stone-400 absolute bottom-0 translate-y-4 font-bold">
            <span>MON</span>
            <span>TUE</span>
            <span>WED</span>
            <span>THU</span>
            <span>FRI</span>
            <span>SAT</span>
            <span>SUN</span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-200 grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-stone-500 uppercase tracking-widest font-bold">
              {t.peakUptime}
            </p>
            <p className="text-2xl font-black text-stone-900">99.98%</p>
          </div>
          <div>
            <p className="text-xs text-stone-500 uppercase tracking-widest font-bold">
              {t.latency}
            </p>
            <p className="text-2xl font-black text-stone-900">24ms</p>
          </div>
          <div>
            <p className="text-xs text-stone-500 uppercase tracking-widest font-bold">
              {t.activeNodes}
            </p>
            <p className="text-2xl font-black text-stone-900">1,240</p>
          </div>
        </div>
      </div>

      {/* Revenue Distribution (Donut Chart Simulation) */}
      <div className="bg-stone-50 rounded-xl p-6 flex flex-col">
        <h3 className="text-xl font-bold text-stone-900 mb-1">
          {t.revenueDistribution}
        </h3>
        <p className="text-sm text-stone-500 mb-6">{t.revenueSubtitle}</p>
        <div className="grow flex items-center justify-center relative">
          {/* CSS-only Donut */}
          <div
            className="w-40 h-40 rounded-full relative"
            style={{
              background:
                "conic-gradient(#f97316 0% 45%, #09a4e8 45% 75%, #855300 75% 100%)",
            }}
          >
            <div className="absolute inset-4 rounded-full bg-stone-50 flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-stone-500">
                {t.total}
              </span>
              <span className="text-xl font-black text-stone-900">$2.4M</span>
            </div>
          </div>
        </div>
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-500"></span>
              <span className="text-sm font-medium text-stone-700">
                {t.enterprise}
              </span>
            </div>
            <span className="text-sm font-bold text-stone-900">45%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-sky-500"></span>
              <span className="text-sm font-medium text-stone-700">
                {t.cloudInfrastructure}
              </span>
            </div>
            <span className="text-sm font-bold text-stone-900">30%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-600"></span>
              <span className="text-sm font-medium text-stone-700">
                {t.supportTiers}
              </span>
            </div>
            <span className="text-sm font-bold text-stone-900">25%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
