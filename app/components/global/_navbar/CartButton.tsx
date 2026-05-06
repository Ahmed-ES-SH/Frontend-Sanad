"use client";

import { GrCart } from "react-icons/gr";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/app/hooks/useLocale";
import { useCartStore } from "@/app/store/CartSlice";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useClickOutside } from "@/app/hooks/useClickOutside";
import ItemsList from "./_cartButton/ItemsList";
import CartButtonHeader from "./_cartButton/CartButtonHeader";
import CartButtonFooter from "./_cartButton/CartButtonFooter";

export default function CartButton() {
  const { clear, totalItems, totalAmount } = useCartStore();
  const [open, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const t = useTranslation("cart_button");
  const isRtl = locale === "ar";

  const handleClear = async () => {
    await clear();
  };

  // Handle outside click to close dropdown
  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none flex items-center justify-center cursor-pointer"
        aria-label="Toggle Cart"
        aria-expanded={open}
      >
        <GrCart className="text-primary size-6" />
        {totalItems > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
            {totalItems}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute top-full mt-3 w-[300px] sm:w-96 surface-card overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] rounded-2xl z-50 border border-gray-100 ${
              isRtl ? "right-[-120px] sm:right-0" : "right-[-60px] sm:right-0"
            }`}
          >
            {/* Header */}
            <CartButtonHeader
              onClose={() => setIsOpen(false)}
              totalItems={totalItems}
              t={t}
            />

            {/* Items List */}
            <ItemsList t={t} />

            {/* Footer */}
            <CartButtonFooter
              isEmpty={totalItems === 0}
              totalAmount={totalAmount}
              handleClear={handleClear}
              setIsOpen={setIsOpen}
              t={t}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
