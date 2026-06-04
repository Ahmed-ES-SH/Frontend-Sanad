"use client";

import { DashboardTable, type DashboardColumn } from "./DashboardTable";
import type { User } from "@/app/types/user";

function getInitials(name: string | null): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface RecentUsersTableClientProps {
  data: User[];
  title: string;
  viewAllHref: string;
  viewAllLabel: string;
  emptyMessage: string;
  translations: {
    name?: string;
    role?: string;
    verified?: string;
    joined?: string;
  };
}

export default function RecentUsersTableClient({
  data,
  title,
  viewAllHref,
  viewAllLabel,
  emptyMessage,
  translations: t,
}: RecentUsersTableClientProps) {
  const columns: DashboardColumn<User>[] = [
    {
      key: "name",
      label: t.name ?? "User",
      render: (row) => (
        <div className="flex items-center gap-2.5">
          {row.avatar ? (
            <img
              src={row.avatar}
              alt=""
              className="w-7 h-7 rounded-full object-cover ring-2 ring-stone-100"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 font-bold text-[10px]">
              {getInitials(row.name)}
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-stone-800 leading-tight">
              {row.name || "Unnamed"}
            </p>
            <p className="text-[11px] text-stone-400 leading-tight">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      label: t.role ?? "Role",
      render: (row) => (
        <span
          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            row.role === "admin"
              ? "bg-orange-100 text-orange-700"
              : "bg-sky-100 text-sky-700"
          }`}
        >
          {row.role}
        </span>
      ),
    },
    {
      key: "isEmailVerified",
      label: t.verified ?? "Verified",
      render: (row) => (
        <div
          className={`flex items-center gap-1.5 text-[11px] font-semibold ${
            row.isEmailVerified ? "text-green-600" : "text-amber-600"
          }`}
        >
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              row.isEmailVerified ? "bg-green-500" : "bg-amber-500"
            }`}
          />
          {row.isEmailVerified ? "Verified" : "Pending"}
        </div>
      ),
    },
    {
      key: "createdAt",
      label: t.joined ?? "Joined",
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
