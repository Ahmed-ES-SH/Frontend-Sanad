"use client";

import { FiSearch } from "react-icons/fi";
import type { OrderFiltersProps } from "./OrderFilters.types";

export default function OrderFilters({
  searchPlaceholder,
  filterOptions,
  filter,
  search,
  isRTL,
  onSearchChange,
  onFilterChange,
  disabled,
}: OrderFiltersProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-surface-sm border border-surface-200/50 flex flex-col gap-4 items-start">
      {/* Search */}
      <div className="flex-grow w-full border border-gray-200 relative">
        <FiSearch
          className={`absolute ${
            isRTL ? "right-4" : "left-4"
          } top-1/2 -translate-y-1/2 text-surface-400`}
        />
        <input
          className={`w-full bg-surface-50 border-none ${
            isRTL ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left"
          } py-3.5 focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm`}
          placeholder={searchPlaceholder}
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label={searchPlaceholder}
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 w-full lg:w-auto">
        {Object.keys(filterOptions).map((key) => (
          <button
            key={key}
            type="button"
            disabled={disabled}
            onClick={() => onFilterChange(key)}
            className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95 ${
              filter === key
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "bg-surface-100 text-surface-600 hover:bg-surface-200"
            }`}
            aria-pressed={filter === key}
          >
            {filterOptions[key]}
          </button>
        ))}
      </div>
    </div>
  );
}
