"use client";

import { useTranslation } from "@/app/hooks/useTranslation";

interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold font-display text-surface-900 tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-surface-500 mt-0.5 text-sm">{description}</p>
        )}
      </div>
    </div>
  );
}

PageHeader.displayName = "PageHeader";