/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  createCategory,
  updateCategory,
} from "@/app/actions/categoriesActions";
import { Category } from "@/app/types/category";
import { createPortal } from "react-dom";
import {
  FiFolder,
  FiLink,
  FiAlignLeft,
  FiImage,
  FiX,
  FiCheck,
} from "react-icons/fi";
import { BiLoader } from "react-icons/bi";
import IconPicker from "@/app/components/global/IconPicker";
import { getIconComponent } from "@/app/helpers/getIconComponent";

const PRESET_COLORS = [
  "#f97316", // Primary Orange
  "#f59e0b", // Amber
  "#06b6d4", // Cyan
  "#10b981", // Emerald
  "#6366f1", // Indigo
  "#ec4899", // Pink
  "#8b5cf6", // Violet
  "#14b8a6", // Teal
];

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category?: Category | null;
}

export function CategoryFormModal({
  isOpen,
  onClose,
  onSuccess,
  category,
}: CategoryFormModalProps) {
  const isEditMode = !!category;

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#f97316"); // Default orange
  const [icon, setIcon] = useState("");
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  // Populate form when category is provided (edit mode)
  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setSlug(category.slug || "");
      setDescription(category.description || "");
      setColor(category.color || "#f97316");
      setIcon(category.icon || "");
    } else {
      // Reset form when creating new category
      setName("");
      setSlug("");
      setDescription("");
      setColor("#f97316");
      setIcon("");
    }
  }, [category, isOpen]);

  useEffect(() => {
    const handleMounted = (status: boolean) => {
      setMounted(status);
    };
    handleMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Pure logic validation
    if (!name.trim()) {
      setError("Category name is required");
      return;
    }

    if (color && !/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
      setError("Invalid hex color code");
      return;
    }

    setError("");
    setLoading(true);

    const formData = {
      name,
      slug: slug.trim() || undefined,
      description: description.trim() || undefined,
      color: color.trim() || undefined,
      icon: icon.trim() || undefined,
    };

    try {
      let res;

      if (isEditMode && category) {
        res = await updateCategory(category.id, formData);
      } else {
        res = await createCategory(formData);
      }

      if (res.success) {
        // Reset form
        setName("");
        setSlug("");
        setDescription("");
        setColor("#f97316");
        setIcon("");
        onSuccess();
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError(
        (err as Error)?.message ||
          `Failed to ${isEditMode ? "update" : "create"} category`,
      );
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
    transition: { type: "spring", stiffness: 300, damping: 24 },
  };

  const content = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!loading ? onClose : undefined}
            className="fixed inset-0 z-998 bg-surface-900/80 backdrop-blur-[2px]"
          />
          <div className="fixed inset-0 z-999 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-xl bg-surface-50 border border-surface-200 rounded-2xl shadow-surface-xl pointer-events-auto overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="relative p-6 bg-white border-b border-surface-200 shrink-0">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-surface-900 font-display tracking-tight">
                      {isEditMode ? "Edit Category" : "New Category"}
                    </h2>
                    <p className="text-sm text-surface-500 mt-1 font-medium">
                      {isEditMode
                        ? "Update the category details below."
                        : "Create a new category to organize your services."}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    disabled={loading}
                    className="p-2 text-surface-400 hover:text-surface-900 hover:bg-surface-100 rounded-xl transition-colors disabled:opacity-50"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-2 mb-8 h-[50pvh] overflow-y-auto custom-scrollbar">
                <motion.form
                  id="categoryForm"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                          marginBottom: 20,
                        }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl font-medium flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-red-600 font-bold text-xs">
                              !
                            </span>
                          </div>
                          <p>{error}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="block text-sm font-semibold text-surface-700">
                      Name <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-surface-400">
                        <FiFolder className="w-4.5 h-4.5" />
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Web Development"
                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-surface-200 rounded-xl text-surface-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-surface-400 font-medium"
                        disabled={loading}
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-semibold text-surface-700">
                        Slug
                      </label>
                      <span className="text-xs font-medium text-surface-400">
                        Optional
                      </span>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-surface-400">
                        <FiLink className="w-4.5 h-4.5" />
                      </div>
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="e.g., web-development"
                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-surface-200 rounded-xl text-surface-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-surface-400 font-medium"
                        disabled={loading}
                      />
                    </div>
                    <p className="text-xs text-surface-500 font-medium ml-1">
                      Auto-generated from name if left empty.
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="block text-sm font-semibold text-surface-700">
                      Description
                    </label>
                    <div className="relative">
                      <div className="absolute top-3.5 left-3.5 pointer-events-none text-surface-400">
                        <FiAlignLeft className="w-4.5 h-4.5" />
                      </div>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        placeholder="Brief explanation of this category..."
                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-surface-200 rounded-xl text-surface-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-surface-400 font-medium resize-none"
                        disabled={loading}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1  gap-5"
                  >
                    <div className="space-y-1.5">
                      <label className="block text-sm font-semibold text-surface-700">
                        Brand Color
                      </label>
                      <div className="p-3 bg-white border border-surface-200 rounded-xl space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-surface-200 shrink-0 shadow-sm">
                            <input
                              type="color"
                              value={color}
                              onChange={(e) => setColor(e.target.value)}
                              className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer"
                              disabled={loading}
                            />
                          </div>
                          <input
                            type="text"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="w-full px-3 py-2 bg-surface-50 border border-surface-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm font-semibold uppercase transition-colors"
                            disabled={loading}
                          />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {PRESET_COLORS.map((c) => (
                            <button
                              key={c}
                              type="button"
                              disabled={loading}
                              onClick={() => setColor(c)}
                              className={`w-6 h-6 rounded-full border transition-transform hover:scale-110 flex items-center justify-center ${color.toLowerCase() === c.toLowerCase() ? "border-surface-900 scale-110 shadow-sm" : "border-black/10"}`}
                              style={{ backgroundColor: c }}
                            >
                              {color.toLowerCase() === c.toLowerCase() && (
                                <FiCheck className="w-3 h-3 text-white drop-shadow-md" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-sm font-semibold text-surface-700">
                        Icon
                      </label>
                      <div className="p-3 bg-white border border-surface-200 rounded-xl h-full flex flex-col gap-3">
                        <button
                          type="button"
                          disabled={loading}
                          onClick={() => setShowIconPicker(true)}
                          className="flex items-center gap-3 w-full px-3 py-2 bg-surface-50 border border-surface-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors disabled:opacity-50"
                        >
                          <div className="w-9 h-9 rounded-md bg-white border border-surface-200 flex items-center justify-center text-surface-600 shrink-0">
                            {icon ? (
                              (() => {
                                const Icon = getIconComponent(icon);
                                return <Icon className="text-lg" />;
                              })()
                            ) : (
                              <FiImage className="w-4.5 h-4.5 text-surface-400" />
                            )}
                          </div>
                          <span className="text-sm font-medium text-surface-700 truncate text-left flex-1">
                            {icon || "Pick an icon..."}
                          </span>
                          {icon && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIcon("");
                              }}
                              disabled={loading}
                              className="p-1 rounded text-surface-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                              title="Clear icon"
                            >
                              <FiX className="w-4 h-4" />
                            </button>
                          )}
                        </button>
                        <p className="text-xs text-surface-500 font-medium">
                          Click to choose an icon from the library.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.form>
              </div>

              <div className="p-5 border-t border-surface-200 flex items-center justify-end gap-3 bg-white shrink-0">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="px-5 py-2.5 text-surface-600 font-semibold rounded-xl hover:bg-surface-100 hover:text-surface-900 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="categoryForm"
                  disabled={loading}
                  className="px-6 py-2.5 bg-linear-to-r from-primary to-accent-amber text-white font-semibold rounded-xl shadow-[0_4px_14px_0_rgba(249,115,22,0.39)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.23)] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -left-full group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out"></div>
                  {loading ? (
                    <>
                      <BiLoader className="animate-spin text-white w-5 h-5" />
                      {isEditMode ? "Updating..." : "Creating..."}
                    </>
                  ) : isEditMode ? (
                    "Update Category"
                  ) : (
                    "Create Category"
                  )}
                </button>
              </div>
            </motion.div>
          </div>

          <IconPicker
            selectedIcon={icon}
            show={showIconPicker}
            onChange={(iconName) => {
              setIcon(iconName);
              setShowIconPicker(false);
            }}
            onClose={() => setShowIconPicker(false)}
          />
        </>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;

  return createPortal(content, document.body);
}
