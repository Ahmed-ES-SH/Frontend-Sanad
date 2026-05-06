"use client";
import { useLocale } from "@/app/hooks/useLocale";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ReactNode, useCallback } from "react";

interface LocaleLinkProps {
  children: ReactNode;
  className?: string;
  href: string;
  target?: string;
  onClick?: () => void;
}

export default function LocaleLink({
  children,
  className,
  target,
  href,
  onClick,
}: LocaleLinkProps) {
  const locale = useLocale();
  const searchParams = useSearchParams();

  const getFormattedHref = useCallback(() => {
    const [pathname, queryString] = href.split("?");
    const newParams = new URLSearchParams(queryString || "");

    searchParams.forEach((value, key) => {
      if (!newParams.has(key)) {
        newParams.set(key, value);
      }
    });

    const localePath = `/${locale}/${pathname}`.replace(/\/+/g, "/");
    const finalQueryString = newParams.toString();

    return finalQueryString ? `${localePath}?${finalQueryString}` : localePath;
  }, [href, locale, searchParams]);

  return (
    <Link
      href={getFormattedHref()}
      target={target}
      className={`${className} block outline-none`}
      onClick={onClick ? onClick : () => {}}
    >
      {children}
    </Link>
  );
}
