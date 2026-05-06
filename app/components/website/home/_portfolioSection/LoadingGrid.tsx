"use client";
import ProjectCardSkeleton from "./ProjectCardSkeleton";

/**
 * A grid of skeletons to be displayed during initial load or category filtering.
 * Defaults to 8 items to fill the typical view.
 */
const LoadingGrid = () => (
  <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 w-full">
    {[...Array(8)].map((_, index) => (
      <ProjectCardSkeleton key={index} />
    ))}
  </div>
);

export default LoadingGrid;
