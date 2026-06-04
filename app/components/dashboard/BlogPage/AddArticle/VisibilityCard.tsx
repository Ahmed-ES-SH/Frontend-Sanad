"use client";

import { FiSend, FiFileText } from "react-icons/fi";

interface VisibilityCardProps {
  publishingSettings: string;
  visibility: string;
  draft: string;
  published: string;
  willPublishLabel: string;
  willDraftLabel: string;
  publishingNote: string;
  intent: "draft" | "publish";
}

export default function VisibilityCard({
  publishingSettings,
  visibility,
  draft,
  published,
  willPublishLabel,
  willDraftLabel,
  publishingNote,
  intent,
}: VisibilityCardProps) {
  const isPublish = intent === "publish";

  return (
    <div className="rounded-2xl bg-white border border-stone-200 shadow-sm">
      <div className="px-5 pt-5 pb-3">
        <h2 className="heading-sm text-stone-900 text-balance">
          {publishingSettings}
        </h2>
      </div>

      <div className="px-5 pb-4">
        <div
          className={`flex items-start gap-3 rounded-xl border px-3.5 py-3 transition-colors ${
            isPublish
              ? "border-emerald-200 bg-emerald-50/60"
              : "border-stone-200 bg-stone-50"
          }`}
        >
          <div
            className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
              isPublish
                ? "bg-white text-emerald-600 border border-emerald-200"
                : "bg-white text-stone-500 border border-stone-200"
            }`}
          >
            {isPublish ? <FiSend size={16} /> : <FiFileText size={16} />}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className={`text-sm font-semibold leading-snug ${
                isPublish ? "text-emerald-900" : "text-stone-800"
              }`}
            >
              {isPublish ? willPublishLabel : willDraftLabel}
            </p>
            <p className="text-xs text-stone-500 mt-0.5">
              {visibility}:{" "}
              <span
                className={`font-semibold ${
                  isPublish ? "text-emerald-700" : "text-stone-700"
                }`}
              >
                {isPublish ? published : draft}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 pt-3 border-t border-stone-100">
        <p className="text-xs text-stone-500 leading-relaxed">
          {publishingNote}
        </p>
      </div>
    </div>
  );
}
