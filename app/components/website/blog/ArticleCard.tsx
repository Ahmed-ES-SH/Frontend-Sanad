"use client";
import { FiCalendar, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";
import { Article } from "@/app/types/blog";
import Img from "../../global/Img";
import LocaleLink from "../../global/LocaleLink";

interface props {
  article: Article;
  index: number;
}

// Blog Card Component
export default function ArticleCard({ article, index }: props) {
  return (
    <motion.article
      className="bg-surface-card h-[420px] border border-surface-200 rounded-xl shadow-surface-sm hover:shadow-surface-md hover:border-primary/30 transition-all duration-500 overflow-hidden group cursor-pointer flex flex-col"
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ delay: index * 0.1 }}
    >
      <LocaleLink
        className="w-full h-full flex flex-col"
        href={`/blog/${article.slug}?articleId=${article.id}`}
      >
        <div className="relative overflow-hidden aspect-video">
          <Img
            src={article.coverImageUrl || ""}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          {article.category && (
            <div className="absolute top-4 left-4">
              <span className="bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
                {article.category.name}
              </span>
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-display font-bold text-surface-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {article.title}
          </h3>

          <p className="text-surface-600 text-sm mb-6 line-clamp-2 leading-relaxed">
            {article.excerpt || ""}
          </p>

          <div className="mt-auto pt-4 border-t border-surface-100 flex items-center justify-between text-xs text-surface-500 font-bold uppercase tracking-wider">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <FiCalendar size={12} />
                <span>
                  {new Date(
                    article.publishedAt || article.createdAt,
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <FiClock size={12} />
              <span>{article.readTimeMinutes} min read</span>
            </div>
          </div>
        </div>
      </LocaleLink>
    </motion.article>
  );
}
