import { StatItem } from "../types/StatItem";
import {
  FaBriefcase,
  FaGlobe,
  FaProjectDiagram,
  FaUsers,
} from "react-icons/fa";

export const stats: StatItem[] = [
  {
    icon: <FaUsers size={40} />,
    label: {
      en: "Satisfied Clients",
      ar: "عملاء راضون",
    },
    targetNumber: 1200,
    colorClass: "text-blue-600",
    suffix: "+",
  },
  {
    icon: <FaBriefcase size={40} />,
    label: {
      en: "Completed Projects",
      ar: "مشاريع مكتملة",
    },
    targetNumber: 240,
    colorClass: "text-red-600",
    suffix: "+",
  },
  {
    icon: <FaProjectDiagram size={40} />,
    label: {
      en: "Success Partners",
      ar: "شركاء النجاح",
    },
    targetNumber: 18,
    colorClass: "text-yellow-500",
    suffix: "",
  },
  {
    icon: <FaGlobe size={40} />,
    label: {
      en: "Countries Worldwide",
      ar: "دولة حول العالم",
    },
    targetNumber: 12,
    colorClass: "text-green-600",
    suffix: "",
  },
];
