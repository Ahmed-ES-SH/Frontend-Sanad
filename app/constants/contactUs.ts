// Contact Us Page Constants

import { Locale } from "@/app/types/global";

export const AVATAR_COLORS = [
  "bg-orange-100 text-orange-700 border-orange-200",
  "bg-amber-100 text-amber-700 border-amber-200",
  "bg-stone-100 text-stone-700 border-stone-200",
  "bg-blue-100 text-blue-700 border-blue-200",
  "bg-emerald-100 text-emerald-700 border-emerald-200",
] as const;

export const PAGINATION_RANGE = 1;

export const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "short",
  year: "numeric",
};

export const LOCALE_MAP: Record<Locale, string> = {
  en: "en-US",
  ar: "ar-SA",
};

export const DEFAULT_EMPTY_MESSAGE = "";