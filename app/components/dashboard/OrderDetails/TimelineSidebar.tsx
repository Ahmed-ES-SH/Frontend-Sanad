// ============================================================================
// TIMELINE SIDEBAR COMPONENT - Timeline with update form
// ============================================================================

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiClock, FiSend } from "react-icons/fi";

import { TimelineItem } from "./TimelineItem";
import { useTranslation } from "@/app/hooks/useTranslation";
import { TimelineEntry } from "@/app/types/order";

type SubmitState = "idle" | "submitting" | "submitted" | "error";

interface TimelineSidebarProps {
  timeline: TimelineEntry[];
  submitState: SubmitState;
  updateText: string;
  onUpdateTextChange: (text: string) => void;
  onPostUpdate: () => Promise<void>;
}

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const MAX_CHARS = 500;

export function TimelineSidebar({
  timeline,
  submitState,
  updateText,
  onUpdateTextChange,
  onPostUpdate,
}: TimelineSidebarProps) {
  const t = useTranslation("orderDetails");

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="surface-card-subtle p-6 flex flex-col h-full border-2 border-surface-100"
    >
      <div className="flex items-center justify-between mb-8">
        <motion.h2
          variants={item}
          className="heading-md text-surface-900 flex items-center gap-2"
        >
          <FiClock className="w-5 h-5 text-surface-500" />
          {t.orderAudit}
        </motion.h2>
        <span className="caption text-surface-400 font-bold">
          {timeline.length} {t.events}
        </span>
      </div>

      <motion.div
        variants={item}
        className="space-y-8 relative before:content-[''] before:absolute before:start-[1.25rem] before:top-2 before:bottom-0 before:w-[2px] before:bg-surface-200"
      >
        {timeline.map((entry) => (
          <TimelineItem key={entry.id} entry={entry} />
        ))}
      </motion.div>

      {/* Add Update Form */}
      <motion.div
        variants={item}
        className="mt-12 pt-8 border-t border-surface-200"
      >
        <label className="block caption-xs uppercase font-bold text-surface-500 mb-3 tracking-widest">
          {t.postInternalUpdate}
        </label>
        <div className="relative group">
          <textarea
            className="surface-input w-full p-4 body-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none placeholder:text-surface-300 rounded-xl bg-surface-50 border-surface-200"
            placeholder={t.noteForTheTeam}
            rows={3}
            value={updateText}
            onChange={(e) => onUpdateTextChange(e.target.value)}
            disabled={submitState === "submitting"}
            maxLength={MAX_CHARS}
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-3">
            <span className="caption-xs text-surface-400">
              {updateText.length}/{MAX_CHARS}
            </span>
            <button
              onClick={onPostUpdate}
              disabled={!updateText.trim() || submitState === "submitting"}
              className="p-2 bg-primary text-white rounded-lg shadow-primary-sm disabled:opacity-50 hover:scale-105 transition-transform"
            >
              {submitState === "submitting" ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin block" />
              ) : (
                <FiSend className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {submitState === "submitted" && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="caption text-accent-emerald font-bold mt-2"
            >
              {t.updateShared}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
