"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";

import useVariablesStore from "@/app/store/VariablesSlice";

export default function SelectLanguage() {
  const { showLangDrop, setShowLangDrop, locale } = useVariablesStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const toggleDropdown = () => {
    setShowLangDrop(!showLangDrop);
  };

  const handleChangeLanguage = (lang: "en" | "ar") => {
    const currentPath =
      typeof window !== "undefined" &&
      window.location.pathname.split("/").slice(2).join("/");

    router.push(`/${lang}/${currentPath || ""}`);
    setShowLangDrop(false);
  };

  useEffect(() => {
    const handleSelected = (newLang: "العربية" | "English") => {
      setSelectedLanguage(newLang);
    };
    if (locale === "en") {
      handleSelected("English");
    } else {
      handleSelected("العربية");
    }
  }, [locale]);

  const languageCode = locale === "ar" ? "AR" : "EN";

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowLangDrop(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowLangDrop]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="surface-btn-secondary min-h-[40px] xl:px-4 px-1 text-sm"
      >
        <span className="w-[30px]">{languageCode}</span>

        <IoIosArrowDown
          className={`hidden md:block transition-transform duration-300 ${
            showLangDrop ? "rotate-180" : ""
          }`}
        />
      </button>

      {showLangDrop && (
        <div className="absolute ltr:right-0 rtl:left-0 mt-3 w-32 surface-card-elevated overflow-hidden border-none shadow-surface-lg p-1">
          <button
            className={`w-full text-left px-4 py-2.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
              locale === "ar"
                ? "bg-primary/10 text-primary"
                : "text-surface-600 hover:bg-primary/5 hover:text-primary"
            }`}
            onClick={() => handleChangeLanguage("ar")}
          >
            العربية
          </button>

          <button
            className={`w-full text-left px-4 py-2.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
              locale === "en"
                ? "bg-primary/10 text-primary"
                : "text-surface-600 hover:bg-primary/5 hover:text-primary"
            }`}
            onClick={() => handleChangeLanguage("en")}
          >
            English
          </button>
        </div>
      )}
    </div>
  );
}
