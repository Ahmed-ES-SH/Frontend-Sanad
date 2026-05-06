"use client";

import { useState, useEffect } from "react";
import { Service } from "@/app/types/service";
import { PaginationMeta } from "@/app/types/global";
import { useServiceCards, ServiceCardData } from "@/app/hooks/services/useServiceCards";
import { DEFAULT_SKELETON_COUNT } from "@/app/constants/serviceCards";
import { ServiceCardSkeleton } from "./ServiceCardSkeleton";
import { ServiceCard } from "./ServiceCard";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { EmptyState } from "./EmptyState";
import { getTranslations } from "@/app/helpers/getTranslations";
import { useLocale } from "@/app/hooks/useLocale";
import { ServicesPagination } from "./ServicesPagination";

interface ServiceCardsProps {
  initialServices?: Service[];
  initialMeta?: PaginationMeta;
  searchQuery?: string;
  categoryId?: string;
  sortBy?: string;
  sortOrder?: string;
}

/**
 * Service Cards Component
 * Displays a grid of service cards with management actions
 */
export default function ServiceCards({
  initialServices = [],
  initialMeta,
  searchQuery = "",
  categoryId = "",
  sortBy = "createdAt",
  sortOrder = "DESC",
}: ServiceCardsProps) {
  const [page, setPage] = useState(initialMeta?.page || 1);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, categoryId, sortBy, sortOrder]);
  const locale = useLocale();
  const translations = getTranslations(locale);
  const t = translations.ServicesPage?.ServiceCards || {
    status: { published: "Published", draft: "Draft" },
    actions: { manage: "Manage", unpublish: "Unpublish", publish: "Publish", delete: "Delete" },
    category: { uncategorized: "Uncategorized" },
    deleteDialog: {
      title: "Delete Service?",
      warning: "This action cannot be undone",
      message: 'Are you sure you want to delete "{{title}}"? This will permanently remove the service.',
      confirm: "Delete Service",
      cancel: "Cancel",
    },
    empty: {
      title: "No Services Found",
      withFilters: "Try adjusting your filters to find what you're looking for.",
      noItems: "No services have been created yet.",
    },
  };

  const {
    services,
    meta,
    isLoading,
    isFetching,
    deleteId,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    handleTogglePublish,
  } = useServiceCards({
    initialServices,
    initialMeta,
    searchQuery,
    categoryId,
    sortBy,
    sortOrder,
    page,
  });

  const showSkeletons = isFetching && (!services.length || isLoading);

  const hasFilters = Boolean(searchQuery || categoryId);

  const selectedService = services.find((s) => s.id === deleteId);

  return (
    <>
      {/* Services Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {showSkeletons
          ? Array.from({ length: DEFAULT_SKELETON_COUNT }).map((_, i) => (
            <ServiceCardSkeleton key={i} />
          ))
          : services.map((service: ServiceCardData) => (
            <ServiceCard
              key={service.id}
              service={service}
              onDelete={handleDeleteClick}
              onTogglePublish={handleTogglePublish}
              translations={t}
            />
          ))}
      </section>

      {/* Empty State */}
      {!isFetching && services.length === 0 && (
        <EmptyState hasFilters={hasFilters} translations={t.empty} />
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        serviceTitle={selectedService?.title || ""}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isOpen={Boolean(deleteId)}
        translations={{ deleteDialog: t.deleteDialog }}
      />

      {/* Pagination */}
      <div className="mt-8">
        <ServicesPagination
          meta={meta}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}