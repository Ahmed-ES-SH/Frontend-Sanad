"use client";

import { directionMap } from "@/app/constants/global";
import { useLocale } from "@/app/hooks/useLocale";
import { useAuthStore } from "@/app/store/AuthSlice";
import { useNotificationStore } from "@/app/store/NotificationSlice";
import { useCartInit } from "@/app/hooks/useCartInit";
import { useOAuthCartMerge } from "@/app/hooks/useOAuthCartMerge";
import { User } from "@/app/types/user";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface props {
  children: ReactNode;
  initialUser: User | null;
}

export default function ClientDiv({ children, initialUser }: props) {
  const locale = useLocale();
  const hydrateUser = useAuthStore((state) => state.hydrateUser);
  const syncNotificationAuth = useNotificationStore((state) => state.syncAuth);
  const connectSocket = useNotificationStore((state) => state.connectSocket);
  const disconnectSocket = useNotificationStore(
    (state) => state.disconnectSocket,
  );
  const refreshUnreadCount = useNotificationStore(
    (state) => state.refreshUnreadCount,
  );

  // Initialise cart: fetch from API (auth) or hydrate from localStorage (guest)
  useCartInit();
  // Merge guest cart after OAuth logins (credential logins handle this in SignInForm)
  useOAuthCartMerge();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Initial check in case page starts scrolled
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    hydrateUser(initialUser);
  }, [hydrateUser, initialUser]);

  useEffect(() => {
    const isAuthenticated = Boolean(initialUser);

    syncNotificationAuth(isAuthenticated);

    if (!isAuthenticated) {
      disconnectSocket();
      return;
    }

    void refreshUnreadCount();
    connectSocket();

    return () => {
      disconnectSocket();
    };
  }, [
    connectSocket,
    disconnectSocket,
    initialUser,
    refreshUnreadCount,
    syncNotificationAuth,
  ]);

  const pathname = usePathname();

  if (pathname.startsWith(`/${locale}/dashboard`)) {
    return null;
  }

  return (
    <div className="" dir={directionMap[locale || "en"]}>
      <header
        className={`w-full fixed top-0 left-0 right-0 z-999 bg-white transition-all duration-500 ease-out ${
          isScrolled
            ? "h-16 border-b border-surface-200 shadow-surface-md"
            : "h-20 border-b border-surface-100 shadow-surface-sm"
        }`}
      >
        {children}
      </header>
    </div>
  );
}
