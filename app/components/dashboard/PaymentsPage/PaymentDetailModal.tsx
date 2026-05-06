"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  FiRefreshCcw,
} from "react-icons/fi";
import { PAYMENTS_ENDPOINTS } from "@/app/constants/endpoints";
import { toast } from "sonner";
import { refundPayment } from "@/app/actions/paymentsActions";
import { useAppQuery } from "@/app/hooks/useAppQuery";
import { PaymentResponseDto } from "@/app/types/payments";

interface PaymentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentId: string;
  onRefundSuccess: () => void;
}

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(dateString));
};

export default function PaymentDetailModal({
  isOpen,
  onClose,
  paymentId,
  onRefundSuccess,
}: PaymentDetailModalProps) {
  const [isRefunding, setIsRefunding] = useState(false);

  const {
    data: payment,
    isLoading,
    error,
    refetch,
  } = useAppQuery<PaymentResponseDto>({
    queryKey: ["admin-payments", paymentId],
    endpoint: PAYMENTS_ENDPOINTS.ADMIN_GET(paymentId),
    enabled: isOpen && !!paymentId,
  });

  const handleRefund = async () => {
    if (!payment || payment.status !== "succeeded") return;

    try {
      setIsRefunding(true);
      const response = await refundPayment(paymentId);

      if (!response.success) {
        throw new Error(response.message || "Failed to refund payment");
      }

      toast.success(response.message || "Payment refunded successfully");
      onRefundSuccess();
      refetch();
    } catch (err: unknown) {
      toast.error(
        (err as Error)?.message || "Something went wrong during refund.",
      );
    } finally {
      setIsRefunding(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "succeeded":
        return <FiCheckCircle className="w-5 h-5 text-emerald-500" />;
      case "failed":
        return <FiAlertCircle className="w-5 h-5 text-red-500" />;
      case "pending":
        return <FiClock className="w-5 h-5 text-amber-500" />;
      default:
        return <FiClock className="w-5 h-5 text-stone-500" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-4">
              <h3 className="text-lg font-semibold leading-6 text-stone-900">
                Payment Details
              </h3>
              <button
                onClick={onClose}
                className="p-1 rounded-md text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {isLoading ? (
              <div className="py-8 text-center text-stone-500">
                <FiRefreshCcw className="w-6 h-6 animate-spin mx-auto mb-2" />
                Loading payment details...
              </div>
            ) : error ? (
              <div className="py-8 text-center text-red-500">
                <FiAlertCircle className="w-6 h-6 mx-auto mb-2" />
                Failed to load payment details
              </div>
            ) : payment ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-stone-500">
                    Status
                  </span>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(payment.status)}
                    <span className="text-sm font-semibold capitalize text-stone-900">
                      {payment.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-stone-500">
                    Amount
                  </span>
                  <span className="text-lg font-bold text-stone-900">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: payment.currency.toUpperCase(),
                    }).format(payment.amount)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-stone-500">
                    Date
                  </span>
                  <span className="text-sm text-stone-900">
                    {formatDate(payment.createdAt)}
                  </span>
                </div>

                <div className="bg-stone-50 rounded-lg p-4 space-y-3 mt-4 border border-stone-100">
                  <div>
                    <span className="block text-xs font-medium text-stone-500 mb-1">
                      Payment ID
                    </span>
                    <span className="block text-sm font-mono text-stone-900 break-all">
                      {payment.id}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-stone-500 mb-1">
                      Stripe Intent ID
                    </span>
                    <span className="block text-sm font-mono text-stone-900 break-all">
                      {payment.stripePaymentIntentId}
                    </span>
                  </div>
                  {payment.userId && (
                    <div>
                      <span className="block text-xs font-medium text-stone-500 mb-1">
                        User ID
                      </span>
                      <span className="block text-sm font-mono text-stone-900 break-all">
                        {payment.userId}
                      </span>
                    </div>
                  )}
                  {payment.description && (
                    <div>
                      <span className="block text-xs font-medium text-stone-500 mb-1">
                        Description
                      </span>
                      <span className="block text-sm text-stone-900">
                        {payment.description}
                      </span>
                    </div>
                  )}
                </div>

                {payment.status === "succeeded" && (
                  <div className="pt-4 border-t border-stone-100 mt-4">
                    <button
                      onClick={handleRefund}
                      disabled={isRefunding}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors disabled:opacity-50 font-medium"
                    >
                      {isRefunding ? (
                        <>
                          <FiRefreshCcw className="w-4 h-4 animate-spin" />
                          Processing Refund...
                        </>
                      ) : (
                        "Refund Payment"
                      )}
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
