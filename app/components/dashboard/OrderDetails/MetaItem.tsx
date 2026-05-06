// ============================================================================
// META ITEM COMPONENT - Displays key-value metadata pair
// ============================================================================

"use client";

import { ReactNode } from "react";

interface MetaItemProps {
  icon: ReactNode;
  label: string;
  value: string;
}

export function MetaItem({ icon, label, value }: MetaItemProps) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-surface-100 last:border-0">
      <div className="p-2 rounded-lg bg-surface-50 text-surface-500">
        {icon}
      </div>
      <div>
        <p className="caption-xs text-surface-400 uppercase tracking-wider">
          {label}
        </p>
        <p className="body-sm font-semibold text-surface-900">{value}</p>
      </div>
    </div>
  );
}