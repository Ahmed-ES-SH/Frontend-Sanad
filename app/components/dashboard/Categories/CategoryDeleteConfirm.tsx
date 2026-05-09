"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { deleteCategory } from "@/app/actions/categoriesActions";
import { createPortal } from "react-dom";
import { FiAlertTriangle, FiLoader } from "react-icons/fi";

interface CategoryDeleteConfirmProps {
  categoryId: string | null;
  categoryName: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CategoryDeleteConfirm({ categoryId, categoryName, isOpen, onClose, onSuccess }: CategoryDeleteConfirmProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!categoryId) return;
    
    setLoading(true);
    setError("");
    
    try {
      const res = await deleteCategory(categoryId);
      if (res.success) {
        onSuccess();
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError((err as Error)?.message || "Failed to delete category");
    } finally {
      setLoading(false);
    }
  };


  const content = (<AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-99 bg-surface-900/50 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-999 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              className="w-full max-w-sm surface-card rounded-2xl shadow-surface-xl pointer-events-auto overflow-hidden p-6"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4 mx-auto">
                <FiAlertTriangle className="w-6 h-6" />
              </div>
              
              <h3 className="text-xl font-bold text-surface-900 text-center mb-2">Delete Category?</h3>
              <p className="text-center text-surface-500 mb-6">
                Are you sure you want to delete <span className="font-semibold text-surface-700">{categoryName}</span>? This action cannot be undone.
              </p>

              {error && (
                <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg text-center">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 py-2.5 px-4 text-surface-700 font-medium rounded-lg hover:bg-surface-100 transition-colors border border-surface-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading && (
                    <FiLoader className="animate-spin w-4 h-4 text-white" />
                  )}
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>)


if (typeof window === "undefined") return null ;

  return (
    createPortal(content, document.body)
  );
}
