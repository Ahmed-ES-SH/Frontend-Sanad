import type { IconType } from "react-icons";
import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiLink,
  FiImage as FiImageIcon,
  FiCode,
  FiMaximize2,
} from "react-icons/fi";

interface ArticleEditorProps {
  content: string;
  wordCount: number;
  wordsLabel: string;
  contentPlaceholder: string;
  onContentChange: (content: string) => void;
}

const TOOLBAR_ICONS = [
  [FiBold, FiItalic, FiUnderline],
  [FiAlignLeft, FiAlignCenter, FiAlignRight],
  [FiLink, FiImageIcon, FiCode],
] as const;

export default function ArticleEditor({
  content,
  wordCount,
  wordsLabel,
  contentPlaceholder,
  onContentChange,
}: ArticleEditorProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      <div className="bg-stone-50 px-2 md:px-4 py-2 border-b border-stone-200 flex items-center gap-0.5 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-0.5 shrink-0">
          {TOOLBAR_ICONS[0].map((Icon, i) => (
            <button
              key={i}
              type="button"
              className="p-3 md:p-2 hover:bg-stone-200 rounded-lg transition-colors text-stone-600 active:bg-stone-300"
            >
              <Icon size={18} />
            </button>
          ))}
        </div>
        <div className="w-px h-4 bg-stone-300 mx-1 shrink-0"></div>
        <div className="flex items-center gap-0.5 shrink-0">
          {TOOLBAR_ICONS[1].map((Icon, i) => (
            <button
              key={i}
              type="button"
              className="p-3 md:p-2 hover:bg-stone-200 rounded-lg transition-colors text-stone-600 active:bg-stone-300"
            >
              <Icon size={18} />
            </button>
          ))}
        </div>
        <div className="w-px h-4 bg-stone-300 mx-1 shrink-0"></div>
        <div className="flex items-center gap-0.5 shrink-0">
          {TOOLBAR_ICONS[2].map((Icon, i) => (
            <button
              key={i}
              type="button"
              className="p-3 md:p-2 hover:bg-stone-200 rounded-lg transition-colors text-stone-600 active:bg-stone-300"
            >
              <Icon size={18} />
            </button>
          ))}
        </div>
        <div className="flex-1 min-w-[20px]"></div>
        <div className="flex items-center gap-3 shrink-0 pe-2">
          <span className="hidden sm:inline text-[0.65rem] font-bold text-stone-400 uppercase">
            {wordsLabel}: {wordCount}
          </span>
          <button
            type="button"
            className="p-3 md:p-2 hover:bg-stone-200 rounded-lg transition-colors text-stone-600 active:bg-stone-300"
          >
            <FiMaximize2 size={18} />
          </button>
        </div>
      </div>
      <div className="p-5 md:p-12 min-h-[500px] md:min-h-[600px] focus:outline-none bg-white">
        <textarea
          name="content"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder={contentPlaceholder}
          className="w-full h-full min-h-[400px] prose prose-orange max-w-none focus:outline-none bg-white resize-none"
        />
      </div>
    </div>
  );
}