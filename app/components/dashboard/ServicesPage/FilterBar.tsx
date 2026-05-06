"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { useDebounce } from "@/app/hooks/useDebounce";
import { FaTimes } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface FilterBarProps {
  categories?: Category[];
  onSearchChange?: (search: string) => void;
  onCategoryChange?: (categoryId: string) => void;
  onSortChange?: (sortBy: string, order: string) => void;
  initialSearch?: string;
  initialCategory?: string;
  initialSortBy?: string;
  initialOrder?: string;
}

export default function FilterBar({
  categories = [],
  onSearchChange,
  onCategoryChange,
  onSortChange,
  initialSearch = "",
  initialCategory = "",
  initialSortBy = "createdAt",
  initialOrder = "DESC",
}: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortOrder, setSortOrder] = useState(initialOrder);

  const debouncedSearch = useDebounce(search, 500);

  // Sync with URL params
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlCategory = searchParams.get("categoryId") || "";
    const urlSortBy = searchParams.get("sortBy") || "createdAt";
    const urlOrder = searchParams.get("order") || "DESC";

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearch(urlSearch);
    setSelectedCategory(urlCategory);
    setSortBy(urlSortBy);
    setSortOrder(urlOrder);
  }, []);

  // Update URL when filters change
  const updateURL = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (
          value === null ||
          value === "" ||
          value === "createdAt" ||
          value === "DESC"
        ) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      // Reset to page 1 when filtering (except when just changing page)
      if (!updates.page) {
        params.delete("page");
      }

      const queryString = params.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    },
    [searchParams, router, pathname],
  );

  // Handle debounced search update
  useEffect(() => {
    if (debouncedSearch !== initialSearch) {
      updateURL({ search: debouncedSearch });
      onSearchChange?.(debouncedSearch);
    }
  }, [debouncedSearch]);

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    updateURL({ categoryId });
    onCategoryChange?.(categoryId);
  };

  // Handle sort change
  const handleSortChange = (newSortBy: string, newOrder: string) => {
    setSortBy(newSortBy);
    setSortOrder(newOrder);
    updateURL({ sortBy: newSortBy, order: newOrder });
    onSortChange?.(newSortBy, newOrder);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSortBy("createdAt");
    setSortOrder("DESC");
    router.push(pathname, { scroll: false });
    onSearchChange?.("");
    onCategoryChange?.("");
    onSortChange?.("createdAt", "DESC");
  };

  const hasActiveFilters = search || selectedCategory;

  const sortOptions = [
    { value: "createdAt", label: "Date Created" },
    { value: "updatedAt", label: "Date Updated" },
    { value: "title", label: "Title" },
    { value: "order", label: "Display Order" },
  ];

  return (
    <section className="bg-stone-50 rounded-xl p-4 flex flex-wrap items-center gap-4">
      {/* Search Input */}
      <div className="grow min-w-[200px]">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-lg py-2 pl-10 pr-10 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
            placeholder="Search services..."
            type="text"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
              aria-label="Clear search"
            >
              <FaTimes className="text-xs" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div className="w-full md:w-auto">
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="bg-white border border-stone-200 rounded-lg py-2 pl-3 pr-8 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none w-full appearance-none cursor-pointer transition-all"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <BiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
        </div>
      </div>

      {/* Sort Dropdown */}
      <div className="w-full md:w-auto">
        <div className="relative">
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [newSortBy, newOrder] = e.target.value.split("-");
              handleSortChange(newSortBy, newOrder);
            }}
            className="bg-white border border-stone-200 rounded-lg py-2 pl-3 pr-8 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none w-full appearance-none cursor-pointer transition-all"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={`${option.value}-ASC`}>
                {option.label} (A-Z)
              </option>
            ))}
            {sortOptions.map((option) => (
              <option
                key={`${option.value}-DESC`}
                value={`${option.value}-DESC`}
              >
                {option.label} (Z-A)
              </option>
            ))}
          </select>
          <BiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
        </div>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="bg-stone-200 text-stone-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-stone-300 hover:text-stone-700 transition-all flex items-center gap-2"
        >
          <FaTimes className="text-xs" />
          Clear
        </button>
      )}
    </section>
  );
}
