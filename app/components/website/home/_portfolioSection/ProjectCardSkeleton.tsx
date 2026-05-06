"use client";
import { motion } from "framer-motion";

/**
 * Skeleton loader for project cards to show while data is fetching.
 * Uses a shimmer effect for a premium loading experience.
 */
const ProjectCardSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="bg-surface-50 rounded-2xl overflow-hidden border border-surface-100"
  >
    {/* Shimmering thumbnail placeholder */}
    <div className="relative w-full h-64 bg-gradient-to-r from-surface-100 via-surface-200 to-surface-100 animate-shimmer bg-[length:200%_100%] rounded-t-2xl" />
    
    <div className="p-5 space-y-3">
      {/* Title placeholder */}
      <div className="h-6 bg-surface-200 rounded-lg w-3/4 animate-pulse" />
      {/* Description lines placeholders */}
      <div className="h-4 bg-surface-150 rounded-lg w-full animate-pulse" />
      <div className="h-4 bg-surface-150 rounded-lg w-2/3 animate-pulse" />
      
      {/* Category tags placeholders */}
      <div className="flex gap-2 pt-2">
        <div className="h-8 bg-surface-200 rounded-full w-20 animate-pulse" />
        <div className="h-8 bg-surface-200 rounded-full w-20 animate-pulse" />
      </div>
    </div>
  </motion.div>
);

export default ProjectCardSkeleton;
