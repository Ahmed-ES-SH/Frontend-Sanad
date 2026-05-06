"use client";
import React from "react";
import { motion } from "framer-motion";
import { Project } from "@/app/types/project";
import { Locale } from "@/app/types/global";
import Img from "@/app/components/global/Img";
import ProjectThumbnail from "./ProjectThumbnail";
import LocaleLink from "../../global/LocaleLink";
import { formatTitle } from "@/app/helpers/formatTitle";

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  t: {
    view: string;
  };
}

export default function ProjectCard({ project, locale, t }: ProjectCardProps) {
  const isRTL = locale === "ar";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-[420px] w-full overflow-hidden rounded-[2rem] bg-surface-100 shadow-sm hover:shadow-surface-xl transition-all duration-500"
    >
      {/* Category Badge - Floating */}
      <div
        className={`absolute top-6 z-20 transition-all duration-500 group-hover:top-8 ${isRTL ? "right-6 group-hover:right-8" : "left-6 group-hover:left-8"}`}
      >
        <span className="bg-primary/20 backdrop-blur-sm py-1.5 px-4 text-[10px] tracking-[0.15em] uppercase text-white rounded-full border border-white/20">
          {project.category?.name ?? "category"}
        </span>
      </div>

      {/* Image or Branded Thumbnail */}
      <div className="absolute inset-0 z-0">
        {project.coverImageUrl ? (
          <Img
            src={project.coverImageUrl}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        ) : (
          <ProjectThumbnail
            title={project.title}
            category={project.category?.name || "category"}
            local={locale}
          />
        )}
        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-900/90 via-surface-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 lg:p-10">
        <div className="transform transition-transform duration-500 group-hover:-translate-y-4">
          <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-3 leading-tight tracking-tight">
            {project.title}
          </h3>

          <p className="text-sm lg:text-base text-white/70 line-clamp-2 mb-6 max-w-[90%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {project.shortDescription}
          </p>

          <div className="flex items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {project.techStack &&
                project.techStack.length > 0 &&
                project.techStack.slice(0, 2).map((skill, index) => (
                  <span
                    key={index}
                    className="text-[10px] font-bold text-primary-light uppercase tracking-wider"
                  >
                    #{skill}
                  </span>
                ))}
            </div>

            <div
              className={`h-px flex-1 bg-white/10 transform origin-left transition-transform duration-700 delay-200 ${isRTL ? "scale-x-0 group-hover:scale-x-100 origin-right" : "scale-x-0 group-hover:scale-x-100"}`}
            />

            <LocaleLink
              href={`/portfolio/${formatTitle(project.title)}`}
              className="bg-primary text-white hover:-translate-y-1 p-2 rounded-lg  text-xs font-black text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300"
            >
              {t.view}
            </LocaleLink>
          </div>
        </div>
      </div>

      {/* Interactive Border Glow */}
      <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 rounded-[2rem] transition-colors duration-500 z-30 pointer-events-none" />
    </motion.div>
  );
}
