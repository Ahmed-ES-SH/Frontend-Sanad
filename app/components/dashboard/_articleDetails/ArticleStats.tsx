"use client";

import { Article } from "@/app/types/blog";
import { motion } from "framer-motion";
import { FiTrendingUp } from "react-icons/fi";
import { Tooltip } from "../DashboardPage/Tooltip";

interface ArticleStatsProps {
  article: Article;
}

const statTooltips = {
  "Page Views": "Total number of times visitors viewed this article",
  "Avg. Read Time": "Average time visitors spend reading this article",
  "Total Shares": "Number of times this article was shared on social media",
  Comments: "Total comments on this article",
};

export function ArticleStats({ article }: ArticleStatsProps) {
  // Calculate read time display
  const formatReadTime = (minutes: number) => {
    if (!minutes || minutes < 1) return "< 1m";
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  // Format views count with thousand separators
  const formatViews = (count: number) => {
    if (!count) return "0";
    return new Intl.NumberFormat("en-US", {
      notation: count > 1000 ? "compact" : "standard",
      maximumFractionDigits: 1,
    }).format(count);
  };

  // Calculate trend based on views (simulated - in real app would compare to previous period)
  const getViewsTrend = () => {
    const views = article.viewsCount || 0;
    if (views > 1000) return { change: "+12%", trend: "up" as const };
    if (views > 500) return { change: "+5%", trend: "up" as const };
    if (views > 100) return { change: "+2%", trend: "up" as const };
    return { change: "New", trend: "new" as const };
  };

  const viewsTrend = getViewsTrend();

  const stats = [
    {
      label: "Page Views",
      value: formatViews(article.viewsCount),
      change: viewsTrend.change,
      trend: viewsTrend.trend,
      color: article.viewsCount > 500 ? "emerald" : "stone",
    },
    {
      label: "Avg. Read Time",
      value: formatReadTime(article.readTimeMinutes),
      change: article.readTimeMinutes ? "Good" : "N/A",
      trend: article.readTimeMinutes > 3 ? "stable" : ("stable" as const),
      color: "stone",
    },
    {
      label: "Total Shares",
      value: "0",
      change: "N/A",
      trend: "stable" as const,
      color: "stone",
    },
    {
      label: "Comments",
      value: "0",
      change: "N/A",
      trend: "stable" as const,
      color: "stone",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {stats.map((stat, index) => (
        <Tooltip
          key={index}
          content={statTooltips[stat.label as keyof typeof statTooltips] || ""}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1 + index * 0.1,
              ease: [0.25, 1, 0.5, 1],
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="surface-card p-6 flex flex-col gap-1 border-b-4 border-primary/10 cursor-help"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
              {stat.label}
            </span>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black font-display text-stone-900">
                {stat.value}
              </span>
              <span
                className={`text-xs font-bold flex items-center ${
                  stat.color === "emerald"
                    ? "text-emerald-600"
                    : stat.color === "orange"
                      ? "text-primary"
                      : "text-stone-400"
                }`}
              >
                {stat.trend === "up" && (
                  <FiTrendingUp className="text-sm mr-1" />
                )}
                {stat.change}
              </span>
            </div>
          </motion.div>
        </Tooltip>
      ))}
    </motion.section>
  );
}
