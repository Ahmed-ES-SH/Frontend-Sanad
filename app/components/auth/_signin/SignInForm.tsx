"use client";
import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/app/hooks/useLocale";
import { getTranslations } from "@/app/helpers/getTranslations";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { loginAction } from "@/app/actions/authActions";
import { AUTH_ENDPOINTS } from "@/app/constants/endpoints";
import { useAuthStore } from "@/app/store/AuthSlice";
import { useCartStore } from "@/app/store/CartSlice";
import { FormErrors } from "@/app/types/auth";
import { validateSignInForm } from "./validation";
import { directionMap } from "@/app/constants/global";

import SocialButton from "../SocialButtonProps ";
import SubmitButton from "../SubmitButton";
import FormHeader from "../FormHeader";
import SignInFields from "../SignInFields";
import LocaleLink from "../../global/LocaleLink";

export default function SignInForm() {
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { formValidation, signInPage } = getTranslations(locale);
  const { setUser } = useAuthStore();
  const { mergeGuestCart, fetchCart } = useCartStore();
  const isRegistered = searchParams.get("registered") === "1";
  const pendingEmail = searchParams.get("email");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isFormValid =
    formData.email.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.password;

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  const handleSignIn = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateSignInForm(formData, formValidation, setErrors)) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginAction({
        email: formData.email,
        password: formData.password,
      });

      if (response.statusCode === 403) {
        toast.error(response.message);
        router.push(
          `/${locale}/check-your-inbox?reason=verify-email&email=${encodeURIComponent(
            formData.email,
          )}`,
        );
        return;
      }

      if (response.statusCode === 400) {
        toast.error(response.message);
        return;
      }

      if (response.success && response.data?.user) {
        const user = response.data.user;
        setUser(user);
        toast.success(response.message);

        // Merge any guest cart items into the newly authenticated cart
        const mergeResult = await mergeGuestCart();
        if (mergeResult.failedItems.length > 0) {
          toast.warning(
            `${mergeResult.failedItems.length} item(s) from your cart could not be added.`,
          );
        }
        // Refresh the cart from the server (merge returns updated cart, but
        // fetchCart ensures consistency)
        void fetchCart();

        router.push(
          user.role === "admin"
            ? `/${locale}/dashboard`
            : `/${locale}/userdashboard`,
        );
        router.refresh();
        return;
      }

      toast.error(response.message);
    } catch (error) {
      toast.error((error as Error)?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const signInWith = (strategy: "oauth_google" | "oauth_facebook") => {
    if (strategy === "oauth_google") {
      // Google OAuth initiates on the backend, redirects to /api/auth/callback/google
      window.location.href = AUTH_ENDPOINTS.GOOGLE_LOGIN;
    }
  };

  return (
    <>
      <motion.div
        dir={directionMap[locale]}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full space-y-4"
      >
        <FormHeader title={signInPage.title} subtitle={signInPage.subtitle} />

        {isRegistered && (
          <div className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-surface-700">
            {locale === "ar"
              ? `تم إنشاء الحساب${pendingEmail ? ` للبريد ${pendingEmail}` : ""}. سجّل الدخول لإرسال رسالة التحقق إلى بريدك الإلكتروني.`
              : `Your account${pendingEmail ? ` for ${pendingEmail}` : ""} was created. Sign in to trigger your verification email.`}
          </div>
        )}

        <form onSubmit={handleSignIn} className="w-full">
          <SignInFields
            locale={locale}
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          <SubmitButton
            isLoading={isLoading}
            disabled={!isFormValid || isLoading}
          >
            {signInPage.signIn}
          </SubmitButton>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-sm text-gray-600">
            {signInPage.noAccount}{" "}
            <LocaleLink
              href="/signup"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              {signInPage.createAccount}
            </LocaleLink>
          </p>
        </motion.div>

        <div className="w-full flex items-center gap-2">
          <div className="h-[2px] bg-gray-200 rounded-xl flex-1"></div>
          <p>{signInPage.or}</p>
          <div className="h-[2px] bg-gray-200 rounded-xl flex-1"></div>
        </div>
        <SocialButton
          provider="google"
          onClick={() => signInWith("oauth_google")}
        />
      </motion.div>
    </>
  );
}
