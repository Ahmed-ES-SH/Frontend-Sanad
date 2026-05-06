"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Article } from "@/app/types/blog";
import { useLocale } from "@/app/hooks/useLocale";
import { directionMap } from "@/app/constants/global";
import { useAppQuery } from "@/app/hooks/useAppQuery";
import { BLOG_ENDPOINTS } from "@/app/constants/endpoints";

import BlogHeadPage from "./HeadPage";
import BlogSearchAndFilter from "./SearchAndFilter";
import BlogGrid from "./BlogGrid";
import BlogPagination from "./BlogPagination";
import BlogSidebar from "./BlogSidebar";

interface BlogPageProps {
  initialArticles: Article[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
}

export default function BlogPage({
  initialArticles,
  totalPosts,
  totalPages,
  currentPage,
}: BlogPageProps) {
  const locale = useLocale();
  const searchParams = useSearchParams();

  // Read filter params from URL
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("categoryId") || "",
  );
  const [selectedTag, setSelectedTag] = useState(searchParams.get("tag") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "recent");

  const [page, setPage] = useState(currentPage);
  const [hasClientFetched, setHasClientFetched] = useState(false);

  // No need to sync with initialArticles to disable loading, as useAppQuery handles its own loading state.
  // Sync filter state with URL params when they change externally (only on mount really)
  useEffect(() => {
    const handleSearch = (term: string) => {
      setSearchTerm(term);
    };
    const handleCategory = (categoryId: string) => {
      setSelectedCategory(categoryId);
    };
    const handleTag = (tag: string) => {
      setSelectedTag(tag);
    };
    const handleSort = (sort: string) => {
      setSortBy(sort);
    };
    handleSearch(searchParams.get("search") || "");
    handleCategory(searchParams.get("categoryId") || "");
    handleTag(searchParams.get("tag") || "");
    handleSort(searchParams.get("sortBy") || "recent");
  }, [searchParams]);

  // Build query string for the API
  const queryParams = new URLSearchParams();
  if (page > 1) queryParams.set("page", page.toString());
  if (searchTerm) queryParams.set("search", searchTerm);
  if (selectedCategory) queryParams.set("categoryId", selectedCategory);
  if (selectedTag) queryParams.set("tag", selectedTag);
  if (sortBy) {
    const sortQuery =
      sortBy === "recent"
        ? "createdAt"
        : sortBy === "popular"
          ? "viewsCount"
          : "createdAt";
    const orderQuery = sortBy === "oldest" ? "ASC" : "DESC";
    queryParams.set("sortBy", sortQuery);
    queryParams.set("order", orderQuery);
  }

  // Client-side fetching using useAppQuery
  const { data: queryData, isLoading: isQueryLoading } = useAppQuery<{
    data: Article[];
    meta: { total: number; page: number; totalPages: number };
  }>({
    queryKey: [
      "blog-published",
      page,
      searchTerm,
      selectedCategory,
      selectedTag,
      sortBy,
    ],
    endpoint: `${BLOG_ENDPOINTS.LIST_PUBLISHED}?${queryParams.toString()}`,
    enabled: hasClientFetched,
  });

  const displayArticles =
    hasClientFetched && queryData ? queryData.data : initialArticles;
  const displayTotalPosts =
    hasClientFetched && queryData ? queryData.meta.total : totalPosts;
  const displayTotalPages =
    hasClientFetched && queryData ? queryData.meta.totalPages : totalPages;
  const displayCurrentPage =
    hasClientFetched && queryData ? queryData.meta.page : page;
  const isLoading = hasClientFetched && isQueryLoading;

  const updateFilters = (params: Record<string, string | number | null>) => {
    setHasClientFetched(true);

    // Update URL params
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, value.toString());
      }
    });

    // Always reset to page 1 when filters change (except when page itself is changed)
    if (!params.page) {
      newParams.set("page", "1");
      setPage(1);
    } else {
      setPage(params.page as number);
    }

    if (params.search !== undefined)
      setSearchTerm((params.search as string) || "");
    if (params.categoryId !== undefined)
      setSelectedCategory((params.categoryId as string) || "");
    if (params.tag !== undefined) setSelectedTag((params.tag as string) || "");
    if (params.sortBy !== undefined)
      setSortBy((params.sortBy as string) || "recent");

    // Shallow update URL
    window.history.pushState({}, "", `/${locale}/blog?${newParams.toString()}`);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // Backend supports search by title
    updateFilters({ search: term });
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Only clear tag if we're setting a new category (not when clearing)
    if (categoryId) {
      updateFilters({ categoryId, tag: null });
    } else {
      updateFilters({ categoryId: null });
    }
  };

  const handleSort = (sort: string) => {
    // We handle translation to API params directly in useAppQuery,
    // so we just update the sortBy state.
    updateFilters({ sortBy: sort });
  };

  const handlePageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    updateFilters({ page });
  };

  return (
    <div
      dir={directionMap[locale]}
      className="min-h-screen pt-24 bg-surface-50"
    >
      <BlogHeadPage />

      <main className="c-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <BlogSearchAndFilter
              searchTerm={searchTerm}
              setSearchTerm={handleSearch}
              sortBy={sortBy}
              setSortBy={handleSort}
              totalResults={displayTotalPosts}
              isLoading={isLoading}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />

            <BlogGrid posts={displayArticles} isLoading={isLoading} />

            {!isLoading && displayTotalPages > 1 && (
              <BlogPagination
                currentPage={displayCurrentPage}
                totalPages={displayTotalPages}
                onPageChange={handlePageChange}
                isLoading={isLoading}
              />
            )}
          </div>

          <div className="lg:col-span-1">
            <BlogSidebar />
          </div>
        </div>
      </main>
    </div>
  );
}
