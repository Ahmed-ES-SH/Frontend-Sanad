"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";
import { queryClient } from "./QueryClient";
import useVariablesStore from "@/app/store/VariablesSlice";
import { useLocale } from "@/app/hooks/useLocale";
import { useNotificationStore } from "@/app/store/NotificationSlice";

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const { isLoading, hasFetchedInitial, pagination, fetchNotifications } =
    useNotificationStore();

  const locale = useLocale();
  const { setLocal, setWidth } = useVariablesStore();

  useEffect(() => {
    setLocal(locale);
  }, [locale, setLocal]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setWidth]);

  useEffect(() => {
    if (!hasFetchedInitial && !isLoading) {
      fetchNotifications(1, pagination.limit);
    }
  }, [fetchNotifications, isLoading, hasFetchedInitial, pagination.limit]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
