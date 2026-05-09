"use server";

import { adminSendNotification } from "@/app/actions/notificationApi";
import type {
  NotificationType,
  SendNotificationResponse,
} from "@/app/types/notification";

interface SendNotificationParams {
  userIds: number[];
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
}

export async function sendNotificationAction(
  data: SendNotificationParams,
): Promise<SendNotificationResponse> {
  const { userIds, type, title, message, data: extraData } = data;

  if (!userIds || userIds.length === 0) {
    return {
      success: false,
      message: "Please select at least one user",
      sent: 0,
      failed: 0,
      failedIds: [],
    };
  }

  if (!title.trim()) {
    return {
      success: false,
      message: "Title is required",
      sent: 0,
      failed: 0,
      failedIds: [],
    };
  }

  if (!message.trim()) {
    return {
      success: false,
      message: "Message is required",
      sent: 0,
      failed: 0,
      failedIds: [],
    };
  }

  // Deduplicate IDs before sending
  const uniqueIds = [...new Set(userIds)];

  try {
    return await adminSendNotification({
      ids: uniqueIds,
      type,
      title: title.trim(),
      message: message.trim(),
      ...(extraData !== undefined && { data: extraData }),
    });
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to send notification",
      sent: 0,
      failed: uniqueIds.length,
      failedIds: [],
    };
  }
}