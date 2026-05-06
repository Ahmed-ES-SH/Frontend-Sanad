/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from "react";
import { getSharedMetadata } from "@/app/helpers/getSharedMetadata";
import { BLOG_ENDPOINTS } from "@/app/constants/endpoints";
import { Article } from "@/app/types/blog";
import { getTranslations } from "@/app/helpers/getTranslations";
import { getArticleBySlug } from "@/app/actions/blogActions";
import { globalRequest } from "@/app/helpers/globalRequest";
import ArticleDetailsPage from "@/app/components/website/blog/_articlePage/ArticleDetailsPage";
import Loading from "@/app/components/global/Loading";
import ArticleNotFound from "@/app/components/website/blog/_articlePage/ArticleNotFound";

export async function generateMetadata({ params }: any) {
  const { locale, articleTitle } = await params;
  const translations = getTranslations(locale ?? "en");
  const sharedMetadata = getSharedMetadata(
    locale ?? "en",
    translations.blogMeta.title,
    translations.blogMeta.description,
  );

  try {
    const article = await getArticleBySlug(articleTitle);
    return {
      title: `Sanad Post - ${article.title}`,
      description: article.excerpt || "",
      ...sharedMetadata,
    };
  } catch {
    return {
      title: translations.blogMeta.title,
      description: translations.blogMeta.description,
      ...sharedMetadata,
    };
  }
}

export default async function ArticlePage({ params }: any) {
  const { articleTitle } = await params;
  const response = await globalRequest<{ data: Article[] }>({
    method: "GET",
    endpoint: BLOG_ENDPOINTS.LIST_PUBLISHED,
  });

  const { data: relatedArticles } = response.data;

  const article = await getArticleBySlug(articleTitle);

  if (!article) return <ArticleNotFound />;

  return (
    <Suspense fallback={<Loading />}>
      <ArticleDetailsPage
        article={article}
        relatedArticles={relatedArticles ?? []}
      />
    </Suspense>
  );
}
