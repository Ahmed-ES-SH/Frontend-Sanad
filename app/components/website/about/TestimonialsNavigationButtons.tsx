import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface TestimonialsNavigationButtonsProps {
  setPrevEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  setNextEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
}

export default function TestimonialsNavigationButtons({
  setPrevEl,
  setNextEl,
}: TestimonialsNavigationButtonsProps) {
  return (
    <div className="flex justify-center items-center gap-6 mt-12 relative z-20">
      <motion.button
        ref={setPrevEl}
        whileHover={{
          scale: 1.1,
          backgroundColor: "var(--primary)",
          color: "#fff",
          borderColor: "var(--primary)",
        }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-surface-200 text-surface-600 bg-white shadow-surface-md transition-all duration-300 cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous slide"
      >
        <FaChevronLeft
          className={`text-xl transition-transform duration-300 rtl:rotate-180 rtl:group-hover:translate-x-1 ltr:group-hover:-translate-x-1`}
        />
      </motion.button>

      <motion.button
        ref={setNextEl}
        whileHover={{
          scale: 1.1,
          backgroundColor: "var(--primary)",
          color: "#fff",
          borderColor: "var(--primary)",
        }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-surface-200 text-surface-600 bg-white shadow-surface-md transition-all duration-300 cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-xl transition-transform duration-300 rtl:rotate-180 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
      </motion.button>
    </div>
  );
}
