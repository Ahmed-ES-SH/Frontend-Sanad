import {
  FiClock,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiPhone,
  FiUser,
} from "react-icons/fi";
import { ContactInfo } from "../types/contact";

export const inputFields = [
  {
    name: "name",
    type: "text",
    icon: <FiUser size={18} />,
    label: { en: "Full Name", ar: "الاسم الكامل" },
    placeholder: { en: "Enter your full name", ar: "أدخل اسمك الكامل" },
    colSpan: true,
  },
  {
    name: "email",
    type: "email",
    icon: <FiMail size={18} />,
    label: { en: "Email Address", ar: "البريد الإلكتروني" },
    placeholder: {
      en: "Enter your email address",
      ar: "أدخل بريدك الإلكتروني",
    },
    colSpan: true,
  },
  {
    name: "subject",
    type: "text",
    icon: <FiMessageSquare size={18} />,
    label: { en: "Subject", ar: "الموضوع" },
    placeholder: { en: "What's this about?", ar: "ما موضوع رسالتك؟" },
    colSpan: false,
  },
  {
    name: "message",
    type: "textarea",
    label: { en: "Message", ar: "الرسالة" },
    placeholder: {
      en: "Tell us more about your project or inquiry...",
      ar: "أخبرنا المزيد عن مشروعك أو استفسارك...",
    },
    rows: 6,
    colSpan: false,
  },
];

// Contact Info Data

export const contactInfoData: ContactInfo[] = [
  {
    icon: <FiPhone className="w-6 h-6" />,
    title: { en: "Phone", ar: "الهاتف" },
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
  },
  {
    icon: <FiMail className="w-6 h-6" />,
    title: { en: "Email", ar: "البريد الإلكتروني" },
    details: ["hello@company.com", "support@company.com"],
  },
  {
    icon: <FiMapPin className="w-6 h-6" />,
    title: { en: "Office", ar: "المكتب" },
    details: ["123 Business Street", "Suite 100, City, ST 12345"],
  },
  {
    icon: <FiClock className="w-6 h-6" />,
    title: { en: "Hours", ar: "ساعات العمل" },
    details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Weekend: By Appointment"],
  },
];
