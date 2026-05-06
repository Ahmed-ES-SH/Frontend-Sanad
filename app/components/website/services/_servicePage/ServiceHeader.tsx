"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Messages } from "@/app/hooks/useTranslation";

type ServiceComponentsMsgs = Messages["servicesComponents"];

interface ServiceHeaderProps {
  title: {
    en: string;
    ar: string;
  };
  image: string;
  local: "en" | "ar";
  translations: ServiceComponentsMsgs;
}

export default function ServiceHeader({
  title,
  image,
  local,
  translations,
}: ServiceHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-[2rem] overflow-hidden shadow-surface-lg group"
    >
      <div className="h-[400px] md:h-[500px] w-full relative">
        <Image
          src={image}
          alt={title.en}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Decorative Mesh Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-60" />

        {/* Glass Content Card */}
        <div className="absolute inset-0 flex items-end p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, y: 0, backdropFilter: "blur(16px)" }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="surface-card-elevated p-8 md:p-10 max-w-2xl border-white/30"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="surface-badge">{translations.sanadServices}</span>
              <div className="h-px w-12 bg-accent-cyan" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="display-md text-surface-900 font-display leading-tight"
              suppressHydrationWarning
            >
              {title[local]}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-6 flex gap-4"
            >
              <div className="h-1.5 w-12 rounded-full bg-gradient-primary" />
              <div className="h-1.5 w-4 rounded-full bg-accent-cyan/40" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
