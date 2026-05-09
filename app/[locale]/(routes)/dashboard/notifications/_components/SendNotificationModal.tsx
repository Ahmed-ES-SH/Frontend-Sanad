"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSend,
  FiX,
  FiArrowLeft,
  FiBell,
  FiAlertCircle,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { SEND_NOTIFICATION_TYPES } from "@/app/constants/notifications";
import { useSendNotification } from "../hooks/useSendNotification";
import { useElapsedTimer } from "../hooks/useElapsedTimer";
import { ResultBanner } from "./ResultBanner";
import { UserSummaryBar } from "./UserSummaryBar";
import { CloseConfirmDialog } from "./CloseConfirmDialog";
import type {
  NotificationType,
  SelectedUserInfo,
} from "@/app/types/notification";

interface NotificationDraft {
  type: NotificationType;
  title: string;
  message: string;
  extraData: string;
  showAdvanced: boolean;
}

interface SendNotificationModalProps {
  isOpen: boolean;
  selectedUsers: number[];
  selectedUsersInfo: SelectedUserInfo[];
  draft: NotificationDraft;
  onDraftChange: (patch: Partial<NotificationDraft>) => void;
  onClose: () => void;
  onBack: () => void;
  onSuccess: () => void;
}

export function SendNotificationModal({
  isOpen,
  selectedUsers,
  selectedUsersInfo,
  draft,
  onDraftChange,
  onClose,
  onBack,
  onSuccess,
}: SendNotificationModalProps) {
  const [pendingClose, setPendingClose] = useState(false);
  const [jsonError, setJsonError] = useState<string | null>(null);

  const { isSubmitting, result, submit, clearResult } = useSendNotification();
  const { elapsed, start: startTimer, stop: stopTimer } = useElapsedTimer();

  const clearAllErrors = useCallback(() => {
    clearResult();
    setJsonError(null);
  }, [clearResult]);

  const handleClose = () => {
    if (draft.title || draft.message) {
      setPendingClose(true);
    } else {
      onClose();
    }
  };

  const confirmClose = () => {
    setPendingClose(false);
    onClose();
  };

  const cancelClose = () => {
    setPendingClose(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAllErrors();

    if (selectedUsers.length === 0) {
      return;
    }

    let parsedData: Record<string, unknown> | undefined;
    if (draft.extraData.trim()) {
      try {
        parsedData = JSON.parse(draft.extraData.trim());
      } catch {
        setJsonError(
          "Advanced data must be valid JSON. Check your formatting and try again.",
        );
        return;
      }
    }

    setJsonError(null);
    startTimer();

    const response = await submit({
      userIds: selectedUsers,
      type: draft.type,
      title: draft.title,
      message: draft.message,
      data: parsedData,
    });

    stopTimer();

    if (response.success) {
      onSuccess();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header with User Summary */}
            <div className="bg-linear-to-r from-primary/5 to-accent-amber/5 px-6 py-4 border-b border-stone-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-accent-amber flex items-center justify-center">
                    <FiSend className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-stone-900">
                      Send Notification
                    </h2>
                    <p className="text-xs text-stone-500">Step 2 of 2</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-2 rounded-lg hover:bg-stone-100 transition-colors"
                >
                  <FiX className="w-5 h-5 text-stone-400" />
                </button>
              </div>

              <div className="mt-4 p-3 bg-white/60 rounded-xl border border-stone-200/50">
                <UserSummaryBar
                  users={selectedUsersInfo}
                  totalSelected={selectedUsers.length}
                />
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Type Selection */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  <FiBell className="w-4 h-4 inline mr-1" />
                  Notification Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SEND_NOTIFICATION_TYPES.map((nt) => (
                    <button
                      key={nt.value}
                      type="button"
                      onClick={() => {
                        onDraftChange({ type: nt.value });
                        clearAllErrors();
                      }}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 ${
                        draft.type === nt.value
                          ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                          : "bg-white text-stone-600 border-stone-200 hover:border-stone-300 hover:bg-stone-50"
                      }`}
                    >
                      <span>{nt.icon}</span>
                      {nt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={draft.title}
                  onChange={(e) => {
                    onDraftChange({ title: e.target.value });
                    clearAllErrors();
                  }}
                  placeholder="Enter notification title"
                  maxLength={255}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-stone-400"
                  required
                />
                <p className="text-xs text-stone-400 mt-1 text-right">
                  {draft.title.length}/255
                </p>
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={draft.message}
                  onChange={(e) => {
                    onDraftChange({ message: e.target.value });
                    clearAllErrors();
                  }}
                  placeholder="Enter notification message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-stone-400 resize-y min-h-[80px]"
                  required
                />
              </div>

              {/* Advanced: Extra Data (collapsed) */}
              <div>
                <button
                  type="button"
                  onClick={() =>
                    onDraftChange({ showAdvanced: !draft.showAdvanced })
                  }
                  className="flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-stone-700 transition-colors"
                >
                  {draft.showAdvanced ? (
                    <FiChevronUp className="w-4 h-4" />
                  ) : (
                    <FiChevronDown className="w-4 h-4" />
                  )}
                  {draft.showAdvanced ? "Hide" : "Show"} advanced data (JSON)
                </button>
                <AnimatePresence>
                  {draft.showAdvanced && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <textarea
                        value={draft.extraData}
                        onChange={(e) => {
                          onDraftChange({ extraData: e.target.value });
                          clearAllErrors();
                        }}
                        placeholder='{"key": "value"}'
                        rows={2}
                        className="mt-2 w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-stone-400 resize-y"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* JSON parse error */}
              {jsonError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 p-3 rounded-xl border bg-red-50 text-red-800 border-red-200"
                >
                  <FiAlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold">{jsonError}</p>
                  </div>
                </motion.div>
              )}

              {/* Result Banner */}
              {result && <ResultBanner result={result} />}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onBack}
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm bg-stone-100 text-stone-600 hover:bg-stone-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-2 bg-linear-to-r from-primary to-accent-amber text-white py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-primary/20 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>
                        Sending{elapsed > 0 && ` (${elapsed}s)`}
                        {elapsed > 5 && "..."}
                      </span>
                    </>
                  ) : (
                    <>
                      <FiSend className="w-4 h-4" />
                      Send to {selectedUsers.length} user
                      {selectedUsers.length !== 1 ? "s" : ""}
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Close confirmation dialog */}
          <CloseConfirmDialog
            isOpen={pendingClose}
            onConfirm={confirmClose}
            onCancel={cancelClose}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
