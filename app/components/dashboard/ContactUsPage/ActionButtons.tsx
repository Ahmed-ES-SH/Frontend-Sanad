"use client";

import { FiMessageCircle, FiEye, FiTrash2 } from "react-icons/fi";
import { useTranslation } from "@/app/hooks/useTranslation";

export type MessageAction = "read" | "reply" | "delete";

interface ActionButtonsProps {
  messageId: string;
  isUnread: boolean;
  onAction: (id: string, action: MessageAction) => void;
}

export function ActionButtons({ messageId, isUnread, onAction }: ActionButtonsProps) {
  const t = useTranslation("ContactUsPage.MessagesTable");

  return (
    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        onClick={() => onAction(messageId, "reply")}
        className="p-2 hover:bg-white rounded-xl text-stone-400 hover:text-emerald-600 border border-transparent hover:border-emerald-100 hover:shadow-sm transition-all"
        title={t.replied}
      >
        <FiMessageCircle size={16} />
      </button>
      <button
        onClick={() => onAction(messageId, "read")}
        className={`p-2 hover:bg-white rounded-xl border border-transparent hover:shadow-sm transition-all ${
          isUnread
            ? "text-orange-500 hover:text-orange-600 hover:border-orange-100"
            : "text-stone-400 hover:text-stone-900 hover:border-stone-200"
        }`}
        title={t.unread}
      >
        <FiEye size={16} />
      </button>
      <button
        onClick={() => onAction(messageId, "delete")}
        className="p-2 hover:bg-white rounded-xl text-stone-400 hover:text-red-600 border border-transparent hover:border-red-100 hover:shadow-sm transition-all"
        title={t.delete}
      >
        <FiTrash2 size={16} />
      </button>
    </div>
  );
}