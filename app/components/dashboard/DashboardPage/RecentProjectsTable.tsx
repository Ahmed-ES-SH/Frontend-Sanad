import { getAdminProjects } from "@/app/actions/portfolioActions";
import { getTranslations } from "@/app/helpers/getTranslations";
import type { Project } from "@/app/types/project";
import type { Locale } from "@/app/types/global";
import RecentProjectsTableClient from "./RecentProjectsTableClient";

interface RecentProjectsTableProps {
  locale: Locale;
}

export default async function RecentProjectsTable({ locale }: RecentProjectsTableProps) {
  const t = getTranslations(locale, "DashboardPage")?.RecentProjectsTable ?? {};

  let projects: Project[] = [];

  try {
    const result = await getAdminProjects({ page: 1, limit: 5 });
    projects = result.data ?? [];
  } catch (err) {
    console.error("Failed to load recent projects:", err);
  }

  return (
    <RecentProjectsTableClient
      data={projects}
      title={t.title ?? "Recent Projects"}
      viewAllHref="/dashboard/projects"
      viewAllLabel={t.viewAll ?? "View All Projects"}
      emptyMessage={t.empty ?? "No projects yet."}
      translations={{
        title: t.title,
        category: t.category,
        status: t.status,
        featured: t.featured,
        date: t.date,
      }}
    />
  );
}
