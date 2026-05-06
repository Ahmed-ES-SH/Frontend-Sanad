import { Messages } from "@/app/hooks/useTranslation";
import { ContactFormErrors, ContactFormPageData } from "@/app/types/contact";
import { Dispatch, SetStateAction } from "react";

export const validateContactForm = (
  formData: ContactFormPageData,
  validationMessages: Messages["validationMessages"],
  setErrors: Dispatch<SetStateAction<ContactFormErrors>>,
): boolean => {
  const newErrors: ContactFormErrors = {};

  if (!formData.name.trim()) {
    newErrors.name = validationMessages.nameRequired;
  }

  if (!formData.email.trim()) {
    newErrors.email = validationMessages.emailRequired;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = validationMessages.emailInvalid;
  }

  if (!formData.subject.trim()) {
    newErrors.subject = validationMessages.subjectRequired;
  }

  if (!formData.message.trim()) {
    newErrors.message = validationMessages.messageRequired;
  } else if (formData.message.trim().length < 10) {
    newErrors.message = validationMessages.messageTooShort;
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
