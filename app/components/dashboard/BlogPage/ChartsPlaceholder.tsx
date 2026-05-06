"use client";
import { useTranslation } from "@/app/hooks/useTranslation";
import { motion } from "framer-motion";

export function ChartsPlaceholder() {
  const t = useTranslation("BlogPage.ChartsPlaceholder");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Post Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200/50 h-80 flex flex-col"
      >
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-bold text-stone-900">{t.postPerformance}</h4>
          <select className="border border-stone-200 rounded-lg px-3 py-1 text-xs font-semibold appearance-none bg-size-[1em_1em] bg-position-[right_0.4rem_center] bg-no-repeat pr-7 cursor-pointer">
            <option>{t.last30Days}</option>
            <option>{t.last90Days}</option>
          </select>
        </div>
        <div className="grow flex items-end gap-2 px-2 pb-2">
          {/* Simulated Line Chart with DIVs */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="flex-1 bg-orange-500/10 h-[40%] rounded-t-sm relative group origin-bottom"
          >
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-stone-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              120
            </div>
          </motion.div>
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="flex-1 bg-orange-500/20 h-[55%] rounded-t-sm relative group origin-bottom"
          ></motion.div>
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex-1 bg-orange-500/30 h-[45%] rounded-t-sm relative group origin-bottom"
          ></motion.div>
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="flex-1 bg-orange-500/40 h-[70%] rounded-t-sm relative group origin-bottom"
          ></motion.div>
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="flex-1 bg-orange-500/60 h-[85%] rounded-t-sm relative group origin-bottom"
          ></motion.div>
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="flex-1 bg-orange-500 h-[60%] rounded-t-sm relative group origin-bottom shadow-md"
          ></motion.div>
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: 1.6 }}
            className="flex-1 bg-orange-500/50 h-[75%] rounded-t-sm relative group origin-bottom"
          ></motion.div>
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: 1.7 }}
            className="flex-1 bg-orange-500/30 h-[90%] rounded-t-sm relative group origin-bottom"
          ></motion.div>
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            className="flex-1 bg-orange-500/40 h-[65%] rounded-t-sm relative group origin-bottom"
          ></motion.div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-stone-500 font-bold px-2 uppercase tracking-tighter">
          <span>Oct 01</span>
          <span>Oct 10</span>
          <span>Oct 20</span>
          <span>Oct 30</span>
        </div>
      </motion.div>

      {/* Engagement by Category Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9, ease: [0.25, 1, 0.5, 1] }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200/50 h-80 flex flex-col"
      >
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-bold text-stone-900">{t.engagementByCategory}</h4>
          <span className="material-symbols-outlined text-stone-400 cursor-pointer hover:text-stone-600 transition-colors">
            more_vert
          </span>
        </div>
        <div className="flex flex-1 items-center justify-center relative">
          {/* SVG Donut Chart */}
          <motion.svg
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="w-48 h-48 -rotate-90"
            viewBox="0 0 36 36"
          >
            <path
              className="text-stone-100"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
            ></path>
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 0.4 }}
              transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
              className="text-orange-500"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeDasharray="40, 100"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 0.25 }}
              transition={{ duration: 1, delay: 1.6, ease: "easeOut" }}
              className="text-amber-500"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeDasharray="25, 100"
              strokeDashoffset="-40"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 0.2 }}
              transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
              className="text-green-500"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeDasharray="20, 100"
              strokeDashoffset="-65"
              strokeLinecap="round"
              strokeWidth="4"
            />
          </motion.svg>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 2.0 }}
            className="absolute flex flex-col items-center"
          >
            <p className="text-3xl font-bold text-stone-900">8.4k</p>
            <p className="text-xs uppercase font-bold text-stone-500 tracking-widest">
              {t.total}
            </p>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 2.2 }}
          className="flex justify-center gap-4 mt-4"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <span className="text-xs font-bold text-stone-500">{t.tech}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="text-xs font-bold text-stone-500">{t.design}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-xs font-bold text-stone-500">
              {t.business}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
