"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineClock,
} from "react-icons/hi";
import { Article } from "@/app/types/blog";
import LocaleLink from "../../../global/LocaleLink";
import {
  ANIMATION_CONFIG,
  DATE_FORMAT_OPTIONS,
  FALLBACK_IMAGE_URL,
  DEFAULT_VALUES,
} from "@/app/constants/articleGrid";

interface ArticleCardProps {
  article: Article;
  t: any;
  onDeleteClick: (id: string) => void;
}

export function ArticleCard({ article, t, onDeleteClick }: ArticleCardProps) {
  const statusInfo = article.isPublished
    ? { status: "Published", statusColor: "bg-green-500" }
    : { status: "Draft", statusColor: "bg-stone-400" };

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "Pending";
    return new Date(dateString).toLocaleDateString("en-US", DATE_FORMAT_OPTIONS);
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement>
  ): void => {
    e.currentTarget.src = FALLBACK_IMAGE_URL;
  };

  const cardHref = `/dashboard/blog/${article.id}`;

  return (
    <motion.article
      whileHover={{ y: ANIMATION_CONFIG.cardHover.y }}
      className="bg-white rounded-2xl shadow-sm border border-stone-200/50 overflow-hidden group cursor-pointer flex flex-col h-full"
    >
      <LocaleLink href={cardHref}>
        <div className="h-48 overflow-hidden relative">
          <motion.img
            whileHover={{ scale: ANIMATION_CONFIG.imageHover.scale }}
            transition={{ duration: ANIMATION_CONFIG.transitionDuration }}
            className="w-full h-full object-cover"
            alt={article.title}
            src={article.coverImageUrl || ""}
            onError={handleImageError}
          />
          <div className="absolute top-4 start-4">
            <span
              className={`${statusInfo.statusColor} text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-lg`}
            >
              {statusInfo.status}
            </span>
          </div>
        </div>
      </LocaleLink>
      <div className="p-5 flex flex-col grow">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-bold text-orange-600 tracking-widest uppercase bg-orange-50 px-2 py-0.5 rounded">
            {article.category?.name || DEFAULT_VALUES.categoryName}
          </p>
          <p className="text-xs text-stone-500 font-medium">
            {formatDate(article.publishedAt || article.createdAt)}
          </p>
        </div>
        <h2>
          <h4 className="font-bold text-lg text-stone-900 leading-tight mb-2 group-hover:text-orange-600 transition-colors line-clamp-1">
            {article.title}
          </h4>
        </h2>
        <p className="text-xs text-stone-500 mb-4 line-clamp-2 leading-relaxed flex-grow">
          {article.excerpt || DEFAULT_VALUES.excerpt}
        </p>

        {/* Article Metadata Details */}
        <div className="flex items-center gap-4 mb-4 pt-4 border-t border-stone-100">
          <div className="flex items-center gap-1 text-stone-400">
            <HiOutlineEye className="text-sm" />
            <span className="text-[10px] font-semibold">
              {article.viewsCount || DEFAULT_VALUES.viewsCount} views
            </span>
          </div>
          <div className="flex items-center gap-1 text-stone-400">
            <HiOutlineClock className="text-sm" />
            <span className="text-[10px] font-semibold">
              {article.readTimeMinutes || DEFAULT_VALUES.readTimeMinutes} min read
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center border border-orange-200">
              <span className="text-[10px] text-orange-600 font-bold uppercase">
                {article.title.charAt(0)}
              </span>
            </div>
            <span className="text-xs font-semibold text-stone-600 truncate max-w-[100px]">
              {DEFAULT_VALUES.authorName}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Link href={cardHref}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-stone-50 text-stone-400 hover:text-orange-600 rounded-lg transition-colors border border-stone-100 opacity-70 hover:opacity-100"
                aria-label={t.editArticle}
              >
                <HiOutlinePencilAlt className="text-lg" />
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDeleteClick(article.id)}
              className="p-2 bg-stone-50 text-stone-400 hover:text-red-600 rounded-lg transition-colors border border-stone-100 opacity-70 hover:opacity-100"
              aria-label={t.deleteArticleLabel}
            >
              <HiOutlineTrash className="text-lg" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}