"use client";

import { useEffect, useState } from "react";
import { Article } from "@/app/types/blog";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslation";
import { updateArticle } from "@/app/actions/blogActions";

interface ArticleContentProps {
  article: Article;
}

const defaultCoverImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'%3E%3Crect fill='%23f5f5f4' width='1200' height='600'/%3E%3Ctext fill='%23a8a29e' font-family='sans-serif' font-size='48' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3ENo%20cover%20image%3C/text%3E%3C/svg%3E";

export function ArticleContent({ article }: ArticleContentProps) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslation("ArticleDetails");
  const prefersReducedMotion = useReducedMotion();
  const [imageError, setImageError] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const [editExcerpt, setEditExcerpt] = useState(article.excerpt || "");
  const [editContent, setEditContent] = useState(article.content || "");
  const [editCoverImage, setEditCoverImage] = useState(
    article.coverImageUrl || "",
  );

  useEffect(() => {
    setEditExcerpt(article.excerpt || "");
    setEditContent(article.content || "");
    setEditCoverImage(article.coverImageUrl || "");
  }, [article]);

  const formatReadTime = (minutes: number) => {
    if (!minutes || minutes < 1) return "1 min read";
    return `${minutes} min read`;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError("");
    try {
      const result = await updateArticle(article.id, {
        excerpt: editExcerpt,
        content: editContent,
        coverImageUrl: editCoverImage,
      });
      if (result.success) {
        setIsEditing(false);
        router.refresh();
      } else {
        setSaveError(t.content.saveError);
      }
    } catch (error) {
      setSaveError(t.content.saveNetworkError);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditExcerpt(article.excerpt || "");
    setEditContent(article.content || "");
    setEditCoverImage(article.coverImageUrl || "");
    setIsEditing(false);
  };

  const coverImage =
    imageError || !article.coverImageUrl
      ? defaultCoverImage
      : article.coverImageUrl;

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-stone-200 rounded-2xl overflow-hidden"
    >
      <div className="w-full relative overflow-hidden bg-stone-100 max-h-[26rem] aspect-video">
        <Image
          src={isEditing ? editCoverImage || defaultCoverImage : coverImage}
          alt={article.title}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
        {isEditing && (
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="w-full max-w-xl space-y-2">
              <label
                htmlFor="cover-image-url"
                className="block text-white/80 text-xs font-medium uppercase tracking-wider"
              >
                {t.content.coverImageUrl}
              </label>
              <input
                id="cover-image-url"
                type="text"
                value={editCoverImage}
                onChange={(e) => setEditCoverImage(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/95 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 border-0 shadow-lg"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        )}
      </div>

      <div className="px-6 sm:px-8 py-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-stone-400">
            <time dateTime={article.publishedAt || article.createdAt || ""}>
              {formatDate(article.publishedAt || article.createdAt)}
            </time>
            <span className="w-1 h-1 rounded-full bg-stone-300" aria-hidden="true" />
            <span>{formatReadTime(article.readTimeMinutes)}</span>
          </div>

          <div className="flex items-center gap-2">
            {saveError && (
              <div className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-1.5" role="alert">
                {saveError}
              </div>
            )}
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors"
              >
                {t.content.edit}
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 shadow-sm shadow-primary/20"
                >
                  {isSaving ? t.content.saving : t.content.saveChanges}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="px-4 py-2 bg-stone-100 text-stone-600 text-sm font-medium rounded-lg hover:bg-stone-200 transition-colors"
                >
                  {t.content.cancel}
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          {isEditing ? (
            <div className="space-y-2">
              <label
                htmlFor="article-excerpt"
                className="block text-xs text-stone-400 font-medium uppercase tracking-wider"
              >
                {t.content.excerpt}
              </label>
              <textarea
                id="article-excerpt"
                value={editExcerpt}
                onChange={(e) => setEditExcerpt(e.target.value)}
                className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl text-stone-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                rows={3}
                placeholder={t.content.excerptPlaceholder}
              />
            </div>
          ) : (
            article.excerpt && (
              <p className="text-lg text-stone-500 leading-relaxed font-light">
                {article.excerpt}
              </p>
            )
          )}
        </div>

        <div>
          {isEditing ? (
            <div className="space-y-2">
              <label
                htmlFor="article-content"
                className="block text-xs text-stone-400 font-medium uppercase tracking-wider"
              >
                {t.content.contentLabel}
              </label>
              <textarea
                id="article-content"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-5 bg-stone-50 border border-stone-200 rounded-xl font-mono text-sm min-h-[400px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder={t.content.contentPlaceholder}
              />
            </div>
          ) : (
            <div
              className="prose prose-stone max-w-none"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(article.content),
              }}
            />
          )}
        </div>

        {article.isPublished && !isEditing && (
          <div className="pt-5 border-t border-stone-100">
            <Link
              href={`/blog/${article.slug}`}
              target="_blank"
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-2 group"
            >
              {t.content.viewOnWebsite}
              <span aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          </div>
        )}
      </div>
    </motion.article>
  );
}
