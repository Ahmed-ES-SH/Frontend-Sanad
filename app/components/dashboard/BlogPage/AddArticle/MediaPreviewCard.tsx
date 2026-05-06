import { FiImage } from "react-icons/fi";
import Img from "@/app/components/global/Img";
import type { ChangeEvent } from "react";

interface MediaPreviewCardProps {
  coverImageUrl: string;
  coverImagePlaceholder: string;
  cover: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function MediaPreviewCard({
  coverImageUrl,
  coverImagePlaceholder,
  cover,
  onInputChange,
}: MediaPreviewCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-stone-100/40 border border-stone-200/60 shadow-sm backdrop-blur-sm flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FiImage className="text-stone-500" size={18} />
          <h3 className="text-xs font-black text-stone-700 uppercase tracking-widest font-display">
            {cover}
          </h3>
        </div>
      </div>
      <div className="space-y-2">
        <input
          type="text"
          name="coverImageUrl"
          value={coverImageUrl}
          onChange={onInputChange}
          className="w-full bg-white border border-stone-200 rounded-xl p-3 text-sm text-stone-700 focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all outline-none shadow-sm"
          placeholder={coverImagePlaceholder}
        />
        {coverImageUrl && (
          <div className="relative group overflow-hidden rounded-xl bg-white border border-stone-200 flex items-center justify-center cursor-pointer min-h-[140px] shadow-inner">
            <Img
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-1000"
              src={coverImageUrl}
              alt="Cover"
              onError={() => {
                return null;
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}