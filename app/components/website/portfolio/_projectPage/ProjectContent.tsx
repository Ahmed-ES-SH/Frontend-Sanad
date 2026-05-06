"use client";
import type { Messages } from "@/app/hooks/useTranslation";
import type { Project } from "@/app/types/project";
import { RevealSection, SectionLabel } from "./SectionBasics";
import { TechBadge } from "./TechBadge";

interface ProjectContentProps {
  project: Project;
  t: Messages["ProjectPage"];
}

export default function ProjectContent({ project, t }: ProjectContentProps) {
  const techStack = project.techStack ?? [];
  const allImages = project.images ?? [];

  return (
    <>
      {project.longDescription && (
        <RevealSection className="c-container px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <SectionLabel label={t.overview} />
            <p
              className="body-lg leading-[1.8]"
              style={{ color: "var(--surface-600)" }}
            >
              {project.longDescription}
            </p>
          </div>
        </RevealSection>
      )}

      {/* Divider */}
      <div className="c-container px-4">
        <div className="border-t border-surface-200" />
      </div>

      {/* ── Tech Stack ────────────────────────────────── */}
      {techStack.length > 0 && (
        <RevealSection className="c-container px-4 py-14 md:py-20">
          <SectionLabel label={t.technologiesUsed} />
          <div className="flex flex-wrap gap-3">
            {techStack.map((tool, index) => (
              <TechBadge key={tool} tool={tool} index={index} />
            ))}
          </div>
        </RevealSection>
      )}

      {/* Divider */}
      {allImages.length > 0 && (
        <div className="c-container px-4">
          <div className="border-t border-surface-200" />
        </div>
      )}
    </>
  );
}
