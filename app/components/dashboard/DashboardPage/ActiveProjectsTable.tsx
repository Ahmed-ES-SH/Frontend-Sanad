"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { motion } from "framer-motion";

//////////////////////////////////////////////////////
///////  Mock project data — in production this comes from API
///////  Status keys map to translation keys for i18n support
//////////////////////////////////////////////////////
interface DashboardProject {
  name: string;
  client: string;
  statusKey: string;
  statusColor: string;
  deadline: string;
}

const projects: DashboardProject[] = [
  {
    name: "Villa K-92 Design",
    client: "Ahmed Al-Sayed",
    statusKey: "inProgress",
    statusColor: "bg-orange-100 text-orange-700",
    deadline: "Oct 24, 2023",
  },
  {
    name: "Downtown Tech Hub",
    client: "Global Nexus",
    statusKey: "review",
    statusColor: "bg-amber-100 text-amber-700",
    deadline: "Nov 12, 2023",
  },
  {
    name: "Urban Garden Park",
    client: "City Council",
    statusKey: "drafting",
    statusColor: "bg-stone-100 text-stone-700",
    deadline: "Dec 05, 2023",
  },
  {
    name: "Luxury Marina Suites",
    client: "Marina Corp",
    statusKey: "inProgress",
    statusColor: "bg-orange-100 text-orange-700",
    deadline: "Oct 30, 2023",
  },
];

export default function ActiveProjectsTable() {
  const t = useTranslation("DashboardPage.ActiveProjectsTable");
  const isEmpty = projects.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" as const }}
      className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden"
    >
      {isEmpty ? (
        <div className="p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-stone-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-stone-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h4 className="text-stone-900 font-medium mb-2">{t.emptyTitle}</h4>
          <p className="text-stone-500 text-sm mb-4">{t.emptySubtitle}</p>
          <button className="text-orange-600 text-sm font-medium hover:text-orange-700">
            {t.newProjectBtn}
          </button>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-stone-900">{t.title}</h3>
            <button className="text-orange-600 text-sm font-medium hover:text-orange-700 hover:underline">
              {t.viewAll}
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-stone-50/50">
                  <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                    {t.projectName}
                  </th>
                  <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                    {t.client}
                  </th>
                  <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                    {t.status}
                  </th>
                  <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-stone-500 text-right">
                    {t.deadline}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {projects.map((project) => (
                  <tr
                    key={project.name}
                    className="hover:bg-stone-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-stone-900">
                      {project.name}
                    </td>
                    <td className="px-6 py-4 text-stone-600">
                      {project.client}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${project.statusColor}`}
                      >
                        {project.statusKey}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-stone-600">
                      {project.deadline}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </motion.div>
  );
}
