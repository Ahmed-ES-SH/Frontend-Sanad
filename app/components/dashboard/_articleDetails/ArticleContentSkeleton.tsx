export function ArticleContentSkeleton() {
  return (
    <div className="surface-card overflow-hidden">
      {/* Cover Image Skeleton */}
      <div className="h-[400px] w-full bg-stone-200 animate-pulse" />

      {/* Content Skeleton */}
      <div className="p-8 space-y-6">
        {/* Excerpt Skeleton */}
        <div className="space-y-3">
          <div className="h-5 w-full bg-stone-100 rounded" />
          <div className="h-5 w-3/4 bg-stone-100 rounded" />
          <div className="h-5 w-1/2 bg-stone-100 rounded" />
        </div>

        {/* Full Content Skeleton */}
        <div className="space-y-4 pt-4">
          <div className="h-4 w-full bg-stone-100 rounded" />
          <div className="h-4 w-full bg-stone-100 rounded" />
          <div className="h-4 w-5/6 bg-stone-100 rounded" />
          <div className="h-4 w-full bg-stone-100 rounded" />
          <div className="h-4 w-4/5 bg-stone-100 rounded" />
          <div className="h-4 w-1/2 bg-stone-100 rounded" />
        </div>

        {/* Author Info Skeleton */}
        <div className="flex items-center gap-4 pt-8 border-t border-stone-100 mt-8">
          <div className="w-12 h-12 bg-stone-100 rounded-full" />
          <div className="space-y-2">
            <div className="h-4 w-20 bg-stone-100 rounded" />
            <div className="h-3 w-32 bg-stone-100 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}