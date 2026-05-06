"use client";

import { motion } from "framer-motion";
import type { OrderInsightsProps } from "./OrderInsights.types";

const OrderInsights: React.FC<OrderInsightsProps> = ({ insights, isRTL }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1 },
        },
      }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {insights.map((stat, idx) => (
        <motion.div
          key={idx}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="surface-card p-6 flex items-center justify-between group hover:border-primary/30 transition-all duration-300"
        >
          <div className="space-y-1">
            <p className="text-surface-500 text-sm font-medium font-body">
              {stat.label}
            </p>
            <p className={`text-3xl font-bold font-display ${stat.color}`}>
              {stat.value}
            </p>
          </div>
          <div
            className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
          >
            <stat.icon className={`text-2xl ${stat.color}`} />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default OrderInsights;