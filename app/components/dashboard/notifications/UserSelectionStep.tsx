"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { FiUser, FiUsers, FiArrowRight, FiAlertCircle } from "react-icons/fi";
import { UserSelectionTable } from "./UserSelectionTable";
import type { UserMode, SelectedUserInfo } from "@/app/types/notification";

interface UserSelectionStepProps {
  userMode: UserMode;
  selectedUsers: number[];
  maxSelections: number;
  onUserModeChange: (mode: UserMode) => void;
  onSelectionChange: (ids: number[]) => void;
  onUsersFetched: (users: SelectedUserInfo[]) => void;
  onContinue: () => void;
  onSelectAndContinue?: (userId: number) => void;
  validationError: string | null;
}

export function UserSelectionStep({
  userMode,
  selectedUsers,
  maxSelections,
  onUserModeChange,
  onSelectionChange,
  onUsersFetched,
  onContinue,
  onSelectAndContinue,
  validationError,
}: UserSelectionStepProps) {
  const hasSelection = selectedUsers.length > 0;

  const continueButton = useMemo(
    () => (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button
          type="button"
          onClick={onContinue}
          className="w-full bg-linear-to-r from-primary to-accent-amber text-white py-4 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-primary/20 transition-all duration-200 active:scale-95"
        >
          Continue to Notification
          <FiArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    ),
    [onContinue],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
          <FiUser className="w-5 h-5 text-primary" />
          Select Recipients
        </h3>
        <span className="text-xs font-medium text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
          Step 1 of 2
        </span>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          type="button"
          onClick={() => {
            onUserModeChange("single");
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
            userMode === "single"
              ? "bg-linear-to-r from-primary to-accent-amber text-white shadow-lg shadow-primary/20"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
          }`}
        >
          <FiUser className="w-5 h-5" />
          Single User
        </button>
        <button
          type="button"
          onClick={() => {
            onUserModeChange("multiple");
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
            userMode === "multiple"
              ? "bg-linear-to-r from-primary to-accent-amber text-white shadow-lg shadow-primary/20"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
          }`}
        >
          <FiUsers className="w-5 h-5" />
          Multiple Users
        </button>
      </div>

      {/* Continue button (top, multi-select only) */}
      {userMode === "multiple" && hasSelection && continueButton}

      <UserSelectionTable
        selectedUsers={selectedUsers}
        onSelectionChange={onSelectionChange}
        onUsersFetched={onUsersFetched}
        onSelectAndContinue={
          userMode === "single" ? onSelectAndContinue : undefined
        }
        mode={userMode}
        maxSelections={maxSelections}
      />

      {/* Continue button (bottom, multi-select only) */}
      {userMode === "multiple" && hasSelection && (
        <div className="mt-6">{continueButton}</div>
      )}

      {/* Validation error */}
      {validationError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 rounded-xl bg-red-50 text-red-800 border border-red-200 mt-4"
        >
          <FiAlertCircle className="w-5 h-5 shrink-0" />
          <span className="font-medium">{validationError}</span>
        </motion.div>
      )}
    </motion.div>
  );
}
