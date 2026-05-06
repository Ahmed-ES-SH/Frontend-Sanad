"use client";

import { useMemo } from "react";
import { ContactMessage } from "@/app/types/contact";
import { SenderCell } from "./SenderCell";
import { SubjectCell } from "./SubjectCell";
import { StatusBadge } from "./StatusBadge";
import { ActionButtons, MessageAction } from "./ActionButtons";
import { formatDate } from "./useMessagesTable";
import { Locale } from "@/app/types/global";

interface MessageRowProps {
  message: ContactMessage;
  locale: Locale;
  onAction: (id: string, action: MessageAction) => void;
}

export function MessageRow({ message, locale, onAction }: MessageRowProps) {
  const isReplied = useMemo(() => !!message.repliedAt, [message.repliedAt]);
  const isUnread = useMemo(() => !message.isRead, [message.isRead]);
  const formattedDate = useMemo(() => formatDate(message.createdAt, locale), [message.createdAt, locale]);

  return (
    <tr className="hover:bg-stone-50/40 transition-colors group">
      <td className="px-6 py-5">
        <SenderCell message={message} />
      </td>
      <td className="px-6 py-5">
        <SubjectCell message={message} />
      </td>
      <td className="px-6 py-5">
        <p className="text-xs text-stone-500 font-semibold">{formattedDate}</p>
      </td>
      <td className="px-6 py-5">
        <StatusBadge isUnread={isUnread} isReplied={isReplied} />
      </td>
      <td className="px-6 py-5 text-right">
        <ActionButtons messageId={message.id} isUnread={isUnread} onAction={onAction} />
      </td>
    </tr>
  );
}