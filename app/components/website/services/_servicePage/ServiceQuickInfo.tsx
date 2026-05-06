"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FiTrendingUp,
  FiUsers,
  FiAward,
  FiZap,
  FiStar,
  FiCheck,
} from "react-icons/fi";
import { ServiceStats } from "@/app/types/service";

const iconMap: Record<string, React.ReactNode> = {
  trending: <FiTrendingUp className="text-xl" />,
  users: <FiUsers className="text-xl" />,
  award: <FiAward className="text-xl" />,
  zap: <FiZap className="text-xl" />,
  star: <FiStar className="text-xl" />,
  check: <FiCheck className="text-xl" />,
};

interface ServiceQuickInfoProps {
  stats?: ServiceStats[];
  local: "en" | "ar";
}

export default function ServiceQuickInfo({
  stats,
  local,
}: ServiceQuickInfoProps) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="relative -mt-12 z-10 c-container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.1,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="surface-card-elevated p-6 md:p-8 group hover:shadow-surface-md transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                {iconMap[stat.icon] || <FiStar className="text-xl" />}
              </div>
              <div>
                <p className="display-sm text-primary font-display">
                  {stat.value}
                </p>
                <p className="body-sm text-surface-500">{stat.label[local]}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
