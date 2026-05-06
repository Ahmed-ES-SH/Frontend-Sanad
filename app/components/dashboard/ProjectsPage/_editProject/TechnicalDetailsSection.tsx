import { FiCode, FiChevronUp, FiChevronDown, FiX, FiLink, FiTerminal, FiAlertCircle } from "react-icons/fi";
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

interface TechnicalDetailsSectionProps {
  techStack: string[];
  setTechStack: (val: string[]) => void;
  newTech: string;
  setNewTech: (val: string) => void;
  addTech: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  removeTech: (tech: string) => void;
  liveUrl: string;
  setLiveUrl: (val: string) => void;
  repoUrl: string;
  setRepoUrl: (val: string) => void;
  touched: Set<string>;
  errors: FieldErrors;
  handleFieldChange: (name: string, value: string) => void;
  markTouched: (field: string) => void;
  isOpen: boolean;
  toggleSection: () => void;
}

export default function TechnicalDetailsSection({
  techStack,
  setTechStack,
  newTech,
  setNewTech,
  addTech,
  removeTech,
  liveUrl,
  setLiveUrl,
  repoUrl,
  setRepoUrl,
  touched,
  errors,
  handleFieldChange,
  markTouched,
  isOpen,
  toggleSection
}: TechnicalDetailsSectionProps) {
  return (
    <section className="bg-white rounded-xl border border-stone-200/50 overflow-hidden">
      <button
        type="button"
        onClick={toggleSection}
        className="w-full flex items-center justify-between p-8 text-left hover:bg-stone-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
            <FiCode size={20} />
          </div>
          <h3 className="text-xl font-bold">Technical Details</h3>
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
              {/* Tech Stack */}
              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500">
                  Tech Stack
                </label>
                <div className="w-full bg-stone-50 border-none rounded-lg p-4 flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-orange-500/50">
                  {techStack.length === 0 && (
                    <span className="text-stone-400 text-sm">
                      No technologies added yet. Type one below and press
                      Enter.
                    </span>
                  )}
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 uppercase tracking-tighter"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTech(tech)}
                        className="hover:text-red-600 transition-colors"
                      >
                        <FiX size={12} />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    onKeyDown={addTech}
                    className="bg-transparent border-none focus:ring-0 text-sm p-0 flex-1 min-w-[120px] placeholder:text-stone-400"
                    placeholder="Add technology..."
                  />
                </div>
              </div>

              {/* URLs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400">
                    Live URL
                  </label>
                  <div
                    className={`flex items-center bg-stone-50 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500/50 ${
                      touched.has("liveUrl") && errors.liveUrl
                        ? "ring-2 ring-red-400/40"
                        : ""
                    }`}
                  >
                    <FiLink className="ml-4 text-stone-400" size={16} />
                    <input
                      type="url"
                      value={liveUrl}
                      onChange={(e) => {
                        setLiveUrl(e.target.value);
                        handleFieldChange("liveUrl", e.target.value);
                      }}
                      onBlur={() => markTouched("liveUrl")}
                      className="w-full bg-transparent border-none p-4 text-sm focus:ring-0 placeholder:text-stone-400"
                      placeholder="https://project.com"
                    />
                  </div>
                  {touched.has("liveUrl") && errors.liveUrl && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <FiAlertCircle size={12} /> {errors.liveUrl}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400">
                    Repository URL
                  </label>
                  <div
                    className={`flex items-center bg-stone-50 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500/50 ${
                      touched.has("repoUrl") && errors.repoUrl
                        ? "ring-2 ring-red-400/40"
                        : ""
                    }`}
                  >
                    <FiTerminal className="ml-4 text-stone-400" size={16} />
                    <input
                      type="url"
                      value={repoUrl}
                      onChange={(e) => {
                        setRepoUrl(e.target.value);
                        handleFieldChange("repoUrl", e.target.value);
                      }}
                      onBlur={() => markTouched("repoUrl")}
                      className="w-full bg-transparent border-none p-4 text-sm focus:ring-0 placeholder:text-stone-400"
                      placeholder="https://github.com/..."
                    />
                  </div>
                  {touched.has("repoUrl") && errors.repoUrl && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <FiAlertCircle size={12} /> {errors.repoUrl}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
