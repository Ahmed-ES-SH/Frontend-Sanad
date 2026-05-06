"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/app/hooks/useTranslation";
import { HiOutlineX } from "react-icons/hi";

const shortcuts = [
  { key: "N", descriptionKey: "createNewPost" },
  { key: "F", descriptionKey: "focusSearch" },
  { key: "?", descriptionKey: "showShortcuts" },
  { key: "E", descriptionKey: "editSelected" },
  { key: "←/→", descriptionKey: "navigatePages" },
];

export function KeyboardShortcutsHelp() {
  const t = useTranslation("BlogPage.KeyboardShortcutsHelp");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Show help modal with ?
      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setIsVisible(true);
      }
      // Close with Escape
      if (e.key === "Escape") {
        setIsVisible(false);
      }
      // Create new post with N
      if (e.key === "n" || e.key === "N") {
        if (!e.metaKey && !e.ctrlKey && !e.altKey) {
          // Focus on create action - would trigger modal in real app
          console.log("Create new post");
        }
      }
      // Focus search with F
      if (e.key === "f" || e.key === "F") {
        if (!e.metaKey && !e.ctrlKey && !e.altKey) {
          const searchInput = document.querySelector(
            'input[placeholder="Search articles..."]',
          ) as HTMLInputElement;
          if (searchInput) {
            searchInput.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Hint footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="fixed bottom-4 right-4 text-xs text-stone-400 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm border border-stone-200/50"
      >
        <div className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-stone-100 rounded text-stone-600 font-mono text-[10px]">
            ?
          </kbd>
          <span>{t.showShortcuts}</span>
        </div>
      </motion.div>

      {/* Help Modal */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsVisible(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-stone-900">{t.title}</h3>
                <button
                  onClick={() => setIsVisible(false)}
                  className="p-1 hover:bg-stone-100 rounded-lg transition-colors"
                >
                  <HiOutlineX className="text-stone-400 text-xl" />
                </button>
              </div>

              <div className="space-y-3">
                {shortcuts.map((shortcut) => (
                  <div
                    key={shortcut.key}
                    className="flex items-center justify-between"
                  >
                    <span className="text-stone-600 text-sm">
                      {shortcut.descriptionKey}
                    </span>
                    <kbd className="px-2 py-1 bg-stone-100 rounded text-stone-700 font-mono text-xs font-medium">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>

              <p className="text-xs text-stone-400 mt-6 text-center">
                {t.pressEsc}{" "}
                <kbd className="px-1 bg-stone-100 rounded">Esc</kbd> {t.toClose}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
