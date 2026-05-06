import { ContactMessage } from "@/app/types/contact";

interface ContactStats {
  total: number;
  unread: number;
  replied: number;
  currentPageCount: number;
}

export function getContactStats(messages: ContactMessage[], total: number): ContactStats {
  const unread = messages.filter((m) => !m.isRead).length;
  const replied = messages.filter((m) => m.repliedAt).length;

  return {
    total,
    unread,
    replied,
    currentPageCount: messages.length,
  };
}