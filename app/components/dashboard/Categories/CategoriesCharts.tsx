"use client";

import { motion } from "framer-motion";

export function CategoriesCharts() {
  // Static mock data for visual representation
  const data = [
    { name: "Web Dev", value: 45, color: "bg-orange-500" },
    { name: "Mobile", value: 25, color: "bg-blue-500" },
    { name: "UI/UX", value: 20, color: "bg-emerald-500" },
    { name: "SEO", value: 10, color: "bg-purple-500" },
  ];

  return (
    <div className="surface-card p-4 md:p-6 rounded-xl border border-surface-200 shadow-surface-md mb-6 md:mb-8">
      <h3 className="text-base md:text-lg font-semibold text-surface-900 mb-4 md:mb-6">Category Distribution</h3>
      
      <div className="flex flex-col gap-3 md:gap-4">
        {data.map((item, i) => (
          <div key={item.name} className="flex items-center gap-2 md:gap-4">
            <div className="w-16 md:w-24 text-xs md:text-sm font-medium text-surface-700 shrink-0">{item.name}</div>
            <div className="flex-1 h-2.5 md:h-3 bg-surface-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.value}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className={`h-full rounded-full ${item.color}`}
              />
            </div>
            <div className="w-10 md:w-12 text-xs md:text-sm text-right text-surface-500 shrink-0">{item.value}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
