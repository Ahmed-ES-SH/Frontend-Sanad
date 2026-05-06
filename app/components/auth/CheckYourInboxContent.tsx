/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiExternalLink,
  FiArrowLeft,
  FiArrowRight,
  FiLoader,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslation";
import { directionMap } from "@/app/constants/global";
import LocaleLink from "../global/LocaleLink";

const RESEND_COOLDOWN = 30; // seconds

type ResendState = "idle" | "loading" | "success" | "error";

export default function CheckYourInboxContent() {
  const locale = useLocale();
  const t = useTranslation("checkYourInbox");
  const isRTL = locale === "ar";
  const shouldReduceMotion = useReducedMotion();

  // Placeholder for email — will be populated from signup context when available
  const userEmail = null as string | null;
  const maskedEmail =
    userEmail !== null ? userEmail.replace(/^(.).+(@.+)$/, "$1***$2") : null;

  // Resend state machine
  const [resendState, setResendState] = useState<ResendState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [cooldown, setCooldown] = useState<number>(0);

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleResend = useCallback(async () => {
    if (resendState === "loading" || cooldown > 0) return;

    setResendState("loading");
    setErrorMessage("");

    try {
      // TODO: Wire to actual API endpoint when resend endpoint is available
      // const response = await fetch(`/api/auth/resend-verification`, { method: "POST" });
      // if (!response.ok) throw new Error("Failed to resend");

      // Simulated API call for now
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setResendState("success");
      setCooldown(RESEND_COOLDOWN);
    } catch {
      setResendState("error");
      setErrorMessage(
        t.resendError ?? "Something went wrong. Please try again.",
      );
    }
  }, [resendState, cooldown]);

  // Entrance animation — respect reduced motion preference
  const entranceAnimation = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.2 },
      }
    : {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.4 },
      };

  return (
    <motion.div
      dir={directionMap[locale]}
      {...entranceAnimation}
      className="w-full flex flex-col items-center gap-8"
    >
      {/* Header block: icon + title + description — tight internal grouping */}
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-display text-3xl font-extrabold text-surface-900 tracking-tight">
          {t.title}
        </h1>

        <p className="text-surface-600 text-base leading-relaxed text-center px-2">
          {maskedEmail
            ? t.emailHint.replace("{email}", maskedEmail)
            : t.emailHint.replace("{email}", "your email")}
        </p>

        <p className="text-surface-500 text-sm text-center px-2">
          {t.spamNote}
        </p>
      </div>

      {/* Primary action — full-width CTA */}
      <button
        type="button"
        onClick={() => window.open("mailto:")}
        className="bg-gradient-primary w-full py-4 px-6 rounded-xl text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] shadow-surface-md hover:shadow-surface-lg transition-shadow duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <FiExternalLink size={20} />
        {t.openEmailApp}
      </button>

      {/* Secondary actions — tighter grouping, no arbitrary divider */}
      <div className="w-full flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          {/* Resend button with state feedback */}
          <button
            type="button"
            onClick={handleResend}
            disabled={resendState === "loading" || cooldown > 0}
            aria-busy={resendState === "loading"}
            aria-live="polite"
            className={`text-primary font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md px-3 py-2 min-h-[44px] flex items-center justify-center ${
              resendState === "loading" || cooldown > 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:underline"
            }`}
          >
            {resendState === "loading" ? (
              <span className="inline-flex items-center gap-1.5">
                <FiLoader
                  className="animate-spin"
                  size={14}
                  aria-hidden="true"
                />
                {t.resendSending ?? "Sending..."}
              </span>
            ) : cooldown > 0 ? (
              `${t.resendCooldown ?? "Try again in"} ${cooldown}s`
            ) : resendState === "success" ? (
              <span className="inline-flex items-center gap-1.5 text-accent-emerald">
                <FiCheckCircle size={14} aria-hidden="true" />
                {t.resendSuccess}
              </span>
            ) : resendState === "error" ? (
              <span className="inline-flex items-center gap-1.5 text-accent-rose">
                <FiAlertCircle size={14} aria-hidden="true" />
                {errorMessage}
              </span>
            ) : (
              t.resendLink
            )}
          </button>
        </div>

        <LocaleLink
          href="/signin"
          className="inline-flex items-center gap-2 text-surface-500 hover:text-surface-900 transition-colors duration-200 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md px-2 py-1"
        >
          {isRTL ? <FiArrowRight size={18} /> : <FiArrowLeft size={18} />}
          {t.backToLogin}
        </LocaleLink>
      </div>
    </motion.div>
  );
}
