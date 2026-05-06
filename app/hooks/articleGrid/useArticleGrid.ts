"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Article } from "@/app/types/blog";
import { deleteArticle } from "@/app/actions/blogActions";
import { LOADING_CONFIG } from "@/app/constants/articleGrid";

interface UseArticleGridProps {
  initialArticles: Article[];
  currentPage: number;
}

export function useArticleGrid({ initialArticles, currentPage }: UseArticleGridProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Show loading overlay when URL params change (filters applied or pagination)
  useEffect(() => {
    const handleLoading = (state: boolean) => {
      setIsLoading(state);
    };
    handleLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, LOADING_CONFIG.timeout);
    return () => clearTimeout(timeout);
  }, [searchParams, currentPage]);

  // Update articles when initialArticles change (server refetch)
  useEffect(() => {
    const handleUpdates = (articles: Article[]) => {
      setArticles(articles);
    };
    if (initialArticles.length > 0 || articles.length === 0) {
      handleUpdates(initialArticles);
    }
  }, [initialArticles]);

  // Handle delete click - open confirmation
  const handleDeleteClick = useCallback((id: string) => {
    setDeleteId(id);
  }, []);

  // Confirm delete action
  const handleConfirmDelete = useCallback(async () => {
    if (deleteId) {
      setIsLoading(true);
      try {
        await deleteArticle(deleteId);
        setArticles((prevArticles) => prevArticles.filter((a) => a.id !== deleteId));
      } catch (error) {
        console.error("Failed to delete article:", error);
      } finally {
        setIsLoading(false);
        setDeleteId(null);
      }
    }
  }, [deleteId]);

  // Cancel delete action
  const handleCancelDelete = useCallback(() => {
    setDeleteId(null);
  }, []);

  // Handle page change for pagination
  const handlePageChange = useCallback((newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, router, pathname]);

  // Get the article being deleted for the modal
  const articleToDelete = articles.find((a) => a.id === deleteId);

  return {
    articles,
    isLoading,
    deleteId,
    articleToDelete,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    handlePageChange,
  };
}