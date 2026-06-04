export function ArticleContentSkeleton() {
  return (
    <div className="surface-card overflow-hidden">
      <div className="flex items-center justify-end px-5 pt-4">
        <div className="h-5 w-20 bg-stone-100 rounded animate-pulse" />
      </div>
      <div className="h-72 sm:h-96 w-full bg-stone-200 animate-pulse" />

      <div className="px-6 sm:px-8 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-3 w-24 bg-stone-100 rounded animate-pulse" />
          <div className="h-3 w-1 bg-stone-200 rounded animate-pulse" />
          <div className="h-3 w-16 bg-stone-100 rounded animate-pulse" />
        </div>

        <div className="space-y-3">
          <div className="h-5 w-full bg-stone-100 rounded animate-pulse" />
          <div className="h-5 w-3/4 bg-stone-100 rounded animate-pulse" />
        </div>

        <div className="space-y-3">
          <div className="h-4 w-full bg-stone-100 rounded animate-pulse" />
          <div className="h-4 w-full bg-stone-100 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-stone-100 rounded animate-pulse" />
          <div className="h-4 w-full bg-stone-100 rounded animate-pulse" />
          <div className="h-4 w-4/5 bg-stone-100 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
