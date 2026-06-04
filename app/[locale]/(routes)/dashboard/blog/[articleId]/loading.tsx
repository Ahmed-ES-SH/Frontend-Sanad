import { ArticleContentSkeleton } from "@/app/components/dashboard/_articleDetails/ArticleContentSkeleton";
import { ArticleHeaderSkeleton } from "@/app/components/dashboard/_articleDetails/ArticleHeaderSkeleton";
import { ArticleStatsSkeleton } from "@/app/components/dashboard/_articleDetails/ArticleStatsSkeleton";
import { SEOMetadataSkeleton } from "@/app/components/dashboard/_articleDetails/SEOMetadataSkeleton";
import { CategoriesTagsSkeleton } from "@/app/components/dashboard/_articleDetails/CategoriesTagsSkeleton";

export default function Loading() {
  return (
    <main className="pt-8 pb-20">
      <div className="c-container">
        <div className="flex flex-col gap-10">
          <div className="space-y-8">
            <ArticleHeaderSkeleton />
            <ArticleStatsSkeleton />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <ArticleContentSkeleton />
            </div>
            <aside className="lg:col-span-4 space-y-6">
              <SEOMetadataSkeleton />
              <CategoriesTagsSkeleton />
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
