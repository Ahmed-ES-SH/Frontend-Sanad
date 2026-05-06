"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { easeOut, motion } from "framer-motion";

import {
  FiLayers,
  FiBriefcase,
  FiBarChart2,
  FiHelpCircle,
} from "react-icons/fi";

//////////////////////////////////////////////////////
///////  Stat cards for the User Dashboard stats row
//////////////////////////////////////////////////////

interface StatCard {
  labelKey: string;
  value: string;
  valueLabelKey?: string;
  changeKey: string;
  changeColor: string;
  icon: React.ComponentType<{ size: number }>;
  iconBg: string;
  iconColor: string;
}

const stats: StatCard[] = [
  {
    labelKey: "servicesActive",
    value: "12",
    changeKey: "twoThisMonth",
    changeColor: "text-accent-cyan",
    icon: FiLayers,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    labelKey: "activeProjects",
    value: "05",
    changeKey: "threeOnTrack",
    changeColor: "text-accent-cyan",
    icon: FiBriefcase,
    iconBg: "bg-accent-cyan/10",
    iconColor: "text-accent-cyan",
  },
  {
    labelKey: "totalInvestment",
    value: "45.2k",
    valueLabelKey: "sar",
    changeKey: "currency",
    changeColor: "text-surface-400",
    icon: FiBarChart2,
    iconBg: "bg-accent-amber/10",
    iconColor: "text-accent-amber",
  },
  {
    labelKey: "supportInquiries",
    value: "02",
    changeKey: "oneUrgent",
    changeColor: "text-accent-rose",
    icon: FiHelpCircle,
    iconBg: "bg-accent-rose/10",
    iconColor: "text-accent-rose",
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

export default function StatsRow() {
  const t = useTranslation("UserDashboard.StatsRow");

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.labelKey}
            variants={cardVariants}
            className="surface-card p-6 hover:shadow-surface-md transition-all duration-200"
          >
            <div className="flex justify-between items-start mb-4">
              <p className="text-surface-400 text-xs font-bold uppercase tracking-widest opacity-60">
                {t[stat.labelKey as keyof typeof t]}
              </p>
              <div
                className={`p-2 rounded-lg ${stat.iconBg} ${stat.iconColor}`}
              >
                <Icon size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-primary">
                {stat.value}
              </span>
              {"valueLabelKey" in stat && stat.valueLabelKey && (
                <span className="text-xs font-semibold text-surface-400 whitespace-nowrap">
                  {t[stat.valueLabelKey as keyof typeof t]}
                </span>
              )}
              <span
                className={`text-xs font-semibold ${stat.changeColor} truncate`}
              >
                {t[stat.changeKey as keyof typeof t]}
              </span>
            </div>
          </motion.div>
        );
      })}
    </motion.section>
  );
}
