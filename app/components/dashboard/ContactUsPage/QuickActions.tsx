"use client";

import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslation";
import {
  FiArchive,
  FiAlertCircle,
  FiDownload,
  FiMessageSquare,
} from "react-icons/fi";

const quickActions = [
  {
    icon: FiArchive,
    labelKey: "archiveAll",
    descriptionKey: "archiveAllDesc",
    color: "orange",
  },
  {
    icon: FiAlertCircle,
    labelKey: "flagUrgent",
    descriptionKey: "flagUrgentDesc",
    color: "red",
  },
  {
    icon: FiDownload,
    labelKey: "exportCSV",
    descriptionKey: "exportCSVDesc",
    color: "blue",
  },
  {
    icon: FiMessageSquare,
    labelKey: "setupAutoReply",
    descriptionKey: "setupAutoReplyDesc",
    color: "orange",
  },
];

const colorClasses = {
  orange: {
    bg: "bg-orange-500",
    text: "text-orange-600",
    hover: "hover:bg-orange-500",
    hoverText: "group-hover:text-white",
  },
  red: {
    bg: "bg-red-500",
    text: "text-red-600",
    hover: "hover:bg-red-500",
    hoverText: "group-hover:text-white",
  },
  blue: {
    bg: "bg-blue-500",
    text: "text-blue-600",
    hover: "hover:bg-blue-500",
    hoverText: "group-hover:text-white",
  },
};

export function QuickActions({
  isUnreadOnly,
  order,
}: {
  isUnreadOnly?: boolean;
  order?: string;
}) {
  const t = useTranslation("ContactUsPage.QuickActions");

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {quickActions.map((action) => {
        const Icon = action.icon;
        const colors = colorClasses[action.color as keyof typeof colorClasses];

        return (
          <button
            key={action.labelKey}
            className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all text-left flex flex-col gap-4 border border-stone-200/50"
          >
            <div
              className={`w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center text-stone-600 ${colors.hover} ${colors.hoverText} transition-colors`}
            >
              <Icon size={24} />
            </div>
            <div>
              <h3 className="font-bold text-stone-900">
                {t[action.labelKey as keyof typeof t]}
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                {t[action.descriptionKey as keyof typeof t]}
              </p>
            </div>
          </button>
        );
      })}
    </section>
  );
}
