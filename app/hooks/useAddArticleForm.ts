import { useState, useCallback } from "react";

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
  setFormData: React.Dispatch<React.SetStateAction<ArticleFormData>>;
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  setNewTag: React.Dispatch<React.SetStateAction<string>>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleContentChange: (content: string) => void;
  addTag: () => void;
  removeTag: (tagToRemove: string) => void;
}

export function useAddArticleForm(): UseAddArticleFormReturn {
  const [formData, setFormData] = useState<ArticleFormData>({
    title: "",
    content: "",
    excerpt: "",
    coverImageUrl: "",
    categoryId: "",
  });
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleContentChange = useCallback((content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  }, []);

  const addTag = useCallback(() => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags((prev) => [...prev, newTag.trim()]);
      setNewTag("");
    }
  }, [newTag, tags]);

  const removeTag = useCallback((tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  }, []);

  return {
    formData,
    tags,
    newTag,
    setFormData,
    setTags,
    setNewTag,
    handleInputChange,
    handleContentChange,
    addTag,
    removeTag,
  };
}