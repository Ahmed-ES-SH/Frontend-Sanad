"use client";

import { useState, useEffect, useRef, useId, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslation";
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

const easeOut = [0.16, 1, 0.3, 1] as const;

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  loadingLabel: string;
  confirmLabel: string;
  tone: "positive" | "negative";
  title: string;
  description: string;
}

function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  isLoading,
  loadingLabel,
  confirmLabel,
  tone,
  title,
  description,
}: ConfirmDialogProps) {
  const titleId = useId();
  const descId = useId();
  const confirmRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement as HTMLElement;
    confirmRef.current?.focus();
    return () => {
      previousFocusRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const confirmClass =
    tone === "positive"
      ? "bg-emerald-600 hover:bg-emerald-700"
      : "bg-red-600 hover:bg-red-700";
  const iconWrapClass =
    tone === "positive" ? "bg-emerald-50" : "bg-red-50";
  const iconClass = tone === "positive" ? "text-emerald-600" : "text-red-600";
  const Icon = tone === "positive" ? FiCheck : FiAlertTriangle;

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1 }}
      exit={prefersReducedMotion ? undefined : { opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
        exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.2, ease: easeOut }}
        className="bg-white border border-stone-200 rounded-2xl p-6 max-w-sm mx-4 w-full shadow-xl shadow-stone-900/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3.5">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconWrapClass}`}
          >
            <Icon className={`text-lg ${iconClass}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 id={titleId} className="text-base font-semibold text-stone-900">
              {title}
            </h2>
            <p
              id={descId}
              className="text-sm text-stone-500 mt-1.5 leading-relaxed"
            >
              {description}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-stone-300 hover:text-stone-600 transition-colors -mt-1 -mr-1"
          >
            <FiX />
          </button>
        </div>

        <div className="flex gap-2.5 mt-6">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 border border-stone-200 text-stone-600 text-sm font-medium rounded-xl hover:bg-stone-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            ref={confirmRef}
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 px-4 py-2.5 text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50 shadow-sm ${confirmClass}`}
          >
            {isLoading ? loadingLabel : confirmLabel}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslation("ArticleDetails");

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(article.title);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [isTogglingPublish, setIsTogglingPublish] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [showUnpublishConfirm, setShowUnpublishConfirm] = useState(false);

  useEffect(() => {
    setEditTitle(article.title);
  }, [article.title]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return t.notPublishedYet;
    return new Date(dateString).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const formatRelativeTime = (dateString: string | null) => {
    if (!dateString) return t.never;
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return t.justNow;
    if (diffMins < 60) {
      const rtf = new Intl.RelativeTimeFormat(locale === "ar" ? "ar" : "en", { numeric: "auto" });
      return rtf.format(-diffMins, "minute");
    }
    if (diffHours < 24) {
      const rtf = new Intl.RelativeTimeFormat(locale === "ar" ? "ar" : "en", { numeric: "auto" });
      return rtf.format(-diffHours, "hour");
    }
    if (diffDays < 7) {
      const rtf = new Intl.RelativeTimeFormat(locale === "ar" ? "ar" : "en", { numeric: "auto" });
      return rtf.format(-diffDays, "day");
    }
    return formatDate(dateString);
  };

  const editTriggerRef = useRef<HTMLButtonElement>(null);

  const titleInputRef = useRef<HTMLInputElement>(null);

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
    setSaveError("");
    try {
      const result = await updateArticle(article.id, { title: editTitle.trim() });
      if (result.success) {
        setIsEditing(false);
        router.refresh();
      } else {
        setSaveError(t.saveErrorTitle);
      }
    } catch (error) {
      setSaveError(t.saveNetworkError);
    } finally {
      setIsSaving(false);
    }
  };

  const saveTitleRef = useRef(handleSaveTitle);
  saveTitleRef.current = handleSaveTitle;

  useEffect(() => {
    if (isEditing) {
      titleInputRef.current?.focus();
      titleInputRef.current?.select();
    }
  }, [isEditing]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.getAttribute("contenteditable") === "true";

      if (e.key === "e" && !isInteractive && !e.metaKey && !e.ctrlKey && !e.altKey) {
        handleEditClick();
      }
      if (e.key === "Escape") {
        if (showPublishConfirm) setShowPublishConfirm(false);
        if (showUnpublishConfirm) setShowUnpublishConfirm(false);
        if (showDeleteConfirm) setShowDeleteConfirm(false);
        else if (isEditing) handleCancelEdit();
      }
      if (e.key === "s" && isEditing && !isInteractive) {
        saveTitleRef.current();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isEditing, showPublishConfirm, showUnpublishConfirm, showDeleteConfirm]);

  const handlePublishToggle = async () => {
    setIsTogglingPublish(true);
    try {
      const result = await togglePublishStatus(article.id);
      if (result.success) {
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
      <section className="space-y-5">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => router.push("/dashboard/blog")}
            className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 transition-colors"
          >
            <FiArrowLeft className="text-sm" />
            {t.allPosts}
          </button>
          <span className="text-stone-300">/</span>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full ${
              article.isPublished
                ? "bg-emerald-50 text-emerald-700"
                : "bg-stone-100 text-stone-500"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                article.isPublished ? "bg-emerald-500" : "bg-stone-400"
              }`}
            />
            {article.isPublished ? t.published : t.draft}
          </span>
        </div>

        {isEditing ? (
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <input
                ref={titleInputRef}
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="flex-1 text-3xl md:text-[2.75rem] leading-tight font-bold font-display tracking-tight text-stone-900 bg-transparent border-b-2 border-stone-200 focus:border-primary outline-none transition-colors py-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveTitle();
                  if (e.key === "Escape") handleCancelEdit();
                }}
              />
              <div className="flex items-center gap-1 pt-2">
                <button
                  onClick={handleSaveTitle}
                  disabled={isSaving || !editTitle.trim()}
                  aria-label={t.saveTitle}
                  className="p-2.5 text-white bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors shadow-sm"
                >
                  {isSaving ? (
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin block" />
                  ) : (
                    <FiSave className="text-base" />
                  )}
                </button>
                <button
                  onClick={handleCancelEdit}
                  aria-label={t.cancelEditing}
                  className="p-2.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
                >
                  <FiX className="text-base" />
                </button>
              </div>
            </div>
            {saveError && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2" role="alert">{saveError}</p>
            )}
          </div>
        ) : (
          <h1 className="text-3xl md:text-[2.75rem] leading-tight font-bold font-display tracking-tight text-stone-900 text-balance">
            {article.title}
          </h1>
        )}

        <div className="flex items-center justify-between gap-4 pt-1">
          <p className="text-sm text-stone-400">
            {t.lastUpdated} {formatRelativeTime(article.updatedAt)}
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            {article.isPublished && (
              <button
                onClick={handleViewLive}
                className="px-3.5 py-2 text-sm font-medium text-stone-600 hover:text-stone-900 bg-white border border-stone-200 hover:border-stone-300 rounded-lg transition-all flex items-center gap-2"
              >
                <FiEye className="text-sm" />
                {t.viewLive}
              </button>
            )}

            <button
              onClick={() =>
                article.isPublished
                  ? setShowUnpublishConfirm(true)
                  : setShowPublishConfirm(true)
              }
              disabled={isTogglingPublish}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all disabled:opacity-50 border ${
                article.isPublished
                  ? "text-stone-600 bg-white border-stone-200 hover:border-stone-300 hover:text-stone-900"
                  : "text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100"
              }`}
            >
              {isTogglingPublish ? (
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : article.isPublished ? (
                <>
                  <FiXCircle className="text-sm" />
                  {t.confirmUnpublish.confirm}
                </>
              ) : (
                <>
                  <FiCheck className="text-sm" />
                  {t.confirmPublish.confirm}
                </>
              )}
            </button>

            <button
              onClick={() => setShowDeleteConfirm(true)}
              aria-label={t.deleteArticle}
              className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-lg transition-all"
            >
              <FiTrash2 className="text-sm" />
            </button>

            <button
              onClick={handleEditClick}
              disabled={isEditing}
              className="px-4 py-2 text-sm font-semibold bg-primary text-white hover:bg-primary-dark rounded-lg transition-all flex items-center gap-2 disabled:opacity-50 shadow-sm shadow-primary/20"
            >
              <FiEdit2 className="text-sm" />
              {t.editPost}
              <kbd className="hidden md:inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-mono bg-white/20 rounded">
                E
              </kbd>
            </button>
          </div>
        </div>
      </section>

      <ConfirmDialog
        open={showPublishConfirm}
        onClose={() => setShowPublishConfirm(false)}
        onConfirm={handlePublishToggle}
        isLoading={isTogglingPublish}
        loadingLabel={t.confirmPublish.loading}
        confirmLabel={t.confirmPublish.confirm}
        tone="positive"
        title={t.confirmPublish.title}
        description={t.confirmPublish.description}
      />

      <ConfirmDialog
        open={showUnpublishConfirm}
        onClose={() => setShowUnpublishConfirm(false)}
        onConfirm={handlePublishToggle}
        isLoading={isTogglingPublish}
        loadingLabel={t.confirmUnpublish.loading}
        confirmLabel={t.confirmUnpublish.confirm}
        tone="negative"
        title={t.confirmUnpublish.title}
        description={t.confirmUnpublish.description}
      />

      <ConfirmDialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        loadingLabel={t.confirmDelete.loading}
        confirmLabel={t.confirmDelete.confirm}
        tone="negative"
        title={t.confirmDelete.title}
        description={t.confirmDelete.description}
      />
    </>
  );
}
