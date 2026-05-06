"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Article } from "@/app/types/blog";
import { motion } from "framer-motion";
import { FiPlus, FiX, FiChevronDown, FiSave, FiLoader } from "react-icons/fi";
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

  // State
  const [categories, setCategories] = useState<CategoryWithId[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  // UI State
  const [isSaving, setIsSaving] = useState(false);
  const [showTagInput, setShowTagInput] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Load categories
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

  // Initialize from article
  useEffect(() => {
    const handleCategory = (id: string) => {
      setSelectedCategoryId(id);
    };
    handleCategory(article.categoryId || "");

    const handTags = (tags: string[]) => {
      setTags(tags.map((tag) => tag.trim()));
    };

    handTags(article.tags || []);
  }, [article.categoryId, article.tags]);

  // Track changes
  useEffect(() => {
    const handleChange = (state: boolean) => {
      setHasChanges(state);
    };

    const categoryChanged = selectedCategoryId !== (article.categoryId || "");
    const tagsChanged =
      JSON.stringify(tags) !== JSON.stringify(article.tags || []);
    handleChange(categoryChanged || tagsChanged);
  }, [selectedCategoryId, tags, article.categoryId, article.tags]);

  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategoryId(e.target.value);
  };

  // Handle add tag
  const handleAddTag = () => {
    if (!newTag.trim() || tags.includes(newTag.toLowerCase().trim())) return;
    setTags([...tags, newTag.toLowerCase().trim()]);
    setNewTag("");
    setShowTagInput(false);
  };

  // Handle remove tag
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Save changes
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updateData: { categoryId?: string; tags?: string[] } = {};

      if (selectedCategoryId !== article.categoryId) {
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
        }
      }
    } catch (error) {
      console.error("Failed to save categories/tags:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle new tag keypress
  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
      className="surface-card p-6 space-y-4"
    >
      <div className="flex items-center justify-between pb-2 border-b border-stone-50">
        <h4 className="text-xs font-bold uppercase tracking-widest text-stone-900">
          Categories & Tags
        </h4>
        {hasChanges && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={isSaving}
            className="text-primary flex items-center gap-1 text-xs font-semibold disabled:opacity-50"
          >
            {isSaving ? (
              <FiLoader className="text-sm animate-spin" />
            ) : (
              <FiSave className="text-sm" />
            )}
            Save
          </motion.button>
        )}
      </div>

      <div className="space-y-4">
        {/* Category */}
        <div className="relative">
          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">
            Category
          </label>
          <div className="relative">
            <select
              value={selectedCategoryId}
              onChange={handleCategoryChange}
              className="surface-input w-full appearance-none cursor-pointer pr-10"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 2px 8px rgba(249, 115, 22, 0.3)",
                }}
                className="px-2 py-1 text-[10px] font-bold rounded flex items-center gap-1 cursor-default transition-shadow bg-primary-50 text-primary"
              >
                {tag}
                <motion.span
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  className="cursor-pointer"
                  onClick={() => handleRemoveTag(tag)}
                >
                  <FiX className="text-[12px]" />
                </motion.span>
              </motion.span>
            ))}

            {/* Add Tag Button */}
            {showTagInput ? (
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleTagKeyPress}
                  placeholder="Tag name"
                  className="px-2 py-1 text-[10px] font-bold rounded border border-orange-300 bg-white w-20 focus:outline-none focus:border-orange-500"
                  autoFocus
                />
                <button
                  onClick={handleAddTag}
                  className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                >
                  <FiPlus className="text-sm" />
                </button>
                <button
                  onClick={() => {
                    setShowTagInput(false);
                    setNewTag("");
                  }}
                  className="p-1 text-stone-400 hover:bg-stone-100 rounded"
                >
                  <FiX className="text-sm" />
                </button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowTagInput(true)}
                className="px-2 py-1 text-[10px] font-bold rounded border border-dashed border-stone-300 text-stone-400 hover:border-orange-300 hover:text-orange-400 transition-colors"
              >
                <FiPlus className="text-xs inline" /> Add
              </motion.button>
            )}
          </div>
        </div>

        {/* Current Category Display */}
        {article.category && (
          <div className="pt-2 border-t border-stone-50">
            <p className="text-[10px] text-stone-400">Current category</p>
            <p className="text-sm font-semibold text-stone-700">
              {article.category.name}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
