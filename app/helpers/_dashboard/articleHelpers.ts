import { ArticleFormData } from "../../hooks/useAddArticleForm";

export const MIN_CONTENT_WORDS = 10;
export const MAX_TITLE_LENGTH = 200;
export const MAX_EXCERPT_LENGTH = 500;
export const MAX_COVER_IMAGE_BYTES = 5 * 1024 * 1024;

export interface ArticleFormErrors {
  title?: string;
  excerpt?: string;
  content?: string;
  coverImageUrl?: string;
  categoryId?: string;
}

export function formatWordCount(content: string): number {
  const text = stripHtml(content);
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
}

export function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").trim();
}

export function isDataUrl(url: string): boolean {
  return /^data:image\/(png|jpe?g|webp|gif|svg\+xml);/i.test(url);
}

export function isHttpUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  fields: ArticleFormErrors;
}

export interface PublishValidationMessages {
  titleRequired: string;
  excerptRequired: string;
  contentRequired: string;
  categoryRequired: string;
  coverRequired: string;
  titleTooLong: string;
  excerptTooLong: string;
}

export function validateArticleForPublish(
  formData: ArticleFormData,
  messages: PublishValidationMessages,
): ValidationResult {
  const fields: ArticleFormErrors = {};
  const errors: string[] = [];

  const title = formData.title.trim();
  const excerpt = formData.excerpt.trim();
  const content = stripHtml(formData.content).trim();
  const wordCount = content ? content.split(/\s+/).filter(Boolean).length : 0;

  if (!title) {
    fields.title = messages.titleRequired;
    errors.push(messages.titleRequired);
  } else if (title.length > MAX_TITLE_LENGTH) {
    fields.title = messages.titleTooLong;
    errors.push(messages.titleTooLong);
  }

  if (!excerpt) {
    fields.excerpt = messages.excerptRequired;
    errors.push(messages.excerptRequired);
  } else if (excerpt.length > MAX_EXCERPT_LENGTH) {
    fields.excerpt = messages.excerptTooLong;
    errors.push(messages.excerptTooLong);
  }

  if (wordCount < MIN_CONTENT_WORDS) {
    fields.content = messages.contentRequired;
    errors.push(messages.contentRequired);
  }

  if (!formData.categoryId) {
    fields.categoryId = messages.categoryRequired;
    errors.push(messages.categoryRequired);
  }

  if (!formData.coverImageUrl) {
    fields.coverImageUrl = messages.coverRequired;
    errors.push(messages.coverRequired);
  }

  return {
    isValid: errors.length === 0,
    errors,
    fields,
  };
}

export function validateArticleForSave(
  formData: ArticleFormData,
  messages: { titleRequired: string; titleTooLong: string },
): ArticleFormErrors {
  const fields: ArticleFormErrors = {};
  const title = formData.title.trim();

  if (!title) {
    fields.title = messages.titleRequired;
  } else if (title.length > MAX_TITLE_LENGTH) {
    fields.title = messages.titleTooLong;
  }

  return fields;
}

export interface ArticlePayload {
  title: string;
  content: string;
  excerpt: string;
  coverImageUrl: string;
  categoryId?: string;
  tags: string[];
}

export function createArticlePayload(
  formData: ArticleFormData,
  tags: string[],
  defaultTitle: string = "Untitled Draft",
): ArticlePayload {
  return {
    title: formData.title.trim() || defaultTitle,
    content: formData.content,
    excerpt: formData.excerpt.trim(),
    coverImageUrl: formData.coverImageUrl,
    categoryId: formData.categoryId || undefined,
    tags,
  };
}

export function isArticleReadyToPublish(
  formData: ArticleFormData,
): {
  hasTitle: boolean;
  hasExcerpt: boolean;
  hasContent: boolean;
  hasCategory: boolean;
  hasCover: boolean;
  wordCount: number;
} {
  const wordCount = formatWordCount(formData.content);
  return {
    hasTitle: !!formData.title.trim(),
    hasExcerpt: !!formData.excerpt.trim(),
    hasContent: wordCount >= MIN_CONTENT_WORDS,
    hasCategory: !!formData.categoryId,
    hasCover: !!formData.coverImageUrl,
    wordCount,
  };
}
