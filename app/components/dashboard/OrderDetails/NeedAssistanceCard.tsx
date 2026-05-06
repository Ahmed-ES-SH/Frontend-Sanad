/**
 * NeedAssistanceCard - Support contact section
 */

import LocaleLink from "@/app/components/global/LocaleLink";

interface NeedAssistanceCardProps {
  title: string;
  description: string;
  buttonLabel: string;
}

export function NeedAssistanceCard({
  title,
  description,
  buttonLabel,
}: NeedAssistanceCardProps) {
  return (
    <section
      className="bg-surface-card-bg rounded-2xl p-6 sm:p-8 shadow-surface-sm border border-gray-200"
      aria-label={title}
    >
      <div className="flex gap-5">
        <div
          className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary shrink-0"
          aria-hidden="true"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="heading-md font-display text-surface-900 mb-2">
            {title}
          </h3>
          <p className="body-sm text-surface-600 mb-5 leading-relaxed">
            {description}
          </p>
          <LocaleLink
            href="/contact"
            className="surface-btn-primary w-full"
            aria-label={buttonLabel}
          >
            {buttonLabel}
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}