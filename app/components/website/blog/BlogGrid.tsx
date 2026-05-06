"use client";
import { AnimatePresence, motion } from "framer-motion";
import LoadingBlogSpinner from "./LoadingBlogSpiner";
import NoPostsFound from "./NoPostsFound";
import ArticleCard from "./ArticleCard";
import { Article } from "@/app/types/blog";

interface BlogGridProps {
  posts: Article[];
  isLoading: boolean;
}

export default function BlogGrid({ posts, isLoading }: BlogGridProps) {
  return (
    <AnimatePresence>
      {isLoading ? (
        <div
          key="loading"
          className="min-h-[400px] flex items-center justify-center"
        >
          <LoadingBlogSpinner />
        </div>
      ) : posts.length === 0 ? (
        <NoPostsFound key="no-posts" />
      ) : (
        <motion.div
          key="content"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {posts.map((post, index) => (
            <ArticleCard key={post.id} article={post} index={index} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
