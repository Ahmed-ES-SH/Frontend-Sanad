"use client";

import { useState } from "react";
import { Category } from "@/app/types/category";
import { PaginationMeta } from "@/app/types/global";
import { useAppQuery } from "@/app/hooks/useAppQuery";
import { CATEGORIES_ENDPOINTS } from "@/app/constants/endpoints";
import { QuickActions } from "./QuickActions";
import { CategoriesCharts } from "./CategoriesCharts";
import { CategoriesTable } from "./CategoriesTable";
import { CategoryFormModal } from "./CategoryFormModal";
import { CategoryDeleteConfirm } from "./CategoryDeleteConfirm";
import { useQueryClient } from "@tanstack/react-query";

interface CategoriesClientProps {
  initialData: {
    data: Category[];
    meta: PaginationMeta;
  };
}

export function CategoriesClient({ initialData }: CategoriesClientProps) {
  const [page, setPage] = useState(1);
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    categoryId: string | null;
    categoryName: string;
  }>({
    isOpen: false,
    categoryId: null,
    categoryName: "",
  });

  const queryClient = useQueryClient();

  const queryKey = ["categories", page];
  const queryParams = new URLSearchParams({ page: String(page) }).toString();
  
  const { data, isLoading, error, refetch } = useAppQuery<{ data: Category[]; meta: PaginationMeta }>({
    queryKey,
    endpoint: `${CATEGORIES_ENDPOINTS.ADMIN_LIST}?${queryParams}`,
    enabled: isQueryEnabled,
  });

  // Use fetched data if query is enabled, otherwise fallback to initialData
  const displayData = isQueryEnabled && data ? data.data : initialData.data;
  const displayMeta = isQueryEnabled && data ? data.meta : initialData.meta;
  const isFetching = isQueryEnabled ? isLoading : false;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setIsQueryEnabled(true);
  };

  const handleAddClick = () => {
    setEditingCategory(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (category: Category) => {
    setDeleteModal({
      isOpen: true,
      categoryId: category.id,
      categoryName: category.name,
    });
  };

  const handleSuccess = () => {
    setIsFormOpen(false);
    setEditingCategory(null);
    setDeleteModal({ isOpen: false, categoryId: null, categoryName: "" });
    // Invalidate react query cache to refetch the list
    queryClient.invalidateQueries({ queryKey: ["categories"] });
    // If not using react-query cache immediately, manual refetch
    if (isQueryEnabled) {
      refetch();
    } else {
      setIsQueryEnabled(true);
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-surface-900 tracking-tight">Categories</h1>
          <p className="text-surface-500 mt-1 text-sm md:text-base">Manage all service and project categories</p>
        </div>
      </div>

      {error ? (
        <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-lg mb-6 shadow-sm">
          <p className="font-medium">Error loading categories</p>
          <p className="text-sm">{(error as Error).message || "An unexpected error occurred."}</p>
        </div>
      ) : null}

      {/* Quick Actions Component */}
      <QuickActions onAddClick={handleAddClick} />

      {/* Charts Component */}
      <CategoriesCharts />

      {/* Data Table */}
      <CategoriesTable 
        data={displayData} 
        meta={displayMeta} 
        isLoading={isFetching} 
        onPageChange={handlePageChange}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      {/* Modals */}
      <CategoryFormModal 
        isOpen={isFormOpen} 
        onClose={() => {
          setIsFormOpen(false);
          setEditingCategory(null);
        }} 
        onSuccess={handleSuccess}
        category={editingCategory}
      />

      <CategoryDeleteConfirm
        isOpen={deleteModal.isOpen}
        categoryId={deleteModal.categoryId}
        categoryName={deleteModal.categoryName}
        onClose={() => setDeleteModal(prev => ({ ...prev, isOpen: false }))}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
