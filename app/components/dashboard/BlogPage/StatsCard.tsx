"use client";

import { motion } from "framer-motion";
import { IconType } from "react-icons";

interface StatsCardProps {
  icon: IconType;
  iconBg: string;
  iconColor: string;
  changeValue: string;
  changeBg: string;
  changeText: string;
  label: string;
  value: string;
  borderColor?: string;
  delay?: number;
}

export function StatsCard({
  icon: Icon,
  iconBg,
  iconColor,
  changeValue,
  changeBg,
  changeText,
  label,
  value,
  borderColor = "",
  delay = 0,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 1, 0.5, 1] }}
      className={`bg-white p-6 rounded-2xl shadow-sm border border-stone-200/50 ${borderColor}`}
    >
      <div className="flex items-center justify-between mb-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className={`p-2 ${iconBg} ${iconColor} rounded-lg cursor-default`}
        >
          <Icon className="text-xl" />
        </motion.div>
        <span className={`text-xs font-bold ${changeBg} ${changeText} px-2 py-1 rounded-full`}>
          {changeValue}
        </span>
      </div>
      <p className="text-sm text-stone-500 font-medium">{label}</p>
      <h3 className="text-2xl font-bold text-stone-900 mt-1">{value}</h3>
    </motion.div>
  );
}