import { Category } from "@/app/types/global";
import TagInput from "./TagInput";
import type { ArticleFormErrors } from "@/app/helpers/_dashboard/articleHelpers";

interface BasicInfoCardProps {
  formData: {
    title: string;
    excerpt: string;
    categoryId: string;
  };
  categories: Category[];
  categoriesLoading: boolean;
  categoriesError: string | null;
  onRetryCategories: () => void;
  tags: string[];
  newTag: string;
  isRTL: boolean;
  translations: {
    articleDetails: string;
    articleTitle: string;
    articleTitlePlaceholder: string;
    excerpt: string;
    excerptPlaceholder: string;
    category: string;
    selectCategory: string;
    tags: string;
    addTag: string;
    addTagAria: string;
    removeTagAria: string;
    tagsAria: string;
    titleError: string;
    excerptError: string;
    categoryError: string;
    categoriesFailed: string;
    retry: string;
    loadingCategories: string;
  };
  fieldErrors: ArticleFormErrors;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onContentChange?: (value: string) => void;
  onNewTagChange: (value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  onContentBlur?: () => void;
}

const fieldClass =
  "w-full bg-white border border-stone-200 rounded-xl px-3.5 py-3 text-sm text-stone-700 placeholder:text-stone-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none";

const fieldClassError =
  "w-full bg-white border border-red-300 rounded-xl px-3.5 py-3 text-sm text-stone-700 placeholder:text-stone-400 focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-all outline-none";

const labelClass = "text-xs font-semibold text-stone-600";

const titleFieldClass =
  "w-full bg-white border border-stone-200 rounded-xl px-4 py-3.5 text-lg font-semibold text-stone-900 placeholder:text-stone-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none";

const titleFieldClassError =
  "w-full bg-white border border-red-300 rounded-xl px-4 py-3.5 text-lg font-semibold text-stone-900 placeholder:text-stone-400 focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-all outline-none";

export default function BasicInfoCard({
  formData,
  categories,
  categoriesLoading,
  categoriesError,
  onRetryCategories,
  tags,
  newTag,
  isRTL,
  translations,
  fieldErrors,
  onInputChange,
  onNewTagChange,
  onAddTag,
  onRemoveTag,
}: BasicInfoCardProps) {
  const titleError = fieldErrors.title;
  const excerptError = fieldErrors.excerpt;
  const categoryError = fieldErrors.categoryId;

  return (
    <div className="rounded-2xl bg-white border border-stone-200 shadow-sm">
      <div className="px-5 md:px-6 pt-5 md:pt-6 pb-4 border-b border-stone-100">
        <h2 className="heading-sm text-stone-900 text-balance">
          {translations.articleDetails}
        </h2>
      </div>
      <div className="p-5 md:p-6 space-y-5">
        <div className="space-y-2">
          <label htmlFor="article-title" className={labelClass}>
            {translations.articleTitle}
          </label>
          <input
            id="article-title"
            type="text"
            name="title"
            value={formData.title}
            onChange={onInputChange}
            maxLength={200}
            aria-invalid={!!titleError}
            aria-describedby={titleError ? "title-error" : undefined}
            className={titleError ? titleFieldClassError : titleFieldClass}
            placeholder={translations.articleTitlePlaceholder}
          />
          {titleError && (
            <p
              id="title-error"
              className="text-xs text-red-600"
              role="alert"
            >
              {titleError}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="article-excerpt" className={labelClass}>
            {translations.excerpt}
          </label>
          <textarea
            id="article-excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={onInputChange}
            rows={3}
            maxLength={500}
            aria-invalid={!!excerptError}
            aria-describedby={excerptError ? "excerpt-error" : undefined}
            className={
              (excerptError ? fieldClassError : fieldClass) + " resize-none"
            }
            placeholder={translations.excerptPlaceholder}
          />
          {excerptError && (
            <p
              id="excerpt-error"
              className="text-xs text-red-600"
              role="alert"
            >
              {excerptError}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="article-category" className={labelClass}>
              {translations.category}
            </label>
            {categoriesError ? (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 space-y-2">
                <p className="text-xs text-red-700">
                  {translations.categoriesFailed}
                </p>
                <button
                  type="button"
                  onClick={onRetryCategories}
                  className="text-xs font-bold text-red-700 underline underline-offset-2 hover:text-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded"
                >
                  {translations.retry}
                </button>
              </div>
            ) : (
              <select
                id="article-category"
                name="categoryId"
                value={formData.categoryId}
                onChange={onInputChange}
                disabled={categoriesLoading}
                aria-invalid={!!categoryError}
                aria-describedby={categoryError ? "category-error" : undefined}
                className={
                  (categoryError
                    ? "w-full bg-white border border-red-300 rounded-xl px-3.5 py-3 text-sm font-semibold text-stone-700 focus:ring-2 focus:ring-red-200 focus:border-red-400 outline-none cursor-pointer"
                    : "w-full bg-white border border-stone-200 rounded-xl px-3.5 py-3 text-sm font-semibold text-stone-700 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer disabled:bg-stone-50 disabled:cursor-not-allowed")
                }
              >
                <option value="">
                  {categoriesLoading
                    ? translations.loadingCategories
                    : translations.selectCategory}
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
            {categoryError && !categoriesError && (
              <p
                id="category-error"
                className="text-xs text-red-600"
                role="alert"
              >
                {categoryError}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="article-tags" className={labelClass}>
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
              ariaLabel={translations.tagsAria}
              removeTagLabel={translations.removeTagAria}
              addTagLabel={translations.addTagAria}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
