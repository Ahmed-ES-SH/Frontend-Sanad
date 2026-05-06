"use client";

import { useState } from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";

interface DeactivateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  serviceName: string;
}

export default function DeactivateModal({
  isOpen,
  onClose,
  onConfirm,
  serviceName,
}: DeactivateModalProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsConfirming(true);
    // Simulate API call - in production, this would call the actual deactivation endpoint
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onConfirm();
    setIsConfirming(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-surface-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative surface-card w-full max-w-md p-6 shadow-surface-xl animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-surface-400 hover:text-surface-600 transition-colors"
          aria-label="Close modal"
        >
          <FiX size={20} />
        </button>

        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <FiAlertTriangle className="text-red-600 text-2xl" />
        </div>

        {/* Content */}
        <h3 className="text-lg font-bold text-surface-900 mb-2 font-display">
          Deactivate Service?
        </h3>
        <p className="text-surface-600 mb-6 font-body">
          You are about to deactivate <strong>{serviceName}</strong>. This action will
          immediately affect all {712} active subscribers who will lose access to this
          service.
        </p>

        {/* Warning note */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> You can reactivate this service at any time from the
            archived services section.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 surface-btn-secondary"
            disabled={isConfirming}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isConfirming}
            className="flex-1 px-4 py-2.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isConfirming ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Deactivating...
              </>
            ) : (
              "Deactivate"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}