/**
 * WhatsNextCard - Status context card with next step info
 */

interface WhatsNextCardProps {
  title: string;
  description: string;
}

export function WhatsNextCard({ title, description }: WhatsNextCardProps) {
  return (
    <div
      className="bg-primary-50 rounded-2xl p-6 sm:p-8 border border-primary-100 relative overflow-hidden"
      role="complementary"
      aria-label={title}
    >
      <div
        className="absolute top-0 start-0 w-1 h-full bg-primary"
        aria-hidden="true"
      />
      <div className="flex gap-4">
        <div
          className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0 mt-0.5"
          aria-hidden="true"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <h4 className="body-sm font-bold text-primary mb-1.5 uppercase tracking-wider">
            {title}
          </h4>
          <p className="body-sm text-surface-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}