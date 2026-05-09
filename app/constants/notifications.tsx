import { NotificationType } from "@/app/types/notification";
import { NOTIFICATIONS_ENDPOINTS } from "./endpoints";
import { FiBell, FiCheck, FiClock } from "react-icons/fi";

export const NOTIFICATION_CONSTANTS = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
};

export const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
  ORDER_CREATED: "Order Created",
  ORDER_UPDATED: "Order Update",
  PAYMENT_SUCCESS: "Payment Successful",
  PAYMENT_FAILED: "Payment Failed",
  SYSTEM: "System Alert",
  BROADCAST: "Announcement",
};

export const SOCKET_CONFIG = {
  RECONNECTION: true,
  RECONNECTION_DELAY: 1000,
  RECONNECTION_DELAY_MAX: 5000,
  RECONNECTION_ATTEMPTS: 5,
  TRANSPORTS: ["websocket"] as const,
};

// Re-export endpoints for convenience
export const ENDPOINTS = NOTIFICATIONS_ENDPOINTS;

// Color mapping for notification types
export const TYPE_COLORS: Record<NotificationType, string> = {
  ORDER_CREATED: "bg-sky-50 text-sky-600",
  ORDER_UPDATED: "bg-blue-50 text-blue-600",
  PAYMENT_SUCCESS: "bg-green-50 text-green-600",
  PAYMENT_FAILED: "bg-red-50 text-red-600",
  SYSTEM: "bg-purple-50 text-purple-600",
  BROADCAST: "bg-amber-50 text-amber-600",
};

// Icon mapping for notification types
export const NOTIFICATION_TYPE_ICONS: Record<
  NotificationType,
  React.ReactNode
> = {
  ORDER_CREATED: <FiBell className="w-5 h-5" />,
  ORDER_UPDATED: <FiBell className="w-5 h-5" />,
  PAYMENT_SUCCESS: <FiCheck className="w-5 h-5" />,
  PAYMENT_FAILED: <FiClock className="w-5 h-5" />,
  SYSTEM: <FiBell className="w-5 h-5" />,
  BROADCAST: <FiBell className="w-5 h-5" />,
};

// Send notification form-specific constants
export const SEND_NOTIFICATION_TYPES: {
  value: NotificationType;
  label: string;
  icon: string;
}[] = [
  { value: "ORDER_UPDATED", label: "Order Updated", icon: "📦" },
  { value: "ORDER_CREATED", label: "Order Created", icon: "🆕" },
  { value: "PAYMENT_SUCCESS", label: "Payment Success", icon: "✅" },
  { value: "PAYMENT_FAILED", label: "Payment Failed", icon: "❌" },
  { value: "SYSTEM", label: "System Alert", icon: "🔔" },
  { value: "BROADCAST", label: "Announcement", icon: "📢" },
] as const;

export const NOTIFICATION_FORM = {
  MAX_SELECTIONS_MULTIPLE: 100,
  MAX_SELECTIONS_SINGLE: 1,
  MAX_TITLE_LENGTH: 255,
  USERS_PER_PAGE: 10,
} as const;
