"use client";

interface EmptyStateProps {
  hasFilters: boolean;
  translations: {
    title: string;
    withFilters: string;
    noItems: string;
  };
}

/**
 * Empty State Component
 * Displayed when no services are found
 */
export function EmptyState({ hasFilters, translations }: EmptyStateProps) {
  const t = translations;

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {/* Icon */}
      <div className="text-6xl mb-4">📋</div>

      {/* Title */}
      <h3 className="text-xl font-bold text-stone-900 mb-2">
        {t.title}
      </h3>

      {/* Description */}
      <p className="text-stone-500">
        {hasFilters ? t.withFilters : t.noItems}
      </p>
    </div>
  );
}

export default EmptyState;