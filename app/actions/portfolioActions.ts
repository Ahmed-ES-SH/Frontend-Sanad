"use server";

import { revalidateTag } from "next/cache";
import { PORTFOLIO_ENDPOINTS } from "@/app/constants/endpoints";

import {
  Project,
  ProjectFormData,
  ProjectListResponse,
  PublishToggleResponse,
  FeatureToggleResponse,
  ReorderItem,
  DeleteResponse,
  PortfolioQueryParams,
  AdminPortfolioQueryParams,
} from "@/app/types/project";
import { globalRequest } from "../helpers/globalRequest";

/* =========================================================
   HELPERS
========================================================= */

function buildQuery(
  params: PortfolioQueryParams | AdminPortfolioQueryParams = {},
) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  const query = searchParams.toString();

  return query ? `?${query}` : "";
}

/* =========================================================
   PUBLIC ACTIONS
========================================================= */

/* Get Published Projects */
export async function getPublishedProjects(
  params: PortfolioQueryParams = {},
): Promise<ProjectListResponse> {
  const res = await globalRequest<never, ProjectListResponse>({
    endpoint: PORTFOLIO_ENDPOINTS.LIST_PUBLISHED + buildQuery(params),

    method: "GET",

    next: { revalidate: 3600, tags: ["portfolio-published"] },

    defaultErrorMessage: "Failed to fetch projects",
  });

  if (!res.success || !res.data) {
    throw new Error(res.message);
  }

  return res.data;
}

/* Get Single Project By Slug */
export async function getProjectBySlug(slug: string): Promise<Project> {
  const res = await globalRequest<never, Project>({
    endpoint: PORTFOLIO_ENDPOINTS.GET_BY_SLUG(slug),

    method: "GET",

    defaultErrorMessage: "Failed to fetch project",
  });

  if (!res.success || !res.data) {
    throw new Error(res.message);
  }

  return res.data;
}

/* =========================================================
   ADMIN ACTIONS
========================================================= */

/* Get Admin Projects */
export async function getAdminProjects(
  params: AdminPortfolioQueryParams = {},
): Promise<{
  data: Project[];
  meta: ProjectListResponse["meta"];
}> {
  const res = await globalRequest<never, ProjectListResponse>({
    endpoint: PORTFOLIO_ENDPOINTS.ADMIN_LIST + buildQuery(params),

    method: "GET",

    defaultErrorMessage: "Failed to fetch admin projects",
  });

  if (!res.success || !res.data) {
    throw new Error(res.message);
  }

  return res.data;
}

/* Get Admin Project By ID */
export async function getAdminProjectById(id: string): Promise<Project> {
  const res = await globalRequest<never, ProjectListResponse>({
    endpoint: PORTFOLIO_ENDPOINTS.ADMIN_LIST,

    method: "GET",

    defaultErrorMessage: "Failed to fetch project",
  });

  if (!res.success || !res.data) {
    throw new Error(res.message);
  }

  const project = res.data.data.find((item: Project) => item.id === id);

  if (!project) {
    throw new Error(`Project with ID ${id} not found`);
  }

  return project;
}

/* Create Project */
export async function createProject(formData: ProjectFormData): Promise<{
  success: boolean;
  message: string;
  data?: Project;
}> {
  const res = await globalRequest<ProjectFormData, Project>({
    endpoint: PORTFOLIO_ENDPOINTS.ADMIN_CREATE,

    method: "POST",

    body: formData,

    defaultErrorMessage: "Failed to create project",
  });

  if (!res.success) {
    return res;
  }

  revalidateTag("portfolio", {});

  return {
    success: true,
    message: "Project created successfully",
    data: res.data,
  };
}

/* Update Project */
export async function updateProject(
  id: string,
  formData: Partial<ProjectFormData>,
): Promise<{
  success: boolean;
  message: string;
  data?: Project;
}> {
  const res = await globalRequest<Partial<ProjectFormData>, Project>({
    endpoint: PORTFOLIO_ENDPOINTS.ADMIN_UPDATE(id),

    method: "PATCH",

    body: formData,

    defaultErrorMessage: "Failed to update project",
  });

  if (!res.success) {
    return res;
  }

  revalidateTag("portfolio", {});

  return {
    success: true,
    message: "Project updated successfully",
    data: res.data,
  };
}

/* Toggle Publish */
export async function togglePublishStatus(id: string): Promise<{
  success: boolean;
  message: string;
  data?: PublishToggleResponse;
}> {
  const res = await globalRequest<never, PublishToggleResponse>({
    endpoint: PORTFOLIO_ENDPOINTS.ADMIN_PUBLISH(id),

    method: "PATCH",

    defaultErrorMessage: "Failed to toggle publish status",
  });

  if (!res.success) {
    return res;
  }

  revalidateTag("portfolio", {});

  return {
    success: true,
    message: res.data?.message || "Status updated",
    data: res.data,
  };
}

/* Toggle Featured */
export async function toggleFeatureStatus(id: string): Promise<{
  success: boolean;
  message: string;
  data?: FeatureToggleResponse;
}> {
  const res = await globalRequest<never, FeatureToggleResponse>({
    endpoint: PORTFOLIO_ENDPOINTS.ADMIN_FEATURE(id),

    method: "PATCH",

    defaultErrorMessage: "Failed to toggle feature status",
  });

  if (!res.success) {
    return res;
  }

  revalidateTag("portfolio", {});

  return {
    success: true,
    message: res.data?.message || "Status updated",
    data: res.data,
  };
}

/* Delete Project */
export async function deleteProject(id: string): Promise<{
  success: boolean;
  message: string;
}> {
  const res = await globalRequest<never, DeleteResponse>({
    endpoint: PORTFOLIO_ENDPOINTS.ADMIN_DELETE(id),

    method: "DELETE",

    defaultErrorMessage: "Failed to delete project",
  });

  if (!res.success) {
    return res;
  }

  revalidateTag("portfolio", {});

  return {
    success: true,
    message: "Project deleted successfully",
  };
}

/* Reorder Projects */
export async function reorderProjects(items: ReorderItem[]): Promise<{
  success: boolean;
  message: string;
}> {
  const res = await globalRequest<{ items: ReorderItem[] }, unknown>({
    endpoint: PORTFOLIO_ENDPOINTS.ADMIN_REORDER,

    method: "PATCH",

    body: { items },

    defaultErrorMessage: "Failed to reorder projects",
  });

  if (!res.success) {
    return res;
  }

  revalidateTag("portfolio", {});

  return {
    success: true,
    message: "Projects reordered successfully",
  };
}
