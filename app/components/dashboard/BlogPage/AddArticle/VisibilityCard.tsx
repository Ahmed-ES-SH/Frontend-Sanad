import { FiSettings } from "react-icons/fi";

interface VisibilityCardProps {
  publishingSettings: string;
  visibility: string;
  draft: string;
  publishingNote: string;
}

export default function VisibilityCard({
  publishingSettings,
  visibility,
  draft,
  publishingNote,
}: VisibilityCardProps) {
  return (
    <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[0.7rem] font-black text-orange-700 uppercase tracking-widest">
          {publishingSettings}
        </h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiSettings className="text-sm text-orange-600" />
            <span className="text-xs font-bold text-stone-700">
              {visibility}
            </span>
          </div>
          <span className="text-xs font-black text-primary">{draft}</span>
        </div>
        <div className="pt-4 border-t border-orange-200 space-y-3">
          <p className="text-[0.65rem] text-stone-500">{publishingNote}</p>
        </div>
      </div>
    </div>
  );
}