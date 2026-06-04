"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { useCallback, useEffect } from "react";
import {
  FiBold,
  FiItalic,
  FiList,
  FiHash,
  FiLink as FiLinkIcon,
  FiImage as FiImageIcon,
  FiCode,
  FiCornerDownLeft,
  FiRotateCcw,
  FiRotateCw,
} from "react-icons/fi";

interface ArticleEditorProps {
  content: string;
  wordCount: number;
  wordsLabel: string;
  contentPlaceholder: string;
  contentError?: string;
  contentLabel: string;
  boldLabel: string;
  italicLabel: string;
  bulletListLabel: string;
  orderedListLabel: string;
  linkLabel: string;
  imageLabel: string;
  codeLabel: string;
  paragraphLabel: string;
  undoLabel: string;
  redoLabel: string;
  onContentChange: (content: string) => void;
  onContentBlur?: () => void;
}

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}

function ToolbarButton({
  onClick,
  isActive,
  disabled,
  label,
  children,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={isActive}
      title={label}
      className={`p-2 rounded-lg transition-colors flex items-center justify-center min-w-[40px] min-h-[40px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
        isActive
          ? "bg-primary/10 text-primary"
          : "text-stone-600 hover:bg-stone-200/70 active:bg-stone-300"
      } disabled:opacity-30 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return (
    <div
      className="w-px h-5 bg-stone-200 mx-0.5 shrink-0"
      aria-hidden="true"
    />
  );
}

export default function ArticleEditor({
  content,
  wordCount,
  wordsLabel,
  contentPlaceholder,
  contentError,
  contentLabel,
  boldLabel,
  italicLabel,
  bulletListLabel,
  orderedListLabel,
  linkLabel,
  imageLabel,
  codeLabel,
  paragraphLabel,
  undoLabel,
  redoLabel,
  onContentChange,
  onContentBlur,
}: ArticleEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      Image.configure({
        HTMLAttributes: { class: "rounded-lg max-w-full h-auto" },
      }),
      Placeholder.configure({
        placeholder: contentPlaceholder,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-stone max-w-none focus:outline-none min-h-[280px] md:min-h-[500px] px-5 md:px-10 py-6 prose-headings:font-semibold prose-headings:text-stone-900 prose-p:text-stone-700 prose-a:text-primary",
        "aria-label": contentLabel,
        role: "textbox",
        "aria-multiline": "true",
      },
    },
    onUpdate: ({ editor: ed }) => {
      onContentChange(ed.getHTML());
    },
    onBlur: () => {
      onContentBlur?.();
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [content, editor]);

  const promptLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href as
      | string
      | undefined;
    const url = window.prompt(linkLabel, previousUrl ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor, linkLabel]);

  const promptImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt(imageLabel, "https://");
    if (!url) return;
    editor.chain().focus().setImage({ src: url, alt: "" }).run();
  }, [editor, imageLabel]);

  if (!editor) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="min-h-[500px] flex items-center justify-center text-stone-400 text-sm p-12">
          {contentPlaceholder}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
      <div
        className="bg-stone-50/70 px-2 md:px-3 py-2.5 border-b border-stone-200 flex items-center gap-0.5 overflow-x-auto no-scrollbar"
        role="toolbar"
        aria-label={contentLabel}
      >
        <div className="flex items-center gap-0.5 shrink-0">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            label={boldLabel}
          >
            <FiBold size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            label={italicLabel}
          >
            <FiItalic size={16} />
          </ToolbarButton>
        </div>
        <ToolbarDivider />
        <div className="flex items-center gap-0.5 shrink-0">
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            isActive={editor.isActive("heading", { level: 2 })}
            label={`H2`}
          >
            <span className="text-xs font-bold">H2</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            isActive={editor.isActive("heading", { level: 3 })}
            label={`H3`}
          >
            <span className="text-xs font-bold">H3</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setParagraph().run()}
            isActive={editor.isActive("paragraph")}
            label={paragraphLabel}
          >
            <FiCornerDownLeft size={16} />
          </ToolbarButton>
        </div>
        <ToolbarDivider />
        <div className="flex items-center gap-0.5 shrink-0">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            label={bulletListLabel}
          >
            <FiList size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            label={orderedListLabel}
          >
            <FiHash size={16} />
          </ToolbarButton>
        </div>
        <ToolbarDivider />
        <div className="flex items-center gap-0.5 shrink-0">
          <ToolbarButton
            onClick={promptLink}
            isActive={editor.isActive("link")}
            label={linkLabel}
          >
            <FiLinkIcon size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={promptImage} label={imageLabel}>
            <FiImageIcon size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive("codeBlock")}
            label={codeLabel}
          >
            <FiCode size={16} />
          </ToolbarButton>
        </div>
        <ToolbarDivider />
        <div className="flex items-center gap-0.5 shrink-0">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            label={undoLabel}
          >
            <FiRotateCcw size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            label={redoLabel}
          >
            <FiRotateCw size={16} />
          </ToolbarButton>
        </div>
        <div className="flex-1 min-w-[20px]" />
        <div className="flex items-center gap-2 shrink-0 pe-2">
          <span
            className="inline-flex items-center text-xs font-medium text-stone-500 tabular-nums"
            aria-live="polite"
          >
            <span className="text-stone-400 me-1">{wordsLabel}</span>
            {wordCount}
          </span>
        </div>
      </div>
      <div
        className={`bg-white ${contentError ? "ring-1 ring-inset ring-red-300" : ""}`}
      >
        <EditorContent editor={editor} />
      </div>
      {contentError && (
        <p className="text-xs text-red-600 px-5 md:px-10 pt-2" role="alert">
          {contentError}
        </p>
      )}
    </div>
  );
}
