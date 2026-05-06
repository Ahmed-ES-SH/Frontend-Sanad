"use client";

import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { UserFilterState } from "@/app/types/user";
import { useTranslation } from "@/app/hooks/useTranslation";

// ============================================================================
// FILTER BAR - Search and filter controls for user list
// Sends filter changes to parent component which passes them to server
// ============================================================================

interface FilterBarProps {
  onFilterChange?: (filters: UserFilterState) => void;
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const t = useTranslation("UsersPage.FilterBar");

  // Filter state - controlled inputs for search, role, and verification status
  const [filters, setFilters] = useState<UserFilterState>({
    role: "all",
    status: "all",
    search: "",
  });

  // Immediate search input for UI feedback
  const [searchInput, setSearchInput] = useState("");

  // Debounced search value - updates after 500ms of no typing
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // When debounced search changes, update filters and notify parent
  useEffect(() => {
    const handleFilters = (newFilters: UserFilterState) => {
      setFilters(newFilters);
    };

    if (debouncedSearch !== filters.search) {
      const newFilters = { ...filters, search: debouncedSearch };
      handleFilters(newFilters);
      onFilterChange?.(newFilters);
    }
  }, [debouncedSearch, filters, onFilterChange]);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = {
      ...filters,
      role: e.target.value as UserFilterState["role"],
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = {
      ...filters,
      status: e.target.value as UserFilterState["status"],
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div className="bg-stone-50 p-5 rounded-xl flex flex-col md:flex-row gap-4 items-center">
      <div className="relative grow w-full">
        <FiSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
          size={18}
        />
        <input
          className="w-full bg-white border-none rounded-lg pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 focus:ring-offset-1"
          placeholder={t.searchPlaceholder || "Search by name or email..."}
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className="flex gap-4 w-full md:w-auto">
        <select
          className="bg-white border-none rounded-lg px-4 py-3 text-sm font-medium text-stone-700 focus:ring-2 focus:ring-orange-500 min-w-[140px] cursor-pointer"
          value={filters.role}
          onChange={handleRoleChange}
        >
          <option value="all">{t.allRoles || "All Roles"}</option>
          <option value="admin">{t.admin || "Admin"}</option>
          <option value="user">User</option>
        </select>
        <select
          className="bg-white border-none rounded-lg px-4 py-3 text-sm font-medium text-stone-700 focus:ring-2 focus:ring-orange-500 min-w-[140px] cursor-pointer"
          value={filters.status}
          onChange={handleStatusChange}
        >
          <option value="all">{t.status || "All Status"}</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="banned">Banned</option>
        </select>
      </div>
    </div>
  );
}
