export default function OrderLoadingSkeleton() {
  return (
    <div className="page-bg min-h-screen">
      <div className="h-40 w-full bg-surface-100 animate-pulse rounded-2xl mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="h-64 bg-surface-100 animate-pulse rounded-2xl" />
          <div className="h-32 bg-surface-100 animate-pulse rounded-2xl" />
        </div>
        <div className="h-[500px] bg-surface-100 animate-pulse rounded-2xl" />
      </div>
    </div>
  );
}
