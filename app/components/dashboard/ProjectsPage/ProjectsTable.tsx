"use client";

import { Project } from "@/app/types/project";
import ProjectRow from "./ProjectRow";
import ProjectSkeletonRow from "./ProjectSkeletonRow";
import { SKELETON_ROWS_COUNT } from "@/app/constants/projects";

interface ProjectsTableProps {
  projects: Project[];
  isLoading: boolean;
  onDelete: (project: Project) => void;
}

export default function ProjectsTable({ projects, isLoading, onDelete }: ProjectsTableProps) {
  return (
    <div className="surface-card rounded-xl shadow-surface-md border border-[var(--surface-card-border)] overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-start border-collapse">
          <thead>
            <tr className="bg-[var(--surface-50)] border-b border-[var(--surface-card-border)]">
              <th className="font-plus-jakarta text-xs font-semibold text-stone-500 uppercase tracking-wider py-4 px-6 text-start">
                Project
              </th>
              <th className="font-plus-jakarta text-xs font-semibold text-stone-500 uppercase tracking-wider py-4 px-6 text-start">
                Category
              </th>
              <th className="font-plus-jakarta text-xs font-semibold text-stone-500 uppercase tracking-wider py-4 px-6 text-start">
                Status
              </th>
              <th className="font-plus-jakarta text-xs font-semibold text-stone-500 uppercase tracking-wider py-4 px-6 text-start">
                Featured
              </th>
              <th className="font-plus-jakarta text-xs font-semibold text-stone-500 uppercase tracking-wider py-4 px-6 text-end">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--surface-card-border)]">
            {isLoading ? (
              Array.from({ length: SKELETON_ROWS_COUNT }).map((_, idx) => (
                <ProjectSkeletonRow key={idx} index={idx} />
              ))
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-stone-500 font-inter">
                  No projects found matching your criteria.
                </td>
              </tr>
            ) : (
              projects.map((project, index) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  index={index}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}