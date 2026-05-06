"use client";

import { User } from "@/app/types/user";
import { getTranslations } from "@/app/helpers/getTranslations";
import { Locale } from "@/app/types/global";
import { formatDate } from "@/app/helpers/_dashboard/dateHelpers";

interface UserInfoSidebarProps {
  user: User;
  locale: Locale;
}

export default function UserInfoSidebar({ user, locale }: UserInfoSidebarProps) {
  const t = getTranslations(locale);
  const translations = t.UsersPage.EditUser;

  return (
    <div className="bg-white rounded-xl p-6 border border-stone-200/50">
      <h4 className="text-sm font-semibold text-stone-900 mb-4">
        {translations.sidebar.userInfo}
      </h4>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-stone-500">{translations.sidebar.userId}</span>
          <span className="font-medium text-stone-900">#{user.id}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-stone-500">{translations.sidebar.created}</span>
          <span className="font-medium text-stone-900">
            {formatDate(user.createdAt)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-stone-500">{translations.sidebar.updated}</span>
          <span className="font-medium text-stone-900">
            {formatDate(user.updatedAt)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-stone-500">{translations.sidebar.googleId}</span>
          <span className="font-medium text-stone-900">
            {user.googleId ? translations.sidebar.googleLinked : translations.sidebar.googleNone}
          </span>
        </div>
      </div>
    </div>
  );
}