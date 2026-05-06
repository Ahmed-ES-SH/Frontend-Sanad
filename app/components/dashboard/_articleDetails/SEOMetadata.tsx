"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Article } from "@/app/types/blog";
import { motion } from "framer-motion";
import { FiCheckCircle, FiSave, FiX } from "react-icons/fi";
import { updateArticle } from "@/app/actions/blogActions";
import { HelpIcon } from "../DashboardPage/Tooltip";

interface SEOMetadataProps {
  article: Article;
}

export function SEOMetadata({ article }: SEOMetadataProps) {
  const router = useRouter();

  // SEO fields
  const [focusKeyword, setFocusKeyword] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  // Editing state
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Initial load from article
  useEffect(() => {
    const handleFoucs = (title: string) => {
      setFocusKeyword(title);
    };

    // Use title as default focus keyword
    handleFoucs(article.title);

    const handleDesc = (desc: string) => {
      setMetaDescription(desc);
    };

    // Use excerpt as meta description if available
    handleDesc(article.excerpt || "");
  }, [article]);

  // Calculate SEO score (simplified)
  const calculateSeoScore = () => {
    let score = 0;
    const maxScore = 4;

    // Check title length (50-300 chars is ideal)
    if (
      article.title &&
      article.title.length >= 50 &&
      article.title.length <= 300
    )
      score++;
    // Check focus keyword presence
    if (focusKeyword && focusKeyword.length > 0) score++;
    // Check meta description
    if (
      metaDescription &&
      metaDescription.length >= 120 &&
      metaDescription.length <= 320
    )
      score++;
    // Check excerpt
    if (article.excerpt && article.excerpt.length > 0) score++;

    return Math.round((score / maxScore) * 100);
  };

  const seoScore = calculateSeoScore();

  const handleSaveSEO = async () => {
    setIsSaving(true);
    try {
      // Update excerpt if meta description is different
      const updateData: { excerpt?: string } = {};

      if (metaDescription !== article.excerpt) {
        updateData.excerpt = metaDescription;
      }

      if (Object.keys(updateData).length > 0) {
        const result = await updateArticle(article.id, updateData);
        if (result.success) {
          setSaveSuccess(true);
          setTimeout(() => setSaveSuccess(false), 2000);
          router.refresh();
        }
      }
    } catch (error) {
      console.error("Failed to save SEO:", error);
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFocusKeyword(article.title);
    setMetaDescription(article.excerpt || "");
    setIsEditing(false);
  };

  // Get score color based on percentage
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
      className="surface-card p-6 space-y-4"
    >
      <div className="flex items-center justify-between pb-2 border-b border-stone-50">
        <div className="flex items-center gap-2">
          <h4 className="text-xs font-bold uppercase tracking-widest text-stone-900">
            SEO Metadata
          </h4>
          <HelpIcon content="Content completeness score - checks title length (50-300 chars), description (120-320 chars), and excerpt presence. Does not measure actual SEO quality." />
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className={seoScore >= 80 ? "text-emerald-600" : "text-stone-400"}
        >
          <FiCheckCircle className="text-lg" />
        </motion.div>
      </div>

      <div className="space-y-4">
        {/* Focus Keyword */}
        <div>
          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">
            Focus Keyword
          </label>
          {isEditing ? (
            <input
              type="text"
              value={focusKeyword}
              onChange={(e) => setFocusKeyword(e.target.value)}
              className="surface-input w-full"
              placeholder="Enter focus keyword"
            />
          ) : (
            <div className="bg-stone-50 px-3 py-2 rounded border border-stone-100 text-sm text-stone-900 font-medium">
              {focusKeyword || "Not set"}
            </div>
          )}
        </div>

        {/* Meta Description */}
        <div>
          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">
            Excerpt (Meta Description)
          </label>
          {isEditing ? (
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="surface-input w-full min-h-[80px]"
              placeholder="Enter meta description"
              rows={3}
            />
          ) : (
            <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-3 rounded border border-stone-100">
              {metaDescription || "No description set"}
            </p>
          )}
          <p className="text-[10px] text-stone-400 mt-1">
            {metaDescription.length}/320 characters
          </p>
        </div>

        {/* Edit/Save Buttons */}
        <div className="flex gap-2 pt-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveSEO}
                disabled={isSaving}
                className="flex-1 px-3 py-2 bg-emerald-500 text-white text-sm font-semibold rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSaving ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <FiSave className="text-sm" />
                    Save
                  </>
                )}
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-2 bg-stone-100 text-stone-600 text-sm font-semibold rounded-lg hover:bg-stone-200 transition-colors"
              >
                <FiX />
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full px-3 py-2 bg-stone-50 text-stone-600 text-sm font-semibold rounded-lg hover:bg-stone-100 transition-colors"
            >
              Edit SEO
            </button>
          )}
        </div>

        {/* SEO Score Bar */}
        <div className="flex items-center gap-2 pt-2">
          <div className="h-1.5 flex-1 bg-stone-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${seoScore}%` }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0.25, 1, 0.5, 1],
              }}
              className={`h-full ${getScoreColor(seoScore)}`}
            />
          </div>
          <span
            className={`text-[10px] font-bold uppercase ${
              seoScore >= 80
                ? "text-emerald-600"
                : seoScore >= 60
                  ? "text-yellow-600"
                  : "text-red-600"
            }`}
          >
            {seoScore}% Content
          </span>
        </div>

        {/* Slug Display */}
        <div className="pt-4 border-t border-stone-50">
          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">
            URL Slug
          </label>
          <p className="text-xs text-orange-600 font-mono bg-orange-50 p-2 rounded">
            /blog/{article.slug}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
