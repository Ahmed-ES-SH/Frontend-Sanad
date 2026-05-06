/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { ENDPOINTS } from "@/app/constants/notifications";
import {
  NotificationListResponse,
  UnreadCountResponse,
  MarkAllReadResponse,
  BroadcastResponse,
  NotificationPreferences,
  SendNotificationFormData,
  BroadcastNotificationFormData,
  UpdatePreferencesFormData,
} from "@/app/types/notification";
import { globalRequest } from "../helpers/globalRequest";
import { getAuthCookie } from "../helpers/session";


// ----------------------------------------------------------------------------

export async function getNotificationToken(): Promise<string | undefined> {
  return await getAuthCookie();
}

export async function fetchNotifications(

  page: number = 1,
  limit: number = 10,
): Promise<NotificationListResponse> {
  const result = await globalRequest<undefined, NotificationListResponse>({
    endpoint: ENDPOINTS.LIST(page, limit),
    method: "GET",
    defaultErrorMessage: "Failed to fetch notifications",
  });

  if (!result.success || !result.data) {
    throw new Error(result.message);
  }

  return result.data;
}

export async function fetchUnreadCount(): Promise<UnreadCountResponse> {
  const result = await globalRequest<undefined, UnreadCountResponse>({
    endpoint: ENDPOINTS.UNREAD_COUNT,
    method: "GET",
    defaultErrorMessage: "Failed to fetch unread count",
  });

  if (!result.success || !result.data) {
    throw new Error(result.message);
  }

  return result.data;
}

export async function markAsRead(id: string): Promise<{ success: boolean }> {
  const result = await globalRequest<undefined, { success: boolean }>({
    endpoint: ENDPOINTS.MARK_AS_READ(id),
    method: "PATCH",
    defaultErrorMessage: "Failed to mark notification as read",
  });

  if (!result.success) {
    throw new Error(result.message);
  }

  return { success: result.success };
}

export async function markAllAsRead(): Promise<MarkAllReadResponse> {
  const result = await globalRequest<undefined, MarkAllReadResponse>({
    endpoint: ENDPOINTS.MARK_ALL_AS_READ,
    method: "PATCH",
    defaultErrorMessage: "Failed to mark all notifications as read",
  });

  if (!result.success || !result.data) {
    throw new Error(result.message);
  }

  return result.data;
}

export async function deleteNotification(
  id: string,
): Promise<{ success: boolean }> {
  const result = await globalRequest<undefined, { success: boolean }>({
    endpoint: ENDPOINTS.DELETE(id),
    method: "DELETE",
    defaultErrorMessage: "Failed to delete notification",
  });

  if (!result.success) {
    throw new Error(result.message);
  }

  return { success: result.success };
}

export async function fetchPreferences(): Promise<NotificationPreferences> {
  const result = await globalRequest<undefined, NotificationPreferences>({
    endpoint: ENDPOINTS.PREFERENCES,
    method: "GET",
    defaultErrorMessage: "Failed to fetch preferences",
  });

  if (!result.success || !result.data) {
    throw new Error(result.message);
  }

  return result.data;
}

export async function updatePreferences(
  prefs: UpdatePreferencesFormData,
): Promise<NotificationPreferences> {
  const result = await globalRequest<
    UpdatePreferencesFormData,
    NotificationPreferences
  >({
    endpoint: ENDPOINTS.PREFERENCES,
    method: "PATCH",
    body: prefs,
    defaultErrorMessage: "Failed to update preferences",
  });

  if (!result.success || !result.data) {
    throw new Error(result.message);
  }

  return result.data;
}

// ----------------------------------------------------------------------------
// ADMIN ENDPOINTS
// ----------------------------------------------------------------------------

export async function adminFetchNotifications(
  page: number = 1,
  limit: number = 10,
): Promise<NotificationListResponse> {
  const result = await globalRequest<undefined, NotificationListResponse>({
    endpoint: ENDPOINTS.ADMIN_LIST(page, limit),
    method: "GET",
    defaultErrorMessage: "Failed to fetch admin notifications",
  });

  if (!result.success || !result.data) {
    throw new Error(result.message);
  }

  return result.data;
}

export async function sendNotification(
  data: SendNotificationFormData,
): Promise<{ success: boolean }> {
  const result = await globalRequest<
    SendNotificationFormData,
    { success: boolean }
  >({
    endpoint: ENDPOINTS.ADMIN_SEND,
    method: "POST",
    body: data,
    defaultErrorMessage: "Failed to send notification",
  });

  if (!result.success) {
    throw new Error(result.message);
  }

  return { success: result.success };
}

export async function broadcastNotification(
  data: BroadcastNotificationFormData,
): Promise<BroadcastResponse> {
  const result = await globalRequest<
    BroadcastNotificationFormData,
    BroadcastResponse
  >({
    endpoint: ENDPOINTS.ADMIN_BROADCAST,
    method: "POST",
    body: data,
    defaultErrorMessage: "Failed to broadcast notification",
  });

  if (!result.success || !result.data) {
    throw new Error(result.message);
  }

  return result.data;
}

export async function adminDeleteNotification(
  id: string,
): Promise<{ success: boolean }> {
  const result = await globalRequest<undefined, { success: boolean }>({
    endpoint: ENDPOINTS.ADMIN_DELETE(id),
    method: "DELETE",
    defaultErrorMessage: "Failed to delete notification",
  });

  if (!result.success) {
    throw new Error(result.message);
  }

  return { success: result.success };
}
