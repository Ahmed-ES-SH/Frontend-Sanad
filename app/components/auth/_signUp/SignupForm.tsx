import React, { useState } from "react";
import { getSignupChecks, validateSignupForm } from "./validation";
import { FormErrors } from "@/app/types/auth";
import { useLocale } from "@/app/hooks/useLocale";
import { useRouter } from "next/navigation";
import { registerAction } from "@/app/actions/authActions";
import { toast } from "sonner";
import { getSignUpInputs } from "../../../helpers/_auth/getInputs";
import FormInput from "../FormInput";
import { FiArrowRight, FiCheck, FiX } from "react-icons/fi";
import { Messages } from "@/app/hooks/useTranslation";

interface SignupFormComponentProps {
  signUpPage: Messages["signUpPage"];
  formValidation: Messages["formValidation"];
}
export default function SignupFormComponent({
  signUpPage,
  formValidation,
}: SignupFormComponentProps) {
  const locale = useLocale();
  const router = useRouter();

  const isRTL = locale === "ar";

  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateSignupForm(formData, formValidation, setErrors)) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await registerAction({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      if (response.success) {
        toast.success(response.message);
        router.push(
          `/${locale}/signin?registered=1&email=${encodeURIComponent(
            formData.email,
          )}`,
        );
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error((error as Error)?.message || signUpPage.somethingWentWrong);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordChecks = [
    { met: formData.password.length >= 8 },
    { met: /[a-z]/.test(formData.password) },
    { met: /[A-Z]/.test(formData.password) },
    { met: /\d/.test(formData.password) },
  ];

  const isFormValid =
    Object.keys(errors).length === 0 &&
    Object.values(formData).every((value) => value.trim() !== "");
  const metCount = passwordChecks.filter((c) => c.met).length;

  const strengthLevel = formData.password
    ? metCount <= 1
      ? 0
      : metCount === 2
        ? 1
        : metCount === 3
          ? 2
          : 3
    : 0;
  const strengthLabels = [
    signUpPage.weak,
    signUpPage.fair,
    signUpPage.good,
    signUpPage.strong,
  ];
  const strengthColors = [
    "var(--accent-rose)",
    "var(--accent-amber)",
    "var(--primary)",
    "var(--accent-emerald)",
  ];

  const inputs = getSignUpInputs(
    signUpPage,
    showPassword,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
  );

  const signupChecks = getSignupChecks(signUpPage, formData);

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
      {inputs.map((input) => (
        <div key={input.name}>
          {input.name === "password" ? (
            <div className="space-y-1.5">
              <FormInput
                {...input}
                value={formData[input.name as keyof typeof formData]}
                onChange={handleInputChange}
                error={errors[input.name as keyof FormErrors]}
                signUpPage={signUpPage}
              />

              {formData.password && (
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 flex gap-1">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-1 flex-1 rounded-full transition-all duration-300"
                          style={{
                            backgroundColor:
                              i <= strengthLevel
                                ? strengthColors[strengthLevel]
                                : "var(--surface-200)",
                          }}
                        />
                      ))}
                    </div>
                    <span
                      className="text-xs font-medium whitespace-nowrap"
                      style={{ color: strengthColors[strengthLevel] }}
                    >
                      {strengthLabels[strengthLevel]}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                    {signupChecks.map((check, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1 text-xs"
                        style={{
                          color: check.met
                            ? "var(--surface-600)"
                            : "var(--surface-400)",
                        }}
                      >
                        {check.met ? (
                          <FiCheck
                            size={12}
                            style={{ color: "var(--accent-emerald)" }}
                          />
                        ) : (
                          <FiX />
                        )}
                        {check.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <FormInput
              {...input}
              value={formData[input.name as keyof typeof formData]}
              onChange={handleInputChange}
              error={errors[input.name as keyof FormErrors]}
              signUpPage={signUpPage}
            />
          )}

          {/* Password match indicator attached to confirmPassword */}
          {input.name === "confirmPassword" &&
            formData.confirmPassword &&
            formData.password === formData.confirmPassword && (
              <p
                className="text-xs mt-2"
                style={{ color: "var(--accent-emerald)" }}
              >
                <FiCheck
                  size={12}
                  className="inline me-1"
                  style={{ color: "var(--accent-emerald)" }}
                />
                {signUpPage.passwordsMatch}
              </p>
            )}
        </div>
      ))}

      <button
        type="submit"
        disabled={!isFormValid || isLoading}
        className="surface-btn-primary w-full py-3 sm:py-3.5 mt-5 sm:mt-6 disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none"
        style={{
          minHeight: "48px",
          fontSize: "clamp(0.875rem, 2.5vw, 0.9375rem)",
        }}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
        ) : (
          <span className="flex items-center justify-center gap-2">
            {signUpPage.submit}
            <FiArrowRight size={16} className={isRTL ? "rotate-180" : ""} />
          </span>
        )}
      </button>
    </form>
  );
}
