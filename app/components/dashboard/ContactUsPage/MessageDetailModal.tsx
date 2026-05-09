"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import {
  FiX,
  FiUser,
  FiMail,
  FiFileText,
  FiMessageSquare,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiGlobe,
} from "react-icons/fi";
import { ContactMessage } from "@/app/types/contact";
import { useLocale, LocaleType } from "@/app/hooks/useLocale";
import InfoItem from "./InfoItem";

interface MessageDetailModalProps {
  message: ContactMessage | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MessageDetailModal({
  message,
  isOpen,
  onClose,
}: MessageDetailModalProps) {
  const locale = useLocale() as LocaleType;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString(
      locale === "ar" ? "ar-SA" : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      },
    );
  };

  const content = (
    <AnimatePresence>
      {isOpen && message && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl pointer-events-auto overflow-hidden flex flex-col border border-stone-200"
            >
              <div className="flex items-center justify-between p-6 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary  flex items-center justify-center shadow-lg shadow-indigo-500/25">
                    <FiMessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-stone-900">
                      Message Details
                    </h2>
                    <p className="text-xs text-stone-400 font-medium">
                      ID: {message.id.slice(0, 8)}...
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
                >
                  <FiX className="w-5 h-5 text-stone-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem
                    icon={FiUser}
                    label="Full Name"
                    value={message.fullName}
                  />
                  <InfoItem icon={FiMail} label="Email" value={message.email} />
                </div>

                <InfoItem
                  icon={FiFileText}
                  label="Subject"
                  value={message.subject}
                />

                <div className="py-4 px-5 bg-linear-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100/50">
                  <p className="text-xs text-indigo-400 font-medium mb-2">
                    Message
                  </p>
                  <p className="text-sm leading-relaxed text-stone-700 whitespace-pre-wrap">
                    {message.message}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                  <InfoItem
                    icon={FiCheckCircle}
                    label="Is Read"
                    value={message.isRead}
                  />
                  <InfoItem
                    icon={FiAlertCircle}
                    label="Replied"
                    value={!!message.repliedAt}
                  />
                  <InfoItem
                    icon={FiClock}
                    label="Created"
                    value={formatDate(message.createdAt)}
                  />
                  <InfoItem
                    icon={FiClock}
                    label="Updated"
                    value={formatDate(message.updatedAt)}
                  />
                </div>

                {message.ipAddress && (
                  <InfoItem
                    icon={FiGlobe}
                    label="IP Address"
                    value={message.ipAddress}
                  />
                )}

                {message.repliedAt && (
                  <div className="py-3 px-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <p className="text-xs text-emerald-400 font-medium mb-1">
                      Replied At
                    </p>
                    <p className="text-sm font-semibold text-emerald-700">
                      {formatDate(message.repliedAt)}
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-stone-100 bg-stone-50/50">
                <button
                  onClick={onClose}
                  className="w-full py-3 px-6 bg-surface-900 hover:bg-surface-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  if (typeof window === "undefined") return null;

  return createPortal(content, document.body);
}
