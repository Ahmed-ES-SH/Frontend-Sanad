"use client";
import { Project } from "@/app/types/project";
import { motion } from "framer-motion";
import { HiOutlineCode, HiOutlineExternalLink } from "react-icons/hi";
import { StatChip } from "./StatChip";
import { ProjectImage } from "./ProjectImage";
import { fadeIn, fadeUp } from "@/app/constants/animations";
import { HiOutlineCalendar, HiOutlineTag } from "react-icons/hi2";
import type { Messages } from "@/app/hooks/useTranslation";

interface ProjectHeroSectionProps {
  project: Project;
  t: Messages["ProjectPage"];
}

export default function ProjectHeroSection({
  project,
  t,
}: ProjectHeroSectionProps) {
  const coverImage = project.coverImageUrl ?? project.images?.[0] ?? null;
  const year = new Date(project.createdAt).getFullYear().toString();
  const categoryName = project.category?.name ?? t.other;
  const techStack = project.techStack ?? [];

  return (
    <section className="c-container px-4 pt-10 pb-0">
      {/* Category pill */}
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mb-5"
      >
        <span
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold"
          style={{
            background: "var(--primary-50)",
            color: "var(--primary-dark)",
            border: "1px solid var(--primary-100)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--primary)" }}
          />
          {categoryName}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h1
        custom={0.1}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="display-xl font-display max-w-4xl mb-5 leading-[1.05]"
        style={{ color: "var(--surface-900)" }}
      >
        {project.title}
      </motion.h1>

      {/* Short description */}
      <motion.p
        custom={0.2}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="body-lg max-w-2xl mb-8"
        style={{ color: "var(--surface-500)" }}
      >
        {project.shortDescription}
      </motion.p>

      {/* Stats row */}
      <motion.div
        custom={0.28}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="flex flex-wrap gap-3 mb-10"
      >
        <StatChip
          icon={<HiOutlineCalendar size={16} />}
          label={t.year}
          value={year}
        />
        <StatChip
          icon={<HiOutlineTag size={16} />}
          label={t.category}
          value={categoryName}
        />
        {techStack.length > 0 && (
          <StatChip
            icon={<HiOutlineCode size={16} />}
            label={t.techUsed}
            value={`${techStack.length} ${t.technologies}`}
          />
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            style={{
              background: "var(--gradient-primary)",
              color: "white",
              boxShadow: "0 4px 14px rgba(249,115,22,0.35)",
            }}
          >
            <HiOutlineExternalLink size={16} />
            {t.liveProject}
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            style={{
              background: "var(--surface-card-bg)",
              border: "1px solid var(--surface-card-border)",
              color: "var(--surface-700)",
            }}
          >
            <HiOutlineCode size={16} />
            {t.sourceCode}
          </a>
        )}
      </motion.div>

      {/* Cover Image */}
      {coverImage && (
        <motion.div
          custom={0.35}
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="rounded-2xl shadow-surface-xl border border-surface-200 overflow-hidden"
        >
          <ProjectImage
            src={coverImage}
            alt={project.title}
            aspect="aspect-[16/9] lg:aspect-[2.4/1]"
            priority
          />
        </motion.div>
      )}
    </section>
  );
}
