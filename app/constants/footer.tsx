import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

//////////////////////////////////////////////////////
///////  Social media icon configuration with their
///////  respective translation keys for accessibility labels.
//////////////////////////////////////////////////////
export const socialIcons = [
  { icon: <FaFacebookF className="size-5" />, translationKey: "facebook" },
  { icon: <FaInstagram className="size-5" />, translationKey: "instagram" },
  { icon: <FaTwitter className="size-5" />, translationKey: "twitter" },
  { icon: <FaLinkedinIn className="size-5" />, translationKey: "linkedIn" },
];

//////////////////////////////////////////////////////
///////  Ordered list of footer section keys to maintain
///////  consistent rendering order across locales.
//////////////////////////////////////////////////////
export const sectionOrder = [
  "services",
  "company",
  "helpfulLinks",
  "legal",
  "downloads",
];
