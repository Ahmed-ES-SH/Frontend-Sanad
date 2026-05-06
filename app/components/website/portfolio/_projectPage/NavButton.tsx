"use client";
import { useState } from "react";

export default function NavButton({
  onClick,
  side,
  icon,
  "aria-label": ariaLabel,
}: {
  onClick: () => void;
  side: "start" | "end";
  icon: React.ReactNode;
  isRTL: boolean;
  "aria-label": string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        absolute ${side === "start" ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 z-10
        w-11 h-11 flex items-center justify-center rounded-full
        opacity-0 group-hover:opacity-100
        transition-all duration-200
        hover:scale-110 active:scale-95
      `}
      style={{
        background: hovered ? "var(--primary)" : "var(--surface-card-bg)",
        border: hovered
          ? "1px solid var(--primary)"
          : "1px solid var(--surface-card-border)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.14)",
        color: hovered ? "white" : "var(--surface-700)",
        transition: "all 0.18s ease",
      }}
    >
      {icon}
    </button>
  );
}
