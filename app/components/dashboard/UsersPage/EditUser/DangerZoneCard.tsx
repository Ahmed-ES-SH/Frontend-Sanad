"use client";

import { getTranslations } from "@/app/helpers/getTranslations";
import { Locale } from "@/app/types/global";

interface DangerZoneCardProps {
  locale: Locale;
  onDeleteClick: () => void;
}

export default function DangerZoneCard({ locale, onDeleteClick }: DangerZoneCardProps) {
  const t = getTranslations(locale);
  const translations = t.UsersPage.EditUser;

  return (
    <div className="bg-red-50 rounded-xl p-6 border border-red-200">
      <h4 className="text-sm font-semibold text-red-900 mb-2">
        {translations.dangerZone.title}
      </h4>
      <p className="text-xs text-red-700 mb-4">
        {translations.dangerZone.description}
      </p>
      <button
        type="button"
        onClick={onDeleteClick}
        className="w-full px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
      >
        {translations.dangerZone.deleteBtn}
      </button>
    </div>
  );
}