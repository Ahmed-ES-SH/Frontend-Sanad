"use client";
import { Messages } from "@/app/hooks/useTranslation";
import { motion } from "framer-motion";
import { FiFolder, FiPlus, FiSearch } from "react-icons/fi";

interface EmptyProjectsProps {
  t: Messages["portfolioPage"];
  onAddProject?: () => void;
  showAddButton?: boolean;
}

export default function EmptyProjects({
  t,
  onAddProject,
  showAddButton = false,
}: EmptyProjectsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="relative">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative z-10"
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-primary/5   flex items-center justify-center mb-6">
            <FiFolder className="w-16 h-16 text-primary" strokeWidth={1.5} />
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="absolute -top-2 -right-2 z-20"
        >
          <div className="w-8 h-8 rounded-full bg-surface-200  flex items-center justify-center">
            <FiSearch className="w-4 h-4 text-surface-500" />
          </div>
        </motion.div>
      </div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-2xl font-bold text-surface-900  mb-2"
      >
        {t.noProjectsTitle || "No Projects Yet"}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-base text-surface-500  text-center max-w-md mb-8"
      >
        {t.noProjectsFound || "No projects found"}
      </motion.p>

      {showAddButton && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddProject}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <FiPlus className="w-5 h-5" />
          {t.addProjectButton || "Add Your First Project"}
        </motion.button>
      )}

      {/* Decorative background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg"
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </motion.div>
    </motion.div>
  );
}
