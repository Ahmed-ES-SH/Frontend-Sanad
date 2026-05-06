"use client";

import PhilosophySection from "./PhilosophySection";
import BrandStorySection from "./BrandStorySection";
import AboutHeroSection from "./AboutHeroSection";
import { useTranslation } from "@/app/hooks/useTranslation";

export default function AboutPage() {
  const t = useTranslation("aboutPage");

  return (
    <div className="-mt-20 overflow-hidden">
      {/* Hero Section - Deep Midnight Tech (Non-white) */}
      <AboutHeroSection t={t} />

      {/* Brand Story Section - Clean White Rhythm */}
      <BrandStorySection t={t} />

      {/* Philosophy Section - Balanced Neutral */}
      <PhilosophySection t={t} />
    </div>
  );
}
