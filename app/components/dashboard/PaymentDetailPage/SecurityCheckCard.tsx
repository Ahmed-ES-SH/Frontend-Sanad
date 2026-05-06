"use client";

import { motion } from "framer-motion";
import { FiCheckCircle, FiShield } from "react-icons/fi";

interface SecurityCheckCardProps {
  security: {
    riskScore: number;
    riskLevel: string;
    cvvCheck: boolean;
    postCodeCheck: boolean;
    ipAddress: string;
    origin: string;
  };
}

export default function SecurityCheckCard({ security }: SecurityCheckCardProps) {
  const isLowRisk = security.riskLevel === "LOW";

  return (
    <motion.section
      className="bg-stone-900 rounded-xl shadow-lg overflow-hidden text-white"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.35 }}
    >
      <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <FiShield className="text-orange-500 w-5 h-5" />
          Security Check
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${
            isLowRisk
              ? "bg-emerald-500/20 text-emerald-400"
              : security.riskLevel === "MEDIUM"
                ? "bg-amber-500/20 text-amber-400"
                : "bg-red-500/20 text-red-400"
          }`}
        >
          {security.riskLevel}
        </span>
      </div>

      <div className="p-6 space-y-5">
        {/* Risk Score */}
        <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/50 mb-1">
              Risk Score
            </p>
            <p className="text-2xl font-black">
              {security.riskScore.toFixed(2)}{" "}
              <span
                className={`text-xs font-bold ml-2 ${
                  isLowRisk
                    ? "text-emerald-400"
                    : security.riskLevel === "MEDIUM"
                      ? "text-amber-400"
                      : "text-red-400"
                }`}
              >
                {security.riskLevel}
              </span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-4 border-emerald-500 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
          </div>
        </div>

        {/* Security Checks */}
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center justify-between py-2 border-b border-white/5">
            <span className="text-xs text-white/50">CVV Check</span>
            <span className="text-xs font-semibold flex items-center gap-1">
              {security.cvvCheck ? (
                <>
                  <FiCheckCircle size={14} className="text-emerald-400" />
                  <span className="text-emerald-400">Matched</span>
                </>
              ) : (
                <span className="text-red-400">Failed</span>
              )}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-white/5">
            <span className="text-xs text-white/50">Post Code Check</span>
            <span className="text-xs font-semibold flex items-center gap-1">
              {security.postCodeCheck ? (
                <>
                  <FiCheckCircle size={14} className="text-emerald-400" />
                  <span className="text-emerald-400">Verified</span>
                </>
              ) : (
                <span className="text-red-400">Failed</span>
              )}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-white/5">
            <span className="text-xs text-white/50">IP Address</span>
            <span className="text-xs font-semibold text-white/80">
              {security.ipAddress}
            </span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-xs text-white/50">Origin</span>
            <span className="text-xs font-semibold text-white/80">
              {security.origin}
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
