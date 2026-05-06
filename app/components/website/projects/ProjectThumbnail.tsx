"use client";
import { motion } from "framer-motion";
import { FiMonitor } from "react-icons/fi";

interface ProjectThumbnailProps {
  title: string;
  category: string | undefined;
  local: "en" | "ar";
}

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
  const Icon = defaultConfig.icon;

  return (
    <motion.div
      className="relative aspect-video w-full overflow-hidden rounded-t-xl"
      style={{ background: defaultConfig.gradient }}
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
