import { getTranslations } from "@/app/helpers/getTranslations";
import { Locale } from "@/app/types/global";
import Link from "next/link";
import {
  FaExclamationCircle,
  FaExclamationTriangle,
  FaArrowLeft,
  FaLock,
  FaShieldAlt,
} from "react-icons/fa";

interface PaymentFailedPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function PaymentFailedPage({
  params,
}: PaymentFailedPageProps) {
  const { locale } = await params;
  const t = getTranslations(locale);
  const { PaymentFailedPage: pfp } = t;
  const isRTL = locale === "ar";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen bg-[var(--surface-50,#faf8f6)] flex flex-col"
      style={{
        fontFamily: isRTL ? "'Inter', sans-serif" : "'Inter', sans-serif",
      }}
    >
      {/* Main Content */}
      <main className="grow flex items-center justify-center pt-24 pb-12 px-6">
        <div className="w-full max-w-lg">
          {/* Payment Failed Card */}
          <div className="bg-[var(--surface-card-bg,#ffffff)] rounded-xl p-8 md:p-12 text-center shadow-[var(--shadow-surface-sm)] border border-[var(--surface-card-border,#e7e1db)]">
            {/* Error Icon */}
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#ffdad6] mb-8">
              <FaExclamationCircle className="w-12 h-12 text-[#ba1a1a]" />
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-extrabold text-[var(--surface-900,#1f1b17)] tracking-tight mb-4">
              {pfp.title}
            </h1>

            {/* Description */}
            <p className="text-[#584237] leading-relaxed mb-6">
              {pfp.description}
            </p>

            {/* Reassurance Banner */}
            <div className="bg-[var(--accent-emerald,#10b981)]/10 border border-[var(--accent-emerald,#10b981)]/20 rounded-lg px-4 py-3 mb-8 flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5 text-[var(--accent-emerald,#10b981)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm font-medium text-[var(--accent-emerald,#10b981)]">
                {pfp.notCharged}
              </p>
            </div>

            {/* Error Details Section */}
            <div className="bg-[#fcf2eb] rounded-lg p-6 mb-10 text-start">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#584237]">
                  {pfp.reasonLabel}
                </span>
                <span className="text-xs font-bold text-[#ba1a1a] px-2 py-1 bg-[#ba1a1a]/10 rounded">
                  {pfp.errorCodeLabel}: SF-402
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <FaExclamationTriangle className="w-5 h-5 text-[#ba1a1a]" />
                <p className="text-lg font-semibold text-[var(--surface-900,#1f1b17)]">
                  {pfp.insufficientFunds}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-[var(--surface-card-border,#e7e1db)] flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#584237]">{pfp.amountLabel}</span>
                  <span className="font-medium text-[var(--surface-900,#1f1b17)]">
                    1,250.00 SAR
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#584237]">{pfp.referenceLabel}</span>
                  <span className="font-mono text-xs text-[var(--surface-900,#1f1b17)]">
                    #SAN-7821-X902
                  </span>
                </div>
              </div>
            </div>

            {/* Return to Dashboard Link */}
            <div className="mt-8">
              <Link
                href={`/${locale}`}
                className="text-[var(--primary,#f97316)] font-medium text-sm hover:underline inline-flex items-center justify-center gap-2"
              >
                <FaArrowLeft className="w-4 h-4" />
                {pfp.returnDashboard}
              </Link>
            </div>
          </div>

          {/* Security Badges */}
          <div className="mt-8 flex justify-center items-center gap-6 opacity-60">
            <div className="flex items-center gap-2">
              <FaLock className="w-4 h-4 text-[var(--surface-900,#1f1b17)]" />
              <span className="text-[10px] uppercase tracking-wider text-[var(--surface-900,#1f1b17)]">
                {pfp.securePayment}
              </span>
            </div>
            <div className="w-1 h-1 bg-[var(--surface-900,#1f1b17)] rounded-full"></div>
            <div className="flex items-center gap-2">
              <FaShieldAlt className="w-4 h-4 text-[var(--surface-900,#1f1b17)]" />
              <span className="text-[10px] uppercase tracking-wider text-[var(--surface-900,#1f1b17)]">
                {pfp.pciCompliant}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
