"use client";

import { DashboardTable, type DashboardColumn } from "./DashboardTable";
import type { Project } from "@/app/types/project";

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface RecentProjectsTableClientProps {
  data: Project[];
  title: string;
  viewAllHref: string;
  viewAllLabel: string;
  emptyMessage: string;
  translations: {
    title?: string;
    category?: string;
    status?: string;
    featured?: string;
    date?: string;
  };
}

export default function RecentProjectsTableClient({
  data,
  title,
  viewAllHref,
  viewAllLabel,
  emptyMessage,
  translations: t,
}: RecentProjectsTableClientProps) {
  const columns: DashboardColumn<Project>[] = [
    {
      key: "title",
      label: t.title ?? "Title",
      render: (row) => (
        <div className="flex items-center gap-2.5">
          {row.coverImageUrl ? (
            <img
              src={row.coverImageUrl}
              alt=""
              className="w-8 h-6 rounded object-cover ring-1 ring-stone-200"
            />
          ) : (
            <div className="w-8 h-6 rounded bg-stone-100 flex items-center justify-center text-stone-400 text-[10px]">
              🖼
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
      key: "isFeatured",
      label: t.featured ?? "Featured",
      render: (row) =>
        row.isFeatured ? (
          <span className="text-amber-600 text-sm">⭐ {t.featured ?? "Featured"}</span>
        ) : (
          <span className="text-stone-400 text-sm">—</span>
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
