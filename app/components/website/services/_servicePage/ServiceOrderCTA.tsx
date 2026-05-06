"use client";
import React, { useState } from "react";
import type { Messages } from "@/app/hooks/useTranslation";

type ServicePageMsgs = Messages["servicePage"];
import { motion } from "framer-motion";
import { FiLoader, FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { Service } from "@/app/types/service";
import { useCartStore } from "@/app/store/CartSlice";
import { Locale } from "@/app/types/global";
import { toast } from "sonner";

interface ServiceOrderCTAProps {
  service?: Service | null;
  locale: Locale;
  translations: ServicePageMsgs;
}

export default function ServiceOrderCTA({
  service,
  locale,
  translations,
}: ServiceOrderCTAProps) {
  const router = useRouter();
  const { add } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddToCart = async () => {
    if (!service) return;

    setIsSubmitting(true);
    try {
      // add() calls the API for auth users, or persists to localStorage for guests
      await add({
        serviceId: service.id,
        serviceTitle: service.title,
        serviceSlug: service.slug,
        serviceIconUrl: service.iconUrl,
        serviceImageUrl: service.coverImageUrl,
        unitPrice: Number(service.basePrice),
        type: "service",
        quantity: 1,
      });

      // Navigate to cart after successful add
      router.push(`/${locale}/cart`);
    } catch {
      toast.error("Failed to add service to cart. Please try again.");
      setIsSubmitting(false);
    }
  };

  // No service available
  if (!service) {
    return null;
  }

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(service.basePrice));

  return (
    <section id="order-section" className="relative py-16 md:py-24">
      <div className="absolute inset-0 bg-surface-900" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent-amber/10" />

      <div className="relative c-container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-primary to-accent-amber" />
            <span className="caption-xs font-semibold text-primary uppercase tracking-wider">
              {translations.orderService}
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-primary to-accent-amber" />
          </div>
          <h2 className="display-sm md:display-md text-white font-display mb-4">
            {translations.ctaHeading}
          </h2>
          <p className="body-lg text-surface-400 max-w-2xl mx-auto">
            {translations.ctaDescription}
          </p>
        </motion.div>

        {/* Simple Order Button - No Plans */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button
            onClick={handleAddToCart}
            disabled={isSubmitting}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary font-display rounded-xl hover:bg-surface-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <FiLoader className="text-xl animate-spin" />
            ) : (
              <FiShoppingCart className="text-xl" />
            )}
            <span className="text-lg">
              {isSubmitting ? translations.adding : translations.orderNow}
            </span>
            <span className="ml-2 px-3 py-1 bg-primary/10 rounded-lg text-sm">
              {formattedPrice}
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
