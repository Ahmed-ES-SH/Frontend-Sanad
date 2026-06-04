"use client";

import { Article } from "@/app/types/blog";
import { Tooltip } from "../DashboardPage/Tooltip";
import { useLocale } from "@/app/hooks/useLocale";
import { useTranslation } from "@/app/hooks/useTranslation";

interface ArticleStatsProps {
  article: Article;
}

function formatReadTime(minutes: number) {
  if (!minutes || minutes < 1) return "< 1m";
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

function formatViews(count: number, locale: string) {
  if (!count) return "0";
  return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US", {
    notation: count > 1000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(count);
}

export function ArticleStats({ article }: ArticleStatsProps) {
  const locale = useLocale();
  const t = useTranslation("ArticleDetails");
  const stats = [
    {
      label: t.stats.views,
      value: formatViews(article.viewsCount, locale),
      tooltip: t.stats.viewsTooltip,
    },
    {
      label: t.stats.readTime,
      value: formatReadTime(article.readTimeMinutes),
      tooltip: t.stats.readTimeTooltip,
    },
  ];

  return (
    <dl className="flex gap-3">
      {stats.map((stat) => (
        <Tooltip key={stat.label} content={stat.tooltip}>
          <div className="bg-white border border-stone-200 rounded-xl px-5 py-3 cursor-help hover:border-stone-300 transition-colors">
            <dt className="text-xs text-stone-400 font-medium uppercase tracking-wider">{stat.label}</dt>
            <dd className="mt-1 text-xl font-semibold text-stone-800 tabular-nums">
              {stat.value}
            </dd>
          </div>
        </Tooltip>
      ))}
    </dl>
  );
}
