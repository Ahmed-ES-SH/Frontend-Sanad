"use client";

import { useState, useRef, useEffect } from "react";
import {
  FiSettings,
  FiMonitor,
  FiGrid,
  FiCommand,
  FiLink,
  FiDatabase,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useLocale } from "@/app/hooks/useLocale";

const settingsOptions = [
  { id: "appearance", label: "Appearance & Theme", icon: FiMonitor },
  { id: "workspace", label: "Workspace Settings", icon: FiGrid },
  { id: "shortcuts", label: "Keyboard Shortcuts", icon: FiCommand },
  { id: "integrations", label: "Integrations & APIs", icon: FiLink },
  { id: "data", label: "Data & Storage", icon: FiDatabase },
];

export default function DropdownSettings() {
  const locale = useLocale();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const t = useTranslation("DashboardPage.TopNavBar");

  const isRTL = locale === "ar";

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`p-2 text-stone-500 hover:bg-stone-200/50 rounded-full transition-colors ${isOpen ? "bg-stone-200/50" : ""}`}
        aria-label={t.settings}
      >
        <FiSettings size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute top-full mt-2 w-56 bg-stone-100 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-stone-200 overflow-hidden z-50 ${isRTL ? "left-0 origin-top-left" : "right-0 origin-top-right"}`}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200 bg-stone-50">
              <h3 className="text-sm font-semibold text-stone-800">
                {t.settings || "Settings"}
              </h3>
            </div>

            <div className="flex flex-col py-1.5">
              {settingsOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-start font-medium transition-colors text-stone-600 hover:bg-stone-200/50 hover:text-stone-900 w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={16} className="text-stone-400 shrink-0" />
                    <span>{option.label}</span>
                  </button>
                );
              })}

              <div className="my-1.5 border-t border-stone-200/60 mx-2"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
