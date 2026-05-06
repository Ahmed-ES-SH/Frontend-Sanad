"use client";
import { Locale } from "@/app/types/global";
import React from "react";
import type { Messages } from "@/app/hooks/useTranslation";

type ServicePageMsgs = Messages["servicePage"];

interface ServiceAboutProps {
  description: { en: string; ar: string };
  benefits: { en: string[]; ar: string[] };
  targetAudience: { en: string; ar: string };
  locale: Locale;
  translations: ServicePageMsgs;
}

export default function ServiceAbout({
  description,
  benefits,
  targetAudience,
  locale,
  translations,
}: ServiceAboutProps) {
  const isRTL = locale === "ar";
  const benefitsList = benefits[locale];

  return (
    <section
      className="c-container mx-auto px-4 py-16 md:py-24"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left: Description + Target Audience */}
        <div className="lg:col-span-7">
          {/* Section label */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className="h-0.5 w-10"
              style={{ backgroundColor: "var(--primary)" }}
            />
            <span
              className="caption-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--primary)" }}
            >
              {translations.aboutTitle}
            </span>
          </div>

          {/* Headline */}
          <h2
            className="display-sm md:display-md font-display leading-tight mb-4"
            style={{ color: "var(--surface-900)" }}
          >
            {description[locale]}
          </h2>

          {/* Target audience callout */}
          <div
            className="flex items-start gap-3 p-4 rounded-xl border"
            style={{
              backgroundColor: "var(--surface-50)",
              borderColor: "var(--surface-200)",
            }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: "rgba(249, 115, 22, 0.1)",
              }}
            >
              <svg
                className="w-4 h-4"
                style={{ color: "var(--primary)" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--surface-600)" }}
            >
              <span
                className="font-semibold"
                style={{ color: "var(--surface-800)" }}
              >
                {translations.idealForLabel}{" "}
              </span>
              {targetAudience[locale]}
            </p>
          </div>
        </div>

        {/* Right: Benefits */}
        <div className="lg:col-span-5">
          <div
            className="p-6 md:p-8 h-full rounded-2xl border"
            style={{
              backgroundColor: "var(--surface-50)",
              borderColor: "var(--surface-200)",
            }}
          >
            <h3
              className="heading-lg font-display mb-5"
              style={{ color: "var(--surface-900)" }}
            >
              {translations.benefits}
            </h3>
            <div className="space-y-4">
              {benefitsList.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  {/* Numbered indicator */}
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5 transition-all duration-200"
                    style={{
                      backgroundColor: "var(--primary)",
                      color: "white",
                      fontSize: "0.65rem",
                    }}
                  >
                    {index + 1}
                  </div>
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--surface-700)" }}
                  >
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
