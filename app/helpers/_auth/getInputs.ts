import { Messages } from "@/app/hooks/useTranslation";

export function getSignUpInputs(
  signUpPage: Messages["signUpPage"],
  showPassword: boolean,
  showConfirmPassword: boolean,
  setShowPassword: (value: boolean) => void,
  setShowConfirmPassword: (value: boolean) => void,
) {
  return [
    {
      name: "fullName",
      label: signUpPage.fullName,
      placeholder: signUpPage.fullNamePlaceholder,
      type: "text",
      autoComplete: "name",
      autoFocus: true,
    },
    {
      name: "email",
      label: signUpPage.email,
      placeholder: signUpPage.emailPlaceholder,
      type: "email",
      autoComplete: "email",
    },
    {
      name: "password",
      label: signUpPage.password,
      placeholder: signUpPage.passwordPlaceholder,
      type: "password",
      showToggle: true,
      toggleState: showPassword,
      onToggle: () => setShowPassword(!showPassword),
      autoComplete: "new-password",
    },
    {
      name: "confirmPassword",
      label: signUpPage.confirmPassword,
      placeholder: signUpPage.confirmPasswordPlaceholder,
      type: "password",
      showToggle: true,
      toggleState: showConfirmPassword,
      onToggle: () => setShowConfirmPassword(!showConfirmPassword),
      autoComplete: "new-password",
    },
  ];
}
