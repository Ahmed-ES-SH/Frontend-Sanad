"use client";

import { DashboardTable, type DashboardColumn } from "./DashboardTable";
import { formatCurrency, formatDate } from "@/app/helpers/orderFormatter";
import type { AdminOrder } from "@/app/types/order";

const statusStyles: Record<string, string> = {
  pending:    "bg-yellow-100 text-yellow-700",
  paid:       "bg-blue-100 text-blue-700",
  in_progress:"bg-orange-100 text-orange-700",
  completed:  "bg-green-100 text-green-700",
  cancelled:  "bg-red-100 text-red-700",
};

interface RecentOrdersTableClientProps {
  data: AdminOrder[];
  title: string;
  viewAllHref: string;
  viewAllLabel: string;
  emptyMessage: string;
  translations: {
    id?: string;
    user?: string;
    service?: string;
    status?: string;
    amount?: string;
    date?: string;
  };
}

export default function RecentOrdersTableClient({
  data,
  title,
  viewAllHref,
  viewAllLabel,
  emptyMessage,
  translations: t,
}: RecentOrdersTableClientProps) {
  const columns: DashboardColumn<AdminOrder>[] = [
    {
      key: "id",
      label: t.id ?? "ID",
      render: (row) => (
        <span className="font-mono font-medium text-orange-600 text-xs">
          #{row.id.slice(0, 8).toUpperCase()}
        </span>
      ),
    },
    {
      key: "user",
      label: t.user ?? "User",
      render: (row) => (
        <span className="text-stone-800 font-medium text-sm">
          {row.user?.name ?? row.user?.email ?? "—"}
        </span>
      ),
    },
    {
      key: "service",
      label: t.service ?? "Service",
      render: (row) => (
        <span className="text-stone-600 text-sm truncate max-w-[140px] block">
          {row.service?.title ?? "—"}
        </span>
      ),
    },
    {
      key: "status",
      label: t.status ?? "Status",
      render: (row) => (
        <span
          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            statusStyles[row.status] ?? "bg-stone-100 text-stone-600"
          }`}
        >
          {row.status.replace("_", " ")}
        </span>
      ),
    },
    {
      key: "amount",
      label: t.amount ?? "Amount",
      align: "right",
      render: (row) => (
        <span className="font-medium text-stone-800 tabular-nums">
          {formatCurrency(row.amount, row.currency)}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: t.date ?? "Date",
      render: (row) => (
        <span className="text-stone-500 text-xs">{formatDate(row.createdAt)}</span>
      ),
    },
  ];

  return (
    <DashboardTable
      title={title}
      viewAllHref={viewAllHref}
      viewAllLabel={viewAllLabel}
      columns={columns}
      data={data}
      emptyMessage={emptyMessage}
    />
  );
}
