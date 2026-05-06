"use client";
import { useLocale } from "@/app/hooks/useLocale";
import { getTranslations } from "@/app/helpers/getTranslations";
import LocaleLink from "../global/LocaleLink";
import Img from "../global/Img";
import { directionMap } from "@/app/constants/global";
import SignupFormComponent from "./_signUp/SignupForm";

export default function SignupForm() {
  const locale = useLocale();
  const { signUpPage, formValidation } = getTranslations(locale);

  const signInWithGoogle = () => {
    // window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/google`;
    window.location.href = `/api/auth/google`;
  };

  return (
    <div dir={directionMap[locale]} className="w-full sm:max-w-xl mx-auto">
      {/* SignUP Form */}
      <SignupFormComponent
        signUpPage={signUpPage}
        formValidation={formValidation}
      />

      <div className="flex items-center gap-3 my-5 sm:my-6">
        <div
          className="h-px flex-1"
          style={{ backgroundColor: "var(--surface-200)" }}
        />
        <p
          className="text-xs font-medium"
          style={{ color: "var(--surface-400)" }}
        >
          {signUpPage.orContinueWith}
        </p>
        <div
          className="h-px flex-1"
          style={{ backgroundColor: "var(--surface-200)" }}
        />
      </div>

      <button
        type="button"
        onClick={signInWithGoogle}
        className="surface-btn-secondary w-full py-3 sm:py-3.5"
        style={{ minHeight: "48px" }}
      >
        <span className="flex items-center justify-center gap-3">
          <Img src="/google.png" alt={signUpPage.google} className="w-5 h-5" />
          <span>{signUpPage.google}</span>
        </span>
      </button>

      <p className="text-center body text-surface-500 mt-5 sm:mt-6">
        {signUpPage.alreadyHave}{" "}
        <LocaleLink
          href="/signin"
          className="font-bold underline text-primary transition-colors duration-150"
        >
          {signUpPage.signIn}
        </LocaleLink>
      </p>
    </div>
  );
}
