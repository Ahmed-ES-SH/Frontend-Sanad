"use client";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useAuthStore } from "@/app/store/AuthSlice";
import { useEffect, useState } from "react";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { navLinks } from "@/app/constants/navbar";

import LocaleLink from "../LocaleLink";
import useVariablesStore from "@/app/store/VariablesSlice";
import Img from "../Img";

export default function MobileSidebar() {
  const { user } = useAuthStore();
  const { width, locale } = useVariablesStore();
  const t_mobile = useTranslation("mobileSidebar");
  const t_hero = useTranslation("hero");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleSidebar = (state: boolean) => {
      setIsSidebarOpen(state);
    };

    if (width > 1014) {
      handleSidebar(false);
    }
  }, [width]);

  return (
    <>
      <div
        className={`cursor-pointer xl:hidden transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-0" : "opacity-100"
        }`}
        onClick={toggleSidebar}
      >
        <HiOutlineBars3BottomRight size={32} />
      </div>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-surface-900/40 backdrop-blur-sm z-9998 transition-opacity duration-300 xl::hidden ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />

      {/* Sidebar Content */}
      <aside
        className={`fixed h-screen top-0 ${locale === "ar" ? "left-0" : "right-0"} w-80 bg-white z-9999 transform transition-transform duration-500 ease-out xl:hidden flex flex-col shadow-2xl ${
          isSidebarOpen
            ? "translate-x-0"
            : locale === "ar"
              ? "-translate-x-full"
              : "translate-x-full"
        }`}
      >
        <div className="p-6 flex items-center justify-between border-b border-surface-100">
          <div className="w-16">
            <LocaleLink href="/">
              <Img src="/sanad-logo.png" className="w-full object-contain" />
            </LocaleLink>
          </div>
          <button
            onClick={toggleSidebar}
            aria-label={t_mobile.closeMenu}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-50 text-surface-900 hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <IoClose size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-6 space-y-2">
          {navLinks.map((item, index) => (
            <LocaleLink
              key={index}
              href={item.link || "/#contactus"}
              className="flex items-center gap-4 p-4 rounded-2xl text-surface-600 hover:bg-primary/5 hover:text-primary font-semibold transition-all duration-200"
            >
              <span
                className="flex items-center gap-4 w-full"
                onClick={() => setIsSidebarOpen(false)}
              >
                {item.icon && (
                  <span className="text-xl opacity-70">
                    <item.icon />
                  </span>
                )}
                <span>{item.text[locale]}</span>
              </span>
            </LocaleLink>
          ))}
        </nav>

        {!user && (
          <div className="p-6 border-t border-surface-100 bg-surface-50/50">
            <LocaleLink
              href="/signup"
              className="surface-btn-primary w-full h-14 text-base"
            >
              <span
                onClick={() => setIsSidebarOpen(false)}
                className="w-full block"
              >
                {t_hero.join}
              </span>
            </LocaleLink>
            <p className="mt-4 text-center text-[10px] text-surface-400 font-medium uppercase tracking-widest">
              {t_mobile.tagline}
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
