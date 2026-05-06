"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/app/hooks/useLocale";
import {
  FiCheckCircle,
  FiXCircle,
  FiLoader,
  FiArrowRight,
  FiArrowLeft,
} from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import { verifyEmailAction } from "@/app/actions/authActions";
import { toast } from "sonner";
import { Suspense } from "react";
import LocaleLink from "../global/LocaleLink";
import { directionMap } from "@/app/constants/global";
import { useTranslation } from "@/app/hooks/useTranslation";

export default function VerifyEmailContent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContentInner />
    </Suspense>
  );
}

type Status = "verifying" | "success" | "error";

function VerifyEmailContentInner() {
  const locale = useLocale();
  const t = useTranslation("verifyCode");
  const isRTL = locale === "ar";
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<Status>(token ? "verifying" : "error");
  const [message, setMessage] = useState(
    token ? "" : t?.missingToken || "Verification token is missing",
  );

  useEffect(() => {
    if (!token) {
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await verifyEmailAction(token);

        if (response.success) {
          setStatus("success");
          setMessage(response.message);
          toast.success(response.message);
        } else {
          setStatus("error");
          setMessage(response.message);
          toast.error(response.message);
        }
      } catch (error) {
        setStatus("error");
        setMessage(
          (error as { message?: string })?.message || "Verification failed",
        );
        toast.error(
          (error as { message?: string })?.message || "Verification failed",
        );
      }
    };

    if (token) verifyEmail();
  }, [token, locale]);

  return (
    <motion.div
      dir={directionMap[locale]}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col items-center gap-8"
    >
      {/* Icon */}
      <div className="flex flex-col items-center gap-4">
        {status === "verifying" && (
          <FiLoader
            size={64}
            className="animate-spin text-primary"
            aria-hidden="true"
          />
        )}
        {status === "success" && (
          <FiCheckCircle
            size={64}
            className="text-accent-emerald"
            aria-hidden="true"
          />
        )}
        {status === "error" && (
          <FiXCircle
            size={64}
            className="text-accent-rose"
            aria-hidden="true"
          />
        )}

        {/* Title */}
        <h1 className="font-display text-3xl font-extrabold text-surface-900 tracking-tight">
          {status === "verifying"
            ? t?.verifyingTitle || "Verifying Email"
            : status === "success"
              ? t?.successTitle || "Email Verified"
              : t?.errorTitle || "Verification Failed"}
        </h1>

        {/* Message */}
        <p className="text-surface-600 text-base leading-relaxed text-center px-2 max-w-md">
          {message ||
            (status === "verifying"
              ? t?.verifyingDesc || "Please wait while we verify your email..."
              : status === "success"
                ? t?.successDesc ||
                  "Your email has been verified successfully. You can now sign in."
                : t?.errorDesc ||
                  "We were unable to verify your email. The link may be invalid or expired.")}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex flex-col items-center gap-4">
        {status === "success" && (
          <LocaleLink
            href="/signin"
            className="inline-flex items-center gap-2 surface-btn-primary px-6 py-3 rounded-xl font-semibold"
          >
            {isRTL ? <FiArrowRight size={18} /> : <FiArrowLeft size={18} />}
            {t?.goToSignIn || "Go to Sign In"}
          </LocaleLink>
        )}

        {status === "error" && (
          <LocaleLink
            href="/signup"
            className="inline-flex items-center gap-2 surface-btn-primary px-6 py-3 rounded-xl font-semibold"
          >
            {isRTL ? <FiArrowRight size={18} /> : <FiArrowLeft size={18} />}
            {t?.backToSignup || "Back to Sign Up"}
          </LocaleLink>
        )}
      </div>
    </motion.div>
  );
}
