"use client";
import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import type { Project } from "@/app/types/project";
import { directionMap } from "@/app/constants/global";
import { useLocale } from "@/app/hooks/useLocale";
import PortfolioHero from "./PortfolioHero";
import PortfolioGrid from "./PortfolioGrid";
import { useAppQuery } from "@/app/hooks/useAppQuery";
import { PORTFOLIO_ENDPOINTS } from "@/app/constants/endpoints";
import { useTranslation } from "@/app/hooks/useTranslation";
import { PaginationMeta, Category } from "@/app/types/global";

// Lazy load heavy components
const StatsBar = dynamic(() => import("./StatsBar"), {
  loading: () => <div className="h-32" />,
});
const PortfolioCTA = dynamic(() => import("./PortfolioCTA"), {
  loading: () => <div className="h-48" />,
});
const FilterBar = dynamic(() => import("./FilterBar"), {
  ssr: false,
  loading: () => <div className="h-16" />,
});

interface ClientPortfolioProps {
  initialProjects: Project[];
  meta: PaginationMeta;
  categories: Category[];
}

export default function ClientPortfolio({
  initialProjects,
  meta,
  categories: propCategories,
}: ClientPortfolioProps) {
  const locale = useLocale();
  const t = useTranslation("portfolioPage");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [currentMeta, setCurrentMeta] = useState<PaginationMeta>(meta);

  // Dynamic Query Key and Endpoint
  const queryParams = new URLSearchParams();
  if (selectedCategory) queryParams.set("categoryId", selectedCategory);
  queryParams.set("page", currentPage.toString());
  const queryString = queryParams.toString();
  const endpoint = `${PORTFOLIO_ENDPOINTS.LIST_PUBLISHED}${queryString ? `?${queryString}` : ""}`;

  // useAppQuery configured to use initialData if no category or page change is selected
  const { data, isLoading, error, isFetching } = useAppQuery<
    { data: Project[]; meta: PaginationMeta },
    { message?: string }
  >({
    queryKey: ["portfolio-published", selectedCategory, currentPage],
    endpoint,
    options: {
      initialData:
        selectedCategory === null && currentPage === 1
          ? { data: initialProjects, meta }
          : undefined,
    },
  });

  useEffect(() => {
    if (data) {
      if (currentPage === 1) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProjects(data.data);
      } else {
        setProjects((prev) => {
          const newProjects = data.data.filter(
            (p) => !prev.some((existing) => existing.id === p.id),
          );
          return [...prev, ...newProjects];
        });
      }
      setCurrentMeta(data.meta);
    }
  }, [data, currentPage]);

  // Infinite Scroll Observer
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          currentMeta &&
          currentPage < currentMeta.lastPage
        ) {
          setCurrentPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, currentMeta, currentPage],
  );

  // Prepare categories list with an "All" option
  const categoriesList = useMemo(() => {
    return [{ id: null, name: t.all }, ...propCategories];
  }, [propCategories, t.all]);

  const handleCategorySelect = (id: string | null) => {
    setSelectedCategory(id);
    setCurrentPage(1); // Reset to first page when category changes
    setProjects([]);
  };

  if (isLoading && !projects.length) {
    return (
      <div
        dir={directionMap[locale]}
        className="min-h-dvh mt-6 flex items-center justify-center"
        style={{ backgroundColor: "var(--surface-50)" }}
      >
        <div
          className="w-10 h-10 border-4 rounded-full animate-spin"
          style={{
            borderColor: "var(--surface-200)",
            borderTopColor: "var(--primary)",
          }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div
        dir={directionMap[locale]}
        className="min-h-dvh mt-6 flex items-center justify-center"
        style={{ backgroundColor: "var(--surface-50)" }}
      >
        <p className="text-lg" style={{ color: "var(--surface-500)" }}>
          {error?.message || t.failedToLoad}
        </p>
      </div>
    );
  }

  return (
    <div
      dir={directionMap[locale]}
      className="min-h-dvh mt-6"
      style={{ backgroundColor: "var(--surface-50)" }}
    >
      <PortfolioHero
        locale={locale}
        projectCount={currentMeta?.total || projects.length}
      />

      {categoriesList.length > 1 && (
        <FilterBar
          categories={categoriesList as Category[]}
          selectedId={selectedCategory}
          onSelect={handleCategorySelect}
          locale={locale}
        />
      )}

      <PortfolioGrid projects={projects} />

      {/* Infinite Scroll Sentinel */}
      <div
        ref={lastElementRef}
        className="h-20 flex items-center justify-center mt-8"
      >
        {isFetching && currentPage > 1 && (
          <div
            className="w-8 h-8 border-4 rounded-full animate-spin"
            style={{
              borderColor: "var(--surface-200)",
              borderTopColor: "var(--primary)",
            }}
          />
        )}
      </div>
      <StatsBar locale={locale} />
      <PortfolioCTA locale={locale} />
    </div>
  );
}
