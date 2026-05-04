"use client";

import { getTranslations } from "@/app/helpers/getTranslations";
import { Locale } from "@/app/types/global";
import { AnimatePresence, motion } from "framer-motion";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  userName: string;
  userEmail: string;
  locale: Locale;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  userName,
  userEmail,
  locale,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  const t = getTranslations(locale);
  const translations = t.UsersPage.EditUser;

  const displayName = userName || userEmail;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-999 p-4"
        >
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-stone-900 mb-2">
              {translations.modals.delete.title}
            </h3>
            <p className="text-sm text-stone-600 mb-6">
              {translations.modals.delete.message.replace(
                "{name}",
                displayName,
              )}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={onClose}
                disabled={isDeleting}
                className="px-4 py-2 text-stone-600 text-sm font-medium hover:text-stone-800 transition-colors disabled:opacity-50"
              >
                {translations.actions.cancel}
              </button>
              <button
                onClick={onConfirm}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
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
                    {translations.actions.deleting}
                  </span>
                ) : (
                  translations.actions.delete
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
