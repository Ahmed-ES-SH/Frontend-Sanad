"use client";
import React, { useState } from "react";
import {
  calculateStrength,
  PasswordRequirements,
  validateResetForm,
} from "./validation";
import { Messages } from "@/app/hooks/useTranslation";
import { useRouter } from "next/navigation";
import { useLocale } from "@/app/hooks/useLocale";
import { resetPasswordAction } from "@/app/actions/authActions";
import { toast } from "sonner";
import { FiArrowLeft, FiLock } from "react-icons/fi";
import InputField from "../InputField";
import SubmitButton from "../SubmitButton";
import RequirementsChecklist from "./RequirementsChecklist";

interface RestFormProps {
  t: Messages["resetPassword"];
  email: string | null;
  token: string | null;
}

export default function RestForm({ t, email, token }: RestFormProps) {
  const locale = useLocale();
  const router = useRouter();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const passwordRequirements = PasswordRequirements(formData);

  const strength = calculateStrength(formData);
  const strengthLabels = [t.weak, t.fair, t.good, t.strong];
  const strengthColors = ["#ef4444", "#f97316", "#eab308", "#22c55e"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !validateResetForm(token!, email!, router, locale, passwordRequirements)
    )
      return;

    {
      setIsLoading(true);

      try {
        const response = await resetPasswordAction({
          email: email!,
          password: formData.password,
          token: token!,
        });

        if (response.success) {
          toast.success(response.message);
          router.push(`/${locale}/signin`);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error((error as Error)?.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-h-[75dvh] overflow-y-auto p-2"
    >
      {/* New Password Field */}
      <div className="space-y-2">
        <div
          className={`flex justify-between items-center rtl:flex-row-reverse`}
        >
          <label
            className="text-[11px] uppercase tracking-widest font-semibold"
            style={{ color: "var(--surface-500)" }}
          >
            {t.newPassword}
          </label>
          {formData.password && (
            <span
              className="text-[10px] font-medium"
              style={{ color: strength >= 3 ? "#16a34a" : "var(--primary)" }}
            >
              {strengthLabels[Math.min(strength - 1, 3)] || t.weak}
            </span>
          )}
        </div>

        <InputField
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder={t.newPasswordPlaceholder}
          icon={<FiLock size={18} />}
          showPasswordToggle
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          autoComplete="new-password"
        />

        {/* Strength Indicator Bars */}
        <div className="flex gap-1 mt-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  strength >= i
                    ? strengthColors[strength - 1]
                    : "var(--surface-200)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <label
          className="text-[11px] uppercase tracking-widest font-semibold block"
          style={{ color: "var(--surface-500)" }}
        >
          {t.confirmPassword}
        </label>
        <InputField
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder={t.confirmPasswordPlaceholder}
          icon={<FiLock size={18} />}
          showPasswordToggle
          showPassword={showConfirmPassword}
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
          autoComplete="new-password"
        />
      </div>

      {/* Requirements Checklist */}
      <RequirementsChecklist
        t={t}
        passwordRequirements={passwordRequirements}
      />

      <SubmitButton
        isLoading={isLoading}
        disabled={
          !passwordRequirements.length ||
          !passwordRequirements.numberAndSpecial ||
          !passwordRequirements.match ||
          isLoading
        }
      >
        <span className="flex items-center gap-2">
          {t.updatePassword}
          <FiArrowLeft className="rtl:rotate-180" size={18} />
        </span>
      </SubmitButton>
    </form>
  );
}
