"use client";

import { FiMenu } from "react-icons/fi";
import { usePathname } from "next/navigation";
import DropdownSettings from "./DropdownSettings";
import useVariablesStore from "@/app/store/VariablesSlice";
import LocaleLink from "../../global/LocaleLink";
import UserButton from "../../global/_navbar/UserButton";
import NotificationBell from "../../website/notifications/NotificationBell";

const routeLabels: Record<string, string> = {
  dashboard: "Overview",
  projects: "Projects",
  "projects/add": "Add New Project",
  services: "Services",
  "services/add": "Add New Service",
  users: "Users",
  "users/add": "Add New User",
  payments: "Payments & Billing",
  blog: "Blog",
  "blog/add": "Add New Post",
  contactus: "Contact Submissions",
};

function buildBreadcrumb(pathname: string, locale: string) {
  const segments = pathname.split("/").filter(Boolean);
  const crumbLabels: { label: string; href: string }[] = [];
  let href = "";

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    // Skip local segment
    if (i === 0 && segment === locale) continue;
    href += `/${segment}`;

    // Check if this segment + next is a known compound route
    const compoundKey = `${segment}/${segments[i + 1]}`;
    if (routeLabels[compoundKey]) {
      crumbLabels.push({ label: routeLabels[compoundKey], href });
      i++; // skip next segment
      continue;
    }

    if (routeLabels[segment]) {
      crumbLabels.push({ label: routeLabels[segment], href });
    }
  }

  return crumbLabels;
}

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
