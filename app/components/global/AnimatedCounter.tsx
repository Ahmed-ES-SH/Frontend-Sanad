"use client";
import { useEffect, useState } from "react";

export function AnimatedCounter({
  targetNumber,
  start,
  suffix = "",
}: {
  targetNumber: number;
  start: boolean;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let frame: number;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * targetNumber);
      setCount(current);

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [start, targetNumber]);

  return (
    <span className="text-4xl font-bold">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
