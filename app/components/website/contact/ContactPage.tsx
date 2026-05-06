"use client";
import React from "react";
import { motion } from "framer-motion";
import ContactInfo from "./ContactInfo";
import HeadContactPage from "./HeadContactPage";
import ContactForm from "./ContactForm";
import FAQSection from "./FAQSection";

// Animation Variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const formVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
    },
  },
};

// Main Contact Page Component
export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20 page-bg">
      <HeadContactPage />

      <main className="c-container py-20">
        {/* Contact Section */}
        <motion.section
          className="mb-32"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div className="lg:col-span-2" variants={formVariants}>
              <ContactForm />
            </motion.div>

            <ContactInfo />
          </div>
        </motion.section>

        {/* FAQ Section */}
        <FAQSection />
      </main>
    </div>
  );
}
