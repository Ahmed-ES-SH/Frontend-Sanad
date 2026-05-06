"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { Article } from "@/app/types/blog";
import { useLocale } from "@/app/hooks/useLocale";
import { directionMap } from "@/app/constants/global";
import ArticleCard from "../ArticleCard";

import "swiper/css";
import "swiper/css/navigation";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function RelatedArticlesSlider({
  articles,
}: {
  articles: Article[];
}) {
  const locale = useLocale();
  return (
    <motion.section
      style={{ direction: "ltr" }}
      className="mb-12 pt-4 border-t  border-gray-200 relative"
      variants={fadeInUp}
      initial="initial"
      animate="animate"
    >
      <div
        dir={directionMap[locale]}
        className="flex items-center justify-between"
      >
        <h3 className="text-2xl font-bold text-gray-900">
          {locale == "ar" ? "أخر المقالات" : "Related Articles"}
        </h3>
      </div>

      <Swiper
        className="mt-6 h-fit"
        autoplay={{ delay: 2500 }}
        modules={[A11y, Autoplay]}
        spaceBetween={24}
        slidesPerView={2}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
        }}
        a11y={{ enabled: true }}
      >
        {articles &&
          articles.map((article, index) => (
            <SwiperSlide key={article.id}>
              <ArticleCard article={article} index={index} />
            </SwiperSlide>
          ))}
      </Swiper>
    </motion.section>
  );
}
