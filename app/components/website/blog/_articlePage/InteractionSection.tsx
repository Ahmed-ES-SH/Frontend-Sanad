"use client";

import React, { JSX, useState } from "react";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaShare,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaCopy,
  FaBookmark,
} from "react-icons/fa";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

type ArticleReactions = {
  likes: number;
  shares: number;
  bookmarks: number;
};

function InteractionSection(): JSX.Element {
  const [reactions, setReactions] = useState<ArticleReactions>({
    likes: 42,
    shares: 18,
    bookmarks: 25,
  });

  const [userReactions, setUserReactions] = useState({
    liked: false,
    bookmarked: false,
  });

  const [showShareMenu, setShowShareMenu] = useState(false);

  function handleLike() {
    setUserReactions((prev) => ({ ...prev, liked: !prev.liked }));
    setReactions((prev) => ({
      ...prev,
      likes: prev.likes + (userReactions.liked ? -1 : 1),
    }));
  }

  function handleBookmark() {
    setUserReactions((prev) => ({ ...prev, bookmarked: !prev.bookmarked }));
    setReactions((prev) => ({
      ...prev,
      bookmarks: prev.bookmarks + (userReactions.bookmarked ? -1 : 1),
    }));
  }

  function handleShare(platform?: string) {
    if (platform) {
      console.log(`Sharing to ${platform}`);
      setReactions((prev) => ({ ...prev, shares: prev.shares + 1 }));
      setShowShareMenu(false);
    } else {
      setShowShareMenu(!showShareMenu);
    }
  }

  return (
    <motion.section
      dir="ltr"
      className="bg-gray-50 rounded-lg p-6 mb-12"
      variants={fadeInUp}
      initial="initial"
      animate="animate"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Enjoyed this article?
      </h3>

      <div className="flex flex-wrap items-center gap-4">
        <motion.button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
            userReactions.liked
              ? "bg-red-100 text-red-600"
              : "bg-white text-gray-600 hover:bg-red-50"
          }`}
          whileTap={{ scale: 0.95 }}
        >
          <FaHeart className={userReactions.liked ? "text-red-500" : ""} />
          <span>{reactions.likes}</span>
        </motion.button>

        <div className="relative">
          <motion.button
            onClick={() => handleShare()}
            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-600 rounded-full hover:bg-blue-50 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <FaShare />
            <span>{reactions.shares}</span>
          </motion.button>

          {showShareMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-2 z-10"
            >
              <button
                onClick={() => handleShare("facebook")}
                className="flex items-center gap-2 w-full px-3 py-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                <FaFacebook /> Facebook
              </button>
              <button
                onClick={() => handleShare("twitter")}
                className="flex items-center gap-2 w-full px-3 py-2 text-blue-400 hover:bg-blue-50 rounded"
              >
                <FaTwitter /> Twitter
              </button>
              <button
                onClick={() => handleShare("linkedin")}
                className="flex items-center gap-2 w-full px-3 py-2 text-blue-700 hover:bg-blue-50 rounded"
              >
                <FaLinkedin /> LinkedIn
              </button>
              <button
                onClick={() => handleShare("copy")}
                className="flex items-center gap-2 w-full px-3 py-2 text-gray-600 hover:bg-gray-50 rounded"
              >
                <FaCopy /> Copy Link
              </button>
            </motion.div>
          )}
        </div>

        <motion.button
          onClick={handleBookmark}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
            userReactions.bookmarked
              ? "bg-yellow-100 text-yellow-600"
              : "bg-white text-gray-600 hover:bg-yellow-50"
          }`}
          whileTap={{ scale: 0.95 }}
        >
          <FaBookmark
            className={userReactions.bookmarked ? "text-yellow-500" : ""}
          />
          <span>{reactions.bookmarks}</span>
        </motion.button>
      </div>
    </motion.section>
  );
}

export default InteractionSection;
