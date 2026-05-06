"use client";
import { JSX, useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "./ArticleDetailsPage";
import { useLocale } from "@/app/hooks/useLocale";
import Img from "@/app/components/global/Img";

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  avatar: string;
}

// Mock comments data
const mockComments: Comment[] = [
  {
    id: 1,
    author: "Lisa Thompson",
    content:
      "Great insights on logo design! The tip about scalability is particularly important in today's multi-platform world.",
    date: "December 16, 2022",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    author: "David Park",
    content:
      "I've been struggling with color choices for my startup's logo. This article gave me some clarity on the psychological aspects.",
    date: "December 17, 2022",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
  },
];

// Comments Section Component
export default function CommentsSection(): JSX.Element {
  const locale = useLocale();
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState("");

  function handleSubmitComment() {
    if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        author: "You",
        content: newComment,
        date: new Date().toLocaleDateString(),
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  }

  return (
    <motion.section
      className="mb-12"
      variants={fadeInUp}
      initial="initial"
      animate="animate"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        {locale == "ar" ? "التعليقات" : "Comments"} ({comments.length})
      </h3>

      <div className="mb-8">
        <textarea
          value={newComment}
          onChange={function (e) {
            setNewComment(e.target.value);
          }}
          placeholder={
            locale == "ar" ? "شارك ما تفكر به ...." : "Share your thoughts..."
          }
          className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
        />
        <motion.button
          onClick={handleSubmitComment}
          className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          whileTap={{ scale: 0.95 }}
        >
          {locale == "ar" ? "تعليق" : " Post Comment"}
        </motion.button>
      </div>

      <div className="space-y-6">
        {comments.map(function (comment) {
          return (
            <motion.div
              key={comment.id}
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Img
                src={comment.avatar}
                alt={comment.author}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-gray-900">
                    {comment.author}
                  </h4>
                  <span className="text-sm text-gray-500">{comment.date}</span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
