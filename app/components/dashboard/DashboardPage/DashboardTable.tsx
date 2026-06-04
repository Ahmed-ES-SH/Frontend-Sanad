"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import LocaleLink from "../../global/LocaleLink";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DashboardColumn<T> {
  key: string;
  label: string;
  /** Optional custom renderer. Defaults to String(row[key]). */
  render?: (row: T) => ReactNode;
  /** Optional CSS class for the <td>. */
  className?: string;
  /** Optional header alignment. Default is left. */
  align?: "left" | "right" | "center";
}

export interface DashboardTableProps<T> {
  title: string;
  viewAllHref: string;
  viewAllLabel?: string;
  columns: DashboardColumn<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  /** Key extractor — defaults to (row: T) => (row as any).id */
  rowKey?: (row: T) => string | number;
}

// ---------------------------------------------------------------------------
// Loading skeleton
// ---------------------------------------------------------------------------

function SkeletonRow({ cols }: { cols: number }) {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-5 py-4">
          <div className="h-4 bg-stone-200 rounded w-3/4" />
        </td>
      ))}
    </tr>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DashboardTable<T>({
  title,
  viewAllHref,
  viewAllLabel = "View All",
  columns,
  data,
  isLoading = false,
  emptyMessage = "No data available.",
  rowKey,
}: DashboardTableProps<T>) {
  const getKey = rowKey ?? ((row: T) => (row as Record<string, unknown>).id as string | number);

  const alignmentClass = (align?: "left" | "right" | "center") => {
    switch (align) {
      case "right":
        return "text-right";
      case "center":
        return "text-center";
      default:
        return "text-left";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
        <h3 className="text-base font-semibold text-stone-900">{title}</h3>
        <LocaleLink
          href={viewAllHref}
          className="text-orange-600 text-xs font-medium hover:text-orange-700 hover:underline transition-colors"
        >
          {viewAllLabel} &rarr;
        </LocaleLink>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <table className="w-full">
          <thead>
            <tr className="bg-stone-50/50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-stone-500 ${alignmentClass(col.align)}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonRow key={i} cols={columns.length} />
            ))}
          </tbody>
        </table>
      ) : data.length === 0 ? (
        <div className="px-5 py-10 text-center">
          <p className="text-stone-400 text-sm">{emptyMessage}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-stone-50/50">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-stone-500 ${alignmentClass(col.align)}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {data.map((row, idx) => (
                <motion.tr
                  key={getKey(row)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.04 }}
                  className="hover:bg-stone-50/50 transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-5 py-3 text-sm ${alignmentClass(col.align)} ${col.className ?? ""}`}
                    >
                      {col.render
                        ? col.render(row)
                        : ((row as Record<string, unknown>)[col.key] as ReactNode) ?? "—"}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}
