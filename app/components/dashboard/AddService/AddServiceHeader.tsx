import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

interface AddServiceHeaderProps {
  title: string;
  backToServices: string;
  status: string;
  untitledService: string;
  saveDraft: string;
  publishNow: string;
  currentTitle: string;
  local: string;
  isRTL: boolean;
  onSaveDraft: () => void;
  onPublishNow: () => void;
  isSubmitting: boolean;
}

export default function AddServiceHeader({
  title,
  backToServices,
  status,
  untitledService,
  saveDraft,
  publishNow,
  currentTitle,
  local,
  isRTL,
  onSaveDraft,
  onPublishNow,
  isSubmitting,
}: AddServiceHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
      <div className="space-y-2">
        <Link
          href={`/${local}/dashboard/services`}
          className="flex items-center gap-2 text-primary font-bold text-sm tracking-wide hover:opacity-80 transition-all"
        >
          <FiArrowLeft className={isRTL ? "rotate-180" : ""} />
          <span>{backToServices}</span>
        </Link>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-stone-900">
          {title}
        </h2>
        <p className="text-stone-500 font-medium text-sm">
          {status}{" "}
          <span className="italic text-primary font-semibold">
            {currentTitle || untitledService}
          </span>
        </p>
      </div>
      <div className="flex items-center gap-3 w-full md:w-auto">
        <button
          onClick={onSaveDraft}
          disabled={isSubmitting}
          className="flex-1 md:flex-none px-6 py-2.5 rounded-xl font-bold text-stone-600 bg-white border border-stone-200 hover:bg-stone-50 transition-colors shadow-sm active:scale-95 disabled:opacity-50"
        >
          {saveDraft}
        </button>
        <button
          onClick={onPublishNow}
          disabled={isSubmitting}
          className="flex-1 md:flex-none px-8 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all active:scale-95 disabled:opacity-50"
        >
          {publishNow}
        </button>
      </div>
    </div>
  );
}