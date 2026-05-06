import { Category } from "@/app/types/global";
import React from "react";
import { FiSearch, FiFilter } from "react-icons/fi";

interface ProjectsFilterBarProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function ProjectsFilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: ProjectsFilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 surface-card p-4 rounded-xl shadow-surface-sm border border-[var(--surface-card-border)] bg-[var(--surface-50)] w-full">
      <div className="flex flex-1 flex-col sm:flex-row items-center gap-4 w-full">
        {/* Search Input */}
        <div className="relative flex-1/2 w-full">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 rtl:right-3 rtl:left-auto" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full ps-10 pe-4 py-2 rounded-lg bg-white border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all font-inter text-sm text-stone-900 placeholder:text-stone-400 rtl:pe-10 rtl:ps-4"
          />
        </div>

        {/* Category Filter */}
        <div className="relative w-full sm:w-auto flex-shrink-0">
          <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 rtl:right-3 rtl:left-auto" />
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="appearance-none w-full sm:w-auto ps-10 pe-8 py-2 rounded-lg bg-white border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all font-inter text-sm text-stone-900 cursor-pointer rtl:pe-10 rtl:ps-8"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
