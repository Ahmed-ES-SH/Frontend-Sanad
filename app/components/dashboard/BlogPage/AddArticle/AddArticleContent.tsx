"use client";

import {
  createArticle,
  getCategories,
  togglePublishStatus,
} from "@/app/actions/blogActions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Category } from "@/app/types/global";
import { useAddArticleForm } from "@/app/hooks/useAddArticleForm";
import {
  formatWordCount,
  validateArticleForPublish,
  createArticlePayload,
} from "@/app/helpers/_dashboard/articleHelpers";

import ErrorMessage from "./ErrorMessage";
import AddArticleHeader from "./AddArticleHeader";
import BasicInfoCard from "./BasicInfoCard";
import MediaPreviewCard from "./MediaPreviewCard";
import ArticleEditor from "./ArticleEditor";
import CollaboratorsSidebar from "./CollaboratorsSidebar";
import VersionHistorySidebar from "./VersionHistorySidebar";
import VisibilityCard from "./VisibilityCard";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useLocale } from "@/app/hooks/useLocale";

export default function AddArticleContent() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslation("AddArticlePage");

  const isRTL = locale === "ar";

  const {
    formData,
    tags,
    newTag,
    setNewTag,
    handleInputChange,
    handleContentChange,
    addTag,
    removeTag,
  } = useAddArticleForm();

  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSaveDraft = async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      const payload = createArticlePayload(formData, tags);
      const result = await createArticle(payload);

      if (result.success) {
        router.push(`/${locale}/dashboard/blog`);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(t.failedToSaveDraft || "Failed to save draft");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublishNow = async () => {
    const validation = validateArticleForPublish(formData, {
      pleaseAddExcerpt:
        t.pleaseAddExcerpt || "Please add an excerpt before publishing",
      pleaseAddTitle:
        t.pleaseAddTitle || "Please add a title before publishing",
    });

    if (!validation.isValid) {
      setError(validation.errors[0]);
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const payload = createArticlePayload(formData, tags, formData.title);
      const result = await createArticle(payload);

      if (result.success && result.data) {
        await togglePublishStatus(result.data.id);
        router.push(`/${locale}/dashboard/blog`);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(t.failedToPublish || "Failed to publish article");
    } finally {
      setIsSubmitting(false);
    }
  };

  const wordCount = formatWordCount(formData.content);

  const basicInfoTranslations = {
    articleDetails: t.articleDetails || "Article Details",
    articleTitlePlaceholder:
      t.articleTitlePlaceholder || "Enter a compelling headline...",
    excerpt: t.excerpt || "Excerpt",
    excerptPlaceholder: t.excerptPlaceholder || "Enter a short summary...",
    category: t.category || "Category",
    selectCategory: t.selectCategory || "Select Category",
    tags: t.tags || "Tags",
    addTag: t.addTag || "Add Tag",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="p-4 md:p-8 max-w-[1400px] mx-auto w-full space-y-8"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <ErrorMessage message={error} />

      <AddArticleHeader
        title={t.title || "Add New Article"}
        backToArticles={t.backToArticles || "Back to Articles"}
        drafting={t.drafting || "Drafting"}
        currentTitle={formData.title}
        saveDraft={t.saveDraft || "Save Draft"}
        publishNow={t.publishNow || "Publish Now"}
        untitledMasterpiece={t.untitledMasterpiece || "Untitled Masterpiece"}
        locale={locale}
        isRTL={isRTL}
        onSaveDraft={handleSaveDraft}
        onPublishNow={handlePublishNow}
        isSubmitting={isSubmitting}
      />

      <div className="grid grid-cols-12 gap-6 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="col-span-12 lg:col-span-9 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BasicInfoCard
              formData={formData}
              categories={categories}
              tags={tags}
              newTag={newTag}
              isRTL={isRTL}
              translations={basicInfoTranslations}
              onInputChange={handleInputChange}
              onNewTagChange={setNewTag}
              onAddTag={addTag}
              onRemoveTag={removeTag}
            />
            <MediaPreviewCard
              coverImageUrl={formData.coverImageUrl}
              coverImagePlaceholder={
                t.coverImagePlaceholder || "Enter image URL..."
              }
              cover={t.cover || "Cover"}
              onInputChange={handleInputChange}
            />
          </div>

          <ArticleEditor
            content={formData.content}
            wordCount={wordCount}
            wordsLabel={t.words || "Words"}
            contentPlaceholder={
              t.contentPlaceholder ||
              "Start writing your article content here..."
            }
            onContentChange={handleContentChange}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="col-span-12 lg:col-span-3 space-y-6"
        >
          <CollaboratorsSidebar
            collaborators={t.collaborators || "Collaborators"}
            collaboratorsDesc={
              t.collaboratorsDesc ||
              "Add collaborators to work on this article together."
            }
          />

          <VersionHistorySidebar
            versionHistory={t.versionHistory || "Version History"}
            versionHistoryDesc={
              t.versionHistoryDesc || "Track all changes to your article."
            }
          />

          <VisibilityCard
            publishingSettings={t.publishingSettings || "Publishing Settings"}
            visibility={t.visibility || "Visibility"}
            draft={t.draft || "Draft"}
            publishingNote={
              t.publishingNote || "Save as draft to publish later."
            }
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
