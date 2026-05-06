/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";

interface PasswordRequirements {
  password: string;
  confirmPassword: string;
}

export function PasswordRequirements(formData: PasswordRequirements) {
  return {
    length: formData.password.length >= 8,
    numberAndSpecial:
      /[0-9]/.test(formData.password) && /[^A-Za-z0-9]/.test(formData.password),
    match:
      formData.password === formData.confirmPassword &&
      formData.confirmPassword !== "",
  };
}

export function calculateStrength(formData: PasswordRequirements) {
  let score = 0;
  if (formData.password.length >= 8) score++;
  if (/[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password))
    score++;
  if (/[0-9]/.test(formData.password)) score++;
  if (/[^A-Za-z0-9]/.test(formData.password)) score++;
  return score;
}

export function validateResetForm(
  token: string,
  email: string,
  router: any,
  locale: string,
  passwordRequirements: any,
) {
  if (!token || !email) {
    toast.error("Invalid reset link");
    router.push(`/${locale}/forgot-password`);
    return;
  }

  if (
    !passwordRequirements.length ||
    !passwordRequirements.numberAndSpecial ||
    !passwordRequirements.match
  ) {
    toast.error("Invalid password");
    return false;
  }
  return true;
}
