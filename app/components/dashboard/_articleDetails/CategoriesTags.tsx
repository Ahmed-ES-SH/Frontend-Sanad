"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Article } from "@/app/types/blog";
import { motion, useReducedMotion } from "framer-motion";
import { FiPlus, FiX, FiChevronDown, FiSave, FiLoader } from "react-icons/fi";
import { useTranslation } from "@/app/hooks/useTranslation";
import { updateArticle, getCategories } from "@/app/actions/blogActions";
import { Category } from "@/app/types/global";

interface CategoriesTagsProps {
  article: Article;
}

interface CategoryWithId extends Category {
  id: string;
}

export function CategoriesTags({ article }: CategoriesTagsProps) {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslation("ArticleDetails");

  const [categories, setCategories] = useState<CategoryWithId[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await getCategories();
        setCategories(cats as CategoryWithId[]);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    setSelectedCategoryId(article.categoryId || "");
    setTags((article.tags || []).map((tag) => tag.trim()));
  }, [article.categoryId, article.tags]);

  useEffect(() => {
    const categoryChanged = selectedCategoryId !== (article.categoryId || "");
    const tagsChanged =
      JSON.stringify(tags) !== JSON.stringify(article.tags || []);
    setHasChanges(categoryChanged || tagsChanged);
  }, [selectedCategoryId, tags, article.categoryId, article.tags]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategoryId(e.target.value);
  };

  const handleAddTag = () => {
    const trimmed = newTag.toLowerCase().trim();
    if (!trimmed || tags.includes(trimmed)) return;
    setTags([...tags, trimmed]);
    setNewTag("");
    setShowTagInput(false);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleCancel = () => {
    setSelectedCategoryId(article.categoryId || "");
    setTags((article.tags || []).map((tag) => tag.trim()));
    setSaveError("");
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError("");
    try {
      const updateData: { categoryId?: string; tags?: string[] } = {};
      if (selectedCategoryId !== (article.categoryId || "")) {
        updateData.categoryId =
          selectedCategoryId || (null as unknown as string);
      }
      if (JSON.stringify(tags) !== JSON.stringify(article.tags || [])) {
        updateData.tags = tags;
      }
      if (Object.keys(updateData).length > 0) {
        const result = await updateArticle(article.id, updateData);
        if (result.success) {
          router.refresh();
        } else {
          setSaveError(t.categories.saveError);
        }
      }
    } catch (error) {
      setSaveError(t.categories.saveNetworkError);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <motion.section
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4"
    >
      <header className="flex items-baseline justify-between">
        <h2 className="text-sm font-semibold text-stone-800">{t.categories.heading}</h2>
        {hasChanges && (
          <div className="flex items-center gap-2">
            {saveError && (
              <span className="text-xs text-red-600" role="alert">
                {saveError}
              </span>
            )}
            <button
              onClick={handleCancel}
              disabled={isSaving}
              className="text-xs font-medium text-stone-400 hover:text-stone-700 transition-colors disabled:opacity-50"
            >
              {t.categories.cancel}
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="text-xs font-medium text-primary hover:text-primary-dark transition-colors flex items-center gap-1 disabled:opacity-50"
            >
              {isSaving ? (
                <FiLoader className="text-xs animate-spin" />
              ) : (
                <FiSave className="text-xs" />
              )}
              {t.categories.save}
            </button>
          </div>
        )}
      </header>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="article-category"
            className="block text-xs text-stone-400 font-medium uppercase tracking-wider mb-1.5"
          >
            {t.categories.category}
          </label>
          <div className="relative">
            <select
              id="article-category"
              value={selectedCategoryId}
              onChange={handleCategoryChange}
              className="w-full appearance-none cursor-pointer pr-10 text-sm bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            >
              <option value="">{t.categories.selectCategory}</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs text-stone-400 font-medium uppercase tracking-wider mb-1.5">{t.categories.tags}</label>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-stone-100 text-stone-600 font-medium"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  aria-label={`Remove ${tag}`}
                  className="text-stone-400 hover:text-stone-700 transition-colors"
                >
                  <FiX className="text-xs" />
                </button>
              </span>
            ))}

            {showTagInput ? (
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder={t.categories.tagPlaceholder}
                  className="w-24 px-2.5 py-1 text-xs rounded-lg border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="p-1 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                  aria-label={t.categories.addTag}
                >
                  <FiPlus className="text-sm" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowTagInput(false);
                    setNewTag("");
                  }}
                  className="p-1 text-stone-400 hover:bg-stone-100 rounded-lg transition-colors"
                  aria-label="Cancel"
                >
                  <FiX className="text-sm" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowTagInput(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border border-dashed border-stone-300 text-stone-400 hover:border-stone-400 hover:text-stone-600 transition-colors"
              >
                <FiPlus className="text-xs" />
                {t.categories.addTag}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
