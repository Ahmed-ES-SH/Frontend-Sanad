"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { motion } from "framer-motion";

//////////////////////////////////////////////////////
///////  Service performance data with translation keys for i18n
//////////////////////////////////////////////////////
interface ServiceMetric {
  nameKey: string;
  percentage: number;
  color: string;
}

const services: ServiceMetric[] = [
  { nameKey: "architecturalDesign", percentage: 82, color: "bg-orange-500" },
  { nameKey: "technicalConsultation", percentage: 64, color: "bg-amber-500" },
  { nameKey: "urbanPlanning", percentage: 45, color: "bg-stone-400" },
];

export default function ServicePerformance() {
  const t = useTranslation("DashboardPage.ServicePerformance");
  const isEmpty = services.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" as const }}
      className="bg-white p-5 rounded-2xl border border-stone-200"
    >
      {isEmpty ? (
        <div className="py-8 text-center">
          <p className="text-stone-500 text-sm">{t.emptyMessage}</p>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-semibold text-stone-900 mb-5">
            {t.title}
          </h3>
          <div className="space-y-5">
            {services.map((service) => (
              <div key={service.nameKey}>
                <div className="flex justify-between text-xs font-medium mb-2">
                  <span className="text-stone-700">{service.nameKey}</span>
                  <span className="text-stone-500">{service.percentage}%</span>
                </div>
                <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${service.color}`}
                    style={{ width: `${service.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}
