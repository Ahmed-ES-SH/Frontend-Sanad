"use client";

import {
  createArticle,
  getCategories,
  publishArticle,
} from "@/app/actions/blogActions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Category } from "@/app/types/global";
import { useAddArticleForm } from "@/app/hooks/useAddArticleForm";
import {
  formatWordCount,
  isArticleReadyToPublish,
  validateArticleForPublish,
  validateArticleForSave,
  createArticlePayload,
} from "@/app/helpers/_dashboard/articleHelpers";

import ErrorMessage from "./ErrorMessage";
import AddArticleHeader from "./AddArticleHeader";
import BasicInfoCard from "./BasicInfoCard";
import MediaPreviewCard from "./MediaPreviewCard";
import ArticleEditor from "./ArticleEditor";
import VisibilityCard from "./VisibilityCard";
import ChecklistSidebar, { type ChecklistItem } from "./ChecklistSidebar";
import MobileChecklistDrawer from "./MobileChecklistDrawer";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useLocale } from "@/app/hooks/useLocale";
import { FiCheckCircle } from "react-icons/fi";

export default function AddArticleContent() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslation("AddArticlePage");

  const isRTL = locale === "ar";

  const {
    formData,
    tags,
    newTag,
    fieldErrors,
    topError,
    showTopError,
    setNewTag,
    handleInputChange,
    handleContentChange,
    setFieldError,
    clearAllFieldErrors,
    setTopError,
    addTag,
    removeTag,
  } = useAddArticleForm();

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [mobileChecklistOpen, setMobileChecklistOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getCategories()
      .then((data) => {
        if (cancelled) return;
        setCategories(data);
        setCategoriesError(null);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setCategoriesError(
          err instanceof Error
            ? err.message
            : t.categoriesFailed || "Failed to load categories",
        );
      })
      .finally(() => {
        if (cancelled) return;
        setCategoriesLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [t.categoriesFailed, reloadKey]);

  const handleRetryCategories = () => {
    setCategoriesLoading(true);
    setReloadKey((k) => k + 1);
  };

  const handleSaveDraft = async () => {
    const saveErrors = validateArticleForSave(formData, {
      titleRequired: t.titleRequired || "Please add a title before saving",
      titleTooLong: t.titleTooLong || "Title is too long",
    });

    if (saveErrors.title) {
      setFieldError("title", saveErrors.title);
      setTopError(saveErrors.title);
      return;
    }

    clearAllFieldErrors();
    setTopError(null);
    setIsSubmitting(true);

    try {
      const payload = createArticlePayload(formData, tags);
      const result = await createArticle(payload);

      if (result.success) {
        router.push(`/${locale}/dashboard/blog`);
      } else {
        setTopError(result.message);
      }
    } catch {
      setTopError(t.failedToSaveDraft || "Failed to save draft");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublishNow = async () => {
    const validation = validateArticleForPublish(formData, {
      titleRequired: t.titleRequired || "Please add a title before publishing",
      excerptRequired:
        t.pleaseAddExcerpt || "Please add an excerpt before publishing",
      contentRequired:
        t.contentRequired || "Content should be at least 10 words",
      categoryRequired: t.categoryRequired || "Please pick a category",
      coverRequired: t.coverRequired || "Please add a cover image",
      titleTooLong: t.titleTooLong || "Title is too long",
      excerptTooLong: t.excerptTooLong || "Excerpt is too long",
    });

    if (!validation.isValid) {
      clearAllFieldErrors();
      Object.entries(validation.fields).forEach(([field, msg]) => {
        if (msg) {
          setFieldError(field as keyof typeof validation.fields, msg);
        }
      });
      setTopError(validation.errors[0]);
      const firstInvalidField = Object.keys(validation.fields)[0];
      if (firstInvalidField) {
        const el = document.querySelector<HTMLElement>(
          `[name="${firstInvalidField}"], #article-${firstInvalidField === "categoryId" ? "category" : firstInvalidField}`,
        );
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        if (
          el instanceof HTMLInputElement ||
          el instanceof HTMLTextAreaElement ||
          el instanceof HTMLSelectElement
        ) {
          el.focus();
        }
      }
      return;
    }

    clearAllFieldErrors();
    setTopError(null);
    setIsSubmitting(true);

    try {
      const payload = createArticlePayload(
        formData,
        tags,
        formData.title.trim(),
      );
      const result = await publishArticle(payload, true);

      if (result.success) {
        router.push(`/${locale}/dashboard/blog`);
      } else {
        setTopError(result.message);
      }
    } catch {
      setTopError(t.failedToPublish || "Failed to publish article");
    } finally {
      setIsSubmitting(false);
    }
  };

  const wordCount = formatWordCount(formData.content);
  const readiness = isArticleReadyToPublish(formData);
  const canSaveDraft = !!formData.title.trim();
  const canPublish = readiness.hasTitle && readiness.hasContent;

  const checklistItems: ChecklistItem[] = [
    {
      key: "title",
      label: t.checklistTitle || "Add a title",
      done: readiness.hasTitle,
      hint: t.checklistTitleHint || "Make it specific and descriptive",
    },
    {
      key: "excerpt",
      label: t.checklistExcerpt || "Write an excerpt",
      done: readiness.hasExcerpt,
      hint: t.checklistExcerptHint || "1-2 sentences for previews and search",
    },
    {
      key: "content",
      label: t.checklistContent || "Write at least 10 words of content",
      done: readiness.hasContent,
      hint: readiness.hasContent
        ? `${wordCount} ${t.words || "words"}`
        : t.checklistContentHint || "The body of the article",
    },
    {
      key: "category",
      label: t.checklistCategory || "Pick a category",
      done: readiness.hasCategory,
    },
    {
      key: "cover",
      label: t.checklistCover || "Add a cover image",
      done: readiness.hasCover,
      hint: t.checklistCoverHint || "16:9 works best",
    },
  ];

  const checklistCompleted = checklistItems.filter((i) => i.done).length;
  const checklistTotal = checklistItems.length;
  const allChecklistDone = checklistCompleted === checklistTotal;

  const basicInfoTranslations = {
    articleDetails: t.articleDetails || "Article Details",
    articleTitle: t.articleTitle || "Article title",
    articleTitlePlaceholder:
      t.articleTitlePlaceholder || "Enter a compelling headline...",
    excerpt: t.excerpt || "Excerpt",
    excerptPlaceholder: t.excerptPlaceholder || "Enter a short summary...",
    category: t.category || "Category",
    selectCategory: t.selectCategory || "Select Category",
    tags: t.tags || "Tags",
    addTag: t.addTag || "Add Tag",
    addTagAria: t.addTagAria || "Add tag",
    removeTagAria: t.removeTagAria || "Remove tag",
    tagsAria: t.tagsAria || "Tags",
    titleError: t.titleRequired || "Title is required",
    excerptError: t.pleaseAddExcerpt || "Excerpt is required",
    categoryError: t.categoryRequired || "Category is required",
    categoriesFailed: t.categoriesFailed || "Couldn't load categories.",
    retry: t.retry || "Try again",
    loadingCategories: t.loadingCategories || "Loading categories...",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8  w-full"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="space-y-6 lg:space-y-8">
        <ErrorMessage message={showTopError ? topError : null} />

        <AddArticleHeader
          title={t.title || "Add New Article"}
          backToArticles={t.backToArticles || "Back to Articles"}
          drafting={t.drafting || "Drafting"}
          currentTitle={formData.title}
          saveDraft={t.saveDraft || "Save draft"}
          publishNow={t.publishNow || "Publish now"}
          untitledDraft={t.untitledDraft || "Untitled draft"}
          locale={locale}
          isRTL={isRTL}
          canSaveDraft={canSaveDraft}
          canPublish={canPublish}
          onSaveDraft={handleSaveDraft}
          onPublishNow={handlePublishNow}
          isSubmitting={isSubmitting}
          progress={
            checklistTotal > 0
              ? { completed: checklistCompleted, total: checklistTotal }
              : null
          }
        />

        <div className="grid grid-cols-12 gap-5 lg:gap-6 items-start">
          <div className="col-span-12 lg:col-span-9 space-y-5 lg:space-y-6 min-w-0">
            <div className="grid grid-cols-1  gap-5 lg:gap-6">
              <div className=" min-w-0">
                <BasicInfoCard
                  formData={formData}
                  categories={categories}
                  categoriesLoading={categoriesLoading}
                  categoriesError={categoriesError}
                  onRetryCategories={handleRetryCategories}
                  tags={tags}
                  newTag={newTag}
                  isRTL={isRTL}
                  translations={basicInfoTranslations}
                  fieldErrors={fieldErrors}
                  onInputChange={handleInputChange}
                  onNewTagChange={setNewTag}
                  onAddTag={addTag}
                  onRemoveTag={removeTag}
                />
              </div>
              <div className="md:col-span-1 min-w-0">
                <MediaPreviewCard
                  coverImageUrl={formData.coverImageUrl}
                  coverImageUrlError={fieldErrors.coverImageUrl}
                  cover={t.cover || "Cover"}
                  uploadLabel={t.uploadImage || "Upload image"}
                  uploadHint={
                    t.uploadImageHint || "PNG, JPG, WebP, or GIF up to 5MB"
                  }
                  removeLabel={t.removeImage || "Remove"}
                  pasteUrlLabel={t.pasteUrlInstead || "Paste image URL instead"}
                  pasteUrlPlaceholder={
                    t.coverImagePlaceholder || "https://example.com/image.jpg"
                  }
                  urlInputLabel={t.imageUrl || "Image URL"}
                  fileTooLarge={t.fileTooLarge || "File is larger than 5MB"}
                  invalidFileType={
                    t.invalidFileType || "Only PNG, JPG, WebP, or GIF accepted"
                  }
                  invalidUrl={t.invalidUrl || "Enter a valid URL"}
                  isRTL={isRTL}
                  onInputChange={handleInputChange}
                  onFileSelect={(dataUrl) => {
                    if (dataUrl === null) {
                      handleInputChange({
                        target: { name: "coverImageUrl", value: "" },
                      } as React.ChangeEvent<HTMLInputElement>);
                    } else {
                      handleInputChange({
                        target: { name: "coverImageUrl", value: dataUrl },
                      } as React.ChangeEvent<HTMLInputElement>);
                    }
                  }}
                />
              </div>
            </div>

            <ArticleEditor
              content={formData.content}
              wordCount={wordCount}
              wordsLabel={t.words || "Words"}
              contentPlaceholder={
                t.contentPlaceholder ||
                "Start writing your article content here..."
              }
              contentError={fieldErrors.content}
              contentLabel={t.contentLabel || "Article content"}
              boldLabel={t.boldLabel || "Bold (Ctrl+B)"}
              italicLabel={t.italicLabel || "Italic (Ctrl+I)"}
              bulletListLabel={t.bulletListLabel || "Bullet list"}
              orderedListLabel={t.orderedListLabel || "Numbered list"}
              linkLabel={t.linkLabel || "Add link"}
              imageLabel={t.imageLabel || "Add image URL"}
              codeLabel={t.codeLabel || "Code block"}
              paragraphLabel={t.paragraphLabel || "Paragraph"}
              undoLabel={t.undoLabel || "Undo"}
              redoLabel={t.redoLabel || "Redo"}
              onContentChange={handleContentChange}
              onContentBlur={() => {
                if (fieldErrors.content && readiness.hasContent) {
                  setFieldError("content", undefined);
                }
              }}
            />
          </div>

          <div className="col-span-12 lg:col-span-3 space-y-5 lg:space-y-6 min-w-0 sticky top-24 rigth-0">
            <div className="hidden lg:block sticky top-24 right-0 space-y-5 lg:space-y-6">
              <ChecklistSidebar
                title={t.checklistTitle2 || "Article checklist"}
                items={checklistItems}
                completeLabel={t.checklistComplete || "Ready to publish"}
                remainingLabel={(n) =>
                  t.checklistRemaining
                    ? t.checklistRemaining.replace("{count}", String(n))
                    : `${n} item${n === 1 ? "" : "s"} remaining`
                }
              />
              <VisibilityCard
                publishingSettings={t.publishingSettings || "Publishing"}
                visibility={t.visibility || "Status"}
                draft={t.draft || "Draft"}
                published={t.published || "Published"}
                willPublishLabel={
                  t.willPublishLabel || "Click Publish to make this live"
                }
                willDraftLabel={
                  t.willDraftLabel || "Click Save draft to keep working"
                }
                publishingNote={
                  t.publishingNote || "Save as draft to publish later."
                }
                intent={canPublish ? "publish" : "draft"}
              />
            </div>
            <div className="block lg:hidden">
              <VisibilityCard
                publishingSettings={t.publishingSettings || "Publishing"}
                visibility={t.visibility || "Status"}
                draft={t.draft || "Draft"}
                published={t.published || "Published"}
                willPublishLabel={
                  t.willPublishLabel || "Click Publish to make this live"
                }
                willDraftLabel={
                  t.willDraftLabel || "Click Save draft to keep working"
                }
                publishingNote={
                  t.publishingNote || "Save as draft to publish later."
                }
                intent={canPublish ? "publish" : "draft"}
              />
            </div>
          </div>
        </div>

        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileChecklistOpen(true)}
            className="flex items-center gap-2.5 h-11 px-5 rounded-full bg-stone-900 text-white shadow-surface-lg hover:bg-stone-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            aria-label={
              allChecklistDone
                ? t.checklistComplete || "Ready to publish"
                : (t.checklistRemaining || "{count} items remaining").replace(
                    "{count}",
                    String(checklistTotal - checklistCompleted),
                  )
            }
          >
            <FiCheckCircle
              size={16}
              className={
                allChecklistDone ? "text-emerald-400" : "text-stone-400"
              }
            />
            <span className="text-sm font-semibold tabular-nums">
              {checklistCompleted}/{checklistTotal}
            </span>
          </button>
        </div>

        <MobileChecklistDrawer
          open={mobileChecklistOpen}
          onClose={() => setMobileChecklistOpen(false)}
          title={t.checklistTitle2 || "Article checklist"}
          items={checklistItems}
          completeLabel={t.checklistComplete || "Ready to publish"}
          remainingLabel={(n) =>
            t.checklistRemaining
              ? t.checklistRemaining.replace("{count}", String(n))
              : `${n} item${n === 1 ? "" : "s"} remaining`
          }
        />
      </div>
    </motion.div>
  );
}
