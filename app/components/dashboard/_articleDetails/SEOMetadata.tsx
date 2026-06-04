"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Article } from "@/app/types/blog";
import { motion, useReducedMotion } from "framer-motion";
import { FiSave, FiX } from "react-icons/fi";
import { useTranslation } from "@/app/hooks/useTranslation";
import { updateArticle } from "@/app/actions/blogActions";

interface SEOMetadataProps {
  article: Article;
}

export function SEOMetadata({ article }: SEOMetadataProps) {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslation("ArticleDetails");

  const [metaDescription, setMetaDescription] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    setMetaDescription(article.excerpt || "");
  }, [article]);

  const handleSaveSEO = async () => {
    setIsSaving(true);
    setSaveError("");
    try {
      const updateData: { excerpt?: string } = {};
      if (metaDescription !== (article.excerpt || "")) {
        updateData.excerpt = metaDescription;
      }
      if (Object.keys(updateData).length > 0) {
        const result = await updateArticle(article.id, updateData);
        if (result.success) {
          setIsEditing(false);
          router.refresh();
        } else {
          setSaveError(t.seo.saveError);
          return;
        }
      } else {
        setIsEditing(false);
      }
    } catch (error) {
      setSaveError(t.seo.saveNetworkError);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setMetaDescription(article.excerpt || "");
    setIsEditing(false);
    setSaveError("");
  };

  return (
    <motion.section
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4"
    >
      <header className="flex items-baseline justify-between">
        <h2 className="text-sm font-semibold text-stone-800">{t.seo.heading}</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-xs font-medium text-stone-400 hover:text-stone-700 transition-colors"
          >
            {t.seo.edit}
          </button>
        )}
      </header>

      <div className="space-y-4">
        <div>
          <label className="block text-xs text-stone-400 font-medium uppercase tracking-wider mb-1.5">
            {t.seo.focusKeyword}
          </label>
          <p className="text-sm text-stone-700 bg-stone-50 px-3.5 py-2.5 rounded-xl border border-stone-100">
            {article.title}
          </p>
          <p className="text-xs text-stone-400 mt-1.5">
            {t.seo.focusKeywordNote}
          </p>
        </div>

        <div>
          <label
            htmlFor="seo-meta-description"
            className="block text-xs text-stone-400 font-medium uppercase tracking-wider mb-1.5"
          >
            {t.seo.metaDescription}
          </label>
          {isEditing ? (
            <textarea
              id="seo-meta-description"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full min-h-[88px] text-sm bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder={t.seo.metaDescriptionPlaceholder}
              rows={3}
            />
          ) : (
            <p className="text-sm text-stone-600 bg-stone-50 px-3.5 py-2.5 rounded-xl border border-stone-100 leading-relaxed">
              {metaDescription || (
                <span className="text-stone-400">{t.seo.noDescription}</span>
              )}
            </p>
          )}
          <p className="text-xs text-stone-400 mt-1.5 tabular-nums">
            {metaDescription.length} / 320
          </p>
        </div>

        {saveError && (
          <div className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3.5 py-2.5" role="alert">
            {saveError}
          </div>
        )}

        {isEditing && (
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleSaveSEO}
              disabled={isSaving}
              className="flex-1 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 shadow-sm shadow-primary/20"
            >
              {isSaving ? (
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FiSave className="text-sm" />
              )}
              {t.seo.save}
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2.5 bg-stone-100 text-stone-600 text-sm font-medium rounded-xl hover:bg-stone-200 transition-colors"
            >
              <FiX className="text-sm" />
            </button>
          </div>
        )}

        <div className="pt-3.5 border-t border-stone-100">
          <p className="text-xs text-stone-400 mb-1">{t.seo.url}</p>
          <p className="text-xs font-mono text-stone-500 break-all">
            /blog/{article.slug}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
