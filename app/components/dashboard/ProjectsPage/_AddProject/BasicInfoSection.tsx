/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Category } from "@/app/types/global";
import { FiAlertCircle } from "react-icons/fi";

interface BasicInfoSectionProps {
  t: any;
  open: boolean;
  toggleSection: (section: string) => void;
  title: string;
  category: string;
  shortDesc: string;
  longDesc: string;
  setTitle: (value: string) => void;
  setCategory: (value: string) => void;
  setShortDesc: (value: string) => void;
  setLongDesc: (value: string) => void;
  touched: Set<string>;
  errors: {
    title?: string;
    category?: string;
    shortDesc?: string;
    longDesc?: string;
  };
  markTouched: (field: string) => void;
  handleFieldChange: (name: string, value: string) => void;
  categories: Category[];
}


export default function BasicInfoSection({
  t,
  open,
  toggleSection,
  title,
  category,
  shortDesc,
  longDesc,
  setTitle,
  setCategory,
  setShortDesc,
  setLongDesc,
  touched,
  errors,
  markTouched,
  handleFieldChange,
  categories,
}: BasicInfoSectionProps) {
  return (
    <section className="bg-white rounded-xl border border-stone-200/50 overflow-hidden">
      <button
        type="button"
        onClick={() => toggleSection("basic")}
        className="w-full flex items-center justify-between p-8 text-left hover:bg-stone-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
          <h3 className="text-xl font-bold">
            {t?.basicInfo?.title || "Basic Information"}
          </h3>
        </div>
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-stone-400 shrink-0"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-stone-400 shrink-0"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        )}
      </button>
      {open && (
        <div className="px-8 pb-8">
          <div className="grid gap-6">
            {/* Project Title */}
            <div className="grid gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-stone-500">
                {t?.basicInfo?.projectTitle || "Project Title"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  handleFieldChange("title", e.target.value);
                }}
                onBlur={() => markTouched("title")}
                className={`w-full bg-stone-50 border-none rounded-lg p-4 focus:ring-2 focus:ring-orange-500/50 text-stone-800 placeholder:text-stone-400 ${touched.has("title") && errors.title
                  ? "ring-2 ring-red-400/40"
                  : ""
                  }`}
                placeholder={
                  t?.basicInfo?.titlePlaceholder ||
                  "e.g. Modern E-commerce Platform Re-design"
                }
              />
              {touched.has("title") && errors.title && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <FiAlertCircle size={12} /> {errors.title}
                </p>
              )}
              <p className="text-[11px] text-stone-400">
                {t?.basicInfo?.titleHelp ||
                  "A clear, descriptive title helps users find your project quickly."}
              </p>
            </div>

            {/* Category */}
            <div className="grid gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-stone-500">
                {t?.basicInfo?.category || "Category"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  handleFieldChange("category", e.target.value);
                }}
                onBlur={() => markTouched("category")}
                className={`w-full bg-stone-50 border-none rounded-lg p-4 focus:ring-2 focus:ring-orange-500/50 text-stone-800 appearance-none cursor-pointer ${touched.has("category") && errors.category
                  ? "ring-2 ring-red-400/40"
                  : ""
                  }`}
              >
                <option value="">
                  {t?.basicInfo?.categoryPlaceholder || "Select a category"}
                </option>
                {categories && Array.isArray(categories) && categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name ?? "Not Found"}
                  </option>
                ))}
              </select>
              {touched.has("category") && errors.category && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <FiAlertCircle size={12} /> {errors.category}
                </p>
              )}
            </div>

            {/* Short Description */}
            <div className="grid gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-stone-500">
                {t?.basicInfo?.shortDesc || "Short Description"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={shortDesc}
                onChange={(e) => {
                  setShortDesc(e.target.value);
                  handleFieldChange("shortDesc", e.target.value);
                }}
                onBlur={() => markTouched("shortDesc")}
                maxLength={150}
                className={`w-full bg-stone-50 border-none rounded-lg p-4 focus:ring-2 focus:ring-orange-500/50 text-stone-800 placeholder:text-stone-400 ${touched.has("shortDesc") && errors.shortDesc
                  ? "ring-2 ring-red-400/40"
                  : ""
                  }`}
                placeholder={
                  t?.basicInfo?.shortDescPlaceholder ||
                  "Brief summary for list views (max 150 characters)"
                }
              />
              <div className="flex justify-between items-center">
                {touched.has("shortDesc") && errors.shortDesc ? (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <FiAlertCircle size={12} /> {errors.shortDesc}
                  </p>
                ) : (
                  <span />
                )}
                <span
                  className={`text-[11px] ${shortDesc.length > 140 ? "text-amber-500 font-bold" : "text-stone-400"}`}
                >
                  {shortDesc.length}/150
                </span>
              </div>
            </div>

            {/* Long Description */}
            <div className="grid gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-stone-400">
                {t?.basicInfo?.longDesc || "Long Description"}{" "}
                <span className="text-stone-300 font-normal normal-case tracking-normal text-[10px]">
                  (optional)
                </span>
              </label>
              <div
                className={`bg-stone-50 rounded-lg border-none focus-within:ring-2 focus-within:ring-orange-500/50 transition-all overflow-hidden ${touched.has("longDesc") && errors.longDesc
                  ? "ring-2 ring-red-400/40"
                  : ""
                  }`}
              >
                <textarea
                  value={longDesc}
                  onChange={(e) => {
                    setLongDesc(e.target.value);
                    handleFieldChange("longDesc", e.target.value);
                  }}
                  onBlur={() => markTouched("longDesc")}
                  className="w-full p-4 border-none focus:ring-0 bg-transparent resize-none min-h-[200px] placeholder:text-stone-400"
                  placeholder={
                    t?.basicInfo?.longDescPlaceholder ||
                    "Describe the project scope, challenges, and solutions in detail..."
                  }
                />
              </div>
              {touched.has("longDesc") && errors.longDesc && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <FiAlertCircle size={12} /> {errors.longDesc}
                </p>
              )}
              <p className="text-[11px] text-stone-400">
                {t?.basicInfo?.longDescHelp ||
                  "Optional but recommended — detailed descriptions improve SEO and user engagement."}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
