import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

interface AddArticleHeaderProps {
  title: string;
  backToArticles: string;
  drafting: string;
  currentTitle: string;
  saveDraft: string;
  publishNow: string;
  untitledDraft: string;
  locale: string;
  isRTL: boolean;
  canSaveDraft: boolean;
  canPublish: boolean;
  onSaveDraft: () => void;
  onPublishNow: () => void;
  isSubmitting: boolean;
  progress?: { completed: number; total: number } | null;
}

export default function AddArticleHeader({
  title,
  backToArticles,
  drafting,
  currentTitle,
  saveDraft,
  publishNow,
  untitledDraft,
  locale,
  isRTL,
  canSaveDraft,
  canPublish,
  onSaveDraft,
  onPublishNow,
  isSubmitting,
  progress,
}: AddArticleHeaderProps) {
  const showStatus = isSubmitting;
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 md:gap-8">
      <div className="space-y-3 min-w-0 max-w-2xl">
        <Link
          href={`/${locale}/dashboard/blog`}
          className="inline-flex items-center gap-1.5 text-stone-500 hover:text-primary text-sm font-medium transition-colors focus:outline-none focus-visible:underline underline-offset-2"
        >
          <FiArrowLeft size={14} className={isRTL ? "rotate-180" : ""} />
          <span>{backToArticles}</span>
        </Link>
        <div className="space-y-1">
          <h1 className="heading-lg text-stone-900 text-balance">
            {title}
          </h1>
          <p className="body-sm text-stone-500 truncate">
            <span className="text-stone-400">{drafting} </span>
            <span className="font-semibold text-stone-700">
              {currentTitle || untitledDraft}
            </span>
          </p>
        </div>
        {progress && (
          <div className="flex lg:hidden items-center gap-2">
            <div className="h-1.5 flex-1 max-w-[120px] rounded-full bg-stone-100 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-400 ${
                  progress.completed === progress.total
                    ? "bg-emerald-500"
                    : "bg-primary"
                }`}
                style={{ width: `${(progress.completed / progress.total) * 100}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-stone-500 tabular-nums">
              {progress.completed}/{progress.total}
            </span>
          </div>
        )}
      </div>
      <div
        className="flex items-center gap-2.5 w-full md:w-auto shrink-0"
        role="group"
        aria-label={title}
      >
        <button
          type="button"
          onClick={onSaveDraft}
          disabled={isSubmitting || !canSaveDraft}
          aria-disabled={isSubmitting || !canSaveDraft}
          className="flex-1 md:flex-none h-10 px-5 rounded-xl text-sm font-semibold text-stone-700 bg-white border border-stone-200 hover:bg-stone-50 hover:border-stone-300 transition-colors active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          {saveDraft}
        </button>
        <button
          type="submit"
          onClick={onPublishNow}
          disabled={isSubmitting || !canPublish}
          aria-disabled={isSubmitting || !canPublish}
          className="flex-1 md:flex-none h-10 px-5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition-colors shadow-button hover:shadow-button-hover active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 flex items-center justify-center gap-2"
        >
          {showStatus && (
            <span
              aria-hidden="true"
              className="w-3.5 h-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin"
            />
          )}
          <span>{publishNow}</span>
        </button>
      </div>
    </div>
  );
}
