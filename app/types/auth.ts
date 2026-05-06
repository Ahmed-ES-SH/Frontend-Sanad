import { User } from "./user";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  fullName: string;
  email: string;
  password: string;
}

export interface ResetPasswordCredentials {
  email: string;
  password: string;
  token: string;
}

export interface LoginResponse {
  user: User;
  access_token?: string;
}

export interface ApiResponse<T = unknown> {
  statusCode?: number;
  message: string;
  error?: string;
  data?: T;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  statusCode?: number;
  data?: {
    user?: User;
    access_token?: string;
    userId?: number;
  };
}

export interface currentUserType {
  success: boolean;
  message: string;
  user?: User;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface SignUpFormType {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignInFormType {
  email: string;
  password: string;
}

export type formValidationType = {
  fullNameRequired: string;
  fullNameTooShort: string;
  emailRequired: string;
  emailInvalid: string;
  passwordRequired: string;
  passwordTooShort: string;
  passwordWeak: string;
  confirmPasswordRequired: string;
  passwordsNotMatch: string;
};
