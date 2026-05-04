"use client";

import { useState } from "react";
import { User } from "@/app/types/user";
import { Locale } from "@/app/types/global";
import { getTranslations } from "@/app/helpers/getTranslations";
import { useEditUserForm } from "@/app/hooks/useEditUserForm";

// Child Components
import EditUserHeader from "./EditUserHeader";
import BasicInfoCard from "./BasicInfoCard";
import SecurityRoleCard from "./SecurityRoleCard";
import UserInfoSidebar from "./UserInfoSidebar";
import DangerZoneCard from "./DangerZoneCard";
import AvatarModal from "./AvatarModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { BiLoader } from "react-icons/bi";

interface EditUserClientProps {
  user: User;
  locale: Locale;
}

export default function EditUserClient({ user, locale }: EditUserClientProps) {
  const t = getTranslations(locale);
  const translations = t.UsersPage.EditUser;

  const {
    formData,
    isSubmitting,
    isDeleting,
    handleChange,
    handleRoleChange,
    handleUpdate,
    handleDelete,
    updateAvatar,
  } = useEditUserForm({ user, locale });

  // Modal states
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState(formData.avatar || "");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Handle password change separately (different signature)
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange("password")(e);
  };

  // Save avatar from modal
  const handleAvatarSave = (url: string) => {
    updateAvatar(url);
    setShowAvatarModal(false);
    setNewAvatarUrl(url);
  };

  // Reset avatar URL on modal close
  const handleAvatarClose = () => {
    setShowAvatarModal(false);
    setNewAvatarUrl(formData.avatar || "");
  };

  return (
    <div className="overflow-hidden w-full h-full">
      {/* Page Header */}
      <EditUserHeader locale={locale} />

      <form onSubmit={handleUpdate}>
        <div className="grid grid-cols-12 gap-8">
          {/* Main Form Column */}
          <div className="col-span-12 xl:col-span-8 space-y-6">
            <BasicInfoCard
              user={user}
              formData={formData}
              locale={locale}
              onChange={handleChange}
              onAvatarClick={() => setShowAvatarModal(true)}
            />

            <SecurityRoleCard
              formData={formData}
              locale={locale}
              onPasswordChange={handlePasswordChange}
              onRoleChange={handleRoleChange}
            />
          </div>

          {/* Sidebar */}
          <div className="col-span-12 xl:col-span-4 space-y-6 ">
            <UserInfoSidebar user={user} locale={locale} />
            <DangerZoneCard
              locale={locale}
              onDeleteClick={() => setShowDeleteConfirm(true)}
            />

            {/* Footer Actions */}
            <div className="mt-10 py-3 w-full  border-t border-stone-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-6 py-2.5 text-stone-500 text-sm font-medium hover:text-stone-800 transition-colors"
              >
                {translations.actions.cancel}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-10 py-2.5 bg-orange-600 text-white text-sm font-medium rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <BiLoader className="animate-spin w-4 h-4" />
                    {translations.actions.saving}
                  </span>
                ) : (
                  translations.actions.save
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Avatar Modal */}
      {showAvatarModal && (
        <AvatarModal
          isOpen={showAvatarModal}
          avatarUrl={newAvatarUrl}
          locale={locale}
          onClose={handleAvatarClose}
          onSave={handleAvatarSave}
          onChange={setNewAvatarUrl}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteConfirm}
        userName={user.name || ""}
        userEmail={user.email}
        locale={locale}
        isDeleting={isDeleting}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
