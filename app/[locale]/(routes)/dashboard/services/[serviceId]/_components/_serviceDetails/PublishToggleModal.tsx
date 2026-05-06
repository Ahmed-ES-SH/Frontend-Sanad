"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiAlertTriangle, FiX } from "react-icons/fi";

interface PublishToggleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  serviceName: string;
  isPublished: boolean;
}

export default function PublishToggleModal({
  isOpen,
  onClose,
  onConfirm,
  serviceName,
  isPublished,
}: PublishToggleModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden p-8"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-400"
            >
              <FiX size={20} />
            </button>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${isPublished ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                <FiAlertTriangle size={32} />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-stone-900 font-display">
                  {isPublished ? "Unpublish Service?" : "Publish Service?"}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed">
                  Are you sure you want to {isPublished ? "unpublish" : "publish"}{" "}
                  <span className="font-bold text-stone-700">"{serviceName}"</span>? 
                  {isPublished 
                    ? " It will no longer be visible to customers on the public website."
                    : " It will become immediately visible to all visitors."}
                </p>
              </div>

              <div className="flex flex-col w-full gap-3 pt-4">
                <button
                  onClick={onConfirm}
                  className={`w-full py-3 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-95 ${
                    isPublished 
                      ? 'bg-amber-500 shadow-amber-500/20 hover:bg-amber-600' 
                      : 'bg-emerald-500 shadow-emerald-500/20 hover:bg-emerald-600'
                  }`}
                >
                  Yes, {isPublished ? "Unpublish" : "Publish"} Now
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-2xl font-bold text-stone-500 hover:bg-stone-100 transition-all active:scale-95"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
