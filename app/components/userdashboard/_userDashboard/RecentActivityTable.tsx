"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiDollarSign,
  FiUser,
  FiFilter,
  FiDownload,
  FiChevronDown,
  FiInbox,
} from "react-icons/fi";
import { BsFillFileCheckFill } from "react-icons/bs";
import { useTranslation } from "@/app/hooks/useTranslation";

//////////////////////////////////////////////////////
///////  Recent activity table with transaction / activity data
//////////////////////////////////////////////////////

interface ActivityRow {
  activityKey: string;
  typeKey: string;
  statusKey: string;
  statusBg: string;
  statusTextColor: string;
  amount: string;
  date: string;
  icon: React.ComponentType<{ size: number }>;
}

const rows: ActivityRow[] = [
  {
    activityKey: "saasSubscription",
    typeKey: "subscription",
    statusKey: "paid",
    statusBg: "bg-emerald-100",
    statusTextColor: "text-emerald-700",
    amount: "2,400.00 SAR",
    date: "May 12, 2024",
    icon: FiDollarSign,
  },
  {
    activityKey: "neomMilestone",
    typeKey: "milestone",
    statusKey: "pending",
    statusBg: "bg-primary-100",
    statusTextColor: "text-primary-dark",
    amount: "15,000.00 SAR",
    date: "May 09, 2024",
    icon: BsFillFileCheckFill,
  },
  {
    activityKey: "passwordUpdate",
    typeKey: "security",
    statusKey: "success",
    statusBg: "bg-sky-100",
    statusTextColor: "text-sky-900",
    amount: "System Log",
    date: "May 05, 2024",
    icon: FiUser,
  },
];

const INITIAL_VISIBLE = 2;

export default function RecentActivityTable() {
  const t = useTranslation("UserDashboard.RecentActivity");
  const [expanded, setExpanded] = useState(false);
  const showToggle = rows.length > INITIAL_VISIBLE;
  const visibleRows = expanded ? rows : rows.slice(0, INITIAL_VISIBLE);

  // Empty state
  if (!rows.length) {
    return (
      <div className="surface-card p-12 flex flex-col items-center justify-center text-center">
        <div className="p-4 rounded-full bg-surface-100 mb-4">
          <FiInbox size={32} className="text-surface-400" />
        </div>
        <h4 className="text-lg font-bold text-surface-900 mb-1">
          {t.emptyMessage || "No activity yet"}
        </h4>
        <p className="text-sm text-surface-400">
          {t.emptyDescription || "Your recent activity will appear here."}
        </p>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="surface-card overflow-hidden"
    >
      {/* Table header */}
      <div className="p-6 border-b border-surface-200 flex justify-between items-center">
        <h3 className="text-xl font-bold tracking-tight text-surface-900">
          {t.title}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => {}}
            className="p-2 text-surface-400 hover:bg-surface-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label={t.filter}
          >
            <FiFilter size={18} />
          </button>
          <button
            onClick={() => {}}
            className="p-2 text-surface-400 hover:bg-surface-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label={t.download}
          >
            <FiDownload size={18} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-50 text-surface-400 text-[10px] font-bold uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">{t.colActivity}</th>
              <th className="px-6 py-4">{t.colType}</th>
              <th className="px-6 py-4">{t.colStatus}</th>
              <th className="px-6 py-4 text-right">{t.colAmountDate}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-200">
            {visibleRows.map((row) => {
              const Icon = row.icon;
              return (
                <motion.tr
                  key={row.activityKey}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="hover:bg-surface-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 text-primary rounded bg-surface-100 flex items-center justify-center shrink-0">
                        <Icon size={16} />
                      </div>
                      <span className="text-sm font-bold text-surface-900 truncate">
                        {t[row.activityKey as keyof typeof t] ||
                          row.activityKey}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold text-surface-400 whitespace-nowrap">
                    {t[row.typeKey as keyof typeof t] || row.typeKey}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`${row.statusBg} ${row.statusTextColor} text-[10px] font-bold px-2 py-0.5 rounded uppercase`}
                    >
                      {t[row.statusKey as keyof typeof t] || row.statusKey}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <p className="text-sm font-bold text-surface-900">
                      {row.amount}
                    </p>
                    <p className="text-[10px] text-surface-400">{row.date}</p>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showToggle && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="w-full text-primary text-sm font-bold py-3 flex items-center justify-center gap-1 hover:bg-primary/5 transition-colors border-t border-surface-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-expanded={expanded}
        >
          {expanded ? t.showLess : t.showMore}{" "}
          <FiChevronDown
            size={16}
            className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      )}
    </motion.section>
  );
}
