"use client";

import { FiFilter } from "react-icons/fi";
import { EmptyStateProps } from "./EmptyState.types";
import { useTranslation } from "@/app/hooks/useTranslation";

const EmptyState: React.FC<EmptyStateProps> = ({
  hasActiveFilters,
  onClearFilters,
}) => {
  const t = useTranslation("payments");

  return (
    <tr>
      <td colSpan={5} className="px-6 py-16 text-center">
        <div className="flex flex-col items-center gap-3">
          <FiFilter className="text-3xl text-stone-300" aria-hidden="true" />
          <p className="text-sm font-medium text-muted-foreground">
            {hasActiveFilters ? t.noResultsMatchFilters : t.noTransactionsFound}
          </p>
          {hasActiveFilters && (
            <button
              className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 rounded px-2 py-1"
              onClick={onClearFilters}
            >
              {t.clearAllFiltersLabel}
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default EmptyState;
