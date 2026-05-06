"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiEye } from "react-icons/fi";
import { useRouter } from "next/navigation";
import ShareButton from "./ShareButton";
import ProjectThumbnail from "./ProjectThumbnail";
import { Project } from "@/app/types/project";
import { formatTitle } from "@/app/helpers/formatTitle";
import Image from "next/image";

interface props {
  project: Project;
  local: "en" | "ar";
  index: number;
}

export default function MainProjectCard({ project, local, index }: props) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  const goToProject = () => {
    router.push(
      `/${local}/portfolio/${formatTitle(project.title)}?projectId=${
        project.id
      }`,
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goToProject();
    }
  };

  return (
    <motion.div
      key={project.id}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{
        opacity: { duration: 0.3, delay: index * 0.05 },
        y: { duration: 0.3, delay: index * 0.05 },
        scale: { duration: 0.3 },
        layout: { type: "spring", stiffness: 350, damping: 30 },
      }}
      role="button"
      tabIndex={0}
      aria-label={`View project: ${project.title}`}
      className="group cursor-pointer overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      style={{ borderColor: "var(--surface-200)" }}
      onClick={goToProject}
      onKeyDown={handleKeyDown}
    >
      {/* Project Image / Branded Thumbnail */}
      <div
        className="relative overflow-hidden"
        style={{ backgroundColor: "var(--surface-100)" }}
      >
        {project.coverImageUrl ? (
          imageError ? (
            <ProjectThumbnail
              title={project.title}
              category={project.category?.name as string}
              local={local}
            />
          ) : (
            <Image
              src={project.coverImageUrl}
              alt={project.title}
              className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          )
        ) : (
          <ProjectThumbnail
            title={project.title}
            category={project.category?.name ?? "category"}
            local={local}
          />
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

        {/* Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            className="bg-white p-2.5 rounded-full shadow-lg hover:bg-surface-50 transition-colors"
            style={{ color: "var(--surface-900)" }}
            aria-label="View Project"
            onClick={(e) => {
              e.stopPropagation();
              goToProject();
            }}
          >
            <FiEye className="w-5 h-5" style={{ color: "var(--primary)" }} />
          </button>
          <div onClick={(e) => e.stopPropagation()}>
            <ShareButton
              projectId={project.id}
              projectTitle={project.title}
              local={local}
            />
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-5 flex flex-col grow">
        <div className="flex items-center mb-3">
          <span
            className="px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider"
            style={{
              backgroundColor: "var(--primary-100)",
              color: "var(--primary)",
            }}
          >
            {project.category?.name}
          </span>
        </div>

        <h3
          className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1"
          style={{ color: "var(--surface-900)" }}
        >
          {project.title}
        </h3>

        <p
          className="text-sm mb-4 line-clamp-2 leading-relaxed grow"
          style={{ color: "var(--surface-500)" }}
        >
          {project.shortDescription}
        </p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack?.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 rounded text-xs font-medium"
              style={{
                backgroundColor: "var(--surface-100)",
                color: "var(--surface-500)",
              }}
            >
              {skill}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span
              className="px-2 py-0.5 rounded text-xs font-medium"
              style={{
                backgroundColor: "var(--surface-100)",
                color: "var(--surface-500)",
              }}
            >
              +{project.techStack.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
