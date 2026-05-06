"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaUser, FaCalendar, FaClock } from "react-icons/fa";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface ArticleHeaderProps {
  article: Article;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article }) => (
  <motion.header
    className="mb-8"
    variants={fadeInUp}
    initial="initial"
    animate="animate"
  >
    <div className="mb-4">
      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
        {article.category}
      </span>
    </div>

    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
      {article.title}
    </h1>

    <p className="text-xl text-gray-600 mb-6 leading-relaxed">
      {article.excerpt}
    </p>

    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
      <div className="flex items-center gap-2">
        <FaUser className="text-gray-400" />
        <span>By {article.author}</span>
      </div>
      <div className="flex items-center gap-2">
        <FaCalendar className="text-gray-400" />
        <span>{article.date.split("T")[0]}</span>
      </div>
      <div className="flex items-center gap-2">
        <FaClock className="text-gray-400" />
        <span>{article.readTime}</span>
      </div>
    </div>
  </motion.header>
);

export default ArticleHeader;
