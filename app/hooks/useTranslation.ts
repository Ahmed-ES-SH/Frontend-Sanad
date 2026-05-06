"use client";

import { useParams } from "next/navigation";
import ar from "@/app/translations/ar.json";
import en from "@/app/translations/en.json";

// ==============================
// Types
// ==============================

type Locale = "ar" | "en";
export type Messages = typeof ar;

// Nested keys:
// "UserDashboard"
// "UserDashboard.RecentActivity"
// "UserDashboard.RecentActivity.title"
type NestedKeys<T> = T extends object
  ? {
      [K in keyof T & string]:
        | K
        | (T[K] extends object ? `${K}.${NestedKeys<T[K]>}` : never);
    }[keyof T & string]
  : never;

// Resolve returned type from path
type PathValue<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? PathValue<T[K], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never;

// ==============================
// Safe Getter (No any)
// ==============================

function getNestedValue<T, P extends NestedKeys<T>>(
  obj: T,
  path: P,
): PathValue<T, P> {
  const keys = path.split(".") as string[];

  let current: unknown = obj;

  for (const key of keys) {
    if (typeof current === "object" && current !== null && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      throw new Error(`Invalid translation path: ${path}`);
    }
  }

  return current as PathValue<T, P>;
}

// ==============================
// Hook
// ==============================

export function useTranslation<P extends NestedKeys<Messages>>(path: P) {
  const params = useParams();
  const locale = (params?.locale as Locale) ?? "en";

  const messages: Messages = locale === "en" ? en : ar;

  return getNestedValue(messages, path);
}
