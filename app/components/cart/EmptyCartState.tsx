"use client";

import Link from "next/link";
import { MdAssignmentAdd, MdExplore } from "react-icons/md";
import { useTranslation } from "@/app/hooks/useTranslation";

export function EmptyCartState() {
  const t = useTranslation("cart");

  return (
    <div className="py-12 min-h-[80dvh] flex items-center justify-center">
      {/* Hero message */}
      <div className="text-center flex items-center justify-center flex-col mb-12">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-[var(--surface-container)] border border-[var(--outline-variant)]/30 flex items-center justify-center mb-5">
          <MdAssignmentAdd className="text-4xl text-[var(--on-surface-variant)]" />
        </div>

        <h2 className="text-2xl font-semibold text-[var(--on-surface)] mb-2">
          {t.emptyCartTitle}
        </h2>

        <p className="text-[var(--on-surface-variant)] text-center max-w-md mb-6">
          {t.emptyCartDescription}
        </p>

        <Link
          href="/services"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-[var(--on-primary)] font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          <MdExplore className="text-xl" />
          {t.browseServices}
        </Link>
      </div>
    </div>
  );
}
