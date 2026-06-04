export function ArticleHeaderSkeleton() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-pulse">
      <div className="space-y-3 flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <div className="h-6 w-20 bg-stone-100 rounded-full" />
          <div className="h-4 w-32 bg-stone-100 rounded" />
        </div>
        <div className="h-9 w-full max-w-2xl bg-stone-200 rounded" />
      </div>
      <div className="flex items-center gap-2">
        <div className="h-9 w-24 bg-stone-100 rounded-md" />
        <div className="h-9 w-28 bg-stone-100 rounded-md" />
        <div className="h-9 w-9 bg-stone-100 rounded-md" />
        <div className="h-9 w-28 bg-primary/20 rounded-md" />
      </div>
    </div>
  );
}
