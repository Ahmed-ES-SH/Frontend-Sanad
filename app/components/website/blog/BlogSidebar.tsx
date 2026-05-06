"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiCalendar, FiTag, FiTrendingUp, FiX } from "react-icons/fi";
import { getCategories, getArticles } from "@/app/actions/blogActions";
import { Article } from "@/app/types/blog";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslation";
import LocaleLink from "../../global/LocaleLink";
import Img from "../../global/Img";
import { Category } from "@/app/types/global";

export default function BlogSidebar() {
  const locale = useLocale();
  const t = useTranslation("blogPage");
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategoryId = searchParams.get("categoryId");
  const currentTag = searchParams.get("tag");

  const [categories, setCategories] = useState<Category[]>([]);
  const [latestPosts, setLatestPosts] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, posts] = await Promise.all([
          getCategories(),
          getArticles({ limit: 5 }),
        ]);
        setCategories(cats);
        setLatestPosts(posts.data);
      } catch (error) {
        console.error("Failed to fetch sidebar data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategoryClick = (id: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id) {
      params.set("categoryId", id);
    } else {
      params.delete("categoryId");
    }
    params.set("page", "1");
    router.push(`/${locale}/blog?${params.toString()}`);
  };

  const handleTagClick = (tag: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tag) {
      params.set("tag", tag.toLowerCase());
    } else {
      params.delete("tag");
    }
    params.set("page", "1");
    router.push(`/${locale}/blog?${params.toString()}`);
  };

  const popularTags = [
    "branding",
    "ui design",
    "seo",
    "marketing",
    "app development",
    "social media",
    "web development",
    "design",
  ];

  return (
    <motion.aside
      className="space-y-8 sticky top-24 right-0"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      {/* Categories */}
      <div className="bg-surface-card border border-surface-200 rounded-2xl p-6 max-h-60 overflow-y-auto shadow-surface-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-bold text-surface-900 flex items-center gap-2">
            <FiTag className="text-primary" />
            {t.categoriesTitle}
          </h3>
          {currentCategoryId && (
            <button
              onClick={() => handleCategoryClick(null)}
              className="text-xs font-bold text-primary hover:text-primary-dark flex items-center gap-1 transition-colors"
            >
              <FiX size={12} />
              {locale === "ar" ? "مسح" : "Clear"}
            </button>
          )}
        </div>
        <ul className="space-y-2">
          {isLoading
            ? [1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-8 bg-surface-100 animate-pulse rounded-lg w-full"
                />
              ))
            : categories.map((category, index) => (
                <motion.li
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all group ${
                    currentCategoryId === category.id
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-surface-50 text-surface-700 hover:text-primary"
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <span className="text-sm font-semibold">{category.name}</span>
                  <div
                    className={`w-1.5 h-1.5 rounded-full bg-primary transition-transform duration-300 ${currentCategoryId === category.id ? "scale-100" : "scale-0 group-hover:scale-100"}`}
                  />
                </motion.li>
              ))}
        </ul>
      </div>

      {/* Latest Posts */}
      <div className="bg-surface-card border border-surface-200 rounded-2xl p-6 shadow-surface-sm">
        <h3 className="font-display font-bold text-surface-900 mb-6 flex items-center gap-2">
          <FiTrendingUp className="text-primary" />
          {t.latestPostsTitle}
        </h3>
        <div className="space-y-5">
          {isLoading
            ? [1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-16 h-16 rounded-lg bg-surface-100 animate-pulse shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-surface-100 animate-pulse rounded w-full" />
                    <div className="h-3 bg-surface-100 animate-pulse rounded w-1/2" />
                  </div>
                </div>
              ))
            : latestPosts.map((post, index) => (
                <motion.div
                  className="w-full"
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <LocaleLink
                    href={`/blog/${post.slug}`}
                    className="flex gap-3 group cursor-pointer"
                  >
                    <Img
                      src={post.coverImageUrl}
                      alt={post.title}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow duration-300"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-surface-900 line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-snug">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-2 text-[10px] font-bold text-surface-400 uppercase tracking-wider">
                        <FiCalendar size={10} className="text-primary" />
                        <span>
                          {new Date(
                            post.publishedAt || post.createdAt,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </LocaleLink>
                </motion.div>
              ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-surface-card border border-surface-200 rounded-2xl p-6 shadow-surface-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-bold text-surface-900">
            {t.popularTagsTitle}
          </h3>
          {currentTag && (
            <button
              onClick={() => handleTagClick(null)}
              className="text-xs font-bold text-primary hover:text-primary-dark flex items-center gap-1 transition-colors"
            >
              <FiX size={12} />
              {locale === "ar" ? "مسح" : "Clear"}
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag, index) => (
            <motion.span
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`bg-surface-50 hover:bg-primary/10 px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider cursor-pointer transition-all border ${
                currentTag === tag.toLowerCase()
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "text-surface-600 hover:text-primary border-surface-200 hover:border-primary/20"
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              #{tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}
