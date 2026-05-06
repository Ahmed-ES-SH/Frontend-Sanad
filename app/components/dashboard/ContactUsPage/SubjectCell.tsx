"use client";

import { ContactMessage } from "@/app/types/contact";

interface SubjectCellProps {
  message: ContactMessage;
}

export function SubjectCell({ message }: SubjectCellProps) {
  return (
    <div className="max-w-xs">
      <p className="text-sm font-semibold text-stone-800 truncate">
        {message.subject}
      </p>
      <p className="text-[11px] text-stone-500 truncate mt-0.5">
        {message.message}
      </p>
    </div>
  );
}