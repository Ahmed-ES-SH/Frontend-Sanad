"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Service } from "@/app/types/service";
import { Category, PaginationMeta } from "@/app/types/global";


import ServiceCards from "./ServiceCards";
import FilterBar from "./FilterBar";
import ChartsSection from "./ChartsSection";
import QuickActions from "./QuickActions";

interface ServicesContentProps {
  initialServices?: Service[];
  initialMeta?: PaginationMeta;
  categories: Category[];
  initialQueryParams?: {
    page?: number;
    limit?: number;
    sortBy?: "createdAt" | "updatedAt" | "title" | "order";
    order?: "ASC" | "DESC";
  };
}

export default function ServicesContent({
  initialServices = [],
  initialMeta,
  categories,
  initialQueryParams,
}: ServicesContentProps) {
  const searchParams = useSearchParams();

  // Parse URL params
  const searchQuery = searchParams.get("search") || "";
  const categoryId = searchParams.get("categoryId") || "";
  const sortBy =
    searchParams.get("sortBy") || initialQueryParams?.sortBy || "createdAt";
  const sortOrder =
    searchParams.get("order") || initialQueryParams?.order || "DESC";

  // Local state for filters
  const [search, setSearch] = useState(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState(categoryId);
  const [currentSortBy, setCurrentSortBy] = useState(sortBy);
  const [currentSortOrder, setCurrentSortOrder] = useState(sortOrder);

  // Handle filter changes from FilterBar
  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleSortChange = (newSortBy: string, newOrder: string) => {
    setCurrentSortBy(newSortBy);
    setCurrentSortOrder(newOrder);
  };

  return (
    <>
      <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-stone-50">
        {/* Page Header & Breadcrumb */}

        {/* Quick Action Cards (Bento Style) */}
        <QuickActions />

        {/* Charts Section */}
        <ChartsSection />

        {/* Search and Filter Bar */}
        <FilterBar
          categories={categories}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
          initialSearch={searchQuery}
          initialCategory={categoryId}
          initialSortBy={sortBy}
          initialOrder={sortOrder}
        />

        {/* Grid of Service Cards */}
        <ServiceCards
          initialServices={initialServices}
          initialMeta={initialMeta}
          searchQuery={search}
          categoryId={selectedCategory}
          sortBy={currentSortBy}
          sortOrder={currentSortOrder}
        />

      </main>
    </>
  );
}
