/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/app/hooks/useTranslation";
import { Article } from "@/app/types/blog";
import {
  ArticleSkeleton,
  LoadingOverlay,
  EmptyState,
  DeleteConfirmModal,
  ArticleCard,
} from "./ArticleGrid/index";
import { useArticleGrid } from "@/app/hooks/articleGrid/useArticleGrid";
import BlogPagination from "../../website/blog/BlogPagination";

interface ArticleGridProps {
  initialArticles: Article[];
  totalPages: number;
  currentPage: number;
}

export function ArticleGrid({
  initialArticles,
  totalPages,
  currentPage,
}: ArticleGridProps) {
  const t = useTranslation("BlogPage.ArticleGrid");

  const {
    articles,
    isLoading,
    deleteId,
    articleToDelete,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    handlePageChange,
  } = useArticleGrid({ initialArticles, currentPage });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative">
        {/* Loading overlay when filtering or paginating */}
        <AnimatePresence>{isLoading && <LoadingOverlay />}</AnimatePresence>

        {/* Empty state */}
        {!isLoading && articles.length === 0 && <EmptyState t={t} />}

        {/* Articles */}
        {!isLoading &&
          articles.map((article, index) => (
            <motion.div
              key={article.id}
              custom={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.7 + index * 0.1,
                duration: 0.5,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="h-full"
            >
              <ArticleCard
                article={article}
                t={t}
                onDeleteClick={handleDeleteClick}
              />
            </motion.div>
          ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {deleteId && (
          <DeleteConfirmModal
            articleTitle={articleToDelete?.title || ""}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
            t={t}
          />
        )}
      </AnimatePresence>

      {/* Pagination */}
      <BlogPagination
        currentPage={currentPage}
        totalPages={totalPages}
        isLoading={isLoading}
        onPageChange={handlePageChange}
      />
    </>
  );
}