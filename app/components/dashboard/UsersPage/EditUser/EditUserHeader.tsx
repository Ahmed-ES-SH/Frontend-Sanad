"use client";

import { getTranslations } from "@/app/helpers/getTranslations";
import { Locale } from "@/app/types/global";

interface EditUserHeaderProps {
  locale: Locale;
}

export default function EditUserHeader({ locale }: EditUserHeaderProps) {
  const t = getTranslations(locale);
  const translations = t.UsersPage.EditUser;

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-semibold text-stone-900">
        {translations.pageTitle}
      </h1>
      <p className="text-stone-500 mt-1">{translations.pageSubtitle}</p>
    </div>
  );
}