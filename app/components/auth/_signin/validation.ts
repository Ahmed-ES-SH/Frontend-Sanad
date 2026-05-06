import { Messages } from "@/app/hooks/useTranslation";
import { FormErrors, LoginCredentials } from "@/app/types/auth";

export function validateSignInForm(
  formData: LoginCredentials,
  formValidation: Messages["formValidation"],
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>,
) {
  const newErrors: FormErrors = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email.trim()) {
    newErrors.email = formValidation.emailRequired;
  } else if (!emailRegex.test(formData.email)) {
    newErrors.email = formValidation.emailInvalid;
  }

  if (!formData.password) {
    newErrors.password = formValidation.passwordRequired;
  }

  if (newErrors) return setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
}
