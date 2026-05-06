"use client";

import { useState, useRef, useEffect } from "react";
import { FiBell, FiInfo, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useLocale } from "@/app/hooks/useLocale";

const notificationOptions = [
  {
    id: 1,
    title: "Project Approved",
    description: "Your recent project submission was approved successfully.",
    icon: FiCheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
    unread: true,
  },
  {
    id: 2,
    title: "System Maintenance",
    description: "Scheduled maintenance will occur tonight at 2:00 AM.",
    icon: FiAlertTriangle,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    unread: true,
  },
  {
    id: 3,
    title: "New Feature Available",
    description: "Check out the new Dashboard analytics and reporting tools.",
    icon: FiInfo,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    unread: false,
  },
];

export default function DropdownNotifications() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const t = useTranslation("DashboardPage.TopNavBar");

  const isRTL = locale === "ar";

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

  const hasUnread = notificationOptions.some((n) => n.unread);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`p-2 text-stone-500 hover:bg-stone-200/50 rounded-full transition-colors relative ${isOpen ? "bg-stone-200/50" : ""}`}
        aria-label={t.notifications}
      >
        <FiBell size={20} />
        {hasUnread && (
          <span
            className={`absolute top-1.5 w-2 h-2 bg-orange-500 border border-stone-100 rounded-full ${isRTL ? "left-1.5" : "right-1.5"}`}
          ></span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute top-full mt-2 w-72 md:w-80 bg-stone-100 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-stone-200 overflow-hidden z-50 ${isRTL ? "left-0 origin-top-left" : "right-0 origin-top-right"}`}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200 bg-stone-50">
              <h3 className="text-sm font-semibold text-stone-800">
                {t.notifications || "Notifications"}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs text-orange-600 hover:text-orange-700 font-medium transition-colors"
              >
                Clear All
              </button>
            </div>

            <div className="flex flex-col py-1 max-h-[60vh] overflow-y-auto">
              {notificationOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    className="flex flex-col items-start px-4 py-3 text-start hover:bg-stone-200/50 transition-colors w-full border-b border-stone-200/60 last:border-0 relative group"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex gap-3 w-full">
                      <div
                        className={`p-2 rounded-full shrink-0 flex items-center justify-center h-fit mt-0.5 ${option.bgColor} ${option.color}`}
                      >
                        <Icon size={16} />
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <div className="flex justify-between items-center w-full gap-2">
                          <span
                            className={`text-sm truncate ${option.unread ? "font-bold text-stone-800" : "font-medium text-stone-600 group-hover:text-stone-800"}`}
                          >
                            {option.title}
                          </span>
                          {option.unread && (
                            <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0"></span>
                          )}
                        </div>
                        <span className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                          {option.description}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="px-4 py-3 text-center border-t border-stone-200 bg-stone-50 hover:bg-stone-100 transition-colors">
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs text-stone-600 hover:text-stone-800 font-medium w-full h-full"
              >
                View all notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
