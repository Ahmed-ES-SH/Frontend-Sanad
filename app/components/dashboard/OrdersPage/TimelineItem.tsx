"use client";

import { OrderUpdate } from "@/app/types/order";
import { useTranslation } from "@/app/hooks/useTranslation";

interface TimelineItemProps {
  update: OrderUpdate;
  isLast: boolean;
}

export function TimelineItem({ update, isLast }: TimelineItemProps) {
  const t = useTranslation("orderDetail");

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isAdmin = update.author === "admin";

  return (
    <div className="relative flex gap-4">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-4 top-8 bottom-0 w-px bg-gray-200" />
      )}

      {/* Icon */}
      <div className="relative z-10 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
        {isAdmin ? (
          <svg
            className="w-4 h-4 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-4">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900 capitalize">
            {isAdmin ? t.timeline.admin : t.timeline.system}
          </span>
          <span className="text-xs text-gray-500">
            {formatDate(update.createdAt)}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{update.content}</p>
      </div>
    </div>
  );
}
