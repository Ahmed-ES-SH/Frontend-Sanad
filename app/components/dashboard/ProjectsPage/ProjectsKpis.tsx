"use client";

import { easeOut, motion } from "framer-motion";
import {
  FiFolder,
  FiCheckCircle,
  FiEdit3,
  FiStar,
  FiTag,
  FiTrendingUp,
} from "react-icons/fi";
import { useTranslation } from "@/app/hooks/useTranslation";

interface ProjectKpi {
  labelKey:
    | "totalProjects"
    | "published"
    | "drafts"
    | "featured"
    | "categories"
    | "newThisMonth";
  changeKey:
    | "totalProjectsChange"
    | "publishedChange"
    | "draftsChange"
    | "featuredChange"
    | "categoriesChange"
    | "newThisMonthChange";
  value: string;
  changeType: "positive" | "neutral" | "info" | "warning";
  icon: React.ComponentType<{ size: number }>;
  iconBg: string;
  iconColor: string;
}

const kpis: ProjectKpi[] = [
  {
    labelKey: "totalProjects",
    changeKey: "totalProjectsChange",
    value: "142",
    changeType: "positive",
    icon: FiFolder,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    labelKey: "published",
    changeKey: "publishedChange",
    value: "98",
    changeType: "positive",
    icon: FiCheckCircle,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    labelKey: "drafts",
    changeKey: "draftsChange",
    value: "28",
    changeType: "warning",
    icon: FiEdit3,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    labelKey: "featured",
    changeKey: "featuredChange",
    value: "16",
    changeType: "info",
    icon: FiStar,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
  },
  {
    labelKey: "categories",
    changeKey: "categoriesChange",
    value: "12",
    changeType: "neutral",
    icon: FiTag,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    labelKey: "newThisMonth",
    changeKey: "newThisMonthChange",
    value: "22",
    changeType: "positive",
    icon: FiTrendingUp,
    iconBg: "bg-stone-100",
    iconColor: "text-stone-700",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
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

const changeStyles: Record<string, string> = {
  positive: "text-emerald-700 bg-emerald-50",
  neutral: "text-stone-600 bg-stone-100",
  info: "text-rose-600 bg-rose-50",
  warning: "text-amber-700 bg-amber-50",
};

export default function ProjectsKpis() {
  const t = useTranslation("ProjectsPage.Kpis");

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-5"
    >
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <motion.div
            key={kpi.labelKey}
            variants={cardVariants}
            className="bg-white p-4 md:p-5 rounded-xl border border-stone-200 flex flex-col justify-between min-h-35 hover:border-stone-300 hover:shadow-sm transition-all"
          >
            <div className="flex justify-between items-start mb-3">
              <div
                className={`p-2.5 rounded-lg ${kpi.iconBg} ${kpi.iconColor}`}
              >
                <Icon size={18} />
              </div>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${changeStyles[kpi.changeType]}`}
              >
                {t[kpi.changeKey]}
              </span>
            </div>
            <div>
              <p className="text-xs font-medium text-stone-500 mb-1">
                {t[kpi.labelKey]}
              </p>
              <p className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight">
                {kpi.value}
              </p>
            </div>
          </motion.div>
        );
      })}
    </motion.section>
  );
}
