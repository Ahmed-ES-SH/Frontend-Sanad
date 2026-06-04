"use client";

import { DashboardTable, type DashboardColumn } from "./DashboardTable";
import type { ContactMessage } from "@/app/types/contact";

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface RecentMessagesTableClientProps {
  data: ContactMessage[];
  title: string;
  viewAllHref: string;
  viewAllLabel: string;
  emptyMessage: string;
  translations: {
    name?: string;
    subject?: string;
    status?: string;
    date?: string;
  };
}

export default function RecentMessagesTableClient({
  data,
  title,
  viewAllHref,
  viewAllLabel,
  emptyMessage,
  translations: t,
}: RecentMessagesTableClientProps) {
  const columns: DashboardColumn<ContactMessage>[] = [
    {
      key: "fullName",
      label: t.name ?? "Name",
      render: (row) => (
        <div>
          <p className="text-sm font-medium text-stone-800 leading-tight">
            {row.fullName}
          </p>
          <p className="text-[11px] text-stone-400 leading-tight">{row.email}</p>
        </div>
      ),
    },
    {
      key: "subject",
      label: t.subject ?? "Subject",
      render: (row) => (
        <span className="text-stone-600 text-sm truncate max-w-[160px] block">
          {row.subject}
        </span>
      ),
    },
    {
      key: "isRead",
      label: t.status ?? "Status",
      render: (row) => (
        <span
          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            row.isRead
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {row.isRead ? "Read" : "Unread"}
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
