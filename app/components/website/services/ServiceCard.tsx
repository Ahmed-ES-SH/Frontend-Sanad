"use client";
import { motion } from "framer-motion";
import { memo } from "react";
import { Service } from "@/app/types/service";
import { FiArrowUpRight } from "react-icons/fi";
import { formatTitle } from "@/app/helpers/formatTitle";
import { Messages } from "@/app/hooks/useTranslation";
import LocaleLink from "../../global/LocaleLink";
import Img from "../../global/Img";

interface ServiceCardProps {
  service: Service;
  t: Messages["services"] | Messages["servicePage"];
}

export const getServiceUrl = (service: Service) => {
  if (service.slug) {
    return `/services/${service.slug}`;
  }
  return `/services/${formatTitle(service.title)}?serviceId=${service.id}`;
};

// Memoized to prevent re-renders when parent state changes (pagination/filtering)
const ServiceCard = memo(function ServiceCard({
  service,
  t,
}: ServiceCardProps) {
  return (
    <motion.div
      key={service.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: "circOut" }}
    >
      <LocaleLink
        href={getServiceUrl(service)}
        className="group relative flex flex-col rounded-3xl bg-white border border-surface-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 overflow-hidden h-full"
      >
        {/* Cover Image Area */}
        <div className="relative w-full aspect-4/3 sm:aspect-3/2 overflow-hidden bg-surface-100">
          <Img
            src={service.coverImageUrl}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt={service.title}
          />

          {/* Floating Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1.5 truncate bg-surface-50 text-surface-900 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-surface-200 shadow-sm">
              {service.category?.name || 'not Found'}
            </span>
          </div>

          {/* Animated Arrow Icon */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md border border-surface-100 flex items-center justify-center translate-x-4 -translate-y-4 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
            <FiArrowUpRight className="text-primary size-5" />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-col flex-1 p-6 lg:p-8">
          <h3 className="text-xl font-bold text-surface-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {service.title}
          </h3>

          <p className="body-sm text-surface-500 leading-relaxed mb-6 line-clamp-3">
            {service.shortDescription}
          </p>

          <div className="mt-auto pt-4 border-t border-surface-100 flex items-center justify-between text-primary font-bold text-xs uppercase tracking-widest">
            <span>{t.findSolution}</span>
            <FiArrowUpRight className="size-4 rtl:-rotate-90" />
          </div>
        </div>
      </LocaleLink>
    </motion.div>
  );
});

export default ServiceCard;
