import { getAdminArticles } from "@/app/actions/blogActions";
import { getTranslations } from "@/app/helpers/getTranslations";
import type { Article } from "@/app/types/blog";
import type { Locale } from "@/app/types/global";
import RecentArticlesTableClient from "./RecentArticlesTableClient";

interface RecentArticlesTableProps {
  locale: Locale;
}

export default async function RecentArticlesTable({ locale }: RecentArticlesTableProps) {
  const t = getTranslations(locale, "DashboardPage")?.RecentArticlesTable ?? {};

  let articles: Article[] = [];

  try {
    const result = await getAdminArticles({ page: 1, limit: 5 });
    articles = result.data ?? [];
  } catch (err) {
    console.error("Failed to load recent articles:", err);
  }

  return (
    <RecentArticlesTableClient
      data={articles}
      title={t.title ?? "Recent Articles"}
      viewAllHref="/dashboard/blog"
      viewAllLabel={t.viewAll ?? "View All Articles"}
      emptyMessage={t.empty ?? "No articles yet."}
      translations={{
        title: t.title,
        views: t.views,
        readTime: t.readTime,
        status: t.status,
        date: t.date,
      }}
    />
  );
}
