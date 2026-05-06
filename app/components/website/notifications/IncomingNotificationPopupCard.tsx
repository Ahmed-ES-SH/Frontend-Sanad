"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowRight, FiBell, FiX } from "react-icons/fi";
import { Notification } from "@/app/types/notification";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslation";

interface IncomingNotificationPopupProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

const AUTO_DISMISS_MS = 6000;
const MAX_VISIBLE = 3;

function NotificationPopupCard({
  notification,
  onDismiss,
  local,
  viewLabel,
  dismissLabel,
}: {
  notification: Notification;
  onDismiss: (id: string) => void;
  local: "en" | "ar";
  viewLabel: string;
  dismissLabel: string;
}) {
  useEffect(() => {
    const timer = window.setTimeout(
      () => onDismiss(notification.id),
      AUTO_DISMISS_MS,
    );
    return () => window.clearTimeout(timer);
  }, [notification.id, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="w-[22rem] max-w-[calc(100vw-2rem)] rounded-xl border border-surface-200 bg-white shadow-lg p-4"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
          <FiBell className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-surface-900 truncate">
            {notification.title}
          </p>
          <p className="mt-1 text-sm text-surface-600 line-clamp-2">
            {notification.message}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.href = `/${local}/notifications`;
                }
                onDismiss(notification.id);
              }}
              className="inline-flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1.5 text-xs font-medium text-white hover:bg-primary/90 transition-colors"
            >
              <span>{viewLabel}</span>
              <FiArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onDismiss(notification.id)}
              className="inline-flex items-center gap-1 rounded-lg border border-surface-200 px-2.5 py-1.5 text-xs font-medium text-surface-600 hover:bg-surface-50 transition-colors"
            >
              <span>{dismissLabel}</span>
              <FiX className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function IncomingNotificationPopup({
  notifications,
  onDismiss,
}: IncomingNotificationPopupProps) {
  const local = useLocale();
  const t = useTranslation("notifications");
  const dismissLabel = t.delete;

  return (
    <div
      className={`pointer-events-none fixed top-20 z-[10000] flex flex-col gap-2 ${
        local === "ar" ? "left-4 items-start" : "right-4 items-end"
      }`}
    >
      <AnimatePresence>
        {notifications.slice(0, MAX_VISIBLE).map((notification) => (
          <div key={notification.id} className="pointer-events-auto">
            <NotificationPopupCard
              notification={notification}
              onDismiss={onDismiss}
              local={local}
              viewLabel={t.viewDetails}
              dismissLabel={dismissLabel}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
