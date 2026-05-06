export default function loading() {
  return (
    <div className="p-8 space-y-8 animate-pulse">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 bg-stone-200 rounded"></div>
          <div className="h-4 w-4 bg-stone-200 rounded"></div>
          <div className="h-4 w-24 bg-orange-200 rounded"></div>
        </div>
        <div className="h-10 w-64 bg-stone-200 rounded"></div>
      </div>

      {/* Quick Actions skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-40 bg-stone-200 rounded-xl"></div>
        ))}
      </div>

      {/* Charts skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-80 bg-stone-200 rounded-xl"></div>
        <div className="h-80 bg-stone-200 rounded-xl"></div>
      </div>

      {/* Filters skeleton */}
      <div className="h-16 bg-stone-200 rounded-xl"></div>

      {/* Service Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-stone-200 rounded-xl overflow-hidden">
            <div className="h-40 bg-stone-300"></div>
            <div className="p-5 space-y-3">
              <div className="h-4 w-3/4 bg-stone-300 rounded"></div>
              <div className="h-3 w-full bg-stone-300 rounded"></div>
              <div className="h-3 w-2/3 bg-stone-300 rounded"></div>
              <div className="flex justify-between pt-2">
                <div className="h-6 w-16 bg-stone-300 rounded"></div>
                <div className="h-8 w-20 bg-stone-300 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
