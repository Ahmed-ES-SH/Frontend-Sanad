"use client";
import Img from "@/app/components/global/Img";
import LocaleLink from "@/app/components/global/LocaleLink";
import { Article } from "@/app/types/blog";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

interface HomeBlogSliderProps {
  articles: Article[];
}

export default function HomeBlogSlider({ articles }: HomeBlogSliderProps) {
  return (
    <div className="w-full lg:w-3/5 overflow-hidden rounded-2xl shadow-surface-lg">
      <Swiper
        dir={"ltr"}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        spaceBetween={24}
        slidesPerView={1}
        navigation={{
          prevEl: "#slider-button-left",
          nextEl: "#slider-button-right",
        }}
        modules={[Navigation, Autoplay]}
        className="w-full"
      >
        {articles &&
          articles.map((article, index) => (
            <SwiperSlide key={index}>
              <LocaleLink
                className="group relative block rounded-2xl focus:outline-none overflow-hidden aspect-4/3 lg:aspect-auto lg:h-[500px]"
                href={`/blog/${article.slug}`}
              >
                <div className="relative size-full before:absolute before:inset-0 before:z-1 before:bg-linear-to-t before:from-surface-900/80 before:to-transparent">
                  <Img
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={article.coverImageUrl}
                  />
                </div>

                <div className="absolute top-0 inset-x-0 z-10 p-6">
                  <div className="flex items-center">
                    <div className="shrink-0 bg-white/20 backdrop-blur-md p-1 rounded-full border border-white/30 shadow-lg">
                      <Img
                        className="size-10 rounded-full"
                        src="/sanad-logo.png"
                      />
                    </div>
                    <div className="mx-3">
                      <h4 className="text-sm font-semibold text-white drop-shadow-md">
                        Admin
                      </h4>
                      <p className="text-[10px] text-white/70">
                        {article.createdAt}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 inset-x-0 z-10 p-6 lg:p-10">
                  <h3 className="text-xl lg:text-3xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-sm lg:text-base text-white/80 line-clamp-2 leading-relaxed max-w-2xl">
                    {article.excerpt}
                  </p>
                </div>
              </LocaleLink>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
