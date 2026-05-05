"use client";

import { FiBox, FiLayers, FiCreditCard, FiFileText } from "react-icons/fi";
import LocaleLink from "../../global/LocaleLink";

const quickActions = [
  {
    id: 1,
    titleKey: "addNewService",
    descriptionKey: "addNewServiceDesc",
    icon: FiBox,
    bgColor: "bg-orange-500",
    shadowColor: "shadow-orange-500/20",
    isPrimary: true,
    href: "/dashboard/addservice",
  },
  {
    id: 2,
    titleKey: "manageCategories",
    descriptionKey: "manageCategoriesDesc",
    icon: FiLayers,
    bgColor: "bg-stone-100",
    shadowColor: "shadow-stone-200/50",
    href: "/dashboard/services/categories",
  },
  {
    id: 3,
    titleKey: "priceManagement",
    descriptionKey: "priceManagementDesc",
    icon: FiCreditCard,
    bgColor: "bg-stone-100",
    shadowColor: "shadow-stone-200/50",
    href: "/dashboard/services/pricing",
  },
  {
    id: 4,
    titleKey: "serviceLogs",
    descriptionKey: "serviceLogsDesc",
    icon: FiFileText,
    bgColor: "bg-stone-100",
    border: true,
    shadowColor: "shadow-stone-200/50",
    href: "/dashboard/services/logs",
  },
];

export default function QuickActions() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {quickActions.map((action) => {
        const Icon = action.icon;
        const content = (
          <div
            className={`
              ${action.bgColor} ${action.shadowColor} 
              p-6 rounded-xl transition-transform hover:-translate-y-1 
              flex flex-col justify-between h-40 group
              ${action.isPrimary ? "text-white shadow-lg" : "bg-stone-50 hover:shadow-xl cursor-pointer"}
              ${action.border ? "border-2 border-dashed border-stone-300 hover:border-orange-300" : ""}
            `}
          >
            <div className="flex justify-between items-start">
              <Icon
                className={`text-3xl ${action.isPrimary ? "text-white" : "text-orange-500"}`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              />
              {action.isPrimary ? (
                <span className="material-symbols-outlined text-white opacity-70">
                  north_east
                </span>
              ) : (
                <span className="material-symbols-outlined text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  arrow_forward
                </span>
              )}
            </div>
            <div>
              <h3
                className={`font-bold text-lg ${action.isPrimary ? "text-white" : "text-stone-900"}`}
              >
                {action.titleKey}
              </h3>
              <p
                className={`text-xs ${action.isPrimary ? "text-white/80" : "text-stone-500"}`}
              >
                {action.descriptionKey}
              </p>
            </div>
          </div>
        );

        if (action.href) {
          return (
            <LocaleLink key={action.id} href={action.href}>
              {content}
            </LocaleLink>
          );
        }

        return <div key={action.id}>{content}</div>;
      })}
    </section>
  );
}
