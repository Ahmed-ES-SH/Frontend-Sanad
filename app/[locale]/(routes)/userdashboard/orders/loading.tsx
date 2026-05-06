import React from "react";

function OrderSkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-surface-sm border border-surface-200/50 animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-start mb-6 gap-2">
        <div className="space-y-2 flex-1">
          <div className="h-3 w-24 bg-surface-200 rounded" />
          <div className="h-5 w-3/4 bg-surface-200 rounded" />
        </div>
        <div className="h-6 w-20 bg-surface-200 rounded-full" />
      </div>

      {/* Details */}
      <div className="space-y-4 mt-auto">
        <div className="flex justify-between items-center">
          <div className="h-4 w-20 bg-surface-200 rounded" />
          <div className="h-4 w-24 bg-surface-200 rounded" />
        </div>
        <div className="flex justify-between items-center">
          <div className="h-4 w-16 bg-surface-200 rounded" />
          <div className="h-6 w-20 bg-surface-200 rounded" />
        </div>
        {/* Button skeleton */}
        <div className="h-11 w-full bg-surface-200 rounded-xl mt-2" />
      </div>
    </div>
  );
}

export default function UserOrdersLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-50">
      {/* Header skeleton */}
      <div className="h-16 bg-white border-b border-surface-200/50" />

      <main className="flex-1 px-4 md:px-8 py-10 w-full space-y-8">
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-10 w-64 bg-surface-200 rounded animate-pulse" />
          <div className="h-5 w-96 bg-surface-100 rounded animate-pulse" />
        </div>

        {/* Filters skeleton */}
        <div className="bg-white rounded-2xl p-4 shadow-surface-sm border border-surface-200/50 flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-grow w-full">
            <div className="h-12 bg-surface-100 rounded-xl animate-pulse" />
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-10 w-20 bg-surface-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <OrderSkeletonCard key={i} />
          ))}
        </div>
      </main>
    </div>
  );
}