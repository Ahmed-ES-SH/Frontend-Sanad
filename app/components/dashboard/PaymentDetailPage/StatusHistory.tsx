"use client";

import { motion } from "framer-motion";
import { StatusHistoryEntry } from "../PaymentsPage/payments-types";

interface StatusHistoryProps {
  history: StatusHistoryEntry[];
}

const dotStyles: Record<StatusHistoryEntry["status"], string> = {
  completed: "bg-emerald-500 ring-emerald-500/10",
  authorized: "bg-emerald-500 ring-emerald-500/10",
  initiated: "bg-stone-300 ring-transparent",
  refunded: "bg-stone-400 ring-stone-400/10",
  failed: "bg-red-500 ring-red-500/10",
};

const titleStyles: Record<StatusHistoryEntry["status"], string> = {
  completed: "text-stone-900",
  authorized: "text-stone-900",
  initiated: "text-stone-500",
  refunded: "text-stone-500",
  failed: "text-red-600",
};

const descStyles: Record<StatusHistoryEntry["status"], string> = {
  completed: "text-stone-500",
  authorized: "text-stone-500",
  initiated: "text-stone-400",
  refunded: "text-stone-400",
  failed: "text-red-400",
};

export default function StatusHistory({ history }: StatusHistoryProps) {
  return (
    <motion.section
      className="bg-white rounded-xl border border-stone-200 overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
    >
      <div className="px-6 py-4 border-b border-stone-200">
        <h3 className="text-base font-bold text-stone-900">
          Status History
        </h3>
        <p className="text-xs text-stone-400 mt-0.5">
          {history.length} events in timeline
        </p>
      </div>

      <div className="p-6">
        <div className="relative pl-8 space-y-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-stone-200">
          {history.map((entry, index) => (
            <div key={index} className="relative">
              <span
                className={`absolute -left-[28px] top-1 w-4 h-4 rounded-full border-4 border-white shadow-sm ring-4 ${dotStyles[entry.status]}`}
              />
              <div className="flex justify-between items-start">
                <div>
                  <p className={`font-semibold text-sm ${titleStyles[entry.status]}`}>
                    {entry.title}
                  </p>
                  <p className={`text-xs mt-0.5 ${descStyles[entry.status]}`}>
                    {entry.description}
                  </p>
                </div>
                <time className="text-[11px] font-semibold text-stone-400 whitespace-nowrap ml-4">
                  {entry.time}
                </time>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
