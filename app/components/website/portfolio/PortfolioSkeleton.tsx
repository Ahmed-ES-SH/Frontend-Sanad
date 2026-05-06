"use client";

import { useLocale } from "@/app/hooks/useLocale";
import { directionMap } from "@/app/constants/global";

export default function PortfolioSkeleton() {
  const locale = useLocale();

  return (
    <div
      dir={directionMap[locale]}
      className="min-h-dvh mt-6"
      style={{ backgroundColor: "var(--surface-50)" }}
    >
      {/* Hero Skeleton */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(249, 115, 22, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 20%, rgba(245, 158, 11, 0.06) 0%, transparent 50%),
              radial-gradient(ellipse at 40% 80%, rgba(251, 146, 60, 0.04) 0%, transparent 50%)
            `,
          }}
        />

        <div className="c-container relative z-10 px-4 py-16 sm:py-20 md:py-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            {/* Left: Heading Skeleton */}
            <div className="w-full md:w-1/2">
              <div
                className="h-14 w-3/4 rounded-lg animate-pulse"
                style={{ backgroundColor: "var(--surface-200)" }}
              />
              <div
                className="h-6 w-1/2 mt-3 rounded animate-pulse"
                style={{ backgroundColor: "var(--surface-100)" }}
              />
            </div>

            {/* Right: Descriptor + Badge Skeleton */}
            <div className="md:text-end w-full md:w-1/3">
              <div
                className="h-6 w-full max-w-md mb-4 rounded animate-pulse"
                style={{ backgroundColor: "var(--surface-100)" }}
              />
              <div
                className="h-10 w-40 rounded-full ml-auto animate-pulse"
                style={{ backgroundColor: "var(--surface-100)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar Skeleton */}
      <div className="c-container px-4 py-6">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-10 w-24 rounded-full flex-shrink-0 animate-pulse"
              style={{ backgroundColor: "var(--surface-200)" }}
            />
          ))}
        </div>
      </div>

      {/* Grid Skeleton */}
      <section className="c-container px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`rounded-2xl overflow-hidden animate-pulse ${
                i === 0 ? "sm:col-span-2 lg:row-span-2" : ""
              }`}
              style={{ backgroundColor: "var(--surface-100)" }}
            >
              <div
                className={
                  i === 0
                    ? "aspect-4/3 md:aspect-4/5"
                    : "aspect-16/10"
                }
                style={{ backgroundColor: "var(--surface-200)" }}
              />
              <div className="p-4 sm:p-5">
                <div
                  className="h-6 w-3/4 rounded mb-2"
                  style={{ backgroundColor: "var(--surface-200)" }}
                />
                <div
                  className="h-4 w-full rounded mb-1"
                  style={{ backgroundColor: "var(--surface-100)" }}
                />
                <div
                  className="h-4 w-2/3 rounded mb-3"
                  style={{ backgroundColor: "var(--surface-100)" }}
                />
                <div className="flex gap-2">
                  <div
                    className="h-6 w-16 rounded-md"
                    style={{ backgroundColor: "var(--surface-200)" }}
                  />
                  <div
                    className="h-6 w-16 rounded-md"
                    style={{ backgroundColor: "var(--surface-200)" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Bar Skeleton */}
      <div className="h-32" style={{ backgroundColor: "var(--surface-100)" }} />

      {/* CTA Skeleton */}
      <div className="h-48" style={{ backgroundColor: "var(--surface-50)" }} />
    </div>
  );
}