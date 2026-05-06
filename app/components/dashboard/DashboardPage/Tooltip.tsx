"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHelpCircle } from "react-icons/fi";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export function Tooltip({ content, children, position = "top" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasSeen, setHasSeen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Check if user has seen this tooltip before
  useEffect(() => {
    const tooltipKey = `tooltip-seen-${content.slice(0, 20)}`;
    const seen = localStorage.getItem(tooltipKey);
    if (seen) {
      setHasSeen(true);
    }
  }, [content]);

  const showTooltip = () => {
    setIsVisible(true);
    // Mark as seen after 3 seconds
    const tooltipKey = `tooltip-seen-${content.slice(0, 20)}`;
    setTimeout(() => {
      localStorage.setItem(tooltipKey, "true");
      setHasSeen(true);
    }, 3000);
  };

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div 
      ref={triggerRef}
      className="relative inline-flex"
      onMouseEnter={showTooltip}
      onFocus={showTooltip}
    >
      {children}
      <AnimatePresence>
        {!hasSeen && isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 ${positionClasses[position]} whitespace-nowrap`}
          >
            <div className="px-3 py-2 bg-stone-800 text-white text-xs rounded-lg shadow-lg max-w-[200px]">
              {content}
              <div className="absolute inset-0 -z-10 bg-stone-800 rotate-45 w-2 h-2 left-1/2 -translate-x-1/2 -bottom-1" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface HelpIconProps {
  content: string;
}

export function HelpIcon({ content }: HelpIconProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <FiHelpCircle className="text-stone-400 hover:text-stone-600 cursor-help transition-colors" size={14} />
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50"
          >
            <div className="px-3 py-2 bg-stone-800 text-white text-xs rounded-lg shadow-lg whitespace-nowrap">
              {content}
              <div className="absolute inset-0 -z-10 bg-stone-800 rotate-45 w-2 h-2 left-1/2 -translate-x-1/2 -bottom-1" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}