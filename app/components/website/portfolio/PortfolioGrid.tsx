"use client";
import PortfolioCard from "./PortfolioCard";
import { useTranslation } from "@/app/hooks/useTranslation";
import type { Project } from "@/app/types/project";
import EmptyProjects from "./EmptyProjects";

interface Props {
  projects: Project[];
}

export default function PortfolioGrid({ projects }: Props) {
  const t = useTranslation("portfolioPage");

  if (!projects || projects.length === 0) {
    return <EmptyProjects t={t} />;
  }

  return (
    <section className="c-container px-4 py-12 md:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <PortfolioCard
            key={`${project.id}-${index}`}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
