"use client";

import { useTranslation } from "@/app/hooks/useTranslation";

interface FilterBarProps {
  statusFilter: string;
  onStatusChange: (status: string) => void;
}

export function FilterBar({ statusFilter, onStatusChange }: FilterBarProps) {
  const t = useTranslation("DashOrdersPage");

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="px-3 py-2.5 text-sm rounded-xl border border-[var(--surface-input-border)] bg-[var(--surface-input-bg)] text-surface-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
      >
        <option value="all">{t.filters?.all || "All Statuses"}</option>
        <option value="pending">{t.status?.pending || "Pending"}</option>
        <option value="paid">{t.status?.paid || "Paid"}</option>
        <option value="in_progress">{t.status?.in_progress || "In Progress"}</option>
        <option value="completed">{t.status?.completed || "Completed"}</option>
        <option value="cancelled">{t.status?.cancelled || "Cancelled"}</option>
      </select>
    </div>
  );
}

FilterBar.displayName = "FilterBar";