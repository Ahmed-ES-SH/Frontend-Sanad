"use client";

import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

interface FormProgressProps {
  t: Record<string, any>;
  formState: {
    fields: Record<string, boolean>;
    completed: number;
    total: number;
    progress: number;
  };
  missingFields: string[];
}

export default function FormProgress({
  t,
  formState,
  missingFields,
}: FormProgressProps) {
  return (
    <section className="bg-white rounded-xl p-6 border border-stone-200/50">
      <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-4">
        {t?.formProgress?.title || "Form Progress"}
      </h4>
      {/* Progress ring */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-16 h-16 shrink-0">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              className="text-stone-100"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className={formState.progress >= 80 ? "text-green-500" : formState.progress >= 40 ? "text-orange-500" : "text-stone-400"}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeDasharray={`${formState.progress}, 100`}
              strokeLinecap="round"
              strokeWidth="3"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-extrabold text-stone-700">{formState.progress}%</span>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold text-stone-700">
            {formState.completed} of {formState.total} fields
          </p>
          <p className="text-xs text-stone-500 mt-0.5">
            {formState.progress >= 80
              ? "Almost ready to publish"
              : formState.progress >= 40
              ? "Good progress — keep going"
              : "Start filling in the required fields"}
          </p>
        </div>
      </div>
      {/* Missing fields checklist */}
      {missingFields.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
            {t?.formProgress?.required || "Required"}
          </p>
          {missingFields.map((field) => (
            <div key={field} className="flex items-center gap-2 text-xs text-stone-500">
              <FiAlertCircle size={12} className="text-amber-500 shrink-0" />
              <span>{field}</span>
            </div>
          ))}
        </div>
      )}
      {/* Completed fields */}
      {formState.completed > 0 && (
        <div className="space-y-2 mt-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
            {t?.formProgress?.completed || "Completed"}
          </p>
          {formState.fields.title && (
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <FiCheckCircle size={12} className="text-green-500 shrink-0" />
              <span className="truncate">{t?.basicInfo?.projectTitle || "Project Title"}</span>
            </div>
          )}
          {formState.fields.category && (
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <FiCheckCircle size={12} className="text-green-500 shrink-0" />
              <span>{t?.basicInfo?.category || "Category"}</span>
            </div>
          )}
          {formState.fields.shortDesc && (
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <FiCheckCircle size={12} className="text-green-500 shrink-0" />
              <span>{t?.basicInfo?.shortDesc || "Short Description"}</span>
            </div>
          )}
          {formState.fields.techStack && (
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <FiCheckCircle size={12} className="text-green-500 shrink-0" />
              <span>{t?.technicalDetails?.techStack || "Tech Stack"}</span>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
