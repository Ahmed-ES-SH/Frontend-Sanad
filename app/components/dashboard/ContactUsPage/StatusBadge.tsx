"use client";

import { useTranslation } from "@/app/hooks/useTranslation";

export type MessageStatus = "unread" | "replied" | "archived";

interface StatusBadgeProps {
  isUnread: boolean;
  isReplied: boolean;
}

export function StatusBadge({ isUnread, isReplied }: StatusBadgeProps) {
  const t = useTranslation("ContactUsPage.MessagesTable");

  const status: MessageStatus = isUnread ? "unread" : isReplied ? "replied" : "archived";

  return (
    <div
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full w-fit ${
        isUnread
          ? "bg-orange-100 text-orange-700"
          : isReplied
            ? "bg-emerald-100 text-emerald-700"
            : "bg-stone-100 text-stone-600"
      }`}
    >
      {isUnread && (
        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
      )}
      <span className="text-[10px] font-bold uppercase tracking-tight">
        {status === "unread" ? t.unread : status === "replied" ? t.replied : t.archived}
      </span>
    </div>
  );
}