"use client";
import React, { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { CONTACT_ENDPOINTS } from "@/app/constants/endpoints";
import { BiLoader } from "react-icons/bi";
import { motion, Variants } from "framer-motion";
import { FaEnvelope, FaRegCommentDots, FaUserAlt } from "react-icons/fa";
import { instance } from "@/app/helpers/axios";

//////////////////////////////////////////////////////
///////  Form field configuration with icon components.
///////  Labels and placeholders come from translations.
//////////////////////////////////////////////////////
const fieldIcons = [
  { name: "fullName", type: "text" as const, icon: <FaUserAlt /> },
  { name: "email", type: "email" as const, icon: <FaEnvelope /> },
];

interface ContactFormProps {
  t: {
    fullNameLabel: string;
    fullNamePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendMessage: string;
  };
  shouldReduceMotion: boolean | null;
}

export default function ContactForm({
  t,
  shouldReduceMotion,
}: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    fullName: "",
    email: "",
    message: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const inputVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
    }),
  };
  function validateForm() {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Please fill all the fields");
      return false;
    }
    return true;
  }
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!validateForm()) return;

      setLoading(true);
      const response = await instance.post(CONTACT_ENDPOINTS.SUBMIT, formData);
      if (response.status == 200 || response.status == 201) {
        toast.success("Message sent successfully");
        setFormData({
          subject: "",
          fullName: "",
          email: "",
          message: "",
        });
      }
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <motion.div
        custom={0}
        variants={inputVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-2"
      >
        <label
          className="text-sm font-semibold text-surface-700 ms-1"
          htmlFor="name"
        >
          {t.subjectLabel}
        </label>
        <div className="flex items-center surface-input group focus-within:ring-2 focus-within:ring-primary/20">
          <FaUserAlt className="text-surface-400 me-3 text-lg transition-colors group-focus-within:text-primary" />
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder={t.subjectPlaceholder}
            className="w-full bg-transparent text-sm outline-none text-surface-900 placeholder:text-surface-400 h-10"
            required
            value={formData.subject}
            onChange={handleChange}
          />
        </div>
      </motion.div>

      {/* Email & Phone Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {fieldIcons
          .filter((f) => f.name !== "name")
          .map(({ name, type, icon }, i) => {
            const labelKey = `${name}Label` as keyof typeof t;
            const placeholderKey = `${name}Placeholder` as keyof typeof t;

            return (
              <motion.div
                key={name}
                custom={i + 1}
                variants={inputVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-2"
              >
                <label
                  className="text-sm font-semibold text-surface-700 ms-1"
                  htmlFor={name}
                >
                  {t[labelKey] as string}
                </label>
                <div className="flex items-center surface-input group focus-within:ring-2 focus-within:ring-primary/20">
                  {React.cloneElement(icon, {
                    className:
                      "text-surface-400 me-3 text-lg transition-colors group-focus-within:text-primary",
                  } as React.ComponentProps<typeof FaEnvelope>)}
                  <input
                    id={name}
                    type={type}
                    name={name}
                    placeholder={t[placeholderKey] as string}
                    className="w-full bg-transparent text-sm outline-none text-surface-900 placeholder:text-surface-400 h-10"
                    required
                    value={formData[name as keyof typeof formData]}
                    onChange={handleChange}
                  />
                </div>
              </motion.div>
            );
          })}
      </div>

      {/* Message Field */}
      <motion.div
        custom={4}
        variants={inputVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-2"
      >
        <label
          className="text-sm font-semibold text-surface-700 ms-1"
          htmlFor="message"
        >
          {t.messageLabel}
        </label>
        <div className="flex items-start surface-input group focus-within:ring-2 focus-within:ring-primary/20 pt-4">
          <FaRegCommentDots className="text-surface-400 me-3 mt-1 text-lg transition-colors group-focus-within:text-primary" />
          <textarea
            id="message"
            name="message"
            placeholder={t.messagePlaceholder}
            className="w-full h-32 bg-transparent text-sm resize-none outline-none text-surface-900 placeholder:text-surface-400"
            required
            onChange={handleChange}
            value={formData.message}
          ></textarea>
        </div>
      </motion.div>

      {/* Submit Button */}
      <motion.div
        custom={5}
        variants={inputVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="pt-4"
      >
        <button
          type="submit"
          className="surface-btn-primary flex items-center justify-center px-10 h-12 w-full sm:w-fit"
          disabled={loading}
        >
          {loading ? (
            <BiLoader className="animate-spin size-6" />
          ) : (
            t.sendMessage
          )}
        </button>
      </motion.div>
    </form>
  );
}
