import { FiImage } from "react-icons/fi";
import Image from "next/image";

interface FormData {
  title: string;
  shortDescription: string;
  longDescription: string;
  iconUrl: string;
  coverImageUrl: string;
  categoryId: string;
}

interface MediaCardProps {
  formData: FormData;
  translations: {
    media: string;
    iconUrl: string;
    iconUrlPlaceholder: string;
    coverImageUrl: string;
    coverImageUrlPlaceholder: string;
    cover: string;
  };
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
}

export default function MediaCard({
  formData,
  translations,
  onInputChange,
}: MediaCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-stone-100/40 border border-stone-200/60 shadow-sm backdrop-blur-sm flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FiImage className="text-stone-500" size={18} />
          <h3 className="text-xs font-black text-stone-700 uppercase tracking-widest font-display">
            {translations.media}
          </h3>
        </div>
      </div>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[0.65rem] font-black text-stone-500 uppercase tracking-[0.15em] ps-1 font-display">
            {translations.iconUrl}
          </label>
          <input
            type="text"
            name="iconUrl"
            value={formData.iconUrl}
            onChange={onInputChange}
            className="w-full bg-white border border-stone-200 rounded-xl p-3 text-sm text-stone-700 focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all outline-none shadow-sm"
            placeholder={translations.iconUrlPlaceholder}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[0.65rem] font-black text-stone-500 uppercase tracking-[0.15em] ps-1 font-display">
            {translations.coverImageUrl}
          </label>
          <input
            type="text"
            name="coverImageUrl"
            value={formData.coverImageUrl}
            onChange={onInputChange}
            className="w-full bg-white border border-stone-200 rounded-xl p-3 text-sm text-stone-700 focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all outline-none shadow-sm"
            placeholder={translations.coverImageUrlPlaceholder}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* Icon Preview */}
          <div className="space-y-2">
            <span className="text-[0.65rem] font-bold text-stone-400 uppercase tracking-widest block text-center">
              Icon Preview
            </span>
            <div className="relative group overflow-hidden rounded-2xl  border border-stone-100 flex items-center justify-center cursor-pointer bg-transparent max-w-[120px] mx-auto   transition-all duration-500 h-[50vh] ">
              {formData.iconUrl ? (
                <div className="relative w-32 h-32 p-2 bg-gray-300 rounded-lg">
                  <Image
                    className="object-contain w-12 h-12 group-hover:scale-110 transition-transform duration-700"
                    src={formData.iconUrl}
                    alt="Icon"
                    fill
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center border border-dashed border-stone-200 text-stone-300 group-hover:border-stone-300 transition-colors">
                  <FiImage size={20} />
                </div>
              )}
            </div>
          </div>

          {/* Cover Preview */}
          <div className="space-y-2">
            <span className="text-[0.65rem] font-bold text-stone-400 uppercase tracking-widest block text-center">
              Cover Preview
            </span>
            <div className="relative group overflow-hidden rounded-2xl bg-white border border-stone-100 flex items-center justify-center cursor-pointer h-[50vh] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-sm transition-all duration-500">
              {formData.coverImageUrl ? (
                <Image
                  className="absolute inset-0 w-full h-full  object-cover group-hover:scale-105 transition-transform duration-1000"
                  src={formData.coverImageUrl}
                  alt={translations.cover}
                  fill
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="w-full h-full bg-stone-50 flex items-center justify-center border border-dashed border-stone-200 text-stone-300 group-hover:border-stone-300 transition-colors mx-4 my-2 rounded-xl">
                  <FiImage size={24} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}