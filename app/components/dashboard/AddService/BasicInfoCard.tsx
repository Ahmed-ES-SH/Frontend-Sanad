import { FiFileText } from "react-icons/fi";

interface FormData {
  title: string;
  shortDescription: string;
  longDescription: string;
  iconUrl: string;
  coverImageUrl: string;
  categoryId: string;
}

interface BasicInfoCardProps {
  formData: FormData;
  translations: {
    basicInformation: string;
    title: string;
    titlePlaceholder: string;
    shortDescription: string;
    shortDescriptionPlaceholder: string;
    longDescription: string;
    longDescriptionPlaceholder: string;
  };
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
}

export default function BasicInfoCard({
  formData,
  translations,
  onInputChange,
}: BasicInfoCardProps) {
  return (
    <div className="md:col-span-2 p-6 space-y-4 rounded-2xl bg-stone-100/40 border border-stone-200/60 shadow-sm backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-1">
        <FiFileText className="text-stone-500" size={18} />
        <h3 className="text-xs font-black text-stone-700 uppercase tracking-widest font-display">
          {translations.basicInformation}
        </h3>
      </div>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[0.65rem] font-black text-stone-500 uppercase tracking-[0.15em] ps-1 font-display">
            {translations.title}
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={onInputChange}
            className="w-full bg-white border border-stone-200 rounded-xl p-4 text-xl font-bold font-display focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all outline-none placeholder:text-stone-300 shadow-sm"
            placeholder={translations.titlePlaceholder}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[0.65rem] font-black text-stone-500 uppercase tracking-[0.15em] ps-1 font-display">
            {translations.shortDescription}
          </label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={onInputChange}
            rows={2}
            className="w-full bg-white border border-stone-200 rounded-xl p-4 text-sm text-stone-700 focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all outline-none placeholder:text-stone-300 shadow-sm resize-none"
            placeholder={translations.shortDescriptionPlaceholder}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[0.65rem] font-black text-stone-500 uppercase tracking-[0.15em] ps-1 font-display">
            {translations.longDescription}
          </label>
          <textarea
            name="longDescription"
            value={formData.longDescription}
            onChange={onInputChange}
            rows={6}
            className="w-full bg-white border border-stone-200 rounded-xl p-4 text-sm text-stone-700 focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all outline-none placeholder:text-stone-300 shadow-sm resize-none"
            placeholder={translations.longDescriptionPlaceholder}
          />
        </div>
      </div>
    </div>
  );
}