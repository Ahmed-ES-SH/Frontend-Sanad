"use client";

import React from "react";

export function StatChip({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="flex items-center gap-3 px-5 py-3 rounded-2xl"
      style={{
        background: "var(--surface-card-bg)",
        border: "1px solid var(--surface-card-border)",
      }}
    >
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: "var(--primary-50)", color: "var(--primary)" }}
      >
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span
          className="caption font-medium"
          style={{ color: "var(--surface-400)" }}
        >
          {label}
        </span>
        <span
          className="body-sm font-semibold truncate"
          style={{ color: "var(--surface-800)" }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}
