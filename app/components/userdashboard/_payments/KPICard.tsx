import React from "react";
import { FiTrendingUp } from "react-icons/fi";

interface KPICardProps {
  icon: React.ReactNode;
  iconLabel: string;
  iconBg: string;
  iconColor: string;
  badgeText: string;
  badgeVariant: "success" | "warning" | "neutral";
  label: string;
  value: string;
  currency?: string;
  footer?: React.ReactNode;
}

export default function KPICard({
  icon,
  iconLabel,
  iconBg,
  iconColor,
  badgeText,
  badgeVariant,
  label,
  value,
  currency,
  footer,
}: KPICardProps) {
  const badgeClasses = {
    success: "text-green-600 bg-green-50",
    warning: "text-amber-600 bg-amber-50",
    neutral: "text-green-600 bg-green-50",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200/50 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div
          className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center ${iconColor}`}
          aria-label={iconLabel}
          role="img"
        >
          {icon}
        </div>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 ${badgeClasses[badgeVariant]}`}
        >
          {badgeVariant === "success" && (
            <FiTrendingUp className="text-[12px]" />
          )}
          {badgeText}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </p>
        <p className="text-3xl font-black text-foreground mt-1">
          {value}
          {currency && (
            <span className="text-lg font-semibold text-muted-foreground">
              {" "}
              {currency}
            </span>
          )}
        </p>
      </div>
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
}
