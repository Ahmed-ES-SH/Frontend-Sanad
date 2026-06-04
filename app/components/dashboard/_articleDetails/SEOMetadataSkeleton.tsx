export function SEOMetadataSkeleton() {
  return (
    <div className="surface-card p-5 space-y-4">
      <div className="flex items-baseline justify-between">
        <div className="h-4 w-8 bg-stone-200 rounded animate-pulse" />
        <div className="h-3 w-6 bg-stone-100 rounded animate-pulse" />
      </div>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <div className="h-3 w-20 bg-stone-200 rounded animate-pulse" />
          <div className="h-9 bg-stone-100 rounded-md animate-pulse" />
          <div className="h-3 w-48 bg-stone-100 rounded animate-pulse" />
        </div>
        <div className="space-y-1.5">
          <div className="h-3 w-24 bg-stone-200 rounded animate-pulse" />
          <div className="h-16 bg-stone-100 rounded-md animate-pulse" />
          <div className="h-3 w-16 bg-stone-100 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
