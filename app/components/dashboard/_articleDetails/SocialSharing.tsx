"use client";

import { Article } from "@/app/types/blog";
import { motion } from "framer-motion";
import { FiShare2, FiChevronRight } from "react-icons/fi";

export function SocialSharing({ article }: { article: Article }) {
  // TODO: Fetch actual platform connection status from API when social integration is implemented
  // Current data is placeholder - hardcoded for UI demonstration
  const platforms = [
    { name: "Twitter / X", color: "bg-blue-600", connected: true },
    { name: "LinkedIn", color: "bg-blue-800", connected: true },
    { name: "Pinterest", color: "bg-red-600", connected: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.25, 1, 0.5, 1] }}
      className="surface-card p-6 space-y-4"
    >
      <h4 className="text-xs font-bold uppercase tracking-widest text-stone-900 pb-2 border-b border-stone-50">
        Social Sharing
      </h4>
      <div className="space-y-3">
        {platforms.map((platform, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
            whileHover={{ x: 4 }}
            className={`flex items-center justify-between p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer ${
              !platform.connected ? "opacity-50" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded flex items-center justify-center text-white ${platform.color}`}
              >
                <FiShare2 className="text-lg" />
              </div>
              <span className="text-sm font-semibold text-stone-800">
                {platform.name}
              </span>
            </div>
            {platform.connected ? (
              <FiChevronRight className="text-stone-400" />
            ) : (
              <span className="text-[10px] font-bold text-stone-400">
                DISCONNECTED
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
