"use client";

import { useTranslation } from "@/app/hooks/useTranslation";
import { MdWorkspacePremium, MdArrowForward } from "react-icons/md";

export function PremiumBanner() {
  const t = useTranslation("cart");

  return (
    <div className="mt-4 surface-card overflow-hidden relative">
      {/* Solid gradient accent bar instead of blur blob */}
      <div className="absolute top-0 start-0 bottom-0 w-1 bg-[var(--gradient-primary)]" />

      <div className="p-4 ps-6">
        <div className="flex items-center gap-1.5 mb-1 rtl:flex-row-reverse">
          <MdWorkspacePremium className="text-lg text-[var(--accent-amber)]" />
          <h4 className="font-semibold text-sm text-[var(--on-surface)]">
            {t.premium.title}
          </h4>
        </div>
        <p className="text-xs text-[var(--on-surface-variant)] mb-2">
          {t.premium.description}
        </p>
        <button
          className={`text-xs font-semibold text-[var(--primary)] flex items-center gap-1 group hover:underline rtl:flex-row-reverse`}
        >
          {t.premium.learnMore}
          <MdArrowForward
            className={`text-sm transition-transform group-hover:translate-x-0.5 rtl:rotate-180`}
          />
        </button>
      </div>
    </div>
  );
}
