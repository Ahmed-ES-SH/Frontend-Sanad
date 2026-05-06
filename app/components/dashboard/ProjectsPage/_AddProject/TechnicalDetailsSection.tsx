"use client";

import { FiCode, FiLink, FiTerminal, FiAlertCircle, FiX } from "react-icons/fi";

interface TechnicalDetailsSectionProps {
  t: Record<string, any>;
  open: boolean;
  toggleSection: (section: string) => void;
  techStack: string[];
  liveUrl: string;
  repoUrl: string;
  newTech: string;
  setTechStack: (value: string[]) => void;
  setLiveUrl: (value: string) => void;
  setRepoUrl: (value: string) => void;
  setNewTech: (value: string) => void;
  removeTech: (tech: string) => void;
  addTech: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  touched: Set<string>;
  errors: { liveUrl?: string; repoUrl?: string };
  markTouched: (field: string) => void;
  handleFieldChange: (name: string, value: string) => void;
}

export default function TechnicalDetailsSection({
  t,
  open,
  toggleSection,
  techStack,
  liveUrl,
  repoUrl,
  newTech,
  setTechStack,
  setLiveUrl,
  setRepoUrl,
  setNewTech,
  removeTech,
  addTech,
  touched,
  errors,
  markTouched,
  handleFieldChange,
}: TechnicalDetailsSectionProps) {
  return (
    <section className="bg-white rounded-xl border border-stone-200/50 overflow-hidden">
      <button
        type="button"
        onClick={() => toggleSection("technical")}
        className="w-full flex items-center justify-between p-8 text-left hover:bg-stone-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
            <FiCode size={20} />
          </div>
          <h3 className="text-xl font-bold">
            {t?.technicalDetails?.title || "Technical Details"}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {!open && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Tech stack, URLs
            </span>
          )}
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-400 shrink-0"><path d="m18 15-6-6-6 6"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-400 shrink-0"><path d="m6 9 6 6 6-6"/></svg>
          )}
        </div>
      </button>
      {open && (
        <div className="px-8 pb-8">
          <div className="grid gap-6">
            {/* Tech Stack */}
            <div className="grid gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-stone-500">
                {t?.technicalDetails?.techStack || "Tech Stack"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <div 
                className={`w-full bg-stone-50 border-none rounded-lg p-4 flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-orange-500/50 ${
                  techStack.length === 0 ? "ring-1 ring-stone-200" : ""
                }`}
                onClick={(e) => {
                  // Focus the input when clicking the container
                  const input = (e.currentTarget as HTMLElement).querySelector('input');
                  input?.focus();
                }}
              >
                {techStack.length === 0 && (
                  <span className="text-stone-400 text-sm pointer-events-none">
                    {t?.technicalDetails?.techStackEmpty || "No technologies added yet. Type one below and press Enter."}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTech(tech);
                      }}
                      className="hover:text-red-600 transition-colors"
                      aria-label={`Remove ${tech}`}
                    >
                      <FiX size={12} />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTech(e);
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-transparent border-none outline-none focus:ring-0 text-sm p-0 flex-1 min-w-[120px] placeholder:text-stone-400"
                  placeholder={
                    t?.technicalDetails?.addTechnology || "Add technology..."
                  }
                />
              </div>
            </div>

            {/* URLs */}
            <div className="grid grid-cols-2 gap-6">
              {/* Live URL */}
              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">
                  {t?.technicalDetails?.liveUrl || "Live URL"}{" "}
                  <span className="text-stone-300 font-normal normal-case tracking-normal text-[10px]">(optional)</span>
                </label>
                <div className={`flex items-center bg-stone-50 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500/50 ${
                  touched.has("liveUrl") && errors.liveUrl ? "ring-2 ring-red-400/40" : ""
                }`}>
                  <FiLink className="ml-4 text-stone-400" size={16} />
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(e) => { setLiveUrl(e.target.value); handleFieldChange("liveUrl", e.target.value); }}
                    onBlur={() => markTouched("liveUrl")}
                    className="w-full bg-transparent border-none p-4 text-sm focus:ring-0 placeholder:text-stone-400"
                    placeholder="https://project.com"
                  />
                </div>
                {touched.has("liveUrl") && errors.liveUrl && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <FiAlertCircle size={12} /> {errors.liveUrl}
                  </p>
                )}
              </div>

              {/* Repository URL */}
              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">
                  {t?.technicalDetails?.repoUrl || "Repository URL"}{" "}
                  <span className="text-stone-300 font-normal normal-case tracking-normal text-[10px]">(optional)</span>
                </label>
                <div className={`flex items-center bg-stone-50 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500/50 ${
                  touched.has("repoUrl") && errors.repoUrl ? "ring-2 ring-red-400/40" : ""
                }`}>
                  <FiTerminal className="ml-4 text-stone-400" size={16} />
                  <input
                    type="url"
                    value={repoUrl}
                    onChange={(e) => { setRepoUrl(e.target.value); handleFieldChange("repoUrl", e.target.value); }}
                    onBlur={() => markTouched("repoUrl")}
                    className="w-full bg-transparent border-none p-4 text-sm focus:ring-0 placeholder:text-stone-400"
                    placeholder="https://github.com/sanad/..."
                  />
                </div>
                {touched.has("repoUrl") && errors.repoUrl && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <FiAlertCircle size={12} /> {errors.repoUrl}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
