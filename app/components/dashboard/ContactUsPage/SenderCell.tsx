"use client";

import { useMemo } from "react";
import { ContactMessage } from "@/app/types/contact";
import { getAvatarColor, getInitials } from "./useMessagesTable";

interface SenderCellProps {
  message: ContactMessage;
}

export function SenderCell({ message }: SenderCellProps) {
  const initials = useMemo(() => getInitials(message.fullName), [message.fullName]);
  const colorClass = useMemo(() => getAvatarColor(message.fullName), [message.fullName]);

  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs border ${colorClass}`}
      >
        {initials}
      </div>
      <div>
        <p className="text-sm font-bold text-stone-900 leading-none mb-1">
          {message.fullName}
        </p>
        <p className="text-[11px] text-stone-500 font-medium">
          {message.email}
        </p>
      </div>
    </div>
  );
}