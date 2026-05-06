export default function PaymentDetailLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-stone-50">
        {/* Breadcrumb skeleton */}
        <div className="h-5 w-48 bg-stone-200 rounded animate-pulse" />

        {/* Header skeleton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="w-10 h-10 bg-stone-200 rounded-lg animate-pulse" />
            <div className="space-y-2">
              <div className="h-6 w-24 bg-stone-200 rounded-full animate-pulse" />
              <div className="h-8 w-40 bg-stone-200 rounded animate-pulse" />
              <div className="h-4 w-64 bg-stone-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-24 bg-stone-200 rounded-lg animate-pulse" />
            <div className="h-10 w-32 bg-stone-200 rounded-lg animate-pulse" />
            <div className="h-10 w-36 bg-stone-200 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* KPIs skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl border border-stone-200 space-y-3"
            >
              <div className="h-3 w-16 bg-stone-200 rounded animate-pulse" />
              <div className="h-7 w-32 bg-stone-200 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Split content skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Payment details card skeleton */}
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-stone-200">
                <div className="h-6 w-40 bg-stone-200 rounded animate-pulse" />
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="h-3 w-20 bg-stone-200 rounded animate-pulse" />
                    <div className="h-5 w-48 bg-stone-200 rounded animate-pulse" />
                    <div className="h-4 w-36 bg-stone-200 rounded animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-24 bg-stone-200 rounded animate-pulse" />
                    <div className="h-5 w-44 bg-stone-200 rounded animate-pulse" />
                    <div className="h-4 w-40 bg-stone-200 rounded animate-pulse" />
                  </div>
                </div>
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-10 bg-stone-100 rounded animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Status history skeleton */}
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-stone-200">
                <div className="h-6 w-36 bg-stone-200 rounded animate-pulse" />
              </div>
              <div className="p-6 space-y-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-4 h-4 rounded-full bg-stone-200 animate-pulse shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 w-40 bg-stone-200 rounded animate-pulse" />
                      <div className="h-3 w-64 bg-stone-200 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-6">
              <div className="h-6 w-48 bg-stone-200 rounded animate-pulse" />
              <div className="flex flex-col items-center space-y-3">
                <div className="w-20 h-20 rounded-2xl bg-stone-200 animate-pulse" />
                <div className="h-5 w-32 bg-stone-200 rounded animate-pulse" />
                <div className="h-4 w-24 bg-stone-200 rounded animate-pulse" />
              </div>
              <div className="space-y-3 pt-4 border-t border-stone-200">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-4 w-full bg-stone-200 rounded animate-pulse"
                  />
                ))}
              </div>
            </div>
            <div className="bg-stone-800 rounded-xl p-6 space-y-4">
              <div className="h-6 w-36 bg-stone-700 rounded animate-pulse" />
              <div className="h-16 bg-stone-700 rounded-xl animate-pulse" />
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-full bg-stone-700 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Audit logs skeleton */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-3">
          <div className="h-4 w-40 bg-stone-200 rounded animate-pulse" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-8 bg-stone-100 rounded animate-pulse"
            />
          ))}
        </div>
      </main>
    </div>
  );
}
