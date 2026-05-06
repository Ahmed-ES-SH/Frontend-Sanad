"use client";

export function ArticleSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200/50 overflow-hidden animate-pulse">
      <div className="h-48 bg-linear-to-br from-stone-200 to-stone-100 relative">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
      </div>
      <div className="p-5 space-y-3">
        <div className="flex justify-between">
          <div className="h-3 w-16 bg-stone-200 rounded-full" />
          <div className="h-3 w-20 bg-stone-200 rounded-full" />
        </div>
        <div className="h-5 bg-stone-200 rounded-lg w-3/4" />
        <div className="h-5 bg-stone-200 rounded-lg w-1/2" />
        <div className="h-10 bg-stone-100 rounded-lg w-full mt-4" />
        <div className="flex items-center gap-2 mt-4">
          <div className="w-6 h-6 bg-stone-200 rounded-full" />
          <div className="h-3 w-24 bg-stone-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}