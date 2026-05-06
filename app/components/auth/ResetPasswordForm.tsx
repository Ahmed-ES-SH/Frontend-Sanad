"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/app/hooks/useLocale";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { verifyResetTokenAction } from "@/app/actions/authActions";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useTranslation } from "@/app/hooks/useTranslation";
import { directionMap } from "@/app/constants/global";

import Img from "../global/Img";
import LocaleLink from "../global/LocaleLink";
import RestForm from "./_resetPassword/RestForm";
import FormHeader from "./FormHeader";

export default function ResetPasswordForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordFormContent />
    </Suspense>
  );
}

type ResetPasswordViewState = "validating" | "ready" | "invalid";

function ResetPasswordFormContent() {
  const locale = useLocale();
  const t = useTranslation("resetPassword");
  const isRTL = locale === "ar";
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("e");

  const [viewState, setViewState] = useState<ResetPasswordViewState>(
    token && email ? "validating" : "invalid",
  );
  const [errorMessage, setErrorMessage] = useState<string>(
    token && email
      ? ""
      : locale === "ar"
        ? "رابط إعادة تعيين كلمة المرور غير صالح أو غير مكتمل."
        : "This reset password link is invalid or incomplete.",
  );

  useEffect(() => {
    if (!token || !email) {
      return;
    }

    let isActive = true;

    void verifyResetTokenAction(token, email).then((response) => {
      if (!isActive) return;

      if (response.success) {
        setViewState("ready");
        return;
      }

      setViewState("invalid");
      setErrorMessage(response.message);
      toast.error(response.message);
    });

    return () => {
      isActive = false;
    };
  }, [email, token]);

  if (viewState === "validating") {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (viewState === "invalid") {
    return (
      <motion.div
        dir={directionMap[locale]}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-md:mt-12 space-y-6 text-center"
      >
        <Img src="/sanad-logo.png" alt="Logo" className="w-16 mx-auto" />
        <FormHeader
          title={
            locale === "ar" ? "رابط غير صالح" : "Invalid reset password link"
          }
          subtitle={errorMessage}
        />

        <div className="flex flex-col items-center gap-3">
          <LocaleLink
            href="/forgot-password"
            className="surface-btn-primary px-6 py-3 rounded-xl font-semibold"
          >
            {locale === "ar" ? "طلب رابط جديد" : "Request a new link"}
          </LocaleLink>

          <LocaleLink
            href="/signin"
            className="text-sm text-primary font-medium transition-colors flex items-center gap-1 group"
          >
            {isRTL ? (
              <FiArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            ) : (
              <FiArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
            )}
            {t.backToLogin}
          </LocaleLink>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      dir={directionMap[locale]}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full max-md:mt-12 space-y-6"
    >
      {/* Identity Branding */}
      <Img src="/sanad-logo.png" alt="Logo" className="w-16 mx-auto" />

      <FormHeader title={t.title} subtitle={t.subtitle} />

      <RestForm t={t} email={email} token={token} />

      <div className="pt-2 flex flex-col items-center">
        <LocaleLink
          href="/signin"
          className="text-sm text-primary font-medium transition-colors flex items-center gap-1 group"
        >
          {isRTL ? (
            <FiArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          ) : (
            <FiArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
          )}
          {t.backToLogin}
        </LocaleLink>
      </div>
    </motion.div>
  );
}
