// ============================================================================
// TIMELINE ITEM COMPONENT - Displays single timeline entry
// ============================================================================

"use client";

import Img from "@/app/components/global/Img";
import { TimelineEntry } from "@/app/types/order";
import { FiClock } from "react-icons/fi";

interface TimelineItemProps {
  entry: TimelineEntry;
}

export function TimelineItem({ entry }: TimelineItemProps) {
  return (
    <div className="relative ps-12">
      <div
        className={`absolute start-0 top-0 w-10 h-10 bg-surface-card-bg rounded-full flex items-center justify-center border-[3px] border-surface-100 z-10 shadow-surface-sm ${
          entry.isSystem ? "" : "overflow-hidden border-primary/20"
        }`}
      >
        {entry.authorAvatar ? (
          <Img
            src={entry.authorAvatar}
            alt={entry.author}
            className="w-full h-full rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          <FiClock className="w-4 h-4 text-surface-400" />
        )}
      </div>
      <div className="group">
        <div className="flex justify-between items-center mb-1">
          <span className="caption text-surface-900 font-semibold">
            {entry.author}
          </span>
          <span className="caption-xs text-surface-400">{entry.timestamp}</span>
        </div>
        <div
          className={`body-sm p-4 rounded-xl border transition-all ${
            entry.isSystem
              ? "text-surface-500 bg-surface-50/50 border-surface-100"
              : "text-surface-700 bg-surface-card-bg border-surface-200 shadow-surface-sm group-hover:shadow-surface-md"
          }`}
        >
          {entry.content}
        </div>
      </div>
    </div>
  );
}
