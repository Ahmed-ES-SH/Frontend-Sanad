import { ArticleFormData } from "../../hooks/useAddArticleForm";

export function formatWordCount(content: string): number {
  return content.split(/\s+/).filter(Boolean).length;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateArticleForPublish(
  formData: ArticleFormData,
  t: {
    pleaseAddExcerpt: string;
    pleaseAddTitle: string;
  },
): ValidationResult {
  const errors: string[] = [];

  if (!formData.title.trim()) {
    errors.push(t.pleaseAddTitle);
  }

  if (!formData.excerpt.trim()) {
    errors.push(t.pleaseAddExcerpt);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
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
    title: formData.title || defaultTitle,
    content: formData.content,
    excerpt: formData.excerpt,
    coverImageUrl: formData.coverImageUrl,
    categoryId: formData.categoryId || undefined,
    tags,
  };
}
