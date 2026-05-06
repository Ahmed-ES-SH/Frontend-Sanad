"use client";

import { motion } from "framer-motion";
import {
  FiPlusCircle,
  FiFileText,
  FiCreditCard,
  FiHeadphones,
} from "react-icons/fi";
import { comingSoon } from "./lib";
import { useTranslation } from "@/app/hooks/useTranslation";

//////////////////////////////////////////////////////
///////  Bento-style quick action cards
//////////////////////////////////////////////////////

interface QuickAction {
  titleKey: string;
  descriptionKey: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  span?: string;
  variant: "primary" | "secondary";
  iconClassName?: string;
  smallVariant?: boolean;
  smallIconBg?: string;
  smallIconColor?: string;
}

const actions: QuickAction[] = [
  {
    titleKey: "requestNewService",
    descriptionKey: "requestNewServiceDesc",
    icon: FiPlusCircle,
    variant: "primary",
  },
  {
    titleKey: "viewActiveContracts",
    descriptionKey: "viewActiveContractsDesc",
    icon: FiFileText,
    variant: "secondary",
    iconClassName: "text-primary",
  },
  {
    titleKey: "updateBilling",
    descriptionKey: "updateBillingDesc",
    icon: FiCreditCard,
    variant: "secondary",
    smallVariant: true,
    smallIconBg: "bg-white text-primary shadow-sm",
  },
  {
    titleKey: "contactManager",
    descriptionKey: "contactManagerDesc",
    icon: FiHeadphones,
    variant: "secondary",
    smallVariant: true,
    smallIconBg: "bg-white text-primary shadow-sm",
  },
];

const sharedButtonStyles =
  "rounded-xl p-8 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

export default function QuickActions() {
  const t = useTranslation("UserDashboard.QuickActions");

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {/* Large CTA Card */}
      <motion.button
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0 }}
        onClick={() => comingSoon(t[actions[0].titleKey as keyof typeof t])}
        aria-label={t[actions[0].titleKey as keyof typeof t]}
        className={`md:col-span-1 group relative bg-primary text-white overflow-hidden flex flex-col justify-between ${sharedButtonStyles} hover:bg-primary-dark`}
      >
        <div className="absolute -right-4 -top-4 opacity-10 group-hover:rotate-12 transition-transform">
          <FiPlusCircle className="text-9xl" />
        </div>
        <div className="relative z-10">
          <FiPlusCircle className="text-4xl mb-4" />
          <h3 className="text-xl font-bold mb-2">
            {t[actions[0].titleKey as keyof typeof t] || actions[0].titleKey}
          </h3>
          <p className="text-sm opacity-90 leading-relaxed">
            {t[actions[0].descriptionKey as keyof typeof t] ||
              actions[0].descriptionKey}
          </p>
        </div>
      </motion.button>

      {/* View Contracts Card */}
      <motion.button
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        onClick={() => comingSoon(t[actions[1].titleKey as keyof typeof t])}
        aria-label={t[actions[1].titleKey as keyof typeof t]}
        className={`md:col-span-1 surface-card flex flex-col justify-between ${sharedButtonStyles} hover:bg-surface-50`}
      >
        <div>
          <FiFileText className="text-4xl text-primary mb-4" />
          <h3 className="text-xl font-bold text-surface-900 mb-2">
            {t[actions[1].titleKey as keyof typeof t] || actions[1].titleKey}
          </h3>
          <p className="text-surface-400 text-sm leading-relaxed">
            {t[actions[1].descriptionKey as keyof typeof t] ||
              actions[1].descriptionKey}
          </p>
        </div>
      </motion.button>

      {/* Small actions grid */}
      <div className="md:col-span-1 grid grid-rows-2 gap-6">
        <motion.button
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          onClick={() => comingSoon(t[actions[2].titleKey as keyof typeof t])}
          aria-label={t[actions[2].titleKey as keyof typeof t]}
          className={`surface-card-subtle rounded-xl flex items-center gap-4 cursor-pointer hover:bg-surface-100 transition-colors p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}
        >
          <div className={`p-3 rounded-lg shrink-0 ${actions[2].smallIconBg}`}>
            <FiCreditCard size={20} />
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-surface-900 truncate">
              {t[actions[2].titleKey as keyof typeof t] || actions[2].titleKey}
            </h4>
            <p className="text-xs text-surface-400 truncate">
              {t[actions[2].descriptionKey as keyof typeof t] ||
                actions[2].descriptionKey}
            </p>
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          onClick={() => comingSoon(t[actions[3].titleKey as keyof typeof t])}
          aria-label={t[actions[3].titleKey as keyof typeof t]}
          className={`surface-card-subtle rounded-xl flex items-center gap-4 cursor-pointer hover:bg-surface-100 transition-colors p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}
        >
          <div className={`p-3 rounded-lg shrink-0 ${actions[3].smallIconBg}`}>
            <FiHeadphones size={20} />
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-surface-900 truncate">
              {t[actions[3].titleKey as keyof typeof t] || actions[3].titleKey}
            </h4>
            <p className="text-xs text-surface-400 truncate">
              {t[actions[3].descriptionKey as keyof typeof t] ||
                actions[3].descriptionKey}
            </p>
          </div>
        </motion.button>
      </div>
    </motion.section>
  );
}
