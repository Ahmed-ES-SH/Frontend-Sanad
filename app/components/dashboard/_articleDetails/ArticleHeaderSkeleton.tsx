export function ArticleHeaderSkeleton() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-pulse">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-6 w-20 bg-stone-200 rounded-full" />
          <div className="h-4 w-24 bg-stone-100 rounded" />
        </div>
        <div className="h-10 w-96 bg-stone-200 rounded" />
      </div>
      <div className="flex items-center gap-3">
        <div className="h-10 w-24 bg-stone-100 rounded-lg" />
        <div className="h-10 w-28 bg-stone-100 rounded-lg" />
        <div className="h-10 w-28 bg-stone-100 rounded-lg" />
      </div>
    </div>
  );
}