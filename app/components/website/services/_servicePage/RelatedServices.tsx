/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion } from "framer-motion";
import type { Messages } from "@/app/hooks/useTranslation";
import { Service } from "@/app/types/service";
import ServiceCard from "../ServiceCard";

type ServicePageMsgs = Messages["servicePage"];

interface RelatedServicesProps {
  services: Service[] | null;
  translations: ServicePageMsgs;
}

export default function RelatedServices({
  services,
  translations,
}: RelatedServicesProps) {
  if (services && services.length === 0) return null;

  return (
    <section className="c-container mx-auto px-4 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-primary to-accent-amber" />
          <span className="caption-xs font-semibold text-primary uppercase tracking-wider">
            {translations.relatedServices}
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-primary to-accent-amber" />
        </div>
        <h2 className="display-sm md:display-md text-surface-900 font-display mb-4">
          {translations.exploreMore}
        </h2>
        <p className="body-lg text-surface-500 max-w-2xl mx-auto">
          {translations.relatedDescription}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {services?.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            t={translations as any}
          />
        ))}
      </div>
    </section>
  );
}
