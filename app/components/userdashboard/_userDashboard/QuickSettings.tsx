"use client";

import { useState } from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { FiShield, FiBell, FiGlobe } from "react-icons/fi";
import { comingSoon } from "./lib";
import { useTranslation } from "@/app/hooks/useTranslation";

//////////////////////////////////////////////////////
///////  Quick Settings panel with security, notifications, language
//////////////////////////////////////////////////////

interface SettingItem {
  icon: React.ComponentType<{ size: number }>;
  titleKey: string;
  subtitleKey: string;
  subtitleColorClass: string;
}

const settings: SettingItem[] = [
  {
    icon: FiShield,
    titleKey: "twoFactorSecurity",
    subtitleKey: "enabled",
    subtitleColorClass: "text-accent-emerald",
  },
  {
    icon: FiBell,
    titleKey: "smartAlerts",
    subtitleKey: "threeActiveNotifications",
    subtitleColorClass: "text-surface-400 opacity-60",
  },
  {
    icon: FiGlobe,
    titleKey: "regionLanguage",
    subtitleKey: "arabicKSAs",
    subtitleColorClass: "text-surface-400 opacity-60",
  },
];

const itemVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: easeOut },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2, ease: easeOut },
  },
};

const SettingButton = ({
  icon: Icon,
  title,
  subtitle,
  clickAction,
}: {
  icon: React.ComponentType<{ size: number }>;
  title: string;
  subtitle: string;
  clickAction?: () => void;
}) => (
  <div className="surface-card-subtle p-4 rounded-lg flex items-center justify-between">
    <div className="flex items-center gap-3 text-primary">
      <Icon size={20} />
      <div>
        <p className="text-sm font-bold text-surface-900">{title}</p>
        <p className="text-[10px] font-semibold uppercase tracking-tighter opacity-60">
          {subtitle}
        </p>
      </div>
    </div>
    <button
      className="p-1 text-surface-400 hover:bg-surface-100 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      onClick={clickAction}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="peer"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  </div>
);

export default function QuickSettings() {
  const t = useTranslation("UserDashboard.QuickSettings");

  const [expanded, setExpanded] = useState(false);
  const PrimaryIcon = settings[0].icon;
  const secondaryItems = settings.slice(1);

  return (
    <div className="surface-card p-6">
      <h3 className="text-xl font-bold text-surface-900 mb-6">{t.title}</h3>

      <div className="space-y-4">
        {/* Primary setting — always visible with fade-in */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <SettingButton
            icon={PrimaryIcon}
            title={
              t[settings[0].titleKey as keyof typeof t] || settings[0].titleKey
            }
            subtitle={
              t[settings[0].subtitleKey as keyof typeof t] ||
              settings[0].subtitleKey
            }
            clickAction={() =>
              comingSoon(
                t[settings[0].titleKey as keyof typeof t] ||
                  settings[0].titleKey,
              )
            }
          />
        </motion.div>

        {/* Secondary settings — expandable with animation */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-4 overflow-hidden"
            >
              {secondaryItems.map((setting) => {
                const Icon = setting.icon;
                return (
                  <SettingButton
                    key={setting.titleKey}
                    icon={Icon}
                    title={
                      t[setting.titleKey as keyof typeof t] || setting.titleKey
                    }
                    subtitle={
                      t[setting.subtitleKey as keyof typeof t] ||
                      setting.subtitleKey
                    }
                    clickAction={() =>
                      comingSoon(
                        t[setting.titleKey as keyof typeof t] ||
                          setting.titleKey,
                      )
                    }
                  />
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="w-full text-primary text-sm font-bold py-2 flex items-center justify-center gap-1 hover:bg-primary/5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-expanded={expanded}
          aria-label={expanded ? t.showLess : t.showMore}
        >
          {expanded ? t.showLess : t.showMore}
        </button>
      </div>

      {/* Profile Completion */}
      <div className="mt-8 pt-8 border-t border-surface-300/20">
        <p className="text-xs text-surface-400 font-medium leading-relaxed mb-4">
          {t.profileCompletionText}
        </p>
        <button
          onClick={() => comingSoon(t.completeProfile)}
          className="w-full bg-primary text-white font-bold py-3 rounded-lg text-sm hover:bg-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {t.completeProfile}
        </button>
      </div>
    </div>
  );
}
