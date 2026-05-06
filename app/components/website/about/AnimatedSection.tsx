"use client";
import { ReactNode, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function AnimatedSection({ children, className = "" }: Props) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        hidden: { opacity: 0, y: 50 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
