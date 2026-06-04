"use client";

import { DashboardTable, type DashboardColumn } from "./DashboardTable";
import type { PaymentResponseDto } from "@/app/types/payments";

const statusStyles: Record<string, string> = {
  succeeded:           "bg-emerald-100 text-emerald-700",
  pending:             "bg-amber-100 text-amber-700",
  failed:              "bg-red-100 text-red-700",
  refunded:            "bg-stone-100 text-stone-600",
  partially_refunded:  "bg-stone-100 text-stone-600",
};

function formatAmount(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface RecentPaymentsTableClientProps {
  data: PaymentResponseDto[];
  title: string;
  viewAllHref: string;
  viewAllLabel: string;
  emptyMessage: string;
  translations: {
    id?: string;
    amount?: string;
    status?: string;
    description?: string;
    date?: string;
  };
}

export default function RecentPaymentsTableClient({
  data,
  title,
  viewAllHref,
  viewAllLabel,
  emptyMessage,
  translations: t,
}: RecentPaymentsTableClientProps) {
  const columns: DashboardColumn<PaymentResponseDto>[] = [
    {
      key: "id",
      label: t.id ?? "ID",
      render: (row) => (
        <span className="font-mono text-xs text-stone-500" title={row.id}>
          ...{row.id.slice(-8)}
        </span>
      ),
    },
    {
      key: "amount",
      label: t.amount ?? "Amount",
      align: "right",
      render: (row) => (
        <span className="font-medium text-stone-800 tabular-nums">
          {formatAmount(row.amount, row.currency)}
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
      key: "description",
      label: t.description ?? "Description",
      render: (row) => (
        <span className="text-stone-600 text-sm truncate max-w-[160px] block">
          {row.description || "—"}
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
