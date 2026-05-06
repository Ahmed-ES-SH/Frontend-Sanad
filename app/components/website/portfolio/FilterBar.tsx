"use client";
import { Category } from "@/app/types/global";
import { useRef, useState, useEffect } from "react";

interface Props {
  categories: Category[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  locale: "en" | "ar";
}

export default function FilterBar({
  categories,
  selectedId,
  onSelect,
  locale,
}: Props) {
  const isRTL = locale === "ar";
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Only handle vertical scroll events (deltaY)
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += isRTL ? -e.deltaY : e.deltaY;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [isRTL]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      className="sticky z-30 border-b"
      style={{
        top: 0,
        backgroundColor: "rgba(250, 250, 249, 0.95)",
        borderColor: "var(--surface-200)",
        backdropFilter: "none",
      }}
    >
      <div className="c-container px-4">
        <div
          ref={scrollContainerRef}
          className={`flex gap-2 py-3 overflow-x-auto scrollbar-hide ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          dir={isRTL ? "rtl" : "ltr"}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {categories.map((cat) => {
            const label = cat.name;
            const isActive = selectedId === cat.id;

            return (
              <button
                key={cat.id || "all"}
                onClick={() => onSelect(cat.id)}
                className="shrink-0 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  minHeight: "44px",
                  backgroundColor: isActive ? "var(--primary)" : "transparent",
                  color: isActive ? "white" : "var(--surface-600)",
                  border: `1px solid ${isActive ? "var(--primary)" : "var(--surface-200)"}`,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor =
                      "var(--surface-100)";
                    e.currentTarget.style.borderColor = "var(--surface-300)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "var(--surface-200)";
                  }
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
