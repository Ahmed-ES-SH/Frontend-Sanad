"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiSave,
  FiImage,
  FiTag,
  FiFolder,
  FiAlertCircle,
} from "react-icons/fi";
import { createArticle, getCategories } from "@/app/actions/blogActions";
import { Category } from "@/app/types/global";
import Image from "next/image";

// Form data interface
interface FormData {
  title: string;
  content: string;
  excerpt: string;
  coverImageUrl: string;
  categoryId: string;
  tags: string[];
}

// Initial form state
const initialFormData: FormData = {
  title: "",
  content: "",
  excerpt: "",
  coverImageUrl: "",
  categoryId: "",
  tags: [],
};

export default function CreateArticlePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newTag, setNewTag] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await getCategories();
        setCategories(cats as Category[]);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };
    loadCategories();
  }, []);

  // Update form field
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Add tag
  const handleAddTag = () => {
    if (!newTag.trim()) return;
    if (formData.tags.includes(newTag.toLowerCase().trim())) return;
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, newTag.toLowerCase().trim()],
    }));
    setNewTag("");
    setShowTagInput(false);
  };

  // Remove tag
  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  // Validate form
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 300) {
      newErrors.title = "Title must be less than 300 characters";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSaving(true);
    try {
      const result = await createArticle({
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt || undefined,
        coverImageUrl: formData.coverImageUrl || undefined,
        categoryId: formData.categoryId || undefined,
        tags: formData.tags,
      });

      if (result.success && result.data) {
        router.push(
          `/dashboard/blog/${result.data.id}?articleId=${result.data.id}`,
        );
      } else {
        setErrors({ general: result.message || "Failed to create article" });
      }
    } catch (error) {
      setErrors({ general: "An error occurred while creating the article" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="pt-24 pb-12 px-8 min-h-screen bg-stone-50 text-stone-900">
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => router.push("/dashboard/blog")}
              className="p-2 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors"
            >
              <FiArrowLeft className="text-xl text-stone-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold font-display text-stone-900">
                Create New Article
              </h1>
              <p className="text-stone-500 text-sm">
                Write a new blog post (saved as draft)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push("/dashboard/blog")}
              className="px-5 py-2.5 bg-stone-200 text-stone-700 font-semibold rounded-lg hover:bg-stone-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2.5 bg-gradient-primary text-white font-bold rounded-lg shadow-button hover:shadow-button-hover hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <FiSave className="text-xl" />
                  Create Article
                </>
              )}
            </button>
          </div>
        </motion.section>

        {/* General Error */}
        {errors.general && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700"
          >
            <FiAlertCircle className="text-xl" />
            <span>{errors.general}</span>
          </motion.div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="surface-card p-6"
            >
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">
                Article Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full text-2xl font-bold font-display text-stone-900 bg-transparent border-b border-stone-200 focus:border-orange-500 focus:outline-none pb-2"
                placeholder="Enter article title..."
                maxLength={300}
              />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-red-500">
                  {errors.title && <FiAlertCircle className="inline mr-1" />}
                  {errors.title}
                </span>
                <span className="text-xs text-stone-400">
                  {formData.title.length}/300
                </span>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="surface-card p-6"
            >
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">
                Content *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="w-full min-h-[400px] text-stone-700 bg-stone-50 rounded-lg border border-stone-100 focus:border-orange-500 focus:outline-none p-4"
                placeholder="Write your article content here (HTML supported)..."
              />
              <div className="mt-2">
                <span className="text-xs text-red-500">
                  {errors.content && <FiAlertCircle className="inline mr-1" />}
                  {errors.content}
                </span>
              </div>
            </motion.div>

            {/* Excerpt */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="surface-card p-6"
            >
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">
                Excerpt (Summary)
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                className="w-full min-h-[120px] text-stone-700 bg-stone-50 rounded-lg border border-stone-100 focus:border-orange-500 focus:outline-none p-4"
                placeholder="Brief summary of the article (shown in card previews)..."
              />
              <p className="text-xs text-stone-400 mt-2">
                {formData.excerpt.length}/320 characters (recommended: 120-160)
              </p>
            </motion.div>
          </div>

          {/* Right Column - Settings */}
          <div className="lg:col-span-4 space-y-6">
            {/* Cover Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="surface-card p-6 space-y-4"
            >
              <div className="flex items-center gap-2">
                <FiImage className="text-stone-400" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900">
                  Cover Image
                </h3>
              </div>
              <input
                type="url"
                name="coverImageUrl"
                value={formData.coverImageUrl}
                onChange={handleChange}
                className="surface-input w-full"
                placeholder="https://example.com/image.jpg"
              />
              {formData.coverImageUrl && (
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <Image
                    src={formData.coverImageUrl}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </motion.div>

            {/* Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="surface-card p-6 space-y-4"
            >
              <div className="flex items-center gap-2">
                <FiFolder className="text-stone-400" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900">
                  Category
                </h3>
              </div>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="surface-input w-full"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="surface-card p-6 space-y-4"
            >
              <div className="flex items-center gap-2">
                <FiTag className="text-stone-400" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900">
                  Tags
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-bold rounded flex items-center gap-1 bg-primary-50 text-primary"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-orange-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {showTagInput ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      className="px-2 py-1 text-xs font-bold rounded border border-orange-300 w-20 focus:outline-none"
                      placeholder="tag"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="text-emerald-600"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowTagInput(false);
                        setNewTag("");
                      }}
                      className="text-stone-400"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowTagInput(true)}
                    className="px-2 py-1 text-xs font-bold rounded border border-dashed border-stone-300 text-stone-400 hover:border-orange-300"
                  >
                    + Add
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </form>
    </main>
  );
}
