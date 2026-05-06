import { FiFileText } from "react-icons/fi";
import { Category } from "@/app/types/global";
import TagInput from "./TagInput";

interface BasicInfoCardProps {
  formData: {
    title: string;
    excerpt: string;
    categoryId: string;
  };
  categories: Category[];
  tags: string[];
  newTag: string;
  isRTL: boolean;
  translations: {
    articleDetails: string;
    articleTitlePlaceholder: string;
    excerpt?: string;
    excerptPlaceholder: string;
    category: string;
    selectCategory: string;
    tags: string;
    addTag: string;
  };
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onNewTagChange: (value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
}

export default function BasicInfoCard({
  formData,
  categories,
  tags,
  newTag,
  isRTL,
  translations,
  onInputChange,
  onNewTagChange,
  onAddTag,
  onRemoveTag,
}: BasicInfoCardProps) {
  return (
    <div className="p-6 space-y-4 rounded-2xl bg-stone-100/40 border border-stone-200/60 shadow-sm backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-1">
        <FiFileText className="text-stone-500" size={18} />
        <h3 className="text-xs font-black text-stone-700 uppercase tracking-widest font-display">
          {translations.articleDetails}
        </h3>
      </div>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={onInputChange}
            className="w-full bg-white border border-stone-200 rounded-xl p-4 text-xl font-bold font-display focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all outline-none placeholder:text-stone-300 shadow-sm"
            placeholder={translations.articleTitlePlaceholder}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[0.65rem] font-black text-stone-500 uppercase tracking-[0.15em] ps-1 font-display">
            {translations.excerpt || "Excerpt"}
          </label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={onInputChange}
            rows={3}
            className="w-full bg-white border border-stone-200 rounded-xl p-4 text-sm text-stone-700 focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all outline-none placeholder:text-stone-300 shadow-sm resize-none"
            placeholder={
              translations.excerptPlaceholder ||
              "Enter a short summary..."
            }
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[0.65rem] font-black text-stone-500 uppercase tracking-[0.15em] ps-1 font-display">
              {translations.category}
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={onInputChange}
              className="w-full bg-white border border-stone-200 rounded-xl p-3 text-sm font-bold text-stone-700 focus:ring-2 focus:ring-primary/10 focus:border-primary/30 outline-none shadow-sm cursor-pointer"
            >
              <option value="">{translations.selectCategory}</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[0.65rem] font-black text-stone-500 uppercase tracking-[0.15em] ps-1 font-display">
              {translations.tags}
            </label>
            <TagInput
              tags={tags}
              newTag={newTag}
              onNewTagChange={onNewTagChange}
              onAddTag={onAddTag}
              onRemoveTag={onRemoveTag}
              placeholder={translations.addTag}
              isRTL={isRTL}
            />
          </div>
        </div>
      </div>
    </div>
  );
}