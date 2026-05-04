import React from "react";
import { BiLoader } from "react-icons/bi";
import { HiCheck, HiOutlineShieldCheck, HiOutlineUser } from "react-icons/hi";
import AvatarUpload from "./AvatarUpload";
import { UserRole } from "@/app/types/user";
import { DraftFormData, FormState } from "./AddUserClient";

interface AddUserFormProps {
  formState: FormState;
  handleSubmit: (e: React.FormEvent) => void | Promise<void>;
  errors: Partial<Record<string, string>>;
  form: DraftFormData;
  handleChange: (
    field: keyof DraftFormData,
  ) => (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => void;
  handleRoleChange: (role: UserRole) => void;
  permissions: { title: string; items: string[] };
  handleDiscard: () => void;
  setForm: React.Dispatch<React.SetStateAction<DraftFormData>>;
}

type InputConfig = {
  id: keyof DraftFormData;
  label: string;
  type: string;
  required?: boolean;
  placeholder: string;
  autoComplete?: string;
};

const BASIC_INFO_INPUTS: InputConfig[] = [
  {
    id: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "you@example.com",
    autoComplete: "email",
  },
  {
    id: "name",
    label: "Name",
    type: "text",
    required: false,
    placeholder: "e.g. Sultan Al-Rashid",
    autoComplete: "name",
  },
];

const CREDENTIAL_INPUTS: InputConfig[] = [
  {
    id: "password",
    label: "Password",
    type: "password",
    required: true,
    placeholder: "At least 8 characters",
    autoComplete: "new-password",
  },
  {
    id: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    required: true,
    placeholder: "Re-enter password",
    autoComplete: "new-password",
  },
];

export default function AddUserForm({
  formState,
  handleSubmit,
  errors,
  form,
  handleChange,
  handleRoleChange,
  permissions,
  handleDiscard,
  setForm,
}: AddUserFormProps) {
  return (
    <>
      {formState !== "success" && (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-12 gap-8">
            {/* Main Form Column */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              {/* Basic Information */}
              <div className="bg-white rounded-xl p-8 shadow-sm border border-stone-200">
                <h2 className="text-base font-semibold text-stone-900 mb-6">
                  Basic Information
                </h2>
                <div className="space-y-6">
                  <AvatarUpload
                    onAvatarChange={(url) => setForm({ ...form, avatar: url })}
                  />
                  <div className="space-y-5">
                    {BASIC_INFO_INPUTS.map((input) => (
                      <div key={input.id} className="space-y-1.5">
                        <label className="block text-sm font-medium text-stone-700">
                          {input.label}{" "}
                          {input.required && (
                            <span className="text-red-500">*</span>
                          )}
                        </label>
                        <input
                          type={input.type}
                          value={form[input.id] as string}
                          onChange={handleChange(input.id)}
                          autoComplete={input.autoComplete}
                          className={`w-full bg-stone-50 border border-stone-200 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none ${
                            errors[input.id] ? "border-red-400" : ""
                          }`}
                          placeholder={input.placeholder}
                        />
                        {errors[input.id] && (
                          <p className="text-xs text-red-500">
                            {errors[input.id]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Security & Access */}
              <div className="bg-white rounded-xl p-8 shadow-sm border border-stone-200">
                <h2 className="text-base font-semibold text-stone-900 mb-6">
                  Credentials &amp; Role
                </h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {CREDENTIAL_INPUTS.map((input) => (
                      <div key={input.id} className="space-y-1.5">
                        <label className="block text-sm font-medium text-stone-700">
                          {input.label}{" "}
                          {input.required && (
                            <span className="text-red-500">*</span>
                          )}
                        </label>
                        <input
                          type={input.type}
                          value={form[input.id] as string}
                          onChange={handleChange(input.id)}
                          autoComplete={input.autoComplete}
                          className={`w-full bg-stone-50 border border-stone-200 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none ${
                            errors[input.id] ? "border-red-400" : ""
                          }`}
                          placeholder={input.placeholder}
                        />
                        {errors[input.id] && (
                          <p className="text-xs text-red-500">
                            {errors[input.id]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Role Assignment */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-stone-700">
                      Role
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="relative cursor-pointer">
                        <input
                          type="radio"
                          name="role"
                          className="peer sr-only"
                          checked={form.role === "user"}
                          onChange={() => handleRoleChange("user")}
                        />
                        <div className="p-4 rounded-xl border-2 border-stone-200 bg-stone-50 peer-checked:border-orange-500 peer-checked:bg-orange-50 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-stone-100 peer-checked:bg-orange-100 flex items-center justify-center">
                              <HiOutlineUser className="w-5 h-5 text-stone-500" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold">
                                Standard User
                              </p>
                              <p className="text-xs text-stone-500">
                                Limited dashboard access
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
                          checked={form.role === "admin"}
                          onChange={() => handleRoleChange("admin")}
                        />
                        <div className="p-4 rounded-xl border-2 border-stone-200 bg-stone-50 peer-checked:border-orange-500 peer-checked:bg-orange-50 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-stone-100 peer-checked:bg-orange-100 flex items-center justify-center">
                              <HiOutlineShieldCheck className="w-5 h-5 text-stone-500" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold">
                                Administrator
                              </p>
                              <p className="text-xs text-stone-500">
                                Full system capabilities
                              </p>
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {/* Role Permissions Summary */}
              <div className="bg-white rounded-xl p-6 border border-stone-200/50">
                <h4 className="text-sm font-semibold text-stone-900 mb-3">
                  {permissions.title}
                </h4>
                <ul className="space-y-2">
                  {permissions.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-stone-600"
                    >
                      <HiCheck className="w-4 h-4 mt-0.5 text-orange-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-10 pt-6 border-t border-stone-200 flex items-center justify-between">
            <button
              type="button"
              onClick={handleDiscard}
              className="px-6 py-2.5 text-stone-500 text-sm font-medium hover:text-stone-800 transition-colors"
            >
              Cancel
            </button>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={formState === "submitting"}
                className="px-10 py-2.5 bg-orange-600 text-white text-sm font-medium rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                {formState === "submitting" ? (
                  <span className="flex items-center gap-2">
                    <BiLoader className="animate-spin w-4 h-4" />
                    Creating...
                  </span>
                ) : (
                  "Create User"
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
