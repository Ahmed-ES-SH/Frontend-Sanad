/**
 * OrderPageHeader - Back navigation and page title
 */

interface OrderPageHeaderProps {
  backLink: string;
  backLabel: string;
  pageTitle: string;
  pageSubtitle: string;
  isRtl: boolean;
}

export function OrderPageHeader({
  backLink,
  backLabel,
  pageTitle,
  pageSubtitle,
  isRtl,
}: OrderPageHeaderProps) {
  return (
    <div className="mb-8">
      {/* Back Navigation */}
      <a
        href={backLink}
        className="inline-flex items-center gap-2 text-surface-600 hover:text-primary transition-colors mb-5 group body"
        aria-label={backLabel}
      >
        <svg
          className={`w-4 h-4 transition-transform group-hover:${
            isRtl ? "translate-x-1" : "-translate-x-1"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isRtl ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
          />
        </svg>
        <span className="font-medium">{backLabel}</span>
      </a>

      <h1 className="display-sm font-display text-surface-900 mb-1.5">
        {pageTitle}
      </h1>
      <p className="body text-surface-600">{pageSubtitle}</p>
    </div>
  );
}