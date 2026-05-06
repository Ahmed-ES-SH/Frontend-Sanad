"use client";
import { motion } from "framer-motion";
import { FiCheckCircle, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useLocale } from "@/app/hooks/useLocale";
import { directionMap } from "@/app/constants/global";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useSearchParams } from "next/navigation";
import LocaleLink from "../global/LocaleLink";

export default function CheckYourInbox() {
  const locale = useLocale();
  const verifyT = useTranslation("verifyCode");
  const isRTL = locale === "ar";
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const email = searchParams.get("email");
  const isResetPassword = reason === "reset-password";

  const title = isResetPassword
    ? locale === "ar"
      ? "تحقق من بريدك الوارد"
      : "Check your inbox"
    : locale === "ar"
      ? "تحقق من بريدك الوارد"
      : "Check your inbox";

  const description = isResetPassword
    ? locale === "ar"
      ? `إذا كان هناك حساب${email ? ` مرتبط بالبريد ${email}` : ""}، فقد أرسلنا رابط إعادة تعيين كلمة المرور. افتح الرسالة واتبع التعليمات للمتابعة.`
      : `If an account exists${email ? ` for ${email}` : ""}, a password reset link has been sent. Open the email and follow the instructions to continue.`
    : locale === "ar"
      ? `أرسلنا رسالة تحقق${email ? ` إلى ${email}` : ""}. افتح الرسالة واضغط على رابط التحقق لإكمال تسجيل الدخول.`
      : `We sent a verification email${email ? ` to ${email}` : ""}. Open the message and click the verification link to complete sign in.`;

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
        <FiCheckCircle
          size={64}
          className="text-accent-emerald"
          aria-hidden="true"
        />

        {/* Title */}
        <h1 className="font-display text-3xl font-extrabold text-surface-900 tracking-tight text-center">
          {title}
        </h1>

        {/* Message */}
        <p className="text-surface-600 text-base leading-relaxed text-center px-2 max-w-md">
          {description}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex flex-col items-center gap-4">
        <LocaleLink
          href="/signin"
          className="inline-flex items-center gap-2 surface-btn-primary px-6 py-3 rounded-xl font-semibold"
        >
          {isRTL ? <FiArrowRight size={18} /> : <FiArrowLeft size={18} />}
          {verifyT?.goToSignIn || "Go to Sign In"}
        </LocaleLink>
      </div>
    </motion.div>
  );
}
