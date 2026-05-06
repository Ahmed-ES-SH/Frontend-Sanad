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
}

export default function TagInput({
  tags,
  newTag,
  onNewTagChange,
  onAddTag,
  onRemoveTag,
  placeholder,
  isRTL,
}: TagInputProps) {
  return (
    <div className="flex flex-wrap gap-2 p-2 bg-white border border-stone-200 rounded-xl min-h-[46px] items-center shadow-sm">
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
            className="bg-stone-50 text-stone-700 px-2.5 py-1 rounded-lg text-[0.7rem] font-black flex items-center gap-1.5 border border-stone-200/60 shadow-sm"
          >
            {tag}
            <FiX
              className="cursor-pointer hover:text-red-500 transition-colors"
              onClick={() => onRemoveTag(tag)}
            />
          </motion.span>
        ))}
      </AnimatePresence>
      <div className="flex items-center gap-1">
        <input
          type="text"
          value={newTag}
          onChange={(e) => onNewTagChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), onAddTag())}
          placeholder={placeholder}
          className="text-[0.7rem] font-black px-2 py-1 outline-none w-16"
        />
        <motion.button
          layout
          whileHover={{ scale: 1.05 }}
          onClick={onAddTag}
          className="text-primary text-[0.7rem] font-black px-1 flex items-center hover:opacity-70 transition-all"
        >
          <FiPlus size={12} />
        </motion.button>
      </div>
    </div>
  );
}