"use client";
import { useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiFilter } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import { Project } from "@/app/types/project";
import { Category } from "@/app/types/global";
import useVariablesStore from "@/app/store/VariablesSlice";
import { useTranslation } from "@/app/hooks/useTranslation";

interface SidebarFilterProps {
  projects: Project[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  setCurrentPage: (page: number) => void;
  setIsSidebarOpen: (open: boolean) => void;
  isSidebarOpen: boolean;
  allLabel: string;
  locale: "en" | "ar";
}

export default function SidebarFilter({
  projects,
  selectedCategory,
  setSelectedCategory,
  setCurrentPage,
  setIsSidebarOpen,
  isSidebarOpen,
  allLabel,
  locale,
}: SidebarFilterProps) {
  const t = useTranslation("portfolioPage");
  const { width } = useVariablesStore();
  const categories = useMemo(() => {
    const uniqueCategoryNames = new Set<string>();
    const projectCategories: Category[] = [];

    projects.forEach((p) => {
      if (p.category && !uniqueCategoryNames.has(p.category.name)) {
        uniqueCategoryNames.add(p.category.name);
        projectCategories.push(p.category);
      }
    });

    const allCategory: Category = {
      id: "all",
      name: allLabel,
      slug: "all",
      description: "",
      color: "",
      icon: "",
      order: -1,
      createdAt: "",
      updatedAt: "",
    };

    return [allCategory, ...projectCategories];
  }, [projects, allLabel]);

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setCurrentPage(1);
    if (width < 1024) setIsSidebarOpen(false);
  };

  useEffect(() => {
    if (width > 1024) {
      setIsSidebarOpen(true);
    }
  }, [setIsSidebarOpen, width]);

  return (
    <>
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 z-50 p-3 rounded-xl text-white shadow-lg transition-all duration-200"
          style={{ backgroundColor: "var(--primary)" }}
          aria-label={t.openFilters}
        >
          <FiFilter className="size-5" />
        </button>
      )}
      {/* Sidebar - Desktop/Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Mobile Overlay */}
            <motion.div
              className="lg:hidden fixed inset-0 z-[9998] bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.div
              className="max-lg:fixed max-lg:h-screen max-lg:w-[340px] top-0 left-0 max-lg:z-[9999] block w-72 flex-shrink-0"
              initial={{ x: -400 }}
              animate={{ x: 0 }}
              exit={{ x: -400 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div
                className="max-lg:h-full max-lg:w-full lg:rounded-xl lg:shadow-sm lg:border p-6 lg:sticky top-24"
                style={{
                  backgroundColor: "var(--surface-50)",
                  borderColor: "var(--surface-200)",
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className="text-lg font-semibold flex items-center gap-2"
                    style={{ color: "var(--surface-900)" }}
                  >
                    <FiFilter
                      className="w-4 h-4"
                      style={{ color: "var(--primary)" }}
                    />
                    {t.filters}
                  </h3>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="lg:hidden p-1 rounded-md transition-colors"
                    style={{ color: "var(--surface-400)" }}
                    aria-label={t.closeFilters}
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-1">
                  {categories.map((category: Category) => {
                    const projectCount =
                      category.name === allLabel
                        ? projects.length
                        : projects.filter(
                            (p) => p.category?.name === category?.name,
                          ).length;

                    return (
                      <button
                        key={category?.id}
                        onClick={() => handleCategoryChange(category.name)}
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 flex items-center justify-between ${
                          selectedCategory === category.name
                            ? "bg-primary text-white"
                            : "bg-transparent text-surface-600"
                        }`}
                        onMouseEnter={(e) => {
                          if (selectedCategory !== category.name) {
                            (
                              e.currentTarget as HTMLElement
                            ).style.backgroundColor = "var(--surface-100)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedCategory !== category.name) {
                            (
                              e.currentTarget as HTMLElement
                            ).style.backgroundColor = "transparent";
                          }
                        }}
                      >
                        <span>{category.name}</span>
                        <span className="text-xs opacity-60">
                          {projectCount}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
