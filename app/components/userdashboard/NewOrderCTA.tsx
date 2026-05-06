"use client";

import { motion } from "framer-motion";
import { FiPlusCircle } from "react-icons/fi";
import type { NewOrderCTAProps } from "./NewOrderCTA.types";
import LocaleLink from "../global/LocaleLink";

const NewOrderCTA: React.FC<NewOrderCTAProps> = ({
  title,
  description,
  href,
}) => {
  return (
    <LocaleLink
      href={href}
      className="rounded-2xl border-2 border-dashed border-surface-300 flex flex-col items-center justify-center p-8 bg-surface-100/30 hover:bg-surface-100 hover:border-primary/30 transition-all cursor-pointer group min-h-[260px]"
    >
      <motion.div whileHover={{ y: -5 }} className="flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-surface-100 flex items-center justify-center mb-4 group-hover:bg-primary transition-all duration-300">
          <FiPlusCircle className="text-primary text-2xl group-hover:text-white" />
        </div>
        <p className="font-bold text-surface-900 font-display text-center">
          {title}
        </p>
        <p className="text-xs text-surface-500 text-center mt-2 px-4 font-body">
          {description}
        </p>
      </motion.div>
    </LocaleLink>
  );
};

export default NewOrderCTA;
