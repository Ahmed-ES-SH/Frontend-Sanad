/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TransactionDetails {
  id: string;
  date: string;
  time: string;
  paymentMethod: string;
  cardLast4: string;
  amount: string;
  currency: string;
}

// Default transaction data (fallback when no route params)
const defaultTransaction: TransactionDetails = {
  id: "#SN-92847105-TX",
  date: "Oct 24, 2024",
  time: "14:32",
  paymentMethod: "Visa",
  cardLast4: "4242",
  amount: "2,450.00",
  currency: "SAR",
};

function SuccessContent({ transaction }: { transaction: TransactionDetails }) {
  const router = useRouter();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [showParticles, setShowParticles] = useState(false);

  // Detect reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleDownloadReceipt = useCallback(async () => {
    setIsDownloading(true);
    setDownloadError(null);
    try {
      // In production: call API to generate PDF receipt
      // const response = await fetch(`/api/receipts/${transaction.id}`);
      // const blob = await response.blob();
      // const url = URL.createObjectURL(blob);
      // const a = document.createElement("a");
      // a.href = url;
      // a.download = `receipt-${transaction.id}.pdf`;
      // a.click();
      // URL.revokeObjectURL(url);

      // Placeholder: simulate download delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log("Receipt download initiated for:", transaction.id);
    } catch {
      setDownloadError("Failed to download receipt. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  }, [transaction.id]);

  const handleReturnToDashboard = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  const handleContactSupport = useCallback(() => {
    router.push("/contact");
  }, [router]);

  // Keyboard navigation for power users
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case "d":
          if (!e.metaKey && !e.ctrlKey) {
            handleDownloadReceipt();
          }
          break;
        case "escape":
          handleReturnToDashboard();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleDownloadReceipt, handleReturnToDashboard]);

  // Copy transaction ID to clipboard
  const handleCopyTransactionId = useCallback(() => {
    navigator.clipboard.writeText(transaction.id).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = transaction.id;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    });
  }, [transaction.id]);

  // Animation refs
  useEffect(() => {
    if (prefersReducedMotion) {
      setShowParticles(true);
      return;
    }
    // Trigger particle burst after icon mounts
    const timer = setTimeout(() => setShowParticles(true), 200);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  // Animation helpers respecting reduced motion
  const fadeUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0 },
    transition: {
      duration: prefersReducedMotion ? 0.01 : 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  };

  const staggerTransition = (delay: number) => ({
    duration: prefersReducedMotion ? 0.01 : 0.4,
    ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
    delay: prefersReducedMotion ? 0 : delay,
  });

  const staggerItem = (delay: number) => ({
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
    visible: { opacity: 1, y: 0 },
  });

  return (
    <div
      className="min-h-screen page-bg flex flex-col"
      style={{ background: "var(--surface-50)" }}
    >
      {/* Top Navigation Bar — Solid surface, no blur */}
      <nav
        className="fixed top-0 w-full z-50 border-b"
        style={{
          background: "var(--surface-card-bg)",
          borderColor: "var(--surface-card-border)",
        }}
      >
        <div className="flex justify-between items-center h-16 px-6 md:px-12 w-full max-w-screen-2xl mx-auto">
          <motion.div
            initial={{
              opacity: prefersReducedMotion ? 1 : 0,
              x: prefersReducedMotion ? 0 : -20,
            }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.4,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="text-xl font-bold tracking-tighter cursor-pointer"
            style={{ color: "var(--primary)" }}
            onClick={() => router.push("/")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                router.push("/");
              }
            }}
            aria-label="Go to homepage"
          >
            Sanad
          </motion.div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-2 transition-colors duration-200 rounded-full"
              style={{ color: "var(--surface-500)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--surface-100)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
              onClick={handleContactSupport}
              aria-label="Contact support"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 pt-24 pb-12">
        <div className="w-full max-w-lg">
          {/* Success Card — uses .surface-card + .shadow-surface-md */}
          <motion.div
            className="surface-card shadow-surface-md p-8 md:p-10 text-center"
            initial={fadeUp.hidden}
            animate={fadeUp.visible}
            transition={fadeUp.transition}
          >
            {/* Success Icon — animated checkmark with particle burst */}
            <div className="mb-6 inline-flex">
              <motion.div
                className="relative w-16 h-16 text-white rounded-full flex items-center justify-center"
                style={{
                  background: "var(--gradient-primary)",
                  boxShadow: "var(--shadow-button)",
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 18,
                  delay: 0.1,
                }}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.2 }}
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </motion.svg>
              </motion.div>

              {/* Subtle particle burst */}
              <AnimatePresence>
                {showParticles && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full"
                        style={{
                          background:
                            i % 2 === 0
                              ? "var(--primary)"
                              : "var(--accent-amber)",
                          left: "50%",
                          top: "50%",
                        }}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                        animate={{
                          x: Math.cos((i * Math.PI) / 3) * 48,
                          y: Math.sin((i * Math.PI) / 3) * 48,
                          opacity: 0,
                          scale: 1,
                        }}
                        transition={{
                          duration: 0.6,
                          ease: [0.25, 1, 0.5, 1],
                          delay: 0.2 + i * 0.03,
                        }}
                      />
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Title & Header — staggered reveal */}
            <motion.div
              className="mb-8"
              initial={staggerItem(0.35).hidden}
              animate={staggerItem(0.35).visible}
              transition={staggerTransition(0.35)}
            >
              <h1
                className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2"
                style={{ color: "var(--surface-900)" }}
              >
                Payment Successful
              </h1>
              <p
                className="text-sm max-w-sm mx-auto"
                style={{ color: "var(--surface-500)" }}
              >
                Your transaction has been processed securely. A confirmation
                email has been sent to your inbox.
              </p>
            </motion.div>

            {/* Transaction Details Grid — staggered reveal */}
            <motion.div
              className="rounded-xl border overflow-hidden mb-8"
              style={{ borderColor: "var(--surface-card-border)" }}
              initial={staggerItem(0.5).hidden}
              animate={staggerItem(0.5).visible}
              transition={staggerTransition(0.5)}
            >
              {/* Transaction ID — clickable to copy */}
              <div
                className="p-4 flex flex-col items-start cursor-pointer group"
                style={{
                  background: "var(--surface-50)",
                  borderBottom: `1px solid var(--surface-card-border)`,
                }}
                onClick={handleCopyTransactionId}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleCopyTransactionId();
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Copy transaction ID: ${transaction.id}`}
                title="Click to copy"
              >
                <span
                  className="caption uppercase tracking-wider mb-1"
                  style={{ color: "var(--surface-500)" }}
                >
                  Transaction ID
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className="body-sm font-semibold"
                    style={{ color: "var(--surface-900)" }}
                  >
                    {transaction.id}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5 opacity-0 group-hover:opacity-60 transition-opacity"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    style={{ color: "var(--surface-500)" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Date & Time */}
              <div
                className="p-4 flex flex-col items-start"
                style={{
                  background: "var(--surface-card-bg)",
                  borderBottom: `1px solid var(--surface-card-border)`,
                }}
              >
                <span
                  className="caption uppercase tracking-wider mb-1"
                  style={{ color: "var(--surface-500)" }}
                >
                  Date & Time
                </span>
                <span
                  className="body-sm font-semibold"
                  style={{ color: "var(--surface-900)" }}
                >
                  {transaction.date} at {transaction.time}
                </span>
              </div>

              {/* Payment Method */}
              <div
                className="p-4 flex flex-col items-start"
                style={{
                  background: "var(--surface-50)",
                  borderBottom: `1px solid var(--surface-card-border)`,
                }}
              >
                <span
                  className="caption uppercase tracking-wider mb-1"
                  style={{ color: "var(--surface-500)" }}
                >
                  Payment Method
                </span>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    style={{ color: "var(--surface-400)" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  <span
                    className="body-sm font-semibold"
                    style={{ color: "var(--surface-900)" }}
                  >
                    {transaction.paymentMethod} ending in{" "}
                    {transaction.cardLast4}
                  </span>
                </div>
              </div>

              {/* Amount Paid */}
              <div className="p-4 flex flex-col items-start">
                <span
                  className="caption uppercase tracking-wider mb-1"
                  style={{ color: "var(--surface-500)" }}
                >
                  Amount Paid
                </span>
                <span
                  className="text-lg font-bold"
                  style={{ color: "var(--primary)" }}
                >
                  {transaction.currency} {transaction.amount}
                </span>
              </div>
            </motion.div>

            {/* Download Error State */}
            {downloadError && (
              <div
                className="mb-6 p-3 rounded-lg text-sm flex items-center gap-2"
                style={{
                  background: "rgba(239, 68, 68, 0.08)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                  color: "var(--accent-rose)",
                }}
                role="alert"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{downloadError}</span>
                <button
                  type="button"
                  className="ml-auto underline hover:opacity-80"
                  onClick={() => setDownloadError(null)}
                  aria-label="Dismiss error"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Action Buttons — uses .surface-btn-primary & .surface-btn-secondary */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                className="surface-btn-primary w-full sm:w-auto"
                onClick={handleDownloadReceipt}
                disabled={isDownloading}
                data-action="download-receipt"
                aria-busy={isDownloading}
              >
                {isDownloading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    <span>Preparing...</span>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <span>Download Receipt</span>
                  </>
                )}
              </button>
              <button
                type="button"
                className="surface-btn-secondary w-full sm:w-auto"
                data-action="return-dashboard"
                onClick={handleReturnToDashboard}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                <span>Return to Dashboard</span>
              </button>
            </div>

            {/* Keyboard shortcuts hint — for power users */}
            <motion.div
              className="mt-6 pt-4 border-t text-xs"
              style={{
                borderColor: "var(--surface-200)",
                color: "var(--surface-400)",
              }}
              initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 0.3,
                delay: prefersReducedMotion ? 0 : 0.7,
              }}
            >
              <span className="hidden md:inline">
                Press{" "}
                <kbd
                  className="px-1.5 py-0.5 rounded font-mono text-[10px]"
                  style={{
                    background: "var(--surface-100)",
                    border: "1px solid var(--surface-200)",
                  }}
                >
                  D
                </kbd>{" "}
                to download receipt ·{" "}
                <kbd
                  className="px-1.5 py-0.5 rounded font-mono text-[10px]"
                  style={{
                    background: "var(--surface-100)",
                    border: "1px solid var(--surface-200)",
                  }}
                >
                  Esc
                </kbd>{" "}
                to return to dashboard
              </span>
            </motion.div>
          </motion.div>

          {/* Contextual Help */}
          <motion.p
            className="mt-6 text-center text-sm font-medium"
            style={{ color: "var(--surface-500)" }}
            initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.3,
              delay: prefersReducedMotion ? 0 : 0.8,
            }}
          >
            Need help with this transaction?{" "}
            <button
              type="button"
              className="hover:underline font-bold transition-colors bg-transparent border-none cursor-pointer p-0"
              style={{ color: "var(--primary)" }}
              onClick={handleContactSupport}
            >
              Contact Sanad Support
            </button>
          </motion.p>
        </div>
      </main>

      {/* Footer — simplified, solid surface */}
      <motion.footer
        className="w-full border-t"
        style={{
          borderTopColor: "var(--surface-card-border)",
          background: "var(--surface-100)",
        }}
        initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: prefersReducedMotion ? 0.01 : 0.3,
          delay: prefersReducedMotion ? 0 : 0.9,
        }}
      >
        <div className="flex justify-center items-center py-6 px-6">
          <span
            className="caption uppercase"
            style={{ color: "var(--surface-400)" }}
          >
            © 2024 Sanad. All rights reserved.
          </span>
        </div>
      </motion.footer>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--surface-50)" }}
    >
      <div className="surface-card shadow-surface-md p-8 md:p-10 text-center max-w-md w-full">
        <div className="mb-6 inline-flex">
          <div
            className="relative w-16 h-16 text-white rounded-full flex items-center justify-center"
            style={{ background: "var(--accent-rose)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: "var(--surface-900)" }}
        >
          Payment Verification Failed
        </h1>
        <p className="text-sm mb-8" style={{ color: "var(--surface-500)" }}>
          We couldn&apos;t verify your payment status. This could be a temporary
          connection issue. Please try again or contact support.
        </p>
        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="surface-btn-primary w-full"
            onClick={onRetry}
          >
            Try Again
          </button>
          <button
            type="button"
            className="surface-btn-secondary w-full"
            onClick={() => (window.location.href = "/support")}
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  // In production, use searchParams to fetch real transaction data:
  // const transactionId = searchParams?.get("transactionId");
  void searchParams;

  // In production, fetch real transaction data from API using transactionId
  const transaction: TransactionDetails = defaultTransaction;

  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen page-bg flex items-center justify-center px-4"
          style={{ background: "var(--surface-50)" }}
        >
          <div className="surface-card shadow-surface-md p-8 text-center">
            <div
              className="w-12 h-12 rounded-full mx-auto mb-4 animate-pulse"
              style={{ background: "var(--primary-100)" }}
            />
            <p style={{ color: "var(--surface-500)" }}>
              Loading transaction details...
            </p>
          </div>
        </div>
      }
    >
      <SuccessContent transaction={transaction} />
    </Suspense>
  );
}
