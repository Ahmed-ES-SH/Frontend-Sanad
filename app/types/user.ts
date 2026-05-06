export type UserRole = "admin" | "user";

// ============================================================================
// USER ENTITY - Core user data structure from backend
// ============================================================================

export interface User {
  id: number;
  email: string;
  name: string | null;
  avatar: string | null;
  role: UserRole;
  googleId: string | null;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// DTOs - Data Transfer Objects for API requests
// ============================================================================

export interface CreateUserDto {
  email: string;
  password?: string;
  name?: string;
  avatar?: string;
  googleId?: string;
  role?: UserRole;
}

export interface UpdateUserDto {
  email?: string;
  password?: string;
  name?: string;
  avatar?: string;
  role?: UserRole;
  isEmailVerified?: boolean;
}

// ============================================================================
// FORM DATA - Client-side form state matching backend DTOs
// ============================================================================

export interface UserFormData {
  email: string;
  password: string;
  name: string;
  avatar: string;
  role: UserRole;
  isEmailVerified: boolean;
}

export type UserUpdateFormData = Partial<UserFormData>;

// ============================================================================
// API RESPONSES - Typed responses from backend endpoints
// ============================================================================

export interface UserListResponse {
  data: User[];
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

// Paginated response from /api/user endpoint
export interface UsersPaginatedResponse {
  data: User[];
  total: number;
  page: number;
  perPage: number;
  lastPage: number;
}

export interface UserResponse {
  data: User;
}

export interface UserDeleteResponse {
  id: number;
  email: string;
  name: string | null;
  avatar: string | null;
  role: UserRole;
  googleId: string | null;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// ACTION RESULTS - Standardized return types for server actions
// ============================================================================

export interface UserActionResult {
  success: boolean;
  message: string;
  data?: User | User[] | UserDeleteResponse;
}

export interface UserFilterState {
  role: UserRole | "all";
  status: "all" | "active" | "inactive" | "banned";
  search: string;
}

// ============================================================================
// STATS RESULT - User statistics for dashboard
// ============================================================================

export interface UserStatsResult {
  totalUsers: number;
  adminsCount: number;
  regularUsersCount: number;
  verifiedUsersNumber: number;
  unverifiedUsersNumber: number;
  usersWithGoogleCount: number;
}
