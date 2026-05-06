import Image from "next/image";
import { FiImage } from "react-icons/fi";

interface FormData {
  title: string;
  shortDescription: string;
  longDescription: string;
  iconUrl: string;
  coverImageUrl: string;
  categoryId: string;
}

interface ServicePreviewCardProps {
  formData: FormData;
  translations: {
    servicePreview: string;
    title: string;
    description: string;
    hasCover: string;
    yes: string;
    no: string;
    untitled: string;
    set: string;
    empty: string;
  };
}

export default function ServicePreviewCard({
  formData,
  translations,
}: ServicePreviewCardProps) {
  return (
    <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-[0_20px_40px_rgb(0,0,0,0.04)] flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-8">
        <h3 className="text-[0.7rem] font-bold text-stone-400 uppercase tracking-widest font-display">
          {translations.servicePreview}
        </h3>
        <span className="text-[0.65rem] px-3 py-1 rounded-full bg-stone-100 text-stone-500 font-semibold tracking-wider uppercase">
          Live View
        </span>
      </div>

      <div className="w-full max-w-sm mx-auto group overflow-hidden rounded-3xl bg-white border border-stone-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-500 transform hover:-translate-y-1">
        {/* Cover Image Area */}
        <div className="relative h-48 w-full bg-stone-50 flex items-center justify-center overflow-hidden">
          {formData.coverImageUrl ? (
            <Image
              src={formData.coverImageUrl}
              alt="Cover Preview"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-stone-300">
              <FiImage size={32} />
              <span className="text-xs font-medium uppercase tracking-widest">No Cover</span>
            </div>
          )}
          
          {/* Overlay Gradient for contrast if there's an image */}
          {formData.coverImageUrl && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60" />
          )}

          {/* Icon Positioned over Cover */}
          <div className="absolute -bottom-6 left-6 w-14 h-14 rounded-2xl bg-white shadow-lg border border-stone-100 flex items-center justify-center overflow-hidden z-10">
            {formData.iconUrl ? (
              <div className="relative w-8 h-8">
                <Image
                  src={formData.iconUrl}
                  alt="Icon Preview"
                  fill
                  className="object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            ) : (
              <FiImage size={20} className="text-stone-300" />
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 pt-10 bg-white">
          <h4 className="text-lg font-black text-stone-900 mb-2 leading-tight font-display tracking-tight">
            {formData.title || translations.untitled}
          </h4>
          <p className="text-sm text-stone-500 leading-relaxed line-clamp-2">
            {formData.shortDescription || "This is a placeholder for the short description. It will appear here once you enter it."}
          </p>
        </div>
      </div>
    </div>
  );
}