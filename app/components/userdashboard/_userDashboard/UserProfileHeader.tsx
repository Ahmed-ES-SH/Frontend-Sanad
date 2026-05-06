"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import { comingSoon } from "./lib";
import EditProfileModal from "./EditProfileModal";
import { useAuthStore } from "@/app/store/AuthSlice";
import { useTranslation } from "@/app/hooks/useTranslation";

export default function UserProfileHeader() {
  const { user } = useAuthStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const t = useTranslation("UserDashboard.ProfileHeader");

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`
          bg-surface-50 border border-primary/20 rounded-xl p-6 md:p-8 relative overflow-hidden
        `}
      >
        {/* Decorative solid gradient — no blur effects per design principle #2 */}
        <div
          className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative flex flex-col md:flex-row items-center gap-8">
          {/* Avatar */}
          <div className="relative">
            <Image
              src={
                user?.avatar ??
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBu9siLVVryYlOMm6BpQrK6qbKNKC49N4e_JTh1DaUU6CzGi-yy_6i7Xu9rgYYu_x9UtXuNYey9Ggc11NVj5lbNmOQ6Pfg2AR42dKQ42TSCedO2mOBqCfvg5eMjSh1r6FvNHwQW4MGlKqC8R5rj6Uu1V8UXnKkwPfdrKuJ6fzCiHAOLCwZLDiNNy6M3GRqaNJp8LXPxsmBnV09kedfbLX3HpreUIODNRQbO7yiqqD_RJjc5UYb5MTt4Vs7MwNe_Rx0aR6vAblRwdIFu"
              }
              alt={user?.name ?? t.avatarAlt}
              width={128}
              height={128}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
            />
            <FaCheckCircle className="absolute bottom-1 right-1 bg-primary text-white p-1.5 rounded-full border-4 border-surface-50" />
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
              <h2 className="text-3xl font-extrabold tracking-tight text-surface-900">
                {user?.name ?? t.name}
              </h2>
              <span className="bg-primary-100 text-primary-dark px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider self-center">
                {user?.role ?? t.role}
              </span>
            </div>
            <p className="text-surface-400 max-w-2xl mb-6">{t.description}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2 text-sm text-surface-400 bg-surface-100 px-3 py-1.5 rounded-lg">
                <FiMapPin className="text-primary" size={16} />
                <span>{t.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-surface-400 bg-surface-100 px-3 py-1.5 rounded-lg">
                <FiCalendar className="text-primary" size={16} />
                <span>{t.joined}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="surface-btn-primary w-60 hover:shadow-surface-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {t.editProfile}
            </button>
            <button
              onClick={() => comingSoon(t.sharePortfolio)}
              className="surface-btn-secondary w-60 hover:shadow-surface-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {t.sharePortfolio}
            </button>
          </div>
        </div>
      </motion.section>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
}
