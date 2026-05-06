"use client";

import type { Project } from "@/app/types/project";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { ProjectNotFound } from "./ProjectNotFound";
import { directionMap } from "@/app/constants/global";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslation";
import { RevealSection, SectionLabel } from "./SectionBasics";
import { GallerySlider } from "./GallerySlider";
import { GalleryLightbox } from "./GalleryLightbox";

import ProjectHeroSection from "./ProjectHeroSection";
import ProjectContent from "./ProjectContent";
import ProjectCTABanner from "./ProjectCTABanner";
import LocaleLink from "@/app/components/global/LocaleLink";

interface Props {
  project: Project;
}

export default function ClientProject({ project }: Props) {
  const locale = useLocale();
  const t = useTranslation("ProjectPage");
  const isRTL = locale === "ar";
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!project) return <ProjectNotFound />;

  const allImages = project.images ?? [];

  const closeLightbox = () => setLightboxIndex(null);
  const navigateLightbox = (dir: 1 | -1) =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + dir + allImages.length) % allImages.length : 0,
    );

  return (
    <div
      dir={directionMap[locale]}
      className="min-h-dvh pb-20"
      style={{ background: "var(--surface-50)" }}
    >
      {/* ── Back Link ────────────────────────────────── */}
      <div className="c-container px-4 pt-8 pb-0">
        <motion.div
          initial={{ opacity: 0, x: isRTL ? 12 : -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <LocaleLink
            href={`/portfolio`}
            className="inline-flex items-center gap-2 text-surface-500 text-sm font-semibold group focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1"
          >
            <span
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors duration-200 group-hover:bg-surface-200"
              style={{ background: "var(--surface-100)" }}
            >
              {isRTL ? <HiArrowRight size={16} /> : <HiArrowLeft size={16} />}
            </span>
            <span className="group-hover:underline underline-offset-4 transition-all duration-200">
              {t.allProjects}
            </span>
          </LocaleLink>
        </motion.div>
      </div>

      {/* ── Hero ─────────────────────────────────────── */}
      <ProjectHeroSection project={project} t={t} />

      {/* ── Content ───────────────── */}
      <ProjectContent project={project} t={t} />

      {/* ── Gallery ───────────────────────────────────── */}
      {allImages.length > 0 && (
        <section className="py-14 md:py-20">
          <div className="c-container px-4">
            <RevealSection>
              <SectionLabel label={t.gallery} />
            </RevealSection>
            <GallerySlider
              images={allImages}
              title={project.title}
              isRTL={isRTL}
              onOpen={(i) => setLightboxIndex(i)}
            />
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="c-container px-4">
        <div className="border-t border-surface-200" />
      </div>

      {/* ── CTA Banner ────────────────────────────────── */}
      <ProjectCTABanner t={t} />

      {/* ── Lightbox ─────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <GalleryLightbox
            images={allImages}
            index={lightboxIndex}
            onClose={closeLightbox}
            onNav={navigateLightbox}
            title={project.title}
            isRTL={isRTL}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
