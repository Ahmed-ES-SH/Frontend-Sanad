import { Messages } from "@/app/hooks/useTranslation";
import {
  FormErrors,
  SignUpFormType,
  formValidationType,
} from "@/app/types/auth";
import { Dispatch, SetStateAction } from "react";

export function validateSignupForm(
  formData: SignUpFormType,
  formValidation: formValidationType,
  setErrors: Dispatch<SetStateAction<FormErrors>>,
) {
  const newErrors: FormErrors = {};

  if (!formData.fullName.trim()) {
    newErrors.fullName = formValidation.fullNameRequired;
  } else if (formData.fullName.trim().length < 2) {
    newErrors.fullName = formValidation.fullNameTooShort;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email.trim()) {
    newErrors.email = formValidation.emailRequired;
  } else if (!emailRegex.test(formData.email)) {
    newErrors.email = formValidation.emailInvalid;
  }

  if (!formData.password) {
    newErrors.password = formValidation.passwordRequired;
  } else if (formData.password.length < 8) {
    newErrors.password = formValidation.passwordTooShort;
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
    newErrors.password = formValidation.passwordWeak;
  }

  if (!formData.confirmPassword) {
    newErrors.confirmPassword = formValidation.confirmPasswordRequired;
  } else if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = formValidation.passwordsNotMatch;
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}

export function getSignupChecks(
  signUpPage: Messages["signUpPage"],
  formData: SignUpFormType,
) {
  return [
    {
      label: signUpPage.passwordLength,
      met: formData.password.length >= 8,
    },
    {
      label: signUpPage.passwordLowercase,
      met: /[a-z]/.test(formData.password),
    },
    {
      label: signUpPage.passwordUppercase,
      met: /[A-Z]/.test(formData.password),
    },
    {
      label: signUpPage.passwordNumber,
      met: /\d/.test(formData.password),
    },
  ];
}
