"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import CategoryLoadingOverlay from "./CategoryLoadingOverlay";
import { Category } from "@/app/types/global";
import { motion, AnimatePresence } from "framer-motion";

import "swiper/css";
import "swiper/css/free-mode";

interface ProjectsCategoriesFilterProps {
  isLoading: boolean;
  categories: Category[];
  locale: string;
  handleCategoryChange: (category: string | null) => void;
  selectedCategory: string | null;
  t: {
    all: string;
  };
}

export default function ProjectsCategoriesFilter({
  isLoading,
  categories,
  locale,
  handleCategoryChange,
  selectedCategory,
  t,
}: ProjectsCategoriesFilterProps) {
  const isRtl = locale === "ar";

  return (
    <div className="flex justify-center group relative my-6 w-full">
      <Swiper
        dir={isRtl ? "rtl" : "ltr"}
        slidesPerView="auto"
        spaceBetween={12}
        freeMode={true}
        mousewheel={{ forceToAxis: true }}
        grabCursor={true}
        centerInsufficientSlides={true}
        modules={[FreeMode, Mousewheel]}
        className="w-full"
        wrapperClass="px-4 md:px-0"
      >
        {/* "All" Category button */}
        <SwiperSlide className="w-auto!">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap min-h-[44px] flex items-center justify-center ${
              selectedCategory === null
                ? "text-white shadow-button"
                : "bg-surface-50 text-surface-600 hover:bg-surface-100 border border-surface-200"
            }`}
            onClick={() => handleCategoryChange(null)}
          >
            <AnimatePresence>
              {selectedCategory === null && (
                <motion.div
                  layoutId="activeProjectFilter"
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </AnimatePresence>
            {t.all}
          </motion.button>
        </SwiperSlide>

        {/* Dynamic categories from props */}
        {categories &&
          Array.isArray(categories) &&
          categories.slice(0, 5).map((category, index) => {
            const isActive = selectedCategory === category.id;
            return (
              <SwiperSlide key={category.id || index} className="w-auto!">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap min-h-[44px] flex items-center justify-center ${
                    isActive
                      ? "text-white shadow-button"
                      : "bg-surface-50 text-surface-600 hover:bg-surface-100 border border-surface-200"
                  }`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="activeProjectFilter"
                        className="absolute inset-0 bg-primary rounded-full -z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </AnimatePresence>
                  {category?.name}
                </motion.button>
              </SwiperSlide>
            );
          })}
      </Swiper>

      {/* Loading overlay shown specifically during category filtering */}
      {isLoading && <CategoryLoadingOverlay />}
    </div>
  );
}
