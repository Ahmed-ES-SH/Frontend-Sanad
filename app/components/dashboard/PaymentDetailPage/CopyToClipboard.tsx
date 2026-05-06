"use client";

import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

interface CopyToClipboardProps {
  text: string;
  label?: string;
}

export default function CopyToClipboard({ text, label }: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-stone-500 bg-stone-100 rounded-md hover:bg-stone-200 hover:text-stone-700 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/40"
      aria-label={copied ? "Copied to clipboard" : label || `Copy ${text} to clipboard`}
    >
      {copied ? (
        <>
          <FiCheck size={12} className="text-emerald-500" />
          <span className="text-emerald-600">Copied</span>
        </>
      ) : (
        <>
          <FiCopy size={12} />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}
