import {
  BlogQueryParams,
  getAdminArticles,
  getCategories,
} from "@/app/actions/blogActions";
import { ArticleGrid } from "@/app/components/dashboard/BlogPage/ArticleGrid";
import { ChartsPlaceholder } from "@/app/components/dashboard/BlogPage/ChartsPlaceholder";
import { Filters } from "@/app/components/dashboard/BlogPage/Filters";
import { KeyboardShortcutsHelp } from "@/app/components/dashboard/BlogPage/KeyboardShortcutsHelp";
import { QuickActions } from "@/app/components/dashboard/BlogPage/QuickActions";
import { StatsCards } from "@/app/components/dashboard/BlogPage/StatsCards";

interface BlogDashboardPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    categoryId?: string;
    isPublished?: string;
    sortBy?: string;
    limit?: string;
  }>;
}

export default async function BlogDashboardPage({
  searchParams,
}: BlogDashboardPageProps) {
  const params = await searchParams;
  const response = await getAdminArticles(params as unknown as BlogQueryParams);
  const categories = await getCategories();

  const { data: articles, meta } = response;

  const currentPage = meta?.page || 1;
  const totalPages = meta?.total || 0;

  return (
    <main className="pt-24 pb-12 px-8 min-h-screen bg-stone-50 text-stone-900">
      {/* Row 1: Stats Cards */}
      <StatsCards />

      {/* Row 2: Quick Actions */}
      <QuickActions />

      {/* Row 3: Charts Placeholder Layout */}
      <ChartsPlaceholder />

      {/* Row 4: Filters */}
      <Filters categories={categories} />

      {/* Row 5: Article Grid */}
      <ArticleGrid
        initialArticles={articles || []}
        totalPages={totalPages}
        currentPage={currentPage}
      />

      {/* Keyboard Shortcuts Help (hidden by default, shown on ?) */}
      <KeyboardShortcutsHelp />
    </main>
  );
}
