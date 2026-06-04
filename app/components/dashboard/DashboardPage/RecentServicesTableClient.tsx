"use client";

import { DashboardTable, type DashboardColumn } from "./DashboardTable";
import type { Service } from "@/app/types/service";

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface RecentServicesTableClientProps {
  data: Service[];
  title: string;
  viewAllHref: string;
  viewAllLabel: string;
  emptyMessage: string;
  translations: {
    title?: string;
    category?: string;
    price?: string;
    status?: string;
    date?: string;
  };
}

export default function RecentServicesTableClient({
  data,
  title,
  viewAllHref,
  viewAllLabel,
  emptyMessage,
  translations: t,
}: RecentServicesTableClientProps) {
  const columns: DashboardColumn<Service>[] = [
    {
      key: "title",
      label: t.title ?? "Title",
      render: (row) => (
        <div className="flex items-center gap-2.5">
          {row.iconUrl ? (
            <img
              src={row.iconUrl}
              alt=""
              className="w-6 h-6 rounded object-contain"
            />
          ) : (
            <div className="w-6 h-6 rounded bg-stone-100 flex items-center justify-center text-stone-400 text-[10px]">
              🔧
            </div>
          )}
          <span className="text-stone-800 font-medium text-sm truncate max-w-[140px] block">
            {row.title}
          </span>
        </div>
      ),
    },
    {
      key: "category",
      label: t.category ?? "Category",
      render: (row) => (
        <span className="text-stone-600 text-sm">
          {row.category?.name ?? "—"}
        </span>
      ),
    },
    {
      key: "basePrice",
      label: t.price ?? "Price",
      render: (row) => (
        <span className="font-medium text-stone-800 tabular-nums text-sm">
          {row.basePrice ? `${row.basePrice}` : "—"}
        </span>
      ),
    },
    {
      key: "isPublished",
      label: t.status ?? "Status",
      render: (row) => (
        <span
          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            row.isPublished
              ? "bg-green-100 text-green-700"
              : "bg-stone-100 text-stone-500"
          }`}
        >
          {row.isPublished ? "Published" : "Draft"}
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
