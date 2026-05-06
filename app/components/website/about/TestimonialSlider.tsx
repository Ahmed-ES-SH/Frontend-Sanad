"use client";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import TestimonialSlide from "./TestimonialSlide";
import { getTestimonials } from "@/app/constants/testimonials";
import { useLocale } from "@/app/hooks/useLocale";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface TestimonialSliderProps {
  prevEl: HTMLButtonElement | null;
  nextEl: HTMLButtonElement | null;
  isLoaded: boolean;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TestimonialSlider({
  prevEl,
  nextEl,
  isLoaded,
  setIsLoaded,
}: TestimonialSliderProps) {
  const settings = {
    modules: [Navigation, Pagination, Autoplay],
    spaceBetween: 30,
    slidesPerView: 1,

    onBeforeInit: (swiper: SwiperType) => {
      if (
        swiper.params.navigation &&
        typeof swiper.params.navigation !== "boolean"
      ) {
        swiper.params.navigation.prevEl = prevEl;
        swiper.params.navigation.nextEl = nextEl;
      }
    },

    onInit: () => {
      if (!isLoaded) setIsLoaded(true);
    },

    navigation: {
      prevEl,
      nextEl,
    },

    pagination: {
      clickable: true,
      bulletClass: "swiper-pagination-bullet",
      bulletActiveClass: "swiper-pagination-bullet-active",
    },

    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },

    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },

    className: "testimonials-swiper mb-12",
  };

  const locale = useLocale();
  const isRtl = locale === "ar";
  const testimonials = getTestimonials(locale);

  return (
    <Swiper
      {...settings}
      dir={"ltr"}
      key={isRtl ? "rtl" : "ltr"} // Force re-render on locale change
    >
      {testimonials.map((testimonial) => (
        <SwiperSlide key={testimonial.id} className="h-auto!">
          <TestimonialSlide testimonial={testimonial} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
