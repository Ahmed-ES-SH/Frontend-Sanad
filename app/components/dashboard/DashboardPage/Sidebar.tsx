"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiLayout,
  FiUsers,
  FiTarget,
  FiTool,
  FiMail,
  FiCreditCard,
  FiFileText,
  FiLogOut,
  FiShoppingCart,
  FiBell,
} from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence, spring } from "framer-motion";
import LocaleLink from "../../global/LocaleLink";
import Img from "../../global/Img";
import { useAuthStore } from "@/app/store/AuthSlice";
import useVariablesStore from "@/app/store/VariablesSlice";
import { useTranslation } from "@/app/hooks/useTranslation";

const navItems = [
  { labelKey: "overview", href: "/dashboard", icon: FiLayout },
  { labelKey: "users", href: "/dashboard/users", icon: FiUsers },
  { labelKey: "projects", href: "/dashboard/projects", icon: FiTarget },
  { labelKey: "services", href: "/dashboard/services", icon: FiTool },
  { labelKey: "contactUs", href: "/dashboard/contactus", icon: FiMail },
  { labelKey: "payments", href: "/dashboard/payments", icon: FiCreditCard },
  { labelKey: "orders", href: "/dashboard/orders", icon: FiShoppingCart },
  { labelKey: "notifications", href: "/dashboard/notifications", icon: FiBell },
  { labelKey: "blog", href: "/dashboard/blog", icon: FiFileText },
];

export default function Sidebar() {
  const router = useRouter();

  const { locale, isSidebarOpen, setIsSidebarOpen, width } =
    useVariablesStore();
  const { logout, isLoading } = useAuthStore();
  const isRTL = locale === "ar";
  const isMobile = width < 1024;

  const pathname = usePathname();
  const t = useTranslation("DashboardPage.Sidebar");

  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: spring, stiffness: 300, damping: 30 },
    },
    closed: {
      x: isRTL ? "100%" : "-100%",
      transition: { type: spring, stiffness: 300, damping: 30 },
    },
  };

  const asideContent = (
    <>
      {/* Brand Section */}
      <div className="px-6 py-8  border-b border-stone-200/50 mb-4">
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className={`lg:hidden ${
            isRTL ? "mr-auto" : "ml-auto"
          } text-stone-400 hover:text-red-500 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors`}
          aria-label="Close menu"
        >
          <IoMdClose size={20} />
        </button>
        <LocaleLink className="flex items-center gap-3" href="/">
          <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
            <Img
              src="/sanad-logo.png"
              alt="Sanad"
              className="w-7 h-7 object-contain brightness-0 invert"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-stone-800 tracking-tight leading-none uppercase">
              {t.brandName}
            </span>
            <span className="text-[10px] font-semibold text-orange-600 uppercase tracking-widest mt-1">
              {t.brandTagline}
            </span>
          </div>
        </LocaleLink>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const fullHref = `/${locale}${item.href}`;
          const isActive =
            pathname === fullHref ||
            (item.href === "/dashboard" && pathname === `/${locale}/dashboard`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={fullHref}
              onClick={() => isMobile && setIsSidebarOpen(false)}
              className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                isActive
                  ? "bg-orange-600 text-white shadow-md shadow-orange-100"
                  : "text-stone-500 hover:bg-stone-200/60 hover:text-stone-800"
              }`}
            >
              <Icon
                className={`${isRTL ? "ml-3" : "mr-3"} shrink-0 transition-transform group-hover:scale-110`}
                size={20}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="text-sm font-semibold tracking-wide">
                {t[item.labelKey as keyof typeof t] || item.labelKey}
              </span>

              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className={`absolute ${isRTL ? "right-0" : "left-0"} w-1 h-6 bg-white rounded-full translate-y-[-50%] top-1/2`}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="px-4 py-4 mt-auto border-t border-stone-200/50 bg-stone-50/50">
        <button
          onClick={() => logout(router)}
          disabled={isLoading}
          className="w-full cursor-pointer flex items-center px-4 py-3 rounded-xl transition-all duration-200 text-sm font-bold text-red-600 hover:bg-red-50 group disabled:opacity-50"
        >
          {isLoading ? (
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-600 border-t-transparent"></div>
              <span>{t.loggingOut}</span>
            </div>
          ) : (
            <>
              <FiLogOut
                className={`${isRTL ? "ml-3 rotate-180" : "mr-3"} shrink-0 transition-transform group-hover:translate-x-1`}
                size={20}
                strokeWidth={2.5}
              />
              <span>{t.logout}</span>
            </>
          )}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[9999] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Aside (Desktop) */}
      <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-stone-100 border-r border-stone-200 shadow-sm z-40 shrink-0 overflow-hidden">
        {asideContent}
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence mode="wait">
        {isMobile && isSidebarOpen && (
          <motion.aside
            key="mobile-sidebar"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className={`fixed inset-y-0 ${isRTL ? "right-0" : "left-0"} w-72 bg-white z-[10000] flex flex-col shadow-2xl lg:hidden overflow-hidden`}
          >
            {asideContent}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
