"use client";

import React from "react";
import Image from "next/image";

interface ProjectImageProps {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
  priority?: boolean;
}

export function ProjectImage({ src, alt, className = "", aspect = "aspect-video", priority = false }: ProjectImageProps) {
  return (
    <div className={`relative overflow-hidden ${aspect} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        className="object-cover transition-transform duration-700 hover:scale-[1.02]"
      />
    </div>
  );
}
