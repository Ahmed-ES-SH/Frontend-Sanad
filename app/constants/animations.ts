import { easeInOut, spring } from "framer-motion";

/* ─────────────────────────────────────────────
   Animation Variants
───────────────────────────────────────────── */
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

/* ─────────────────────────────────────────────
   Services Not Found Variants
───────────────────────────────────────────── */

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: spring,
      stiffness: 100,
      damping: 10,
    },
  },
};

export const iconVariants = {
  hidden: {
    scale: 0,
    rotate: -180,
  },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: spring,
      stiffness: 200,
      damping: 15,
    },
  },
  hover: {
    scale: 1.1,
    rotate: 360,
    transition: {
      duration: 0.6,
    },
  },
};

export const floatingAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: easeInOut,
  },
};
