import { getAdminArticleById } from "@/app/actions/blogActions";
import { ArticleContent } from "@/app/components/dashboard/_articleDetails/ArticleContent";
import { ArticleHeader } from "@/app/components/dashboard/_articleDetails/ArticleHeader";
import { ArticleStats } from "@/app/components/dashboard/_articleDetails/ArticleStats";
import { CategoriesTags } from "@/app/components/dashboard/_articleDetails/CategoriesTags";
import { SEOMetadata } from "@/app/components/dashboard/_articleDetails/SEOMetadata";
import ArticleNotFound from "@/app/components/website/blog/_articlePage/ArticleNotFound";

interface ArticleDetailsPageProps {
  params: Promise<{ articleId: string; local: string }>;
}

export default async function ArticleDetailsPage({
  params,
}: ArticleDetailsPageProps) {
  const { articleId } = await params;
  const article = await getAdminArticleById(articleId);

  if (!article) return <ArticleNotFound />;

  return (
    <main className="min-h-screen bg-[#fafaf9]">
      <div className="c-container py-10 lg:py-14">
        <div className="flex flex-col gap-8 lg:gap-10">
          <div className="space-y-6">
            <ArticleHeader article={article} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-8">
              <ArticleContent article={article} />
            </div>

            <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-8">
              <SEOMetadata article={article} />
              <CategoriesTags article={article} />
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
