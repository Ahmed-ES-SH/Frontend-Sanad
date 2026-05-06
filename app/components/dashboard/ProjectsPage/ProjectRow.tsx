"use client";

import { Project } from "@/app/types/project";
import Link from "next/link";
import Image from "next/image";
import { FiImage, FiEdit, FiTrash2, FiExternalLink } from "react-icons/fi";
import { FaStar, FaRegStar } from "react-icons/fa";

interface ProjectRowProps {
  project: Project;
  index: number;
  onDelete: (project: Project) => void;
}

export default function ProjectRow({ project, index, onDelete }: ProjectRowProps) {
  return (
    <tr className="hover:bg-stone-50/80 transition-colors group bg-white">
      <td className="py-4 px-6">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone-100 border border-[var(--surface-card-border)] flex-shrink-0 flex items-center justify-center shadow-surface-sm">
            {project.coverImageUrl ? (
              <Image
                src={project.coverImageUrl}
                alt={project.title}
                fill
                className="object-cover"
              />
            ) : (
              <FiImage className="w-5 h-5 text-stone-400" />
            )}
          </div>
          <div>
            <h3 className="font-plus-jakarta font-semibold text-stone-900 group-hover:text-[var(--primary)] transition-colors">
              {project.title}
            </h3>
            <p className="font-inter text-xs text-stone-500 truncate max-w-[250px]">
              {project.shortDescription}
            </p>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--surface-50)] text-stone-700 font-inter border border-[var(--surface-card-border)]">
          {project.category?.name || "Uncategorized"}
        </span>
      </td>
      <td className="py-4 px-6">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium font-inter border ${
            project.isPublished
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-stone-50 text-stone-600 border-stone-200"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              project.isPublished ? "bg-emerald-500" : "bg-stone-400"
            }`}
          ></span>
          {project.isPublished ? "Published" : "Draft"}
        </span>
      </td>
      <td className="py-4 px-6">
        <button
          className={`p-1.5 rounded-md transition-colors ${
            project.isFeatured
              ? "text-amber-500 bg-amber-50"
              : "text-stone-400 hover:text-amber-500 hover:bg-stone-50"
          }`}
          title={project.isFeatured ? "Featured" : "Not Featured"}
        >
          {project.isFeatured ? (
            <FaStar className="w-5 h-5" />
          ) : (
            <FaRegStar className="w-5 h-5" />
          )}
        </button>
      </td>
      <td className="py-4 px-6 text-end">
        <div className="flex items-center justify-end gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-stone-400 hover:text-[var(--primary)] hover:bg-orange-50 rounded-lg transition-colors"
              title="View Live Site"
            >
              <FiExternalLink className="w-4 h-4" />
            </a>
          )}
          <Link
            href={`/dashboard/projects/${project.id}/edit`}
            className="p-2 text-stone-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
            title="Edit Project"
          >
            <FiEdit className="w-4 h-4" />
          </Link>
          <button
            onClick={() => onDelete(project)}
            className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Project"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}