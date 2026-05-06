"use client";

import { FiSearch, FiBell, FiHelpCircle } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslation";

export default function UserDashboardHeader() {
  const locale = useLocale();
  const t = useTranslation("UserDashboard.Header");

  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-surface-50 border-b border-surface-200 flex items-center justify-between px-6 h-16">
      <div className="flex items-center gap-8">
        <span className="text-2xl font-bold tracking-tighter text-primary font-display">
          Sanad
        </span>

        <nav className="hidden md:flex gap-6">
          {[
            { key: "dashboard", href: "/userdashboard" },
            { key: "orders", href: "/userdashboard/orders" },
            { key: "support", href: "/contact" },
          ].map((item) => {
            const isActive = pathname === `/${locale}${item.href}`;
            return (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className={`text-sm font-semibold transition-all duration-200 px-2 py-1 rounded-md ${
                  isActive
                    ? "text-primary border-b-2 border-primary rounded-none"
                    : "text-surface-600 hover:text-primary hover:bg-surface-100"
                }`}
              >
                {t.nav[item.key as keyof typeof t.nav]}
              </Link>
            );
          })}
        </nav>

        <div className="hidden sm:flex items-center bg-surface-100 px-3 py-1.5 rounded-full gap-2 text-surface-400">
          <FiSearch className="text-lg" size={18} />
          <input
            className="bg-transparent border-none focus:ring-0 text-sm w-48 font-body"
            placeholder={t.searchPlaceholder}
            type="text"
            aria-label={t.searchPlaceholder}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="text-surface-400 hover:bg-surface-100 transition-colors p-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={t.notifications}
        >
          <FiBell size={22} />
        </button>
        <button
          className="text-surface-400 hover:bg-surface-100 transition-colors p-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={t.help}
        >
          <FiHelpCircle size={22} />
        </button>
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuATi4SnYCzA4OIGNhCOsejcGRaKsdEVlcd_hV6JJj_0umiC1r9kx1XQjqWpcHvDbn9VxfUJp7A1YCyo7aBraHp4qrEwwF2egSSfuwMh26RyyaAX8R0sI-_xlkbHnBSTl9lrN-X7VLa8slWZwgcEVD4M5cvd88dyMDmvxvZqHmLBX5JB4EYD3sroZS0vFn7ss5s0i_zxkNzYvDIoquSxLuO6hshMfVRjgKss2ISSkU6HKcLGvB7qrdWDOh49Kh2Sk-KHTXhHOD6h6cwF"
            alt={t.userAvatar}
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
