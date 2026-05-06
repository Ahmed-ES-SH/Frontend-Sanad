"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";
import { Project } from "@/app/types/project";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  project: Project | null;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmationModal({
  isOpen,
  project,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteConfirmationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col"
          >
            <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
              <h4 className="font-bold text-red-600 flex items-center gap-2">
                <FiTrash2 size={18} /> Confirm Deletion
              </h4>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-stone-600 text-sm leading-relaxed">
                Are you sure you want to delete the project{" "}
                <strong>{project.title}</strong>? This action cannot be undone and will
                permanently remove the project and its media from the system.
              </p>
            </div>
            <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isDeleting}
                className="px-4 py-2 rounded-lg text-sm font-bold text-stone-600 hover:bg-stone-200 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={isDeleting}
                className="px-4 py-2 rounded-lg text-sm font-bold bg-red-600 text-white hover:bg-red-700 transition-colors shadow-md shadow-red-600/25 flex items-center gap-2 disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete Project"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}