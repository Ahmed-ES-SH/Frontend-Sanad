"use client";

import { useState, useCallback } from "react";
import { sendNotificationAction } from "../../actions/sendNotification";
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

export function useSendNotification() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<SendNotificationResponse | null>(null);

  const submit = useCallback(
    async (
      params: SendNotificationParams,
    ): Promise<SendNotificationResponse> => {
      setIsSubmitting(true);
      setResult(null);

      try {
        const response = await sendNotificationAction(params);
        setResult(response);
        return response;
      } catch (error) {
        const errorResponse: SendNotificationResponse = {
          success: false,
          message: error instanceof Error ? error.message : "An error occurred",
          sent: 0,
          failed: params.userIds.length,
          failedIds: [],
        };
        setResult(errorResponse);
        return errorResponse;
      } finally {
        setIsSubmitting(false);
      }
    },
    [],
  );

  const clearResult = useCallback(() => {
    setResult(null);
  }, []);

  return { isSubmitting, result, submit, clearResult };
}
