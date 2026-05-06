"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiEye,
  FiXCircle,
  FiEdit2,
  FiAlertTriangle,
  FiX,
  FiCheck,
  FiSave,
  FiTrash2,
  FiArrowLeft,
} from "react-icons/fi";
import { Article } from "@/app/types/blog";
import {
  updateArticle,
  togglePublishStatus,
  deleteArticle,
} from "@/app/actions/blogActions";

interface ArticleHeaderProps {
  article: Article;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const router = useRouter();

  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(article.title);
  const [isSaving, setIsSaving] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);

  // State for publish/unpublish modal
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [isTogglingPublish, setIsTogglingPublish] = useState(false);

  // State for delete modal
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // State for unpublish modal
  const [showUnpublishConfirm, setShowUnpublishConfirm] = useState(false);

  // Reset edit title when article changes
  useEffect(() => {
    setEditTitle(article.title);
  }, [article.title]);

  // Format date helper
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not published yet";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // Format relative time
  const formatRelativeTime = (dateString: string | null) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60)
      return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    return formatDate(dateString);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === "INPUT" || target.tagName === "TEXTAREA";

      // E for Edit (when not in input)
      if (e.key === "e" && !isInput && !e.metaKey && !e.ctrlKey && !e.altKey) {
        handleEditClick();
      }
      // S for Save (when editing)
      if ((e.key === "s" || e.key === "Escape") && isEditing) {
        if (e.key === "s") handleSaveTitle();
        else handleCancelEdit();
      }
      // Escape to close modals
      if (e.key === "Escape") {
        if (showPublishConfirm) setShowPublishConfirm(false);
        if (showUnpublishConfirm) setShowUnpublishConfirm(false);
        if (showDeleteConfirm) setShowDeleteConfirm(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isEditing, showPublishConfirm, showUnpublishConfirm, showDeleteConfirm]);

  const handleEditClick = () => {
    if (isEditing) return;
    setIsEditing(true);
    setEditTitle(article.title);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(article.title);
  };

  const handleSaveTitle = async () => {
    if (!editTitle.trim() || editTitle === article.title) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    try {
      const result = await updateArticle(article.id, {
        title: editTitle.trim(),
      });
      if (result.success) {
        setEditSuccess(true);
        setTimeout(() => setEditSuccess(false), 2000);
      }
    } catch (error) {
      console.error("Failed to update title:", error);
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  };

  const handlePublishToggle = async () => {
    setIsTogglingPublish(true);
    try {
      const result = await togglePublishStatus(article.id);
      if (result.success) {
        // Refresh the page data - router.refresh() will re-fetch server data
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to toggle publish status:", error);
    } finally {
      setIsTogglingPublish(false);
      setShowPublishConfirm(false);
      setShowUnpublishConfirm(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteArticle(article.id);
      if (result.success) {
        router.push("/dashboard/blog");
      }
    } catch (error) {
      console.error("Failed to delete article:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleViewLive = () => {
    window.open(`/blog/${article.slug}`, "_blank");
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${
                article.isPublished
                  ? "bg-primary-100 text-orange-800"
                  : "bg-stone-200 text-stone-600"
              }`}
            >
              {article.isPublished ? "Published" : "Draft"}
            </span>
            <span className="text-stone-400 text-sm">
              Last updated {formatRelativeTime(article.updatedAt)}
            </span>
          </div>

          {/* Title - Editable */}
          {isEditing ? (
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="text-4xl font-extrabold font-display tracking-tight text-stone-900 bg-transparent border-b-2 border-orange-500 focus:outline-none flex-1 max-w-3xl"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveTitle();
                  if (e.key === "Escape") handleCancelEdit();
                }}
              />
              <button
                onClick={handleSaveTitle}
                disabled={isSaving || !editTitle.trim()}
                className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin block" />
                ) : (
                  <FiSave className="text-xl" />
                )}
              </button>
              <button
                onClick={handleCancelEdit}
                className="p-2 bg-stone-200 text-stone-600 rounded-lg hover:bg-stone-300"
              >
                <FiX className="text-xl" />
              </button>
            </div>
          ) : (
            <h2 className="text-4xl font-extrabold font-display tracking-tight text-stone-900">
              {article.title}
            </h2>
          )}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Back to Blog */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/dashboard/blog")}
            className="px-5 py-2.5 bg-stone-200/50 text-stone-700 font-semibold rounded-lg hover:bg-stone-300 transition-colors flex items-center gap-2"
          >
            <FiArrowLeft className="text-xl" />
            All Posts
          </motion.button>

          {/* View Live */}
          {article.isPublished && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleViewLive}
              className="px-5 py-2.5 bg-stone-200/50 text-stone-700 font-semibold rounded-lg hover:bg-stone-300 transition-colors flex items-center gap-2"
            >
              <FiEye className="text-xl" />
              View Live
            </motion.button>
          )}

          {/* Publish/Unpublish */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              article.isPublished
                ? setShowUnpublishConfirm(true)
                : setShowPublishConfirm(true)
            }
            disabled={isTogglingPublish}
            className={`px-5 py-2.5 font-semibold rounded-lg flex items-center gap-2 ${
              article.isPublished
                ? "bg-stone-200/50 text-stone-700 hover:bg-stone-300"
                : "bg-emerald-500 text-white hover:bg-emerald-600"
            } transition-colors`}
          >
            {isTogglingPublish ? (
              <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : article.isPublished ? (
              <>
                <FiXCircle className="text-xl" />
                Unpublish
              </>
            ) : (
              <>
                <FiCheck className="text-xl" />
                Publish
              </>
            )}
          </motion.button>

          {/* Delete */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowDeleteConfirm(true)}
            className="px-5 py-2.5 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2"
          >
            <FiTrash2 className="text-xl" />
          </motion.button>

          {/* Edit Post */}
          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow: "0 8px 24px rgba(249, 115, 22, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={handleEditClick}
            disabled={isEditing}
            className="px-5 py-2.5 bg-gradient-primary text-white font-bold rounded-lg shadow-button hover:shadow-button-hover hover:opacity-90 transition-all flex items-center gap-2 group relative overflow-hidden disabled:opacity-70"
          >
            <motion.span
              animate={editSuccess ? { scale: [1, 1.2, 0] } : {}}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center bg-emerald-500"
            ></motion.span>
            <span className="relative z-10 flex items-center gap-2">
              <FiEdit2 className="text-xl" />
              <span>Edit Post</span>
              <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono bg-white/20 rounded ml-1 group-hover:bg-white/30 transition-colors">
                E
              </kbd>
            </span>
          </motion.button>
        </div>
      </motion.section>

      {/* Publish Confirmation Modal */}
      <AnimatePresence>
        {showPublishConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm"
            onClick={() => setShowPublishConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
              className="surface-card p-6 max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <FiCheck className="text-xl text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold font-display text-stone-900">
                    Publish this article?
                  </h3>
                  <p className="text-stone-600 text-sm mt-2 leading-relaxed">
                    This will make the article visible to the public. You can
                    unpublish it anytime.
                  </p>
                </div>
                <button
                  onClick={() => setShowPublishConfirm(false)}
                  className="text-stone-400 hover:text-stone-600 transition-colors"
                >
                  <FiX />
                </button>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowPublishConfirm(false)}
                  className="flex-1 px-4 py-2.5 border border-stone-200 text-stone-700 font-semibold rounded-lg hover:bg-stone-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePublishToggle}
                  disabled={isTogglingPublish}
                  className="flex-1 px-4 py-2.5 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
                >
                  {isTogglingPublish ? "Publishing..." : "Publish"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unpublish Confirmation Modal */}
      <AnimatePresence>
        {showUnpublishConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm"
            onClick={() => setShowUnpublishConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
              className="surface-card p-6 max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <FiAlertTriangle className="text-xl text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold font-display text-stone-900">
                    Unpublish this article?
                  </h3>
                  <p className="text-stone-600 text-sm mt-2 leading-relaxed">
                    This will remove the article from your website. Don't
                    worry—you can publish it again anytime from the article
                    list.
                  </p>
                </div>
                <button
                  onClick={() => setShowUnpublishConfirm(false)}
                  className="text-stone-400 hover:text-stone-600 transition-colors"
                >
                  <FiX />
                </button>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowUnpublishConfirm(false)}
                  className="flex-1 px-4 py-2.5 border border-stone-200 text-stone-700 font-semibold rounded-lg hover:bg-stone-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePublishToggle}
                  disabled={isTogglingPublish}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isTogglingPublish ? "Unpublishing..." : "Unpublish"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
              className="surface-card p-6 max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <FiTrash2 className="text-xl text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold font-display text-stone-900">
                    Delete this article?
                  </h3>
                  <p className="text-stone-600 text-sm mt-2 leading-relaxed">
                    This action cannot be undone. The article will be
                    permanently deleted.
                  </p>
                </div>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="text-stone-400 hover:text-stone-600 transition-colors"
                >
                  <FiX />
                </button>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2.5 border border-stone-200 text-stone-700 font-semibold rounded-lg hover:bg-stone-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isDeleting ? "Deleting..." : "Delete Article"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
