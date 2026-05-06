import { FiInfo, FiChevronUp, FiChevronDown, FiAlertCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface FieldErrors {
  title?: string;
  shortDesc?: string;
  longDesc?: string;
  liveUrl?: string;
  repoUrl?: string;
  coverImage?: string;
  newImage?: string;
}

interface BasicInfoSectionProps {
  title: string;
  setTitle: (val: string) => void;
  shortDesc: string;
  setShortDesc: (val: string) => void;
  longDesc: string;
  setLongDesc: (val: string) => void;
  touched: Set<string>;
  errors: FieldErrors;
  handleFieldChange: (name: string, value: string) => void;
  markTouched: (field: string) => void;
  isOpen: boolean;
  toggleSection: () => void;
}

export default function BasicInfoSection({
  title,
  setTitle,
  shortDesc,
  setShortDesc,
  longDesc,
  setLongDesc,
  touched,
  errors,
  handleFieldChange,
  markTouched,
  isOpen,
  toggleSection
}: BasicInfoSectionProps) {
  return (
    <section className="bg-white rounded-xl border border-stone-200/50 overflow-hidden">
      <button
        type="button"
        onClick={toggleSection}
        className="w-full flex items-center justify-between p-8 text-left hover:bg-stone-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
            <FiInfo size={20} />
          </div>
          <h3 className="text-xl font-bold">Basic Information</h3>
        </div>
        {isOpen ? (
          <FiChevronUp size={20} className="text-stone-400 shrink-0" />
        ) : (
          <FiChevronDown size={20} className="text-stone-400 shrink-0" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 space-y-6">
              {/* Title */}
              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    handleFieldChange("title", e.target.value);
                  }}
                  onBlur={() => markTouched("title")}
                  className={`w-full bg-stone-50 border-none rounded-lg p-4 focus:ring-2 focus:ring-orange-500/50 text-stone-800 placeholder:text-stone-400 ${
                    touched.has("title") && errors.title
                      ? "ring-2 ring-red-400/40"
                      : ""
                  }`}
                  placeholder="e.g. Modern E-commerce Platform"
                />
                {touched.has("title") && errors.title && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                    <FiAlertCircle size={12} /> {errors.title}
                  </p>
                )}
              </div>

              {/* Short Description */}
              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500">
                  Short Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={shortDesc}
                  onChange={(e) => {
                    setShortDesc(e.target.value);
                    handleFieldChange("shortDesc", e.target.value);
                  }}
                  onBlur={() => markTouched("shortDesc")}
                  maxLength={150}
                  className={`w-full bg-stone-50 border-none rounded-lg p-4 focus:ring-2 focus:ring-orange-500/50 text-stone-800 placeholder:text-stone-400 ${
                    touched.has("shortDesc") && errors.shortDesc
                      ? "ring-2 ring-red-400/40"
                      : ""
                  }`}
                  placeholder="Brief summary for list views (max 150 characters)"
                />
                <div className="flex justify-between items-center">
                  {touched.has("shortDesc") && errors.shortDesc ? (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <FiAlertCircle size={12} /> {errors.shortDesc}
                    </p>
                  ) : (
                    <span />
                  )}
                  <span
                    className={`text-[11px] ${shortDesc.length > 140 ? "text-amber-500 font-bold" : "text-stone-400"}`}
                  >
                    {shortDesc.length}/150
                  </span>
                </div>
              </div>

              {/* Long Description */}
              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">
                  Long Description
                </label>
                <textarea
                  value={longDesc}
                  onChange={(e) => {
                    setLongDesc(e.target.value);
                    handleFieldChange("longDesc", e.target.value);
                  }}
                  onBlur={() => markTouched("longDesc")}
                  className="w-full bg-stone-50 border-none rounded-lg p-4 focus:ring-2 focus:ring-orange-500/50 text-stone-800 placeholder:text-stone-400 min-h-[200px] resize-none"
                  placeholder="Describe the project scope, challenges, and solutions in detail..."
                />
                {touched.has("longDesc") && errors.longDesc && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                    <FiAlertCircle size={12} /> {errors.longDesc}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
