"use client";

import Image from "next/image";
import { toast } from "sonner";
import { getTranslations } from "@/app/helpers/getTranslations";
import { Locale } from "@/app/types/global";

interface AvatarModalProps {
  isOpen: boolean;
  avatarUrl: string;
  locale: Locale;
  onClose: () => void;
  onSave: (url: string) => void;
  onChange: (url: string) => void;
}

export default function AvatarModal({
  isOpen,
  avatarUrl,
  locale,
  onClose,
  onSave,
  onChange,
}: AvatarModalProps) {
  const t = getTranslations(locale);
  const translations = t.UsersPage.EditUser;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <h3 className="text-lg font-semibold text-stone-900 mb-2">
          {translations.modals.avatar.title}
        </h3>
        <p className="text-sm text-stone-600 mb-4">
          {translations.modals.avatar.description}
        </p>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-stone-700">
              {translations.modals.avatar.urlLabel}
            </label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => onChange(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
              placeholder={translations.modals.avatar.urlPlaceholder}
              autoFocus
            />
            {!avatarUrl.trim() && (
              <p className="text-xs text-red-500">
                {translations.modals.avatar.urlRequired}
              </p>
            )}
          </div>
          {avatarUrl.trim() && (
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-stone-200">
                <Image
                  src={avatarUrl}
                  alt="Avatar preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-3 justify-end mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-stone-600 text-sm font-medium hover:text-stone-800 transition-colors"
          >
            {translations.modals.avatar.cancel}
          </button>
          <button
            type="button"
            onClick={() => {
              if (!avatarUrl.trim()) {
                toast.error(translations.modals.avatar.urlRequired);
                return;
              }
              onSave(avatarUrl);
              toast.success(translations.messages.avatarSuccess);
            }}
            disabled={!avatarUrl.trim()}
            className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {translations.modals.avatar.save}
          </button>
        </div>
      </div>
    </div>
  );
}