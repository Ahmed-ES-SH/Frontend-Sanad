"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { User, UserUpdateFormData, UserRole } from "@/app/types/user";
import { adminUpdateUser, adminDeleteUser } from "@/app/actions/userActions";
import { toast } from "sonner";
import { DEFAULT_PASSWORD, PASSWORD_MIN_LENGTH } from "@/app/constants/editUser";

interface UseEditUserFormProps {
  user: User;
  locale: string;
}

export function useEditUserForm({ user, locale }: UseEditUserFormProps) {
  const router = useRouter();

  // Form state - initialized with existing user data
  const [formData, setFormData] = useState<UserUpdateFormData>({
    email: user.email,
    name: user.name || "",
    avatar: user.avatar || "",
    role: user.role,
    isEmailVerified: user.isEmailVerified,
    password: DEFAULT_PASSWORD,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle field changes
  const handleChange = useCallback(
    (field: keyof UserUpdateFormData) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value =
          e.target.type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : e.target.value;

        setFormData((prev) => ({ ...prev, [field]: value }));
      },
    []
  );

  // Handle role selection
  const handleRoleChange = useCallback((role: UserRole) => {
    setFormData((prev) => ({ ...prev, role }));
  }, []);

  // Build payload - only include changed fields
  const buildPayload = useCallback((): UserUpdateFormData => {
    const payload: UserUpdateFormData = {};

    if (formData.email && formData.email !== user.email) {
      payload.email = formData.email;
    }
    if (formData.name !== undefined && formData.name !== (user.name || "")) {
      payload.name = formData.name;
    }
    if (formData.avatar !== undefined && formData.avatar !== (user.avatar || "")) {
      payload.avatar = formData.avatar;
    }
    if (formData.role && formData.role !== user.role) {
      payload.role = formData.role;
    }
    if (
      formData.isEmailVerified !== undefined &&
      formData.isEmailVerified !== user.isEmailVerified
    ) {
      payload.isEmailVerified = formData.isEmailVerified;
    }
    if (formData.password && formData.password.length > 0) {
      if (formData.password.length < PASSWORD_MIN_LENGTH) {
        return {}; // Signal validation error
      }
      payload.password = formData.password;
    }

    return payload;
  }, [formData, user]);

  // Validate password
  const validatePassword = useCallback((password: string): boolean => {
    if (password && password.length > 0 && password.length < PASSWORD_MIN_LENGTH) {
      return false;
    }
    return true;
  }, []);

  // Submit update form
  const handleUpdate = useCallback(
    async (e: React.FormEvent): Promise<boolean> => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        const payload = buildPayload();

        // Check for password validation error (empty payload returned)
        if (Object.keys(payload).length === 0 && formData.password && formData.password.length > 0 && formData.password.length < PASSWORD_MIN_LENGTH) {
          toast.error("Password must be at least 6 characters");
          setIsSubmitting(false);
          return false;
        }

        // Check for no changes
        if (Object.keys(payload).length === 0) {
          toast.info("No changes detected");
          setIsSubmitting(false);
          return false;
        }

        const result = await adminUpdateUser(user.id, payload);

        if (result.success) {
          toast.success(result.message);
          router.push(`/${locale}/dashboard/users`);
          return true;
        } else {
          toast.error(result.message);
          return false;
        }
      } catch (err) {
        toast.error("Failed to update user");
        console.error("[EditUserClient] Update error:", err);
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [buildPayload, formData.password, locale, user.id]
  );

  // Handle user deletion
  const handleDelete = useCallback(async (): Promise<boolean> => {
    setIsDeleting(true);

    try {
      const result = await adminDeleteUser(user.id);

      if (result.success) {
        toast.success(result.message);
        router.push(`/${locale}/dashboard/users`);
        return true;
      } else {
        toast.error(result.message);
        return false;
      }
    } catch (err) {
      toast.error("Failed to delete user");
      console.error("[EditUserClient] Delete error:", err);
      return false;
    } finally {
      setIsDeleting(false);
    }
  }, [locale, user.id]);

  // Update avatar directly
  const updateAvatar = useCallback((url: string) => {
    setFormData((prev) => ({ ...prev, avatar: url }));
  }, []);

  return {
    formData,
    isSubmitting,
    isDeleting,
    handleChange,
    handleRoleChange,
    handleUpdate,
    handleDelete,
    updateAvatar,
    buildPayload,
    validatePassword,
  };
}