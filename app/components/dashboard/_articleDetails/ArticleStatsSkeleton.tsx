export function ArticleStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="surface-card p-6 space-y-2 animate-pulse"
        >
          <div className="h-3 w-16 bg-stone-200 rounded" />
          <div className="h-8 w-20 bg-stone-100 rounded" />
        </div>
      ))}
    </div>
  );
}