"use client";

import { Category } from "@/app/types/category";
import { PaginationMeta } from "@/app/types/global";
import { motion } from "framer-motion";
import { FiFolder, FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import CategoriesPaginaiton from "./CategoriesPaginaiton";
import { getIconComponent } from "@/app/helpers/getIconComponent";

interface CategoriesTableProps {
  data: Category[];
  meta: PaginationMeta | undefined;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export function CategoriesTable({
  data,
  meta,
  isLoading,
  onPageChange,
  onEdit,
  onDelete,
}: CategoriesTableProps) {
  return (
    <div className="surface-card rounded-xl border border-surface-200 shadow-surface-md overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-50 border-b border-surface-200 text-sm text-surface-600">
              <th className="py-4 px-6 font-semibold">Category</th>
              <th className="py-4 px-6 font-semibold">Slug</th>
              <th className="py-4 px-6 font-semibold text-center">Color</th>
              <th className="py-4 px-6 font-semibold">Created At</th>
              <th className="py-4 px-6 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {isLoading && data.length === 0 ? (
              // Skeleton loading
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={`skeleton-${i}`} className="animate-pulse">
                  <td className="py-4 px-6">
                    <div className="h-5 bg-surface-200 rounded w-3/4"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4 bg-surface-200 rounded w-1/2"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-6 w-6 bg-surface-200 rounded-full mx-auto"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4 bg-surface-200 rounded w-24"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-8 bg-surface-200 rounded w-20 ml-auto"></div>
                  </td>
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-surface-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <FiFolder className="w-12 h-12 text-surface-300" />
                    <p>No categories found.</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item, i) => (
                <motion.tr
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  key={item.id}
                  className={`hover:bg-surface-50 transition-colors ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      {item.icon && (
                        <div className="w-10 h-10 rounded bg-surface-100 flex items-center justify-center text-surface-600">
                          {(() => {
                            const Icon = getIconComponent(item.icon);
                            return <Icon className="text-lg" />;
                          })()}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-surface-900">
                          {item.name}
                        </p>
                        {item.description && (
                          <p className="text-sm text-surface-500 truncate max-w-[200px]">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-surface-600 bg-surface-100 px-2 py-1 rounded font-mono">
                      {item.slug}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center">
                      <div
                        className="w-6 h-6 rounded-full shadow-sm border border-surface-200"
                        style={{ backgroundColor: item.color || "#e5e7eb" }}
                        title={item.color || "No color"}
                      />
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-surface-600">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="p-2 text-surface-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <FiEdit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onDelete(item)}
                        className="p-2 text-surface-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      {meta && meta.lastPage > 1 && (
        <div className="p-4 border-t border-surface-200 bg-surface-50 max-md:flex-col  gap-4  flex items-center justify-between">
          <p className="text-sm text-surface-600">
            Showing{" "}
            <span className="font-medium">
              {(meta.page - 1) * meta.perPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(meta.page * meta.perPage, meta.total)}
            </span>{" "}
            of <span className="font-medium">{meta.total}</span> results
          </p>
          <div className="flex items-center gap-1">
            <button
              disabled={meta.page <= 1 || isLoading}
              onClick={() => onPageChange(meta.page - 1)}
              className="px-3 py-1.5 rounded-md border border-surface-300 text-sm font-medium text-surface-700 bg-white hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
            >
              <FiChevronLeft className="w-4 h-4" />
              Prev
            </button>

            {/* Simple page numbers */}
            <CategoriesPaginaiton
              meta={meta}
              onPageChange={onPageChange}
              isLoading={isLoading}
            />

            <button
              disabled={meta.page >= meta.lastPage || isLoading}
              onClick={() => onPageChange(meta.page + 1)}
              className="px-3 py-1.5 rounded-md border border-surface-300 text-sm font-medium text-surface-700 bg-white hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
            >
              Next
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}