"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslation } from "@/app/hooks/useTranslation";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineSearch, HiOutlineAdjustments, HiX } from "react-icons/hi";
import { Category } from "@/app/types/global";

interface FiltersProps {
  categories?: Category[];
}

export function Filters({ categories = [] }: FiltersProps) {
  const t = useTranslation("BlogPage.Filters");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize state from URL params
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [categoryId, setCategoryId] = useState(
    searchParams.get("categoryId") || "",
  );
  const [isPublished, setIsPublished] = useState(
    searchParams.get("isPublished") || "",
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "newest");
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Check if any filters are active
  const hasActiveFilters =
    search || categoryId || isPublished || sortBy !== "newest";

  // Apply filters to URL with debounce
  const applyFilters = useCallback(() => {
    const currentSearch = searchParams.get("search") || "";
    const currentCategoryId = searchParams.get("categoryId") || "";
    const currentIsPublished = searchParams.get("isPublished") || "";
    const currentSortBy = searchParams.get("sortBy") || "newest";

    const hasChanged =
      search !== currentSearch ||
      categoryId !== currentCategoryId ||
      isPublished !== currentIsPublished ||
      sortBy !== currentSortBy;

    if (!hasChanged) return;

    const params = new URLSearchParams(searchParams.toString());

    if (search) params.set("search", search);
    else params.delete("search");

    if (categoryId) params.set("categoryId", categoryId);
    else params.delete("categoryId");

    if (isPublished) params.set("isPublished", isPublished);
    else params.delete("isPublished");

    if (sortBy && sortBy !== "newest") params.set("sortBy", sortBy);
    else params.delete("sortBy");

    // Reset to page 1 when filters change
    params.delete("page");

    router.push(`${pathname}?${params.toString()}`);
  }, [search, categoryId, isPublished, sortBy, pathname, router, searchParams]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setSearch("");
    setCategoryId("");
    setIsPublished("");
    setSortBy("newest");
    router.push(pathname);
  }, [pathname, router]);

  // Remove specific filter
  const removeFilter = useCallback((key: string) => {
    switch (key) {
      case "search":
        setSearch("");
        break;
      case "categoryId":
        setCategoryId("");
        break;
      case "isPublished":
        setIsPublished("");
        break;
      case "sortBy":
        setSortBy("newest");
        break;
    }
  }, []);

  // Auto-apply filters when values change with debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      applyFilters();
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, categoryId, isPublished, sortBy, applyFilters]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="space-y-4 mb-6"
    >
      {/* Row 1: Search + Essential Filters + Actions */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Search Input - Always Visible */}
        <div className="relative grow w-full md:w-auto">
          <label htmlFor="article-search" className="sr-only">
            {t.searchPlaceholder}
          </label>
          <HiOutlineSearch
            className="absolute start-3 top-1/2 -translate-y-1/2 text-stone-400 text-lg"
            aria-hidden="true"
          />
          <input
            id="article-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-stone-200 rounded-xl px-4 py-2 ps-10 pe-4 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none"
            placeholder={t.searchPlaceholder}
            type="text"
          />
        </div>

        {/* Essential Filters - Always Visible */}
        <div
          className="flex items-center gap-3 w-full md:w-auto overflow-x-auto no-scrollbar"
          role="group"
          aria-label="Filter options"
        >
          <motion.label className="relative">
            <span className="sr-only">Filter by status</span>
            <motion.select
              value={isPublished}
              onChange={(e) => setIsPublished(e.target.value)}
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
              className="border border-stone-200 rounded-xl px-4 py-2 text-xs font-semibold appearance-none bg-size-[1.25em_1.25em] bg-position-[right_0.5rem_center] bg-no-repeat pr-10 cursor-pointer"
            >
              <option value="">{t.statusAll}</option>
              <option value="true">{t.published}</option>
              <option value="false">{t.draft}</option>
            </motion.select>
          </motion.label>

          <motion.label className="relative">
            <span className="sr-only">Sort by date</span>
            <motion.select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
              className="border border-stone-200 rounded-xl px-4 py-2 text-xs font-semibold appearance-none bg-size-[1.25em_1.25em] bg-position-[right_0.5rem_center] bg-no-repeat pr-10 cursor-pointer"
            >
              <option value="newest">{t.dateNewest}</option>
              <option value="oldest">{t.oldest}</option>
            </motion.select>
          </motion.label>

          {/* More Filters Toggle */}
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgb(249 115 22)" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setShowMoreFilters(!showMoreFilters);
              }
            }}
            aria-expanded={showMoreFilters}
            aria-controls="more-filters"
            className={`p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/50 flex items-center justify-center relative ${
              showMoreFilters || categoryId
                ? "bg-orange-500 text-white"
                : "bg-stone-100 text-stone-600"
            }`}
          >
            <HiOutlineAdjustments className="text-lg" aria-hidden="true" />
            {categoryId && !showMoreFilters && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-600 rounded-full" />
            )}
          </motion.button>

          {/* Clear All Button */}
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={clearAllFilters}
              className="px-3 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all flex items-center gap-1.5"
            >
              <HiX className="text-sm" />
              Clear All
            </motion.button>
          )}
        </div>
      </div>

      {/* Row 2: Active Filter Pills */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {search && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
              >
                Search: {search}
                <button
                  onClick={() => removeFilter("search")}
                  className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                >
                  <HiX size={12} />
                </button>
              </motion.span>
            )}
            {categoryId && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700"
              >
                Category:{" "}
                {categories.find((c) => c.id === categoryId)?.name ||
                  categoryId}
                <button
                  onClick={() => removeFilter("categoryId")}
                  className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                >
                  <HiX size={12} />
                </button>
              </motion.span>
            )}
            {isPublished && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                  isPublished === "true"
                    ? "bg-green-100 text-green-700"
                    : "bg-stone-100 text-stone-700"
                }`}
              >
                {isPublished === "true" ? "Published" : "Draft"}
                <button
                  onClick={() => removeFilter("isPublished")}
                  className="hover:bg-opacity-80 rounded-full p-0.5 transition-colors"
                >
                  <HiX size={12} />
                </button>
              </motion.span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Row 3: Expanded Filters - Hidden by Default */}
      <AnimatePresence>
        {showMoreFilters && (
          <motion.div
            id="more-filters"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 w-full md:w-auto overflow-x-auto no-scrollbar pt-2 border-t border-stone-200"
            role="group"
            aria-label="Additional filters"
          >
            <motion.label className="relative">
              <span className="sr-only">Filter by category</span>
              <motion.select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                whileHover={{ scale: 1.02 }}
                className="border border-stone-200 rounded-xl px-4 py-2 text-xs font-semibold appearance-none bg-size-[1.25em_1.25em] bg-position-[right_0.5rem_center] bg-no-repeat pr-10 cursor-pointer"
              >
                <option value="">{t.categoryAll}</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </motion.select>
            </motion.label>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
