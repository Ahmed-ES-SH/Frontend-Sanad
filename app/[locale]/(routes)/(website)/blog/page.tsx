/* eslint-disable @typescript-eslint/no-explicit-any */
import { getArticles } from "@/app/actions/blogActions";
import { getSharedMetadata } from "@/app/helpers/getSharedMetadata";
import { getTranslations } from "@/app/helpers/getTranslations";
import BlogPage from "@/app/components/website/blog/BlogPage";

export async function generateMetadata({ params }: any) {
  const { locale } = await params;
  const translations = getTranslations(locale ?? "en");

  const title = translations.blogMeta.title;
  const description = translations.blogMeta.description;

  const sharedMetadata = getSharedMetadata(locale ?? "en", title, description);

  return {
    title,
    description,
    ...sharedMetadata,
  };
}

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    categoryId?: string;
    tag?: string;
    search?: string;
  }>;
}) {
  const params = await searchParams;
  const { data: articles, meta } = await getArticles({
    page: params.page ? parseInt(params.page) : 1,
    limit: 10,
    categoryId: params.categoryId,
    tag: params.tag,
    search: params.search,
  });

  // no articles - return empty state

  if (!articles) {
    return (
      <BlogPage
        initialArticles={[]}
        totalPosts={0}
        totalPages={0}
        currentPage={1}
      />
    );
  }

  // articles are valid and meta is valid

  return (
    <BlogPage
      initialArticles={articles}
      totalPosts={meta.total}
      totalPages={meta.total}
      currentPage={meta.page}
    />
  );
}
