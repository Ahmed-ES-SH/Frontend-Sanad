"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FiArrowLeft, FiDownload, FiMail, FiCornerUpLeft } from "react-icons/fi";
import Link from "next/link";
import { useParams } from "next/navigation";
import RefundConfirmationModal from "./RefundConfirmationModal";
import CopyToClipboard from "./CopyToClipboard";

interface PaymentDetailsHeaderProps {
  status: "success" | "pending" | "failed" | "refunded";
  transactionId: string;
  processedAt: string;
  amount: number;
  currency: string;
}

const statusStyles = {
  success: "bg-emerald-50 text-emerald-700 border-emerald-100",
  pending: "bg-amber-50 text-amber-700 border-amber-100",
  failed: "bg-red-50 text-red-700 border-red-100",
  refunded: "bg-stone-100 text-stone-700 border-stone-200",
};

const statusDotStyles = {
  success: "bg-emerald-500",
  pending: "bg-amber-500",
  failed: "bg-red-500",
  refunded: "bg-stone-500",
};

const statusLabels: Record<string, string> = {
  success: "Payment successful",
  pending: "Payment pending — processing in progress",
  failed: "Payment failed — transaction was declined",
  refunded: "Payment refunded — funds returned to customer",
};

export default function PaymentDetailsHeader({
  status,
  transactionId,
  processedAt,
  amount,
  currency,
}: PaymentDetailsHeaderProps) {
  const params = useParams();
  const locale = params?.local as string;
  const [showRefundModal, setShowRefundModal] = useState(false);

  const handleRefundConfirm = async (reason: string) => {
    // TODO: Replace with actual API call via TanStack Query mutation
    console.log(`Refund initiated for ${transactionId}: ${reason}`);
  };

  return (
    <>
      <motion.div
        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      >
        <div className="flex items-start gap-5">
          <Link
            href={`/${locale}/dashboard/payments`}
            className="mt-1 p-2 rounded-lg text-stone-500 hover:bg-stone-100 hover:text-stone-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:ring-offset-2"
            aria-label="Back to payments list"
          >
            <FiArrowLeft size={18} />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`px-3 py-1 rounded-full flex items-center gap-2 font-semibold text-xs tracking-wide border ${statusStyles[status]}`}
                role="status"
                aria-label={statusLabels[status]}
              >
                <span
                  className={`w-2 h-2 rounded-full ${statusDotStyles[status]} ${status === "pending" ? "animate-pulse" : ""}`}
                  aria-hidden="true"
                />
                {status.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight text-stone-900">
                #{transactionId}
              </h2>
              <CopyToClipboard text={transactionId} label="Copy transaction ID" />
            </div>
            <p className="text-sm text-stone-500 mt-1">{processedAt}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Primary action: Refund (highest stakes) — warning style */}
          <button
            className="border-2 border-red-200 text-red-700 px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-red-50 hover:border-red-300 transition-all focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:ring-offset-2"
            onClick={() => setShowRefundModal(true)}
            aria-label={`Initiate refund for ${amount} ${currency}`}
          >
            <FiCornerUpLeft size={16} />
            Refund
          </button>
          {/* Secondary action: Send Receipt (common) */}
          <button
            className="bg-stone-100 text-stone-800 px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-stone-200 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:ring-offset-2"
            aria-label="Send receipt to customer email"
          >
            <FiMail size={16} />
            Send Receipt
          </button>
          {/* Tertiary action: Download PDF (occasional) — muted */}
          <button
            className="bg-white text-stone-600 border border-stone-300 px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-stone-50 hover:text-stone-800 hover:border-stone-400 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:ring-offset-2"
            aria-label="Download transaction receipt as PDF"
          >
            <FiDownload size={16} />
            Download PDF
          </button>
        </div>
      </motion.div>

      <RefundConfirmationModal
        isOpen={showRefundModal}
        onClose={() => setShowRefundModal(false)}
        onConfirm={handleRefundConfirm}
        transactionId={transactionId}
        amount={amount}
        currency={currency}
      />
    </>
  );
}
