"use client";
import { motion } from "framer-motion";
import {
  FiMonitor,
  FiPenTool,
  FiSpeaker,
  FiSmartphone,
  FiBarChart,
  FiCpu,
  FiCloud,
  FiDatabase,
  FiWifi,
  FiShield,
  FiLink,
} from "react-icons/fi";

interface ProjectThumbnailProps {
  title: string;
  category: string;
  local: "en" | "ar";
}

const categoryConfig: Record<
  string,
  {
    gradient: string;
    icon: React.ElementType;
  }
> = {
  "web development": {
    gradient: "linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #4338ca 100%)",
    icon: FiMonitor,
  },
  "graphic design": {
    gradient: "linear-gradient(135deg, #f43f5e 0%, #e11d48 50%, #be123c 100%)",
    icon: FiPenTool,
  },
  "digital marketing": {
    gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%)",
    icon: FiSpeaker,
  },
  "mobile development": {
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)",
    icon: FiSmartphone,
  },
  "marketing strategy": {
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
    icon: FiBarChart,
  },
  "ai & machine learning": {
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
    icon: FiCpu,
  },
  "cloud computing": {
    gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)",
    icon: FiCloud,
  },
  "data science": {
    gradient: "linear-gradient(135deg, #a855f7 0%, #9333ea 50%, #7e22ce 100%)",
    icon: FiDatabase,
  },
  "iot development": {
    gradient: "linear-gradient(135deg, #14b8a6 0%, #0d9488 50%, #0f766e 100%)",
    icon: FiWifi,
  },
  cybersecurity: {
    gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)",
    icon: FiShield,
  },
  blockchain: {
    gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)",
    icon: FiLink,
  },
};

const defaultConfig = {
  gradient: "linear-gradient(135deg, #64748b 0%, #475569 50%, #334155 100%)",
  icon: FiMonitor,
};

const DotPattern = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern
        id="dots"
        x="0"
        y="0"
        width="24"
        height="24"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="2" cy="2" r="1.5" fill="white" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)" />
  </svg>
);

export default function ProjectThumbnail({
  title,
  category,
  local,
}: ProjectThumbnailProps) {
  const config = categoryConfig[category.toLowerCase()] || defaultConfig;
  const Icon = config.icon;

  return (
    <motion.div
      className="relative aspect-video w-full overflow-hidden rounded-t-xl"
      style={{ background: config.gradient }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <DotPattern />

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div className="mb-3 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
          <Icon className="w-10 h-10" strokeWidth={1.5} />
        </div>
        <h3
          className="text-lg font-bold text-center px-4 line-clamp-2 drop-shadow-lg"
          dir={local === "ar" ? "rtl" : "ltr"}
        >
          {title}
        </h3>
        <span className="mt-2 px-3 py-0.5 rounded-full text-xs font-medium bg-white/15 backdrop-blur-sm border border-white/20 uppercase tracking-wider">
          {category}
        </span>
      </div>
    </motion.div>
  );
}
