"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/app/hooks/useTranslation";
import {
  FiClock,
  FiDollarSign,
  FiShoppingBag,
  FiTrendingUp,
} from "react-icons/fi";
import React from "react";

// ─── Animation Variants ───────────────────────────────────────────

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { ease: "easeOut" as const } },
};

// ─── Types ────────────────────────────────────────────────────────

export interface StatCard {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  accent: string;
  accentBorder: string;
}

interface StatsCardsProps {
  stats: StatCard[];
}

// ─── Component ────────────────────────────────────────────────────────

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          variants={item}
          className="relative p-5 rounded-xl border border-(--surface-card-border) bg-surface-card-bg shadow-surface-sm hover:shadow-surface-md transition-shadow duration-200"
        >
          <div className="flex items-start justify-between mb-3">
            <div
              className={`w-10 h-10 rounded-lg border ${stat.accentBorder} flex items-center justify-center ${stat.accent}`}
            >
              {stat.icon}
            </div>
            <span className="text-xs font-medium text-accent-emerald bg-accent-emerald/10 px-2 py-0.5 rounded-md">
              {stat.change}
            </span>
          </div>
          <p className="text-surface-500 text-xs font-medium mb-0.5">{stat.label}</p>
          <p className="text-2xl font-bold text-surface-900 tracking-tight">
            {stat.value}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

StatsCards.displayName = "StatsCards";