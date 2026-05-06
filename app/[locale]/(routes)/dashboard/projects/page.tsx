import { getAdminProjects } from "@/app/actions/portfolioActions";
import { getCategories } from "@/app/actions/blogActions";
import ProjectsClientTable from "@/app/components/dashboard/ProjectsPage/ProjectsClientTable";

export default async function ProjectsPage() {
  const [projectsResult, categories] = await Promise.all([
    getAdminProjects({ page: 1, limit: 20 }),
    getCategories(),
  ]);

  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
      <ProjectsClientTable
        initialProjects={projectsResult.data}
        initialMeta={projectsResult.meta}
        categories={categories}
      />
    </main>
  );
}
