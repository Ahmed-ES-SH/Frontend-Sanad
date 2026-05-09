"use client";

import { motion } from "framer-motion";
import {
  FiCheck,
  FiAlertTriangle,
  FiAlertCircle,
} from "react-icons/fi";
import type { SendNotificationResponse } from "@/app/types/notification";

interface ResultBannerProps {
  result: SendNotificationResponse;
}

export function ResultBanner({ result }: ResultBannerProps) {
  const { success, message, sent, failed } = result;

  const isPartial = success && sent > 0 && failed > 0;
  const isAllSuccess = success && failed === 0;

  const bannerVariant = isAllSuccess
    ? "success"
    : isPartial
      ? "partial"
      : "error";

  const bannerMessage = isAllSuccess
    ? `Notification sent to ${sent} user(s)`
    : isPartial
      ? `Sent to ${sent} user(s), ${failed} failed`
      : message;

  const bannerDetail = isAllSuccess
    ? message
    : isPartial
      ? message
      : failed > 0
        ? `Failed to deliver to ${failed} user(s)`
        : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-3 p-3 rounded-xl border ${
        bannerVariant === "success"
          ? "bg-green-50 text-green-800 border-green-200"
          : bannerVariant === "partial"
            ? "bg-amber-50 text-amber-800 border-amber-200"
            : "bg-red-50 text-red-800 border-red-200"
      }`}
    >
      {bannerVariant === "success" ? (
        <FiCheck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
      ) : bannerVariant === "partial" ? (
        <FiAlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
      ) : (
        <FiAlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
      )}
      <div className="text-sm">
        <p className="font-semibold">{bannerMessage}</p>
        {bannerDetail && (
          <p className="text-xs opacity-80 mt-0.5">{bannerDetail}</p>
        )}
      </div>
    </motion.div>
  );
}
