"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import {
  HiOutlineX,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import { useTranslation } from "@/app/hooks/useTranslation";

interface GalleryLightboxProps {
  images: string[];
  index: number;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
  title: string;
  isRTL: boolean;
}

export function GalleryLightbox({
  images,
  index,
  onClose,
  onNav,
  title,
  isRTL,
}: GalleryLightboxProps) {
  const t = useTranslation("ProjectPage");
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Focus close button on mount
    closeButtonRef.current?.focus();

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(isRTL ? -1 : 1);
      if (e.key === "ArrowLeft") onNav(isRTL ? 1 : -1);

      // Focus trap
      if (e.key === "Tab") {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusableElements) {
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[
            focusableElements.length - 1
          ] as HTMLElement;

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isRTL, onClose, onNav]);

  if (typeof window === undefined) return null;

  const content = (
    <motion.div
      ref={modalRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-99999 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.96)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        ref={closeButtonRef}
        onClick={onClose}
        className="absolute top-5 end-5 z-10 w-11 h-11 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label={t.close}
      >
        <HiOutlineX size={22} />
      </button>

      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNav(-1);
          }}
          className="absolute start-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label={isRTL ? t.next : t.previous}
        >
          <HiOutlineChevronLeft size={24} />
        </button>
      )}

      {/* Using standard img here for full quality / immediate display in lightbox */}
      <motion.img
        key={index}
        src={images[index]}
        alt={`${title} — ${t.imageLabel} ${index + 1}`}
        className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl select-none"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      />

      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNav(1);
          }}
          className="absolute end-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label={isRTL ? t.previous : t.next}
        >
          <HiOutlineChevronRight size={24} />
        </button>
      )}

      {images.length > 1 && (
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm font-medium select-none"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {index + 1} / {images.length}
        </div>
      )}
    </motion.div>
  );

  return createPortal(content, document.body);
}
