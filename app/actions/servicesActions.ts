"use server";

import { revalidateTag } from "next/cache";
import { SERVICES_ENDPOINTS } from "@/app/constants/endpoints";

import {
  Service,
  ServiceFormData,
  ServiceListResponse,
  PublicServiceListResponse,
  PublishToggleResponse,
  DeleteResponse,
  ReorderItem,
  ServiceQueryParams,
} from "@/app/types/service";
import { globalRequest } from "../helpers/globalRequest";

const SERVICE_CACHE_TAG = "published-services";

/* =========================================================
   HELPERS
========================================================= */

function buildQuery(params: ServiceQueryParams = {}): string {
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
   PUBLIC
========================================================= */

export async function getPublishedServices(
  params: ServiceQueryParams = {},
): Promise<PublicServiceListResponse> {
  const res = await globalRequest<PublicServiceListResponse>({
    endpoint: SERVICES_ENDPOINTS.LIST_PUBLISHED + buildQuery(params),
    method: "GET",
    defaultErrorMessage: "Failed to fetch published services",
    // ISR: revalidate every 5 minutes
    next: { revalidate: 300 },
  });

  if (!res.success || !res.data) {
    throw new Error(res.message);
  }

  return res.data;
}

export async function getServiceBySlug(slug: string): Promise<Service> {
  const res = await globalRequest<never, Service>({
    endpoint: SERVICES_ENDPOINTS.GET_BY_SLUG(slug),
    method: "GET",
    defaultErrorMessage: "Failed to fetch service",
  });

  if (!res.success || !res.data) {
    throw new Error(res.message);
  }

  return res.data;
}

/* =========================================================
   ADMIN
========================================================= */

export async function getAdminServices(
  params: ServiceQueryParams = {},
): Promise<{
  data: Service[];
  meta: ServiceListResponse["meta"];
}> {
  const res = await globalRequest<never, ServiceListResponse>({
    endpoint: SERVICES_ENDPOINTS.ADMIN_LIST + buildQuery(params),

    method: "GET",

    defaultErrorMessage: "Failed to fetch admin services",
  });

  if (!res.success || !res.data) {
    throw new Error(res.message);
  }

  return res.data;
}

export async function getAdminServiceById(id: string): Promise<Service> {
  const res = await globalRequest<never, Service>({
    endpoint: SERVICES_ENDPOINTS.ADMIN_UPDATE(id),

    method: "GET",

    defaultErrorMessage: "Failed to fetch service",
  });

  if (!res.success || !res.data) {
    throw new Error(res.message);
  }

  return res.data;
}

export async function createService(formData: ServiceFormData): Promise<{
  success: boolean;
  message: string;
  data?: Service;
}> {
  const res = await globalRequest<ServiceFormData, Service>({
    endpoint: SERVICES_ENDPOINTS.ADMIN_CREATE,

    method: "POST",

    body: formData,

    defaultErrorMessage: "Failed to create service",
  });

  if (!res.success) {
    return res;
  }

  revalidateTag(SERVICE_CACHE_TAG, {});

  return {
    success: true,
    message: "Service created successfully",
    data: res.data,
  };
}

export async function updateService(
  id: string,
  formData: Partial<ServiceFormData>,
): Promise<{
  success: boolean;
  message: string;
  data?: Service;
}> {
  const res = await globalRequest<Partial<ServiceFormData>, Service>({
    endpoint: SERVICES_ENDPOINTS.ADMIN_UPDATE(id),

    method: "PATCH",

    body: formData,

    defaultErrorMessage: "Failed to update service",
  });

  if (!res.success) {
    return res;
  }

  revalidateTag(SERVICE_CACHE_TAG, {});

  return {
    success: true,
    message: "Service updated successfully",
    data: res.data,
  };
}

export async function togglePublishService(id: string): Promise<{
  success: boolean;
  message: string;
  data?: PublishToggleResponse;
}> {
  const res = await globalRequest<never, PublishToggleResponse>({
    endpoint: SERVICES_ENDPOINTS.ADMIN_PUBLISH(id),

    method: "PATCH",

    defaultErrorMessage: "Failed to toggle publish status",
  });

  if (!res.success) {
    return res;
  }

  revalidateTag(SERVICE_CACHE_TAG, {});

  return {
    success: true,
    message: res.data?.message || "Status updated",
    data: res.data,
  };
}

export async function deleteService(id: string): Promise<{
  success: boolean;
  message: string;
}> {
  const res = await globalRequest<never, DeleteResponse>({
    endpoint: SERVICES_ENDPOINTS.ADMIN_DELETE(id),

    method: "DELETE",

    defaultErrorMessage: "Failed to delete service",
  });

  if (!res.success) {
    return res;
  }

  revalidateTag(SERVICE_CACHE_TAG, {});

  return {
    success: true,
    message: "Service deleted successfully",
  };
}

export async function reorderServices(items: ReorderItem[]): Promise<{
  success: boolean;
  message: string;
}> {
  const res = await globalRequest<{ items: ReorderItem[] }, unknown>({
    endpoint: SERVICES_ENDPOINTS.ADMIN_REORDER,

    method: "PATCH",

    body: { items },

    defaultErrorMessage: "Failed to reorder services",
  });

  if (!res.success) {
    return res;
  }

  revalidateTag(SERVICE_CACHE_TAG, {});

  return {
    success: true,
    message: "Services reordered successfully",
  };
}
