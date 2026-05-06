"use client";

import { motion } from "framer-motion";
import { HiOutlineExclamation } from "react-icons/hi";

interface DeleteConfirmModalProps {
  articleTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
  t: any;
}

export function DeleteConfirmModal({
  articleTitle,
  onConfirm,
  onCancel,
  t,
}: DeleteConfirmModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <HiOutlineExclamation className="text-2xl text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-stone-900">
              {t.deleteConfirmTitle}
            </h3>
            <p className="text-sm text-stone-500">{t.deleteConfirmDesc}</p>
          </div>
        </div>
        <p className="text-stone-600 mb-6">
          {t.deleteConfirmMessage} <strong>{`"${articleTitle}"`}</strong>?{" "}
          {t.deleteConfirmWarning}
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-stone-600 font-medium hover:bg-stone-100 rounded-lg transition-colors"
          >
            {t.cancel}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
          >
            {t.deleteArticle}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}