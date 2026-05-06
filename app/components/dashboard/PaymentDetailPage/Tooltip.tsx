"use client";

import { useState } from "react";
import { FiInfo } from "react-icons/fi";

interface TooltipProps {
  text: string;
  children?: React.ReactNode;
}

export default function Tooltip({ text, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children || (
        <button
          type="button"
          className="inline-flex items-center justify-center w-4 h-4 text-stone-400 hover:text-stone-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/40 rounded"
          aria-label={`Info: ${text}`}
          tabIndex={0}
        >
          <FiInfo size={12} />
        </button>
      )}
      {isVisible && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-xs font-medium text-white bg-stone-800 rounded-lg shadow-lg whitespace-nowrap z-50 pointer-events-none"
          role="tooltip"
        >
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
            <div className="border-4 border-transparent border-t-stone-800" />
          </div>
        </div>
      )}
    </span>
  );
}
