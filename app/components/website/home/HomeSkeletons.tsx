import React from "react";

export function SectionSkeleton() {
  return (
    <div className="py-20 lg:py-32 animate-pulse">
      <div className="c-container">
        <div className="max-w-2xl space-y-4 mb-16">
          <div className="h-4 w-32 bg-surface-200 rounded" />
          <div className="h-16 w-full bg-surface-200 rounded" />
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-surface-100 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function PortfolioSkeleton() {
  return (
    <div className="py-20 lg:py-32 animate-pulse bg-surface-100">
      <div className="c-container">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="h-4 w-32 bg-surface-200 rounded" />
          <div className="h-12 w-96 bg-surface-200 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-80 bg-surface-200 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function BlogSkeleton() {
  return (
    <div className="py-20 lg:py-32 animate-pulse">
      <div className="c-container">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-4">
            <div className="h-4 w-32 bg-surface-200 rounded" />
            <div className="h-12 w-64 bg-surface-200 rounded" />
          </div>
          <div className="h-10 w-32 bg-surface-200 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-96 bg-surface-100 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
