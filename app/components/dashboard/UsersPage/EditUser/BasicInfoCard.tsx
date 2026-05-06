"use client";

import Image from "next/image";
import { User, UserUpdateFormData } from "@/app/types/user";
import { getTranslations } from "@/app/helpers/getTranslations";
import { Locale } from "@/app/types/global";

interface BasicInfoCardProps {
  user: User;
  formData: UserUpdateFormData;
  locale: Locale;
  onChange: (
    field: keyof UserUpdateFormData,
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onAvatarClick: () => void;
}

export default function BasicInfoCard({
  user,
  formData,
  locale,
  onChange,
  onAvatarClick,
}: BasicInfoCardProps) {
  const t = getTranslations(locale);
  const translations = t.UsersPage.EditUser;

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-stone-200">
      <h2 className="text-base font-semibold text-stone-900 mb-6">
        {translations.basicInfo}
      </h2>
      <div className="space-y-5">
        {/* Email */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-stone-700">
            {translations.form.email}{" "}
            {user.isEmailVerified && (
              <span className="text-xs text-amber-600">
                {translations.form.emailVerifiedNote}
              </span>
            )}
          </label>
          <input
            type="email"
            value={formData.email || ""}
            onChange={onChange("email")}
            disabled={user.isEmailVerified}
            className="w-full bg-stone-50 border border-stone-200 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="user@example.com"
          />
        </div>

        {/* Name */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-stone-700">
            {translations.form.name}
          </label>
          <input
            type="text"
            value={formData.name || ""}
            onChange={onChange("name")}
            className="w-full bg-stone-50 border border-stone-200 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
            placeholder="e.g. Ahmed Al-Saud"
          />
        </div>

        {/* Avatar Preview */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-stone-700">
            {translations.form.avatar}
          </label>
          <button
            type="button"
            onClick={onAvatarClick}
            className="group relative w-20 h-20 rounded-full overflow-hidden border-2 border-stone-200 hover:border-orange-400 transition-all cursor-pointer"
          >
            {formData.avatar ? (
              <Image
                src={formData.avatar}
                alt={user.name || "User avatar"}
                width={80}
                height={80}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.nextElementSibling?.classList.remove("hidden");
                }}
              />
            ) : null}
            <div
              className={`${formData.avatar ? "hidden" : ""} absolute inset-0 flex items-center justify-center bg-stone-100`}
            >
              <svg
                className="w-8 h-8 text-stone-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </button>
          <p className="text-xs text-stone-500">
            {translations.form.avatarHint}
          </p>
        </div>

        {/* Email Verification Toggle */}
        <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-lg">
          <input
            type="checkbox"
            id="isEmailVerified"
            checked={formData.isEmailVerified || false}
            onChange={onChange("isEmailVerified")}
            className="w-4 h-4 text-orange-600 border-stone-300 rounded focus:ring-orange-500"
          />
          <label
            htmlFor="isEmailVerified"
            className="text-sm font-medium text-stone-700"
          >
            {translations.form.emailVerified}
          </label>
        </div>
      </div>
    </div>
  );
}
