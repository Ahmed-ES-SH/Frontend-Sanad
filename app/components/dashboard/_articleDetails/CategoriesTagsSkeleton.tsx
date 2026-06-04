export function CategoriesTagsSkeleton() {
  return (
    <div className="surface-card p-5 space-y-4">
      <div className="flex items-baseline justify-between">
        <div className="h-4 w-28 bg-stone-200 rounded animate-pulse" />
        <div className="h-3 w-8 bg-stone-100 rounded animate-pulse" />
      </div>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <div className="h-3 w-14 bg-stone-200 rounded animate-pulse" />
          <div className="h-10 bg-stone-100 rounded-md animate-pulse" />
        </div>
        <div className="space-y-1.5">
          <div className="h-3 w-8 bg-stone-200 rounded animate-pulse" />
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-stone-100 rounded-md animate-pulse" />
            <div className="h-6 w-20 bg-stone-100 rounded-md animate-pulse" />
            <div className="h-6 w-14 bg-stone-100 rounded-md animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
