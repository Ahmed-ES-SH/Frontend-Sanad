"use client";

import { FiMenu } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { buildBreadcrumb } from "@/app/helpers/_dashboard/buildBreadcrumb";

import NotificationBell from "../../website/notifications/NotificationBell";
import DropdownSettings from "./DropdownSettings";
import useVariablesStore from "@/app/store/VariablesSlice";
import LocaleLink from "../../global/LocaleLink";
import UserButton from "../../global/_navbar/UserButton";

export default function TopNavBar() {
  const { locale, setIsSidebarOpen } = useVariablesStore();
  const pathname = usePathname();
  const crumbs = buildBreadcrumb(pathname, locale);

  if (!pathname.includes(`/${locale}/dashboard`)) {
    return null;
  }

  return (
    <header className="sticky  top-0 left-0  z-30 bg-white/80 backdrop-blur-md flex justify-between items-center w-full px-4 sm:px-8 py-4 shrink-0 border-b border-stone-200/60 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 rounded-xl hover:bg-stone-100 transition-colors text-stone-600 border border-stone-200/50 shadow-sm"
          aria-label="Open Sidebar"
        >
          <FiMenu size={20} />
        </button>

        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-stone-400 text-xs sm:text-sm font-semibold tracking-wide"
          aria-label="Breadcrumb"
        >
          {crumbs.map((crumb, idx) => {
            const isLast = idx === crumbs.length - 1;
            return (
              <span key={crumb.href} className="flex items-center gap-2">
                {idx > 0 && (
                  <span className="text-stone-300 font-normal">/</span>
                )}
                {isLast ? (
                  <span className="text-stone-800 font-bold truncate max-w-[120px] sm:max-w-none">
                    {crumb.label}
                  </span>
                ) : (
                  <LocaleLink
                    href={crumb.href}
                    className="hover:text-orange-600 transition-colors hidden sm:inline"
                  >
                    {crumb.label}
                  </LocaleLink>
                )}
              </span>
            );
          })}
        </nav>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <div className="flex items-center gap-1 sm:gap-2 mr-1 sm:mr-3 border-r border-stone-200/60 pr-1 sm:pr-3">
            <NotificationBell />
            <DropdownSettings />
          </div>

          {/* User Button */}
          <UserButton />
        </div>
      </div>
    </header>
  );
}
