"use client";

import { FiCheck, FiCircle } from "react-icons/fi";
import { motion } from "framer-motion";

export interface ChecklistItem {
  key: string;
  label: string;
  done: boolean;
  hint?: string;
}

interface ChecklistSidebarProps {
  title: string;
  items: ChecklistItem[];
  completeLabel: string;
  remainingLabel: (count: number) => string;
}

export default function ChecklistSidebar({
  title,
  items,
  completeLabel,
  remainingLabel,
}: ChecklistSidebarProps) {
  const completed = items.filter((i) => i.done).length;
  const total = items.length;
  const allDone = completed === total;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="rounded-2xl bg-white border border-stone-200 shadow-sm">
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <h2 className="heading-sm text-stone-900 text-balance">{title}</h2>
        <span
          className="text-xs font-semibold text-stone-500 tabular-nums"
          aria-label={`${completed} of ${total} complete`}
        >
          {completed}/{total}
        </span>
      </div>

      <div className="px-5 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="h-1.5 flex-1 rounded-full bg-stone-100 overflow-hidden">
            <motion.div
              className={allDone ? "h-full bg-emerald-500" : "h-full bg-primary"}
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            />
          </div>
        </div>
        <p
          className={`text-xs mt-2 ${allDone ? "text-emerald-700 font-semibold" : "text-stone-500"}`}
        >
          {allDone ? completeLabel : remainingLabel(total - completed)}
        </p>
      </div>

      <ul className="px-5 pb-5 space-y-3" role="list">
        {items.map((item) => (
          <li
            key={item.key}
            className={`flex items-start gap-2.5 text-sm ${
              item.done ? "text-stone-500" : "text-stone-700"
            }`}
          >
            <span
              className={`mt-0.5 shrink-0 ${
                item.done ? "text-emerald-600" : "text-stone-300"
              }`}
              aria-hidden="true"
            >
              {item.done ? <FiCheck size={16} /> : <FiCircle size={16} />}
            </span>
            <div className="flex-1 min-w-0">
              <p
                className={`leading-snug ${item.done ? "line-through decoration-stone-300" : "font-medium"}`}
              >
                {item.label}
              </p>
              {!item.done && item.hint && (
                <p className="text-xs text-stone-400 mt-0.5 leading-snug">
                  {item.hint}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
