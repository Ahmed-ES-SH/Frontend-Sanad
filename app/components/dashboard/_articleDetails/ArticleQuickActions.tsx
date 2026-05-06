"use client";

import { Article } from "@/app/types/blog";
import { motion } from "framer-motion";
import {
  FiVolume2,
  FiMessageSquare,
  FiSearch,
  FiCheckSquare,
} from "react-icons/fi";
import { Tooltip } from "../DashboardPage/Tooltip";

const actionTooltips = {
  "Promote Post": "Share this article on social media to increase visibility",
  "Manage Comments": "Review and moderate comments on this article",
  "Update SEO": "Improve search engine ranking for this article",
  "Check Readability": "Analyze content for reading difficulty and clarity",
};

// ComingSoon badge component
function ComingSoonBadge() {
  return (
    <span className="ml-1 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-stone-200 text-stone-500 rounded">
      Soon
    </span>
  );
}

export function ArticleQuickActions({ article }: { article: Article }) {
  const actions = [
    { icon: FiVolume2, label: "Promote Post", disabled: true },
    { icon: FiMessageSquare, label: "Manage Comments", disabled: true },
    { icon: FiSearch, label: "Update SEO", disabled: true },
    { icon: FiCheckSquare, label: "Check Readability", disabled: true },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
      className="flex flex-wrap items-center gap-3 p-2 bg-stone-100/50 rounded-xl overflow-x-auto"
    >
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <Tooltip
            key={index}
            content={
              action.disabled
                ? `${action.label} - Coming soon`
                : actionTooltips[action.label as keyof typeof actionTooltips]
            }
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
              whileHover={action.disabled ? {} : { scale: 1.05 }}
              whileTap={action.disabled ? {} : { scale: 0.95 }}
              className="surface-btn-secondary text-xs font-bold uppercase tracking-widest relative"
              disabled={action.disabled}
            >
              <Icon className="text-primary text-lg" />
              {action.label}
              {action.disabled && <ComingSoonBadge />}
            </motion.button>
          </Tooltip>
        );
      })}
    </motion.section>
  );
}
