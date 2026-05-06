"use client";

import { UserUpdateFormData, UserRole } from "@/app/types/user";
import { getTranslations } from "@/app/helpers/getTranslations";
import { Locale } from "@/app/types/global";

interface SecurityRoleCardProps {
  formData: UserUpdateFormData;
  locale: Locale;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRoleChange: (role: UserRole) => void;
}

export default function SecurityRoleCard({
  formData,
  locale,
  onPasswordChange,
  onRoleChange,
}: SecurityRoleCardProps) {
  const t = getTranslations(locale);
  const translations = t.UsersPage.EditUser;

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-stone-200">
      <h2 className="text-base font-semibold text-stone-900 mb-6">
        {translations.securityRole}
      </h2>
      <div className="space-y-6">
        {/* Password Reset */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-stone-700">
            {translations.form.newPassword}{" "}
            <span className="text-xs text-stone-400">
              {translations.form.passwordHint}
            </span>
          </label>
          <input
            type="password"
            value={formData.password || ""}
            onChange={onPasswordChange}
            className="w-full bg-stone-50 border border-stone-200 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
            placeholder={translations.form.passwordPlaceholder}
          />
        </div>

        {/* Role Assignment */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-stone-700">
            {translations.form.role}
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="relative cursor-pointer">
              <input
                type="radio"
                name="role"
                className="peer sr-only"
                checked={formData.role === "user"}
                onChange={() => onRoleChange("user")}
              />
              <div className="p-4 rounded-xl border-2 border-stone-200 bg-stone-50 peer-checked:border-orange-500 peer-checked:bg-orange-50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-stone-100 peer-checked:bg-orange-100 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-stone-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      {translations.form.roleUser}
                    </p>
                    <p className="text-xs text-stone-500">
                      {translations.form.roleUserDesc}
                    </p>
                  </div>
                </div>
              </div>
            </label>

            <label className="relative cursor-pointer">
              <input
                type="radio"
                name="role"
                className="peer sr-only"
                checked={formData.role === "admin"}
                onChange={() => onRoleChange("admin")}
              />
              <div className="p-4 rounded-xl border-2 border-stone-200 bg-stone-50 peer-checked:border-orange-500 peer-checked:bg-orange-50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-stone-100 peer-checked:bg-orange-100 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-stone-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      {translations.form.roleAdmin}
                    </p>
                    <p className="text-xs text-stone-500">
                      {translations.form.roleAdminDesc}
                    </p>
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}