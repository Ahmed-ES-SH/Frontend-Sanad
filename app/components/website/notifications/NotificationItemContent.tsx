/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FiArrowRight, FiCheck, FiClock, FiTrash2 } from "react-icons/fi";
import { formatRelativeTime } from "@/app/helpers/formatRelativeTime";
import { Notification } from "@/app/types/notification";
import { MouseEvent } from "react";

interface NotificationItemContentProps {
  notification: Notification;
  onRead: () => void;
  onDelete: (id: string) => void;
}

export default function NotificationItemContent({
  notification,
  onRead,
  onDelete,
}: NotificationItemContentProps) {
  // delete notification
  const handleDelete = (e: MouseEvent | KeyboardEvent) => {
    e.stopPropagation();
    onDelete(notification.id);
  };

  // mark notification as read
  const handleRead = () => {
    if (!notification.isRead) {
      onRead();
    }
  };

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h4
            className={`text-sm font-semibold text-surface-900 truncate ${
              !notification.isRead ? "font-bold" : ""
            }`}
          >
            {notification.title}
          </h4>
          <p className="text-sm text-surface-600 mt-0.5 line-clamp-2">
            {notification.message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={handleDelete}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                handleDelete(e as any);
              }
            }}
            className="p-1.5 text-surface-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Delete notification"
            title="Delete"
          >
            <FiTrash2 className="w-4 h-4" aria-hidden="true" />
          </button>
          {!notification.isRead && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRead();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRead();
                }
              }}
              className="p-1.5 text-surface-400 hover:text-green-500 rounded-lg hover:bg-green-50 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Mark as read"
              title="Mark as read"
            >
              <FiCheck className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Metadata */}
      <div className="flex items-center gap-3 mt-2">
        <div
          className="flex items-center gap-1 text-xs text-surface-500"
          aria-label={`Received ${formatRelativeTime(notification.createdAt)}`}
        >
          <FiClock className="w-3 h-3" aria-hidden="true" />
          <span>{formatRelativeTime(notification.createdAt)}</span>
        </div>
        {notification.isRead && notification.readAt && (
          <div
            className="flex items-center gap-1 text-xs text-green-600"
            aria-label="Status: Read"
          >
            <FiCheck className="w-3 h-3" aria-hidden="true" />
            <span>Read</span>
          </div>
        )}
        <div className="flex items-center gap-1 text-xs text-primary/70 hover:text-primary transition-colors">
          <span aria-hidden="true">View details</span>
          <FiArrowRight className="w-3 h-3" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
