"use client";

import type { OrderTrackingTimelineProps } from "./OrderTrackingTimeline.types";

/**
 * Timeline item component for activity log
 */
const TimelineItem: React.FC<{
  entry: OrderTrackingTimelineProps["entries"][number];
  isLast: boolean;
}> = ({ entry, isLast }) => {
  return (
    <div className="relative flex gap-5">
      <div
        className={`z-10 w-5 h-5 rounded-full bg-primary-100 border-[3px] border-surface-50 shrink-0 mt-1 ${
          entry.isActive ? "ring-2 ring-primary/30" : ""
        }`}
        aria-hidden="true"
      />
      {!isLast && (
        <div
          className="absolute left-[9px] top-5 bottom-[-16px] w-px bg-surface-200"
          aria-hidden="true"
        />
      )}
      <div className="flex flex-col gap-1.5 pb-6">
        <h3 className="heading-sm font-display text-surface-900">
          {entry.title}
        </h3>
        <p className="body text-surface-600 leading-relaxed">
          {entry.description}
        </p>
        <div className="flex items-center gap-2.5 mt-1">
          <time
            className="caption text-surface-500 font-semibold"
            dateTime={entry.timestamp}
          >
            {entry.timestamp}
          </time>
          <span
            className="w-1 h-1 bg-surface-300 rounded-full"
            aria-hidden="true"
          />
          <span className="caption text-primary font-semibold">
            {entry.source}
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * Timeline container component
 */
const OrderTrackingTimeline: React.FC<OrderTrackingTimelineProps> = ({ entries }) => {
  if (!entries || entries.length === 0) {
    return null;
  }

  return (
    <div className="space-y-1">
      {entries.map((entry, index) => (
        <TimelineItem
          key={entry.id}
          entry={entry}
          isLast={index === entries.length - 1}
        />
      ))}
    </div>
  );
};

export default OrderTrackingTimeline;