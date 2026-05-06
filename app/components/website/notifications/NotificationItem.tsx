/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion } from "framer-motion";
import { Notification } from "@/app/types/notification";
import { useNotificationStore } from "@/app/store/NotificationSlice";
import { memo, MouseEvent } from "react";
import {
  NOTIFICATION_TYPE_ICONS,
  TYPE_COLORS,
} from "@/app/constants/notifications";
import NotificationItemContent from "./NotificationItemContent";

interface NotificationItemProps {
  notification: Notification;
  onRead?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const NotificationItem = memo(
  ({ notification, onRead, onDelete }: NotificationItemProps) => {
    const markAsRead = useNotificationStore((s) => s.markAsRead);
    const deleteNotification = useNotificationStore(
      (s) => s.deleteNotification,
    );
    const handleRead = async () => {
      if (!notification.isRead && onRead) {
        onRead(notification.id);
      } else if (!notification.isRead) {
        await markAsRead(notification.id);
      }
    };

    const handleDelete = async (e: MouseEvent) => {
      e.stopPropagation();
      if (onDelete) {
        onDelete(notification.id);
      } else {
        await deleteNotification(notification.id);
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
        onClick={handleRead}
        className={`relative p-4 border-b border-surface-100 cursor-pointer transition-colors duration-200 hover:bg-surface-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary ${
          !notification.isRead ? "bg-blue-50/50" : "bg-white"
        }`}
        role="listitem"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleRead();
          }
        }}
      >
        {/* Unread indicator */}
        {!notification.isRead && (
          <div
            className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full"
            aria-hidden="true"
          />
        )}

        <div className="flex gap-3">
          {/* Icon */}
          <div
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
              TYPE_COLORS[notification.type]
            }`}
            aria-hidden="true"
          >
            {NOTIFICATION_TYPE_ICONS[notification.type]}
          </div>

          {/* Content */}
          <NotificationItemContent
            notification={notification}
            onRead={handleRead}
            onDelete={handleDelete as any}
          />
        </div>
      </motion.div>
    );
  },
);

NotificationItem.displayName = "NotificationItem";
export default NotificationItem;
