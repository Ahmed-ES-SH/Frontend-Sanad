"use client";

import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiShield, FiUser } from "react-icons/fi";
import Tooltip from "./Tooltip";

interface CustomerInfoCardProps {
  customer: {
    name: string;
    email: string;
    location: string;
    avatarUrl: string;
    isKycVerified: boolean;
    clientType: string;
  };
}

export default function CustomerInfoCard({ customer }: CustomerInfoCardProps) {
  return (
    <motion.section
      className="bg-white rounded-xl border border-stone-200 overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.25 }}
    >
      <div className="px-6 py-4 border-b border-stone-200">
        <h3 className="text-lg font-bold flex items-center gap-2 text-stone-900">
          <FiUser className="text-orange-500 w-5 h-5" />
          Customer Information
        </h3>
      </div>

      <div className="p-6">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-4">
            <img
              alt={`${customer.name} profile`}
              src={customer.avatarUrl}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-stone-100"
            />
            {customer.isKycVerified && (
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-5 h-5 rounded-full border-3 border-white flex items-center justify-center">
                <FiShield size={10} className="text-white" />
              </div>
            )}
          </div>
          <h4 className="text-lg font-bold text-stone-900">{customer.name}</h4>
          <p className="text-sm text-orange-600 font-medium">{customer.clientType}</p>
        </div>

        <div className="space-y-3 pt-4 border-t border-stone-200">
          <div className="flex items-center gap-3">
            <FiMail className="text-stone-400 text-sm shrink-0" />
            <span className="text-sm font-medium text-stone-700 truncate">
              {customer.email}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <FiMapPin className="text-stone-400 text-sm shrink-0" />
            <span className="text-sm font-medium text-stone-700">
              {customer.location}
            </span>
          </div>
          {customer.isKycVerified && (
            <div className="flex items-center gap-3">
              <FiShield className="text-emerald-500 text-sm shrink-0" />
              <span className="text-sm font-medium text-emerald-600 flex items-center gap-1">
                KYC Verified
                <Tooltip text="Identity verified through Know Your Customer process" />
              </span>
            </div>
          )}
        </div>

        <button className="w-full mt-5 py-2.5 bg-stone-100 hover:bg-stone-200 transition-colors text-sm font-semibold rounded-lg text-stone-800">
          View Customer Profile
        </button>
      </div>
    </motion.section>
  );
}
