/**
 * Edit User Constants
 * Static configuration and validation rules for user editing
 */

// Default empty password (user must fill to reset)
export const DEFAULT_PASSWORD = "";

// Password validation
export const PASSWORD_MIN_LENGTH = 6;

// Form field keys for type safety
export const EDIT_USER_FIELDS = {
  EMAIL: "email",
  NAME: "name",
  AVATAR: "avatar",
  ROLE: "role",
  IS_EMAIL_VERIFIED: "isEmailVerified",
  PASSWORD: "password",
} as const;

// Role options configuration
export const USER_ROLES = [
  {
    value: "user",
    labelKey: "UsersPage.EditUser.form.roleUser",
    descriptionKey: "UsersPage.EditUser.form.roleUserDesc",
  },
  {
    value: "admin",
    labelKey: "UsersPage.EditUser.form.roleAdmin",
    descriptionKey: "UsersPage.EditUser.form.roleAdminDesc",
  },
] as const;