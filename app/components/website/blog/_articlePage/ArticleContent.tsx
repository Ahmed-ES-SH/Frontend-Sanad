/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface ArticleContentProps {
  content?: string;
  article?: any;
}

export default function ArticleContent({ content, article }: ArticleContentProps) {
  // Use content prop if provided (from backend), otherwise fallback to article.excerpt
  const articleContent = content || article?.excerpt || "";

  return (
    <motion.article
      dir="ltr"
      className="prose prose-lg max-w-none mb-12"
      variants={fadeInUp}
      initial="initial"
      animate="animate"
    >
      {content ? (
        <div dangerouslySetInnerHTML={{ __html: articleContent }} />
      ) : (
        <>
          <p className="text-gray-700 mb-6">{article?.excerpt}</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Understanding Your Audience
          </h2>
          <p className="text-gray-700 mb-6">
            Before diving into design elements, it's crucial to understand who your
            logo will represent and who will see it. Your target audience's
            preferences, cultural background, and expectations should heavily
            influence your design decisions. A logo for a children's toy company
            will have vastly different requirements than one for a law firm.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            The Power of Color Psychology
          </h2>
          <p className="text-gray-700 mb-6">
            Colors evoke emotions and associations. Blue conveys trust and
            professionalism, while red suggests energy and passion. Green often
            represents growth and nature, making it popular for environmental and
            health-focused brands. Choose colors that align with your brand's
            personality and the emotions you want to evoke in your audience.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Scalability and Versatility
          </h2>
          <p className="text-gray-700 mb-6">
            Your logo must work across all platforms and sizes. It should be legible
            on a business card and impactful on a billboard. Test your logo at
            various sizes and in different contexts to ensure it maintains its
            integrity and readability.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Simplicity is Key
          </h2>
          <p className="text-gray-700 mb-6">
            The most memorable logos are often the simplest. Think of Nike's swoosh
            or Apple's apple. Avoid cluttering your logo with too many elements. A
            clean, simple design is more likely to be remembered and recognized.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Timeless Design Principles
          </h2>
          <p className="text-gray-700 mb-6">
            While it's tempting to follow current design trends, aim for a logo that
            will stand the test of time. Classic design principles and clean
            aesthetics often outlast trendy elements. Your logo is a long-term
            investment in your brand identity.
          </p>
        </>
      )}
    </motion.article>
  );
}
