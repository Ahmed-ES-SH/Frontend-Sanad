import { getSharedMetadata } from "@/app/helpers/getSharedMetadata";
import { getTranslations } from "@/app/helpers/getTranslations";
import { getProjectBySlug } from "@/app/actions/portfolioActions";
import ClientProject from "@/app/components/website/portfolio/_projectPage/ClientProject";
import { ProjectNotFound } from "@/app/components/website/portfolio/_projectPage/ProjectNotFound";

interface PageParams {
  params: Promise<{ local: string; projectTitle: string }>;
}

export async function generateMetadata({ params }: PageParams) {
  const { local, projectTitle } = await params;
  const translations = getTranslations(local ?? "en");
  const sharedMetadata = getSharedMetadata(
    local ?? "en",
    translations.portfolioMeta?.title,
    translations.portfolioMeta?.description,
  );

  try {
    const project = await getProjectBySlug(projectTitle);
    return {
      title: `${project.title} — Sanad`,
      description: project.shortDescription,
      ...sharedMetadata,
    };
  } catch {
    return {
      title: translations.portfolioMeta?.title || "Project — Sanad",
      description:
        translations.portfolioMeta?.description ||
        "Explore our delivered projects.",
      ...sharedMetadata,
    };
  }
}

export default async function ProjectPage({ params }: PageParams) {
  const { projectTitle } = await params;

  const project = await getProjectBySlug(projectTitle);

  if (!project) return <ProjectNotFound />;

  return <ClientProject project={project} />;
}
