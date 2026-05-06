"use client";

import { useEffect, useState } from "react";
import { Article } from "@/app/types/blog";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updateArticle } from "@/app/actions/blogActions";

interface ArticleContentProps {
  article: Article;
}

export function ArticleContent({ article }: ArticleContentProps) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  // Editing state
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [editExcerpt, setEditExcerpt] = useState(article.excerpt || "");
  const [editContent, setEditContent] = useState(article.content || "");
  const [editCoverImage, setEditCoverImage] = useState(
    article.coverImageUrl || "",
  );

  // Sync state when article changes
  useEffect(() => {
    setEditExcerpt(article.excerpt || "");
    setEditContent(article.content || "");
    setEditCoverImage(article.coverImageUrl || "");
  }, [article]);

  // Handle image error
  const handleImageError = () => {
    setImageError(true);
  };

  // Default cover image when none available
  const defaultCoverImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'%3E%3Crect fill='%23f5f5f4' width='1200' height='600'/%3E%3Ctext fill='%23a8a29e' font-family='sans-serif' font-size='48' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3ENo%20Cover%20Image%3C/text%3E%3C/svg%3E";

  // Get cover image URL
  const coverImage =
    imageError || !article.coverImageUrl
      ? defaultCoverImage
      : article.coverImageUrl;

  // Format read time
  const formatReadTime = (minutes: number) => {
    if (!minutes || minutes < 1) return "1 min";
    return `${minutes} min read`;
  };

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get first letter style (drop cap)
  const getFirstLetter = () => {
    const content = article.excerpt || article.content || "";
    const firstChar = content.trim().charAt(0);
    if (!firstChar) return null;
    return firstChar;
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const result = await updateArticle(article.id, {
        excerpt: editExcerpt,
        content: editContent,
        coverImageUrl: editCoverImage,
      });
      if (result.success) {
        setIsEditing(false);
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to update article content:", error);
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
      className="surface-card overflow-hidden relative"
    >
      {/* Edit Toggle Button */}
      <div className="absolute top-4 right-4 z-20">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-white/90 backdrop-blur-sm text-stone-700 text-xs font-bold uppercase tracking-widest rounded-lg shadow-sm hover:bg-white transition-all border border-stone-200"
          >
            Edit Content
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest rounded-lg shadow-sm hover:bg-emerald-600 transition-all disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={handleCancel}
              disabled={isSaving}
              className="px-4 py-2 bg-stone-500 text-white text-xs font-bold uppercase tracking-widest rounded-lg shadow-sm hover:bg-stone-600 transition-all"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      {/* Cover Image */}
      <div className="h-[400px] w-full relative overflow-hidden group">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="w-full h-full"
        >
          <Image
            src={isEditing ? editCoverImage || defaultCoverImage : coverImage}
            alt={article.title}
            fill
            className="object-cover"
            onError={handleImageError}
          />
        </motion.div>

        {isEditing && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-8">
            <div className="w-full max-w-xl space-y-2">
              <label className="text-white text-xs font-bold uppercase tracking-widest">
                Cover Image URL
              </label>
              <input
                type="text"
                value={editCoverImage}
                onChange={(e) => setEditCoverImage(e.target.value)}
                className="w-full px-4 py-3 bg-white/90 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
          <div className="flex items-center gap-4 text-white/80 text-sm">
            <span>{formatDate(article.publishedAt || article.createdAt)}</span>
            <span className="w-1 h-1 bg-white/50 rounded-full" />
            <span>{formatReadTime(article.readTimeMinutes)}</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="p-8 space-y-8">
        {/* Excerpt / Summary */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
            Excerpt / Summary
          </label>
          {isEditing ? (
            <textarea
              value={editExcerpt}
              onChange={(e) => setEditExcerpt(e.target.value)}
              className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl text-stone-600 text-lg leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/20"
              rows={3}
              placeholder="Enter a brief summary..."
            />
          ) : (
            article.excerpt && (
              <p className="text-stone-500 text-lg leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                {article.excerpt}
              </p>
            )
          )}
        </div>

        {/* Full Content */}
        <div className="space-y-2 pt-4 border-t border-stone-100">
          <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
            Article Content (HTML)
          </label>
          {isEditing ? (
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full p-6 bg-stone-50 border border-stone-200 rounded-xl font-mono text-sm min-h-[500px] focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="<h1>Your Content Here</h1>..."
            />
          ) : (
            <article
              className="prose prose-stone max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          )}
        </div>

        {/* Author Info (placeholder) */}
        <div className="flex items-center gap-4 pt-8 border-t border-stone-100 mt-8">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
            <span className="text-orange-600 font-bold text-lg">A</span>
          </div>
          <div>
            <p className="font-semibold text-stone-900">Admin</p>
            <p className="text-sm text-stone-500">
              {formatDate(article.createdAt)}
            </p>
          </div>
        </div>

        {/* View Live Link */}
        {article.isPublished && (
          <div className="pt-4">
            <Link
              href={`/blog/${article.slug}`}
              target="_blank"
              className="text-orange-600 font-semibold hover:underline flex items-center gap-2"
            >
              View on website →
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}
