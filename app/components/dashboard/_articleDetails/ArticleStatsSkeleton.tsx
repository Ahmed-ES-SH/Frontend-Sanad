export function ArticleStatsSkeleton() {
  return (
    <dl className="grid grid-cols-2 gap-3">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="bg-white border border-stone-200 rounded-lg px-4 py-3 animate-pulse"
        >
          <div className="h-3 w-12 bg-stone-100 rounded" />
          <div className="h-6 w-16 bg-stone-100 rounded mt-2" />
        </div>
      ))}
    </dl>
  );
}
