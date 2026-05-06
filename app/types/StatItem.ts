import { JSX } from "react";

export type StatItem = {
  icon: JSX.Element;
  label: { en: string; ar: string };
  targetNumber: number;
  colorClass: string;
  suffix?: string;
};
