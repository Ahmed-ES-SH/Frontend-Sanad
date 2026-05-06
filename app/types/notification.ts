// ============================================================================
// NOTIFICATION TYPES - Type definitions for the notification system
// ============================================================================

// ============================================================================
// NOTIFICATION TYPE ENUM - Allowed notification types
// ============================================================================

export type NotificationType =
  | "ORDER_UPDATED"
  | "PAYMENT_SUCCESS"
  | "PAYMENT_FAILED"
  | "SYSTEM"
  | "BROADCAST";

// ============================================================================
// NOTIFICATION ENTITY - Core notification data structure
// ============================================================================

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// NOTIFICATION PREFERENCES - User notification preferences
// ============================================================================

export interface NotificationPreferences {
  id: string;
  userId: string;
  orderNotifications: boolean;
  paymentNotifications: boolean;
  systemNotifications: boolean;
  emailEnabled: boolean;
  pushEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// PAGINATION META - Standard pagination response
// ============================================================================

export interface NotificationPaginationMeta {
  page: number;
  limit: number;
  total: number;
}

// ============================================================================
// API RESPONSES - Typed responses from backend endpoints
// ============================================================================

// List Notifications Response (200 OK)
export interface NotificationListResponse {
  data: Notification[];
  total: number;
  page: number;
  limit: number;
}

// Unread Count Response (200 OK)
export interface UnreadCountResponse {
  unreadCount: number;
}

// Mark All as Read Response (200 OK)
export interface MarkAllReadResponse {
  success: boolean;
}

// Broadcast Response (200 OK)
export interface BroadcastResponse {
  success: boolean;
}

// ============================================================================
// SOCKET.IO EVENT TYPES - Server to Client events
// ============================================================================

export interface ServerToClientEvents {
  "notification:new": (notification: Notification) => void;
  "notification:read": (data: { notificationId: string }) => void;
  "notification:read_all": () => void;
  "notification:count": (data: { unreadCount: number }) => void;
  "notification:delete": (data: { notificationId: string }) => void;
}

// ============================================================================
// SOCKET.IO EVENT TYPES - Client to Server events
// ============================================================================

export interface ClientToServerEvents {
  "notification:read": (data: { notificationId: string }) => void;
  "notification:read_all": () => void;
}

// ============================================================================
// QUERY PARAMETERS - API request parameters
// ============================================================================

export interface NotificationQueryParams {
  page?: number;
  limit?: number;
}

// ============================================================================
// FORM DATA - Client-side form state
// ============================================================================

export interface SendNotificationFormData {
  userId: number;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
}

export interface BroadcastNotificationFormData {
  title: string;
  message: string;
  targetUserIds?: string[];
  data?: Record<string, unknown>;
}

export interface UpdatePreferencesFormData {
  orderNotifications?: boolean;
  paymentNotifications?: boolean;
  systemNotifications?: boolean;
  emailEnabled?: boolean;
  pushEnabled?: boolean;
}

// ============================================================================
// ACTION RESULTS - Server action return types
// ============================================================================

export interface NotificationActionResult<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

// ============================================================================
// NOTIFICATION CONTEXT STATE - State shape for notification context
// ============================================================================

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  preferences: NotificationPreferences | null;
  isLoading: boolean;
  hasFetchedInitial: boolean;
  isSocketConnected: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// ============================================================================
// NOTIFICATION CONTEXT ACTIONS - Action types for reducer
// ============================================================================

export type NotificationAction =
  | {
      type: "SET_NOTIFICATIONS";
      payload: { response: NotificationListResponse; append: boolean };
    }
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "MARK_AS_READ"; payload: string }
  | { type: "MARK_ALL_AS_READ" }
  | { type: "DELETE_NOTIFICATION"; payload: string }
  | { type: "SET_UNREAD_COUNT"; payload: number }
  | { type: "SET_PREFERENCES"; payload: NotificationPreferences }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_SOCKET_STATUS"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "UPDATE_PAGINATION"; payload: { page: number; total: number } };
