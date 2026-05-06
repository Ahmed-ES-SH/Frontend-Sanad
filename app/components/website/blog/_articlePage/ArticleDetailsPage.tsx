"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaTag } from "react-icons/fa";
import RelatedArticlesSlider from "./RelatedArticlesSlider";
import ArticleHeader from "./ArticleHeader";
import ArticleContent from "./ArticleContent";
import InteractionSection from "./InteractionSection";
import CommentsSection from "./CommentsSection";
import { Article } from "@/app/types/blog";
import Img from "@/app/components/global/Img";
import { useLocale } from "@/app/hooks/useLocale";
import BlogSidebar from "../BlogSidebar";
import { directionMap } from "@/app/constants/global";

// Types
export interface ArticleProps {
  article: Article;
  relatedArticles: Article[];
}

// Animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Article Image Component
const ArticleImage: React.FC<{ src: string | null; alt: string }> = ({
  src,
  alt,
}) => (
  <motion.div
    className="mb-8"
    variants={fadeInUp}
    initial="initial"
    animate="animate"
  >
    {src && (
      <Img
        src={src}
        alt={alt}
        className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
      />
    )}
  </motion.div>
);

// Tags Component
const ArticleTags: React.FC<{ tags: string[] }> = ({ tags }) => (
  <motion.div
    className="mb-8"
    variants={fadeInUp}
    initial="initial"
    animate="animate"
  >
    <div className="flex items-center gap-2 mb-3">
      <FaTag className="text-gray-400" />
      <span className="text-sm font-medium text-gray-600">Tags:</span>
    </div>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
        >
          #{tag}
        </span>
      ))}
    </div>
  </motion.div>
);

// Main Article Detail Page Component
export default function ArticleDetailsPage({
  article,
  relatedArticles,
}: ArticleProps) {
  const locale = useLocale();

  // Map backend article to the format expected by existing components
  const mappedArticle = {
    id: Number(article.id),
    title: article.title,
    excerpt: article.excerpt || "",
    author: "Admin",
    date: article.publishedAt || article.createdAt,
    readTime: `${article.readTimeMinutes} min read`,
    category: article.category?.name || "General",
    image: article.coverImageUrl || "",
    tags: article.tags,
    featured: false,
  };

  return (
    <div dir={directionMap[locale]} className="min-h-screen pt-20 bg-white">
      <div className="c-container  py-8">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <div className="flex items-start gap-8 w-full h-full">
            <div className="flex-1/2">
              <ArticleHeader article={mappedArticle} />
              <ArticleImage
                src={mappedArticle.image}
                alt={mappedArticle.title}
              />
              <ArticleContent content={article.content} />
              <ArticleTags tags={mappedArticle.tags} />
              <InteractionSection />
            </div>
            <div className="xl:flex-1 xl:block sticky top-20 right-0  h-full hidden">
              <BlogSidebar />
            </div>
          </div>
          <RelatedArticlesSlider articles={relatedArticles} />
        </motion.div>
      </div>
    </div>
  );
}
