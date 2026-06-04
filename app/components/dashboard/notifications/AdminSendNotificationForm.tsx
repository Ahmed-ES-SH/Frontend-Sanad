"use client";

import { useState, useCallback } from "react";
import { NOTIFICATION_FORM } from "@/app/constants/notifications";
import { UserSelectionStep } from "./UserSelectionStep";
import { SendNotificationModal } from "./SendNotificationModal";
import type {
  UserMode,
  SelectedUserInfo,
  NotificationType,
} from "@/app/types/notification";

interface NotificationDraft {
  type: NotificationType;
  title: string;
  message: string;
  extraData: string;
  showAdvanced: boolean;
}

const INITIAL_DRAFT: NotificationDraft = {
  type: "SYSTEM",
  title: "",
  message: "",
  extraData: "",
  showAdvanced: false,
};

export function AdminSendNotificationForm() {
  const [userMode, setUserMode] = useState<UserMode>("multiple");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectedUsersInfo, setSelectedUsersInfo] = useState<
    SelectedUserInfo[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [draft, setDraft] = useState<NotificationDraft>(INITIAL_DRAFT);

  const updateDraft = useCallback(
    (patch: Partial<NotificationDraft>) => {
      setDraft((prev) => ({ ...prev, ...patch }));
    },
    [],
  );

  const handleUserModeChange = useCallback((mode: UserMode) => {
    setUserMode(mode);
    setSelectedUsers([]);
    setSelectedUsersInfo([]);
    setValidationError(null);
  }, []);

  const handleSelectionChange = useCallback((ids: number[]) => {
    setSelectedUsers(ids);
    setValidationError(null);
  }, []);

  const handleUsersFetched = useCallback((users: SelectedUserInfo[]) => {
    setSelectedUsersInfo(users);
  }, []);

  const handleContinue = useCallback(() => {
    if (selectedUsers.length === 0) {
      setValidationError("Please select at least one user");
      return;
    }
    setValidationError(null);
    setIsModalOpen(true);
  }, [selectedUsers.length]);

  const handleSelectAndContinue = useCallback(() => {
    setValidationError(null);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleBack = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleSuccess = useCallback(() => {
    setSelectedUsers([]);
    setSelectedUsersInfo([]);
    setUserMode("multiple");
    setDraft(INITIAL_DRAFT);
    setIsModalOpen(false);
  }, []);

  const maxSelections =
    userMode === "multiple"
      ? NOTIFICATION_FORM.MAX_SELECTIONS_MULTIPLE
      : NOTIFICATION_FORM.MAX_SELECTIONS_SINGLE;

  return (
    <div className="space-y-6">
      <UserSelectionStep
        userMode={userMode}
        selectedUsers={selectedUsers}
        maxSelections={maxSelections}
        onUserModeChange={handleUserModeChange}
        onSelectionChange={handleSelectionChange}
        onUsersFetched={handleUsersFetched}
        onContinue={handleContinue}
        onSelectAndContinue={handleSelectAndContinue}
        validationError={validationError}
      />

      <SendNotificationModal
        isOpen={isModalOpen}
        selectedUsers={selectedUsers}
        selectedUsersInfo={selectedUsersInfo}
        draft={draft}
        onDraftChange={updateDraft}
        onClose={handleModalClose}
        onBack={handleBack}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
