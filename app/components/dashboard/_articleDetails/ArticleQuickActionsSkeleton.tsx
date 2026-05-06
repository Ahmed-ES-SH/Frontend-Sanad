export function ArticleQuickActionsSkeleton() {
  return (
    <div className="flex flex-wrap items-center gap-3 p-2 bg-stone-100/50 rounded-xl overflow-x-auto">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-9 w-28 bg-stone-100 rounded-lg animate-pulse"
        />
      ))}
    </div>
  );
}