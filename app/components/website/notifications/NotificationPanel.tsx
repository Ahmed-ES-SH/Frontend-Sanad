"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FiCheck, FiX, FiLoader, FiBell } from "react-icons/fi";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useNotificationStore } from "@/app/store/NotificationSlice";
import NotificationItem from "./NotificationItem";

interface NotificationPanelProps {
  onClose: () => void;
}

export default function NotificationPanel({ onClose }: NotificationPanelProps) {
  const t = useTranslation("notifications");

  const {
    notifications,
    fetchNotifications,
    unreadCount,
    isLoading,
    pagination,
    markAllAsRead,
  } = useNotificationStore();

  const [isMarkingAllRead, setIsMarkingAllRead] = useState(false);

  // Handle mark all as read
  const handleMarkAllAsRead = async () => {
    try {
      setIsMarkingAllRead(true);
      await markAllAsRead();
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    } finally {
      setIsMarkingAllRead(false);
    }
  };

  // Load more notifications
  const loadMore = () => {
    if (
      !isLoading &&
      pagination.page < Math.ceil(pagination.total / pagination.limit)
    ) {
      fetchNotifications(pagination.page + 1, pagination.limit);
    }
  };

  return (
    <div className="flex flex-col max-h-[32rem]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-surface-200">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-surface-900">{t.title}</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 text-xs font-semibold bg-primary/10 text-primary rounded-full">
              {unreadCount} {t.new}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-surface-400 hover:text-surface-600 hover:bg-surface-100 rounded-lg transition-colors"
          aria-label={t.title}
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      {/* Actions Bar */}
      {unreadCount > 0 && (
        <div className="px-4 py-2 border-b border-surface-100 bg-surface-50">
          <button
            onClick={handleMarkAllAsRead}
            disabled={isMarkingAllRead}
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isMarkingAllRead ? (
              <FiLoader className="w-4 h-4 animate-spin" />
            ) : (
              <FiCheck className="w-4 h-4" />
            )}
            <span>{t.markAllRead}</span>
          </button>
        </div>
      )}

      {/* Notification List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading && notifications.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <FiLoader className="w-6 h-6 text-primary animate-spin" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-surface-100 flex items-center justify-center">
              <FiBell className="w-8 h-8 text-surface-400" />
            </div>
            <h4 className="text-sm font-semibold text-surface-900">
              {t.empty}
            </h4>
            <p className="text-sm text-surface-500 mt-1">
              {t.emptyDescription}
            </p>
          </div>
        ) : (
          <div role="list" aria-label="Notifications">
            <AnimatePresence mode="popLayout">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Footer / Load More */}
      {notifications.length > 0 && pagination.total > pagination.limit && (
        <div className="p-3 border-t border-surface-200 bg-surface-50">
          {pagination.page < Math.ceil(pagination.total / pagination.limit) ? (
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="w-full py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              {t.loadMore}
            </button>
          ) : (
            <p className="text-xs text-center text-surface-500">
              {t.showing} {pagination.total} {t.of} {pagination.total} {t.title}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
