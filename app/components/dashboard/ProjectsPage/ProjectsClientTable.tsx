"use client";

import React from "react";
import { Project } from "@/app/types/project";
import { Category, PaginationMeta } from "@/app/types/global";
import ProjectsFilterBar from "./ProjectsFilterBar";
import { useProjectsTable } from "@/app/hooks/useProjectsTable";

import NewProjectButton from "./NewProjectButton";
import ProjectsTable from "./ProjectsTable";
import ProjectsPagination from "./ProjectsPagination";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

export interface ProjectsClientTableProps {
  initialProjects: Project[];
  initialMeta: PaginationMeta;
  categories: Category[];
}

export default function ProjectsClientTable({
  initialProjects,
  initialMeta,
  categories,
}: ProjectsClientTableProps) {
  const {
    projects,
    meta,
    isLoading,
    page,
    selectedCategory,
    searchQuery,
    deleteModalOpen,
    projectToDelete,
    isDeleting,
    setPage,
    setSelectedCategory,
    setSearchQuery,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  } = useProjectsTable({
    initialProjects,
    initialMeta,
  });

  return (
    <div className="w-full space-y-6">
      {/* New Project Button */}
      <div className="w-fit ml-auto">
        <NewProjectButton />
      </div>

      {/* Filter Bar */}
      <ProjectsFilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={(val) => {
          setSelectedCategory(val);
          setPage(1);
        }}
        searchQuery={searchQuery}
        onSearchChange={(val) => {
          setSearchQuery(val);
          setPage(1);
        }}
      />

      {/* Projects Table */}
      <ProjectsTable
        projects={projects}
        isLoading={isLoading}
        onDelete={openDeleteModal}
      />

      {/* Show pagination when projects exist */}
      {projects.length > 0 && meta.lastPage > 1 && (
        <div className="surface-card rounded-xl shadow-surface-md border border-[var(--surface-card-border)] overflow-hidden bg-white">
          <ProjectsPagination
            meta={meta}
            currentPage={page}
            isLoading={isLoading}
            onPageChange={setPage}
          />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        project={projectToDelete}
        isDeleting={isDeleting}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
