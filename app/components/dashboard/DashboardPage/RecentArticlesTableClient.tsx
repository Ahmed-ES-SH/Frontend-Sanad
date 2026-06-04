"use client";

import { DashboardTable, type DashboardColumn } from "./DashboardTable";
import type { Article } from "@/app/types/blog";

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface RecentArticlesTableClientProps {
  data: Article[];
  title: string;
  viewAllHref: string;
  viewAllLabel: string;
  emptyMessage: string;
  translations: {
    title?: string;
    views?: string;
    readTime?: string;
    status?: string;
    date?: string;
  };
}

export default function RecentArticlesTableClient({
  data,
  title,
  viewAllHref,
  viewAllLabel,
  emptyMessage,
  translations: t,
}: RecentArticlesTableClientProps) {
  const columns: DashboardColumn<Article>[] = [
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
              📝
            </div>
          )}
          <span className="text-stone-800 font-medium text-sm truncate max-w-[160px] block">
            {row.title}
          </span>
        </div>
      ),
    },
    {
      key: "viewsCount",
      label: t.views ?? "Views",
      render: (row) => (
        <span className="text-stone-600 text-sm tabular-nums">
          {row.viewsCount?.toLocaleString() ?? "0"}
        </span>
      ),
    },
    {
      key: "readTimeMinutes",
      label: t.readTime ?? "Read Time",
      render: (row) => (
        <span className="text-stone-600 text-sm">
          {row.readTimeMinutes ? `${row.readTimeMinutes} min` : "—"}
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
