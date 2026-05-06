"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiCopy, FiX } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { useTranslation } from "@/app/hooks/useTranslation";

interface ShareButtonProps {
  projectId: string;
  projectTitle: string;
  local: "en" | "ar";
}

export default function ShareButton({
  projectId,
  projectTitle,
  local,
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const t = useTranslation("portfolioPage");

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/${local}/portfolio/${encodeURIComponent(projectTitle)}?projectId=${projectId}`
      : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors shadow-md"
        aria-label={t.shareProject}
      >
        <FiExternalLink className="w-5 h-5 text-gray-800" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="absolute top-14 left-1/2 -translate-x-1/2  bg-white shadow-lg rounded-xl p-4 w-80 z-[99999999]"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-800">
                {t.shareThisProject}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                aria-label={t.closeShareMenu}
              >
                <FiX className="text-gray-500 hover:text-red-500" />
              </button>
            </div>

            {/* Link + Copy */}
            <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden p-2">
              <input
                readOnly
                value={shareUrl}
                className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
              />
              <button
                onClick={handleCopy}
                className="text-sm text-blue-600 hover:text-blue-800 px-2"
              >
                {copied ? t.copied : <FiCopy />}
              </button>
            </div>

            {/* Social Buttons */}
            <div className="flex justify-around mt-4 text-xl text-white">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareUrl,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 p-2 rounded-full hover:scale-110 transition-transform"
                aria-label="Share on Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  shareUrl,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-400 p-2 rounded-full hover:scale-110 transition-transform"
                aria-label="Share on Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 p-2 rounded-full hover:scale-110 transition-transform"
                aria-label="Share on WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  shareUrl,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-700 p-2 rounded-full hover:scale-110 transition-transform"
                aria-label="Share on LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
