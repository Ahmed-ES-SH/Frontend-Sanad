"use client";

import { FiCheck, FiCircle, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import type { ChecklistItem } from "./ChecklistSidebar";

interface MobileChecklistDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  items: ChecklistItem[];
  completeLabel: string;
  remainingLabel: (count: number) => string;
}

export default function MobileChecklistDrawer({
  open,
  onClose,
  title,
  items,
  completeLabel,
  remainingLabel,
}: MobileChecklistDrawerProps) {
  const completed = items.filter((i) => i.done).length;
  const total = items.length;
  const allDone = completed === total;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-stone-900/40 z-50 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 lg:hidden rounded-t-2xl bg-white border border-stone-200 shadow-surface-xl max-h-[70vh] flex flex-col"
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0">
              <h2 className="heading-sm text-stone-900 text-balance">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close checklist"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="px-5 pb-4 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="h-1.5 flex-1 rounded-full bg-stone-100 overflow-hidden">
                  <motion.div
                    className={
                      allDone ? "h-full bg-emerald-500" : "h-full bg-primary"
                    }
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  />
                </div>
              </div>
              <p
                className={`text-xs mt-2 ${
                  allDone
                    ? "text-emerald-700 font-semibold"
                    : "text-stone-500"
                }`}
              >
                {allDone ? completeLabel : remainingLabel(total - completed)}
              </p>
            </div>

            <ul
              className="px-5 pb-5 space-y-3 overflow-y-auto"
              role="list"
            >
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
                    {item.done ? (
                      <FiCheck size={16} />
                    ) : (
                      <FiCircle size={16} />
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`leading-snug ${
                        item.done
                          ? "line-through decoration-stone-300"
                          : "font-medium"
                      }`}
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
