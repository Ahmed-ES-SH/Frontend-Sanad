"use client";
import { FiArrowUpRight } from "react-icons/fi";
import { useTranslation } from "@/app/hooks/useTranslation";
import { formatTitle } from "@/app/helpers/formatTitle";
import { motion } from "framer-motion";

import type { Project } from "@/app/types/project";
import Img from "../../global/Img";
import LocaleLink from "../../global/LocaleLink";

interface Props {
  project: Project;
  index: number;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function PortfolioCard({ project, index }: Props) {
  const t = useTranslation("portfolioPage");

  const projectHref = project.slug ? project.slug : formatTitle(project.title);

  // Use standard sizes for all cards
  const imageSizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="group  relative overflow-hidden rounded-2xl border 
             transition-[transform,border-color,box-shadow] duration-300
             bg-[var(--surface-card-bg)] border-[var(--surface-card-border)]
             hover:border-[var(--surface-card-border-hover)] 
             hover:shadow-lg hover:-translate-y-1"
    >
      <LocaleLink href={`/portfolio/${projectHref}`} className="block">
        <div className="relative overflow-hidden aspect-16/10">
          <Img
            src={project.coverImageUrl || project.images?.[0] || ""}
            alt={project.title}
            className="w-full h-full object-cover"
            loading={index < 2 ? "eager" : "lazy"}
            priority={index < 2}
            sizes={imageSizes}
          />
          {/* Category tag */}
          <div
            className="absolute top-3 start-3 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              color: "var(--surface-700)",
              backdropFilter: "none",
            }}
          >
            {project.category?.name || t.other}
          </div>
          {/* Arrow icon */}
          <div
            className="absolute top-3 end-3 w-9 h-9 rounded-full flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
            style={{ backgroundColor: "var(--primary)" }}
          >
            <FiArrowUpRight size={16} color="white" />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3
            className="heading-sm font-display mb-1.5 truncate"
            style={{ color: "var(--surface-900)" }}
          >
            {project.title}
          </h3>
          <p
            className="body-sm line-clamp-2 mb-3"
            style={{ color: "var(--surface-500)" }}
          >
            {project.shortDescription}
          </p>

          {/* Metrics */}
          <div className="flex items-center gap-4">
            {project.techStack?.slice(0, 2).map((tech, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span
                  className="text-xs font-medium px-2 py-1 rounded-md"
                  style={{
                    backgroundColor: "var(--surface-100)",
                    color: "var(--surface-600)",
                  }}
                >
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </LocaleLink>
    </motion.div>
  );
}
