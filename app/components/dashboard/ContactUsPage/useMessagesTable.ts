// Messages Table Hook - Helper functions for MessagesTable component

import { useMemo } from "react";
import { Locale } from "@/app/types/global";
import { AVATAR_COLORS, DATE_FORMAT_OPTIONS, LOCALE_MAP } from "@/app/constants/contactUs";

/**
 * Generates initials from a name
 */
export function getInitials(name: string): string {
  if (!name) return "??";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Gets avatar color class based on name hash
 */
export function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

/**
 * Formats date string to localized format
 */
export function formatDate(dateString: string, locale: Locale): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(LOCALE_MAP[locale], DATE_FORMAT_OPTIONS).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Hook that encapsulates messages table helper logic
 */
export function useMessagesTable() {
  const helpers = useMemo(
    () => ({
      getInitials,
      getAvatarColor,
      formatDate,
    }),
    [],
  );

  return helpers;
}