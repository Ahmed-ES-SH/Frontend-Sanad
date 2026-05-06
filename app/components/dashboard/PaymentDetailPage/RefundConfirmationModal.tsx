"use client";

import { useState, useEffect, useRef } from "react";
import { FiX, FiAlertTriangle } from "react-icons/fi";

interface RefundConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  transactionId: string;
  amount: number;
  currency: string;
}

export default function RefundConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  transactionId,
  amount,
  currency,
}: RefundConfirmationModalProps) {
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstInputRef = useRef<HTMLTextAreaElement>(null);

  const formattedAmount = amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  useEffect(() => {
    if (isOpen) {
      setReason("");
      setIsSubmitting(false);
      // Focus the textarea when modal opens
      setTimeout(() => firstInputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, isSubmitting, onClose]);

  const handleSubmit = async () => {
    if (!reason.trim()) return;
    setIsSubmitting(true);
    await onConfirm(reason.trim());
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="refund-modal-title"
      aria-describedby="refund-modal-description"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
        onClick={!isSubmitting ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Warning Header */}
        <div className="bg-amber-50 px-6 py-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
            <FiAlertTriangle className="text-amber-600" size={20} />
          </div>
          <div>
            <h2
              id="refund-modal-title"
              className="text-lg font-bold text-stone-900"
            >
              Confirm Refund
            </h2>
            <p
              id="refund-modal-description"
              className="text-sm text-stone-600 mt-1"
            >
              This action will return funds to the customer. It cannot be
              undone.
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="px-6 py-4 border-b border-stone-200">
          <div className="flex justify-between items-center text-sm">
            <span className="text-stone-500">Transaction</span>
            <span className="font-semibold text-stone-900">
              #{transactionId}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm mt-2">
            <span className="text-stone-500">Refund Amount</span>
            <span className="font-bold text-stone-900 text-lg">
              {formattedAmount} {currency}
            </span>
          </div>
        </div>

        {/* Reason Field */}
        <div className="px-6 py-4">
          <label
            htmlFor="refund-reason"
            className="block text-sm font-semibold text-stone-700 mb-2"
          >
            Reason for refund <span className="text-red-500">*</span>
          </label>
          <textarea
            ref={firstInputRef}
            id="refund-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g., Duplicate charge, customer request, service issue..."
            className="w-full px-3 py-2.5 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 resize-none placeholder:text-stone-400"
            rows={3}
            disabled={isSubmitting}
            aria-required="true"
          />
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-stone-50 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2.5 text-sm font-semibold text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!reason.trim() || isSubmitting}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:ring-offset-2 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
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
                Processing...
              </>
            ) : (
              "Confirm Refund"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
