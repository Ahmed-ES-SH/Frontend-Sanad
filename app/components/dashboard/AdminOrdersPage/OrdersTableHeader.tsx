"use client";

import React from "react";
import { useTranslation } from "@/app/hooks/useTranslation";

interface Column {
  key: string;
  label: string;
}

interface OrdersTableHeaderProps {
  columns: Column[];
}

export function OrdersTableHeader({ columns }: OrdersTableHeaderProps) {
  const t = useTranslation("OrdersPage");

  return (
    <thead>
      <tr className="border-b border-surface-100">
        {columns.map((col) => (
          <th
            key={col.key}
            className="px-4 py-3 text-xs font-bold text-surface-500 uppercase tracking-wider text-left"
          >
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}