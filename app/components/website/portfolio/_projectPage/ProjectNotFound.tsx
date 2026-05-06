"use client";

import React from "react";
import Link from "next/link";
import { HiOutlinePhotograph } from "react-icons/hi";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslation";

export function ProjectNotFound() {
  const locale = useLocale();
  const t = useTranslation("ProjectPage");
  return (
    <div
      className="min-h-[60vh] flex items-center justify-center"
      style={{ background: "var(--surface-50)" }}
    >
      <div className="text-center max-w-md px-6">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
          style={{
            background: "var(--surface-100)",
            border: "1px solid var(--surface-200)",
          }}
        >
          <HiOutlinePhotograph
            size={28}
            style={{ color: "var(--surface-400)" }}
          />
        </div>
        <h1
          className="heading-lg font-display mb-3"
          style={{ color: "var(--surface-900)" }}
        >
          {t.projectNotFound.title}
        </h1>
        <p className="body mb-8" style={{ color: "var(--surface-500)" }}>
          {t.projectNotFound.message}
        </p>
        <Link
          href={`/${locale}/portfolio`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
          style={{ background: "var(--primary)", color: "white" }}
        >
          {t.backToPortfolio}
        </Link>
      </div>
    </div>
  );
}
