"use server";

import { revalidatePath } from "next/cache";
import { CONTACT_ENDPOINTS } from "@/app/constants/endpoints";

import {
  ContactMessage,
  ContactFormData,
  ContactListResponse,
  ContactSubmitResponse,
  MarkReadResponse,
  MarkRepliedResponse,
  DeleteResponse,
  ContactQueryParams,
} from "@/app/types/contact";
import { globalRequest } from "../helpers/globalRequest";

/* =========================================================
   HELPERS
========================================================= */

function buildQuery(params: ContactQueryParams = {}) {
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
   PUBLIC: SUBMIT CONTACT FORM
========================================================= */

export async function submitContact(formData: ContactFormData): Promise<{
  success: boolean;
  message: string;
}> {
  const res = await globalRequest<ContactFormData, ContactSubmitResponse>({
    endpoint: CONTACT_ENDPOINTS.SUBMIT,

    method: "POST",

    body: formData,

    defaultErrorMessage: "Failed to send message. Please try again.",
  });

  if (!res.success) {
    if (res.statusCode === 429) {
      return {
        success: false,
        message: res.message || "Too many requests. Please try again later.",
      };
    }

    return {
      success: false,
      message: res.message,
    };
  }

  return {
    success: true,
    message: "Your message has been sent successfully",
  };
}

/* =========================================================
   ADMIN: FETCH ALL CONTACT MESSAGES
========================================================= */

export async function fetchContactMessages(
  params: ContactQueryParams = {},
): Promise<{
  success: boolean;
  data?: ContactMessage[];
  meta?: ContactListResponse["meta"];
  message?: string;
}> {
  const res = await globalRequest<never, ContactListResponse>({
    endpoint: CONTACT_ENDPOINTS.ADMIN_LIST + buildQuery(params),

    method: "GET",

    defaultErrorMessage: "Failed to fetch contact messages",
  });

  if (!res.success || !res.data) {
    return {
      success: false,
      message: res.message,
    };
  }

  return {
    success: true,
    data: res.data.data,
    meta: res.data.meta,
  };
}

/* =========================================================
   ADMIN: FETCH SINGLE CONTACT DETAIL
========================================================= */

export async function fetchContactDetail(id: string): Promise<{
  success: boolean;
  data?: ContactMessage;
  message?: string;
}> {
  const res = await globalRequest<never, ContactMessage>({
    endpoint: CONTACT_ENDPOINTS.ADMIN_GET(id),

    method: "GET",

    defaultErrorMessage: "Failed to fetch contact message",
  });

  if (!res.success || !res.data) {
    return {
      success: false,
      message: res.message,
    };
  }

  return {
    success: true,
    data: res.data,
  };
}

/* =========================================================
   ADMIN: MARK AS READ
========================================================= */

export async function markAsRead(id: string): Promise<{
  success: boolean;
  message: string;
}> {
  const res = await globalRequest<Record<string, never>, MarkReadResponse>({
    endpoint: CONTACT_ENDPOINTS.ADMIN_MARK_READ(id),

    method: "PATCH",

    body: {},

    defaultErrorMessage: "Failed to mark message as read",
  });

  if (!res.success) {
    return {
      success: false,
      message: res.message,
    };
  }

  revalidatePath("/dashboard/contactus");

  return {
    success: true,
    message: "Message marked as read",
  };
}

/* =========================================================
   ADMIN: MARK AS REPLIED
========================================================= */

export async function markAsReplied(id: string): Promise<{
  success: boolean;
  message: string;
}> {
  const res = await globalRequest<Record<string, never>, MarkRepliedResponse>({
    endpoint: CONTACT_ENDPOINTS.ADMIN_MARK_REPLIED(id),

    method: "PATCH",

    body: {},

    defaultErrorMessage: "Failed to mark message as replied",
  });

  if (!res.success) {
    return {
      success: false,
      message: res.message,
    };
  }

  revalidatePath("/dashboard/contactus");

  return {
    success: true,
    message: "Message marked as replied",
  };
}

/* =========================================================
   ADMIN: DELETE MESSAGE
========================================================= */

export async function deleteContactMessage(id: string): Promise<{
  success: boolean;
  message: string;
}> {
  const res = await globalRequest<Record<string, never>, DeleteResponse>({
    endpoint: CONTACT_ENDPOINTS.ADMIN_DELETE(id),

    method: "DELETE",

    body: {},

    defaultErrorMessage: "Failed to delete contact message",
  });

  if (!res.success) {
    return {
      success: false,
      message: res.message,
    };
  }

  revalidatePath("/dashboard/contactus");

  return {
    success: true,
    message: "Contact message deleted successfully",
  };
}
