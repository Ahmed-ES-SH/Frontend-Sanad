// Search and Filter Component - Redesigned with modern editorial aesthetic
"use client";
import { useState, useEffect } from "react";
import { FiSearch, FiChevronDown, FiX, FiFilter } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { getCategories } from "@/app/actions/blogActions";
import { Category } from "@/app/types/global";
import { useTranslation } from "@/app/hooks/useTranslation";

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  totalResults: number;
  isLoading: boolean;
  onCategoryChange?: (categoryId: string) => void;
  onTagChange?: (tag: string) => void;
  selectedCategory?: string;
  selectedTag?: string;
}

export default function BlogSearchAndFilter({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  totalResults,
  isLoading,
  onCategoryChange,
  selectedCategory,
}: SearchAndFilterProps) {
  const t = useTranslation("blogPage");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchTerm);

  // Fetch categories for dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await getCategories();
        setCategories(cats);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== searchTerm) {
        setSearchTerm(localSearch);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, searchTerm, setSearchTerm]);

  const selectedCategoryName = categories.find(
    (c) => c.id === selectedCategory,
  )?.name;

  const clearSearch = () => {
    setLocalSearch("");
    setSearchTerm("");
  };

  const clearCategory = () => {
    if (onCategoryChange) {
      onCategoryChange("");
    }
  };

  return (
    <motion.div
      className="relative z-40 mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Top Bar - Results Count */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-primary to-primary-dark rounded-full" />
          <span className="text-lg font-semibold text-surface-800">
            {totalResults} {t.Results}
          </span>
        </div>
        <div className="hidden md:block text-sm text-surface-400 font-medium">
          {t.page} 1
        </div>
      </div>

      {/* Filter Controls - Modern Card Style */}
      <div className="bg-surface-card border border-surface-200/60 rounded-2xl p-4 shadow-surface-sm backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input - Glassmorphism Style */}
          <div className="relative flex-1 group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl blur-xl group-hover:blur-lg transition-all duration-500" />
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <FiSearch className="text-primary" />
              </div>
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-14 pr-12 py-3 bg-surface-50/80 backdrop-blur-sm border border-surface-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-surface-50 outline-none transition-all duration-300 text-surface-800 placeholder:text-surface-400 font-medium"
              />
              {localSearch && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-surface-200 rounded-lg transition-colors"
                >
                  <FiX className="text-surface-400" />
                </button>
              )}
            </div>
          </div>

          {/* Category Dropdown - Custom Styled */}
          <div className="relative min-w-[200px]">
            <div
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className={`flex items-center justify-between px-4 py-3 bg-surface-50/80 backdrop-blur-sm border rounded-xl cursor-pointer transition-all duration-300 ${
                selectedCategory
                  ? "border-primary/30 bg-primary/5"
                  : "border-surface-200 hover:border-surface-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <FiFilter
                  className={`text-sm ${selectedCategory ? "text-primary" : "text-surface-400"}`}
                />
                <span
                  className={`font-medium ${selectedCategory ? "text-primary-dark" : "text-surface-500"}`}
                >
                  {selectedCategoryName || t.categoryDropdown}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isCategoryOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiChevronDown className="text-surface-400" />
              </motion.div>
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isCategoryOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bg-white z-50 w-full mt-2 border border-surface-200 rounded-xl shadow-xl overflow-hidden"
                >
                  <div className="max-h-60 overflow-y-auto">
                    <button
                      onClick={() => {
                        clearCategory();
                        setIsCategoryOpen(false);
                      }}
                      className={`w-full text-right px-4 py-3 hover:bg-surface-50 transition-colors font-medium ${
                        !selectedCategory
                          ? "text-primary bg-primary/5"
                          : "text-surface-600"
                      }`}
                    >
                      {t.allCategories}
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          if (onCategoryChange) onCategoryChange(category.id);
                          setIsCategoryOpen(false);
                        }}
                        className={`w-full text-right px-4 py-3 hover:bg-surface-50 transition-colors font-medium flex items-center justify-between ${
                          selectedCategory === category.id
                            ? "text-primary bg-primary/5"
                            : "text-surface-600"
                        }`}
                      >
                        {category.name}
                        {selectedCategory === category.id && (
                          <span className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sort Dropdown - Custom Styled */}
          <div className="relative min-w-[160px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              disabled={isLoading}
              className="w-full appearance-none px-4 py-3 bg-surface-50/80 backdrop-blur-sm border border-surface-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 text-surface-700 font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="recent">{t.sortBy.recent}</option>
              <option value="popular">{t.sortBy.popular}</option>
              <option value="oldest">{t.sortBy.oldest}</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <motion.div
                animate={{ rotate: isLoading ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FiChevronDown className="text-surface-400" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchTerm || selectedCategory) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 mt-4 pt-4 border-t border-surface-100"
          >
            <span className="text-sm text-surface-400 font-medium">
              {t.activeFilters}
            </span>
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                  {t.searchLabel} {searchTerm}
                  <button
                    onClick={clearSearch}
                    className="hover:text-primary-dark"
                  >
                    <FiX size={12} />
                  </button>
                </span>
              )}
              {selectedCategory && selectedCategoryName && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                  {t.categoryLabel} {selectedCategoryName}
                  <button
                    onClick={clearCategory}
                    className="hover:text-primary-dark"
                  >
                    <FiX size={12} />
                  </button>
                </span>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
