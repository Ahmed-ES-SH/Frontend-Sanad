"use client";

import { FiChevronDown } from "react-icons/fi";

export function Filters({
  isRead,
  order,
  onFilterChange,
}: {
  isRead?: boolean;
  order?: string;
  onFilterChange: (filters: Partial<ContactQueryParams>) => void;
}) {
  const locale = useLocale();
  const t = useTranslation("ContactUsPage.Filters");

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "all") {
      onFilterChange({ isRead: undefined });
    } else if (value === "unread") {
      onFilterChange({ isRead: false });
    } else if (value === "read") {
      onFilterChange({ isRead: true });
    }
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ order: e.target.value as "ASC" | "DESC" });
  };

  return (
    <section className="bg-white p-4 rounded-2xl flex flex-wrap items-center justify-end gap-4 mb-8 shadow-sm border border-stone-200/50">
      <div className="flex items-center gap-3">
        <div className="relative">
          <select
            value={isRead === undefined ? "all" : isRead ? "read" : "unread"}
            onChange={handleStatusChange}
            className="appearance-none bg-stone-50 border-0 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-stone-600 focus:ring-2 focus:ring-orange-500/20 cursor-pointer"
          >
            <option value="all">{t.statusAll}</option>
            <option value="unread">{t.unread}</option>
            <option value="read">{locale === "ar" ? "مقروءة" : "Read"}</option>
          </select>
          <FiChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400"
            size={16}
          />
        </div>

        <div className="relative">
          <select
            value={order || "DESC"}
            onChange={handleOrderChange}
            className="appearance-none bg-stone-50 border-0 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-stone-600 focus:ring-2 focus:ring-orange-500/20 cursor-pointer"
          >
            <option value="DESC">
              {locale === "ar" ? "الأحدث" : "Newest"}
            </option>
            <option value="ASC">{locale === "ar" ? "الأقدم" : "Oldest"}</option>
          </select>
          <FiChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400"
            size={16}
          />
        </div>
      </div>
    </section>
  );
}

import { ContactQueryParams } from "@/app/types/contact";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useLocale } from "@/app/hooks/useLocale";
