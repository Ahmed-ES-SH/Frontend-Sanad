"use server";

import { revalidatePath } from "next/cache";
import { USER_ENDPOINTS } from "@/app/constants/endpoints";

import {
  User,
  UserFormData,
  UserUpdateFormData,
  UserDeleteResponse,
  UserActionResult,
  UserStatsResult,
  UsersPaginatedResponse,
} from "@/app/types/user";
import { globalRequest } from "../helpers/globalRequest";

/* =========================================================
   CACHE
========================================================= */

const USERS_CACHE_TAG = "users";

/* =========================================================
   TYPES
========================================================= */

export interface UserFilterParams {
  role?: "admin" | "user";
  status?: "active" | "inactive" | "banned";
  search?: string;
  page?: number;
  limit?: number;
}

/* =========================================================
   HELPERS
========================================================= */

function buildQuery(params: UserFilterParams = {}): string {
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
   READ ACTIONS
========================================================= */

export async function adminGetUsers(
  filters?: UserFilterParams,
): Promise<UsersPaginatedResponse> {
  const res = await globalRequest<never, UsersPaginatedResponse>({
    endpoint: USER_ENDPOINTS.ADMIN_LIST + buildQuery(filters),

    method: "GET",

    defaultErrorMessage: "Failed to fetch users",
  });

  if (!res.success || !res.data) {
    throw new Error(res.message);
  }

  return res.data;
}

export async function adminGetAllUsers(): Promise<User[]> {
  const firstPage = await adminGetUsers();

  const allUsers: User[] = [...firstPage.data];

  if (firstPage.lastPage > 1) {
    const requests = [];

    for (let page = 2; page <= firstPage.lastPage; page++) {
      requests.push(adminGetUsers({ page }));
    }

    const results = await Promise.all(requests);

    results.forEach((pageData) => {
      allUsers.push(...pageData.data);
    });
  }

  return allUsers;
}

export async function adminGetUser(id: string | number): Promise<User> {
  const res = await globalRequest<never, User>({
    endpoint: USER_ENDPOINTS.ADMIN_GET(id),

    method: "GET",

    defaultErrorMessage: "Failed to fetch user",
  });

  if (!res.success || !res.data) {
    throw new Error(res.message);
  }

  return res.data;
}

export async function adminGetUsersStats(): Promise<UserStatsResult> {
  const users = await adminGetAllUsers();

  return {
    totalUsers: users.length,

    adminsCount: users.filter((u) => u.role === "admin").length,

    regularUsersCount: users.filter((u) => u.role === "user").length,

    verifiedUsersNumber: users.filter((u) => u.isEmailVerified).length,

    unverifiedUsersNumber: users.filter((u) => !u.isEmailVerified).length,

    usersWithGoogleCount: users.filter((u) => u.googleId !== null).length,
  };
}

/* =========================================================
   MUTATIONS
========================================================= */

export async function adminCreateUser(
  formData: UserFormData,
): Promise<UserActionResult> {
  const payload: Record<string, unknown> = {
    email: formData.email,
    password: formData.password,
  };

  if (formData.name) payload.name = formData.name;

  if (formData.avatar) payload.avatar = formData.avatar;

  if (formData.role) payload.role = formData.role;

  const res = await globalRequest<typeof payload, User>({
    endpoint: USER_ENDPOINTS.ADMIN_CREATE,

    method: "POST",

    body: payload,

    defaultErrorMessage: "Failed to create user",
  });

  if (!res.success) {
    return res;
  }

  revalidatePath("/dashboard/users");

  return {
    success: true,
    message: "User created successfully",
    data: res.data,
  };
}

export async function adminUpdateUser(
  id: string | number,
  formData: UserUpdateFormData,
): Promise<UserActionResult> {
  const payload: Record<string, unknown> = {};

  Object.entries(formData).forEach(([key, value]) => {
    if (value !== undefined) {
      payload[key] = value;
    }
  });

  const res = await globalRequest<typeof payload, User>({
    endpoint: USER_ENDPOINTS.ADMIN_UPDATE(id),

    method: "PATCH",

    body: payload,

    defaultErrorMessage: "Failed to update user",
  });

  if (!res.success) {
    return res;
  }

  revalidatePath("/dashboard/users");
  revalidatePath(`/dashboard/users/${id}`);

  return {
    success: true,
    message: "User updated successfully",
    data: res.data,
  };
}

export async function adminDeleteUser(
  id: string | number,
): Promise<UserActionResult> {
  const res = await globalRequest<never, UserDeleteResponse>({
    endpoint: USER_ENDPOINTS.ADMIN_DELETE(id),

    method: "DELETE",

    defaultErrorMessage: "Failed to delete user",
  });

  if (!res.success) {
    return res;
  }

  revalidatePath("/dashboard/users");

  return {
    success: true,
    message: "User deleted successfully",
    data: res.data,
  };
}
