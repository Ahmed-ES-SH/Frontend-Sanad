"use client";

import { FiX, FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface TagInputProps {
  tags: string[];
  newTag: string;
  onNewTagChange: (value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  placeholder: string;
  isRTL: boolean;
  ariaLabel: string;
  removeTagLabel: string;
  addTagLabel: string;
}

export default function TagInput({
  tags,
  newTag,
  onNewTagChange,
  onAddTag,
  onRemoveTag,
  placeholder,
  isRTL,
  ariaLabel,
  removeTagLabel,
  addTagLabel,
}: TagInputProps) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="flex flex-wrap gap-1.5 p-2 bg-white border border-stone-200 rounded-xl min-h-[48px] items-center focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all"
    >
      <AnimatePresence mode="popLayout">
        {tags.map((tag) => (
          <motion.span
            key={tag}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
            className="bg-stone-50 text-stone-700 px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-stone-200"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => onRemoveTag(tag)}
              aria-label={`${removeTagLabel} ${tag}`}
              className="cursor-pointer hover:text-red-500 transition-colors p-0.5 -m-0.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <FiX size={12} />
            </button>
          </motion.span>
        ))}
      </AnimatePresence>
      <div className="flex items-center gap-1 flex-1 min-w-[80px]">
        <input
          type="text"
          value={newTag}
          onChange={(e) => onNewTagChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              onAddTag();
            }
          }}
          onBlur={() => newTag.trim() && onAddTag()}
          placeholder={placeholder}
          aria-label={placeholder}
          className="text-sm px-2 py-1.5 outline-none flex-1 min-w-0 bg-transparent text-stone-700 placeholder:text-stone-400"
        />
        <button
          type="button"
          onClick={onAddTag}
          disabled={!newTag.trim()}
          aria-label={addTagLabel}
          className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg text-primary hover:bg-primary/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
          <FiPlus size={16} className={isRTL ? "rotate-180" : ""} />
        </button>
      </div>
    </div>
  );
}
