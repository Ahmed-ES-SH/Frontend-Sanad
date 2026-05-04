"use client";

import { easeOut, motion } from "framer-motion";
import { FiCreditCard, FiTarget, FiSmile, FiUserPlus } from "react-icons/fi";

//////////////////////////////////////////////////////
///////  Metric definitions with translation keys mapped
///////  for each card. The changeType determines the color style.
//////////////////////////////////////////////////////
interface DashboardMetric {
  labelKey: string;
  value: string;
  change?: string;
  changeKey?: string;
  changeType: "positive" | "neutral" | "info";
  icon: React.ComponentType<{ size: number }>;
  iconBg: string;
  iconColor: string;
}

const metrics: DashboardMetric[] = [
  {
    labelKey: "totalRevenue",
    value: "$1,284,500",
    change: "+12.5%",
    changeType: "positive",
    icon: FiCreditCard,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    labelKey: "activeProjects",
    value: "42",
    changeKey: "stable",
    changeType: "neutral",
    icon: FiTarget,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    labelKey: "satisfactionRate",
    value: "4.9/5.0",
    change: "98%",
    changeType: "positive",
    icon: FiSmile,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    labelKey: "newLeads",
    value: "18",
    changeKey: "new",
    changeType: "info",
    icon: FiUserPlus,
    iconBg: "bg-stone-100",
    iconColor: "text-stone-700",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
};

export default function KeyMetrics() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
    >
      {metrics.map((metric) => {
        const Icon = metric.icon;

        const changeStyles: Record<string, string> = {
          positive: "text-green-600 bg-green-50",
          neutral: "text-stone-500 bg-stone-100",
          info: "text-orange-600 bg-orange-50",
        };

        return (
          <motion.div
            key={metric.labelKey}
            variants={cardVariants}
            className="bg-white p-4 md:p-5 rounded-xl border border-stone-200 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-3">
              <div
                className={`p-2.5 rounded-lg ${metric.iconBg} ${metric.iconColor}`}
              >
                <Icon size={18} />
              </div>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${changeStyles[metric.changeType]}`}
              >
                {"changeKey" in metric
                  ? (metric.changeKey as string)
                  : metric.change}
              </span>
            </div>
            <div>
              <p className="text-xs font-medium text-stone-500 mb-1">
                {metric.labelKey}
              </p>
              <p className="text-xl md:text-2xl font-bold text-stone-900">
                {metric.value}
              </p>
            </div>
          </motion.div>
        );
      })}
    </motion.section>
  );
}
