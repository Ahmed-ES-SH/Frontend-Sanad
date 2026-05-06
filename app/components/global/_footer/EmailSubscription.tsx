import { FormState } from "@/app/types/footer";
import { Messages } from "@/app/hooks/useTranslation";
import React, { useState } from "react";
import { FaCheck, FaSpinner, FaExclamationCircle } from "react-icons/fa";
import { useLocale } from "@/app/hooks/useLocale";
import { usePathname } from "next/navigation";

interface EmailSubscriptionProps {
  t: Messages["footerLines"];
}

export default function EmailSubscription({ t }: EmailSubscriptionProps) {
  const locale = useLocale();
  const pathname = usePathname();

  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (pathname.includes(`/${locale}/dashboard`)) return null;

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim()) {
      setFormState("error");
      setErrorMessage("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setFormState("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setFormState("loading");

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormState("success");
      setEmail("");
    } catch {
      setFormState("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };
  return (
    <form
      onSubmit={handleSubscribe}
      className="w-full max-lg:w-full lg:w-auto"
      noValidate
    >
      <div className="flex items-center max-lg:flex-col max-lg:gap-3 max-lg:items-stretch">
        <div className="relative flex-1 min-w-0">
          <input
            type="email"
            id="UserEmail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (formState === "error") {
                setFormState("idle");
                setErrorMessage("");
              }
            }}
            placeholder={t.emailPlaceholder}
            name="email"
            autoComplete="email"
            aria-invalid={formState === "error"}
            aria-describedby={formState === "error" ? "email-error" : undefined}
            className={`w-full h-[48px] px-4 text-sm outline-none transition-colors duration-200 bg-stone-100 text-stone-900 placeholder:text-stone-500 border-2 rtl:lg:rounded-l-md ltr:lg:rounded-r-md ${
              formState === "error"
                ? "border-rose-500"
                : formState === "success"
                  ? "border-emerald-500"
                  : "border-stone-100 focus:border-orange-500"
            }`}
            disabled={formState === "loading"}
          />
        </div>
        <button
          type="submit"
          disabled={formState === "loading"}
          className={`h-[48px] px-6 text-sm font-bold uppercase tracking-wide text-white transition-all duration-200 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-60 disabled:cursor-not-allowed shrink-0 rtl:lg:rounded-l-md ltr:lg:rounded-r-md max-lg:rounded-md`}
        >
          {formState === "loading" ? (
            <span className="flex items-center justify-center gap-2">
              <FaSpinner className="animate-spin" />
              <span>{t.subscribeButton}</span>
            </span>
          ) : formState === "success" ? (
            <span className="flex items-center justify-center gap-2">
              <FaCheck />
              <span>{"Subscribed!"}</span>
            </span>
          ) : (
            t.subscribeButton
          )}
        </button>
      </div>
      {formState === "error" && errorMessage && (
        <p
          id="email-error"
          className="mt-2 text-sm text-rose-400 flex items-center gap-1.5"
          role="alert"
        >
          <FaExclamationCircle className="shrink-0" />
          <span>{errorMessage}</span>
        </p>
      )}
      {formState === "success" && (
        <p
          className="mt-2 text-sm text-emerald-400 flex items-center gap-1.5"
          role="status"
        >
          <FaCheck className="shrink-0" />
          <span>{"Successfully subscribed!"}</span>
        </p>
      )}
    </form>
  );
}
