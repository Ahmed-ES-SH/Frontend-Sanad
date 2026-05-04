"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { adminCreateUser } from "@/app/actions/userActions";
import { UserFormData, UserRole } from "@/app/types/user";
import { toast } from "sonner";
import AddUserForm from "./AddUserForm";

// ============================================================================
// ADD USER CLIENT - Admin form for creating new users
// Validates input and submits to server action for backend creation
// ============================================================================

export type FormState = "idle" | "submitting" | "success";

const rolePermissions: Record<UserRole, { title: string; items: string[] }> = {
  user: {
    title: "Standard User Permissions",
    items: [
      "View personal dashboard",
      "Edit own profile",
      "Access assigned content",
    ],
  },
  admin: {
    title: "Administrator Permissions",
    items: [
      "Full dashboard access",
      "User management",
      "System settings",
      "Content moderation",
    ],
  },
};

const FORM_KEY = "add-user-draft";

export interface DraftFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  avatar: string;
}

export default function AddUserClient() {
  const router = useRouter();

  // ============================================================================
  // Form state - matches backend DTO structure
  // ============================================================================
  const [form, setForm] = useState<DraftFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    avatar: "",
  });

  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [formState, setFormState] = useState<FormState>("idle");

  // ============================================================================
  // Restore draft on mount from localStorage
  // ============================================================================
  useEffect(() => {
    try {
      const saved = localStorage.getItem(FORM_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<DraftFormData>;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setForm((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      /* ignore corrupt draft */
    }
  }, []);

  // ============================================================================
  // Persist draft on change to localStorage
  // ============================================================================
  useEffect(() => {
    try {
      localStorage.setItem(FORM_KEY, JSON.stringify(form));
    } catch {
      /* storage full — ignore */
    }
  }, [form]);

  const clearDraft = () => {
    localStorage.removeItem(FORM_KEY);
  };

  // ============================================================================
  // Handle field changes with error clearing
  // ============================================================================
  const handleChange =
    (field: keyof DraftFormData) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>,
    ) => {
      setForm({ ...form, [field]: e.target.value });
      if (errors[field]) {
        setErrors({ ...errors, [field]: undefined });
      }
    };

  const handleRoleChange = (role: UserRole) => {
    setForm({ ...form, role });
  };

  // ============================================================================
  // Validation - matches backend requirements
  // ============================================================================
  const validate = (): boolean => {
    const newErrors: Partial<Record<string, string>> = {};

    // Email validation
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation (min 6 per backend plan, using 8 for security)
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Must be at least 8 characters";
    }

    // Confirm password match
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ============================================================================
  // Form submission - calls server action
  // ============================================================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormState("submitting");

    try {
      // Build form data matching backend DTO
      const userData: UserFormData = {
        email: form.email,
        password: form.password,
        name: form.name || "",
        avatar: form.avatar || "",
        role: form.role,
        isEmailVerified: false, // Default for new users
      };

      const result = await adminCreateUser(userData);

      if (result.success) {
        setFormState("success");
        clearDraft();
        toast.success(result.message);

        // Redirect after success
        setTimeout(() => {
          router.push("/dashboard/users");
        }, 1500);
      } else {
        toast.error(result.message);
        setFormState("idle");
      }
    } catch (err) {
      toast.error("Failed to create user");
      console.error("[AddUserClient] Create error:", err);
      setFormState("idle");
    }
  };

  const handleDiscard = () => {
    clearDraft();
    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
      avatar: "",
    });
    setErrors({});
  };

  const isRTL = false; /* wire to useVariables() when locale is enabled */
  const permissions = rolePermissions[form.role];

  return (
    <div
      className={` ${formState === "success" ? "flex items-center justify-center min-h-[80dvh]" : ""}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Page Header */}
      {formState !== "success" && (
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-stone-900">
            Add New User
          </h1>
          <p className="text-stone-500 mt-1">Add a new user to Sanad.</p>
        </div>
      )}

      {formState === "success" ? (
        /* Success State */
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-stone-900">
            User Created Successfully
          </h2>
          <p className="text-stone-500 mt-1 text-sm">
            Redirecting to users list...
          </p>
        </div>
      ) : null}

      <AddUserForm
        formState={formState}
        handleSubmit={handleSubmit}
        errors={errors}
        form={form}
        handleChange={handleChange}
        handleRoleChange={handleRoleChange}
        permissions={permissions}
        handleDiscard={handleDiscard}
        setForm={setForm}
      />
    </div>
  );
}
