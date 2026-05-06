import { useCallback, useEffect, useMemo, useState } from "react";
import { Project } from "@/app/types/project";
import { PaginationMeta } from "@/app/types/global";
import { PORTFOLIO_ENDPOINTS } from "@/app/constants/endpoints";
import { PROJECTS_DEFAULT_LIMIT, SEARCH_DEBOUNCE_DELAY } from "@/app/constants/projects";
import { useAppQuery } from "./useAppQuery";
import { instance } from "@/app/helpers/axios";

export interface UseProjectsTableProps {
  initialProjects: Project[];
  initialMeta: PaginationMeta;
}

export interface UseProjectsTableResult {
  projects: Project[];
  meta: PaginationMeta;
  isLoading: boolean;
  isFetching: boolean;
  page: number;
  selectedCategory: string;
  searchQuery: string;
  deleteModalOpen: boolean;
  projectToDelete: Project | null;
  isDeleting: boolean;
  setPage: (page: number) => void;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  openDeleteModal: (project: Project) => void;
  closeDeleteModal: () => void;
  confirmDelete: () => Promise<void>;
}

/**
 * Projects table hook with built-in state management
 * Handles pagination, filtering, search, and delete operations
 */
export function useProjectsTable({
  initialProjects,
  initialMeta,
}: UseProjectsTableProps): UseProjectsTableResult {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [meta, setMeta] = useState<PaginationMeta>(initialMeta);

  const [page, setPageState] = useState(initialMeta.page || 1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, SEARCH_DEBOUNCE_DELAY);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset page when filters change
  useEffect(() => {
    setPageState(1);
  }, [selectedCategory, debouncedSearchQuery]);

  // Build query params
  const params = useMemo(() => {
    const urlParams = new URLSearchParams();
    urlParams.set("page", page.toString());
    urlParams.set("limit", PROJECTS_DEFAULT_LIMIT.toString());
    if (selectedCategory) urlParams.set("categoryId", selectedCategory);
    if (debouncedSearchQuery) urlParams.set("search", debouncedSearchQuery);
    return urlParams;
  }, [page, selectedCategory, debouncedSearchQuery]);

  const endpoint = useMemo(
    () => `${PORTFOLIO_ENDPOINTS.ADMIN_LIST}?${params.toString()}`,
    [params],
  );

  // Fetch projects data
  const { data, isFetching } = useAppQuery<{
    data: Project[];
    meta: PaginationMeta;
  }>({
    queryKey: ["admin_projects", page, selectedCategory, debouncedSearchQuery],
    endpoint,
    config: { credentials: "include" },
    options: {
      ...(page === 1 && selectedCategory === "" && debouncedSearchQuery === ""
        ? {
            initialData: { data: initialProjects, meta: initialMeta },
          }
        : {}),
    },
  });

  // Update state when data changes
  useEffect(() => {
    if (data) {
      setProjects(data.data);
      setMeta(data.meta);
    }
  }, [data]);

  const isLoading = isFetching;

  const setPage = useCallback((newPage: number) => {
    if (newPage > 0 && newPage <= meta.total) {
      setPageState(newPage);
    }
  }, [meta.total]);

  const setSelectedCategoryFilter = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const setSearchQueryValue = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const openDeleteModal = useCallback((project: Project) => {
    setProjectToDelete(project);
    setDeleteModalOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setDeleteModalOpen(false);
    setProjectToDelete(null);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!projectToDelete) return;
    setIsDeleting(true);
    try {
      await instance.delete(
        `${PORTFOLIO_ENDPOINTS.ADMIN_LIST}/${projectToDelete.id}`,
      );
      // Remove from UI immediately
      setProjects((prev) => prev.filter((p) => p.id !== projectToDelete.id));
      setMeta((prev) => ({ ...prev, total: prev.total - 1 }));
      closeDeleteModal();
    } catch (error) {
      console.error("Failed to delete project:", error);
    } finally {
      setIsDeleting(false);
    }
  }, [projectToDelete, closeDeleteModal]);

  return {
    projects,
    meta,
    isLoading,
    isFetching,
    page,
    selectedCategory,
    searchQuery,
    deleteModalOpen,
    projectToDelete,
    isDeleting,
    setPage,
    setSelectedCategory: setSelectedCategoryFilter,
    setSearchQuery: setSearchQueryValue,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  };
}