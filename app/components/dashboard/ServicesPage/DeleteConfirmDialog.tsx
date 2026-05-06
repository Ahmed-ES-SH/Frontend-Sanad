"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

interface DeleteConfirmDialogProps {
  serviceTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
  translations: {
    deleteDialog: {
      title: string;
      warning: string;
      message: string;
      confirm: string;
      cancel: string;
    };
  };
}

/**
 * Delete Confirmation Dialog Component
 * Modal for confirming service deletion
 */
export function DeleteConfirmDialog({
  serviceTitle,
  onConfirm,
  onCancel,
  isOpen,
  translations,
}: DeleteConfirmDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const t = translations.deleteDialog;

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
    } finally {
      setIsLoading(false);
    }
  };

  const message = t.message.replace("{{title}}", serviceTitle);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onCancel}
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with icon */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <FaExclamationTriangle className="text-red-600 text-xl" />
              </div>
              <div>
                <h3
                  id="delete-dialog-title"
                  className="text-lg font-bold text-stone-900"
                >
                  {t.title}
                </h3>
                <p className="text-sm text-stone-500">
                  {t.warning}
                </p>
              </div>
            </div>

            {/* Message */}
            <p className="text-stone-600 mb-6">
              {message}
            </p>

            {/* Actions */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={onCancel}
                disabled={isLoading}
                className="px-4 py-2 text-stone-600 font-medium hover:bg-stone-100 rounded-lg transition-colors disabled:opacity-50"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleConfirm}
                disabled={isLoading}
                className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading && (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                {t.confirm}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DeleteConfirmDialog;