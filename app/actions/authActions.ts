"use server";

import { AUTH_ENDPOINTS, USER_ENDPOINTS } from "@/app/constants/endpoints";
import { deleteAuthCookie, setAuthCookie } from "@/app/helpers/session";

import {
  AuthResponse,
  currentUserType,
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordCredentials,
} from "@/app/types/auth";
import { globalRequest } from "../helpers/globalRequest";
import { User } from "../types/user";

/* =========================================================
   LOGIN
========================================================= */
export async function loginAction(
  credentials: LoginCredentials,
): Promise<AuthResponse> {
  const res = await globalRequest<
    LoginCredentials,
    {
      user: User;
      access_token?: string;
    }
  >({
    endpoint: AUTH_ENDPOINTS.LOGIN,
    method: "POST",
    body: credentials,
    defaultErrorMessage: "Login failed",
  });

  if (!res.success) {
    return {
      success: false,
      message: res.message,
      statusCode: res.statusCode,
    };
  }

  const accessToken = res.data?.access_token;

  if (!accessToken) {
    return {
      success: false,
      message: "Login succeeded but no access token was returned",
      statusCode: res.statusCode,
    };
  }

  await setAuthCookie(accessToken);

  return {
    success: true,
    message: "Login successful",
    data: {
      ...res.data,
      access_token: undefined,
    },
  };
}

/* =========================================================
   REGISTER
========================================================= */
export async function registerAction(
  credentials: RegisterCredentials,
): Promise<AuthResponse> {
  const res = await globalRequest<
    {
      name: string;
      email: string;
      password: string;
    },
    User
  >({
    endpoint: USER_ENDPOINTS.CREATE_USER,
    method: "POST",
    body: {
      name: credentials.fullName,
      email: credentials.email,
      password: credentials.password,
    },
    defaultErrorMessage: "Registration failed",
  });

  if (!res.success) {
    return {
      success: false,
      message: res.message,
      statusCode: res.statusCode,
    };
  }

  return {
    success: true,
    message:
      "Registration successful. Sign in to trigger your verification email.",
    data: {
      user: res.data!,
    },
  };
}

/* =========================================================
   LOGOUT
========================================================= */
export async function logoutAction(): Promise<AuthResponse> {
  const res = await globalRequest({
    endpoint: AUTH_ENDPOINTS.LOGOUT,
    method: "POST",
    defaultErrorMessage: "Logout failed",
  });

  if (res.success) {
    await deleteAuthCookie();
  }

  return {
    success: res.success,
    message: res.success ? "Logged out successfully" : res.message,
    statusCode: res.statusCode,
  };
}

/* =========================================================
   CURRENT USER
========================================================= */
export async function getCurrentUserAction(): Promise<currentUserType> {
  const res = await globalRequest<never, User>({
    endpoint: AUTH_ENDPOINTS.CURRENT_USER,
    method: "GET",
    defaultErrorMessage: "Failed to fetch user data",
  });

  if (!res.success) {
    if (res.statusCode === 401) {
      return {
        success: false,
        message: "Not authenticated",
      };
    }

    return {
      success: false,
      message: res.message,
    };
  }

  return {
    success: true,
    message: "User fetched successfully",
    user: res.data!,
  };
}

/* =========================================================
   SEND RESET LINK
========================================================= */
export async function sendResetLinkAction(
  email: string,
): Promise<AuthResponse> {
  return globalRequest({
    endpoint: AUTH_ENDPOINTS.RESET_PASSWORD_SEND,
    method: "POST",
    body: { email },
    defaultErrorMessage: "Failed to send reset link",
  });
}

/* =========================================================
   VERIFY RESET TOKEN
========================================================= */
export async function verifyResetTokenAction(
  token: string,
  email: string,
): Promise<AuthResponse> {
  const res = await globalRequest<
    { token: string; email: string },
    { userId: number }
  >({
    endpoint: AUTH_ENDPOINTS.RESET_PASSWORD_VERIFY,
    method: "POST",
    body: { token, email },
    defaultErrorMessage: "Invalid reset token",
  });

  if (!res.success) return res;

  return {
    success: true,
    message: "Token is valid",
    data: {
      userId: res.data!.userId,
    },
  };
}

/* =========================================================
   RESET PASSWORD
========================================================= */
export async function resetPasswordAction(
  credentials: ResetPasswordCredentials,
): Promise<AuthResponse> {
  return globalRequest({
    endpoint: AUTH_ENDPOINTS.RESET_PASSWORD,
    method: "POST",
    body: credentials,
    defaultErrorMessage: "Failed to reset password",
  });
}

/* =========================================================
   VERIFY EMAIL
========================================================= */
export async function verifyEmailAction(token: string): Promise<AuthResponse> {
  return globalRequest({
    endpoint: `${AUTH_ENDPOINTS.VERIFY_EMAIL}?token=${encodeURIComponent(
      token,
    )}`,
    method: "POST",
    defaultErrorMessage: "Email verification failed",
  });
}

/* =========================================================
   PROFILE UPDATE
========================================================= */
interface ProfileUpdateData {
  name?: string;
  avatar?: string;
  password?: string;
}

export async function updateProfileAction(
  profileData: ProfileUpdateData,
): Promise<AuthResponse> {
  const currentUser = await globalRequest<never, User>({
    endpoint: AUTH_ENDPOINTS.CURRENT_USER,
    method: "GET",
    defaultErrorMessage: "Unable to fetch current user",
  });

  if (!currentUser.success || !currentUser.data?.id) {
    return {
      success: false,
      message: "Unable to fetch current user",
    };
  }

  const payload: Record<string, unknown> = {};

  if (profileData.name !== undefined) {
    payload.name = profileData.name;
  }

  if (profileData.avatar !== undefined) {
    payload.avatar = profileData.avatar;
  }

  if (profileData.password !== undefined) {
    payload.password = profileData.password;
  }

  const updated = await globalRequest<Record<string, unknown>, User>({
    endpoint: USER_ENDPOINTS.UPDATE_USER(currentUser.data.id),
    method: "PATCH",
    body: payload,
    defaultErrorMessage: "Profile update failed",
  });

  if (!updated.success) {
    return {
      success: false,
      message: updated.message,
      statusCode: updated.statusCode,
    };
  }

  return {
    success: true,
    message: "Profile updated successfully",
    data: {
      user: updated.data!,
    },
  };
}
