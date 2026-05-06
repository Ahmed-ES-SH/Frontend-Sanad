"use client";

/**
 * Service Card Skeleton Component
 * Loading placeholder for services list
 */
export function ServiceCardSkeleton() {
  return (
    <div className="bg-stone-100 rounded-xl overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="h-40 bg-stone-200" />

      {/* Content */}
      <div className="p-5 flex flex-col gap-4">
        {/* Title and description */}
        <div className="space-y-2">
          <div className="h-5 bg-stone-200 rounded w-3/4" />
          <div className="h-4 bg-stone-200 rounded w-full" />
          <div className="h-4 bg-stone-200 rounded w-2/3" />
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-2">
          {/* Manage button skeleton */}
          <div className="h-8 w-20 bg-stone-200 rounded-lg" />

          {/* Action buttons skeleton */}
          <div className="flex gap-2">
            <div className="h-10 w-10 bg-stone-200 rounded-lg" />
            <div className="h-10 w-10 bg-stone-200 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceCardSkeleton;