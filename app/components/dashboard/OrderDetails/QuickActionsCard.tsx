/**
 * QuickActionsCard - Action buttons (invoice, agreement)
 */

interface QuickActionsCardProps {
  title: string;
  downloadLabel: string;
  agreementLabel: string;
  isRtl: boolean;
}

export function QuickActionsCard({
  title,
  downloadLabel,
  agreementLabel,
  isRtl,
}: QuickActionsCardProps) {
  return (
    <section
      className="bg-surface-card-bg rounded-2xl p-6 sm:p-8 border border-gray-200"
      aria-label={title}
    >
      <h3 className="caption text-surface-500 font-bold uppercase tracking-wider mb-5">
        {title}
      </h3>
      <div className="space-y-3">
        <button
          className="w-full flex items-center justify-between p-4 bg-surface-50 rounded-xl border border-gray-200 hover:border-primary/30 hover:bg-primary-50 transition-all duration-200 group"
          aria-label={downloadLabel}
        >
          <div className="flex items-center gap-3">
            <svg
              className="w-4 h-4 text-primary shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span className="body font-medium text-surface-900">
              {downloadLabel}
            </span>
          </div>
          <svg
            className={`w-4 h-4 text-surface-400 group-hover:text-primary transition-all duration-200 shrink-0 ${
              isRtl
                ? "rotate-180 group-hover:-translate-x-0.5"
                : "group-hover:translate-x-0.5"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <button
          className="w-full flex items-center justify-between p-4 bg-surface-50 rounded-xl border border-gray-200 hover:border-primary/30 hover:bg-primary-50 transition-all duration-200 group"
          aria-label={agreementLabel}
        >
          <div className="flex items-center gap-3">
            <svg
              className="w-4 h-4 text-primary shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="body font-medium text-surface-900">
              {agreementLabel}
            </span>
          </div>
          <svg
            className={`w-4 h-4 text-surface-400 group-hover:text-primary transition-all duration-200 shrink-0 ${
              isRtl
                ? "rotate-180 group-hover:-translate-x-0.5"
                : "group-hover:translate-x-0.5"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}