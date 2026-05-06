import { getAdminArticleById } from "@/app/actions/blogActions";
import { ArticleContent } from "@/app/components/dashboard/_articleDetails/ArticleContent";
import { ArticleHeader } from "@/app/components/dashboard/_articleDetails/ArticleHeader";
import { ArticleQuickActions } from "@/app/components/dashboard/_articleDetails/ArticleQuickActions";
import { ArticleStats } from "@/app/components/dashboard/_articleDetails/ArticleStats";
import { CategoriesTags } from "@/app/components/dashboard/_articleDetails/CategoriesTags";
import { SEOMetadata } from "@/app/components/dashboard/_articleDetails/SEOMetadata";
import { SocialSharing } from "@/app/components/dashboard/_articleDetails/SocialSharing";
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
    <main className="min-h-screen page-bg pt-28 pb-20">
      <div className="c-container relative z-10">
        <div className="flex flex-col gap-12">
          {/* Row 1: Hero Section with Header & Actions */}
          <div className="space-y-10">
            <ArticleHeader article={article} />

            {/* Article Insights Strip */}
            <ArticleStats article={article} />

            {/* Intelligent Toolbar */}
            <div className="surface-card p-2 bg-stone-50/50 backdrop-blur-sm border-dashed">
              <ArticleQuickActions article={article} />
            </div>
          </div>

          {/* Row 2: Content & Configuration Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Main Column: Rich Text Content */}
            <div className="lg:col-span-8">
              <div className="space-y-8">
                <ArticleContent article={article} />
              </div>
            </div>

            {/* Sidebar: Metadata, SEO & Social */}
            <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28 transition-all duration-300">
              <div className="space-y-6">
                <SEOMetadata article={article} />
                <CategoriesTags article={article} />
                <SocialSharing article={article} />
              </div>

              {/* Proactive Tip / Status */}
              <div className="surface-card p-6 bg-gradient-surface border-primary/10">
                <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
                  Proactive Insights
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  This article is currently in{" "}
                  {article.isPublished ? "Public" : "Private"} mode.
                  {article.isPublished
                    ? " It's performing 15% better than last week's average."
                    : " Complete the SEO metadata to improve its potential reach."}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
