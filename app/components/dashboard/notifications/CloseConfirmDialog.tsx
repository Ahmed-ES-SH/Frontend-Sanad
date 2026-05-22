"use client";

import { motion, AnimatePresence } from "framer-motion";

interface CloseConfirmDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function CloseConfirmDialog({
  isOpen,
  onConfirm,
  onCancel,
}: CloseConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-stone-900/40"
            onClick={onCancel}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full"
          >
            <h3 className="text-lg font-bold text-stone-900 mb-2">
              Discard notification?
            </h3>
            <p className="text-sm text-stone-600 mb-6">
              You have unsaved changes. Are you sure you want to close?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 py-2.5 px-4 rounded-xl font-semibold text-sm bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors"
              >
                Keep editing
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="flex-1 py-2.5 px-4 rounded-xl font-semibold text-sm bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Discard
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
