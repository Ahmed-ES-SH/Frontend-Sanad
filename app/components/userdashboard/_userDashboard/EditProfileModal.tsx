"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiLock, FiEye, FiEyeOff, FiImage } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import { updateProfileAction } from "@/app/actions/authActions";
import { toast } from "sonner";
import { createPortal } from "react-dom";
import { useAuthStore } from "@/app/store/AuthSlice";
import { useTranslation } from "@/app/hooks/useTranslation";

// ============================================================================
// TYPES
// ============================================================================

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface FormData {
  name: string;
  avatar: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  avatar?: string;
  password?: string;
  confirmPassword?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { user, setUser } = useAuthStore();
  const t = useTranslation("UserDashboard.EditProfileModal");

  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    avatar: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Initialize form with user data when modal opens
  useEffect(() => {
    const handleFormData = (data: FormData) => {
      setFormData({
        name: data?.name || "",
        avatar: data?.avatar || "",
        password: "",
        confirmPassword: "",
      });
    };
    if (isOpen && user) {
      handleFormData({
        name: user.name || "",
        avatar: user.avatar || "",
        password: "",
        confirmPassword: "",
      });

      const handlePreview = (state: string | null) => {
        setAvatarPreview(state);
      };

      handlePreview(user.avatar || null);

      const handleError = (data: FormErrors) => {
        setErrors(data);
      };

      handleError({});
    }
  }, [isOpen, user]);

  // Validate avatar URL
  const validateAvatarUrl = useCallback((url: string): boolean => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    // Update avatar preview
    if (name === "avatar" && value) {
      setAvatarPreview(value);
    } else if (name === "avatar" && !value) {
      setAvatarPreview(null);
    }
  };

  // Handle avatar URL blur - validate the URL
  const handleAvatarBlur = () => {
    if (formData.avatar && !validateAvatarUrl(formData.avatar)) {
      setErrors((prev) => ({
        ...prev,
        avatar: t.validation.avatarInvalid,
      }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = t.validation.nameRequired;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t.validation.nameTooShort;
    }

    // Avatar URL validation
    if (formData.avatar && !validateAvatarUrl(formData.avatar)) {
      newErrors.avatar = t.validation.avatarInvalid;
    }

    // Password validation (only if password is provided)
    if (formData.password) {
      if (formData.password.length < 6) {
        newErrors.password = t.validation.passwordTooShort;
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = t.validation.passwordsNotMatch;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Prepare data - only send fields that have values
      const profileData: Record<string, string> = {};

      if (formData.name.trim()) {
        profileData.name = formData.name.trim();
      }
      if (formData.avatar) {
        profileData.avatar = formData.avatar;
      }
      if (formData.password && formData.password.length >= 6) {
        profileData.password = formData.password;
      }

      const result = await updateProfileAction(profileData);

      if (result.success && result.data?.user) {
        // Update local user state with the returned user data
        setUser(result.data.user);
        toast.success(t.success);
        onSuccess?.();
        onClose();
      } else {
        toast.error(result.message || t.error);
      }
    } catch (error) {
      console.error("[EditProfileModal] Submit error:", error);
      toast.error(t.error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const content = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-9999999 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-profile-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl bg-surface-50 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between px-6 py-4 border-b border-primary/10 bg-gradient-to-r from-primary/5 to-transparent">
              <h2
                id="edit-profile-title"
                className="text-xl font-bold text-surface-900"
              >
                {t.title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-surface-400 hover:text-surface-600 hover:bg-surface-100 transition-all duration-200"
                aria-label={t.cancel}
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Avatar Section */}
              <div className="flex flex-col items-center">
                <div className="relative mb-3">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-surface-100 border-4 border-primary/20 shadow-inner">
                    {avatarPreview ? (
                      <Image
                        src={avatarPreview}
                        alt="Avatar preview"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                        onError={() => setAvatarPreview(null)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FiImage size={32} className="text-surface-300" />
                      </div>
                    )}
                  </div>
                  {avatarPreview && (
                    <FaCheckCircle className="absolute bottom-0 right-0 text-primary bg-white rounded-full p-0.5" />
                  )}
                </div>
                <div className="w-full">
                  <label
                    htmlFor="avatar"
                    className="block text-sm font-medium text-surface-700 mb-1.5"
                  >
                    {t.avatarLabel}
                  </label>
                  <input
                    type="url"
                    id="avatar"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                    onBlur={handleAvatarBlur}
                    placeholder={t.avatarPlaceholder}
                    className={`w-full px-4 py-2.5 rounded-lg border bg-white text-surface-900 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 ${
                      errors.avatar
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                        : "border-surface-200"
                    }`}
                  />
                  {errors.avatar && (
                    <p className="mt-1 text-xs text-red-500">{errors.avatar}</p>
                  )}
                </div>
              </div>

              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-surface-700 mb-1.5"
                >
                  {t.nameLabel}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.namePlaceholder}
                  className={`w-full px-4 py-2.5 rounded-lg border bg-white text-surface-900 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 ${
                    errors.name
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                      : "border-surface-200"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Email Field - Disabled with notice */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-surface-700 mb-1.5"
                >
                  {t.emailLabel}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full px-4 py-2.5 rounded-lg border border-surface-200 bg-surface-50 text-surface-500 cursor-not-allowed"
                  />
                  <div className="flex items-center gap-1.5 mt-2 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200">
                    <FiLock className="text-amber-500 shrink-0" size={14} />
                    <span className="text-xs text-amber-700">
                      {t.emailReadOnly}
                    </span>
                  </div>
                </div>
              </div>

              {/* Password Fields */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-surface-700 mb-1.5"
                  >
                    {t.passwordLabel}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder={t.passwordPlaceholder}
                      className={`w-full px-4 py-2.5 pr-12 rounded-lg border bg-white text-surface-900 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 ${
                        errors.password
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                          : "border-surface-200"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-surface-400 hover:text-surface-600 transition-colors"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <FiEyeOff size={18} />
                      ) : (
                        <FiEye size={18} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-surface-700 mb-1.5"
                  >
                    {t.confirmPasswordLabel}
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder={t.confirmPasswordPlaceholder}
                      disabled={!formData.password}
                      className={`w-full px-4 py-2.5 pr-12 rounded-lg border bg-white text-surface-900 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 disabled:bg-surface-50 disabled:cursor-not-allowed ${
                        errors.confirmPassword
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                          : "border-surface-200"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      disabled={!formData.password}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-surface-400 hover:text-surface-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff size={18} />
                      ) : (
                        <FiEye size={18} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-surface-200 bg-white text-surface-700 font-medium hover:bg-surface-50 hover:border-surface-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-primary/25"
                >
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t.saving}
                    </>
                  ) : (
                    t.save
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (typeof window === "undefined") return null;

  return createPortal(content, document.body);
};

export default EditProfileModal;
