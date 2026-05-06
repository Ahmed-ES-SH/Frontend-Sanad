"use client";

import { useState } from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { FiCloud, FiDollarSign, FiArrowRight } from "react-icons/fi";
import { comingSoon } from "./lib";
import { useTranslation } from "@/app/hooks/useTranslation";

//////////////////////////////////////////////////////
///////  Active deliverables / project cards with progress bars
//////////////////////////////////////////////////////

interface DeliverableProject {
  titleKey: string;
  subtitleKey: string;
  icon: React.ComponentType<{ size: number }>;
  statusTextKey: string;
  statusBg: string;
  statusTextColor: string;
  progress: number;
  progressColor: string;
}

const projects: DeliverableProject[] = [
  {
    titleKey: "cloudMigration",
    subtitleKey: "cloudMigrationSubtitle",
    icon: FiCloud,
    statusTextKey: "onTrack",
    statusBg: "bg-emerald-100",
    statusTextColor: "text-emerald-700",
    progress: 65,
    progressColor: "bg-primary",
  },
  {
    titleKey: "payrollIntegration",
    subtitleKey: "payrollIntegrationSubtitle",
    icon: FiDollarSign,
    statusTextKey: "pendingAction",
    statusBg: "bg-amber-100",
    statusTextColor: "text-amber-700",
    progress: 92,
    progressColor: "bg-accent-amber",
  },
];

const cardVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: easeOut },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2, ease: easeOut },
  },
};

export default function ActiveDeliverables() {
  const t = useTranslation("UserDashboard.ActiveDeliverables");
  const [expanded, setExpanded] = useState(false);
  const visibleProjects = expanded ? projects : [projects[0]];
  const showToggle = projects.length > 1;

  if (!projects.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-surface-400 text-lg font-bold mb-1">
          {t.emptyMessage || "No active deliverables yet"}
        </p>
        <p className="text-surface-400 text-sm">
          {t.emptyDescription || "Your active projects will appear here."}
        </p>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold tracking-tight text-surface-900">
          {t.title}
        </h3>
        <button
          onClick={() => comingSoon(t.viewAll)}
          className="text-primary text-sm font-bold flex items-center gap-1 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
          aria-label={t.viewAll}
        >
          {t.viewAll} <FiArrowRight size={14} />
        </button>
      </div>

      <AnimatePresence mode="popLayout">
        {visibleProjects.map((project) => {
          const Icon = project.icon;
          return (
            <motion.div
              key={project.titleKey}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="surface-card p-6 hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 text-white rounded-lg flex items-center justify-center bg-primary shrink-0">
                    <Icon size={24} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-surface-900 truncate">
                      {t[project.titleKey as keyof typeof t] ||
                        project.titleKey}
                    </h4>
                    <p className="text-xs text-surface-400 truncate">
                      {t[project.subtitleKey as keyof typeof t] ||
                        project.subtitleKey}
                    </p>
                  </div>
                </div>
                <span
                  className={`${project.statusBg} ${project.statusTextColor} px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase shrink-0`}
                >
                  {t[project.statusTextKey as keyof typeof t] ||
                    project.statusTextKey}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-surface-400">
                  <span>{t.progress}</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="h-2 w-full bg-surface-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${project.progressColor} rounded-full transition-all duration-700`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {showToggle && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="w-full text-primary text-sm font-bold py-2 flex items-center justify-center gap-1 hover:bg-primary/5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-expanded={expanded}
        >
          {expanded ? t.showLess : t.showMore}
        </button>
      )}
    </motion.section>
  );
}
