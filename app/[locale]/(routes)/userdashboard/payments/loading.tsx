import React from "react";

export default function UserPaymentsLoading() {
  return (
    <main className="mt-24 mb-12 c-container px-6 md:px-8 min-h-screen">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-8 animate-pulse">
        <div className="h-8 w-48 bg-stone-200 rounded-lg"></div>
        <div className="h-10 w-32 bg-stone-200 rounded-lg"></div>
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-stone-100 rounded-2xl border border-stone-200/50"></div>
        ))}
      </div>

      {/* Two Column Layout Skeleton */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10 animate-pulse">
        <div className="xl:col-span-2 h-64 bg-stone-100 rounded-2xl border border-stone-200/50"></div>
        <div className="lg:col-span-1 h-64 bg-stone-100 rounded-2xl border border-stone-200/50"></div>
      </div>

      {/* Transaction Table Skeleton */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200/50 overflow-hidden animate-pulse">
        <div className="p-6 border-b border-stone-200/50 flex justify-between items-center">
          <div className="h-6 w-32 bg-stone-200 rounded"></div>
        </div>
        <div className="p-8 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-stone-50 rounded-lg"></div>
          ))}
        </div>
      </div>
    </main>
  );
}
