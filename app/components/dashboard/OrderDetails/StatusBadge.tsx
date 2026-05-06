// ============================================================================
// STATUS BADGE COMPONENT - Displays order status with styling
// ============================================================================

"use client";

import { ORDER_STATUS_BADGE_CONFIG } from "@/app/constants/orderDetails";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = ORDER_STATUS_BADGE_CONFIG[status] || ORDER_STATUS_BADGE_CONFIG.processing;

  return (
    <div
      className={`${config.bgColor} ${config.textColor} px-3 py-1.5 rounded-full flex items-center gap-2 caption font-display`}
    >
      <span className={`w-2 h-2 rounded-full ${config.dotColor}`} />
      {config.label}
    </div>
  );
}