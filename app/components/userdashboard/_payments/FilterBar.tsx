"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  FiSearch,
  FiFilter,
  FiCalendar,
  FiX,
  FiChevronDown,
} from "react-icons/fi";
import { FilterBarProps, StatusOption } from "./FilterBar.types";
import { FilterStatus } from "./TransactionTable.types";
import { useTranslation } from "@/app/hooks/useTranslation";

const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  statusFilter,
  dateFrom,
  dateTo,
  activeFilterCount,
  hasActiveFilters,
  onSearchChange,
  onStatusFilterChange,
  onDateFromChange,
  onDateToChange,
  onClearFilters,
}) => {
  const t = useTranslation("payments");

  const statusOptions: StatusOption[] = [
    { value: "all", label: t.status.all },
    { value: "paid", label: t.status.paid },
    { value: "pending", label: t.status.pending },
    { value: "failed", label: t.status.failed },
  ];

  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  const statusRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  const closeDropdowns = useCallback((e: MouseEvent) => {
    if (statusRef.current && !statusRef.current.contains(e.target as Node)) {
      setShowStatusDropdown(false);
    }
    if (dateRef.current && !dateRef.current.contains(e.target as Node)) {
      setShowDateDropdown(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdowns);
    return () => document.removeEventListener("mousedown", closeDropdowns);
  }, [closeDropdowns]);

  const getStatusLabel = (value: FilterStatus): string => {
    const option = statusOptions.find((opt) => opt.value === value);
    return option?.label ?? value;
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <h2 className="text-xl font-semibold text-foreground">{t.tableTitle}</h2>
      <div className="flex flex-wrap max-lg:flex-col max-lg:items-start max-lg:w-full items-center gap-3 w-full md:w-auto">
        {/* Search */}
        <div className="relative flex-1 max-lg:w-full md:w-64">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm"
            aria-hidden="true"
          />
          <input
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200/50 rounded-lg text-sm focus:ring-2 focus:ring-orange-500/20 focus:outline-none focus:border-orange-500/50 whitespace-nowrap"
            placeholder={t.searchPlaceholder}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label={t.searchPlaceholder}
          />
        </div>

        {/* Status Dropdown */}
        <div className="relative max-lg:w-full" ref={statusRef}>
          <button
            className={`flex max-lg:w-full items-center gap-2 px-4 py-2 border rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 whitespace-nowrap ${
              showStatusDropdown
                ? "bg-orange-50 border-orange-500/50 text-orange-700"
                : "bg-stone-50 border-stone-200/50 text-muted-foreground hover:bg-stone-100"
            }`}
            onClick={() => {
              setShowStatusDropdown(!showStatusDropdown);
              setShowDateDropdown(false);
            }}
            aria-expanded={showStatusDropdown}
            aria-haspopup="listbox"
            aria-label={t.filterLabel}
          >
            <FiFilter className="text-sm" aria-hidden="true" />
            {getStatusLabel(statusFilter)}
            {activeFilterCount > 0 && (
              <span className="ml-1 w-5 h-5 rounded-full bg-orange-600 text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
            <FiChevronDown className="text-xs" aria-hidden="true" />
          </button>

          {showStatusDropdown && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-stone-200 rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="p-2">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors whitespace-nowrap ${
                      statusFilter === option.value
                        ? "bg-orange-50 text-orange-700 font-semibold"
                        : "text-foreground hover:bg-stone-50"
                    }`}
                    onClick={() => onStatusFilterChange(option.value)}
                    role="option"
                    aria-selected={statusFilter === option.value}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Date Range Dropdown */}
        <div className="relative max-lg:w-full" ref={dateRef}>
          <button
            className={`flex items-center max-lg:w-full gap-2 px-4 py-2 border rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 whitespace-nowrap ${
              showDateDropdown
                ? "bg-orange-50 border-orange-500/50 text-orange-700"
                : "bg-stone-50 border-stone-200/50 text-muted-foreground hover:bg-stone-100"
            }`}
            onClick={() => {
              setShowDateDropdown(!showDateDropdown);
              setShowStatusDropdown(false);
            }}
            aria-expanded={showDateDropdown}
            aria-label={t.dateRangeLabel}
          >
            <FiCalendar className="text-sm" aria-hidden="true" />
            {t.dateRangeLabel}
            <FiChevronDown className="text-xs" aria-hidden="true" />
          </button>

          {showDateDropdown && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-stone-200 rounded-xl shadow-lg z-50 p-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    {t.dateFromLabel}
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500/20 focus:outline-none focus:border-orange-500/50"
                    value={dateFrom}
                    onChange={(e) => onDateFromChange(e.target.value)}
                    aria-label={t.dateFromLabel}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    {t.dateToLabel}
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500/20 focus:outline-none focus:border-orange-500/50"
                    value={dateTo}
                    onChange={(e) => onDateToChange(e.target.value)}
                    aria-label={t.dateToLabel}
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    className="flex-1 py-2 px-3 text-sm font-semibold text-foreground bg-stone-50 border border-stone-200 rounded-lg hover:bg-stone-100 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onClick={() => {
                      onDateFromChange("");
                      onDateToChange("");
                    }}
                  >
                    {t.resetBtn}
                  </button>
                  <button
                    className="flex-1 py-2 px-3 text-sm font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onClick={() => setShowDateDropdown(false)}
                  >
                    {t.applyBtn}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Clear All Filters */}
        {hasActiveFilters && (
          <button
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 whitespace-nowrap"
            onClick={onClearFilters}
            aria-label={t.clearFiltersLabel}
          >
            <FiX className="text-sm" aria-hidden="true" />
            {t.clearFiltersLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
