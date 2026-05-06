export default function ServiceDetailsLoading() {
  return (
    <div className="min-h-screen bg-stone-50 animate-pulse">
      {/* Top Navbar skeleton */}
      <div className="h-16 bg-stone-100 border-b border-stone-200" />

      <main className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
        {/* Service Header skeleton */}
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="space-y-3">
            <div className="h-9 w-64 bg-stone-200 rounded" />
            <div className="h-5 w-40 bg-stone-200 rounded" />
          </div>
          <div className="flex gap-3">
            <div className="h-10 w-32 bg-stone-200 rounded-xl" />
            <div className="h-10 w-32 bg-stone-200 rounded-xl" />
          </div>
        </div>

        {/* Stats Grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-stone-200 rounded-2xl" />
          ))}
        </div>

        {/* Main Columns skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="h-40 bg-stone-200 rounded-xl" />
            <div className="h-64 bg-stone-200 rounded-xl" />
            <div className="h-80 bg-stone-200 rounded-xl" />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="h-48 bg-stone-200 rounded-xl" />
            <div className="h-56 bg-stone-200 rounded-xl" />
            <div className="h-36 bg-stone-200 rounded-xl" />
          </div>
        </div>
      </main>
    </div>
  );
}