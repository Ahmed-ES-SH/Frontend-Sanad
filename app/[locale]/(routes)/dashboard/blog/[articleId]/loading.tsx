import { ArticleContentSkeleton } from "@/app/components/dashboard/_articleDetails/ArticleContentSkeleton";
import { ArticleHeaderSkeleton } from "@/app/components/dashboard/_articleDetails/ArticleHeaderSkeleton";
import { ArticleQuickActionsSkeleton } from "@/app/components/dashboard/_articleDetails/ArticleQuickActionsSkeleton";
import { ArticleStatsSkeleton } from "@/app/components/dashboard/_articleDetails/ArticleStatsSkeleton";

export default function Loading() {
  return (
    <main className="pt-24 pb-12 px-8 min-h-screen bg-stone-50 text-stone-900">
      {/* Row 1: Article Header */}
      <ArticleHeaderSkeleton />

      {/* Row 2: Article Stats */}
      <ArticleStatsSkeleton />

      {/* Row 3: Quick Actions */}
      <ArticleQuickActionsSkeleton />

      {/* Row 4: Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Article Content */}
        <div className="lg:col-span-8 space-y-6">
          <ArticleContentSkeleton />
        </div>

        {/* Right Column: Metadata & Settings */}
        <div className="lg:col-span-4 space-y-6">
          {/* SEO Metadata Skeleton */}
          <div className="surface-card p-6 space-y-4 animate-pulse">
            <div className="h-4 w-24 bg-stone-200 rounded" />
            <div className="h-10 bg-stone-100 rounded" />
            <div className="h-16 bg-stone-100 rounded" />
            <div className="h-2 bg-stone-100 rounded" />
          </div>

          {/* Categories/Tags Skeleton */}
          <div className="surface-card p-6 space-y-4 animate-pulse">
            <div className="h-4 w-32 bg-stone-200 rounded" />
            <div className="h-10 bg-stone-100 rounded" />
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-stone-100 rounded" />
              <div className="h-6 w-20 bg-stone-100 rounded" />
              <div className="h-6 w-14 bg-stone-100 rounded" />
            </div>
          </div>

          {/* Social Sharing Skeleton */}
          <div className="surface-card p-6 space-y-4 animate-pulse">
            <div className="h-4 w-28 bg-stone-200 rounded" />
            <div className="h-10 bg-stone-100 rounded" />
            <div className="h-10 bg-stone-100 rounded" />
          </div>
        </div>
      </div>
    </main>
  );
}
