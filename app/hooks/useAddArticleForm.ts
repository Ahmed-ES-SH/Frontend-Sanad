import { useCallback, useState } from "react";
import type { ArticleFormErrors } from "../helpers/_dashboard/articleHelpers";

export interface ArticleFormData {
  title: string;
  content: string;
  excerpt: string;
  coverImageUrl: string;
  categoryId: string;
}

export interface UseAddArticleFormReturn {
  formData: ArticleFormData;
  tags: string[];
  newTag: string;
  fieldErrors: ArticleFormErrors;
  topError: string | null;
  showTopError: boolean;
  setNewTag: React.Dispatch<React.SetStateAction<string>>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleContentChange: (content: string) => void;
  setFieldError: (field: keyof ArticleFormErrors, message: string | undefined) => void;
  clearFieldError: (field: keyof ArticleFormErrors) => void;
  clearAllFieldErrors: () => void;
  setTopError: (message: string | null) => void;
  addTag: () => void;
  removeTag: (tagToRemove: string) => void;
  resetForm: () => void;
}

const EMPTY_FORM: ArticleFormData = {
  title: "",
  content: "",
  excerpt: "",
  coverImageUrl: "",
  categoryId: "",
};

export function useAddArticleForm(): UseAddArticleFormReturn {
  const [formData, setFormData] = useState<ArticleFormData>(EMPTY_FORM);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ArticleFormErrors>({});
  const [topError, setTopErrorState] = useState<string | null>(null);
  const [showTopError, setShowTopError] = useState(false);

  const setFieldError = useCallback(
    (field: keyof ArticleFormErrors, message: string | undefined) => {
      setFieldErrors((prev) => {
        const next = { ...prev };
        if (message) {
          next[field] = message;
        } else {
          delete next[field];
        }
        return next;
      });
    },
    [],
  );

  const clearFieldError = useCallback((field: keyof ArticleFormErrors) => {
    setFieldError(field, undefined);
  }, [setFieldError]);

  const clearAllFieldErrors = useCallback(() => {
    setFieldErrors({});
  }, []);

  const setTopError = useCallback((message: string | null) => {
    setTopErrorState(message);
    setShowTopError(!!message);
  }, []);

  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setFieldError(name as keyof ArticleFormErrors, undefined);
      if (showTopError) {
        setShowTopError(false);
      }
    },
    [setFieldError, showTopError],
  );

  const handleContentChange = useCallback(
    (content: string) => {
      setFormData((prev) => ({ ...prev, content }));
      setFieldError("content", undefined);
      if (showTopError) {
        setShowTopError(false);
      }
    },
    [setFieldError, showTopError],
  );

  const addTag = useCallback(() => {
    const trimmed = newTag.trim();
    if (!trimmed) return;
    setTags((prev) => {
      if (prev.includes(trimmed)) return prev;
      return [...prev, trimmed];
    });
    setNewTag("");
  }, [newTag]);

  const removeTag = useCallback((tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(EMPTY_FORM);
    setTags([]);
    setNewTag("");
    setFieldErrors({});
    setTopErrorState(null);
    setShowTopError(false);
  }, []);

  return {
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
    clearFieldError,
    clearAllFieldErrors,
    setTopError,
    addTag,
    removeTag,
    resetForm,
  };
}