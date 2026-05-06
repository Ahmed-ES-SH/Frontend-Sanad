"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiAlertCircle, FiLoader, FiSend } from "react-icons/fi";
import { containerVariants, formVariants, itemVariants } from "./ContactPage";
import { ContactFormErrors, ContactFormPageData } from "@/app/types/contact";
import { useTranslation } from "@/app/hooks/useTranslation";
import { validateContactForm } from "@/app/helpers/_contact/validateContactForm";
import { inputFields } from "@/app/constants/contact";
import { useLocale } from "@/app/hooks/useLocale";
import { submitContact } from "@/app/actions/contactActions";

import InputField from "./InputField";
import TextareaField from "./TextareaField";
import SubmittedMessage from "./SubmittedMessage";

export default function ContactForm() {
  const locale = useLocale();
  const t_contactPage = useTranslation("contactPage");
  const t_validationMessages = useTranslation("validationMessages");

  const [formData, setFormData] = useState<ContactFormPageData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    // Clear submit error on any field change
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateContactForm(formData, t_validationMessages, setErrors)) return;

    setIsSubmitting(true);

    try {
      const result = await submitContact({
        fullName: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      if (result.success) {
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: "", email: "", subject: "", message: "" });
        }, 3000);
      } else {
        setSubmitError(result.message);
      }
    } catch {
      setSubmitError("Something went wrong");
    }

    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return <SubmittedMessage t={t_contactPage} />;
  }

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-surface-md p-10"
      variants={formVariants}
    >
      <div className="mb-10">
        <h2 className="heading-lg font-display text-surface-900 mb-3">
          {t_contactPage.sendMessage}
        </h2>
        <p className="body text-surface-600">{t_contactPage.formDescription}</p>
      </div>

      {submitError && (
        <motion.div
          className="mb-6 bg-accent-rose/10 border border-accent-rose/20 rounded-xl p-4 flex items-center gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FiAlertCircle className="w-5 h-5 text-accent-rose flex-shrink-0" />
          <p className="body-sm text-accent-rose">{submitError}</p>
        </motion.div>
      )}

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {inputFields
            .filter((field) => field.colSpan)
            .map((field) =>
              field.type === "textarea" ? (
                <TextareaField
                  key={field.name}
                  name={field.name}
                  label={field.label[locale]}
                  placeholder={field.placeholder[locale]}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  error={errors[field.name as keyof ContactFormErrors]}
                  rows={field.rows}
                />
              ) : (
                <InputField
                  key={field.name}
                  name={field.name}
                  type={field.type}
                  icon={field.icon}
                  label={field.label[locale]}
                  placeholder={field.placeholder[locale]}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  error={errors[field.name as keyof ContactFormErrors]}
                />
              ),
            )}
        </div>

        {/* columns with full */}
        {inputFields
          .filter((field) => !field.colSpan)
          .map((field) =>
            field.type === "textarea" ? (
              <TextareaField
                key={field.name}
                name={field.name}
                label={field.label[locale]}
                placeholder={field.placeholder[locale]}
                value={formData[field.name]}
                onChange={handleInputChange}
                error={errors[field.name as keyof ContactFormErrors]}
                rows={field.rows}
              />
            ) : (
              <InputField
                key={field.name}
                name={field.name}
                type={field.type}
                icon={field.icon}
                label={field.label[locale]}
                placeholder={field.placeholder[locale]}
                value={formData[field.name]}
                onChange={handleInputChange}
                error={errors[field.name as keyof ContactFormErrors]}
              />
            ),
          )}

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary-dark disabled:bg-surface-300 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-button hover:shadow-button-hover"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          variants={itemVariants}
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <FiLoader className="w-5 h-5" />
              </motion.div>
              {t_contactPage.sending}
            </>
          ) : (
            <>
              <FiSend className="w-5 h-5" />
              {t_contactPage.sendMessage}
            </>
          )}
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
