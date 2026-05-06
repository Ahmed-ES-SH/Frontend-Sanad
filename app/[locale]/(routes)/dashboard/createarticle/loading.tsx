import { motion } from "framer-motion";

export default function Loading() {
  return (
    <main className="pt-24 pb-12 px-8 min-h-screen bg-stone-50 text-stone-900">
      {/* Header Skeleton */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between mb-8 animate-pulse"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-stone-200 rounded-lg" />
          <div>
            <div className="h-8 w-48 bg-stone-200 rounded" />
            <div className="h-4 w-32 bg-stone-100 rounded mt-2" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-24 bg-stone-100 rounded-lg" />
          <div className="h-10 w-32 bg-stone-200 rounded-lg" />
        </div>
      </motion.section>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Title */}
          <div className="surface-card p-6 space-y-2 animate-pulse">
            <div className="h-4 w-24 bg-stone-200 rounded" />
            <div className="h-10 w-full bg-stone-100 rounded" />
          </div>

          {/* Content */}
          <div className="surface-card p-6 space-y-2 animate-pulse">
            <div className="h-4 w-24 bg-stone-200 rounded" />
            <div className="h-64 w-full bg-stone-100 rounded" />
          </div>

          {/* Excerpt */}
          <div className="surface-card p-6 space-y-2 animate-pulse">
            <div className="h-4 w-32 bg-stone-200 rounded" />
            <div className="h-24 w-full bg-stone-100 rounded" />
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Cover Image */}
          <div className="surface-card p-6 space-y-2 animate-pulse">
            <div className="h-4 w-24 bg-stone-200 rounded" />
            <div className="h-10 w-full bg-stone-100 rounded" />
          </div>

          {/* Category */}
          <div className="surface-card p-6 space-y-2 animate-pulse">
            <div className="h-4 w-20 bg-stone-200 rounded" />
            <div className="h-10 w-full bg-stone-100 rounded" />
          </div>

          {/* Tags */}
          <div className="surface-card p-6 space-y-2 animate-pulse">
            <div className="h-4 w-16 bg-stone-200 rounded" />
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-stone-100 rounded" />
              <div className="h-6 w-20 bg-stone-100 rounded" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}